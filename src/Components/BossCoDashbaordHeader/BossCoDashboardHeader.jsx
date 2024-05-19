import useAllUser from "../../hooks/useAllUser";
import useTasks from "../../hooks/useTasks";
import "./bossCo.css";

const BossCoDashboardHeader = () => {
  const [tasks] = useTasks()
  const [allUser] = useAllUser();

  // filter user role with employe
  const filterUser = allUser?.filter((user) => user?.role === "employe");
  // filter complete project
  const filterComplete = tasks?.filter(data => data?.CoStatus === "completed")

  // data
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
      title: "Total Employee",
      value: filterUser?.length,
    },
  ];
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-5 my-3 mx-3">
      {data.map((item, i) => (
        <div className="dashbaord-header-card" key={i}>
          <h2 className="text-xl font-semibold"> {item?.title}</h2>
          <h1 className="text-2xl font-bold text-primary">{item?.value}</h1>
        </div>
      ))}
    </div>
  );
};

export default BossCoDashboardHeader;
