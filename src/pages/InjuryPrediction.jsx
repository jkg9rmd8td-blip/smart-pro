import { useMemo } from "react";
import { players } from "../data/players.js";
import { calcRisk, riskLabel, gameImpact } from "../utils/riskEngine.js";

export default function InjuryPrediction() {
  const rows = useMemo(() => {
    return players.map((p) => {
      const risk = calcRisk(p);
      const tag = riskLabel(risk);
      const impact = gameImpact(risk);
      return { ...p, risk, tag, impact };
    });
  }, []);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <h3>محرك التنبؤ بالإصابة (عرض تحكيمي)</h3>
        <div className="sub" style={{ marginTop: 10 }}>
          هنا نعرض “القيمة” للحكام: ليس مجرد داشبورد… بل قرار تنفيذي + أثر مالي + سيناريو دقائق إضافية.
        </div>
        <div className="sub" style={{ marginTop: 10 }}>
          <a href="#/motion-analysis" style={{ fontWeight: 900, textDecoration: "none" }}>← رجوع لتحليل الحركة 3D</a>
        </div>
      </div>

      <div className="grid cols-3">
        {rows.map((p) => (
          <div key={p.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 950 }}>{p.name} <span style={{ color: "rgba(242,244,247,.55)" }}>#{p.id}</span></div>
                <div className="sub">{p.role}</div>
              </div>
              <div className={`badge ${p.tag.tone}`}>
                <span className="lamp" style={{ background: p.tag.tone === "red" ? "var(--danger)" : p.tag.tone === "ylw" ? "var(--warn)" : "var(--ok)" }} />
                {p.tag.label}
              </div>
            </div>

            <div className="value" style={{ marginTop: 10 }}>خطر {p.risk}%</div>
            <div className="bar"><div style={{ width: `${Math.min(100, p.risk)}%` }} /></div>

            <div className="sub" style={{ marginTop: 12 }}>
              إذا استمر <b>{p.impact.extraMin}</b> دقيقة إضافية:
              <br />• احتمال إصابة: <b>{p.impact.injuryProb}%</b>
              <br />• مباريات مهددة: <b>{p.impact.missedGames}</b>
              <br />• تكلفة: <b>{p.impact.costSAR.toLocaleString("ar-SA")} ر.س</b>
            </div>

            <div className="sub" style={{ marginTop: 10, fontWeight: 900 }}>
              توصية: {p.risk >= 70 ? "تبديل وقائي فوري" : p.risk >= 35 ? "تخفيف الحمل + مراقبة" : "استمرار مع مراقبة"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
