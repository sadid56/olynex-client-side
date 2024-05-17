/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import TaskSend from "../../../../Components/taskSend/TaskSend";

const TaskRivewBoss = ({task, isLoading, i, refetch }) => {
    const navigate = useNavigate()
  const { taskTitle, taskCategory, taskCreatedAt, taskCreator, CoSendStatus, _id } =
    task;
  if (isLoading) {
    return <p className="text-center">loadiing...</p>;
  }
    return (
        <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
      <th className="border-r border-gray-200">{i + 1}</th>
      <td className="border-r border-gray-200">{taskTitle}</td>
      <td className="border-r border-gray-200">{taskCategory}</td>
      <td className="border-r border-gray-200">{taskCreatedAt?.slice(0, 10)}</td>
      <td className="border-r border-gray-200 text-primary">
        {taskCreator?.creatorName}
      </td>
      <td>
        {/* sending  status wise btn */}
        {(CoSendStatus === "pending" && (
          <button className="btn btn-info text-white">
            <span className="loading loading-spinner text-white"></span>
          </button>
        )) ||
        CoSendStatus === "accept" && (
          <button className="btn btn-info text-white">Wait for submition</button>
        )|| 
        CoSendStatus === "create" && (
            <TaskSend task={task} refetch={refetch} />
          )
          ||
          (CoSendStatus === "reject" && (
            <button disabled className="btn btn-info text-white disabled">
              Rejected
            </button>
          )) ||
          (CoSendStatus === "submit" && (
            <button onClick={()=>navigate(`/dashboard/all-task/${_id}`)} className="btn btn-info text-white">
              View Submition
            </button>
          ))
          }
      </td>
    </tr>
    );
};

export default TaskRivewBoss;