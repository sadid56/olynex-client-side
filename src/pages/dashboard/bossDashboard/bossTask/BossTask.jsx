/* eslint-disable react/prop-types */
import useAllUser from "../../../../hooks/useAllUser";
import useAxiosPublic from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import TableRow from "../../../../Components/TableRow/TableRow";

const BossTask = ({ task, isLoading, i, refetch }) => {
  const { _id } = task;
  const [allUser] = useAllUser();
  const useAxios = useAxiosPublic();
  // filter Mockup
  const filterBoss = allUser?.find((user) => user?.role === "boss");
  const filterMockup = allUser?.find((user) => user?.role === "mockup");
  const filterSEO = allUser?.find((user) => user?.role === "seo");
  const handleSend = async () => {
    const sendInfo = {
      bossInfo: {
        bossId: filterBoss?._id,
        bossStatus: "completed",
        Data: new Date(),
      },
      mockupInfo: {
        mockupId: filterMockup?._id,
        mockupStatus: "completed",
        Data: new Date(),
      },
      seoInfo: {
        seoId: filterSEO?._id,
        seoStatus: "completed",
        Data: new Date(),
      },
      CoSendStatus: "completed",
    };
    try {
      const res = await useAxios.patch(`/complete-task/${_id}`, sendInfo);
      if (res.data?.acknowledged) {
        // employe notification
        const notificationInfo = {
          receiverId: task?.receiverId,
          senderId: task?.bossInfo?.bossId,
          date: new Date(),
          text: "Congrats BOSS completed your task!",
          count: 1,
          status: "Unread",
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        console.log(respons.data);
        if (respons.data) {
          toast.success("Task completet success!");
          refetch();
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (isLoading) {
    return <p className="text-center">loadiing...</p>;
  }
  return <TableRow task={task} i={i} handleSend={handleSend} viewURL={"dashboard/all-task-boss"} />;
};

export default BossTask;
