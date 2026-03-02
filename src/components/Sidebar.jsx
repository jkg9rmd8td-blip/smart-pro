import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-title">Smart AI</div>
        <div className="brand-badge">Command</div>
      </div>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          الرئيسية <span className="dot" />
        </NavLink>

        <NavLink to="/players" className={({ isActive }) => (isActive ? "active" : "")}>
          اللاعبين <span className="dot" />
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => (isActive ? "active" : "")}>
          التقارير <span className="dot" />
        </NavLink>
      </nav>

      <div style={{ marginTop: "18px" }} className="pill">
        <span className="glow" />
        حالة الربط: <strong>متصل</strong>
      </div>

      <div className="pill">
        زمن الاستجابة: <strong>~120ms</strong>
      </div>
    </aside>
  );
}
