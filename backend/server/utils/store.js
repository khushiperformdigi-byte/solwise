import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

function filePath(name) {
  return path.join(dataDir, `${name}.json`);
}

export function readStore(name, fallback) {
  ensureDir();
  const fp = filePath(name);
  if (!fs.existsSync(fp)) {
    writeStore(name, fallback);
    return structuredClone(fallback);
  }
  try {
    return JSON.parse(fs.readFileSync(fp, "utf8"));
  } catch {
    return structuredClone(fallback);
  }
}

export function writeStore(name, data) {
  ensureDir();
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf8");
}

export function updateStore(name, fallback, updater) {
  const current = readStore(name, fallback);
  const next = updater(current);
  writeStore(name, next);
  return next;
}
