const { chromium } = require("../.codex/qa/node_modules/playwright");
const assert = require("node:assert/strict"),
  fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--enable-unsafe-swiftshader"],
  });
  const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    }),
    p = await ctx.newPage(),
    results = [],
    errors = [],
    failed = [];
  p.on("pageerror", (e) => errors.push(e.message));
  p.on("response", (r) => {
    if (r.status() >= 400 && r.url().includes("localhost"))
      failed.push(r.url());
  });
  const run = async (name, fn) => {
    try {
      await fn();
      results.push({ name, pass: true });
      console.log("PASS", name);
    } catch (e) {
      results.push({ name, pass: false, error: e.message });
      throw e;
    }
  };
  const ready = async () =>
    p.locator('.arrival-hero[data-phase="ready"]').waitFor({ timeout: 12000 });
  const reviews = async () => {
    await p.locator("#guest-experiences").evaluate((e) =>
      scrollTo({
        top: e.getBoundingClientRect().top + scrollY - 90,
        behavior: "instant",
      }),
    );
    await p.locator('.tg-globe[data-gl="ready"]').waitFor();
    await p.waitForTimeout(1000);
  };
  try {
    await p.goto("http://localhost:4174/?check=film", {
      waitUntil: "domcontentloaded",
    });
    await run(
      "A single shared heading transitions from the loader into the real video hero",
      async () => {
        await p.locator('.arrival-hero[data-phase="loading"]').waitFor();
        assert.equal(await p.locator("h1#arrival-title").count(), 1);
        assert.equal(await p.locator(".arrival-skip").isVisible(), true);
        await ready();
        assert.equal(await p.locator(".arrival-veil").count(), 0);
        assert.equal(await p.locator("main[inert]").count(), 0);
        assert.match(
          await p.locator("#arrival-title").innerText(),
          /Wake up\s+in Kausani/,
        );
        assert.equal(
          await p
            .locator(".arrival-visual img")
            .evaluate((e) => e.complete && e.naturalWidth > 0),
          true,
        );
      },
    );
    await run(
      "Muted inline H.264 playback advances with native looping enabled",
      async () => {
        const v = p.locator(".arrival-visual video");
        await p.waitForFunction(
          () => document.querySelector("video")?.readyState >= 2,
        );
        const a = await v.evaluate((e) => e.currentTime);
        await p.waitForTimeout(700);
        const state = await v.evaluate((e) => ({
          time: e.currentTime,
          paused: e.paused,
          muted: e.muted,
          loop: e.loop,
          inline: e.playsInline,
          src: e.currentSrc,
          duration: e.duration,
        }));
        assert(state.time > a + 0.2);
        assert.equal(state.paused, false);
        assert(state.muted && state.loop && state.inline);
        assert.match(state.src, /desktop\.mp4$/);
        assert(state.duration > 11 && state.duration < 13);
      },
    );
    await run(
      "Film pause/resume works and the loop crosses its seam without stopping",
      async () => {
        await p
          .getByRole("button", { name: "Pause background film", exact: true })
          .click();
        const a = await p.locator("video").evaluate((e) => e.currentTime);
        await p.waitForTimeout(450);
        assert(
          Math.abs(
            (await p.locator("video").evaluate((e) => e.currentTime)) - a,
          ) < 0.1,
        );
        await p
          .getByRole("button", { name: "Play background film", exact: true })
          .click();
        await p
          .locator("video")
          .evaluate((e) => (e.currentTime = e.duration - 0.18));
        await p.waitForTimeout(900);
        const v = await p
          .locator("video")
          .evaluate((e) => ({ time: e.currentTime, paused: e.paused }));
        assert(v.time < 2 && !v.paused);
      },
    );
    await run(
      "Skip and Escape both release the loader and restore access/focus",
      async () => {
        for (const method of ["click", "Escape"]) {
          await p.goto("http://localhost:4174/?check=skip-" + method, {
            waitUntil: "domcontentloaded",
          });
          await p.locator(".arrival-skip").waitFor();
          if (method === "click")
            await p.getByRole("button", { name: /Skip introduction/ }).click();
          else await p.keyboard.press("Escape");
          await ready();
          assert.equal(
            await p.evaluate(() => document.activeElement.id),
            "arrival-title",
          );
          assert.notEqual(
            await p.evaluate(() => document.body.style.overflow),
            "hidden",
          );
        }
      },
    );
    await run(
      "The hero fills the screen and all text/controls fit at 320/390/768/1024/1440",
      async () => {
        for (const width of [320, 390, 768, 1024, 1440]) {
          await p.setViewportSize({ width, height: width < 700 ? 844 : 900 });
          await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
          await p.waitForTimeout(100);
          const h = await p.locator(".arrival-hero").boundingBox(),
            title = await p.locator("#arrival-title").boundingBox(),
            link = await p.locator(".arrival-room-link").boundingBox();
          assert(Math.abs(h.height - (width < 700 ? 844 : 900)) < 2);
          assert(title.x >= 0 && title.x + title.width <= width + 1);
          assert(link.y + link.height <= h.height);
          assert.equal(
            await p.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            ),
            false,
          );
        }
      },
    );
    await run(
      "Hero room action and existing header enquiry remain functional",
      async () => {
        await p.locator(".arrival-room-link").click();
        await p.waitForTimeout(800);
        assert.equal(new URL(p.url()).hash, "#stay");
        await p
          .getByRole("button", { name: "Enquire about your stay", exact: true })
          .click();
        await p.locator(".jh-booking-modal").waitFor();
        await p.keyboard.press("Escape");
        await p.locator(".jh-booking-modal").waitFor({ state: "detached" });
      },
    );
    await run(
      "Testimonials use real excerpts, local illustrated avatars and the correct Maps destination",
      async () => {
        await reviews();
        assert.equal(await p.locator(".tg-guest-pin").count(), 4);
        assert.equal(await p.locator(".tg-guest-pin img").count(), 4);
        assert.match(
          await p.locator(".tg-place-caption").innerText(),
          /Avatars and guest pin positions are illustrative/,
        );
        assert.match(
          await p
            .getByRole("link", { name: "Read all reviews", exact: true })
            .getAttribute("href"),
          /google.com\/maps\/place.*!9m1!1b1/,
        );
        const texts = [
          "Amazing view of the Himalayas.",
          "Food quality and location is also top notch.",
          "I felt here like a home.",
          "great hospitality and food.",
        ];
        for (let i = 0; i < 4; i++) {
          assert.match(
            await p.locator(".tg-quote:not([inert]) blockquote").innerText(),
            new RegExp(texts[i].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
          );
          assert.equal(
            await p
              .locator(".tg-quote:not([inert]) .tg-review-avatar img")
              .evaluate((e) => e.complete && e.naturalWidth > 0),
            true,
          );
          await p
            .getByRole("button", { name: "Next review", exact: true })
            .click();
          await p.waitForTimeout(1000);
        }
      },
    );
    await run(
      "The supplied split composition, portrait pins and projected leader render",
      async () => {
        const globe = await p.locator(".tg-geography").boundingBox(),
          head = await p.locator(".tg-introduction").boundingBox(),
          quote = await p.locator(".tg-card-stack").boundingBox();
        assert(globe.x < head.x && quote.x === head.x);
        assert.equal(
          await p
            .locator(".tg-leader")
            .evaluate((e) => getComputedStyle(e).opacity),
          "1",
        );
        assert(
          Number(await p.locator(".tg-leader line").getAttribute("x2")) >
            Number(await p.locator(".tg-leader line").getAttribute("x1")),
        );
        assert.match(
          await p.locator(".tg-hotel-pin").innerText(),
          /Mystic Mountain/,
        );
      },
    );
    await run(
      "Review navigation overlaps cards smoothly while excluding the leaving card from focus",
      async () => {
        await p
          .getByRole("button", { name: "Next review", exact: true })
          .click();
        await p.waitForTimeout(60);
        assert.equal(await p.locator(".tg-quote:not([inert])").count(), 1);
        await p.waitForTimeout(1000);
        await p.locator(".tg-review-region").focus();
        await p.keyboard.press("ArrowLeft");
        await p.waitForTimeout(1000);
        assert.match(
          await p.locator(".tg-quote blockquote").innerText(),
          /Amazing view/,
        );
      },
    );
    await run(
      "Hover previews a portrait's review without moving the globe; Home restores the first review",
      async () => {
        await reviews();
        const candidate = await p
          .locator(".tg-guest-pin")
          .evaluateAll((es) =>
            es.findIndex(
              (e, i) => i !== 0 && getComputedStyle(e).visibility === "visible",
            ),
          );
        assert(candidate >= 0);
        const before = await p.locator(".tg-hotel-pin").getAttribute("style");
        await p.locator(".tg-guest-pin").nth(candidate).hover();
        await p.waitForTimeout(350);
        const name = await p
          .locator(".tg-guest-pin")
          .nth(candidate)
          .getAttribute("aria-label");
        assert(
          name.includes(
            await p
              .locator(".tg-quote:not([inert]) figcaption strong")
              .innerText(),
          ),
        );
        assert.equal(
          await p.locator(".tg-hotel-pin").getAttribute("style"),
          before,
        );
        await p.locator(".tg-review-region").focus();
        await p.keyboard.press("Home");
        await p.waitForTimeout(1000);
        assert.match(
          await p.locator(".tg-quote:not([inert]) blockquote").innerText(),
          /Amazing view/,
        );
        await p
          .getByRole("button", {
            name: "Centre the globe on Kausani",
            exact: true,
          })
          .click();
        await p.waitForTimeout(1000);
      },
    );
    await run(
      "Dragging/recentring the globe works; offscreen video and WebGL stop",
      async () => {
        const box = await p.locator(".tg-globe").boundingBox(),
          before = await p.locator(".tg-hotel-pin").getAttribute("style");
        await p.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.8);
        await p.mouse.down();
        await p.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.8, {
          steps: 10,
        });
        await p.mouse.up();
        await p.waitForTimeout(900);
        assert.notEqual(
          await p.locator(".tg-hotel-pin").getAttribute("style"),
          before,
        );
        await p
          .getByRole("button", {
            name: "Centre the globe on Kausani",
            exact: true,
          })
          .click();
        await p.waitForTimeout(1000);
        assert.equal(await p.locator("video").evaluate((e) => e.paused), true);
        await p.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await p.waitForTimeout(600);
        assert.equal(await p.locator(".tg-canvas canvas").count(), 0);
      },
    );
    await run(
      "Fresh phone loads the portrait encode and supports real touch playback/quote swiping",
      async () => {
        const c = await browser.newContext({
            viewport: { width: 390, height: 844 },
            isMobile: true,
            hasTouch: true,
          }),
          q = await c.newPage();
        await q.goto("http://localhost:4174/?check=phone#main", {
          waitUntil: "networkidle",
        });
        await q.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await q.waitForTimeout(600);
        assert.match(
          await q.locator("video").evaluate((e) => e.currentSrc),
          /mobile\.mp4$/,
        );
        assert.equal(
          await q.locator("video").evaluate((e) => e.videoWidth),
          608,
        );
        await q
          .getByRole("button", { name: "Pause background film", exact: true })
          .tap();
        assert.equal(await q.locator("video").evaluate((e) => e.paused), true);
        await q.locator(".tg-card-stack").scrollIntoViewIfNeeded();
        await q.waitForTimeout(1200);
        const cd = await c.newCDPSession(q),
          r = await q.locator(".tg-card-stack").boundingBox(),
          y = r.y + r.height * 0.45;
        await cd.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [{ x: 300, y }],
        });
        for (let i = 1; i <= 8; i++)
          await cd.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x: 300 - i * 25, y }],
          });
        await cd.send("Input.dispatchTouchEvent", {
          type: "touchEnd",
          touchPoints: [],
        });
        await q.waitForTimeout(1100);
        assert.match(
          await q.locator(".tg-quote:not([inert]) blockquote").innerText(),
          /Food quality/,
        );
        await c.close();
      },
    );
    await run(
      "Reduced motion skips the loader and rests on the genuine poster without fetching a film",
      async () => {
        const c = await browser.newContext({
            viewport: { width: 390, height: 844 },
            reducedMotion: "reduce",
          }),
          q = await c.newPage();
        const videos = [];
        q.on("request", (r) => {
          if (/\.mp4/.test(r.url())) videos.push(r.url());
        });
        await q.goto("http://localhost:4174/?check=reduced", {
          waitUntil: "networkidle",
        });
        assert.equal(
          await q.locator(".arrival-hero").getAttribute("data-phase"),
          "ready",
        );
        assert.equal(await q.locator("video").evaluate((e) => e.paused), true);
        assert.equal(
          await q
            .locator(".arrival-visual img")
            .evaluate((e) => e.complete && e.naturalWidth > 0),
          true,
        );
        assert.deepEqual(videos, []);
        await c.close();
      },
    );
    await run(
      "Video failure keeps the poster and never traps entry",
      async () => {
        const q = await ctx.newPage();
        await q.route("**/videos/*.mp4", (r) => r.abort());
        await q.goto("http://localhost:4174/?check=blocked", {
          waitUntil: "domcontentloaded",
        });
        await q
          .locator('.arrival-hero[data-phase="ready"]')
          .waitFor({ timeout: 12000 });
        assert.equal(
          await q
            .locator(".arrival-visual img")
            .evaluate((e) => e.complete && e.naturalWidth > 0),
          true,
        );
        assert.equal(await q.locator(".arrival-veil").count(), 0);
        await q.close();
      },
    );
    await run(
      "Review section stays responsive and guest names never cover the hotel marker",
      async () => {
        for (const width of [320, 390, 768, 1024, 1440]) {
          await p.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
          await reviews();
          assert.equal(
            await p.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            ),
            false,
          );
          const hotel = await p.locator(".tg-hotel-pin").boundingBox(),
            name = await p
              .locator(".tg-guest-pin[data-active] .tg-pin-name")
              .boundingBox();
          if (hotel && name)
            assert(
              !(
                name.x < hotel.x + hotel.width &&
                name.x + name.width > hotel.x &&
                name.y < hotel.y + hotel.height &&
                name.y + name.height > hotel.y
              ),
              `label overlap ${width}`,
            );
          for (const r of await p
            .locator(".tg-arrows button,.tg-place-caption button")
            .evaluateAll((es) => es.map((e) => e.getBoundingClientRect())))
            assert(r.height >= 44);
        }
      },
    );
    await run(
      "No uncaught errors or broken local assets in normal use",
      async () => {
        assert.deepEqual(errors, []);
        assert.deepEqual(failed, []);
      },
    );
  } finally {
    fs.writeFileSync(
      "docs/video-hero/qa.json",
      JSON.stringify(
        { date: new Date().toISOString(), results, errors, failed },
        null,
        2,
      ),
    );
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
