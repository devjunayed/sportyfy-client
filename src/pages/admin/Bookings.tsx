import {  Table } from "antd";
import { useGetAllBookingQuery } from "../../redux/api/booking/bookingApi";
import Column from "antd/es/table/Column";

const Bookings = () => {
  const { data: bookings } = useGetAllBookingQuery("");
  return (
    <div>
      {bookings?.data?.length === 0 ||
        (!bookings && (
          <div className="flex min-h-screen items-center justify-center text-red-700 text-xl">
            No Facilities found
          </div>
        ))}

      <Table dataSource={bookings?.data} className=" mt-4 overflow-x-auto">
        <Column
          title="No."
          key="serial"
          render={(_, __, index) => <>{index + 1}</>}
        />
        <Column
          title="Facility Name"
          render={(_, record) => <>{record.facility.name}</>}
          key="name"
        />
        <Column
          title="Location"
          render={(_, record) => <>{record.facility.location}</>}
          key="name"
        />

        <Column
          title="User Name"
          render={(_, record) => <>{record.user.name}</>}
          key="facility"
        />
        <Column
          title="User Email"
          render={(_, record) => <>{record.user.email}</>}
          key="facility"
        />
        <Column
          title="Date"
          render={(_, record) => <>{record.date}</>}
          key="facility"
        />
        <Column
          title="Slot"
          render={(_, record) => (
            <>
              {record.startTime} - {record.endTime}
            </>
          )}
          key="facility"
        />

        <Column
          title="Amount"
          render={(_, record) => <>{record.payableAmount}$</>}
          key="price perHour"
        />

        <Column
          title="Status"
          render={(_, record) => (
            <>
              <span
                className={` ${record.isBooked === "confirmed" && "text-green-600"} ${
                  record.isBooked === "canceled" && "text-red-600"
                } badge bg-gray-200 p-3`}
              >
                {record.isBooked}
              </span>
            </>
          )}
        />
        <Column
          title="Payment"
          render={(_, record) => (
            <>
              <span
                className={`${
                  record.paymentStatus === "Pending" && "text-yellow-600"
                } ${record.paymentStatus === "Paid" && "text-green-600"} ${
                  record.paymentStatus === "Canceled" && "text-red-600"
                } badge bg-gray-200 p-3`}
              >
                {record.paymentStatus}
              </span>
            </>
          )}
        />
      </Table>
    </div>
  );
};

export default Bookings;
