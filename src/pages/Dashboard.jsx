import RiskGauge from "../components/RiskGauge";
import ExecutivePanel from "../components/ExecutivePanel";
import DecisionCard from "../components/DecisionCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-darkbg p-6">

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl shadow-xl border border-primary/20 mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          مركز القيادة الصحية التنبؤية
        </h1>
        <p className="text-gray-400">
          نظام ذكاء اصطناعي لاتخاذ القرار الوقائي أثناء المباراة
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <RiskGauge />
        <DecisionCard />
        <ExecutivePanel />
      </div>

    </div>
  );
}
