import { MdCreate } from "react-icons/md";
import useTasks from "../../../../hooks/useTasks";
import Task from "./task";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const AllTask = () => {
  const [filterValue, setFilterValue] = useState("all");
  const [tasks, refetch, isLoading] = useTasks(filterValue);
  const [realTask, setRealTask] = useState([]);
  const navigate = useNavigate();

  // refetch the page
  useEffect(() => {
    if (filterValue === "all") {
      setRealTask(tasks);
    } else {
      const filteredTasks = tasks?.filter(task => task?.CoStatus === filterValue);
      setRealTask(filteredTasks);
    }
  }, [tasks, filterValue]);

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="m-3">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-primary w-fit">
          All <span className="text-primary">Tasks:</span>
        </h2>
        <div className="flex items-center gap-2">
          {/* filter in co task status */}
          <select onChange={handleFilter} value={filterValue} className="select select-ghost w-full max-w-xs border border-gray-300">
            <option disabled value="">
              Filter
            </option>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="accept">Accept</option>
            <option value="reject">Rejected</option>
          </select>
          {/* task create button */}
          <button
            onClick={() => navigate("/dashboard/create-task")}
            className="btn bg-primary hover:bg-blue-500 text-white"
          >
            Create Task <MdCreate />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md mt-5">
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
            {realTask?.map((task, i) => (
              <Task
                key={task?._id}
                task={task}
                i={i}
                isLoading={isLoading}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTask;
