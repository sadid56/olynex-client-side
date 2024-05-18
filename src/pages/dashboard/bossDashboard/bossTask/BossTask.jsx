/* eslint-disable react/prop-types */
import useAxiosPublic from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import TableRow from "../../../../Components/TableRow/TableRow";

const BossTask = ({ task, isLoading, i, refetch }) => {
  const { _id } = task;
  const useAxios = useAxiosPublic();
  const handleSend = async () => {
    const sendInfo = {
      BossStatus:"completed",
      MockupStatus:"completed",
      SeoStatus:"completed",
      CoStatus: "completed",
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
