/* eslint-disable react/prop-types */
import { MdOutlineDone } from "react-icons/md";
import TableRow from "../../../../Components/TableRow/TableRow";
import { IoMdTime } from "react-icons/io";

const SEOtask = ({ task, isLoading, i }) => {
  const {BossStatus,} = task;
  if (isLoading) {
    return <p className="text-center">loadiing...</p>;
  }
  return <>
  <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
    
    <TableRow task={task} i={i} viewURL={"dashboard/all-task-seo"} />
    
    {/* table action */}

    <td>
    {
       BossStatus === "send" && <p className="text-primary flex items-center gap-1">Pending <span className="loading loading-xs loading-spinner text-info"></span></p>  
    ||
     BossStatus === "clear" && <p className="text-primary flex items-center gap-1">All Clear <MdOutlineDone className="text-xl"/></p>  
    ||
      BossStatus === "cencel" && <button className="btn-info btn text-white font-semibold cursor-default">
      Wait for recent <IoMdTime />
    </button>
   ||
      BossStatus === "completed" && <button className=" text-green-600 text-lg font-semibold flex items-center gap-1">
      Completed <MdOutlineDone className="text-xl" />
    </button>
    }
    </td>
  </tr>
    
  </>
};

export default SEOtask;
