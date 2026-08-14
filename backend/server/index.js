import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blogs.js";
import commentRoutes from "./routes/comments.js";
import galleryRoutes from "./routes/gallery.js";
import eventRoutes from "./routes/events.js";
import { pingDb } from "./utils/db.js";

const app = express();
const PORT = process.env.PORT || 5000;
const PUBLIC_API = process.env.PUBLIC_API_URL || "https://cyan-partridge-897511.hostingersite.com";

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", async (_req, res) => {
  try {
    await pingDb();
    res.json({ ok: true, service: "solwise-api", db: true, publicApi: PUBLIC_API });
  } catch (err) {
    res.status(500).json({ ok: false, service: "solwise-api", db: false, error: err.message });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/events", eventRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`Solwise API running on http://localhost:${PORT}`);
  console.log(`Public API DNS: ${PUBLIC_API}`);
  try {
    await pingDb();
    console.log("Hostinger MySQL connected");
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
  }
});
