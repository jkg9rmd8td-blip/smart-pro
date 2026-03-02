export default function AlertFeed({ risk }) {
  if (risk > 75) return <div className="alert red">⚠ خطر عالي</div>
  if (risk > 55) return <div className="alert yellow">تنبيه متوسط</div>
  return <div className="alert green">الوضع آمن</div>
}
