import { useGetFacilitiesQuery } from "../../redux/api/dashboard/facilityApi"

const ManageFacility = () => {
    const {data: facilities} = useGetFacilitiesQuery("");
    console.log(facilities);
  return (
    <div>
        {facilities?.length === 0 || !facilities && <div className="flex min-h-screen items-center justify-center text-red-700 text-xl">No Facilities found</div>}
    </div>
  )
}

export default ManageFacility
