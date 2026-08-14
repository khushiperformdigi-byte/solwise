import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api, isLoggedIn, setToken } from "../../api/client";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("solwise2026");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) return <Navigate to="/admin/posts" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/api/auth/login", {
        method: "POST",
        body: { username, password },
      });
      setToken(data.token);
      navigate("/admin/posts");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F4EE] px-4">
      <form
        onSubmit={handleSubmit}
        className="admin-login w-full max-w-md rounded-2xl bg-white p-8 shadow-[0_16px_40px_-20px_rgba(18,58,26,0.25)] ring-1 ring-[#E8DCC8]"
      >
        <div className="mb-6 flex flex-col items-center rounded-xl bg-[#0d2a13] px-6 py-7 text-center">
          <img
            src="/logo_white.png"
            alt="Solwise"
            className="h-16 w-auto max-w-[200px] object-contain"
          />
          <p
            className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#C4A15A]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Admin Login
          </p>
        </div>
        <h1
          className="admin-login-title engrave-green mb-6 text-[34px] font-semibold leading-snug"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Sign in
        </h1>
        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-[13px] text-red-700">{error}</p>
        )}

        <label className="mb-4 block">
          <span
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B6358]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Username
          </span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-[#E2D6C2] bg-[#FFFcf8] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
            required
          />
        </label>

        <label className="mb-6 block">
          <span
            className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6B6358]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-[#E2D6C2] bg-[#FFFcf8] px-3 py-2.5 text-[14px] outline-none focus:border-[#C4A15A]"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[#123A1A] py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[#F5EFE6] transition hover:bg-[#0d2a13] disabled:opacity-60"
          style={{ fontFamily: "'Lato', sans-serif" }}
        >
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
