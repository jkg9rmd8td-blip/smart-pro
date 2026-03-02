import { useMemo } from "react";
import { players } from "../data/players.js";
import { calcRisk, riskLabel } from "../utils/riskEngine.js";

export default function Alerts() {
  const alerts = useMemo(() => {
    return players
      .map((p) => {
        const risk = calcRisk(p);
        const tag = riskLabel(risk);
        let msg = "لا توجد مؤشرات خطر فورية";
        if (risk >= 70) msg = "🔴 خطر مرتفع: تبديل وقائي + تبريد وترطيب";
        else if (risk >= 35) msg = "🟠 خطر متوسط: تخفيف الحمل + مراقبة دقيقة";
        return { id: p.id, name: p.name, risk, tag, msg };
      })
      .sort((a, b) => b.risk - a.risk);
  }, []);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <h3>التنبيهات الذكية</h3>
        <div className="sub" style={{ marginTop: 10 }}>
          تنبيه يولَّد تلقائياً بناءً على عتبات (Risk/Temp/SpO2/Fatigue).
        </div>
      </div>

      <div className="grid cols-3">
        {alerts.map((a) => (
          <div className="card" key={a.id}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
              <div style={{ fontWeight: 950 }}>{a.name} <span style={{ color: "rgba(242,244,247,.55)" }}>#{a.id}</span></div>
              <div className={`badge ${a.tag.tone}`}>
                <span className="lamp" style={{ background: a.tag.tone === "red" ? "var(--danger)" : a.tag.tone === "ylw" ? "var(--warn)" : "var(--ok)" }} />
                {a.tag.label}
              </div>
            </div>

            <div className="value" style={{ marginTop: 10 }}>خطر {a.risk}%</div>
            <div className="sub" style={{ marginTop: 10 }}>{a.msg}</div>

            <div className="sub" style={{ marginTop: 10 }}>
              <a href="#/players" style={{ fontWeight: 900, textDecoration: "none" }}>فتح كرت اللاعب →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
