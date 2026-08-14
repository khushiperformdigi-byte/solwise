import { Router } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { requireAdmin } from "../middleware/auth.js";
import { query, queryOne, parseJson } from "../utils/db.js";
import { uploadBuffer, destroyImage, thumbUrl } from "../utils/cloudinary.js";
import {
  slugify,
  sanitizeContent,
  estimateReadTime,
  formatDisplayDate,
} from "../utils/helpers.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(_req, file, cb) {
    if (/^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, PNG, WEBP, GIF images allowed"));
  },
});

function rowToPost(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    content: row.content || "",
    category: row.category,
    tags: parseJson(row.tags, []),
    author: row.author,
    status: row.status,
    image: row.image || "",
    imagePublicId: row.image_public_id || "",
    readTime: row.read_time || "",
    isPopular: !!row.is_popular,
    allowComments: row.allow_comments !== 0,
    metaTitle: row.meta_title || "",
    metaDescription: row.meta_description || "",
    faqs: parseJson(row.faqs, []),
    publishDate: row.publish_date,
    date: formatDisplayDate(row.publish_date),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) return tags.map((t) => String(t).trim()).filter(Boolean);
  return String(tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function normalizeFaqs(faqs) {
  if (!Array.isArray(faqs)) return [];
  return faqs
    .map((f) => ({
      question: String(f?.question || "").trim(),
      answer: String(f?.answer || "").trim(),
    }))
    .filter((f) => f.question && f.answer);
}

async function uniqueSlug(base, exceptId = null) {
  let slug = slugify(base) || `post-${Date.now()}`;
  let n = 0;
  while (true) {
    const candidate = n === 0 ? slug : `${slug}-${n}`;
    const existing = exceptId
      ? await queryOne("SELECT id FROM blogs WHERE slug = ? AND id <> ? LIMIT 1", [
          candidate,
          exceptId,
        ])
      : await queryOne("SELECT id FROM blogs WHERE slug = ? LIMIT 1", [candidate]);
    if (!existing) return candidate;
    n += 1;
  }
}

/** Public: list published posts */
router.get("/", async (req, res) => {
  try {
    const { q, category } = req.query;
    let sql = "SELECT * FROM blogs WHERE status = 'published'";
    const params = [];

    if (category && category !== "All" && category !== "All Articles") {
      sql += " AND category = ?";
      params.push(String(category));
    }
    if (q) {
      const needle = `%${String(q).toLowerCase()}%`;
      sql +=
        " AND (LOWER(title) LIKE ? OR LOWER(IFNULL(excerpt,'')) LIKE ? OR LOWER(category) LIKE ? OR LOWER(IFNULL(tags,'')) LIKE ?)";
      params.push(needle, needle, needle, needle);
    }
    sql += " ORDER BY publish_date DESC, created_at DESC";

    const rows = await query(sql, params);
    const posts = rows.map((row) => {
      const full = rowToPost(row);
      const { content, faqs, metaDescription, ...list } = full;
      return {
        ...list,
        image: thumbUrl(list.image, 640) || list.image,
      };
    });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to list posts" });
  }
});

/** Admin: list all posts */
router.get("/admin/all", requireAdmin, async (req, res) => {
  try {
    const { q, status } = req.query;
    let sql = "SELECT * FROM blogs WHERE 1=1";
    const params = [];

    if (status && status !== "All") {
      sql += " AND status = ?";
      params.push(String(status).toLowerCase());
    }
    if (q) {
      const needle = `%${String(q).toLowerCase()}%`;
      sql +=
        " AND (LOWER(title) LIKE ? OR LOWER(slug) LIKE ? OR LOWER(category) LIKE ? OR LOWER(IFNULL(tags,'')) LIKE ?)";
      params.push(needle, needle, needle, needle);
    }
    sql += " ORDER BY updated_at DESC";

    const rows = await query(sql, params);
    res.json(rows.map((row) => {
      const post = rowToPost(row);
      return { ...post, image: thumbUrl(post.image, 160) || post.image };
    }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to list posts" });
  }
});

router.get("/slug/:slug", async (req, res) => {
  try {
    const row = await queryOne("SELECT * FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1", [
      req.params.slug,
    ]);
    if (!row) return res.status(404).json({ error: "Post not found" });
    res.json(rowToPost(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load post" });
  }
});

router.get("/admin/:id", requireAdmin, async (req, res) => {
  try {
    const row = await queryOne("SELECT * FROM blogs WHERE id = ? LIMIT 1", [req.params.id]);
    if (!row) return res.status(404).json({ error: "Post not found" });
    res.json(rowToPost(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load post" });
  }
});

router.get("/meta/categories", async (_req, res) => {
  try {
    const rows = await query(
      "SELECT category AS name, COUNT(*) AS count FROM blogs WHERE status = 'published' AND category <> '' GROUP BY category ORDER BY name",
    );
    res.json(rows.map((r) => ({ name: r.name, count: Number(r.count) })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load categories" });
  }
});

/** Featured / TinyMCE image upload — one Cloudinary call only when a file is sent */
router.post("/upload-image", requireAdmin, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image file" });
    const result = await uploadBuffer(req.file.buffer, { folder: "solwise/blogs" });
    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
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

    const slug = await uniqueSlug(body.slug || title);
    const content = sanitizeContent(body.content);
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const publishDate = (body.publishDate || now.slice(0, 10)).slice(0, 10);
    const tags = normalizeTags(body.tags);
    const faqs = normalizeFaqs(body.faqs);
    const id = uuid();

    await query(
      `INSERT INTO blogs (
        id, slug, title, excerpt, content, category, tags, author, status,
        image, image_public_id, read_time, is_popular, allow_comments,
        meta_title, meta_description, faqs, publish_date, created_at, updated_at
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        slug,
        title,
        String(body.excerpt || "").trim(),
        content,
        String(body.category || "General").trim() || "General",
        JSON.stringify(tags),
        String(body.author || "Dr. Sachin Bansal").trim(),
        body.status === "draft" ? "draft" : "published",
        String(body.image || "").trim(),
        body.imagePublicId || "",
        body.readTime || estimateReadTime(content),
        body.isPopular ? 1 : 0,
        body.allowComments === false ? 0 : 1,
        String(body.metaTitle || "").trim(),
        String(body.metaDescription || "").trim(),
        JSON.stringify(faqs),
        publishDate,
        now,
        now,
      ],
    );

    const row = await queryOne("SELECT * FROM blogs WHERE id = ? LIMIT 1", [id]);
    res.status(201).json(rowToPost(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to create post" });
  }
});

router.put("/:id", requireAdmin, async (req, res) => {
  try {
    const existing = await queryOne("SELECT * FROM blogs WHERE id = ? LIMIT 1", [req.params.id]);
    if (!existing) return res.status(404).json({ error: "Post not found" });

    const body = req.body || {};
    const title = body.title !== undefined ? String(body.title).trim() : existing.title;
    const slug = await uniqueSlug(body.slug || title, existing.id);
    const content =
      body.content !== undefined ? sanitizeContent(body.content) : existing.content;
    const nextImage = body.image !== undefined ? String(body.image || "").trim() : existing.image;
    const nextPublicId =
      body.imagePublicId !== undefined ? body.imagePublicId || "" : existing.image_public_id || "";

    if (existing.image_public_id && existing.image_public_id !== nextPublicId) {
      destroyImage(existing.image_public_id).catch(() => {});
    }

    const tags =
      body.tags !== undefined ? normalizeTags(body.tags) : parseJson(existing.tags, []);
    const faqs = body.faqs !== undefined ? normalizeFaqs(body.faqs) : parseJson(existing.faqs, []);
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    const publishDate = (body.publishDate || existing.publish_date || now.slice(0, 10))
      .toString()
      .slice(0, 10);

    await query(
      `UPDATE blogs SET
        slug=?, title=?, excerpt=?, content=?, category=?, tags=?, author=?, status=?,
        image=?, image_public_id=?, read_time=?, is_popular=?, allow_comments=?,
        meta_title=?, meta_description=?, faqs=?, publish_date=?, updated_at=?
      WHERE id=?`,
      [
        slug,
        title,
        body.excerpt !== undefined ? String(body.excerpt).trim() : existing.excerpt,
        content,
        body.category !== undefined ? String(body.category).trim() : existing.category,
        JSON.stringify(tags),
        body.author !== undefined ? String(body.author).trim() : existing.author,
        body.status !== undefined
          ? body.status === "draft"
            ? "draft"
            : "published"
          : existing.status,
        nextImage,
        nextPublicId,
        body.readTime ||
          (body.content !== undefined ? estimateReadTime(content) : existing.read_time),
        body.isPopular !== undefined ? (body.isPopular ? 1 : 0) : existing.is_popular,
        body.allowComments !== undefined
          ? body.allowComments === false
            ? 0
            : 1
          : existing.allow_comments,
        body.metaTitle !== undefined ? String(body.metaTitle).trim() : existing.meta_title,
        body.metaDescription !== undefined
          ? String(body.metaDescription).trim()
          : existing.meta_description,
        JSON.stringify(faqs),
        publishDate,
        now,
        existing.id,
      ],
    );

    const row = await queryOne("SELECT * FROM blogs WHERE id = ? LIMIT 1", [existing.id]);
    res.json(rowToPost(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to update post" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const post = await queryOne("SELECT * FROM blogs WHERE id = ? LIMIT 1", [req.params.id]);
    if (!post) return res.status(404).json({ error: "Post not found" });

    await query("DELETE FROM comments WHERE post_id = ? OR post_slug = ?", [post.id, post.slug]);
    await query("DELETE FROM blogs WHERE id = ?", [post.id]);

    if (post.image_public_id) {
      destroyImage(post.image_public_id).catch(() => {});
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to delete post" });
  }
});

export default router;
