import { baseApi } from "../baseApi";

export interface RevenueMonth {
  month: string;
  total: number;
}

export interface WeeklyBooking {
  date: string;
  count: number;
}

export interface TopFacility {
  name: string;
  count: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalFacilities: number;
  activeBookings: number;
  monthlyRevenue: number;
  newRequests: number;
  revenueByMonth: RevenueMonth[];
  weeklyBookings: WeeklyBooking[];
  topFacilities: TopFacility[];
}

export interface DashboardStatsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardStats;
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardStats: builder.query<DashboardStatsResponse, void>({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminDashboardStatsQuery } = dashboardApi;
