"use client";

import { Mail, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const params = filter === "all" ? "" : `?filter=${filter}`;
      const res = await fetch(`/api/admin/messages${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      setMessages(await res.json());
    } catch {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  const toggleRead = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Toggle failed");
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m)));
    } catch {
      alert("Failed to toggle read status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("Failed to delete message");
    }
  };

  const tabs = [
    { key: "all" as const, label: "All" },
    { key: "unread" as const, label: "Unread" },
    { key: "read" as const, label: "Read" },
  ];

  if (loading) return <div className="text-gray-500 dark:text-slate-400">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Messages</h1>
        <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                filter === tab.key
                  ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 shadow-sm"
                  : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {messages.length === 0 ? (
        <p className="text-gray-500 dark:text-slate-400 text-center py-12">No messages found.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`card p-5 hover:shadow-sm dark:hover:shadow-black/10 transition-shadow ${!msg.read ? "border-l-4 border-l-brand-green-500" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-slate-100">{msg.name}</span>
                    {!msg.read && <span className="w-2 h-2 bg-brand-green-500 rounded-full" />}
                    <span className="text-xs text-gray-500 dark:text-slate-400">{msg.subject}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-1">{msg.message}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{msg.email} • {new Date(msg.createdAt).toISOString().split("T")[0]}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => toggleRead(msg.id)} className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-brand-green-600 rounded-lg hover:bg-brand-green-50 dark:hover:bg-brand-green-900/20" title={msg.read ? "Mark as unread" : "Mark as read"}>
                    <Mail className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(msg.id)} className="p-1.5 text-gray-500 dark:text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
