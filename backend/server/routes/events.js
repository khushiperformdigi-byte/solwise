import { Router } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { requireAdmin } from "../middleware/auth.js";
import { query, queryOne } from "../utils/db.js";
import { uploadBuffer, destroyImage, thumbUrl } from "../utils/cloudinary.js";
import { slugify, formatDisplayDate } from "../utils/helpers.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (/^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WEBP, GIF images allowed"));
  },
});

function formatEventDate(iso) {
  if (!iso) return { day: "", month: "", year: "" };
  const d = new Date(`${String(iso).slice(0, 10)}T12:00:00`);
  if (Number.isNaN(d.getTime())) return { day: "", month: "", year: "" };
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    year: String(d.getFullYear()),
  };
}

function rowToEvent(row, { includeImage = true } = {}) {
  if (!row) return null;
  const parts = formatEventDate(row.event_date);
  const event = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description || "",
    category: row.category,
    status: row.status,
    eventDate: row.event_date ? String(row.event_date).slice(0, 10) : "",
    endDate: row.end_date ? String(row.end_date).slice(0, 10) : "",
    startTime: row.start_time || "",
    endTime: row.end_time || "",
    time: [row.start_time, row.end_time].filter(Boolean).join(" – ") || "",
    location: row.location || "",
    price: row.price || "",
    image: row.image || "",
    imagePublicId: row.image_public_id || "",
    bookingUrl: row.booking_url || "",
    date: formatDisplayDate(row.event_date),
    day: parts.day,
    month: parts.month,
    year: parts.year,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (includeImage && event.image) {
    event.image = thumbUrl(event.image, 800) || event.image;
  }
  return event;
}

async function uniqueSlug(base, exceptId = null) {
  let slug = slugify(base) || `event-${Date.now()}`;
  let n = 0;
  while (true) {
    const candidate = n === 0 ? slug : `${slug}-${n}`;
    const existing = exceptId
      ? await queryOne("SELECT id FROM events WHERE slug = ? COLLATE utf8mb4_unicode_ci AND id <> ? LIMIT 1", [
          candidate,
          exceptId,
        ])
      : await queryOne("SELECT id FROM events WHERE slug = ? COLLATE utf8mb4_unicode_ci LIMIT 1", [candidate]);
    if (!existing) return candidate;
    n += 1;
  }
}

function monthBounds(month) {
  const [y, m] = String(month).split("-").map(Number);
  const monthStart = `${month}-01`;
  const nextM = m === 12 ? 1 : m + 1;
  const nextY = m === 12 ? y + 1 : y;
  const monthEndExclusive = `${nextY}-${String(nextM).padStart(2, "0")}-01`;
  return { monthStart, monthEndExclusive };
}

/** Public: list published events */
router.get("/", async (req, res) => {
  try {
    const { month, upcoming, past, limit, category } = req.query;
    let sql = "SELECT * FROM events WHERE status = ?";
    const params = ["published"];
    const today = new Date().toISOString().slice(0, 10);

    if (category && category !== "All") {
      sql += " AND category = ?";
      params.push(String(category));
    }
    if (month && /^\d{4}-\d{2}$/.test(String(month))) {
      const { monthStart, monthEndExclusive } = monthBounds(month);
      sql += ` AND (
        (event_date >= ? AND event_date < ?)
        OR (event_date < ? AND COALESCE(end_date, event_date) >= ?)
      )`;
      params.push(monthStart, monthEndExclusive, monthEndExclusive, monthStart);
    }
    if (upcoming === "true") {
      sql += " AND event_date >= ?";
      params.push(today);
    }
    if (past === "true") {
      sql += " AND event_date < ?";
      params.push(today);
    }

    sql += upcoming === "true" ? " ORDER BY event_date ASC" : " ORDER BY event_date DESC";
    if (limit) {
      const n = Math.min(Math.max(Number(limit) || 0, 1), 100);
      sql += ` LIMIT ${n}`;
    }

    const rows = await query(sql, params);
    res.json(rows.map((row) => rowToEvent(row)));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to list events" });
  }
});

/** Admin: list all events */
router.get("/admin/all", requireAdmin, async (req, res) => {
  try {
    const { q, status } = req.query;
    let sql = "SELECT * FROM events WHERE 1=1";
    const params = [];

    if (status && status !== "All") {
      sql += " AND status = ?";
      params.push(String(status));
    }
    if (q) {
      const needle = `%${String(q).toLowerCase()}%`;
      sql += " AND (LOWER(title) LIKE ? OR LOWER(slug) LIKE ? OR LOWER(category) LIKE ? OR LOWER(IFNULL(location,'')) LIKE ?)";
      params.push(needle, needle, needle, needle);
    }
    sql += " ORDER BY event_date DESC, created_at DESC";

    const rows = await query(sql, params);
    res.json(rows.map((row) => rowToEvent(row, { includeImage: false })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to list events" });
  }
});

router.get("/admin/:id", requireAdmin, async (req, res) => {
  try {
    const row = await queryOne("SELECT * FROM events WHERE id = ? LIMIT 1", [req.params.id]);
    if (!row) return res.status(404).json({ error: "Event not found" });
    res.json(rowToEvent(row, { includeImage: false }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load event" });
  }
});

/** Public: single event by slug */
router.get("/slug/:slug", async (req, res) => {
  try {
    const row = await queryOne(
      "SELECT * FROM events WHERE slug = ? COLLATE utf8mb4_unicode_ci AND status = ? LIMIT 1",
      [req.params.slug, "published"],
    );
    if (!row) return res.status(404).json({ error: "Event not found" });
    res.json(rowToEvent(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load event" });
  }
});

router.post("/upload-image", requireAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image provided" });
    const result = await uploadBuffer(req.file.buffer, { folder: "solwise/events" });
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

router.post("/", requireAdmin, async (req, res) => {
  try {
    const body = req.body || {};
    const title = String(body.title || "").trim();
    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!body.eventDate) return res.status(400).json({ error: "Event date is required" });

    const id = uuid();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const slug = await uniqueSlug(body.slug || title);

    await query(
      `INSERT INTO events
        (id, slug, title, description, category, status, event_date, end_date,
         start_time, end_time, location, price, image, image_public_id, booking_url, created_at, updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        slug,
        title,
        String(body.description || "").trim(),
        String(body.category || "Workshop").trim() || "Workshop",
        body.status === "draft" ? "draft" : "published",
        String(body.eventDate).slice(0, 10),
        body.endDate ? String(body.endDate).slice(0, 10) : null,
        body.startTime ? String(body.startTime).trim() : null,
        body.endTime ? String(body.endTime).trim() : null,
        body.location ? String(body.location).trim() : null,
        body.price ? String(body.price).trim() : null,
        body.image || null,
        body.imagePublicId || null,
        body.bookingUrl ? String(body.bookingUrl).trim() : null,
        now,
        now,
      ],
    );

    const row = await queryOne("SELECT * FROM events WHERE id = ? LIMIT 1", [id]);
    res.status(201).json(rowToEvent(row, { includeImage: false }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to create event" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const existing = await queryOne("SELECT * FROM events WHERE id = ? LIMIT 1", [req.params.id]);
    if (!existing) return res.status(404).json({ error: "Event not found" });

    const body = req.body || {};
    const title = body.title !== undefined ? String(body.title).trim() : existing.title;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const slug =
      body.slug !== undefined
        ? await uniqueSlug(body.slug || title, existing.id)
        : existing.slug;

    const newImage = body.image !== undefined ? body.image : existing.image;
    const newPublicId =
      body.imagePublicId !== undefined ? body.imagePublicId : existing.image_public_id;

    if (existing.image_public_id && newPublicId !== existing.image_public_id) {
      destroyImage(existing.image_public_id).catch(() => {});
    }

    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    await query(
      `UPDATE events SET
        slug=?, title=?, description=?, category=?, status=?,
        event_date=?, end_date=?, start_time=?, end_time=?,
        location=?, price=?, image=?, image_public_id=?, booking_url=?, updated_at=?
       WHERE id=?`,
      [
        slug,
        title,
        body.description !== undefined ? String(body.description).trim() : existing.description,
        body.category !== undefined ? String(body.category).trim() : existing.category,
        body.status === "draft" ? "draft" : body.status === "published" ? "published" : existing.status,
        body.eventDate !== undefined ? String(body.eventDate).slice(0, 10) : existing.event_date,
        body.endDate !== undefined
          ? body.endDate
            ? String(body.endDate).slice(0, 10)
            : null
          : existing.end_date,
        body.startTime !== undefined
          ? body.startTime
            ? String(body.startTime).trim()
            : null
          : existing.start_time,
        body.endTime !== undefined
          ? body.endTime
            ? String(body.endTime).trim()
            : null
          : existing.end_time,
        body.location !== undefined
          ? body.location
            ? String(body.location).trim()
            : null
          : existing.location,
        body.price !== undefined
          ? body.price
            ? String(body.price).trim()
            : null
          : existing.price,
        newImage,
        newPublicId,
        body.bookingUrl !== undefined
          ? body.bookingUrl
            ? String(body.bookingUrl).trim()
            : null
          : existing.booking_url,
        now,
        existing.id,
      ],
    );

    const row = await queryOne("SELECT * FROM events WHERE id = ? LIMIT 1", [existing.id]);
    res.json(rowToEvent(row, { includeImage: false }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to update event" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await queryOne("SELECT * FROM events WHERE id = ? LIMIT 1", [req.params.id]);
    if (!item) return res.status(404).json({ error: "Event not found" });

    await query("DELETE FROM events WHERE id = ?", [item.id]);
    if (item.image_public_id) {
      destroyImage(item.image_public_id).catch(() => {});
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to delete event" });
  }
});

export default router;
