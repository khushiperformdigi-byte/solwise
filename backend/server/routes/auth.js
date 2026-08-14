import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

// Static admin credentials (for now)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "solwise2026";
const JWT_SECRET = "solwise-admin-secret";

export { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET };

router.post("/login", (req, res) => {
  const username = String(req.body?.username || "").trim();
  const password = String(req.body?.password || "");

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ role: "admin", username: ADMIN_USERNAME }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, username: ADMIN_USERNAME });
});

router.get("/me", (req, res) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ username: payload.username, role: payload.role });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
