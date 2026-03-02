import { useParams, useNavigate } from "react-router-dom";

const players = [
  { id: 1, name: "محمد أحمد", position: "حارس مرمى", heartRate: 78, temp: 36.8, oxygen: 98 },
  { id: 2, name: "علي سالم", position: "مدافع", heartRate: 88, temp: 37.2, oxygen: 96 },
  { id: 3, name: "فهد محمود", position: "مهاجم", heartRate: 95, temp: 37.5, oxygen: 94 },
];

export default function PlayerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const player = players.find(p => p.id === parseInt(id));

  if (!player) return <div>لا يوجد لاعب</div>;

  const risk = Math.round(
    (player.heartRate * 0.4) +
    ((player.temp - 36) * 20) +
    ((100 - player.oxygen) * 2)
  );

  const injuryProbability = Math.round(risk * 0.8);
  const financialImpact = risk * 9000;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← رجوع</button>

      <h1>{player.name}</h1>
      <h3 style={{ color: "#9ca3af" }}>{player.position}</h3>

      <div style={{
        marginTop: 30,
        background: "rgba(20,30,50,0.7)",
        padding: 25,
        borderRadius: 18
      }}>
        ❤️ نبض: {player.heartRate} bpm <br/>
        🌡 حرارة: {player.temp}° <br/>
        💨 أكسجين: {player.oxygen}% <br/>
      </div>

      <div style={{
        marginTop: 30,
        background: "rgba(20,30,50,0.7)",
        padding: 25,
        borderRadius: 18
      }}>
        <h3>تحليل المخاطر</h3>

        <h2>{risk}%</h2>

        احتمال الإصابة: {injuryProbability}% <br/>
        خسارة مالية محتملة: {financialImpact.toLocaleString()} ريال
      </div>
    </div>
  );
}
