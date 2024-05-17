import { MdClose, MdDone } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";
import ApplicationVIew from "../ApplicationVIew/ApplicationVIew";

const VIewSubmitionCO = () => {
  const task = useLoaderData();

  const navigate = useNavigate();
  const useAxios = useAxiosPublic();
  const { _id } = task;

  // handle reject
  const handlReject = async () => {
    const updateDoc = {
      CoSendStatus: "pending",
    };
    try {
      const res = await useAxios.patch(`/task-status/${_id}`, updateDoc);
      if (res.data?.acknowledged) {
        const notificationInfo = {
          receiverId: task?.receiverId,
          senderId: task?.senderId,
          date: new Date(),
          text: "CO reject your submition",
          count: 1,
          status: "Unread",
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        if (respons.data) {
          toast.success("Rejected!");
          navigate(-1);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex items-center  mt-3 justify-center">
      <div
        style={{ boxShadow: "0px 0px 30px gray" }}
        className="space-y-2 p-6 rounded-md"
      >
        <ApplicationVIew task={task} title={"CO-Ordinetor"} />
        {/* action */}
        <div className="flex items-center gap-3">
          {/* acceptet then disabled other wise accept */}

          <>
            <button className="btn bg-primary hover:bg-blue-500 text-white">
              <MdDone /> Accept
            </button>
            <button onClick={handlReject} className="btn btn-error text-white">
              <MdClose /> Reject
            </button>
          </>
        </div>
      </div>
    </div>
  );
};

export default VIewSubmitionCO;
