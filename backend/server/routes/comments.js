import { Router } from "express";
import { v4 as uuid } from "uuid";
import sanitizeHtml from "sanitize-html";
import { requireAdmin } from "../middleware/auth.js";
import { query, queryOne } from "../utils/db.js";

const router = Router();

function cleanText(text) {
  return sanitizeHtml(String(text || "").trim(), {
    allowedTags: [],
    allowedAttributes: {},
  }).slice(0, 2000);
}

function nestComments(flat, { includePending = false } = {}) {
  const visible = includePending ? flat : flat.filter((c) => c.status === "approved");
  const byId = new Map(visible.map((c) => [c.id, { ...c, replies: [] }]));
  const roots = [];

  for (const c of byId.values()) {
    if (c.parentId && byId.has(c.parentId)) {
      byId.get(c.parentId).replies.push(c);
    } else if (!c.parentId) {
      roots.push(c);
    } else if (includePending) {
      roots.push(c);
    }
  }

  const sortFn = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
  function sortTree(nodes) {
    nodes.sort(sortFn);
    nodes.forEach((n) => sortTree(n.replies));
  }
  sortTree(roots);
  return roots;
}

function rowToComment(row) {
  return {
    id: row.id,
    postSlug: row.post_slug,
    postId: row.post_id || "",
    parentId: row.parent_id || null,
    authorName: row.author_name,
    authorEmail: row.author_email || "",
    content: row.content,
    status: row.status,
    createdAt: row.created_at,
  };
}

/** Public: approved comments for a post (nested) */
router.get("/post/:slug", async (req, res) => {
  try {
    const rows = await query(
      "SELECT * FROM comments WHERE post_slug = ? ORDER BY created_at ASC",
      [req.params.slug],
    );
    res.json(nestComments(rows.map(rowToComment), { includePending: false }));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to load comments" });
  }
});

/** Public: submit comment or reply — always pending until admin approves */
router.post("/", async (req, res) => {
  try {
    const { postSlug, postId, parentId, authorName, authorEmail, content } = req.body || {};
    const name = cleanText(authorName).slice(0, 80);
    const email = cleanText(authorEmail).slice(0, 120);
    const body = cleanText(content);

    if (!postSlug || !name || !body) {
      return res.status(400).json({ error: "Name, comment, and post are required" });
    }
    if (body.length < 2) {
      return res.status(400).json({ error: "Comment is too short" });
    }

    const post = await queryOne(
      "SELECT id, slug, allow_comments FROM blogs WHERE slug = ? AND status = 'published' LIMIT 1",
      [String(postSlug)],
    );
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (!post.allow_comments) {
      return res.status(403).json({ error: "Comments are closed for this post" });
    }

    if (parentId) {
      const parent = await queryOne("SELECT id, post_slug FROM comments WHERE id = ? LIMIT 1", [
        parentId,
      ]);
      if (!parent || parent.post_slug !== post.slug) {
        return res.status(400).json({ error: "Invalid parent comment" });
      }
    }

    const id = uuid();
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");
    await query(
      `INSERT INTO comments (id, post_slug, post_id, parent_id, author_name, author_email, content, status, created_at)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        id,
        post.slug,
        postId || post.id,
        parentId || null,
        name,
        email,
        body,
        "pending",
        now,
      ],
    );

    res.status(201).json({
      ok: true,
      message: "Comment submitted and awaiting admin approval.",
      id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to submit comment" });
  }
});

/** Admin: list all comments */
router.get("/admin/all", requireAdmin, async (req, res) => {
  try {
    const { status, q } = req.query;
    let sql = "SELECT * FROM comments WHERE 1=1";
    const params = [];

    if (status && status !== "All") {
      sql += " AND status = ?";
      params.push(String(status).toLowerCase());
    }
    if (q) {
      const needle = `%${String(q).toLowerCase()}%`;
      sql +=
        " AND (LOWER(author_name) LIKE ? OR LOWER(content) LIKE ? OR LOWER(post_slug) LIKE ?)";
      params.push(needle, needle, needle);
    }
    sql += " ORDER BY created_at DESC";

    const rows = await query(sql, params);
    res.json(rows.map(rowToComment));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to list comments" });
  }
});

router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!["approved", "pending", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const existing = await queryOne("SELECT * FROM comments WHERE id = ? LIMIT 1", [req.params.id]);
    if (!existing) return res.status(404).json({ error: "Comment not found" });

    await query("UPDATE comments SET status = ? WHERE id = ?", [status, req.params.id]);
    const row = await queryOne("SELECT * FROM comments WHERE id = ? LIMIT 1", [req.params.id]);
    res.json(rowToComment(row));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to update comment" });
  }
});

router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const target = await queryOne("SELECT id FROM comments WHERE id = ? LIMIT 1", [req.params.id]);
    if (!target) return res.status(404).json({ error: "Comment not found" });

    const all = await query("SELECT id, parent_id FROM comments");
    const removeIds = new Set([target.id]);
    let changed = true;
    while (changed) {
      changed = false;
      for (const c of all) {
        if (c.parent_id && removeIds.has(c.parent_id) && !removeIds.has(c.id)) {
          removeIds.add(c.id);
          changed = true;
        }
      }
    }

    const ids = [...removeIds];
    const placeholders = ids.map(() => "?").join(",");
    await query(`DELETE FROM comments WHERE id IN (${placeholders})`, ids);
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "Failed to delete comment" });
  }
});

export default router;
