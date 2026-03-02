import { useMemo } from "react";
import { players } from "../data/players.js";
import { calcRisk, gameImpact } from "../utils/riskEngine.js";

export default function Reports() {
  const summary = useMemo(() => {
    const risks = players.map((p) => calcRisk(p));
    const avg = Math.round(risks.reduce((a, b) => a + b, 0) / risks.length);
    const hi = Math.max(...risks);
    const lo = Math.min(...risks);
    const imp = gameImpact(avg);
    return { avg, hi, lo, imp };
  }, []);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <div className="card">
        <h3>ملخص تنفيذي</h3>
        <div className="grid cols-3" style={{ marginTop: 12 }}>
          <div className="card" style={{ padding: 12 }}>
            <h3>متوسط الخطر</h3>
            <div className="value">{summary.avg}%</div>
            <div className="sub">على مستوى الفريق (عرض)</div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <h3>أعلى خطر</h3>
            <div className="value">{summary.hi}%</div>
            <div className="sub">لاعب ضمن الفريق</div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <h3>أقل خطر</h3>
            <div className="value">{summary.lo}%</div>
            <div className="sub">لاعب ضمن الفريق</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>الأثر المالي والتشغيلي (Game Impact AI)</h3>
        <div className="grid" style={{ marginTop: 12, gap: 10 }}>
          <div className="alert">
            <div className="t">
              <strong>تكلفة محتملة</strong>
              <span>تقدير مالي لتبعات الإصابات</span>
            </div>
            <span className="badge red">{summary.imp.costSAR.toLocaleString("ar-SA")} ر.س</span>
          </div>

          <div className="alert">
            <div className="t">
              <strong>مباريات مهددة</strong>
              <span>تأثير الغياب على الجدول</span>
            </div>
            <span className="badge ylw">{summary.imp.missedGames} مباريات</span>
          </div>

          <div className="alert">
            <div className="t">
              <strong>تأثير النتيجة</strong>
              <span>انخفاض احتمالية الفوز</span>
            </div>
            <span className="badge ylw">-{summary.imp.winDrop}%</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>توصيات تنفيذية</h3>
        <div className="sub" style={{ marginTop: 10, lineHeight: 1.9 }}>
          1) تفعيل بروتوكول الترطيب والتبريد للاعبين ذوي الخطر المرتفع.<br />
          2) تقليل السبرنتات + تخفيف الحمل التدريبي خلال 10 دقائق القادمة.<br />
          3) اعتماد تبديل وقائي إذا تجاوز مؤشر الخطر 70% للاعب الأساسي.<br />
          4) إرسال تنبيه مباشر للطاقم الطبي عند تذبذب SpO2 أو ارتفاع الحرارة.
        </div>
      </div>
    </div>
  );
}
