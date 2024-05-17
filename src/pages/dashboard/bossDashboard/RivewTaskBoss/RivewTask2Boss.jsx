import useTasks from "../../../../hooks/useTasks";
import TaskRivewBoss from "./TaskRivewBoss";

const RivewTasksBoss = () => {
    const [tasks, refetch] = useTasks();
    return (
        <div className="m-3">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold border-b border-primary w-fit">
            All <span className="text-primary">Tasks:</span>
          </h2>
          <input
            type="text"
            placeholder="Search task.."
            className="px-4 py-2 outline-none focus:outline-none border border-gray-300 focus:border-gray-400 rounded"
          />
        </div>
        <div className="overflow-x-auto  rounded-md mt-5">
          <table className="table">
            {/* head */}
            <thead className="bg-primary text-slate-700 py-3 text-lg font-medium">
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Sending date</th>
                <th>Sender name</th>
                <th>View task</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {tasks?.map((task, i) => (
                <TaskRivewBoss
                  key={task?._id}
                  task={task}
                  i={i}
                  
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default RivewTasksBoss;