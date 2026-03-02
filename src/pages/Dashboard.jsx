import { useEffect, useMemo, useState } from "react";
import { players } from "../data/players.js";
import { calcRisk, riskLabel, gameImpact } from "../utils/riskEngine.js";

export default function Dashboard() {
  const [tick, setTick] = useState(0);

  // محاكاة Live بسيطة (كل 2 ثانية)
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const live = useMemo(() => {
    // نحدث قيم اللاعب #7 بشكل بسيط (عرض)
    const p7 = { ...players[0] };
    p7.hr = Math.max(62, Math.min(150, p7.hr + Math.round((Math.random() * 6 - 3))));
    p7.temp = +(Math.max(36.4, Math.min(38.6, p7.temp + (Math.random() * 0.2 - 0.1))).toFixed(1));
    p7.spo2 = Math.max(88, Math.min(99, p7.spo2 + Math.round((Math.random() * 2 - 1))));
    p7.fatigue = Math.max(5, Math.min(95, p7.fatigue + Math.round((Math.random() * 8 - 4))));
    p7.risk = calcRisk(p7);

    const teamRisk = Math.round((p7.risk + players[1].risk + players[2].risk) / 3);
    const readiness = Math.max(50, Math.min(99, Math.round((p7.readiness + players[1].readiness + players[2].readiness) / 3 - teamRisk * 0.08)));
    return { p7, teamRisk, readiness };
  }, [tick]);

  const tag = riskLabel(live.teamRisk);
  const impact = gameImpact(live.teamRisk);

  const ringDeg = Math.max(0, Math.min(360, Math.round((live.teamRisk / 100) * 360)));

  return (
    <div className="grid" style={{ gap: 14 }}>
      {/* HERO */}
      <section className="hero">
        {/* لو ما عندك صورة hero.jpg بيظهر الخلفية فقط بدون ما يخترب */}
        <img
          src="/hero.jpg"
          alt="AI Sports"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="overlay" />
        <div className="text">
          <h2>طبيب البيانات اللحظي للملعب</h2>
          <p>
            منصة تجمع العلامات الحيوية، الإجهاد، وتحليل الحركة — وتحوّلها إلى توصيات قرار لحظية
            للطاقم الفني لتقليل الإصابات ورفع جودة الأداء.
          </p>
          <a className="cta" href="#/players">شاهد حالة اللاعبين</a>
        </div>
      </section>

      {/* KPI CARDS */}
      <section className="grid cols-4">
        <div className="card">
          <h3>جاهزية الفريق</h3>
          <div className="value">{live.readiness}%</div>
          <div className="bar"><div style={{ width: `${live.readiness}%` }} /></div>
          <div className="sub">مستوى الاستعداد العام قبل/أثناء المباراة</div>
        </div>

        <div className="card">
          <h3>متوسط النبض</h3>
          <div className="value">{live.p7.hr} bpm</div>
          <div className="sub">تحديث حي للاعب #7 (عرض)</div>
        </div>

        <div className="card">
          <h3>متوسط الإجهاد</h3>
          <div className="value">{live.p7.fatigue}%</div>
          <div className="sub">الإجهاد العضلي والذهني</div>
        </div>

        <div className="card">
          <h3>درجة الحرارة</h3>
          <div className="value">{live.p7.temp}°</div>
          <div className="sub">مؤشر حيوي مهم للجفاف/الإجهاد الحراري</div>
        </div>
      </section>

      {/* RISK + GAME IMPACT */}
      <section className="grid cols-2">
        <div className="card">
          <div className="ringWrap">
            <div>
              <h3>مؤشر خطر الإصابة اللحظي</h3>
              <div className="value">{live.teamRisk}%</div>
              <div className={`badge ${tag.tone}`} style={{ marginTop: 10, display: "inline-block" }}>
                {tag.label}
              </div>
              <div className="sub" style={{ marginTop: 10 }}>
                التوصية: مراقبة اللاعب رقم <strong>7</strong> خلال الدقائق القادمة
              </div>
            </div>

            <div className="ring" style={{ background: `conic-gradient(var(--danger) 0deg, var(--warn) 120deg, var(--ok) 240deg, rgba(255,255,255,.10) 0deg)` }}>
              <div className="ringVal">{live.teamRisk}%</div>
              {/* نغطي جزء ليوضح التقدم بصريًا */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  background: `conic-gradient(rgba(255,255,255,.10) ${ringDeg}deg, rgba(255,255,255,0) 0deg)`,
                  transform: "scale(1.02)"
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: 14 }} className="riskTag">
            <span className="lamp" style={{ background: tag.tone === "red" ? "var(--danger)" : tag.tone === "ylw" ? "var(--warn)" : "var(--ok)" }} />
            قرار فوري: <strong style={{ color: "var(--text)" }}>تخفيف الحمل</strong> أو <strong style={{ color: "var(--text)" }}>تبديل وقائي</strong>
          </div>
        </div>

        <div className="card">
          <h3>🧠 Game Impact AI</h3>
          <div className="sub" style={{ marginTop: 8 }}>
            إذا استمر اللاعب لمدة <strong>{impact.extraMin}</strong> دقيقة إضافية:
          </div>

          <div className="grid" style={{ marginTop: 12, gap: 10 }}>
            <div className="alert">
              <div className="t">
                <strong>خطر إصابة عضلية</strong>
                <span>احتمالية متوقعة بناءً على المؤشرات الحالية</span>
              </div>
              <span className="badge red">{impact.injuryProb}%</span>
            </div>

            <div className="alert">
              <div className="t">
                <strong>خسارة مباريات متوقعة</strong>
                <span>تأثير غياب اللاعب على الجدول</span>
              </div>
              <span className="badge ylw">{impact.missedGames} مباريات</span>
            </div>

            <div className="alert">
              <div className="t">
                <strong>التكلفة المحتملة</strong>
                <span>تكلفة علاج/تعافي + أثر غياب</span>
              </div>
              <span className="badge red">{impact.costSAR.toLocaleString("ar-SA")} ر.س</span>
            </div>

            <div className="alert">
              <div className="t">
                <strong>تأثير على احتمالية الفوز</strong>
                <span>تأثير الأداء البدني على النتيجة</span>
              </div>
              <span className="badge ylw">-{impact.winDrop}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE ALERTS */}
      <section className="grid cols-3">
        <div className="alert">
          <div className="t">
            <strong>🔴 ارتفاع مفاجئ في النبض — اللاعب #7</strong>
            <span>اقتراح: تقليل السبرنت + تبريد وترطيب</span>
          </div>
          <span className="badge red">حرِج</span>
        </div>

        <div className="alert">
          <div className="t">
            <strong>🟠 إجهاد متوسط — اللاعب #4</strong>
            <span>اقتراح: تبديل تكتيكي أو إعادة تموضع</span>
          </div>
          <span className="badge ylw">متوسط</span>
        </div>

        <div className="alert">
          <div className="t">
            <strong>🟢 استقرار — اللاعب #10</strong>
            <span>لا توجد مؤشرات خطر فورية</span>
          </div>
          <span className="badge grn">مستقر</span>
        </div>
      </section>
    </div>
  );
}
