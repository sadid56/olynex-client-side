import { MdCreate } from "react-icons/md";
import useTasks from "../../../../hooks/useTasks";
import Task from "./task";
import { useNavigate } from "react-router-dom";

const AllTask = () => {
  const [tasks, refetch, isLoading] = useTasks();
  const navigate = useNavigate()

  return (
    <div className="m-3">
        <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-semibold border-b border-primary w-fit">All <span className="text-primary">Tasks:</span></h2>
            <button onClick={()=>navigate("/dashboard/create-task")} className="btn bg-primary hover:bg-blue-500 text-white">Create Task <MdCreate/></button>
        </div>
      <div className="overflow-x-auto  rounded-md mt-5">
        <table className="table">
          {/* head */}
          <thead className="bg-primary text-slate-700 py-3 text-lg font-medium">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Created date</th>
              <th>Creator name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {tasks?.map((task, i) => (
              <Task key={task?._id} task={task} i={i} isLoading={isLoading} refetch={refetch}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTask;
