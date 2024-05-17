/* eslint-disable react/prop-types */

import { FaEye } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const TableRow = ({task, i, handleSend, viewURL}) => {
    const navigate = useNavigate();
    const {
        taskCategory,
        taskCreatedAt,
        taskCreator,
        bossInfo,
        CoSendStatus,
      } = task;
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
        {(bossInfo?.bossStatus === "pending" && <p className="text-lg text-primary font-medium">Pending...</p>) ||
          (bossInfo?.bossStatus === "pending" && (
            <button onClick={handleSend} className="btn btn-info text-white">
              Complete
            </button>
          )) ||
          (CoSendStatus === "completed" && (
            <button className=" text-green-600 text-lg font-semibold flex items-center gap-1">Completed <MdOutlineDone className="text-xl"/></button>
          ))}
      </td>
    </tr>
    );
};

export default TableRow;