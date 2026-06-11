"use client";

import { Download } from "lucide-react";
import { useState, useEffect } from "react";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: { name: string };
}

interface Order {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
}

const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusColors: Record<string, string> = {
  DELIVERED: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  PROCESSING: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  SHIPPED: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  CANCELLED: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
  PENDING: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch");
      setOrders(await res.json());
    } catch {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    } catch {
      alert("Failed to update order status");
    } finally {
      setUpdating(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toISOString().split("T")[0];
  };

  if (loading) return <div className="text-gray-500 dark:text-slate-400">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Orders</h1>
        <button className="btn-outline text-sm !px-4 !py-2">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Order ID</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Customer</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Items</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Total</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Payment</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Status</th>
                <th className="text-left p-4 font-medium text-gray-600 dark:text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b dark:border-slate-700 last:border-0 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 font-medium text-gray-900 dark:text-slate-100">{order.reference || order.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <p className="font-medium text-gray-900 dark:text-slate-100">{order.customerName}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{order.customerEmail}</p>
                  </td>
                  <td className="p-4 text-gray-600 dark:text-slate-400">{order.items.length}</td>
                  <td className="p-4 font-medium text-gray-900 dark:text-slate-100">{formatCurrency(order.total)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${order.paymentStatus === "paid" ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300" : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400"}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={updating === order.id}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border-0 cursor-pointer focus:ring-2 focus:ring-brand-green-500 ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-gray-500 dark:text-slate-400">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
