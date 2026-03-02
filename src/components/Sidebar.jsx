import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, LineChart, FileText } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-[#131c2a] border-r border-primary/20 p-6 hidden md:block">

      <h2 className="text-primary text-xl font-bold mb-10">
        Smart Sport AI
      </h2>

      <nav className="space-y-6">
        <NavLink to="/" className="flex items-center gap-3 hover:text-primary">
          <LayoutDashboard size={18}/> لوحة القيادة
        </NavLink>

        <NavLink to="/players" className="flex items-center gap-3 hover:text-primary">
          <Users size={18}/> اللاعبون
        </NavLink>

        <NavLink to="/executive" className="flex items-center gap-3 hover:text-primary">
          <LineChart size={18}/> الإدارة التنفيذية
        </NavLink>

        <NavLink to="/reports" className="flex items-center gap-3 hover:text-primary">
          <FileText size={18}/> التقارير
        </NavLink>
      </nav>
    </div>
  );
}
