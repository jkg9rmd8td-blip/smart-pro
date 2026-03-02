export default function CircularGauge({ value }) {
  const color =
    value > 70 ? "#ef4444" :
    value > 50 ? "#facc15" :
    "#22c55e"

  return (
    <svg width="120" height="120">
      <circle cx="60" cy="60" r="50" stroke="#1e293b" strokeWidth="10" fill="none"/>
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeDasharray="314"
        strokeDashoffset={314 - (314 * value) / 100}
        transform="rotate(-90 60 60)"
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white">
        {value}%
      </text>
    </svg>
  )
}
