import StatChip from "./StatChip.jsx";
import { calcRisk, riskLabel } from "../utils/riskEngine.js";

function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((s) => s[0])
    .join("");
}

export default function PlayerProCard({ p, onSelect, selected }) {
  const risk = calcRisk(p);
  const tag = riskLabel(risk);

  const lampColor =
    tag.tone === "red" ? "var(--danger)" : tag.tone === "ylw" ? "var(--warn)" : "var(--ok)";

  return (
    <div
      className={`card playerPro`}
      style={{
        borderColor: selected ? "rgba(0,245,168,.28)" : undefined,
        boxShadow: selected
          ? "0 18px 55px rgba(0,0,0,.45), 0 0 45px rgba(0,245,168,.14)"
          : undefined,
        cursor: "pointer"
      }}
      onClick={() => onSelect?.(p)}
      role="button"
      tabIndex={0}
    >
      <div className="proTop">
        <div className="proLeft">
          <div className="avatarPro">{initials(p.name)}</div>
          <div className="proName">
            <strong>
              {p.name} <span style={{ color: "rgba(242,244,247,.55)" }}>#{p.id}</span>
            </strong>
            <span>{p.role}</span>
          </div>
        </div>
        <div className="spark" title="مؤشر حي (عرض)"></div>
      </div>

      <div className="riskRow">
        <div className={`badge ${tag.tone}`}>
          <span className="lamp" style={{ background: lampColor, boxShadow: `0 0 14px ${lampColor}55` }} />
          {tag.label}
        </div>
        <div className="riskPct">خطر {risk}%</div>
      </div>

      <div className="bar">
        <div style={{ width: `${Math.max(1, 100 - risk)}%` }} />
      </div>

      <div className="chips">
        <StatChip label="نبض" value={`${p.hr} bpm`} />
        <StatChip label="SpO2" value={`${p.spo2}%`} />
        <StatChip label="حرارة" value={`${p.temp}°`} />
        <StatChip label="إجهاد" value={`${p.fatigue}%`} />
        <StatChip label="جاهزية" value={`${p.readiness}%`} />
      </div>

      <div className="sub" style={{ marginTop: 10 }}>
        توصية: {risk >= 70 ? "تبديل وقائي فوري" : risk >= 35 ? "تخفيف الحمل خلال 5–10 دقائق" : "استمرار مع مراقبة"}
      </div>
    </div>
  );
}
