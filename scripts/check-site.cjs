// Optional browser QA. Install Playwright separately; the site has no runtime dependencies.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.SITE_URL || "http://127.0.0.1:8765";
const out = process.env.QA_OUTPUT || "/tmp/portfolio-qa";

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const results = [];
    for (const width of [320, 375, 768, 1024, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        if (response.url().startsWith(base) && response.status() >= 400)
          errors.push(`${response.status()} ${response.url()}`);
      });
      await page.goto(base);
      assert.equal(await page.locator("h1").count(), 1, "One main heading");
      await page.keyboard.press("Tab");
      assert.equal(
        await page.locator(":focus").textContent(),
        "Skip to content",
      );
      assert.ok(
        await page
          .locator(":focus")
          .evaluate((el) => getComputedStyle(el).outlineStyle !== "none"),
        "Visible focus outline",
      );
      await page.locator(".skip-link").hover();
      assert.ok(
        await page
          .locator(".skip-link")
          .evaluate(
            (el) =>
              getComputedStyle(el).color !==
              getComputedStyle(el).backgroundColor,
          ),
        "Skip-link hover remains readable",
      );
      await page.keyboard.press("Enter");
      assert.equal(new URL(page.url()).hash, "#main");
      for (const name of ["Work", "Expertise", "Experience", "Contact"]) {
        const link = page
          .getByRole("navigation", { name: "Primary" })
          .getByRole("link", { name, exact: true });
        await link.click();
        assert.equal(new URL(page.url()).hash, await link.getAttribute("href"));
      }
      const localErrors = await page.evaluate(() => {
        const ids = [...document.querySelectorAll("[id]")].map((el) => el.id);
        const failures = ids
          .filter((id, i) => ids.indexOf(id) !== i)
          .map((id) => `Duplicate ID: ${id}`);
        for (const a of document.querySelectorAll('a[href^="#"]')) {
          if (!document.getElementById(a.hash.slice(1)))
            failures.push(`Missing anchor: ${a.hash}`);
        }
        for (const el of document.querySelectorAll("body *")) {
          if (!el.getClientRects().length || el.classList.contains("skip-link"))
            continue;
          const rect = el.getBoundingClientRect();
          if (rect.width && (rect.right > innerWidth + 1 || rect.left < -1))
            failures.push(`Overflow: ${el.tagName}.${el.className}`);
        }
        return failures;
      });
      assert.deepEqual(localErrors, [], `${width}px layout/anchors`);
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollBehavior,
        ),
        "auto",
        "Reduced-motion scrolling",
      );
      for (const details of await page.locator("details").all()) {
        const summary = details.locator("summary");
        await summary.focus();
        await page.keyboard.press("Enter");
        assert.ok(
          await details.evaluate((el) => el.open),
          "Keyboard opens details",
        );
        await page.keyboard.press("Space");
        assert.equal(
          await details.evaluate((el) => el.open),
          false,
          "Keyboard closes details",
        );
      }
      const metadata = await page.evaluate(() => ({
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        image: document.querySelector('meta[property="og:image"]')?.content,
        person: JSON.parse(
          document.querySelector('script[type="application/ld+json"]')
            .textContent,
        ),
        assets: [
          ...document.querySelectorAll(
            'link[rel="stylesheet"], link[rel="icon"]',
          ),
        ].map((el) => el.href),
      }));
      assert.equal(metadata.canonical, "https://imranshad.github.io/");
      assert.equal(metadata.person["@type"], "Person");
      assert.ok(metadata.image, "Sharing image present");
      for (const url of [
        ...metadata.assets,
        base + new URL(metadata.image).pathname,
        base + "/sitemap.xml",
        base + "/robots.txt",
      ]) {
        assert.equal(
          (await page.request.get(url)).status(),
          200,
          `Local asset: ${url}`,
        );
      }
      assert.deepEqual(errors, [], "No JavaScript or local HTTP errors");
      await page.goto(base);
      await page.screenshot({ path: `${out}/${width}.png`, fullPage: true });
      if (width === 1440 || width === 375)
        await page.screenshot({ path: `${out}/${width}-hero.png` });
      results.push({ width, passed: true, errors });
      await context.close();
    }
    const noJS = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 375, height: 812 },
    });
    const page = await noJS.newPage();
    await page.goto(base);
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Work", exact: true })
      .click();
    assert.equal(new URL(page.url()).hash, "#work");
    // Wait for the native anchor scroll before issuing a second scroll/click.
    // Poll from Node: page-side animation-frame polling is unavailable with JS disabled.
    let settled = false;
    for (let attempt = 0; attempt < 50; attempt++) {
      const rect = await page.locator("#work").boundingBox();
      if (Math.abs(rect.y - 24) < 2) {
        settled = true;
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.ok(settled, "Native anchor scrolling settles without JavaScript");
    const summary = page.locator("summary").first();
    await summary.click();
    assert.ok(
      (await page.locator("details").first().getAttribute("open")) !== null,
    );
    assert.ok(
      await page
        .getByRole("link", { name: "imran.shad@ymail.com", exact: true })
        .isVisible(),
    );
    await noJS.close();
    fs.writeFileSync(
      `${out}/results.json`,
      JSON.stringify({ results, noJavaScript: "passed" }, null, 2),
    );
    console.log(
      "PASS: 5 viewport widths; navigation; anchors; visible keyboard focus; native disclosures; local assets; metadata; reduced motion; no-JS; no browser errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
