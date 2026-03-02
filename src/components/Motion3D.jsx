import { useEffect, useMemo, useRef, useState } from "react";
import { motionTemplate } from "../data/motionFrames.js";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function project3D(pt, rotY, scale) {
  // دوران حول محور Y + إسقاط منظور بسيط
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);

  const x = pt.x * cos + pt.z * sin;
  const z = -pt.x * sin + pt.z * cos;

  const depth = 2.2; // ثابت منظور
  const k = depth / (depth + z); // perspective factor
  return { x: x * k * scale, y: pt.y * k * scale, z };
}

export default function Motion3D({ selectedPlayerName = "اللاعب #7" }) {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState(0);
  const [running, setRunning] = useState(true);
  const [rot, setRot] = useState(0.8);

  const clip = useMemo(() => motionTemplate[mode], [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let raf = 0;
    let t0 = performance.now();

    function resize() {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const links = [
      ["head", "neck"],
      ["neck", "pelvis"],
      ["neck", "lShoulder"],
      ["neck", "rShoulder"],
      ["lShoulder", "lElbow"],
      ["lElbow", "lHand"],
      ["rShoulder", "rElbow"],
      ["rElbow", "rHand"],
      ["pelvis", "lKnee"],
      ["lKnee", "lFoot"],
      ["pelvis", "rKnee"],
      ["rKnee", "rFoot"]
    ];

    function draw(now) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // خلفية HUD خفيفة
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 12; i++) {
        ctx.fillRect((w / 12) * i, 0, 1, h);
        ctx.fillRect(0, (h / 12) * i, w, 1);
      }
      ctx.restore();

      const time = (now - t0) / 1000;
      const phase = time * 3.0;
      const rotY = rot + Math.sin(time * 0.6) * 0.25;

      const j = clip.joints(phase);
      const scale = Math.min(w, h) * 0.35;

      // محاذاة المنتصف
      const cx = w * 0.55;
      const cy = h * 0.58;

      // نضيف z fake للأطراف عشان منظور أحلى
      const j3 = { ...j };
      j3.lHand = { ...j3.lHand, z: 0.35 };
      j3.rHand = { ...j3.rHand, z: -0.35 };
      j3.lFoot = { ...j3.lFoot, z: 0.25 };
      j3.rFoot = { ...j3.rFoot, z: -0.25 };

      // إسقاط
      const p2 = {};
      Object.keys(j3).forEach((k) => {
        const pp = project3D(j3[k], rotY, scale);
        p2[k] = { x: cx + pp.x, y: cy - pp.y };
      });

      // ظل أرضي
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = "rgba(0,245,168,.18)";
      ctx.beginPath();
      ctx.ellipse(cx, cy + scale * 0.75, scale * 0.55, scale * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // رسم العظام
      ctx.save();
      ctx.lineWidth = 3.2;
      ctx.strokeStyle = "rgba(0,245,168,.75)";
      ctx.shadowColor = "rgba(0,245,168,.35)";
      ctx.shadowBlur = 18;

      links.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(p2[a].x, p2[a].y);
        ctx.lineTo(p2[b].x, p2[b].y);
        ctx.stroke();
      });

      // المفاصل
      ctx.shadowBlur = 22;
      Object.keys(p2).forEach((k) => {
        const pt = p2[k];
        ctx.fillStyle = "rgba(0,195,255,.85)";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, k === "head" ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // HUD نص
      ctx.save();
      ctx.fillStyle = "rgba(242,244,247,.92)";
      ctx.font = "800 14px system-ui, -apple-system, Arial";
      ctx.fillText("تحليل الحركة — عرض 3D (محاكاة)", 16, 28);

      ctx.fillStyle = "rgba(242,244,247,.70)";
      ctx.font = "600 12px system-ui, -apple-system, Arial";
      ctx.fillText(`المقطع: ${clip.name} • ${selectedPlayerName}`, 16, 48);

      // اكتشافات (Demo)
      const asym = Math.round(lerp(6, 18, (Math.sin(time * 0.9) + 1) / 2));
      const load = Math.round(lerp(32, 78, (Math.sin(time * 0.7 + 1) + 1) / 2));
      ctx.fillText(`اختلال يمين/يسار: ${asym}%  •  حمل مفصلي: ${load}%`, 16, 68);

      ctx.restore();

      if (running) raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [clip, running, rot, selectedPlayerName]);

  return (
    <div className="motionWrap">
      <canvas ref={canvasRef} className="motionCanvas" />

      <div className="motionHud">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="pill">
            <span className="glow" /> وضع: <strong>{motionTemplate[mode].name}</strong>
          </span>
          <span className="pill">دقة الهيكل: <strong>98%</strong></span>
        </div>

        <div className="motionBtns">
          <button className="btn" onClick={() => setMode((m) => (m + 1) % motionTemplate.length)}>
            تغيير المقطع
          </button>
          <button className="btn" onClick={() => setRunning((r) => !r)}>
            {running ? "إيقاف" : "تشغيل"}
          </button>
          <button className="btn" onClick={() => setRot((r) => r + 0.25)}>
            تدوير
          </button>
          <button className="btn primary" onClick={() => (window.location.hash = "#/injury-prediction")}>
            إرسال للتنبؤ بالإصابة
          </button>
        </div>
      </div>
    </div>
  );
}
