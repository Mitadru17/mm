const { chromium } = require("../.codex/qa/node_modules/playwright");
const fs = require("node:fs");
(async () => {
  const b = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--enable-unsafe-swiftshader"],
  });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  fs.mkdirSync("docs/video-hero", { recursive: true });
  fs.mkdirSync("docs/testimonial-refresh", { recursive: true });
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto("http://localhost:4174/?view=video-refresh", {
    waitUntil: "domcontentloaded",
  });
  await p.locator(".arrival-hero").waitFor();
  await p.waitForTimeout(450);
  await p.screenshot({ path: "docs/video-hero/loader.png" });
  await p
    .locator('.arrival-hero[data-phase="ready"]')
    .waitFor({ timeout: 12000 });
  await p.waitForTimeout(800);
  await p.screenshot({ path: "docs/video-hero/1440.png" });
  console.log(
    "video",
    await p
      .locator("video")
      .evaluate((v) => ({
        src: v.currentSrc,
        time: v.currentTime,
        duration: v.duration,
        paused: v.paused,
        muted: v.muted,
        ready: v.readyState,
      })),
  );
  for (const w of [1440, 1024, 768, 390, 320]) {
    await p.setViewportSize({ width: w, height: w < 700 ? 844 : 900 });
    await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await p.waitForTimeout(400);
    await p.screenshot({ path: `docs/video-hero/${w}.png` });
    await p
      .locator("#guest-experiences")
      .evaluate((e) =>
        scrollTo({
          top: e.getBoundingClientRect().top + scrollY - 90,
          behavior: "instant",
        }),
      );
    await p.waitForTimeout(1900);
    await p.screenshot({ path: `docs/testimonial-refresh/${w}.png` });
    console.log(
      w,
      await p.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        leader: getComputedStyle(document.querySelector(".tg-leader")).opacity,
        gl: document.querySelector(".tg-globe").dataset.gl,
      })),
    );
  }
  console.log("errors", errors);
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
