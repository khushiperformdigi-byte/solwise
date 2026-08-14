import sanitizeHtml from "sanitize-html";

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export function sanitizeContent(html) {
  return sanitizeHtml(html || "", {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "span",
      "figure",
      "figcaption",
      "iframe",
      "video",
      "source",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "colgroup",
      "col",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "style", "id"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      a: ["href", "name", "target", "rel"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "data", "mailto"],
  });
}

export function estimateReadTime(html) {
  const text = String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function formatDisplayDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
