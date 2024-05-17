import TableHeader from "../../../../Components/TableHeader/TableHeader";
import useSingleUser from "../../../../hooks/useSingleUser";
import useTasks from "../../../../hooks/useTasks";
import MytaskSingle from "./MytaskSingle";

const MyTask = () => {
  const [singleUser] = useSingleUser();
  const [tasks, refetch] = useTasks();
  const filterTask = tasks?.filter(
    (task) => task?.receiverId === singleUser?._id
  );
  return (
    <div className="mt-3 mx-3">
        <h2 className="text-2xl my-5 font-semibold border-b border-primary w-fit">
          All <span className="text-primary">Tasks:</span>
        </h2>
      

      <div className="overflow-x-auto  rounded-md mt-5">
        <table className="table">
          {/* head */}
          <TableHeader/>
          <tbody>
            {/* row 1 */}
            {filterTask?.map((task, i) => (
              <MytaskSingle
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

export default MyTask;
