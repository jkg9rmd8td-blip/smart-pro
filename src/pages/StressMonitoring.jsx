import { useMemo, useState } from "react";
import { players } from "../data/players.js";

export default function StressMonitoring() {
  const [pid, setPid] = useState(players[0].id);
  const p = useMemo(() => players.find((x) => x.id === pid) || players[0], [pid]);

  // Demo values
  const hrv = Math.max(25, Math.min(120, Math.round(110 - p.fatigue * 0.9 + (Math.random() * 8 - 4))));
  const cortisol = p.fatigue > 60 ? "مرتفع" : p.fatigue > 30 ? "متوسط" : "منخفض";
  const sleep = p.fatigue > 60 ? "ضعيفة" : p.fatigue > 30 ? "متوسطة" : "ممتازة";

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <h3>مراقبة الإجهاد (بدني + نفسي)</h3>
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {players.map((x) => (
            <button key={x.id} className={`btn ${x.id === pid ? "primary" : ""}`} onClick={() => setPid(x.id)}>
              {x.name} #{x.id}
            </button>
          ))}
          <a className="btn" href="#/alerts" style={{ textDecoration: "none" }}>فتح التنبيهات</a>
        </div>
        <div className="sub" style={{ marginTop: 10 }}>
          هذا القسم يعطي “Story” قوية: إجهاد + نوم + HRV → يرفع أو يخفض مؤشر الخطر.
        </div>
      </div>

      <div className="grid cols-3">
        <div className="card">
          <h3>HRV (تباين النبض)</h3>
          <div className="value">{hrv} ms</div>
          <div className="sub">كلما انخفض HRV زاد الإجهاد</div>
        </div>

        <div className="card">
          <h3>الكورتيزول (مؤشر)</h3>
          <div className="value">{cortisol}</div>
          <div className="sub">محاكاة تقديرية بناءً على الإجهاد</div>
        </div>

        <div className="card">
          <h3>جودة النوم</h3>
          <div className="value">{sleep}</div>
          <div className="sub">مدخل مؤثر في مخاطر الإصابات</div>
        </div>
      </div>

      <div className="card">
        <h3>توصية فورية</h3>
        <div className="sub" style={{ marginTop: 10 }}>
          اللاعب: <b>{p.name}</b> — إجهاد: <b>{p.fatigue}%</b>
          <br />
          الإجراء المقترح: {p.fatigue >= 70 ? "جلسة استشفاء + تقليل الحمل 24 ساعة" : p.fatigue >= 35 ? "تخفيف الشدة + مراقبة" : "مستوى جيد"}
        </div>
      </div>
    </div>
  );
}
