import PlayerProCard from "../components/PlayerProCard";

const players = [
  { name: "محمد أحمد", position: "حارس مرمى", heartRate: 78, temp: 36.8, oxygen: 98, risk: 22 },
  { name: "علي سالم", position: "مدافع", heartRate: 88, temp: 37.2, oxygen: 96, risk: 55 },
  { name: "فهد محمود", position: "مهاجم", heartRate: 95, temp: 37.5, oxygen: 94, risk: 76 },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="section-title">اللاعبون</h2>

      <div style={{ display: "grid", gap: 20 }}>
        {players.map((p, i) => (
          <PlayerProCard key={i} player={p} />
        ))}
      </div>
    </div>
  );
}
