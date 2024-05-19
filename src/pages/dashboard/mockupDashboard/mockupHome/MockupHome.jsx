import { MdArrowRight } from "react-icons/md";
import img from "../../../../assets/images/dashboard.png"
import useSingleUser from "../../../../hooks/useSingleUser";
import MockupDashboardHeader from "./MockupDashboardHeader";
import MockupDashPerformence from "../../../../Components/MockupDashbaordPerpormence/MockupDashPerformence";
import PieChartBoss from "../../bossDashboard/BossDashbaordHome/PieChartBoss";
import MockupAriaChart from "./MockupAriaChart";
import OngoingProject from "./OngoingProject";

const MockupHome = () => {
    const [singleUser] = useSingleUser()
    return (
        <div className="m-3">
            {/* header */}
            <div className="flex flex-col gap-5 md:flex-row md:h-[150px] items-center">
            <div className="md:w-[35%] w-full object-cover bg-cover rounded-md" style={{backgroundImage: `url(${img})`}}>
  <div className="hero-overlay bg-black bg-opacity-70 rounded-md"></div>
  <div className="text-start p-5 space-y-2">
      <h1 className=" text-3xl font-bold text-slate-200">Hello <span className="text-primary">{singleUser?.name}</span></h1>
      <p className=" text-slate-300">Welcome back, your dashboard is ready!</p>
      <button className="btn btn-outline btn-info hover:text-white">Get Started <MdArrowRight/></button>
    
  </div>
</div>
<div className="w-full md:w-[65%]">
    <MockupDashboardHeader/>
</div>
            </div>
            {/* chart performence */}
            <div className="flex w-full flex-col-reverse md:flex-row items-center md:gap-5">
                <div className="w-full md:w-[70%]">
                <MockupDashPerformence/>
                </div>
                <div className="md:w-[30%]">
                    <div className="md:m-8 2xl:m-20">
                    <PieChartBoss value={80}/>
                    </div>
                    <h3 className="text-3xl font-semibold text-center"><span className="text-primary">Project</span> Status</h3>
                </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-start gap-4">
                <div className="w-full md:w-[40%]">
                    <h2 className="text-xl font-semibold mb-5">Ongoing <span className="text-primary">Project</span>:</h2>
                <OngoingProject/>
                </div>
                <div className="w-full md:w-[60%]">
                    <MockupAriaChart/>
                </div>
            </div>
        </div>
    );
};

export default MockupHome;