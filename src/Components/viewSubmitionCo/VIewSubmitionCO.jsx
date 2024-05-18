import { MdClose, MdDone } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";
import ApplicationVIew from "../ApplicationVIew/ApplicationVIew";
import useAllUser from "../../hooks/useAllUser";

const VIewSubmitionCO = () => {
  const task = useLoaderData();
  const [allUser] = useAllUser();
  const navigate = useNavigate();
  const useAxios = useAxiosPublic();
  const { _id, BossStatus, MockupStatus, SeoStatus } = task;
  // filter boss
  const filterBoss = allUser?.find((user) => user?.role === "boss");
  // handle send in BOSS
  const handleSend = async () => {
    const sendInfo = {
      bossInfo: {
        bossId: filterBoss?._id,
        date: new Date(),
      },
      BossStatus: "send",
    };
    try {
      const res = await useAxios.patch(`/send-boss/${_id}`, sendInfo);
      if (res.data?.acknowledged) {
        // boss notification
        const notificationInfo = {
          receiverId: filterBoss?._id,
          senderId: task?.senderId,
          date: new Date(),
          text: "CO send you task",
          count: 1,
          status: "Unread",
        };
        // employe notification
        const notificationInfo2 = {
          receiverId: task?.receiverId,
          senderId: task?.senderId,
          date: new Date(),
          text: "CO accept your task",
          count: 1,
          status: "Unread",
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        const respons2 = await useAxios.post(
          "/notifications",
          notificationInfo2
        );
        if (respons.data && respons2.data) {
          toast.success("Task sended in BOSS!");
          navigate(-1);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // handle reject
  const handlReject = async () => {
    const updateDoc = {
      CoStatus: "accept",
    };
    try {
      const res = await useAxios.patch(`/task-status/${_id}`, updateDoc);
      if (res.data?.acknowledged) {
        const notificationInfo = {
          receiverId: task?.receiverId,
          senderId: task?.senderId,
          date: new Date(),
          text: "CO reject your submition",
          count: 1,
          status: "Unread",
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        if (respons.data) {
          toast.success("Rejected!");
          navigate(-1);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex items-center  mt-3 justify-center">
      <div
        style={{ boxShadow: "0px 0px 30px gray" }}
        className="space-y-2 p-6 rounded-md"
      >
        <ApplicationVIew task={task} title={"CO-Ordinetor"} />
        {/* action */}
        <div className="flex items-center gap-3">
          {/* acceptet then disabled other wise accept */}

          {BossStatus === "send" ||
          BossStatus === "cencel" &&
          !MockupStatus === "pending" ||
          !SeoStatus === "pending"
          ? (
            <>
              <button
                disabled
                className="btn bg-primary hover:bg-blue-500 disabled text-white"
              >
                <MdDone /> Accepted
              </button>
              <button disabled className="btn btn-error disabled text-white">
                <MdClose /> Reject
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSend}
                className="btn bg-primary hover:bg-blue-500 text-white"
              >
                <MdDone /> Accept
              </button>
              <button
                onClick={handlReject}
                className="btn btn-error text-white"
              >
                <MdClose /> Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VIewSubmitionCO;
