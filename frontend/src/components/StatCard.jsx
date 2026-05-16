export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 border shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h2 className="text-4xl font-bold text-slate-900 mt-3">{value}</h2>
        </div>

        <div className="bg-slate-100 p-3 rounded-xl">{icon}</div>
      </div>
    </div>
  );
}
