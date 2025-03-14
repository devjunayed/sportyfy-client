import { CloseCircleFilled } from "@ant-design/icons";
import { currentUser } from "../../redux/features/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserQuery } from "../../redux/api/auth/authApi";
import { TUser } from "../../types/shared.type";
import { useDispatch } from "react-redux";
import { closeGreetings } from "../../redux/features/dashboardSlice";

const UserDashboard = () => {
  const user = useAppSelector(currentUser);
  const greetings = useAppSelector((state) => state.dashboard.greetings);
  const dispatch = useDispatch();
  const { data: userData } = useGetUserQuery(
    user ? `${(user as TUser).email}` : ""
  );

  const handleGreeting = () => {
    dispatch(closeGreetings());
  };
  return (
    <div className="mt-20">
      <div
        className={`${
          !greetings && "hidden"
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

export default UserDashboard;
