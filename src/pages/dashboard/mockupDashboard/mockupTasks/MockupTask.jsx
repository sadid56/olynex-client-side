/* eslint-disable react/prop-types */
import TableRow from "../../../../Components/TableRow/TableRow";

const MockupTask = ({ task, isLoading, i }) => {
  if (isLoading) {
    return <p className="text-center">loadiing...</p>;
  }
  return <TableRow task={task} i={i} viewURL={"dashboard/all-task-mockup"} />;
};

export default MockupTask;
