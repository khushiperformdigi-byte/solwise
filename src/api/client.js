const HOSTINGER_API = "https://cyan-partridge-897511.hostingersite.com";
// In dev, use Vite proxy (/api → localhost:5000) so local backend fixes apply immediately
const API_URL = import.meta.env.DEV
  ? ""
  : String(import.meta.env.VITE_API_URL || HOSTINGER_API).replace(/\/$/, "");

function getToken() {
  return localStorage.getItem("solwise_admin_token");
}

export function setToken(token) {
  if (token) localStorage.setItem("solwise_admin_token", token);
  else localStorage.removeItem("solwise_admin_token");
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    body:
      options.body instanceof FormData || typeof options.body === "string"
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && getToken()) {
      setToken(null);
      if (
        typeof window !== "undefined" &&
        window.location.pathname.startsWith("/admin") &&
        !window.location.pathname.includes("/login")
      ) {
        window.location.href = "/admin/login";
      }
    }
    const err = new Error(data.error || res.statusText || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/** Compress image in-browser before upload — saves Cloudinary storage & bandwidth */
export async function compressImage(file, { maxWidth = 1920, quality = 0.82 } = {}) {
  if (!file?.type?.startsWith("image/")) return file;
  if (file.type === "image/gif") return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
  if (!blob) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}

export async function compressImages(files, opts) {
  const out = [];
  for (const file of files) {
    out.push(await compressImage(file, opts));
  }
  return out;
}
