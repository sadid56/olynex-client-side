
import { useForm } from "react-hook-form";
import { MdCreate } from "react-icons/md";
import useAxiosPublic from "../../../../hooks/useAxios";
import useSingleUser from "../../../../hooks/useSingleUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const useAxios = useAxiosPublic();
  const [singleUser] = useSingleUser();
  const navigate = useNavigate();
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
      taskTitle: data.title,
      taskCategory: data.category,
      taskResours: data?.file,
      taskDescription: data.description,
      taskCreatedAt: new Date(),
      CoSendStatus: "create",
      taskCreator: {
        creatorId: singleUser?._id,
        creatorName: singleUser?.name,
        creatorRole: singleUser?.role,
      },
    };

    try {
      const res = await useAxios.post("tasks", taskInfo);
      if (res.data) {
        toast.success("Task created successfully");
        navigate("/dashboard/all-tasks");
        reset();
      }
    } catch (err) {
      console.error("Task submit error:", err.message);
      toast.error("Task creation failed");
    }
  };

  return (
    <div className="mx-10 mt-3">
      {/* Dashboard header */}
      <h2 className="text-2xl font-semibold">
        Create <span className="text-primary">Task:</span>
      </h2>
      <div className="p-3 rounded-md shadow-xl">
        {/* Create task form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Task Title</span>
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Task title"
                className="input input-bordered"
              />
              {errors.title && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select w-full border-gray-300"
                defaultValue=""
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Web-development">Web development</option>
                <option value="Web-design">Web design</option>
                <option value="App-development">App development</option>
              </select>
              {errors.category && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Resource</span>
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
          <div>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Task description"
            ></textarea>
            {errors.description && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <button
            type="submit"
            className="btn bg-primary hover:bg-blue-600 text-white text-xl"
          >
            <MdCreate /> Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
