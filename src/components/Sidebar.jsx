import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-title">Smart AI</div>
        <div className="brand-badge">Pro</div>
      </div>

      <nav className="nav">
        <NavLink to="/" end className={linkClass}>
          الرئيسية <span className="dot" />
        </NavLink>

        <NavLink to="/players" className={linkClass}>
          اللاعبين <span className="dot" />
        </NavLink>

        <NavLink to="/motion-3d" className={linkClass}>
          تحليل الحركة 3D <span className="dot" />
        </NavLink>

        <NavLink to="/injury-prediction" className={linkClass}>
          تنبؤ الإصابة <span className="dot" />
        </NavLink>

        <NavLink to="/stress-monitoring" className={linkClass}>
          مراقبة الإجهاد <span className="dot" />
        </NavLink>

        <NavLink to="/alerts" className={linkClass}>
          التنبيهات <span className="dot" />
        </NavLink>

        <NavLink to="/reports" className={linkClass}>
          التقارير <span className="dot" />
        </NavLink>
      </nav>

      <div className="pill">
        <span className="glow" /> حالة الربط: <strong>متصل</strong>
      </div>
      <div className="pill">زمن الاستجابة: <strong>~120ms</strong></div>
      <div className="pill">وضع التشغيل: <strong>مركز قيادة</strong></div>
    </aside>
  );
}
