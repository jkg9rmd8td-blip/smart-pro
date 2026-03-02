import { useEffect, useMemo, useState } from "react";
import { players } from "../data/players.js";
import { calcRisk, riskLabel, gameImpact } from "../utils/riskEngine.js";

export default function Dashboard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const live = useMemo(() => {
    const p = { ...players[0] };
    p.hr = Math.max(62, Math.min(155, p.hr + Math.round(Math.random() * 8 - 4)));
    p.temp = +(Math.max(36.4, Math.min(38.8, p.temp + (Math.random() * 0.25 - 0.12))).toFixed(1));
    p.spo2 = Math.max(88, Math.min(99, p.spo2 + Math.round(Math.random() * 2 - 1)));
    p.fatigue = Math.max(5, Math.min(95, p.fatigue + Math.round(Math.random() * 10 - 5)));

    const r0 = calcRisk(p);
    const r1 = calcRisk(players[1]);
    const r2 = calcRisk(players[2]);

    const teamRisk = Math.round((r0 + r1 + r2) / 3);
    const readiness = Math.max(
      50,
      Math.min(99, Math.round((p.readiness + players[1].readiness + players[2].readiness) / 3 - teamRisk * 0.08))
    );

    return { p, teamRisk, readiness, r0, r1, r2 };
  }, [tick]);

  const tag = riskLabel(live.teamRisk);
  const impact = gameImpact(live.teamRisk);

  return (
    <div className="grid" style={{ gap: 14 }}>
      <section className="hero">
        <img src="/hero.jpg" alt="AI Sports" onError={(e) => (e.currentTarget.style.display = "none")} />
        <div className="overlay" />
        <div className="text">
          <h2>طبيب البيانات اللحظي للملعب</h2>
          <p>
            منصة تجمع العلامات الحيوية + الإجهاد + تحليل الحركة، وتحوّلها إلى توصيات قرار فورية للطاقم الفني
            لتقليل الإصابات ورفع جودة الأداء.
          </p>
          <a className="cta" href="#/players">دخول كروت اللاعبين الاحترافية</a>
        </div>
      </section>

      <section className="grid cols-4">
        <div className="card">
          <h3>جاهزية الفريق</h3>
          <div className="value">{live.readiness}%</div>
          <div className="bar"><div style={{ width: `${live.readiness}%` }} /></div>
          <div className="sub">مستوى الاستعداد العام لحظياً</div>
        </div>

        <div className="card">
          <h3>مؤشر خطر الفريق</h3>
          <div className="value">{live.teamRisk}%</div>
          <div className={`badge ${tag.tone}`} style={{ marginTop: 10, display: "inline-flex" }}>
            <span className="lamp" style={{ background: tag.tone === "red" ? "var(--danger)" : tag.tone === "ylw" ? "var(--warn)" : "var(--ok)" }} />
            {tag.label}
          </div>
          <div className="sub">تقدير خطر الإصابة للفريق</div>
        </div>

        <div className="card">
          <h3>المراقبة المستمرة</h3>
          <div className="value">24/7</div>
          <div className="sub">حساسات + تحليل + تنبيهات</div>
        </div>

        <div className="card">
          <h3>تحليل لحظي</h3>
          <div className="value">فوري</div>
          <div className="sub">بدون تأخير (عرض)</div>
        </div>
      </section>

      <section className="grid cols-2">
        <div className="card">
          <h3>🧠 Game Impact AI</h3>
          <div className="sub" style={{ marginTop: 8 }}>
            إذا استمر اللاعب لمدة <b>{impact.extraMin}</b> دقيقة إضافية:
          </div>

          <div className="grid" style={{ marginTop: 12, gap: 10 }}>
            <div className="card" style={{ padding: 12 }}>
              <h3>احتمالية إصابة</h3>
              <div className="value">{impact.injuryProb}%</div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <h3>خسارة مباريات</h3>
              <div className="value">{impact.missedGames}</div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <h3>التكلفة المحتملة</h3>
              <div className="value">{impact.costSAR.toLocaleString("ar-SA")} ر.س</div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <h3>تأثير الفوز</h3>
              <div className="value">-{impact.winDrop}%</div>
            </div>
          </div>

          <div className="sub" style={{ marginTop: 10 }}>
            <a href="#/injury-prediction" style={{ fontWeight: 900, textDecoration: "none" }}>
              انتقل للتنبؤ بالإصابة →
            </a>
          </div>
        </div>

        <div className="card">
          <h3>إشعار تنفيذي فوري</h3>
          <div className="sub" style={{ marginTop: 10 }}>
            توصية: {live.teamRisk >= 70 ? "تبديل وقائي + تبريد وترطيب" : "تخفيف الحمل خلال 5 دقائق"}
          </div>

          <div className="bar" style={{ marginTop: 14 }}>
            <div style={{ width: `${Math.min(100, live.teamRisk)}%` }} />
          </div>

          <div className="sub" style={{ marginTop: 12 }}>
            <a href="#/motion-analysis" style={{ fontWeight: 900, textDecoration: "none" }}>
              افتح تحليل الحركة 3D →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
