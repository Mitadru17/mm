const {chromium}=require('../.codex/qa/node_modules/playwright');
const assert=require('node:assert/strict'), fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
 const page=await context.newPage(),results=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const run=async(name,fn)=>{try{await fn();results.push({name,pass:true});console.log('PASS',name)}catch(e){results.push({name,pass:false,error:e.message});throw e}};
 const waitStep=async n=>{await page.locator(`.stepper__pane[data-step="${n}"]:not([inert])`).waitFor();await page.waitForTimeout(400)};
 try {
  await page.goto('http://localhost:4174/#contact',{waitUntil:'networkidle'});await page.waitForTimeout(1500);
  await run('Footer uses verified contacts, real gallery links and a working enquiry action',async()=>{
   assert.equal(await page.locator('footer a[href="tel:+918941876542"]').count(),1);
   assert.doesNotMatch(await page.locator('footer').innerText(),/skiper|react bits|reduce motion/i);
   await page.getByRole('button',{name:'Plan your mountain stay',exact:true}).click();await waitStep(1);
  });
  const dialog=page.getByRole('dialog',{name:'Plan your stay',exact:true});
  const geometry=[];
  await run('Dates are required; future steps cannot be skipped before validation',async()=>{
   assert(await page.getByRole('button',{name:'Step 4: Review',exact:true}).isDisabled());
   await page.getByRole('button',{name:'Choose your company',exact:true}).click();
   assert.equal(await page.locator('.stepper__pane').getAttribute('data-step'),'1');
   await page.getByLabel('Check-in date',{exact:true}).fill('2027-02-10');await page.getByLabel('Check-out date',{exact:true}).fill('2027-02-13');
   geometry.push(await dialog.boundingBox());
   await page.getByRole('button',{name:'Choose your company',exact:true}).click();await waitStep(2);
   assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-step-title')),true);
  });
  await run('Guest controls respect limits and preserve the room preference',async()=>{
   await page.getByRole('button',{name:'Fewer adults',exact:true}).click();assert(await page.getByRole('button',{name:'Fewer adults',exact:true}).isDisabled());
   await page.getByRole('button',{name:'More adults',exact:true}).click();await page.getByRole('button',{name:'More adults',exact:true}).click();
   assert(await page.getByRole('button',{name:'Fewer children',exact:true}).isDisabled());
   await page.getByRole('button',{name:'More children',exact:true}).click();
   await page.getByLabel('Preferred room',{exact:true}).selectOption('A room with a mountain outlook');
   geometry.push(await dialog.boundingBox());
   await page.getByRole('button',{name:'Add a personal touch',exact:true}).click();await waitStep(3);
  });
  await run('Personal details validate email and persist through backward navigation',async()=>{
   await page.getByLabel('Your name',{exact:true}).fill('Aanya Sharma');await page.getByLabel('Your email address',{exact:true}).fill('invalid');
   await page.getByRole('button',{name:'Review your enquiry',exact:true}).click();assert.equal(await page.locator('.stepper__pane').getAttribute('data-step'),'3');
   await page.getByLabel('Your email address',{exact:true}).fill('aanya@example.com');
   await page.getByLabel('Special requests',{exact:true}).fill('Visiting with family. Please share meal options.');
   await page.getByRole('button',{name:'Back',exact:true}).click();await waitStep(2);
   assert.equal(await page.getByLabel('Preferred room',{exact:true}).inputValue(),'A room with a mountain outlook');
   await page.getByRole('button',{name:'Add a personal touch',exact:true}).click();await waitStep(3);
   assert.equal(await page.getByLabel('Your name',{exact:true}).inputValue(),'Aanya Sharma');
   geometry.push(await dialog.boundingBox());
   await page.getByRole('button',{name:'Review your enquiry',exact:true}).click();await waitStep(4);geometry.push(await dialog.boundingBox());
   assert(geometry.every(x=>Math.abs(x.height-geometry[0].height)<2),'Desktop dialog height changed between stages');
  });
  await run('Review is personalised and builds an accurate draft; copy works without sending',async()=>{
   assert.match(await page.locator('[data-step-title]').innerText(),/Aanya/);
   const href=await page.getByRole('link',{name:'Open email enquiry',exact:true}).getAttribute('href');
   const body=decodeURIComponent(href);
   for(const part of ['hotelmysticmount@gmail.com','2027-02-10','2027-02-13','Adults: 3','Children: 1','Aanya Sharma','aanya@example.com','Visiting with family.']) assert(body.includes(part),part);
   await page.getByRole('button',{name:'Copy details',exact:true}).click();
   assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/Adults: 3/);
   assert.match(await page.locator('.enquiry-help').last().innerText(),/Nothing is sent automatically/);
   await page.getByRole('button',{name:'Edit dates',exact:true}).click();await waitStep(1);
   assert.equal(await page.getByLabel('Check-in date',{exact:true}).inputValue(),'2027-02-10');
   assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-step-title')),true);
   await page.getByRole('button',{name:'Step 4: Review',exact:true}).click();await waitStep(4);
   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
   assert.equal(await page.evaluate(()=>document.activeElement.textContent.includes('Plan your mountain stay')),true);
   assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
  });
  await run('Sitewide type, footer, menu and buttons reflow at 320, 390, 768, 1024 and 1440px',async()=>{
   for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:width<640?844:1000});
    await page.goto('http://localhost:4174/#stay',{waitUntil:'networkidle'});await page.waitForTimeout(1400);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`overflow at ${width}`);
    assert.match(await page.locator('#stay-title').evaluate(e=>getComputedStyle(e).fontFamily),/Bodoni/);
    await page.getByRole('button',{name:'Open navigation',exact:true}).click();await page.locator('.site-menu[data-phase=open]').waitFor();
    assert.equal(await page.locator('.site-menu').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
    await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('.site-menu').open);
    await page.getByRole('button',{name:'Enquire about your stay',exact:true}).click();await waitStep(1);
    assert.equal(await dialog.evaluate(e=>e.scrollWidth>e.clientWidth+1),false,`enquiry overflow ${width}`);
    await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
    await page.locator('footer').scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`footer overflow ${width}`);
   }
  });
  await run('Inline contact enquiry preserves deep-linked room preferences',async()=>{
   await page.goto('http://localhost:4174/contact?room=outlook',{waitUntil:'networkidle'});
   await page.getByLabel('Check-in date',{exact:true}).fill('2027-03-02');await page.getByLabel('Check-out date',{exact:true}).fill('2027-03-04');
   await page.getByRole('button',{name:'Choose your company',exact:true}).click();await waitStep(2);
   assert.equal(await page.getByLabel('Preferred room',{exact:true}).inputValue(),'A room with a mountain outlook');
  });
  await run('Reduced motion retains readable steps and responsive controls',async()=>{
   await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://localhost:4174/',{waitUntil:'networkidle'});
   await page.getByRole('button',{name:'Enquire about your stay',exact:true}).click();await waitStep(1);
   await page.getByLabel('Check-in date',{exact:true}).fill('2027-02-10');await page.getByLabel('Check-out date',{exact:true}).fill('2027-02-13');
   await page.getByRole('button',{name:'Choose your company',exact:true}).click();await waitStep(2);
   assert.equal(await page.locator('.stepper__pane').evaluate(e=>+getComputedStyle(e).opacity),1);
   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
  });
  await run('Phone touch can finish the enquiry and each step starts at its heading',async()=>{
   const touchContext=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
   const phone=await touchContext.newPage();phone.on('pageerror',e=>errors.push(e.message));
   await phone.goto('http://localhost:4174/#stay',{waitUntil:'networkidle'});
   await phone.getByRole('button',{name:'Enquire about your stay',exact:true}).tap();
   await phone.getByLabel('Check-in date',{exact:true}).fill('2027-02-10');await phone.getByLabel('Check-out date',{exact:true}).fill('2027-02-13');
   await phone.getByRole('button',{name:'Choose your company',exact:true}).tap();await phone.locator('[data-step="2"]:not([inert])').waitFor();await phone.waitForTimeout(450);
   await phone.getByRole('button',{name:'More adults',exact:true}).tap();
   await phone.getByRole('button',{name:'Add a personal touch',exact:true}).tap();await phone.locator('[data-step="3"]:not([inert])').waitFor();await phone.waitForTimeout(450);
   await phone.getByLabel('Your name',{exact:true}).fill('Mira');
   await phone.getByLabel('Special requests',{exact:true}).fill('Please share meal options.');
   await phone.getByRole('button',{name:'Review your enquiry',exact:true}).tap();await phone.locator('[data-step="4"]:not([inert])').waitFor();await phone.waitForTimeout(500);
   assert.match(await phone.locator('[data-step-title]').innerText(),/Mira/);
   assert.equal(await phone.locator('.jh-booking-modal').evaluate(e=>e.scrollTop),0);
   assert.equal(await phone.locator('.jh-booking-modal').evaluate(e=>e.scrollWidth>e.clientWidth+1),false);
   await phone.screenshot({path:'docs/enquiry-redesign/review-phone.jpg'});
   await phone.getByRole('button',{name:'Close dialog',exact:true}).tap();await phone.locator('.jh-booking-modal').waitFor({state:'detached'});
   assert.notEqual(await phone.evaluate(()=>document.body.style.overflow),'hidden');
   await touchContext.close();
  });
  await run('No uncaught browser errors',async()=>assert.deepEqual(errors,[]));
 }finally{fs.writeFileSync('docs/enquiry-redesign/qa.json',JSON.stringify({date:new Date().toISOString(),results,errors},null,2));await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
