import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"],
});

// mobile 360
const m = await browser.newPage();
await m.setViewport({ width: 360, height: 740, deviceScaleFactor: 2 });
await m.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 2200));
const overflow = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log("mobile overflow px:", overflow);
await m.screenshot({ path: "/tmp/rm_hero.png" });
await m.evaluate(() => document.querySelector("#process")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1400));
await m.screenshot({ path: "/tmp/rm_process.png" });

// reduced motion desktop -> services hover-at-rest + headline visible
const rm = await browser.newPage();
await rm.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await rm.setViewport({ width: 1440, height: 900 });
await rm.goto("http://localhost:3001", { waitUntil: "networkidle0" });
await new Promise((r) => setTimeout(r, 800));
const h1op = await rm.evaluate(() => getComputedStyle(document.querySelector("h1")).opacity);
console.log("reduced-motion h1 opacity:", h1op);
await rm.evaluate(() => document.querySelector("#work")?.scrollIntoView());
await new Promise((r) => setTimeout(r, 1000));
const titleTop = await rm.evaluate(() => document.querySelector("#work-heading").getBoundingClientRect().top);
console.log("work heading top after anchor (px from viewport top):", Math.round(titleTop));
await rm.screenshot({ path: "/tmp/rm_workanchor.png" });
await browser.close();
