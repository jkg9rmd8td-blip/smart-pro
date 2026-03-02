export function calculateRisk(h, c) {
  const crashRisk =
    h.fatigueIndex * 0.35 +
    h.cognitiveLoad * 0.25 +
    c.tireRisk * 0.25 +
    c.brakeRisk * 0.15

  return {
    crashRisk: Math.min(Math.round(crashRisk), 100)
  }
}
