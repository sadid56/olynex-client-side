/* eslint-disable react/prop-types */

import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TableRow = ({ task, i, viewURL }) => {
  const navigate = useNavigate();
  const { taskCategory, taskCreatedAt, taskCreator} = task;
  return (
    
     <>
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
     </>
    
  );
};

export default TableRow;
