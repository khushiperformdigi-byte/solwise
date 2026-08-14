import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true,
});

/**
 * Upload only when needed. Prefer storing existing CDN URLs as-is.
 * Avoid Cloudinary Admin API listing calls — they burn free-tier quota.
 */
export function uploadBuffer(buffer, { folder, publicId } = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder || "solwise",
        public_id: publicId,
        resource_type: "image",
        overwrite: false,
        unique_filename: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    Readable.from(buffer).pipe(stream);
  });
}

export function destroyImage(publicId) {
  if (!publicId) return Promise.resolve(null);
  return cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

/** Delivery URL with CDN transforms (no extra API call / no quota hit). */
export function thumbUrl(url, width = 400) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/c_fill,w_${width},q_auto,f_auto/`);
}

export { cloudinary };
