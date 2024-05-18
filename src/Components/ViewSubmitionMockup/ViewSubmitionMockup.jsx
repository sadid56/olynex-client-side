import { useLoaderData, useNavigate } from "react-router-dom";
import useAllUser from "../../hooks/useAllUser";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";
import ApplicationVIew from "../ApplicationVIew/ApplicationVIew";
import { MdClose, MdDone } from "react-icons/md";

const ViewSubmitionMockup = () => {
    const task = useLoaderData();
    const [allUser] = useAllUser();
    const navigate = useNavigate();
    const useAxios = useAxiosPublic();
    // filter CEO
    const findCEO = allUser?.find((user) => user?.role === "seo");
    const { _id } = task;
    const handleSend = async () => {
        const sendInfo = {
          seoInfo: {
            seoId: findCEO?._id,
            date: new Date(),
          },
          SeoStatus:"send"
        };
        try {
          const res = await useAxios.patch(`/send-seo/${_id}`, sendInfo);
          if (res.data?.acknowledged) {
            // SEO notification
            const notificationInfo = {
              receiverId: findCEO?._id,
              senderId: task?.mockupInfo?.mockupId,
              date: new Date(),
              text: "SEO send you task",
              count: 1,
              status: "Unread",
            };
            // employe notification
            const notificationInfo2 = {
              receiverId: task?.receiverId,
              senderId: task?.bossInfo?.bossId,
              date: new Date(),
              text: "SEO accept your task",
              count: 1,
              status: "Unread",
            };
            // send a notification
            const respons = await useAxios.post("/notifications", notificationInfo);
            const respons2 = await useAxios.post(
              "/notifications",
              notificationInfo2
            );
            console.log(respons.data && respons2.data);
            if (respons.data) {
              toast.success("Task sended in SEO!");
              navigate(-1);
            }
          }
        } catch (err) {
          toast.error(err.message);
        }
      };
 // handle reject
 const handlReject = async () => {
    const updateDoc = {
      CoStatus: "accept",
      BossStatus:"cencel",
      MockupStatus:"cencel"
    };
    try {
      const res = await useAxios.patch(`/reject-mockup/${_id}`, updateDoc);
      if (res.data?.acknowledged) {
        const notificationInfo = {
          receiverId: task?.receiverId,
          senderId: findCEO?._id,
          date: new Date(),
          text: "SEO reject your submition",
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
        <ApplicationVIew task={task} title={"Mockup"} />
        {/* action */}
        <div className="flex items-center gap-3">
          {/* acceptet then disabled other wise accept */}

          {
            //     bossInfo?.bossStatus === "pending" ? <>
            //     <button disabled  className="btn bg-primary hover:bg-blue-500 disabled text-white">
            //       <MdDone /> Accepted
            //     </button>
            //     <button disabled className="btn btn-error disabled text-white">
            //       <MdClose /> Reject
            //     </button>
            //   </> :
            <>
              <button
                onClick={handleSend}
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
          }
        </div>
      </div>
    </div>
    );
};

export default ViewSubmitionMockup;