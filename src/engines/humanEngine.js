export function calculateHumanState(v) {
  const fatigue =
    (v.hr / 200) * 40 +
    (v.coreTemp - 36) * 20 +
    (100 - v.hydration) * 0.5

  const cognitiveLoad = v.reactionTime / 2.5

  return {
    fatigueIndex: Math.min(Math.round(fatigue), 100),
    cognitiveLoad: Math.min(Math.round(cognitiveLoad), 100)
  }
}
