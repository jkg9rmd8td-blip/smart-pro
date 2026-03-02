import { useParams, useNavigate } from "react-router-dom";

const players = [
  { id: 1, name: "محمد أحمد", position: "حارس مرمى", hr: 78, temp: 36.8, o2: 98 },
  { id: 2, name: "علي سالم", position: "مدافع", hr: 88, temp: 37.2, o2: 96 },
  { id: 3, name: "فهد محمود", position: "مهاجم", hr: 95, temp: 37.5, o2: 94 },
];

export default function PlayerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const player = players.find((p) => p.id === parseInt(id));
  if (!player) return <div>لا يوجد لاعب</div>;

  const risk = Math.round(
    player.hr * 0.4 + (player.temp - 36) * 20 + (100 - player.o2) * 2
  );

  const loss = risk * 12000;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 30%, #0f2027, #203a43, #0b1320)",
        color: "white",
        padding: 50,
      }}
    >
      <button onClick={() => navigate(-1)}>← رجوع</button>

      <h1 style={{ marginTop: 30 }}>{player.name}</h1>
      <h3 style={{ color: "#9ca3af" }}>{player.position}</h3>

      <div style={{ marginTop: 40 }}>
        <h2>تحليل الذكاء الاصطناعي</h2>
        <h1 style={{ fontSize: 70 }}>{risk}%</h1>

        <p>💰 خسارة محتملة: {loss.toLocaleString()} ريال</p>

        {risk > 70 && (
          <div style={{ color: "#ff4d4f", marginTop: 15 }}>
            🔴 قرار تنفيذي: استبدال اللاعب فورًا
          </div>
        )}
      </div>
    </div>
  );
}
