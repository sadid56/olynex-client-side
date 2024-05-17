/* eslint-disable react/prop-types */
import TableRow from "../../../../Components/TableRow/TableRow";

const SEOtask = ({ task, isLoading, i }) => {
  if (isLoading) {
    return <p className="text-center">loadiing...</p>;
  }
  return <TableRow task={task} i={i} viewURL={"dashboard/all-task-seo"} />;
};

export default SEOtask;
