import { Users, GraduationCap, BookOpen, CreditCard } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

import StatCard from "../../components/StatCard";

import PageHeader from "../../components/PageHeader";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard"
        description="Overview of your school system"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Students" value="250" icon={<Users />} />

        <StatCard title="Teachers" value="10" icon={<GraduationCap />} />

        <StatCard title="Classes" value="9" icon={<BookOpen />} />

        <StatCard title="Pending Fees" value="23" icon={<CreditCard />} />
      </div>
    </DashboardLayout>
  );
}
