const {chromium}=require('../.codex/qa/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:390,height:844}}),checks=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://localhost:4174/#contact',{waitUntil:'networkidle'});await page.waitForTimeout(1600);
  assert((await page.locator('.jh-header .arrival-wordmark').boundingBox()).height>=44);
  assert((await page.getByRole('button',{name:'Back to top',exact:true}).boundingBox()).height>=44);
  await page.getByRole('button',{name:'Back to top',exact:true}).click();await page.waitForTimeout(1600);
  assert(await page.evaluate(()=>scrollY<5));checks.push('44px header/footer targets and a working return-to-top action');
  await page.goto('http://localhost:4174/#experiences',{waitUntil:'networkidle'});await page.waitForTimeout(1500);
  await page.keyboard.press('Tab');
  const card=page.locator('.jh-experience-card').first();await card.focus();
  assert.equal(await card.evaluate(e=>getComputedStyle(e).outlineColor),'rgb(47, 79, 62)');checks.push('Photo-card keyboard ring uses high-contrast pine');
  await page.goto('http://localhost:4174/#place',{waitUntil:'networkidle'});await page.waitForTimeout(1500);
  assert.equal(await page.locator('.jh-grow-copy>p').evaluate(e=>+getComputedStyle(e).opacity),1);checks.push('Location address retains full text opacity');
  await page.getByRole('button',{name:'Enquire about your stay',exact:true}).click();
  await page.getByLabel('Check-in date',{exact:true}).fill('2027-02-10');await page.getByLabel('Check-out date',{exact:true}).fill('2027-02-13');
  await page.getByRole('button',{name:'Choose your company',exact:true}).click();await page.locator('[data-step="2"]:not([inert])').waitFor();await page.waitForTimeout(400);
  await page.getByRole('button',{name:'Add a personal touch',exact:true}).click();await page.locator('[data-step="3"]:not([inert])').waitFor();await page.waitForTimeout(400);
  await page.getByRole('button',{name:'Review your enquiry',exact:true}).click();await page.locator('[data-step="4"]:not([inert])').waitFor();await page.waitForTimeout(400);
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('Clipboard unavailable in this test')}}}));
  await page.getByRole('button',{name:'Copy details',exact:true}).click();
  await page.locator('.enquiry-copy-fallback').waitFor();assert.match(await page.locator('.enquiry-copy-fallback').innerText(),/2027-02-10/);checks.push('Clipboard failure exposes complete selectable details, with no fake success');
  assert.deepEqual(errors,[]);
 }finally{fs.writeFileSync('docs/enquiry-redesign/final-smoke.json',JSON.stringify({checks,errors},null,2));await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
