/** Static defaults for Hostinger (env vars override when set). */
export const config = {
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "u621362592_soulw",
    password: process.env.DB_PASSWORD || "Soulw@321",
    database: process.env.DB_NAME || "u621362592_soulw",
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "ju17wneq",
    api_key: process.env.CLOUDINARY_API_KEY || "641479794968111",
    api_secret: process.env.CLOUDINARY_API_SECRET || "88Vmufm_pFApNS3SazHJTXzUw2w",
  },
};
