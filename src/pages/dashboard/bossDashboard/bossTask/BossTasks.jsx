import { useEffect, useState } from "react";
import TableHeader from "../../../../Components/TableHeader/TableHeader";
import useAllUser from "../../../../hooks/useAllUser";
import useTasks from "../../../../hooks/useTasks";
import BossTask from "./BossTask";

const BossTasks = () => {
  const [allUser] = useAllUser();
  const [filterValue, setFilterValue] = useState("all");
  const [tasks, refetch] = useTasks(filterValue);
  const [realTask, setRealTask] = useState([]);

  // refetch the page
  useEffect(() => {
    if (filterValue === "all") {
      setRealTask(tasks);
    } else {
      const filteredTasks = tasks?.filter(
        (task) => task?.BossStatus === filterValue
      );
      setRealTask(filteredTasks);
    }
  }, [tasks, filterValue]);

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
  };

  // find a boss role
  const findboss = allUser?.find((user) => user?.role === "boss");
  // filter task with boss role
  const filterTask = realTask?.filter(
    (task) => task?.bossInfo?.bossId === findboss?._id
  );

  return (
    <div className="m-3">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-semibold border-b border-primary w-fit">
          Review <span className="text-primary">Tasks:</span>
        </h2>
        <select
          onChange={handleFilter}
          value={filterValue}
          className="select select-ghost w-40 max-w-xs border border-gray-300"
        >
          <option disabled value="">
            Filter
          </option>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="send">Accept</option>
          <option value="cencel">Cencel</option>
        </select>
      </div>
      <div className="overflow-x-auto  rounded-md mt-5">
        <table className="table">
          {/* head */}
          <TableHeader />
          <tbody>
            {/* row 1 */}
            {filterTask?.map((task, i) => (
              <BossTask key={task?._id} task={task} i={i} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BossTasks;
