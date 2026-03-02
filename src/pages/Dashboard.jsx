export default function Dashboard() {
  return (
    <div>
      <div className="dashboard-header">
        <h1>مركز القيادة الصحية التنبؤية</h1>
        <p>تحليل لحظي للأداء البدني واتخاذ القرار الوقائي أثناء المباراة</p>
      </div>

      <div className="cards">
        <div className="card">
          <h3>جاهزية الفريق</h3>
          <div className="value">89%</div>
        </div>

        <div className="card">
          <h3>معدل نبض متوسط</h3>
          <div className="value">78 bpm</div>
        </div>

        <div className="card">
          <h3>متوسط الإجهاد</h3>
          <div className="value">32%</div>
        </div>

        <div className="card">
          <h3>درجة الحرارة</h3>
          <div className="value">36.8°</div>
        </div>
      </div>

      <div className="risk-container">
        <h2>مؤشر خطر الإصابة اللحظي</h2>
        <div className="risk-bar">
          <div className="risk-progress"></div>
        </div>
        <p style={{marginTop: "15px", color:"#94a3b8"}}>
          التوصية: مراقبة اللاعب رقم 7 خلال الـ 5 دقائق القادمة
        </p>
      </div>
    </div>
  );
}
