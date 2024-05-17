/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdClose } from "react-icons/md";
import Modal from "react-modal";
import useAxiosPublic from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
const TaskSubmit = ({ task, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const useAxios = useAxiosPublic();

  // modal style
  const customStyles = {
    content: {
      top: "50%",
      width: "500px",
      height: "300px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // modal open
  function openModal() {
    setIsOpen(true);
  }
  // modal close
  function closeModal() {
    setIsOpen(false);
  }

  //   handle send task in employee
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Task post handler
  const onSubmit = async (data) => {
    // Task info
    const taskInfo = {
      submitURl: data?.file,
      submitNote: data?.note || "",
      submitDate: new Date(),
      CoSendStatus: "submit",
    };
    try {
      const res = await useAxios.patch(`/submit-task/${task?._id}`, taskInfo);
      if (res.data) {
        const notificationInfo = {
          receiverId: task?.senderId,
          senderId: task?.receiverId,
          date: new Date(),
          text: "Task submited",
          count: 1,
          status:"Unread"
        };
        // send a notification
        const respons = await useAxios.post("/notifications", notificationInfo);
        if (respons.data) {
          toast.success("Task Submited!");
          closeModal();
          refetch();
          reset();
        }
      }
    } catch (err) {
      console.error("Task submit error:", err.message);
      toast.error("Task creation failed");
    }
  };
  return (
    <>
      <button onClick={openModal} className="btn btn-info text-white">
        Submit <IoIosSend />
      </button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button
          className="btn btn-circle text-xl text-red-500 absolute right-1 top-0"
          onClick={closeModal}
        >
          <MdClose />
        </button>
        {/* modal content */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Note</span>
              </label>
              <input
                {...register("note")}
                type="text"
                placeholder="Any submit note [optional]"
                className="input input-bordered"
              />

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Submit url</span>
                </label>

                <input
                  {...register("file", { required: true })}
                  type="url"
                  placeholder="Ender a resours URL like github, figma"
                  className="input input-bordered"
                />
                {errors.file && (
                  <span className="text-red-600">This field is required</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-primary hover:bg-blue-600 text-white text-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default TaskSubmit;
