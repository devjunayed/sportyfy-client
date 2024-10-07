/* eslint-disable react-hooks/exhaustive-deps */
import { CloseCircleFilled } from "@ant-design/icons";
import { currentUser } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../redux/api/auth/authApi";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { ErrorResponse, TUser } from "../../types/shared.type";



const AdminDashboard = () => {
  const user = useAppSelector(currentUser);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState(true);
  const { data: userData, error } = useGetUserQuery(
    user ? `${(user as TUser).email}` : ""
  );

 

  useEffect(() => {
    if (error) {

      const errorMessage = (error as ErrorResponse)?.data?.message || "An unknown error occurred";
      messageApi.open({
        type: "error",
        content: errorMessage,
      }).then(()=> {
        navigate("/login")
      });
    }
  }, [error]);

  const handleGreeting = () => {
    setGreeting(!greeting);
  };
  return (
    <div>
      {contextHolder}
      <div
        className={`${
          !greeting && "hidden"
        } bg-[#1B1F3B] flex justify-between p-4 text-center text-white mt-4`}
      >
        <div>Welcome {userData?.data?.name}, what you are upto.</div>
        <button onClick={handleGreeting}>
          <CloseCircleFilled />
        </button>
      </div>
      <div className="flex gap-4 flex-wrap justify-center text-center mt-4">
        <div className="shadow-xl border-t-[#1B1F3B] border-t-4 py-20 min-w-48 rounded-xl">
          Total Users
        </div>
        <div className="shadow-xl border-t-[#1B1F3B] border-t-4 py-20 min-w-48 rounded-xl">
          Total Users
        </div>
        <div className="shadow-xl border-t-[#1B1F3B] border-t-4 py-20 min-w-48 rounded-xl">
          Total Users
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
