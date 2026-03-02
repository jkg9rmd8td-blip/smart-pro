import { useMemo, useState } from "react";
import { players } from "../data/players.js";
import PlayerProCard from "../components/PlayerProCard.jsx";

export default function Players() {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(players[0].id);

  const list = useMemo(() => {
    const norm = q.trim();
    if (!norm) return players;
    return players.filter((p) => p.name.includes(norm) || String(p.id).includes(norm));
  }, [q]);

  const selected = useMemo(() => players.find((p) => p.id === selectedId) || players[0], [selectedId]);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <h3>بحث + اختيار لاعب</h3>
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
          <div className="pill">
            اللاعب المختار: <strong>#{selected.id}</strong>
          </div>
          <div className="pill">
            <a href="#/motion-analysis" style={{ textDecoration: "none", fontWeight: 900 }}>
              فتح تحليل الحركة 3D →
            </a>
          </div>
        </div>
      </div>

      <div className="playerGrid">
        {list.map((p) => (
          <PlayerProCard
            key={p.id}
            p={p}
            selected={p.id === selectedId}
            onSelect={() => setSelectedId(p.id)}
          />
        ))}
      </div>
    </div>
  );
}
