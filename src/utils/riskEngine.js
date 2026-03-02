export function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export function calcRisk({ hr, temp, spo2, fatigue }) {
  // Demo Model (محسوب لإظهار نتائج قوية في الواجهة)
  const hrScore = clamp((hr - 60) * 0.9, 0, 40);
  const tempScore = clamp((temp - 36.6) * 25, 0, 25);
  const o2Score = clamp((98 - spo2) * 6, 0, 25);
  const fatScore = clamp(fatigue * 0.5, 0, 30);

  const raw = hrScore + tempScore + o2Score + fatScore;
  return clamp(Math.round(raw), 0, 99);
}

export function riskLabel(risk) {
  if (risk < 35) return { label: "منخفض", tone: "grn" };
  if (risk < 70) return { label: "متوسط", tone: "ylw" };
  return { label: "مرتفع", tone: "red" };
}

export function gameImpact(risk) {
  const extraMin = risk < 35 ? 18 : risk < 70 ? 12 : 6;
  const injuryProb = risk < 35 ? 14 : risk < 70 ? 38 : 62;
  const missedGames = risk < 35 ? 0 : risk < 70 ? 2 : 4;
  const costSAR = risk < 35 ? 80000 : risk < 70 ? 420000 : 980000;
  const winDrop = risk < 35 ? 3 : risk < 70 ? 11 : 19;
  return { extraMin, injuryProb, missedGames, costSAR, winDrop };
}
