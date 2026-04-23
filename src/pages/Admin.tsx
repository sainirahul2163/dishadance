import { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { format, subDays, startOfDay } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowLeft,
  Crown,
  Download,
  GraduationCap,
  IndianRupee,
  LockKeyhole,
  Package,
  RefreshCw,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_PASSWORD = "Don";
const SESSION_KEY = "dda_admin_authed";

type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  price: number;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  payment_status: string;
  created_at: string;
};

const PINK = "#FF4FA3";
const MAGENTA = "#E91E8C";

/* ---------- Login Gate ---------- */
const LoginGate = ({ onSuccess }: { onSuccess: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError("Wrong password!");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-7 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center mb-3">
            <LockKeyhole className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-display font-black text-xl">
            Disha's <span className="italic" style={{ color: PINK }}>Dance</span> Academy
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Admin Dashboard</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pwd" className="text-zinc-300">Password</Label>
          <Input
            id="pwd"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoFocus
            className="bg-zinc-950 border-zinc-700 text-zinc-100 h-11"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full mt-5 h-11 font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${PINK}, ${MAGENTA})` }}
        >
          Sign In
        </Button>

        <Link
          to="/"
          className="block text-center text-xs text-zinc-500 hover:text-zinc-300 mt-4"
        >
          ← Back to website
        </Link>
      </form>
    </main>
  );
};

/* ---------- Stat Card ---------- */
const StatCard = ({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent: string;
}) => (
  <div
    className="rounded-2xl p-4 md:p-5 border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 relative overflow-hidden"
  >
    <div
      className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-2xl"
      style={{ background: accent }}
    />
    <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
      <Icon className="w-4 h-4" />
      {label}
    </div>
    <div className="mt-2 font-display font-black text-2xl md:text-3xl text-white">
      {value}
    </div>
  </div>
);

/* ---------- CSV Export ---------- */
const exportCSV = (orders: Order[]) => {
  const header = ["Name", "Email", "Phone", "Plan", "Amount", "Payment ID", "Date"];
  const rows = orders.map((o) => [
    o.name,
    o.email,
    o.phone,
    o.plan === "8" ? "8 Sessions" : "4 Sessions",
    o.price,
    o.razorpay_payment_id ?? "",
    format(new Date(o.created_at), "dd MMM yyyy, HH:mm"),
  ]);
  const escape = (v: unknown) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [header, ...rows].map((r) => r.map(escape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `orders-${format(new Date(), "yyyy-MM-dd")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

/* ---------- Dashboard ---------- */
const Dashboard = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paidOnly, setPaidOnly] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async (silent = false) => {
    if (!silent) setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setOrders((data ?? []) as Order[]);
    } catch (err) {
      console.error(err);
      toast({
        title: "Failed to load orders",
        description: (err as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(() => fetchOrders(true), 60_000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const paid = useMemo(
    () => (orders ?? []).filter((o) => o.payment_status === "paid"),
    [orders],
  );

  const stats = useMemo(() => {
    const totalRevenue = paid.reduce((sum, o) => sum + (o.price ?? 0), 0);
    const starter = paid.filter((o) => o.plan === "4").length;
    const pro = paid.filter((o) => o.plan === "8").length;
    return { totalRevenue, totalOrders: paid.length, starter, pro };
  }, [paid]);

  // 30-day revenue series
  const revenueSeries = useMemo(() => {
    const days: { date: string; label: string; revenue: number }[] = [];
    const today = startOfDay(new Date());
    for (let i = 29; i >= 0; i--) {
      const d = subDays(today, i);
      days.push({
        date: format(d, "yyyy-MM-dd"),
        label: format(d, "dd MMM"),
        revenue: 0,
      });
    }
    const map = new Map(days.map((d) => [d.date, d]));
    paid.forEach((o) => {
      const key = format(new Date(o.created_at), "yyyy-MM-dd");
      const bucket = map.get(key);
      if (bucket) bucket.revenue += o.price ?? 0;
    });
    return days;
  }, [paid]);

  const planSplit = useMemo(
    () => [
      { name: "Starter (4)", value: stats.starter, color: PINK },
      { name: "Pro (8)", value: stats.pro, color: MAGENTA },
    ],
    [stats],
  );

  const filtered = useMemo(() => {
    const base = paidOnly ? paid : orders ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return base;
    return base.filter(
      (o) =>
        o.name?.toLowerCase().includes(q) ||
        o.email?.toLowerCase().includes(q) ||
        o.phone?.toLowerCase().includes(q),
    );
  }, [orders, paid, paidOnly, search]);

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur sticky top-0 z-30">
        <div className="container max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Website
          </Link>
          <div className="font-display font-black text-sm md:text-base">
            Admin <span className="italic" style={{ color: PINK }}>Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => fetchOrders()}
              disabled={refreshing}
              className="bg-transparent border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-white"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl bg-zinc-900" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              icon={IndianRupee}
              label="Total Revenue"
              value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
              accent={PINK}
            />
            <StatCard
              icon={Package}
              label="Total Orders"
              value={String(stats.totalOrders)}
              accent={MAGENTA}
            />
            <StatCard
              icon={GraduationCap}
              label="Starter Sales"
              value={String(stats.starter)}
              accent="#FF8FBF"
            />
            <StatCard
              icon={Crown}
              label="Pro Sales"
              value={String(stats.pro)}
              accent="#C2185B"
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 md:p-5">
            <h3 className="text-sm font-bold text-zinc-200 mb-4">
              Revenue — Last 30 days
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSeries}>
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="label"
                    stroke="#a1a1aa"
                    tick={{ fontSize: 11 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis stroke="#a1a1aa" tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      background: "#18181b",
                      border: "1px solid #3f3f46",
                      borderRadius: 8,
                      color: "#fafafa",
                    }}
                    formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={MAGENTA}
                    strokeWidth={2.5}
                    dot={{ fill: PINK, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 md:p-5">
            <h3 className="text-sm font-bold text-zinc-200 mb-4">Plan Split</h3>
            <div className="h-64">
              {stats.starter + stats.pro === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-zinc-500">
                  No paid orders yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planSplit}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {planSplit.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#18181b",
                        border: "1px solid #3f3f46",
                        borderRadius: 8,
                        color: "#fafafa",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: 12, color: "#a1a1aa" }}
                      formatter={(value, entry) => {
                        const item = planSplit.find((p) => p.name === value);
                        return `${value} — ${item?.value ?? 0}`;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Orders table */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h3 className="text-sm font-bold text-zinc-200">Orders</h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search name, email, phone…"
                  className="pl-9 bg-zinc-950 border-zinc-700 text-zinc-100 h-9 w-full sm:w-64"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Switch
                  checked={paidOnly}
                  onCheckedChange={setPaidOnly}
                  id="paid-only"
                />
                <Label htmlFor="paid-only" className="cursor-pointer">
                  Paid only
                </Label>
              </div>
              <Button
                size="sm"
                onClick={() => exportCSV(paid)}
                disabled={paid.length === 0}
                className="text-white"
                style={{ background: `linear-gradient(135deg, ${PINK}, ${MAGENTA})` }}
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900 text-zinc-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-3 py-2.5">#</th>
                  <th className="text-left px-3 py-2.5">Name</th>
                  <th className="text-left px-3 py-2.5">Email</th>
                  <th className="text-left px-3 py-2.5">Phone</th>
                  <th className="text-left px-3 py-2.5">Plan</th>
                  <th className="text-right px-3 py-2.5">Amount</th>
                  <th className="text-left px-3 py-2.5">Payment ID</th>
                  <th className="text-left px-3 py-2.5">Status</th>
                  <th className="text-left px-3 py-2.5">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-t border-zinc-800">
                      <td colSpan={9} className="p-2">
                        <Skeleton className="h-8 w-full bg-zinc-800" />
                      </td>
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-zinc-500">
                      {orders && orders.length === 0
                        ? "No orders yet"
                        : "No matching orders"}
                    </td>
                  </tr>
                ) : (
                  filtered.map((o, idx) => (
                    <tr
                      key={o.id}
                      className="border-t border-zinc-800 hover:bg-zinc-900/80"
                    >
                      <td className="px-3 py-2.5 text-zinc-500">{idx + 1}</td>
                      <td className="px-3 py-2.5 text-zinc-100 font-medium whitespace-nowrap">
                        {o.name}
                      </td>
                      <td className="px-3 py-2.5 text-zinc-300">{o.email}</td>
                      <td className="px-3 py-2.5 text-zinc-300 whitespace-nowrap">
                        {o.phone}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background: o.plan === "8" ? `${MAGENTA}33` : `${PINK}33`,
                            color: o.plan === "8" ? MAGENTA : PINK,
                          }}
                        >
                          {o.plan === "8" ? "8 Sessions" : "4 Sessions"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right text-zinc-100 font-semibold whitespace-nowrap">
                        ₹{(o.price ?? 0).toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-2.5 text-xs font-mono text-zinc-400">
                        {o.razorpay_payment_id ?? "—"}
                      </td>
                      <td className="px-3 py-2.5">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            o.payment_status === "paid"
                              ? "bg-emerald-500/15 text-emerald-400"
                              : "bg-amber-500/15 text-amber-400"
                          }`}
                        >
                          {o.payment_status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-zinc-400 whitespace-nowrap">
                        {format(new Date(o.created_at), "dd MMM yyyy, HH:mm")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

/* ---------- Page wrapper ---------- */
const Admin = () => {
  const [authed, setAuthed] = useState<boolean>(
    () => typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1",
  );

  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return <Dashboard />;
};

export default Admin;