import "dotenv/config";

import { createServer } from "node:http";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const port = Number(process.env.PORT || 3000);

const clientDir = path.resolve("./dist/client");
const publicDir = path.resolve("./public");

const mime = {
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
};

const files = await readdir("./dist/server/assets");

const serverBundle = files.find(
  (f) => f.startsWith("server-") && f.endsWith(".js")
);

if (!serverBundle) {
  throw new Error("Bundle SSR não encontrado.");
}

const { default: handler } = await import(
  `./dist/server/assets/${serverBundle}`
);

async function sendStatic(file, res) {
  try {
    const buffer = await readFile(file);

    const ext = path.extname(file).toLowerCase();

    res.writeHead(200, {
      "Content-Type":
        mime[ext] || "application/octet-stream",
      "Cache-Control": "public,max-age=31536000",
    });

    res.end(buffer);

    return true;
  } catch {
    return false;
  }
}

createServer(async (req, res) => {
  try {
    const url = new URL(
      req.url,
      `http://${req.headers.host}`
    );

    if (await sendStatic(path.join(clientDir, url.pathname), res))
      return;

    if (await sendStatic(path.join(publicDir, url.pathname), res))
      return;

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : req,
      duplex: "half",
    });

    const response = await handler.fetch(request);

    res.writeHead(
      response.status,
      Object.fromEntries(response.headers)
    );

    const body = Buffer.from(
      await response.arrayBuffer()
    );

    res.end(body);
  } catch (err) {
    console.error(err);

    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}).listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});