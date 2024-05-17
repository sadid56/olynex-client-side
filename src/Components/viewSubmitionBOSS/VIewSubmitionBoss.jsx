import { useLoaderData, useNavigate } from "react-router-dom";
import ApplicationVIew from "../ApplicationVIew/ApplicationVIew";
import { MdClose, MdDone } from "react-icons/md";
import useAllUser from "../../hooks/useAllUser";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";

const VIewSubmitionBoss = () => {
  const task = useLoaderData();
  const [allUser] = useAllUser();
  const navigate = useNavigate();
  const useAxios = useAxiosPublic();
  // filter Mockup
  const filterMockup = allUser?.find((user) => user?.role === "mockup");
  const { _id } = task;
  const handleSend = async () => {
    const sendInfo = {
      mockupInfo: {
        mockupId: filterMockup?._id,
        mockupStatus: "pending",
        sendData: new Date(),
      },
    };
    try {
      const res = await useAxios.patch(`/send-boss/${_id}`, sendInfo);
      if (res.data?.acknowledged) {
        // boss notification
        const notificationInfo = {
          receiverId: filterMockup?._id,
          senderId: task?.bossInfo?.bossId,
          date: new Date(),
          text: "BOSS send you task",
          count: 1,
          status: "Unread",
        };
        // employe notification
        const notificationInfo2 = {
          receiverId: task?.receiverId,
          senderId: task?.bossInfo?.bossId,
          date: new Date(),
          text: "BOSS accept your task",
          count: 1,
          status: "Unread",
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        const respons2 = await useAxios.post(
          "/notifications",
          notificationInfo2
        );
        console.log(respons.data && respons2.data);
        if (respons.data) {
          toast.success("Task sended in Mockup!");
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
      CoSendStatus: "accept",
    };
    try {
      const res = await useAxios.patch(`/task-status/${_id}`, updateDoc);
      if (res.data?.acknowledged) {
        const notificationInfo = {
          receiverId: task?.receiverId,
          senderId: task?.senderId,
          date: new Date(),
          text: "BOSS reject your submition",
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
        <ApplicationVIew task={task} title={"BOSS"} />
        {/* action */}
        <div className="flex items-center gap-3">
          {/* acceptet then disabled other wise accept */}

          {
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
          }
        </div>
      </div>
    </div>
  );
};

export default VIewSubmitionBoss;
