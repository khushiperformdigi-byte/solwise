import { Router } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { requireAdmin } from "../middleware/auth.js";
import { query, queryOne } from "../utils/db.js";
import { uploadBuffer, destroyImage, thumbUrl } from "../utils/cloudinary.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 12 },
  fileFilter(_req, file, cb) {
    if (/^image\/(jpeg|png|webp)$/i.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WEBP allowed"));
  },
});

function rowToItem(row) {
  return {
    id: row.id,
    url: row.url,
    publicId: row.public_id || "",
    alt: row.alt || "",
    category: row.category,
    tall: !!row.tall,
    sortOrder: Number(row.sort_order || 0),
    createdAt: row.created_at,
  };
}

/** Public gallery list — stored URLs only (no Cloudinary Admin API) */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let sql = "SELECT * FROM gallery";
    const params = [];
    if (category && category !== "All") {
      sql += " WHERE category = ?";
      params.push(String(category));
    }
    sql += " ORDER BY sort_order ASC, created_at DESC";

    const rows = await query(sql, params);
    res.json(
      rows.map((row) => {
        const item = rowToItem(row);
        return {
          ...item,
          src: thumbUrl(item.url, 900) || item.url,
          thumb: thumbUrl(item.url, 600) || item.url,
        };
      }),
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load gallery" });
  }
});

router.get("/admin/all", requireAdmin, async (_req, res) => {
  try {
    const rows = await query("SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC");
    res.json(
      rows.map((row) => {
        const item = rowToItem(row);
        return { ...item, thumb: thumbUrl(item.url, 400) || item.url };
      }),
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load gallery" });
  }
});

/**
 * Bulk upload (max 12). Sequential Cloudinary uploads to avoid free-tier spikes.
 * Client should compress images before sending.
 */
router.post("/upload", requireAdmin, upload.array("images", 12), async (req, res) => {
  try {
    const files = req.files || [];
    if (!files.length) return res.status(400).json({ error: "No images provided" });

    const category = String(req.body.category || "Events").trim() || "Events";
    const altBase = String(req.body.alt || "").trim();
    const orderRow = await queryOne("SELECT MAX(sort_order) AS maxOrder FROM gallery");
    let startOrder = Number(orderRow?.maxOrder || 0);

    const uploaded = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await uploadBuffer(file.buffer, { folder: "solwise/gallery" });
      const id = uuid();
      const now = new Date().toISOString().slice(0, 19).replace("T", " ");
      const item = {
        id,
        url: result.secure_url,
        publicId: result.public_id,
        alt: altBase || file.originalname.replace(/\.[^.]+$/, ""),
        category,
        tall: 0,
        sortOrder: startOrder + i + 1,
        createdAt: now,
      };
      await query(
        `INSERT INTO gallery (id, url, public_id, alt, category, tall, sort_order, created_at)
         VALUES (?,?,?,?,?,?,?,?)`,
        [item.id, item.url, item.publicId, item.alt, item.category, 0, item.sortOrder, item.createdAt],
      );
      uploaded.push(item);
    }

    res.status(201).json({ uploaded, count: uploaded.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

router.patch("/:id", requireAdmin, async (req, res) => {
  try {
    const existing = await queryOne("SELECT * FROM gallery WHERE id = ? LIMIT 1", [req.params.id]);
    if (!existing) return res.status(404).json({ error: "Image not found" });

    const { alt, category, tall, sortOrder } = req.body || {};
    await query(
      "UPDATE gallery SET alt=?, category=?, tall=?, sort_order=? WHERE id=?",
      [
        alt !== undefined ? String(alt) : existing.alt,
        category !== undefined ? String(category) : existing.category,
        tall !== undefined ? (tall ? 1 : 0) : existing.tall,
        sortOrder !== undefined ? Number(sortOrder) : existing.sort_order,
        existing.id,
      ],
    );
    const row = await queryOne("SELECT * FROM gallery WHERE id = ? LIMIT 1", [existing.id]);
    res.json(rowToItem(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to update image" });
  }
});

router.post("/reorder", requireAdmin, async (req, res) => {
  try {
    const { order } = req.body || {};
    if (!Array.isArray(order)) return res.status(400).json({ error: "order array required" });

    for (let i = 0; i < order.length; i++) {
      await query("UPDATE gallery SET sort_order = ? WHERE id = ?", [i + 1, order[i]]);
    }
    const rows = await query("SELECT * FROM gallery ORDER BY sort_order ASC, created_at DESC");
    res.json(rows.map(rowToItem));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to reorder" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const item = await queryOne("SELECT * FROM gallery WHERE id = ? LIMIT 1", [req.params.id]);
    if (!item) return res.status(404).json({ error: "Image not found" });

    await query("DELETE FROM gallery WHERE id = ?", [item.id]);
    if (item.public_id) {
      destroyImage(item.public_id).catch(() => {});
    }
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to delete image" });
  }
});

export default router;
