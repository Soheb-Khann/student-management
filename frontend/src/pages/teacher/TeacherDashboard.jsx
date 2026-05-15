import DashboardLayout from "../../layouts/DashboardLayout";

import StatCard from "../../components/StatCard";

export default function TeacherDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="My Classes" value="3" />

        <StatCard title="Students" value="75" />

        <StatCard title="Attendance Pending" value="2" />
      </div>
    </DashboardLayout>
  );
}
