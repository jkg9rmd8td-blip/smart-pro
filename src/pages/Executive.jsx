export default function Executive() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">
        لوحة الإدارة التنفيذية
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-[#131c2a] p-6 rounded-3xl">
          <h3 className="mb-2 text-primary">التعرض المالي</h3>
          <p className="text-2xl font-bold">320,000 ريال</p>
        </div>

        <div className="bg-[#131c2a] p-6 rounded-3xl">
          <h3 className="mb-2 text-primary">جاهزية الفريق</h3>
          <p className="text-2xl font-bold">84%</p>
        </div>

        <div className="bg-[#131c2a] p-6 rounded-3xl">
          <h3 className="mb-2 text-primary">عدد المخاطر العالية</h3>
          <p className="text-2xl font-bold">1 لاعب</p>
        </div>

      </div>
    </div>
  );
}
