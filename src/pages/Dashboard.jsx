import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { minute: 10, risk: 60 },
  { minute: 20, risk: 65 },
  { minute: 30, risk: 72 },
  { minute: 40, risk: 78 },
  { minute: 50, risk: 85 }
];

export default function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-primary mb-8">
        مركز القيادة التنبؤية
      </h1>

      <div className="bg-[#131c2a] p-6 rounded-3xl shadow-xl mb-8">
        <h3 className="mb-4 text-primary">تطور مؤشر الخطر</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="risk" stroke="#00ffd5" strokeWidth={3} />
            <CartesianGrid stroke="#1f2937" />
            <XAxis dataKey="minute" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
