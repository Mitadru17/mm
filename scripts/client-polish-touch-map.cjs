const {chromium}=require('../.codex/qa/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--enable-unsafe-swiftshader']});
  const errors=[],checks=[];
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  try {
    await page.goto('http://localhost:4174/#stay',{waitUntil:'networkidle'});
    await page.getByRole('button',{name:'Open navigation',exact:true}).tap();
    await page.locator('.site-menu[data-phase=open]').waitFor();
    await page.screenshot({path:'docs/client-polish/menu-phone.jpg'});
    await page.getByRole('button',{name:'Close navigation',exact:true}).tap();
    await page.waitForFunction(()=>!document.querySelector('.site-menu').open);
    checks.push('Touch opens and closes the mobile menu');
    await page.getByRole('button',{name:'Enquire about your stay',exact:true}).tap();
    const planner=page.getByRole('dialog',{name:'Plan your stay',exact:true});
    await planner.waitFor(); await page.waitForTimeout(500);
    assert.equal(await planner.evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
    await page.screenshot({path:'docs/client-polish/planner-phone.jpg'});
    await planner.getByRole('button',{name:'Close dialog',exact:true}).tap();
    await planner.waitFor({state:'detached'});
    checks.push('Phone planner fits the screen and dismisses by touch');
    await page.goto('http://localhost:4174/#place',{waitUntil:'networkidle'});
    await page.waitForTimeout(1600);
    await page.getByRole('button',{name:'Explore the 3D map',exact:true}).tap();
    await page.locator('.terrain-scene[data-ready=true]').waitFor({timeout:60000});
    assert.equal(await page.locator('#jh-map a[href*="skiper-ui"]').count(),0);
    assert(await page.locator('#jh-map .editorial-link').count()>0);
    await page.screenshot({path:'docs/client-polish/map-phone.jpg'});
    await page.getByRole('button',{name:'Close the 3D map',exact:true}).tap();
    assert.equal(await page.locator('#jh-map').count(),1,'Map should remain during its fade exit');
    await page.locator('#jh-map').waitFor({state:'detached'});
    checks.push('Phone map loads with original links and fades out before removal');
    assert.deepEqual(errors,[]);
  } finally {
    fs.writeFileSync('docs/client-polish/touch-map-qa.json',JSON.stringify({date:new Date().toISOString(),checks,errors},null,2));
    await browser.close();
  }
})().catch(e=>{console.error(e);process.exit(1)});
