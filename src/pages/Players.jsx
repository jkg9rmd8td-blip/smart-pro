import { useMemo, useState } from "react";
import { players } from "../data/players.js";
import { calcRisk, riskLabel } from "../utils/riskEngine.js";

export default function Players() {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const norm = q.trim();
    const base = players.map((p) => ({ ...p, risk: calcRisk(p) }));
    if (!norm) return base;
    return base.filter((p) => p.name.includes(norm) || String(p.id).includes(norm));
  }, [q]);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <h3>بحث سريع</h3>
        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="اكتب اسم اللاعب أو رقمه…"
            style={{
              flex: 1,
              minWidth: 220,
              padding: "12px 12px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,.10)",
              background: "rgba(255,255,255,.03)",
              color: "var(--text)",
              outline: "none"
            }}
          />
          <div className="pill">عدد النتائج: <strong>{list.length}</strong></div>
        </div>
      </div>

      <div className="playerGrid">
        {list.map((p) => {
          const tag = riskLabel(p.risk);
          const initials = p.name.split(" ").slice(0, 2).map(s => s[0]).join("");
          return (
            <div className="card" key={p.id}>
              <div className="player">
                <div className="avatar">{initials}</div>
                <div className="playerMeta">
                  <strong>{p.name} <span style={{ color: "rgba(242,244,247,.6)" }}>#{p.id}</span></strong>
                  <span>{p.role}</span>
                </div>
                <div className="spark" title="نبض لحظي (عرض)"></div>
              </div>

              <div className="grid cols-2" style={{ marginTop: 12 }}>
                <div className="card" style={{ padding: 12 }}>
                  <h3>نبض</h3>
                  <div className="value">{p.hr} bpm</div>
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <h3>SpO2</h3>
                  <div className="value">{p.spo2}%</div>
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <h3>حرارة</h3>
                  <div className="value">{p.temp}°</div>
                </div>
                <div className="card" style={{ padding: 12 }}>
                  <h3>إجهاد</h3>
                  <div className="value">{p.fatigue}%</div>
                </div>
              </div>

              <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <div className={`badge ${tag.tone}`}>{tag.label}</div>
                <div style={{ color: "rgba(242,244,247,.75)", fontSize: 12 }}>
                  خطر: <strong style={{ color: "var(--text)" }}>{p.risk}%</strong>
                </div>
              </div>

              <div className="bar" style={{ marginTop: 10 }}>
                <div style={{ width: `${Math.max(1, 100 - p.risk)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
