import BossCoDashboardHeader from "../../../../Components/BossCoDashbaordHeader/BossCoDashboardHeader";
import useAllUser from "../../../../hooks/useAllUser";
import useSingleUser from "../../../../hooks/useSingleUser";
import BossTasks from "../bossTask/BossTasks";
import AllUser from "./AllUser";
import LineChartBoss from "./LineChartBoss";
import PieChartBoss from "./PieChartBoss";
import "react-circular-progressbar/dist/styles.css";

const BossDashboardHome = () => {
  const [allUser] = useAllUser();
  const [singleUser] = useSingleUser();

  // filter user with boss role
  const filterAllUser = allUser?.filter(
    (user) => user?.role !== singleUser?.role
  );

  return (
    <section>
        <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-[70%]">
        {/* dashboard header content */}
        <BossCoDashboardHeader />
        <div className="flex flex-col md:flex-row mt-10">
            {/* dashbaord line chart */}
          <div className="w-full md:w-[70%]">
            <div>
              <LineChartBoss />
            </div>
          </div>
          {/* Pie chart  progress */}
          <div className="w-full md:w-[30%]">
            <PieChartBoss />
            <h3 className="text-xl font-semibold text-center">
              <span className="text-primary">Project</span> Status
            </h3>
          </div>
        </div>
      </div>
      {/* all user content */}
      <div className="w-full md:w-[30%] bg-[#f1f1f1] mt-3 mr-3 rounded  overflow-y-auto shadow-xl">
        <h2 className="text-2xl text-center my-5 border-b-2 w-fit mx-auto ">
          All <span className="text-primary">Users:</span>
        </h2>
        <div className="space-y-3 mx-5 py-2">
          {filterAllUser?.map((user) => (
            <AllUser key={user?._id} user={user} />
          ))}
        </div>
      </div>
    </div>

     {/* review task in short curt */}
    <div className="mt-5">
    <BossTasks/>
    </div>
    </section>
  );
};

export default BossDashboardHome;
