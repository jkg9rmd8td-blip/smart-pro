import { useEffect, useState } from "react";

export default function Dashboard() {
  const [risk, setRisk] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRisk(72);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="dashboard-header">
        <h1>مركز القيادة الصحية التنبؤية</h1>
        <p>غرفة عمليات رقمية لمراقبة الحالة البدنية واتخاذ القرار اللحظي</p>
      </div>

      <div className="cards">
        <div className="card">
          <h3>جاهزية الفريق</h3>
          <div className="value">89%</div>
        </div>

        <div className="card">
          <h3>متوسط النبض</h3>
          <div className="value">78 bpm</div>
        </div>

        <div className="card">
          <h3>متوسط الإجهاد</h3>
          <div className="value">32%</div>
        </div>

        <div className="card">
          <h3>درجة الحرارة</h3>
          <div className="value">36.8°</div>
        </div>
      </div>

      <div className="risk-container">
        <h2>مؤشر خطر الإصابة اللحظي</h2>

        <div className="risk-bar">
          <div
            className="risk-progress"
            style={{ width: `${risk}%` }}
          ></div>
        </div>

        <h3 style={{ marginTop: "20px", fontSize: "22px" }}>
          {risk}%
        </h3>

        <p style={{ marginTop: "10px", color: "#94a3b8" }}>
          ⚠ توصية الذكاء الاصطناعي: تخفيض الحمل البدني للاعب رقم 7 خلال الدقائق القادمة
        </p>
      </div>

      <div className="alerts-section">
        <h2>التنبيهات الحية</h2>

        <div className="alert high">
          🔴 ارتفاع مفاجئ في معدل ضربات القلب – اللاعب #7
        </div>

        <div className="alert medium">
          🟠 إجهاد متوسط – اللاعب #4
        </div>

        <div className="alert low">
          🟢 حالة مستقرة – اللاعب #10
        </div>
      </div>
    </div>
  );
}
