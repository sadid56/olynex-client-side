import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useLoaderData, useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import useTasks from "../../hooks/useTasks";
import { MdArrowBack } from "react-icons/md";
import "./EmployeDetails.css"

const EmployeWorkDetails = () => {
  const user = useLoaderData();
  const { name, email, role, _id } = user;
  const [tasks] = useTasks();
  const navigate = useNavigate()

  const [filteredData, setFilteredData] = useState([]);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // find a range data
  function handleSelect(ranges) {
    setSelectionRange(ranges.selection);
    const { startDate, endDate } = ranges.selection;

    const filteredTasks = tasks?.filter((task) => {
      const finisehdAt = new Date(task?.finisehdAt);
      return (
        finisehdAt >= startDate &&
        finisehdAt <= endDate &&
        task?.receiverId === _id
      );
    });
    setFilteredData(filteredTasks);
  }

  useEffect(() => {
    handleSelect({ selection: selectionRange });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* details title */}
      <div className="border-l-2 border-primary pl-2 my-8 flex  items-center justify-between mx-3">
        <div>
        <h2 className="text-3xl font-semibold">
          Select a <span className="text-primary">date:</span>
        </h2>
        <p className="text-gray-500 text-sm md:text-lg">
          Select a date and date range then see user project complete details.
        </p>
        </div>
        <button onClick={()=>navigate(-1)} className="btn btn-circle btn-sm text-xl bg-primary"><MdArrowBack/></button>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-10 justify-center shadow-xl ">
        {/* User details */}
        <div className="space-y-4 h-full">
          <h2 className="text-2xl font-semibold">
            Name: <span className="text-primary">{name}</span>
          </h2>
          <p className="text-sm text-gray-500">Email: {email}</p>
          <p className="text-sm text-gray-500">Role: {role}</p>
          <p className="text-sm text-gray-500">Id: {_id}</p>
          <h3 className="text-xl font-semibold">
            Task Complete:{" "}
            <span className="text-primary">{filteredData?.length}</span>
          </h3>
        </div>
        {/* Calendar */}
        <div className="date-range-picker-container overflow-x-auto">
          <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
        </div>
      </div>
      {/* Details */}
      <div>
        {filteredData?.length === 0 ? (
          <p className="text-red-600 text-center mt-3">
            No complete yet any task in this date range!
          </p>
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
                {filteredData?.map((data, i) => (
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

export default EmployeWorkDetails;
