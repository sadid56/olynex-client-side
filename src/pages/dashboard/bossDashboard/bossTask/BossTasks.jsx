import TableHeader from "../../../../Components/TableHeader/TableHeader";
import useAllUser from "../../../../hooks/useAllUser";
import useTasks from "../../../../hooks/useTasks";
import BossTask from "./BossTask";


const BossTasks = () => {
    const [tasks, refetch] = useTasks();
    const [allUser] = useAllUser();
    // find a boss role
    const findboss = allUser?.find((user) => user?.role === "boss");
    // filter task with boss role
    const filterTask = tasks?.filter(task => task?.bossInfo?.bossId === findboss?._id )
    return (
        <div className="m-3">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-semibold border-b border-primary w-fit">
          Review <span className="text-primary">Tasks:</span>
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
            <TableHeader/>
            <tbody>
              {/* row 1 */}
              {filterTask?.map((task, i) => (
                <BossTask
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

export default BossTasks;