import TableHeader from "../../../../Components/TableHeader/TableHeader";
import useAllUser from "../../../../hooks/useAllUser";
import useTasks from "../../../../hooks/useTasks";
import MockupTask from "./MockupTask";

const MockupTasks = () => {
  const [tasks, refetch] = useTasks();
  const [allUser] = useAllUser();
  const findMockup = allUser?.find((user) => user?.role === "mockup");
  const filterTask = tasks?.filter(
    (task) => task?.mockupInfo?.mockupId === findMockup?._id
  );
  return (
    <div className="m-3">
      <h2 className="text-2xl font-semibold border-b border-primary w-fit">
        Mockup <span className="text-primary">Tasks:</span>
      </h2>
      <div className="overflow-x-auto  rounded-md mt-5">
        <table className="table">
          {/* head */}
          <TableHeader/>
          <tbody>
            {/* row 1 */}
            {filterTask?.map((task, i) => (
              <MockupTask key={task?._id} task={task} i={i} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MockupTasks;
