/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import TaskSubmit from "../../../../Components/taskSubmit/TaskSubmit";
import { MdOutlineDone } from "react-icons/md";
import { BiTask } from "react-icons/bi";

const MytaskSingle = ({ task, i, refetch }) => {
  const navigate = useNavigate();
  const { taskCategory, sendingDate, taskCreator, CoStatus } = task;

  return (
    <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
      <th className="border-r border-gray-200">{i + 1}</th>
      <td className="border-r border-gray-200">{taskCategory}</td>
      <td className="border-r border-gray-200">{sendingDate?.slice(0, 10)}</td>
      <td className="border-r border-gray-200">{taskCreator?.creatorName}</td>
      <td className="border-r border-gray-200">
        <button
          onClick={() => navigate(`/dashboard/my-task/${task?._id}`)}
          className="btn btn-outline btn-info"
        >
          View
        </button>
      </td>
      <td>
        {(CoStatus === "pending" && (
          <button className="btn btn-info cursor-default text-white">
            You got a task <BiTask/>
          </button>
        )) ||
          (CoStatus === "accept" && (
            <TaskSubmit task={task} refetch={refetch} />
          )) ||
          (CoStatus === "reject" && (
            <button disabled className="btn btn-info text-white disabled">
              Rejected
            </button>
          )) ||
          (CoStatus === "submit" && (
            <button disabled className="btn btn-info text-white disabled">
              Submited
            </button>
          )) ||
          CoStatus === "completed" && <button className=" text-green-600 text-lg font-semibold flex items-center gap-1">Completed <MdOutlineDone className="text-xl"/></button>
          }
      </td>
    </tr>
  );
};

export default MytaskSingle;
