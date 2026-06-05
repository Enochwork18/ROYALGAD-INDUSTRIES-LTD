"use client";

import { Package, ShoppingCart, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load stats");
        setLoading(false);
      });
  }, []);

  const [recentOrders, setRecentOrders] = useState<{ id: string; customer: string; status: string; total: string; date: string }[]>([]);

  useEffect(() => {
    fetch("/api/admin/orders?limit=5")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRecentOrders(data.map((o: { reference: string; customerName: string; status: string; total: number; createdAt: string }) => ({
            id: o.reference,
            customer: o.customerName,
            status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
            total: `₦${o.total.toLocaleString()}`,
            date: new Date(o.createdAt).toISOString().split("T")[0],
          })));
        }
      })
      .catch(() => {});
  }, []);

  const statCards = [
    { label: "Total Products", value: stats?.totalProducts ?? 0, icon: Package, color: "bg-blue-500" },
    { label: "Orders Today", value: stats?.todayOrders ?? 0, icon: ShoppingCart, color: "bg-green-500" },
    { label: "Active Orders", value: stats?.activeOrders ?? 0, icon: ShoppingCart, color: "bg-brand-orange-500" },
    { label: "Unread Messages", value: stats?.unreadMessages ?? 0, icon: MessageSquare, color: "bg-purple-500" },
  ];

  if (loading) return <div className="text-gray-500 dark:text-slate-400">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="p-5 border-b dark:border-slate-700 flex items-center justify-between">
          <h2 className="font-bold text-gray-900 dark:text-slate-100">Recent Orders</h2>
          <span className="text-sm text-gray-500 dark:text-slate-400">Last 7 days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Order ID</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Customer</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Status</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Total</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium text-gray-900 dark:text-slate-100">{order.id}</td>
                  <td className="p-4 text-gray-600 dark:text-slate-400">{order.customer}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered" ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" :
                      order.status === "Processing" ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" :
                      "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-900 dark:text-slate-100 font-medium">{order.total}</td>
                  <td className="p-4 text-gray-500 dark:text-slate-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
