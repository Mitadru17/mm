const { chromium } = require("../.codex/qa/node_modules/playwright");
const fs = require("fs");
(async () => {
  fs.mkdirSync("docs/room-arc", { recursive: true });
  const b = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--enable-unsafe-swiftshader"],
  });
  const p = await b.newPage({ viewport: { width: 1440, height: 1100 } });
  await p.goto("http://localhost:4174/?view=arc-visual#stay", {
    waitUntil: "networkidle",
  });
  await p.locator(".arc-card-carousel[data-ready]").waitFor();
  for (const width of [1440, 1024, 929, 768, 390, 320]) {
    await p.setViewportSize({ width, height: width === 929 ? 871 : width < 768 ? 844 : 1100 });
    await p
      .locator(".rooms-layout")
      .evaluate((e) =>
        scrollTo({
          top: e.getBoundingClientRect().top + scrollY - 96,
          behavior: "instant",
        }),
      );
    await p.waitForTimeout(950);
    await p.screenshot({ path: `docs/room-arc/${width}.png` });
    console.log(
      width,
      await p
        .locator(".rooms-layout")
        .evaluate((e) => ({
          layout: e.getBoundingClientRect().toJSON(),
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          detail: document
            .querySelector(".room-detail-scene")
            .getBoundingClientRect()
            .toJSON(),
        })),
    );
    if (width === 929) {
      await p.locator('.room-listings').evaluate(e => scrollTo({top:e.getBoundingClientRect().top+scrollY-170,behavior:'instant'}));
      await p.screenshot({path:'docs/room-arc/929-entry.png'});
      await p.locator('#nature').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-220,behavior:'instant'}));
      await p.waitForTimeout(950);
      await p.screenshot({path:'docs/room-arc/929-exit.png'});
    }
  }
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
