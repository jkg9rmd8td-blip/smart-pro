import { Heart, Activity, Thermometer, Wind } from "lucide-react";

export default function PlayerCard({ player }) {
  const riskColor =
    player.risk < 40
      ? "bg-green-100 text-green-600"
      : player.risk < 70
      ? "bg-yellow-100 text-yellow-600"
      : "bg-red-100 text-red-600";

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:scale-[1.02] transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">{player.name}</h2>
          <p className="text-gray-400 text-sm">{player.position}</p>
        </div>

        <span className={`px-3 py-1 text-sm rounded-full ${riskColor}`}>
          {player.risk < 40
            ? "منخفض"
            : player.risk < 70
            ? "متوسط"
            : "مرتفع"}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 text-white">

        <StatBox
          icon={<Thermometer size={18} />}
          label="درجة الحرارة"
          value={`${player.temp}°`}
        />

        <StatBox
          icon={<Heart size={18} />}
          label="نبضات القلب"
          value={`${player.heart} bpm`}
        />

        <StatBox
          icon={<Activity size={18} />}
          label="الإرهاق"
          value={`${player.fatigue}%`}
        />

        <StatBox
          icon={<Wind size={18} />}
          label="الأكسجين"
          value={`${player.oxygen}%`}
        />
      </div>

      {/* Health Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>الحالة الصحية</span>
          <span>{100 - player.risk}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500"
            style={{ width: `${100 - player.risk}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatBox({ icon, label, value }) {
  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
      <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
        {icon}
        {label}
      </div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
