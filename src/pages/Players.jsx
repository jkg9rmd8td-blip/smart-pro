import PlayerCard from "../components/PlayerCard";
import { players } from "../data/players";

export default function Players() {
  return (
    <div className="p-8 bg-[#0f172a] min-h-screen">

      <h1 className="text-3xl font-bold text-white mb-8">
        اللاعبين – الحالة الصحية اللحظية
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>

    </div>
  );
}
