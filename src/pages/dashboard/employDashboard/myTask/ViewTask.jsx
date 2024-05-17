import toast from "react-hot-toast";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdClose, MdDone } from "react-icons/md";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxios";
import { useEffect, useState } from "react";

const ViewTask = () => {
  const task = useLoaderData();
  const navigate = useNavigate();
  const useAxios = useAxiosPublic();
  const [elapsedTime, setElapsedTime] = useState(null);
  const {
    taskTitle,
    taskCategory,
    taskResours,
    taskDescription,
    taskCreator,
    sendingDate,
    CoSendStatus,
    senderId,
    receiverId,
  } = task;

  // set timer with accepted task
  useEffect(() => {
    let timer;
    if (CoSendStatus === "accept") {
      timer = setInterval(() => {
        const now = new Date();
        const startTime = new Date(sendingDate);
        const diff = now - startTime;
        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);

        setElapsedTime({ days, hours, minutes, seconds });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [CoSendStatus, sendingDate]);
  // accept  handler
  const handleAccept = async () => {
    const updateStatus = {
      CoSendStatus: "accept",
    };
    try {
      const res = await useAxios.patch(
        `/task-status/${task?._id}`,
        updateStatus
      );
      // send a notification
      if (res.data?.acknowledged) {
        const notificationInfo = {
          receiverId: senderId,
          senderId: receiverId,
          date: new Date(),
          text: "Accepted your task",
          count: 1,
          status:"Unread"
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        if (respons.data) {
          toast.success("Accepted!");
          navigate(-1);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  // reject a task
  const handlReject = async () => {
    const updateStatus = {
      CoSendStatus: "reject",
    };
    try {
      const res = await useAxios.patch(
        `/task-status/${task?._id}`,
        updateStatus
      );
      if (res.data?.acknowledged) {
        const notificationInfo = {
          receiverId: receiverId,
          senderId: senderId,
          date: new Date(),
          text: "rejected your task",
          count: 1,
          status:"Unread"
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        if (respons.data) {
          toast.success("Rejected!");
          navigate(-1);
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <div className="flex items-center  mt-10 justify-center">
      <div
        style={{ boxShadow: "0px 0px 30px gray" }}
        className="space-y-3 p-6 rounded-md"
      >
        {/* back */}
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
          Creator:{" "}
          <span className="text-primary">{taskCreator?.creatorName},</span>
        </h3>
        <h5 className="text-lg font-medium">
          Sending date: {sendingDate.slice(0, 10)},
        </h5>
        <p className="text-lg font-medium">
          Task Resours:{" "}
          <Link className="link" to={taskResours} target="_blank">
            {taskResours}
          </Link>
        </p>
        {CoSendStatus === "accept" && elapsedTime && (
          <h3 className="text-lg font-medium">
            Accepted Time: {elapsedTime.days}d {elapsedTime.hours}h{" "}
            {elapsedTime.minutes}m {elapsedTime.seconds}s
          </h3>
        )}
        <p className="text-gray-600">Description: {taskDescription}</p>
        <p>Status: {CoSendStatus}</p>
        {/* action */}
        <div className="flex items-center gap-3">
          {/* acceptet then disabled other wise accept */}
          {CoSendStatus === "accept" ||
          CoSendStatus === "reject" ||
          CoSendStatus === "submit" ? (
            <>
              <button disabled className="btn bg-gray-400 disabled text-white">
                <MdDone /> Accepted
              </button>
              <button disabled className="btn bg-gray-400 text-white">
                <MdClose /> Reject
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAccept}
                className="btn bg-primary hover:bg-blue-500 text-white"
              >
                <MdDone /> Accept
              </button>
              <button
                onClick={handlReject}
                className="btn btn-error text-white"
              >
                <MdClose /> Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
