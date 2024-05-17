/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import useAllUser from "../../hooks/useAllUser";
import { IoReturnUpBackOutline } from "react-icons/io5";

const ApplicationVIew = ({task, title}) => {
    const [allUser] = useAllUser();
    const navigate = useNavigate();
    const {
        taskTitle,
        taskCategory,
        taskResours,
        taskDescription,
        taskCreator,
        sendingDate,
        CoSendStatus,
        submitDate,
        submitNote,
        submitURl,
        receiverId,
      } = task;
      const submitedUser = allUser?.find((user) => user?._id === receiverId);
    return (
        <div className="space-y-2">
            <h3 className="text-center text-2xl font-semibold border-b border-primary">
     <span className="text-primary">{title}</span> review
        </h3>
        <div className="w-full flex  justify-end">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-circle text-xl bg-primary text-white"
          >
            <IoReturnUpBackOutline />
          </button>
        </div>
        <h2 className="text-2xl font-semibold">
          Title: <span className="text-primary">{taskTitle},</span>
        </h2>
        <h3 className="text-xl font-semibold">Category: {taskCategory},</h3>
        <h3 className="text-xl font-bold">
          Creator:
          <span className="text-primary">{taskCreator?.creatorName},</span>
        </h3>
        <h3 className="text-xl font-bold">
          Submited user:
          <span className="text-primary">{submitedUser?.name},</span>
        </h3>
        <h5 className="text-lg font-medium">
          Task send: {sendingDate?.slice(0, 10)},
        </h5>
        <h5 className="text-lg font-medium">
          Submit: {submitDate?.slice(0, 10)},
        </h5>
        <p className="text-lg font-medium">
          Task Resours:{" "}
          <Link className="link" to={taskResours} target="_blank">
            {taskResours}
          </Link>
        </p>
        <p className="text-lg font-medium">
          Submition Link:{" "}
          <Link className="link" to={submitURl} target="_blank">
            {submitURl}
          </Link>
        </p>
        <p>Submit Note: {submitNote}</p>
        <p className="text-gray-600">Description: {taskDescription}</p>
        <p>Status: {CoSendStatus}</p>
        </div>
    );
};

export default ApplicationVIew;