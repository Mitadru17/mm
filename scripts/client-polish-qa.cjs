const { chromium } = require('../.codex/qa/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const results = [], errors = [];
const base = 'http://localhost:4174';
(async () => {
  const browser = await chromium.launch({headless:true, executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', args:['--enable-unsafe-swiftshader']});
  const page = await browser.newPage({viewport:{width:1440,height:1000}});
  page.on('pageerror',e=>errors.push(e.message));
  const check = async (name,run) => {
    try { await run(); results.push({name,pass:true}); console.log('PASS',name); }
    catch(e) { results.push({name,pass:false,error:e.message}); throw e; }
  };
  const open = async () => {
    await page.getByRole('button',{name:'Open navigation',exact:true}).click();
    await page.locator('.site-menu[data-phase=open]').waitFor();
  };
  const closed = () => page.waitForFunction(()=>!document.querySelector('.site-menu').open);
  try {
    await page.goto(base,{waitUntil:'networkidle'});
    await page.locator('.arrival-hero[data-phase=ready]').waitFor();
    await check('Menu opens progressively and the hamburger morphs to a close icon',async()=>{
      await page.getByRole('button',{name:'Open navigation',exact:true}).click();
      assert.equal(await page.locator('.site-menu').getAttribute('data-phase'),'opening');
      await page.waitForTimeout(160);
      const mid=await page.locator('.site-menu [data-menu-reveal]').first().evaluate(e=>+getComputedStyle(e).opacity);
      assert(mid>0&&mid<1,`Expected partial entrance opacity, got ${mid}`);
      await page.locator('.site-menu[data-phase=open]').waitFor();
      assert.notEqual(await page.locator('.site-menu .arrival-menu-lines>span').first().evaluate(e=>getComputedStyle(e).transform),'none');
      assert.equal(await page.locator('.site-menu nav a').filter({hasText:'Hotel'}).count(),1);
    });
    await check('Menu traps focus, exits before closing, and returns focus and scrolling',async()=>{
      for(let i=0;i<15;i++) {
        await page.keyboard.press('Tab');
        assert(await page.evaluate(()=>document.querySelector('.site-menu').contains(document.activeElement)));
      }
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.site-menu').getAttribute('data-phase'),'closing');
      assert(await page.locator('.site-menu').evaluate(e=>e.open));
      await closed();
      assert.equal(await page.evaluate(()=>document.activeElement.getAttribute('aria-label')),'Open navigation');
      assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
    });
    await check('An interrupted opening can close and reopen without stale animation state',async()=>{
      await page.getByRole('button',{name:'Open navigation',exact:true}).click();
      await page.waitForTimeout(100); await page.keyboard.press('Escape'); await closed();
      await open();
      assert.equal(await page.locator('.site-menu [data-menu-reveal]').last().evaluate(e=>+getComputedStyle(e).opacity),1);
    });
    await check('Menu navigation waits for exit, including cross-route section links',async()=>{
      await page.locator('.site-menu nav a').filter({hasText:'Our story'}).click();
      assert.equal(new URL(page.url()).pathname,'/');
      await page.waitForURL('**/about'); await closed();
      await open(); await page.locator('.site-menu nav a').filter({hasText:'Dine'}).click();
      await page.waitForURL('**/#dine'); await closed();
      await page.waitForTimeout(1400);
      assert(await page.locator('#dine').evaluate(e=>e.getBoundingClientRect().top<200));
    });
    await check('Menu Enquire opens the planner; nested review fades and restores its parent',async()=>{
      await open(); await page.locator('.site-menu').getByRole('button',{name:'ENQUIRE',exact:true}).click();
      const planner=page.getByRole('dialog',{name:'Plan your stay',exact:true});
      await planner.waitFor(); await page.waitForTimeout(450);
      await planner.getByLabel('Check-in date',{exact:true}).fill('2027-01-15');
      await planner.getByLabel('Check-out date',{exact:true}).fill('2027-01-17');
      await planner.getByLabel('Your name',{exact:true}).fill('Local QA');
      await planner.getByRole('button',{name:'Review inquiry'}).click();
      const review=page.getByRole('dialog',{name:'Your stay inquiry',exact:true});
      await review.waitFor(); await page.waitForTimeout(450);
      assert.match(await review.locator('a[href^="mailto:"]').getAttribute('href'),/hotelmysticmount/);
      await page.keyboard.press('Escape');
      assert.equal(await review.getAttribute('data-closing'),'true');
      await review.waitFor({state:'detached'});
      assert(await planner.evaluate(e=>e.open));
      assert(await planner.evaluate(e=>e.contains(document.activeElement)));
      await page.keyboard.press('Escape'); await planner.waitFor({state:'detached'});
      assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
    });
    await check('FAQ opens and closes with native keyboard operation',async()=>{
      await page.goto(base+'/#faq',{waitUntil:'networkidle'});
      const summary=page.locator('.jh-faq summary').first();
      await summary.scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);
      await summary.focus(); await page.keyboard.press('Enter');
      await page.waitForTimeout(450);
      assert(await summary.evaluate(e=>e.parentElement.open));
      assert.equal(await summary.locator('..').locator('p').evaluate(e=>+getComputedStyle(e).opacity),1);
      await page.keyboard.press('Enter'); await page.waitForTimeout(450);
      assert.equal(await summary.evaluate(e=>e.parentElement.open),false);
    });
    await check('Footer is clean, without motion settings or UI-library promotion',async()=>{
      await page.goto(base+'/#contact',{waitUntil:'networkidle'}); await page.waitForTimeout(1600);
      assert.doesNotMatch(await page.locator('footer').innerText(),/reduce.?motion|skiper|react bits|vengeance/i);
      assert.equal(await page.locator('a[href*="skiper-ui"]').count(),0);
      assert.equal(await page.getByRole('button',{name:'Reduce motion',exact:true}).count(),0);
      await page.screenshot({path:'docs/client-polish/footer.jpg'});
    });
    await check('Scroll headings remain visible and reflow without overflow at 320, 390, 768 and 1440px',async()=>{
      for(const width of [320,390,768,1440]) {
        await page.setViewportSize({width,height:width<640?844:1000});
        await page.goto(base+'/#stay',{waitUntil:'networkidle'}); await page.waitForTimeout(1400);
        const heading=page.locator('#stay-title'); await heading.scrollIntoViewIfNeeded(); await page.waitForTimeout(1000);
        const data=await heading.evaluate(e=>({text:e.getAttribute('aria-label')||e.textContent,lines:[...e.querySelectorAll('.jh-reveal-line')].map(x=>({opacity:+getComputedStyle(x).opacity,text:x.textContent})),overflow:document.documentElement.scrollWidth>innerWidth+1}));
        assert.equal(data.overflow,false,`Overflow at ${width}`);
        assert(data.lines.length>0); assert(data.lines.every(l=>l.opacity===1),JSON.stringify(data));
        assert(data.lines.every(l=>!/^\s*\./.test(l.text)),`Orphan punctuation at ${width}`);
        await open();
        assert.equal(await page.locator('.site-menu').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
        await page.locator('.site-menu nav a').filter({hasText:'Contact'}).focus();
        await page.keyboard.press('Escape'); await closed();
      }
      await page.goto(base+'/#stay',{waitUntil:'networkidle'}); await page.waitForTimeout(1500);
      await page.screenshot({path:'docs/client-polish/editorial.jpg'});
    });
    await check('Gallery lightbox retains keyboard navigation and animated dismissal',async()=>{
      await page.goto(base+'/gallery',{waitUntil:'networkidle'});
      await page.locator('.ts-image-button').first().click();
      const dialog=page.locator('.lightbox'); await dialog.waitFor(); await page.waitForTimeout(450);
      const before=await dialog.locator('img').getAttribute('src');
      await page.keyboard.press('ArrowRight'); await page.waitForTimeout(400);
      assert.notEqual(await dialog.locator('img').getAttribute('src'),before);
      await page.keyboard.press('Escape'); assert.equal(await dialog.getAttribute('data-closing'),'true');
      await dialog.waitFor({state:'detached'});
    });
    await check('System reduced motion remains automatic, including live preference changes',async()=>{
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.goto(base,{waitUntil:'networkidle'});
      await page.locator('html[data-motion-reduced=true]').waitFor();
      await open();
      assert.equal(await page.locator('.site-menu-surface').evaluate(e=>getComputedStyle(e).transform),'matrix(1, 0, 0, 1, 0, 0)');
      await page.emulateMedia({reducedMotion:'no-preference'});
      await page.locator('html[data-motion-reduced=false]').waitFor();
      await page.locator('.site-menu[data-phase=open]').waitFor();
      await page.keyboard.press('Escape'); await closed();
    });
    await check('No uncaught browser errors during these flows',async()=>assert.deepEqual(errors,[]));
  } finally {
    fs.writeFileSync('docs/client-polish/qa.json',JSON.stringify({date:new Date().toISOString(),browser:'Local Chrome via Playwright',results,errors},null,2));
    await browser.close();
  }
})().catch(e=>{console.error(e);process.exit(1);});
