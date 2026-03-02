export default function Players() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">
        إدارة اللاعبين
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#131c2a] p-6 rounded-3xl">
          <h3 className="text-xl mb-2">محمد أحمد</h3>
          <p>مستوى الخطر: 82%</p>
          <p>معدل الإجهاد: مرتفع</p>
        </div>

        <div className="bg-[#131c2a] p-6 rounded-3xl">
          <h3 className="text-xl mb-2">علي سالم</h3>
          <p>مستوى الخطر: 65%</p>
          <p>معدل الإجهاد: متوسط</p>
        </div>
      </div>
    </div>
  );
}
