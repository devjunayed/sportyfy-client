import Column from "antd/es/table/Column";
import { useGetBookingQuery } from "../../redux/api/booking/bookingApi";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import CancelBooking from "../../components/user/CancelBooking";

const UserBookings = () => {
  const { data: bookings, refetch } = useGetBookingQuery("");
  return (
    <div>
      {bookings?.data?.length === 0 ||
        (!bookings && (
          <div className="flex min-h-screen items-center justify-center text-red-700 text-xl">
            No Bookings found
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
                className={` ${
                  record.isBooked === "confirmed" && "text-green-600"
                } ${
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
        <Column
          title="Actions"
          render={(_, record) => (
            <>
              <Link to={`/facility/${record.facility._id}`} replace={true}>
                <Button className="text-white">View Details</Button>
              </Link>
              <CancelBooking data={record} refetch={refetch} />
            </>
          )}
        />
      </Table>
    </div>
  );
};

export default UserBookings;
