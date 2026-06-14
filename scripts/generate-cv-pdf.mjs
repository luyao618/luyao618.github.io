import { createServer } from "node:http";
import { createReadStream, existsSync, mkdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const repoRoot = resolve(new URL("..", import.meta.url).pathname);
const buildDir = process.env.CV_PDF_BUILD_DIR || "/tmp/luyao-cv-pdf-build";
const outputPath = resolve(repoRoot, "assets/pdf/luyao-cv.pdf");
const port = Number(process.env.CV_PDF_PORT || 4118);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function runJekyllBuild() {
  const result = spawnSync("bundle", ["exec", "jekyll", "build", "--destination", buildDir], {
    cwd: repoRoot,
    env: process.env,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`Jekyll build failed with exit code ${result.status}`);
  }
}

function startStaticServer() {
  const server = createServer((request, response) => {
    const requestUrl = new URL(request.url || "/", `http://127.0.0.1:${port}`);
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const filePath = resolve(join(buildDir, pathname));
    if (!filePath.startsWith(resolve(buildDir)) || !existsSync(filePath)) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  });

  return new Promise((resolveServer, reject) => {
    server.on("error", reject);
    server.listen(port, "127.0.0.1", () => resolveServer(server));
  });
}

async function generatePdf() {
  mkdirSync(resolve(repoRoot, "assets/pdf"), { recursive: true });

  runJekyllBuild();
  const server = await startStaticServer();
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1800 }, deviceScaleFactor: 1 });
    await page.goto(`http://127.0.0.1:${port}/cv/`, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      localStorage.setItem("resume-language", "zh");
      document.querySelector(".cv-resume")?.classList.remove("is-english");
    });
    await page.emulateMedia({ media: "print" });
    await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: "12mm",
        right: "12mm",
        bottom: "12mm",
        left: "12mm",
      },
    });
  } finally {
    await browser.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }

  console.log(`Generated ${outputPath}`);
}

generatePdf().catch((error) => {
  console.error(error);
  process.exit(1);
});
