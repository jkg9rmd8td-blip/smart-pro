import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Smart AI</h2>

      <NavLink to="/">الرئيسية</NavLink>
      <NavLink to="/players">اللاعبون</NavLink>
      <NavLink to="/executive">اللوحة التنفيذية</NavLink>
      <NavLink to="/reports">التقارير</NavLink>
    </aside>
  );
}
