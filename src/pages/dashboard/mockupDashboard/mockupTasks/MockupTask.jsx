/* eslint-disable react/prop-types */
import { MdOutlineDone } from "react-icons/md";
import TableRow from "../../../../Components/TableRow/TableRow";
import { IoMdTime } from "react-icons/io";

const MockupTask = ({ task, isLoading, i }) => {
  const { BossStatus, SeoStatus, MockupStatus } = task;

  if (isLoading) {
    return <p className="text-center">loading...</p>;
  }

  const renderStatus = () => {
    if (BossStatus === "send" && MockupStatus === "cancel" ||
        BossStatus === "send" && MockupStatus === "send" && SeoStatus === "pending" ||
        BossStatus === "send" && MockupStatus === "send" && SeoStatus === "cancel") {
      return <p className="text-primary flex items-center gap-1">Pending <span className="loading loading-xs loading-spinner text-info"></span></p>;
    }

    if (SeoStatus === "send") {
      return <p className="text-primary flex items-center gap-1">Accepted <MdOutlineDone className="text-xl"/></p>;
    }

    if (BossStatus === "cancel" && MockupStatus === "cancel" && SeoStatus === "pending" ||
        BossStatus === "cancel" && MockupStatus === "cancel" && SeoStatus === "cancel") {
      return <button className="btn-info btn text-white font-semibold cursor-default">Wait for recent <IoMdTime /></button>;
    }

    if (BossStatus === "completed") {
      return <button className="text-green-600 text-lg font-semibold flex items-center gap-1">Completed <MdOutlineDone className="text-xl" /></button>;
    }

    return null;
  };

  return (
    <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
      <TableRow task={task} i={i} viewURL={"dashboard/all-task-mockup"} />
      {/* table action */}
      <td>{renderStatus()}</td>
    </tr>
  );
};

export default MockupTask;
