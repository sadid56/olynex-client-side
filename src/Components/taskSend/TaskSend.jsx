/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import useAllUser from "../../hooks/useAllUser";
import useSingleUser from "../../hooks/useSingleUser";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";
const TaskSend = ({ task, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [allUser] = useAllUser();
  const [singleUser] = useSingleUser();
  const useAxios = useAxiosPublic();

  // filter user role with employe
  const filterUser = allUser?.filter((user) => user?.role === "employe");

  // modal open
  function openModal() {
    setIsOpen(true);
  }
  // modal close
  function closeModal() {
    setIsOpen(false);
  }

  // handle send task in employee
  const handleSend = async (selectUser) => {
    const sendInfo = {
      senderId: singleUser?._id,
      receiverId: selectUser?._id,
      CoStatus: "pending",
      sendingDate: new Date(),
    };
    try {
      // send a  task
      const res = await useAxios.patch(`/tasksend/${task?._id}`, sendInfo);
      if (res.data?.acknowledged) {
        const notificationInfo = {
          receiverId: selectUser?._id,
          senderId: singleUser?._id,
          date: new Date(),
          text: "Receved a new task",
          count: 1,
          status: "Unread",
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        console.log(res.data);
        if (respons.data) {
          toast.success("Send success!");
          closeModal();
          refetch();
        }
      }
    } catch (err) {
      toast.error(err?.message);
    }
  };
  return (
    <>
      <button
        onClick={openModal}
        className="btn bg-primary text-white hover:bg-blue-500"
      >
        Send <IoIosSend />
      </button>
      <Modal
        className="w-full md:w-[500px]  top-[30%] md:left-[30%] bg-gray-100 p-3 rounded-md drop-shadow-lg absolute"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button
          className="btn btn-circle btn-sm text-xl text-red-500 absolute right-1 top-0"
          onClick={closeModal}
        >
          <MdClose />
        </button>
        {/* modal content */}
        <div>
          <h3 className="text-center text-3xl font-semibold mt-2">
            All Employee:
          </h3>
          <div className="flex flex-col gap-2">
            {filterUser?.map((user) => (
              <div
                key={user?._id}
                className="w-full flex items-center justify-between mt-10 hover:bg-gray-400 p-1 rounded border"
              >
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user?.photo} />
                    </div>
                  </div>
                  <h2 className="text-lg font-medium">{user?.name}</h2>
                </div>
                <button
                  onClick={() => handleSend(user)}
                  className="btn bg-primary text-white hover:bg-blue-500"
                >
                  Send <IoIosSend />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TaskSend;
