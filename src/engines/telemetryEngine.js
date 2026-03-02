export function calculateCarStress(car) {
  const tireRisk =
    (car.FL + car.FR + car.RL + car.RR) / 4

  const brakeRisk = car.brakeTemp / 8

  return {
    tireRisk: Math.min(Math.round(tireRisk), 100),
    brakeRisk: Math.min(Math.round(brakeRisk), 100)
  }
}
