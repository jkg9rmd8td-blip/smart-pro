import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function RiskChart() {
  const data = {
    labels: ["د1", "د2", "د3", "د4", "د5"],
    datasets: [
      {
        label: "تصاعد المخاطر",
        data: [10, 25, 40, 55, 72],
        borderColor: "#00e0a4",
        tension: 0.4
      }
    ]
  };

  return <Line data={data} />;
}
