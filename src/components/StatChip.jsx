export default function StatChip({ label, value }) {
  return (
    <div className="chip">
      {label}: <b>{value}</b>
    </div>
  );
}
