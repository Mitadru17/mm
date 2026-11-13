const {chromium}=require('../.codex/qa/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});page.on('pageerror',error=>console.log('ERROR',error.message));
 await page.goto('http://localhost:4174/#place',{waitUntil:'networkidle'});await page.waitForTimeout(1400);
 await page.getByRole('button',{name:'Explore nearby',exact:true}).click();await page.locator('[data-nearby-walk][data-shown]').waitFor();await page.waitForTimeout(1800);
 await page.locator('[data-nearby-walk] .nw-spot').last().hover();await page.waitForTimeout(650);
 await page.locator('.nearby-location').screenshot({path:'docs/nearby-walk/desktop.jpg'});
 await page.getByRole('button',{name:'Theme: Night',exact:true}).click();await page.waitForTimeout(700);
 await page.locator('.nearby-location').screenshot({path:'docs/nearby-walk/night.jpg'});
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Theme: Classic',exact:true}).click();await page.waitForTimeout(800);
 await page.locator('.nearby-location-header').scrollIntoViewIfNeeded();await page.waitForTimeout(700);
 await page.screenshot({path:'docs/nearby-walk/phone.jpg'});
 await page.goto('http://localhost:4174/contact',{waitUntil:'networkidle'});await page.locator('.nearby-location').scrollIntoViewIfNeeded();await page.waitForTimeout(1200);
 await page.locator('.nearby-location').screenshot({path:'docs/nearby-walk/contact-phone.jpg'});
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
