import { useLocation } from "react-router-dom";

const titles = {
  "/": { t: "مركز القيادة الصحية التنبؤية", s: "غرفة عمليات رقمية لاتخاذ القرار الوقائي أثناء المباراة" },
  "/players": { t: "اللاعبون", s: "متابعة لحظية للعلامات الحيوية والإجهاد ومؤشر الخطر" },
  "/reports": { t: "التقارير", s: "ملخصات تنفيذية + أثر مالي + توصيات الذكاء الاصطناعي" }
};

export default function Topbar() {
  const loc = useLocation();
  const key = loc.pathname;
  const meta = titles[key] || titles["/"];

  return (
    <div className="topbar">
      <div className="top-title">
        <h1>{meta.t}</h1>
        <p>{meta.s}</p>
      </div>

      <div className="pills">
        <div className="pill"><span className="glow" /> دقة التنبؤ <strong>99%</strong></div>
        <div className="pill">مؤشر خطر <strong>+80</strong></div>
        <div className="pill">مراقبة <strong>24/7</strong></div>
      </div>
    </div>
  );
}
