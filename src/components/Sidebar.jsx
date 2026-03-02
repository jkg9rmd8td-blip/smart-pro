import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-title">Smart AI</div>
        <div className="brand-badge">Pro</div>
      </div>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          الرئيسية <span className="dot" />
        </NavLink>

        <NavLink to="/players" className={({ isActive }) => (isActive ? "active" : "")}>
          اللاعبين <span className="dot" />
        </NavLink>

        <NavLink to="/motion-analysis" className={({ isActive }) => (isActive ? "active" : "")}>
          تحليل الحركة 3D <span className="dot" />
        </NavLink>

        <NavLink to="/injury-prediction" className={({ isActive }) => (isActive ? "active" : "")}>
          التنبؤ بالإصابة <span className="dot" />
        </NavLink>

        <NavLink to="/stress-monitoring" className={({ isActive }) => (isActive ? "active" : "")}>
          مراقبة الإجهاد <span className="dot" />
        </NavLink>

        <NavLink to="/alerts" className={({ isActive }) => (isActive ? "active" : "")}>
          التنبيهات <span className="dot" />
        </NavLink>

        <NavLink to="/reports" className={({ isActive }) => (isActive ? "active" : "")}>
          التقارير <span className="dot" />
        </NavLink>
      </nav>

      <div style={{ marginTop: 18 }} className="pill">
        <span className="glow" />
        حالة الربط: <strong>متصل</strong>
      </div>

      <div className="pill">
        زمن الاستجابة: <strong>~120ms</strong>
      </div>
    </aside>
  );
}
