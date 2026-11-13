const {chromium}=require('../.codex/qa/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),results=[],errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 const test=async(name,fn)=>{try{await fn();results.push({name,pass:true});console.log('PASS',name)}catch(e){results.push({name,pass:false,error:e.message});throw e}};
 const guide=page.locator('[data-nearby-walk]');
 try{
  await page.goto('http://localhost:4174/#place',{waitUntil:'networkidle'});await page.waitForTimeout(1400);
  await test('The nearby guide replaces the terrain, with three real Kausani places',async()=>{
   await page.getByRole('button',{name:'Explore nearby',exact:true}).click();await page.locator('[data-nearby-walk][data-shown]').waitFor();await page.waitForTimeout(1500);
   assert.equal(await page.locator('.nw-place-list>button').count(),3);
   const text=await guide.innerText();assert.doesNotMatch(text,/Seoul|Myeongdong|min walk|Hotel name here|3D terrain/i);
   assert.match(text,/measured in a straight line/);assert.equal(await page.locator('canvas,.terrain-map').count(),0);
  });
  await test('Landmarks reveal on entry and hover swaps their metric and detail',async()=>{
   const spot=page.locator('.nw-spot').last();await spot.hover();await page.waitForTimeout(650);
   assert.equal(await spot.getAttribute('aria-pressed'),'true');assert.equal(await spot.locator('.nw-km').evaluate(e=>+getComputedStyle(e).opacity),1);
   assert.match(await page.locator('.nearby-location-detail h3').innerText(),/Anasakti/);
   for(const opacity of await page.locator('.nw-rise').evaluateAll(nodes=>nodes.map(e=>+getComputedStyle(e).opacity)))assert.equal(opacity,1);
  });
  await test('SVG landmarks and HTML alternatives work with keyboard input',async()=>{
   await page.keyboard.press('Tab');const first=page.locator('.nw-spot').first();await first.focus();await page.waitForTimeout(100);
   assert.equal(await first.getAttribute('aria-pressed'),'true');assert.equal(await first.evaluate(e=>e.matches(':focus-visible')),true);
   await page.keyboard.press('Space');assert.equal(await first.getAttribute('aria-pressed'),'false');await page.keyboard.press('Space');assert.equal(await first.getAttribute('aria-pressed'),'true');
   await page.locator('.nw-place-list>button').nth(1).focus();await page.keyboard.press('Enter');
   assert.match(await page.locator('.nearby-location-detail h3').innerText(),/Sumitranandan/);
  });
  await test('All four themes crossfade locally without recolouring the hotel site',async()=>{
   const body=await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor);
   for(const theme of ['Night','Sunset','Ink','Classic']){
    const button=page.getByRole('button',{name:`Theme: ${theme}`,exact:true});await button.click();await page.waitForTimeout(650);
    assert.equal(await guide.getAttribute('data-theme'),theme.toLowerCase());assert.equal(await button.getAttribute('aria-pressed'),'true');
    assert.equal(await page.locator('body').evaluate(e=>getComputedStyle(e).backgroundColor),body);
   }
  });
  await test('Pause settles entrances and stops movement; offscreen animation sleeps',async()=>{
   await page.getByRole('button',{name:'Pause illustration',exact:true}).click();assert.equal(await guide.getAttribute('data-paused'),'true');
   assert.equal(await page.locator('.nw-cloud-a').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
   assert.equal(await page.locator('.nw-ground').evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset)),0);
   await page.getByRole('button',{name:'Play illustration',exact:true}).click();
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(1600);
   assert.equal(await guide.getAttribute('data-running'),null);assert.equal(await page.locator('.nw-cloud-a').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');
   await page.locator('.nw-card').scrollIntoViewIfNeeded();await page.locator('[data-nearby-walk][data-shown]').waitFor();
  });
  await test('System reduced motion keeps a complete static drawing, including live changes',async()=>{
   await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-nearby-walk][data-reduced]').waitFor();
   assert.equal(await page.getByRole('button',{name:'Pause illustration',exact:true}).count(),0);
   assert.equal(await page.locator('.nw-rise').first().evaluate(e=>getComputedStyle(e).animationName),'none');
   assert.equal(await page.locator('.nw-rise').first().evaluate(e=>+getComputedStyle(e).opacity),1);
   assert.equal(await page.locator('.nw-ground').evaluate(e=>parseFloat(getComputedStyle(e).strokeDashoffset)),0);
   await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('[data-nearby-walk]:not([data-reduced])').waitFor();
  });
  await test('Narrow phone, phone, tablet and desktop have readable controls and no overflow',async()=>{
   for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:width<640?844:1000});await page.locator('.nw-place-list').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`overflow at ${width}`);
    const targets=await page.locator('.nw-place-list>button,.nw-themes>button,.nw-motion-toggle').evaluateAll(nodes=>nodes.map(e=>e.getBoundingClientRect().height));
    assert(targets.every(h=>h>=44));
    assert.equal(await page.locator('.nw-spot').first().getAttribute('tabindex'),width<640?'-1':'0');
   }
  });
  await test('The homepage guide closes with its exit animation and the enquiry still works',async()=>{
   await page.getByRole('button',{name:'Close nearby guide',exact:true}).click();assert.equal(await guide.count(),1);await guide.waitFor({state:'detached'});
   await page.getByRole('button',{name:'Enquire about your stay',exact:true}).click();await page.getByLabel('Check-in date',{exact:true}).fill('2027-02-10');await page.getByLabel('Check-out date',{exact:true}).fill('2027-02-13');
   await page.getByRole('button',{name:'Choose your company',exact:true}).click();await page.locator('.stepper__pane[data-step="2"]:not([inert])').waitFor();await page.waitForTimeout(450);
   await page.keyboard.press('Escape');await page.locator('.jh-booking-modal').waitFor({state:'detached'});assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
  });
  await test('The contact route uses the same guide and never loads terrain resources',async()=>{
   await page.goto('http://localhost:4174/contact',{waitUntil:'networkidle'});await page.locator('.nearby-location').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
   assert.equal(await guide.count(),1);assert.equal(await page.locator('canvas,.terrain-map').count(),0);
   assert.equal(requests.some(url=>/mapterhorn|openfreemap|maplibre|terrain\/|TerrainMap-|maplibre-gl-worker/.test(url)),false);
   assert.match(await page.locator('.signature-footer h2').evaluate(e=>getComputedStyle(e).fontFamily),/Bodoni/);
  });
  await test('Touch selects places, switches themes and keeps the pointer effect off',async()=>{
   const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const phone=await context.newPage();phone.on('pageerror',e=>errors.push(e.message));
   await phone.goto('http://localhost:4174/contact',{waitUntil:'networkidle'});await phone.locator('.nearby-location').scrollIntoViewIfNeeded();await phone.waitForTimeout(1100);
   await phone.locator('.nw-place-list>button').nth(1).tap();assert.match(await phone.locator('.nearby-location-detail h3').innerText(),/Sumitranandan/);
   await phone.getByRole('button',{name:'Theme: Night',exact:true}).tap();assert.equal(await phone.locator('[data-nearby-walk]').getAttribute('data-theme'),'night');
   await phone.getByRole('button',{name:'Pause illustration',exact:true}).tap();assert.equal(await phone.locator('[data-nearby-walk]').getAttribute('data-paused'),'true');
   assert.equal(await phone.locator('.nw-card[data-lamp]').count(),0);await context.close();
  });
  await test('No uncaught browser errors',async()=>assert.deepEqual(errors,[]));
 }finally{fs.writeFileSync('docs/nearby-walk/qa.json',JSON.stringify({date:new Date().toISOString(),results,errors,terrainRequests:requests.filter(url=>/maplibre|mapterhorn|TerrainMap-/.test(url))},null,2));await browser.close()}
})().catch(error=>{console.error(error);process.exit(1)});

