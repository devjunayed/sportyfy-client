import { CloseCircleFilled } from "@ant-design/icons";
import { currentUser } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

const AdminDashboard = () => {
  const user = useAppSelector(currentUser);
  const [greeting, setGreeting] = useState(true);

  const handleGreeting = () => {
    setGreeting(!greeting);
  };
  console.log(user);
  return (
    <div>
      <div
        className={`${
          !greeting && "hidden"
        } bg-[#1B1F3B] flex justify-between p-4 text-center text-white mt-4`}
      >
        <div>Welcome {user.email}, what you are upto.</div>
        <button onClick={handleGreeting}>
          <CloseCircleFilled />
        </button>
      </div>
      <div className="flex gap-4 flex-wrap justify-center text-center mt-4">
        <div className="shadow-xl border-t-[#1B1F3B] border-t-4 py-20 min-w-48 rounded-xl">Total Users</div>
        <div className="shadow-xl border-t-[#1B1F3B] border-t-4 py-20 min-w-48 rounded-xl">Total Users</div>
        <div className="shadow-xl border-t-[#1B1F3B] border-t-4 py-20 min-w-48 rounded-xl">Total Users</div>
      </div>  
    </div>
  );
};

export default AdminDashboard;
