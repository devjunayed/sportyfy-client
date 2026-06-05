import HandleDataLoading from "@/components/Shared/HandleDataLoading/HandleDataLoading";
import { useGetAllBookingQuery } from "@/redux/api/booking/bookingApi";

const Bookings = () => {
  const { data: bookings, isLoading } = useGetAllBookingQuery("");

  return (
    <div className="mt-20">
      <HandleDataLoading
        loadingOnly
        isLoading={isLoading}
        data={bookings?.data}
      >
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  No.
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Facility Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  User Name
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  User Email
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Slot
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Amount
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700">
                  Payment
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bookings?.data?.map((record: any, index: number) => (
                <tr key={record._id || index} className="hover:bg-slate-50">
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4 text-slate-900">
                    {record.facility?.name}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.user?.name}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.user?.email}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{record.date}</td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.startTime} - {record.endTime}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {record.payableAmount}$
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${record.isBooked === "confirmed" ? "bg-green-100 text-green-700" : record.isBooked === "canceled" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}`}
                    >
                      {record.isBooked}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${record.paymentStatus === "Paid" ? "bg-green-100 text-green-700" : record.paymentStatus === "Canceled" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {record.paymentStatus}
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

export default Bookings;
