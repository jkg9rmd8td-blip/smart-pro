export function getDecision(risk) {
  if (risk.crashRisk > 75)
    return { message: "⚠ دخول الصيانة فورًا — خطر مرتفع" }

  if (risk.crashRisk > 55)
    return { message: "⚠ مراقبة — خطر متوسط" }

  return { message: "الوضع مستقر" }
}
