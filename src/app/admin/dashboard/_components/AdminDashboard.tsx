"use client";
import { currentUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetUserQuery } from "@/redux/api/auth/authApi";
import {
  useGetAdminDashboardStatsQuery,
  RevenueMonth,
  WeeklyBooking,
  TopFacility,
} from "@/redux/api/dashboard/dashboardApi";
import { TUser } from "@/types/shared.type";
import { closeGreetings } from "@/redux/features/dashboardSlice";
import {
  IoBarChart,
  IoCash,
  IoClose,
  IoPeople,
  IoTrendingUp,
} from "react-icons/io5";

const formatMonthLabel = (monthKey: string) => {
  const [year, month] = monthKey.split("-");
  return new Date(Number(year), Number(month) - 1, 1).toLocaleString("en-US", {
    month: "short",
  });
};

const formatDayLabel = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const AdminDashboard = () => {
  const user = useAppSelector(currentUser);
  const greetings = useAppSelector((state) => state.dashboard.greetings);
  const dispatch = useAppDispatch();
  const { data: userData } = useGetUserQuery(
    user ? `${(user as TUser).email}` : "",
  );
  const { data, isLoading } = useGetAdminDashboardStatsQuery(undefined);

  const handleGreeting = () => {
    dispatch(closeGreetings());
  };

  const dashboard = data?.data;
  const stats = [
    {
      label: "Total Users",
      value: dashboard?.totalUsers ?? "--",
      change: "+12%",
      icon: <IoPeople className="h-5 w-5" />,
    },
    {
      label: "Active Bookings",
      value: dashboard?.activeBookings ?? "--",
      change: "+8%",
      icon: <IoBarChart className="h-5 w-5" />,
    },
    {
      label: "Monthly Revenue",
      value: dashboard?.monthlyRevenue
        ? `$${dashboard.monthlyRevenue.toLocaleString()}`
        : "--",
      change: "+18%",
      icon: <IoCash className="h-5 w-5" />,
    },
    {
      label: "Pending Requests",
      value: dashboard?.newRequests ?? "--",
      change: dashboard?.newRequests ? "-3%" : "0%",
      icon: <IoTrendingUp className="h-5 w-5" />,
    },
  ];

  const revenueByMonth = dashboard?.revenueByMonth ?? [];
  const weeklyBookings = dashboard?.weeklyBookings ?? [];
  const topFacilities = dashboard?.topFacilities ?? [];
  const revenuePoints = revenueByMonth
    .map((item: RevenueMonth, index: number) => {
      const x = (index / Math.max(revenueByMonth.length - 1, 1)) * 100;
      const maxTotal = Math.max(
        ...revenueByMonth.map((entry: RevenueMonth) => entry.total),
        1,
      );
      const y = 100 - (item.total / maxTotal) * 80;
      return `${x},${Number.isFinite(y) ? y : 100}`;
    })
    .join(" ");

  const bookingMax = Math.max(
    ...weeklyBookings.map((item: WeeklyBooking) => item.count),
    1,
  );

  return (
    <div className="pt-6">
      <div
        className={`${
          !greetings && "hidden"
        } bg-[#1B1F3B] flex flex-col gap-3 md:flex-row md:items-center justify-between p-4 text-white rounded-3xl shadow-sm`}
      >
        <div className="text-sm md:text-base">
          Welcome <span className="font-semibold">{userData?.data?.name}</span>,
          here’s your dashboard summary.
        </div>
        <button
          onClick={handleGreeting}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <IoClose size={18} />
        </button>
      </div>

      <div className="grid gap-4 mt-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  {item.value}
                </h3>
              </div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                {item.icon}
              </div>
            </div>
            <p className="mt-4 text-sm text-emerald-600">
              {item.change} vs last period
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Monthly Revenue</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {dashboard?.monthlyRevenue
                  ? `$${dashboard.monthlyRevenue.toLocaleString()}`
                  : isLoading
                    ? "Loading..."
                    : "$0"}
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
              +15.8%
            </span>
          </div>

          <div className="mt-8">
            <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
              <svg
                viewBox="0 0 100 120"
                className="h-64 w-full overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.45" />
                    <stop
                      offset="100%"
                      stopColor="#4f46e5"
                      stopOpacity="0.05"
                    />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                  points={revenuePoints}
                />
                <polygon
                  fill="url(#revenueGradient)"
                  points={`0,100 ${revenuePoints} 100,100`}
                />
                {revenueByMonth.map((item: RevenueMonth, index: number) => {
                  const x =
                    (index / Math.max(revenueByMonth.length - 1, 1)) * 100;
                  const maxTotal = Math.max(
                    ...revenueByMonth.map((entry: RevenueMonth) => entry.total),
                    1,
                  );
                  const y = 100 - (item.total / maxTotal) * 80;
                  return (
                    <circle
                      key={item.month}
                      cx={x}
                      cy={Number.isFinite(y) ? y : 100}
                      r="1.8"
                      fill="#4f46e5"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {revenueByMonth.map((item: RevenueMonth) => (
                <div
                  key={item.month}
                  className="rounded-2xl bg-slate-50 p-3 text-center"
                >
                  <p className="text-sm text-slate-500">
                    {formatMonthLabel(item.month)}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    ${item.total.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Weekly Bookings</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {weeklyBookings.reduce(
                  (sum: number, item: WeeklyBooking) => sum + item.count,
                  0,
                )}{" "}
                bookings
              </h2>
            </div>
            <span className="rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-700">
              +9.2%
            </span>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200/70 bg-slate-50 p-4">
            <div className="flex items-end gap-3 h-52">
              {weeklyBookings.map((item: WeeklyBooking) => {
                const height = (item.count / bookingMax) * 100;
                return (
                  <div key={item.date} className="flex-1 text-center">
                    <div className="mx-auto flex h-full flex-col justify-end">
                      <div
                        className="mx-auto w-10 rounded-full bg-slate-900"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="mt-3 block text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {formatDayLabel(item.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm">
            <div className="flex items-center justify-between">
              <span>Completed bookings</span>
              <span className="font-semibold text-slate-900">
                {dashboard?.activeBookings ?? "--"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending approvals</span>
              <span className="font-semibold text-slate-900">
                {dashboard?.newRequests ?? "--"}
              </span>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">Top Facilities</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Most booked this month
            </h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {topFacilities.length > 0 ? (
            topFacilities.map((facility: TopFacility) => (
              <div
                key={facility.name}
                className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4"
              >
                <p className="text-sm text-slate-500">
                  {facility.name || "Unknown Facility"}
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">
                  {facility.count}
                </p>
              </div>
            ))
          ) : (
            <div key="no-facility" className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4 text-slate-500">
              No facility booking data available yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
