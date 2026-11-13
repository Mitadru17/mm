const { chromium } = require("../.codex/qa/node_modules/playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--enable-unsafe-swiftshader"],
  });
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
  });
  const page = await ctx.newPage(),
    results = [],
    errors = [],
    failedAssets = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().includes("localhost"))
      failedAssets.push(r.url());
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
  const top = async () =>
    page
      .locator(".rooms-layout")
      .evaluate((e) =>
        scrollTo({
          top: e.getBoundingClientRect().top + scrollY - 96,
          behavior: "instant",
        }),
      );
  const pick = async (i) => {
    await page.locator(".rooms-collection-nav button").nth(i).click();
    await page.waitForTimeout(1000);
  };
  const names = [
    "Timber & mountain light",
    "Let the outside in",
    "A softer place to land",
  ];
  const checkSelected = async (i) => {
    assert.equal(await page.locator(".room-detail h3").innerText(), names[i]);
    assert.match(
      await page.locator(".acc-count").innerText(),
      new RegExp("^0" + (i + 1)),
    );
    assert.equal(
      await page
        .locator(".rooms-collection-nav button")
        .nth(i)
        .getAttribute("aria-pressed"),
      "true",
    );
    assert.equal(await page.locator('.acc-card[tabindex="0"]').count(), 1);
  };
  try {
    await page.goto("http://localhost:4174/?view=arc-qa#stay", {
      waitUntil: "networkidle",
    });
    await page.locator(".arc-card-carousel[data-ready]").waitFor();
    await top();
    await run(
      "Visible arc replaces the ring opener; three genuine room stories remain in the existing section order",
      async () => {
        assert.equal(await page.locator("#stay").count(), 1);
        assert.equal(await page.locator(".works-wheel").count(), 0);
        assert.equal(await page.locator(".acc-card").count(), 12); // repeated physical slots, three stories
        assert.equal(
          await page.locator(".rooms-collection-nav button").count(),
          3,
        );
        const ids = await page
          .locator("main>section")
          .evaluateAll((es) => es.map((e) => e.id));
        assert(ids.indexOf("stay") < ids.indexOf("nature"));
        assert(ids.indexOf("dine") < ids.indexOf("experiences"));
        assert(ids.indexOf("experiences") < ids.indexOf("explore"));
        await checkSelected(0);
      },
    );
    await run(
      "Each selection updates the right-hand details, three photos, story link and honest rate",
      async () => {
        for (let i = 0; i < 3; i++) {
          await pick(i);
          await checkSelected(i);
          assert.equal(await page.locator(".room-detail li").count(), 3);
          assert.equal(
            await page.locator(".room-photo-thumbnails button").count(),
            3,
          );
          assert.match(
            await page.locator(".room-rate").innerText(),
            /Rate on request/,
          );
          assert.doesNotMatch(
            await page.locator(".room-rate").innerText(),
            /₹|\$|per night|sold out/i,
          );
          assert.match(
            await page
              .locator(".room-secondary>a")
              .first()
              .getAttribute("href"),
            new RegExp("/suites/" + ["timber", "outlook", "unwind"][i]),
          );
          assert.equal(
            await page
              .locator('.acc-card[data-front="true"] img')
              .evaluate((e) => e.complete && e.naturalWidth > 0),
            true,
          );
        }
      },
    );
    await run(
      "Clicking an exposed arc card selects its room without opening the gallery",
      async () => {
        await pick(0);
        await top();
        const hit = await page.locator(".acc-card").evaluateAll((es) => {
          for (const e of es) {
            if (
              e.dataset.front === "true" ||
              getComputedStyle(e).visibility !== "visible"
            )
              continue;
            const r = e.getBoundingClientRect();
            for (
              let y = Math.max(110, r.top + 10);
              y < Math.min(innerHeight - 20, r.bottom - 10);
              y += 18
            ) {
              for (
                let x = Math.max(10, r.left + 10);
                x < r.right - 10;
                x += 18
              ) {
                if (document.elementFromPoint(x, y)?.closest(".acc-card") === e)
                  return { x, y, index: es.indexOf(e) % 3 };
              }
            }
          }
        });
        assert(hit, "At least one preview has a real exposed hit area");
        await page.mouse.click(hit.x, hit.y);
        await page.waitForTimeout(1000);
        await checkSelected(hit.index);
        assert.equal(await page.locator("dialog[open]").count(), 0);
      },
    );
    await run(
      "Arrow controls loop smoothly and keyboard Home/End select rooms",
      async () => {
        await pick(2);
        await top();
        await page
          .getByRole("button", { name: "Next room", exact: true })
          .click();
        await page.waitForTimeout(1000);
        await checkSelected(0);
        await page
          .getByRole("button", { name: "Previous room", exact: true })
          .click();
        await page.waitForTimeout(1000);
        await checkSelected(2);
        await page.locator(".acc-stage").focus();
        await page.keyboard.press("Home");
        await page.waitForTimeout(1000);
        await checkSelected(0);
        await page.keyboard.press("End");
        await page.waitForTimeout(1000);
        await checkSelected(2);
      },
    );
    await run(
      "Vertical mouse dragging selects a room and prevents a release click",
      async () => {
        await pick(0);
        await top();
        const r = await page.locator(".acc-stage").boundingBox();
        await page.mouse.move(r.x + r.width * 0.58, r.y + r.height * 0.4);
        await page.mouse.down();
        const originalY = await page
          .locator(".acc-card")
          .first()
          .evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m42);
        await page.mouse.move(
          r.x + r.width * 0.58,
          r.y + r.height * 0.4 + 100,
          { steps: 8 },
        );
        const draggedY = await page
          .locator(".acc-card")
          .first()
          .evaluate((e) => new DOMMatrix(getComputedStyle(e).transform).m42);
        assert(
          draggedY > originalY + 50,
          "The photograph follows the mouse downward",
        );
        await page.mouse.move(
          r.x + r.width * 0.58,
          r.y + r.height * 0.4 + 230,
          { steps: 8 },
        );
        await page.mouse.up();
        await page.waitForTimeout(1000);
        await checkSelected(1);
        assert.equal(await page.locator("dialog[open]").count(), 0);
      },
    );
    await run(
      "Photo action and thumbnails open the existing gallery and restore focus",
      async () => {
        const trigger = page.getByRole("button", {
          name: "View room photographs",
          exact: true,
        });
        await trigger.click();
        await page
          .getByRole("dialog", { name: "Photo gallery", exact: true })
          .waitFor();
        await page.keyboard.press("Escape");
        await page
          .getByRole("dialog", { name: "Photo gallery", exact: true })
          .waitFor({ state: "detached" });
        assert.equal(
          await trigger.evaluate((e) => document.activeElement === e),
          true,
        );
        await page.locator(".room-photo-thumbnails button").nth(1).click();
        await page
          .getByRole("dialog", { name: "Photo gallery", exact: true })
          .waitFor();
        await page.keyboard.press("Escape");
        await page
          .getByRole("dialog", { name: "Photo gallery", exact: true })
          .waitFor({ state: "detached" });
        assert.equal(
          await page
            .locator(".room-photo-thumbnails button")
            .nth(1)
            .evaluate((e) => document.activeElement === e),
          true,
        );
      },
    );
    await run(
      "Selected-room enquiry carries its preference and dismisses back to the trigger",
      async () => {
        await page
          .getByRole("button", { name: "Enquire about this stay", exact: true })
          .click();
        await page.locator(".jh-booking-modal").waitFor();
        await page
          .getByLabel("Check-in date", { exact: true })
          .fill("2027-04-10");
        await page
          .getByLabel("Check-out date", { exact: true })
          .fill("2027-04-12");
        await page
          .getByRole("button", { name: "Choose your company", exact: true })
          .click();
        await page
          .locator('.stepper__pane[data-step="2"]:not([inert])')
          .waitFor();
        assert.equal(
          await page.getByLabel("Preferred room", { exact: true }).inputValue(),
          "A room with a mountain outlook",
        );
        await page.keyboard.press("Escape");
        await page.locator(".jh-booking-modal").waitFor({ state: "detached" });
        assert.equal(
          await page.evaluate(() =>
            document.activeElement.classList.contains("room-enquire"),
          ),
          true,
        );
      },
    );
    await run(
      "The arc meets the page edge and room details sit on the open page without a box",
      async () => {
        await top();
        const layout = await page.locator(".rooms-layout").boundingBox();
        assert.equal(Math.round(layout.x), 0);
        assert.equal(
          await page.locator(".rooms-story .rooms-heading").count(),
          1,
        );
        const detail = await page
          .locator(".room-detail-scene")
          .evaluate((e) => {
            const s = getComputedStyle(e);
            return {
              background: s.backgroundColor,
              border: s.borderTopWidth,
              shadow: s.boxShadow,
            };
          });
        assert.equal(detail.background, "rgba(0, 0, 0, 0)");
        assert.equal(detail.border, "0px");
        assert.equal(detail.shadow, "none");
        assert(
          (await page.locator('.acc-card[data-front="true"]').boundingBox()).x <
            0,
          "Selected photograph bleeds into the left page edge",
        );
        assert.match(
          await page
            .locator(".acc-stage")
            .evaluate((e) => getComputedStyle(e).maskImage),
          /linear-gradient/,
        );
      },
    );
    await run(
      "Official GlassSurface remains on the photo caption without an extra panel or WebGL renderer",
      async () => {
        assert.equal(
          await page.locator(".room-listings .rb-glass-surface").count(),
          1,
        );
        assert.equal(await page.locator(".room-listings canvas").count(), 0);
        assert.match(
          await page
            .locator(".acc-front-caption .rb-glass-surface")
            .evaluate((e) => getComputedStyle(e).backdropFilter),
          /blur/,
        );
        assert.equal(
          await page
            .locator(".acc-front-caption")
            .evaluate((e) => Math.round(e.getBoundingClientRect().height)),
          44,
        );
      },
    );
    await run(
      "Wheel scrolling remains native and offscreen card transforms stop",
      async () => {
        await top();
        await page.locator(".acc-stage").hover();
        const before = await page.evaluate(() => scrollY);
        await page.mouse.wheel(0, 450);
        await page.waitForTimeout(900);
        assert((await page.evaluate(() => scrollY)) > before + 150);
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        await page.waitForTimeout(700);
        await page.evaluate(() => {
          window.arcWrites = 0;
          window.arcObs = new MutationObserver(
            (es) => (window.arcWrites += es.length),
          );
          window.arcObs.observe(document.querySelector(".acc-stage"), {
            subtree: true,
            attributes: true,
            attributeFilter: ["style"],
          });
        });
        await page.waitForTimeout(650);
        assert.equal(await page.evaluate(() => window.arcWrites), 0);
        await page.evaluate(() => window.arcObs.disconnect());
      },
    );
    await run(
      "Edge-to-edge layout keeps details on the right at 768/929/1024/1440 and stacks on phones",
      async () => {
        for (const width of [320, 390, 768, 929, 1024, 1440]) {
          await page.setViewportSize({
            width,
            height: width < 768 ? 844 : 1100,
          });
          await top();
          await page.waitForTimeout(900);
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth > innerWidth + 1,
            ),
            false,
            `page overflow ${width}`,
          );
          const left = await page.locator(".arc-card-carousel").boundingBox(),
            right = await page.locator(".room-detail-scene").boundingBox();
          assert(left.x >= -1 && left.x + left.width <= width + 1);
          assert(right.x >= 0 && right.x + right.width <= width + 1);
          if (width >= 768) assert(right.x >= left.x + left.width + 20);
          else assert(right.y >= left.y + left.height + 20);
          for (const h of await page
            .locator(
              ".rooms-collection-nav button,.acc-arrows button,.room-enquire",
            )
            .evaluateAll((es) =>
              es.map((e) => e.getBoundingClientRect().height),
            ))
            assert(h >= 44);
        }
      },
    );
    await run(
      "Reduced motion settles selection immediately and reduced transparency stays solid",
      async () => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.reload({ waitUntil: "networkidle" });
        await top();
        await pick(1);
        await checkSelected(1);
        assert.equal(
          await page.locator(".arc-card-carousel").getAttribute("data-moving"),
          null,
        );
        assert.equal(
          await page.locator(".arc-card-carousel").getAttribute("data-reduced"),
          "true",
        );
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Emulation.setEmulatedMedia", {
          features: [
            { name: "prefers-reduced-motion", value: "reduce" },
            { name: "prefers-reduced-transparency", value: "reduce" },
          ],
        });
        assert.equal(
          await page
            .locator(".acc-front-caption .rb-glass-surface")
            .evaluate((e) => getComputedStyle(e).backgroundColor),
          "rgb(246, 242, 234)",
        );
      },
    );
    await run(
      "Phone horizontal swipe selects a room; vertical touch still scrolls the page",
      async () => {
        const phoneCtx = await browser.newContext({
            viewport: { width: 390, height: 844 },
            isMobile: true,
            hasTouch: true,
          }),
          phone = await phoneCtx.newPage();
        phone.on("pageerror", (e) => errors.push(e.message));
        await phone.goto("http://localhost:4174/?view=arc-touch#stay", {
          waitUntil: "networkidle",
        });
        await phone.locator(".acc-stage").scrollIntoViewIfNeeded();
        await phone.waitForTimeout(500);
        const client = await phoneCtx.newCDPSession(phone),
          r = await phone.locator(".acc-stage").boundingBox(),
          y = Math.max(170, r.y + r.height / 2);
        const send = async (type, x, y) =>
          client.send("Input.dispatchTouchEvent", {
            type,
            touchPoints: type === "touchEnd" ? [] : [{ x, y }],
          });
        await send("touchStart", 300, y);
        for (let i = 1; i <= 8; i++) await send("touchMove", 300 - i * 25, y);
        await send("touchEnd");
        await phone.waitForTimeout(1000);
        assert.match(await phone.locator(".acc-count").innerText(), /^02/);
        assert.equal(await phone.locator("dialog[open]").count(), 0);
        const before = await phone.evaluate(() => scrollY);
        await send("touchStart", 195, y + 50);
        for (let i = 1; i <= 8; i++)
          await send("touchMove", 195, y + 50 - i * 25);
        await send("touchEnd");
        await phone.waitForTimeout(700);
        assert((await phone.evaluate(() => scrollY)) > before + 70);
        assert.match(await phone.locator(".acc-count").innerText(), /^02/);
        await phoneCtx.close();
      },
    );
    await run(
      "Standalone rooms route uses the same arc and carries preference into Contact",
      async () => {
        await page.goto("http://localhost:4174/suites", {
          waitUntil: "networkidle",
        });
        assert.equal(await page.locator("h1#room-page-title").count(), 1);
        assert.equal(await page.locator(".arc-card-carousel").count(), 1);
        await pick(2);
        await page
          .getByRole("button", { name: "Enquire about this stay", exact: true })
          .click();
        await page.waitForURL("**/contact?room=unwind#plan");
        await page
          .getByLabel("Check-in date", { exact: true })
          .fill("2027-04-10");
        await page
          .getByLabel("Check-out date", { exact: true })
          .fill("2027-04-12");
        await page
          .getByRole("button", { name: "Choose your company", exact: true })
          .click();
        await page
          .locator('.stepper__pane[data-step="2"]:not([inert])')
          .waitFor();
        assert.equal(
          await page.getByLabel("Preferred room", { exact: true }).inputValue(),
          "A room for a family or group",
        );
      },
    );
    await run("No uncaught browser errors or failed local assets", async () => {
      assert.deepEqual(errors, []);
      assert.deepEqual(failedAssets, []);
    });
  } finally {
    fs.mkdirSync("docs/room-arc", { recursive: true });
    fs.writeFileSync(
      "docs/room-arc/qa.json",
      JSON.stringify(
        { date: new Date().toISOString(), results, errors, failedAssets },
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
