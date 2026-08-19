// src/app/admin/(dashboard)/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const [productCount, activeProductCount, inquiryCount, newInquiryCount, recentInquiries] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Total Products", value: productCount },
    { label: "Active Products", value: activeProductCount },
    { label: "Total Inquiries", value: inquiryCount },
    { label: "New Inquiries", value: newInquiryCount },
  ];

  return (
    <main className="p-8">
      <h1 className="font-display text-ink text-2xl font-semibold">Dashboard</h1>
      <p className="text-ink-muted mt-1 text-sm">Overview of your catalog and inquiries.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-border bg-card rounded-lg border p-5">
            <p className="text-muted font-mono text-xs font-medium uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="font-display text-ink mt-2 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="border-border bg-card mt-8 rounded-lg border">
        <div className="border-border flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-display text-ink text-base font-semibold">Recent Inquiries</h2>
        </div>
        {recentInquiries.length > 0 ? (
          <ul className="divide-border divide-y">
            {recentInquiries.map((inquiry) => (
              <li key={inquiry.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-ink truncate text-sm font-medium">{inquiry.name}</p>
                  <p className="text-ink-muted truncate text-xs">{inquiry.email}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Badge variant={inquiry.status === "NEW" ? "primary" : "default"}>
                    {inquiry.status}
                  </Badge>
                  <span className="text-muted text-xs">
                    {inquiry.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-muted px-5 py-6 text-sm">No inquiries yet.</p>
        )}
      </div>

      <p className="text-muted mt-4 text-xs">
        Manage your catalog under{" "}
        <Link href="/admin/products" className="text-primary hover:underline">
          Products
        </Link>
        .
      </p>
    </main>
  );
}
