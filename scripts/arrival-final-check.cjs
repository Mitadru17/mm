const { chromium } = require('../.codex/qa/node_modules/playwright');
const fs = require('fs');
const assert = require('assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference' });
  await page.goto('http://localhost:4174/?entry-frame=0.8', { waitUntil: 'networkidle' });
  await page.locator('.arrival-hero[data-phase=revealing]').waitFor();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('.arrival-hero[data-phase=ready]').waitFor();
  assert.notEqual(await page.locator('body').evaluate(e => e.style.overflow), 'hidden');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('http://localhost:4174/?entry-frame=0.8', { waitUntil: 'networkidle' });
  await page.locator('.arrival-hero[data-phase=revealing]').waitFor();
  await page.setViewportSize({ width: 844, height: 390 });
  await page.locator('.arrival-hero[data-phase=ready]').waitFor();
  assert.equal(Math.round(await page.locator('.arrival-hero').evaluate(e => e.getBoundingClientRect().height)), 390);
  assert.equal(await page.locator('main').evaluate(e => e.inert), false);
  await page.waitForTimeout(650);
  await page.screenshot({ path: 'docs/arrival-hero/landscape.jpg' });

  const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const touch = await touchContext.newPage();
  await touch.goto('http://localhost:4174/', { waitUntil: 'domcontentloaded' });
  await touch.locator('.arrival-hero[data-phase=ready]').waitFor();
  await touch.getByRole('button', { name: 'Enquire about your stay', exact: true }).tap();
  await touch.getByRole('dialog', { name: 'Plan your stay', exact: true }).waitFor();
  await touch.getByRole('button', { name: 'Close dialog', exact: true }).tap();
  assert.equal(await touch.locator('dialog[open]').count(), 0);
  await touch.getByRole('button', { name: 'Open navigation', exact: true }).tap();
  await touch.getByRole('dialog', { name: 'Explore Mystic Mountain', exact: true }).waitFor();
  await touch.getByRole('button', { name: 'Close dialog', exact: true }).tap();
  assert.equal(await touch.locator('dialog[open]').count(), 0);
  const checks = { liveReducedMotion: true, resizeSettlesIntro: true, landscapeHeroFits: true, touchEnquire: true, touchMenu: true };
  fs.writeFileSync('docs/arrival-hero/final-check.json', JSON.stringify(checks, null, 2));
  console.log(checks);
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
