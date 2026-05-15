import DashboardLayout from "../../layouts/DashboardLayout";

export default function ParentDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <p>Welcome to the parent portal.</p>
      </div>
    </DashboardLayout>
  );
}
