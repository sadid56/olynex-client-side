/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import TaskSend from "../../../../Components/taskSend/TaskSend";
import { MdOutlineDone } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

const Task = ({ task, isLoading, i, refetch }) => {
  const navigate = useNavigate();
  const {
    taskTitle,
    taskCategory,
    taskCreatedAt,
    taskCreator,
    CoStatus,
    _id,
  } = task;
  if (isLoading) {
    return <p className="text-center">loadiing...</p>;
  }
  return (
    <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
      <th className="border-r border-gray-200">{i + 1}</th>
      <td className="border-r border-gray-200">{taskTitle}</td>
      <td className="border-r border-gray-200">{taskCategory}</td>
      <td className="border-r border-gray-200">
        {taskCreatedAt?.slice(0, 10)}
      </td>
      <td className="border-r border-gray-200 text-primary">
        {taskCreator?.creatorName}
      </td>
      <td>
        {/* sending  status wise btn */}
        {(CoStatus === "pending" && (
          <button className="btn btn-info cursor-default text-white">
            Pending<span className="loading loading-sm loading-spinner text-white"></span>
          </button>
        )) ||
          (CoStatus === "accept" && (
            <button className="btn btn-info cursor-wait text-white">
              Wait for submition <IoMdTime />
            </button>
          )) ||
          (CoStatus === "create" && (
            <TaskSend task={task} refetch={refetch} />
          )) ||
          (CoStatus === "reject" && (
            <button disabled className="btn btn-info text-white disabled">
              Rejected
            </button>
          )) ||
          (CoStatus === "submit" && (
            <button
              onClick={() => navigate(`/dashboard/all-task/${_id}`)}
              className="btn btn-info text-white"
            >
              View Submition
            </button>
          )) ||
          (CoStatus === "completed" && (
            <button className=" text-green-600 text-lg font-semibold flex items-center gap-1">
              Completed <MdOutlineDone className="text-xl" />
            </button>
          ))}
      </td>
    </tr>
  );
};

export default Task;
