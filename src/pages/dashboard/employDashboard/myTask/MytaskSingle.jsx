/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import TaskSubmit from "../../../../Components/taskSubmit/TaskSubmit";

const MytaskSingle = ({ task, i, refetch }) => {
  const navigate = useNavigate();
  const { taskCategory, sendingDate, taskCreator, CoSendStatus } = task;

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
        {(CoSendStatus === "pending" && (
          <button className="btn btn-info text-white">
            <span className="loading loading-spinner text-white"></span>
          </button>
        )) ||
          (CoSendStatus === "accept" && (
            <TaskSubmit task={task} refetch={refetch} />
          )) ||
          (CoSendStatus === "reject" && (
            <button disabled className="btn btn-info text-white disabled">
              Rejected
            </button>
          )) ||
          (CoSendStatus === "submit" && (
            <button disabled className="btn btn-info text-white disabled">
              Submited
            </button>
          ))
          }
      </td>
    </tr>
  );
};

export default MytaskSingle;
