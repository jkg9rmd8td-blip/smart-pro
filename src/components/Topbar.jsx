import { useLocation } from "react-router-dom";

const titles = {
  "/": { t: "مركز القيادة الصحية التنبؤية", s: "لوحة قرار وقائية أثناء التدريب والمباريات" },
  "/players": { t: "اللاعبون", s: "كروت احترافية + مؤشرات حيوية + خطر الإصابة" },
  "/motion-analysis": { t: "تحليل الحركة 3D", s: "عرض هيكلي متحرك + اكتشاف اختلالات (عرض)" },
  "/injury-prediction": { t: "التنبؤ بالإصابة", s: "سيناريوهات + أثر مالي + توصيات AI" },
  "/stress-monitoring": { t: "مراقبة الإجهاد", s: "إجهاد بدني/نفسي + نوم + HRV (عرض)" },
  "/alerts": { t: "التنبيهات", s: "تنبيه ذكي مباشر حسب العتبات" },
  "/reports": { t: "التقارير", s: "ملخصات تنفيذية + أثر مالي + قرار" }
};

export default function Topbar() {
  const loc = useLocation();
  const meta = titles[loc.pathname] || titles["/"];

  return (
    <div className="topbar">
      <div className="top-title">
        <h1>{meta.t}</h1>
        <p>{meta.s}</p>
      </div>

      <div className="pill">
        <span className="glow" />
        دقة التنبؤ <strong>99%</strong>
      </div>
    </div>
  );
}
