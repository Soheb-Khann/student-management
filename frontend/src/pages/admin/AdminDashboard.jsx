import DashboardLayout from "../../layouts/DashboardLayout";

import StatCard from "../../components/StatCard";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Students" value="250" />

        <StatCard title="Teachers" value="10" />

        <StatCard title="Classes" value="9" />

        <StatCard title="Pending Fees" value="23" />
      </div>
    </DashboardLayout>
  );
}
