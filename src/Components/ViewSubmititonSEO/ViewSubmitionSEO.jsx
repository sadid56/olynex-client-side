import { useLoaderData, useNavigate } from "react-router-dom";
import useAllUser from "../../hooks/useAllUser";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";
import ApplicationVIew from "../ApplicationVIew/ApplicationVIew";
import { MdClose, MdDone } from "react-icons/md";

// Utility function to create notification data
const createNotification = (receiverId, senderId, text) => ({
  receiverId,
  senderId,
  date: new Date(),
  text,
  count: 1,
  status: "Unread",
});

const ViewSubmitionSEO = () => {
  const task = useLoaderData();
  const [allUser] = useAllUser();
  const navigate = useNavigate();
  const useAxios = useAxiosPublic();

  const findBoss = allUser?.find((user) => user?.role === "boss");
  const { _id, BossStatus } = task;

  const handleSend = async () => {
    const sendInfo = { BossStatus: "clear" };
    try {
      const res = await useAxios.patch(`/seo-boss/${_id}`, sendInfo);
      if (res.data?.acknowledged) {
        const notificationInfo = createNotification(
          findBoss?._id,
          task?.seoInfo?.seoId,
          "SEO completed a task"
        );
        // employee notification
        const notificationInfo2 = createNotification(
          task?.receiverId,
          task?.seoInfo?.seoId,
          "SEO completed your task"
        );

        const [response1, response2] = await Promise.all([
          useAxios.post("/notifications", notificationInfo),
          useAxios.post("/notifications", notificationInfo2),
        ]);

        if (response1.data && response2.data) {
          toast.success("Task sent to BOSS!");
          navigate(-1);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // reject
  const handleReject = async () => {
    const updateDoc = {
      CoStatus: "accept",
      BossStatus: "cencel",
      MockupStatus: "cencel",
      SeoStatus: "cencel",
    };
    try {
      const res = await useAxios.patch(`/reject-seo/${_id}`, updateDoc);
      if (res.data?.acknowledged) {
        const notificationInfo = createNotification(
          task?.receiverId,
          task?.seoInfo?.seoId,
          "SEO rejected your submission"
        );

        const response = await useAxios.post(
          "/notifications",
          notificationInfo
        );
        if (response.data) {
          toast.success("Rejected!");
          navigate(-1);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center mt-3 justify-center">
      <div
        style={{ boxShadow: "0px 0px 30px gray" }}
        className="space-y-2 p-6 rounded-md"
      >
        <ApplicationVIew task={task} title={"SEO"} />
        {/* action */}
        <div className="flex items-center gap-3">
          {BossStatus === "cencel" ||
          BossStatus === "completed" ||
          BossStatus === "clear" ? (
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
                onClick={handleReject}
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

export default ViewSubmitionSEO;
