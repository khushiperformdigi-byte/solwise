import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { isLoggedIn, setToken } from "../../api/client";

const NAV = [
  { to: "/admin/posts", label: "Blog Posts", end: true },
  { to: "/admin/posts/new", label: "Add New Post" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/events/new", label: "Add New Event" },
  { to: "/admin/comments", label: "Comments" },
  { to: "/admin/gallery", label: "Gallery" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  if (!isLoggedIn()) return <Navigate to="/admin/login" replace />;

  function logout() {
    setToken(null);
    navigate("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#F7F4EE]">
      <aside className="flex w-60 shrink-0 flex-col bg-[#0d2a13] text-[#F5EFE6]">
        <div className="border-b border-white/10 px-5 py-7 text-center">
          <img
            src="/logo_white.png"
            alt="Solwise"
            className="mx-auto mb-3 h-auto w-full max-w-[168px] object-contain"
          />
          <p
            className="text-[11px] uppercase tracking-[0.28em] text-[#C4A15A]"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Admin Login
          </p>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
                  isActive
                    ? "bg-[#C4A15A] font-semibold text-[#0d2a13]"
                    : "text-[#F5EFE6]/90 hover:bg-white/10"
                }`
              }
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg border border-[#C4A15A] px-3 py-2 text-[13px] text-[#C4A15A] transition-colors hover:bg-[#C4A15A]/10"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main min-w-0 flex-1 overflow-y-auto px-8 py-8 md:px-10 md:py-10">
        <Outlet />
      </main>
    </div>
  );
}
