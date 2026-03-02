import { useEffect, useState } from "react";

export default function Dashboard() {
  const [teamRisk, setTeamRisk] = useState(42);
  const [readiness, setReadiness] = useState(87);

  useEffect(() => {
    const interval = setInterval(() => {
      setTeamRisk((prev) => (prev >= 70 ? 35 : prev + 1));
      setReadiness((prev) => (prev <= 75 ? 90 : prev - 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">

      {/* ====== شريط الحالة العام ====== */}
      <div className="team-status">
        <div>
          <h2>جاهزية الفريق</h2>
          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${readiness}%` }}
            ></div>
          </div>
          <span>{readiness}%</span>
        </div>

        <div className="risk-indicator">
          <h2>مؤشر الخطر العام</h2>
          <div className="risk-circle">
            {teamRisk}%
          </div>
        </div>
      </div>

      {/* ====== Game Impact AI ====== */}
      <div className="impact-card">
        <h3>🧠 تأثير المباراة – Game Impact AI</h3>
        <p>إذا استمر اللاعب رقم 7 لمدة 12 دقيقة إضافية:</p>
        <ul>
          <li>⚠️ خطر إصابة عضلية: 38%</li>
          <li>📉 خسارة متوقعة: مباراتين</li>
          <li>💰 تكلفة تقديرية: 420,000 ريال</li>
          <li>📊 تأثير على احتمالية الفوز: -11%</li>
        </ul>
        <div className="ai-recommendation">
          🔴 توصية: استبدال خلال 6 دقائق
        </div>
      </div>

      {/* ====== بيانات حيوية مباشرة ====== */}
      <div className="live-data">
        <div className="card">
          <h4>نبضات القلب</h4>
          <span className="value">88 bpm</span>
        </div>

        <div className="card">
          <h4>نسبة الأكسجين</h4>
          <span className="value">97%</span>
        </div>

        <div className="card">
          <h4>الإجهاد العضلي</h4>
          <span className="value danger">63%</span>
        </div>

        <div className="card">
          <h4>حرارة الملعب</h4>
          <span className="value">33°C</span>
        </div>
      </div>
    </div>
  );
}
