/* eslint-disable react/no-unknown-property */
import { CiLogout } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineDevicesOther } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useNotification from "../../hooks/useNotification";
import Notification from "./Notification";
import useSingleUser from "../../hooks/useSingleUser";

const Navber = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const [singleUser] = useSingleUser();
  const [notifications, refetch, isLoading] = useNotification();
  // filter a user wise notification
  const filterNotification = notifications?.filter(
    (notification) => notification?.receiverId === singleUser?._id
  );

  // reduce a notification length
  const notificationCount = filterNotification?.reduce(
    (pre, current) => pre + current?.count,
    0
  );
  //  logout user
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="navbar p-0  flex items-center justify-end ">
      {/* navber right side content */}
      <div className="flex items-center gap-0 md:gap-6 mr-0 md:mr-5">
        {/* notifications */}
        <div className="dropdown dropdown-end dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="btn text-xl bg-transparent text-white border-0 hover:bg-gray-600 m-1"
          >
            <IoIosNotifications />
            <div className="badge badge-secondary">{notificationCount}</div>
          </div>
          <div
            style={{ boxShadow: "0px 0px 30px gray" }}
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md md:w-80 w-52 "
          >
            <div className="overflow-y-auto h-[50vh] md:h-[80vh] flex flex-col gap-2">
              {filterNotification?.length === 0 ? (
                <p className="text-red-500 text-center text-xl font-medium">No notification!</p>
              ) : (
                filterNotification?.map((notification) => (
                  <Notification
                    key={notification?._id}
                    notification={notification}
                    refetch={refetch}
                    isLoading={isLoading}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {/* avatar */}
        <ul className="menu menu-horizontal relative">
          <li className="text-white">
            <details>
              <summary>
                <div className="avatar">
                  <div className="w-8 rounded-full border border-primary">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <span>{user?.displayName}</span>
              </summary>

              {/* drodown item */}
              <ul className="p-4 absolute right-0  w-40 bg-gray-300 rounded shadow-lg flex flex-col gap-3">
                <button onClick={handleLogOut} className="btn text-xl">
                  <CiLogout className="text-red-600" /> Logout
                </button>
                <button className="btn text-xl">
                  <MdOutlineDevicesOther /> Others
                </button>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navber;
