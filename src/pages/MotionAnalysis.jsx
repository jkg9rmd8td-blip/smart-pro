import { useMemo, useState } from "react";
import { players } from "../data/players.js";
import Motion3D from "../components/Motion3D.jsx";

export default function MotionAnalysis() {
  const [pid, setPid] = useState(players[0].id);
  const selected = useMemo(() => players.find((p) => p.id === pid) || players[0], [pid]);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <h3>اختيار اللاعب للتحليل</h3>
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {players.map((p) => (
            <button
              key={p.id}
              className={`btn ${p.id === pid ? "primary" : ""}`}
              onClick={() => setPid(p.id)}
            >
              {p.name} #{p.id}
            </button>
          ))}
          <a className="btn" href="#/injury-prediction" style={{ textDecoration: "none" }}>
            الذهاب للتنبؤ بالإصابة
          </a>
        </div>
        <div className="sub" style={{ marginTop: 10 }}>
          هذا عرض 3D محاكي (POC) — يوضح “القصة” للحكام: تحليل حركة → اكتشاف اختلال → إرسال للتنبؤ بالإصابة.
        </div>
      </div>

      <Motion3D selectedPlayerName={`${selected.name} #${selected.id}`} />

      <div className="grid cols-3">
        <div className="card">
          <h3>كشف اختلال الحركة</h3>
          <div className="value">يمين/يسار</div>
          <div className="sub">يتم رصد عدم التماثل واعتباره مؤشر خطر</div>
        </div>
        <div className="card">
          <h3>ضغط مفصلي</h3>
          <div className="value">Knee Load</div>
          <div className="sub">محاكاة حمل الركبة/الورك أثناء الجري والهبوط</div>
        </div>
        <div className="card">
          <h3>توصية تكتيكية</h3>
          <div className="value">تقليل الحمل</div>
          <div className="sub">إعادة تموضع أو تبديل وقائي حسب المؤشر</div>
        </div>
      </div>
    </div>
  );
}
