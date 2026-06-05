"use client";

import { useGetAllBookingQuery } from "@/redux/api/booking/bookingApi";
import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";

type BookingRecord = {
  _id?: string;
  facility?: { name?: string; location?: string };
  user?: { name?: string; email?: string };
  date?: string;
  startTime?: string;
  endTime?: string;
  payableAmount?: number;
  isBooked?: string;
  paymentStatus?: string;
};

const statusClass = (status?: string) => {
  if (status === "confirmed" || status === "Paid") {
    return "bg-green-50 text-green-700 ring-green-200";
  }
  if (status === "canceled" || status === "Canceled") {
    return "bg-red-50 text-red-700 ring-red-200";
  }
  if (status === "Pending") {
    return "bg-yellow-50 text-yellow-700 ring-yellow-200";
  }
  return "bg-slate-100 text-slate-700 ring-slate-200";
};

const ManageBookings = () => {
  const { data: manageBookings, isLoading } = useGetAllBookingQuery("");
  const bookings = manageBookings?.data || [];

  return (
    <div className="mt-20">
      <HandleDataLoading loadingOnly isLoading={isLoading} data={bookings}>
        <div className="mt-4 max-h-[85vh] overflow-auto rounded-md border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="sticky top-0 bg-slate-50">
              <tr>
                {[
                  "No.",
                  "Facility Name",
                  "User Name",
                  "User Email",
                  "Date",
                  "Slot",
                  "Amount",
                  "Status",
                  "Payment",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-4 py-3 text-left font-semibold text-slate-700"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bookings.map((record: BookingRecord, index: number) => (
                <tr key={record._id || index} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">
                    {record.facility?.name || "-"}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.user?.name || "-"}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.user?.email || "-"}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.date || "-"}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.startTime || "-"} - {record.endTime || "-"}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.payableAmount ?? 0}$
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${statusClass(
                        record.isBooked,
                      )}`}
                    >
                      {record.isBooked || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${statusClass(
                        record.paymentStatus,
                      )}`}
                    >
                      {record.paymentStatus || "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </HandleDataLoading>
    </div>
  );
};

export default ManageBookings;
