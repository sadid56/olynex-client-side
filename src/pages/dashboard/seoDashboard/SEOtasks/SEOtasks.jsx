import TableHeader from "../../../../Components/TableHeader/TableHeader";
import useAllUser from "../../../../hooks/useAllUser";
import useTasks from "../../../../hooks/useTasks";
import SEOtask from "./SEOtask";

const SEOtasks = () => {
    const [tasks, refetch] = useTasks();
    const [allUser] = useAllUser();
    // find seo with role
    const findSEO = allUser?.find((user) => user?.role === "seo");
    // filter seo task  with  seo role
    const filterTask = tasks?.filter(task => task?.seoInfo?.seoId === findSEO?._id )
    return (
        <div className="m-3">
          <h2 className="text-2xl font-semibold border-b border-primary w-fit">
          SEO <span className="text-primary">Tasks:</span>
          </h2>
        <div className="overflow-x-auto  rounded-md mt-5">
          <table className="table">
            {/* head */}
            <TableHeader/>
            <tbody>
              {/* row 1 */}
              {filterTask?.map((task, i) => (
                <SEOtask
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

export default SEOtasks;