/* eslint-disable react/prop-types */
import useAxiosPublic from "../../../../hooks/useAxios";
import toast from "react-hot-toast";
import TableRow from "../../../../Components/TableRow/TableRow";
import { MdOutlineDone } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const BossTask = ({ task, isLoading, i, refetch }) => {
  const { _id, BossStatus , MockupStatus} = task;
  const useAxios = useAxiosPublic();
  const handleSend = async () => {
    const sendInfo = {
      BossStatus: "completed",
      MockupStatus: "completed",
      SeoStatus: "completed",
      CoStatus: "completed",
      finisehdAt: new Date()
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
  return (
    <>
    <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
      
      <TableRow task={task} i={i} viewURL={"dashboard/all-task-boss"} />
      
      {/* table action */}

      <td>
      {
        BossStatus === "send" && MockupStatus === "pending" || BossStatus === "send" && MockupStatus === "cencel" && <p className="text-primary flex items-center gap-1">Pending <span className="loading loading-xs loading-spinner text-info"></span></p>  
      ||
        BossStatus === "send" && MockupStatus === "send" && <p className="text-primary flex items-center gap-1">Accepted <MdOutlineDone className="text-xl"/></p>  
      ||
        BossStatus === "clear" && <button onClick={handleSend} className="btn btn-info text-white">
        Complete
      </button>
      ||
        BossStatus === "cencel" && <button className="btn-info btn text-white font-semibold cursor-default">
        Wait for recent <IoMdTime />
      </button>
     ||
        BossStatus === "completed" && <button className=" text-green-600 text-lg font-semibold flex items-center gap-1">
        Completed <MdOutlineDone className="text-xl" />
      </button>
      }
      </td>
    </tr>
      
    </>
  );
};

export default BossTask;
