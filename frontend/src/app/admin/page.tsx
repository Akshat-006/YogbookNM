import Link from "next/link";

import { AdminDashboard } from "@/features/admin/components/AdminDashboard";

export default function AdminHomePage() {
  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between rounded-2xl border bg-background p-4 shadow-sm">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Admin workspace</p>
          <h1 className="text-2xl font-semibold">Operations overview</h1>
        </div>
        <Link href="/admin/payments" className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-muted">
          Manage payments
        </Link>
      </div>
      <AdminDashboard />
    </div>
  );
}
