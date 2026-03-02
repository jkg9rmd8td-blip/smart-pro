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
          </div>
          <div className="card" style={{ padding: 12 }}>
            <h3>أعلى خطر</h3>
            <div className="value">{summary.hi}%</div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <h3>أقل خطر</h3>
            <div className="value">{summary.lo}%</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>الأثر المالي والتشغيلي</h3>
        <div className="sub" style={{ marginTop: 10 }}>
          • تكلفة محتملة: <b>{summary.imp.costSAR.toLocaleString("ar-SA")} ر.س</b><br/>
          • مباريات مهددة: <b>{summary.imp.missedGames}</b><br/>
          • انخفاض الفوز: <b>-{summary.imp.winDrop}%</b>
        </div>
      </div>

      <div className="card">
        <h3>توصيات تنفيذية</h3>
        <div className="sub" style={{ marginTop: 10 }}>
          1) بروتوكول ترطيب/تبريد للاعبين ذوي الخطر المرتفع.<br/>
          2) تخفيف الأحمال خلال 10 دقائق القادمة عند تجاوز 70%.<br/>
          3) تبديل وقائي إذا استمر ارتفاع الحرارة أو انخفاض SpO2.<br/>
          4) ربط تحليل الحركة 3D بمؤشر خطر الركبة/الورك (POC جاهز).
        </div>
      </div>
    </div>
  );
}
