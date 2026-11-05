// Post-build: writes dist/encuesta/index.html (so /encuesta serves with
// HTTP 200 instead of falling through to 404.html) with `noindex` and its
// own title baked into the static HTML. SurveyPage.tsx also adds the
// robots meta at runtime, but crawlers and link-preview scrapers that
// don't run JavaScript (Bing, WhatsApp, Facebook) only see this file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const html = readFileSync("dist/index.html", "utf8");
const marker = "<title>Blendia</title>";
if (!html.includes(marker)) {
  throw new Error(`encuesta-html: "${marker}" not found in dist/index.html`);
}

mkdirSync("dist/encuesta", { recursive: true });
writeFileSync(
  "dist/encuesta/index.html",
  html.replace(
    marker,
    '<meta name="robots" content="noindex, nofollow" />\n    <title>Encuesta · Blendia</title>'
  )
);
