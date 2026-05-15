export default function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-gray-500 mb-2">{title}</h2>

      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
