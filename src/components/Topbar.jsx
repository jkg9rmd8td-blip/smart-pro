import { useLocation } from "react-router-dom";

const titles = {
  "/": {
    t: "مركز القيادة الصحية التنبؤية",
    s: "غرفة عمليات رقمية لاتخاذ القرار الوقائي أثناء المباراة"
  },
  "/players": {
    t: "اللاعبون",
    s: "بطاقات احترافية + تفاصيل حيوية + مؤشر خطر فردي"
  },
  "/motion-3d": {
    t: "تحليل الحركة ثلاثي الأبعاد",
    s: "نموذج 3D تفاعلي + مؤشرات تماثل الحركة ونمط الجري"
  },
  "/injury-prediction": {
    t: "تنبؤ الإصابة",
    s: "محرّك مخاطر + سيناريوهات + أثر مالي وتشغيلي"
  },
  "/stress-monitoring": {
    t: "مراقبة الإجهاد",
    s: "HRV + جودة النوم + الكورتيزول + إجهاد بدني/نفسي"
  },
  "/alerts": {
    t: "التنبيهات",
    s: "تنبيهات لحظية قابلة للفرز حسب الشدة واللاعب"
  },
  "/reports": {
    t: "التقارير",
    s: "ملخص تنفيذي + توصيات + لوحة مؤشرات جاهزة للعرض"
  }
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

      <div className="pills">
        <div className="pill"><span className="glow" /> دقة التنبؤ <strong>99%</strong></div>
        <div className="pill">مؤشر خطر <strong>+80</strong></div>
        <div className="pill">مراقبة <strong>24/7</strong></div>
      </div>
    </div>
  );
}
