import useAllUser from "../../../../hooks/useAllUser";
import useSingleUser from "../../../../hooks/useSingleUser";
import useTasks from "../../../../hooks/useTasks";
import PieChartBoss from "../../bossDashboard/BossDashbaordHome/PieChartBoss";
import "./EmloyeHome.css";
import EmployeAriaChart from "./EmployeAriaChart";

const EmployeHome = () => {
  const [tasks] = useTasks();
  const [allUser] = useAllUser();
  const [singleUser] = useSingleUser();

  // filter user role with employe
  const filterUser = allUser?.filter((user) => user?.role === "employe");
  // filter complete project
  const filterComplete = tasks?.filter(
    (data) => data?.CoStatus === "completed"
  );
  const filterReject = tasks?.filter((data) => data?.CoStatus === "reject");

  // filter employee complete task
  const filterEmployeTask = filterComplete?.filter(
    (task) => task?.receiverId === singleUser?._id
  );
  console.log(filterEmployeTask);

  const data = [
    {
      title: "Total project",
      value: tasks?.length,
    },
    {
      title: "Compolete Project",
      value: filterComplete?.length,
    },
    {
      title: "Reject Project",
      value: filterReject?.length,
    },
    {
      title: "Working Employee",
      value: filterUser?.length,
    },
  ];
  return (
    <div className="mx-3">
      {/* header */}
      <div className="grid grid-cols-1  md:grid-cols-4 gap-5 my-3">
        {data.map((item, i) => (
          <div className="HeaderCards" key={i}>
            <h2 className="text-xl font-semibold"> {item?.title}</h2>
            <h1 className="text-2xl font-bold text-primary">{item?.value}</h1>
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center">
        {/* tooltip */}
        <div className="md:w-[70%]">
          <EmployeAriaChart />
        </div>
        {/* chart progress */}
        <div className="md:w-[30%]">
          <div className="md:m-8 2xl:m-20">
            <PieChartBoss value={90} />
          </div>
          <h4 className="text-center text-2xl  font-semibold">
            Your <span className="text-primary">performence</span>
          </h4>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold my-5 mt-16 lg:mt-2">
          Your Complete <span className="text-primary">Project:</span>
        </h3>
        {filterEmployeTask?.length === 0 ? (
          <p className="text-red-600 text-center mt-3">No complete any task!</p>
        ) : (
          <div className="overflow-x-auto rounded-md my-5">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-primary text-slate-800 py-3 text-sm font-medium">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Project Id</th>
                  <th>Finished date</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {filterEmployeTask?.map((data, i) => (
                  <tr
                    className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium"
                    key={data?._id}
                  >
                    <th className="border-r border-gray-200">{i + 1}</th>
                    <td className="border-r border-gray-200">
                      {data?.taskTitle}
                    </td>
                    <td className="border-r border-gray-200">{data?._id}</td>
                    <td className="border-r border-gray-200">
                      {data?.finisehdAt?.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeHome;
