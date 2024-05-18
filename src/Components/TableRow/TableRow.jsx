/* eslint-disable react/prop-types */

import { FaEye } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TableRow = ({ task, i, handleSend, viewURL }) => {
  const navigate = useNavigate();
  const { taskCategory, taskCreatedAt, taskCreator, BossStatus, CoStatus, MockupStatus } = task;
  return (
    <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
      <th className="border-r border-gray-200">{i + 1}</th>
      <td className="border-r border-gray-200">{taskCategory}</td>
      <td className="border-r border-gray-200">
        {taskCreatedAt?.slice(0, 10)}
      </td>
      <td className="border-r border-gray-200 text-primary">
        {taskCreator?.creatorName}
      </td>
      <td>
        <button
          onClick={() => navigate(`/${viewURL}/${task?._id}`)}
          className="btn btn-info text-white"
        >
          View <FaEye />
        </button>
      </td>
      <td>
        {(BossStatus === "pending" || MockupStatus === "pending" && (
          <p className="text-lg text-primary font-medium">Pending...</p>
        )) ||
          (BossStatus === "clear" && (
            <button onClick={handleSend} className="btn btn-info text-white">
              Complete
            </button>
          )) ||
          (CoStatus === "completed"  && (
            <button className=" text-green-600 text-lg font-semibold flex items-center gap-1">
              Completed <MdOutlineDone className="text-xl" />
            </button>
          )) ||
          (BossStatus === "send" || MockupStatus === "send" && (
            <button className="btn-info btn text-white text-lg font-semibold cursor-default">
              Accepted
            </button>
          )) ||
          (BossStatus === "cencel" || MockupStatus === "cencel" && (
            <button className="btn-info btn text-white font-semibold cursor-default">
              Wait for recent
            </button>
          ))
          
          }
      </td>
    </tr>
  );
};

export default TableRow;
