import { useState, useEffect } from "react";

export default function RiskGauge() {
  const [risk, setRisk] = useState(70);

  useEffect(() => {
    const interval = setInterval(() => {
      setRisk(prev => (prev >= 90 ? 70 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-3xl p-6 border border-primary/20 shadow-lg">
      <h3 className="text-primary font-bold mb-4">مؤشر تسارع الخطر</h3>
      <div className="text-5xl font-extrabold text-primary">
        {risk}%
      </div>
      <div className="mt-4 h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${risk}%` }}
        />
      </div>
    </div>
  );
}
