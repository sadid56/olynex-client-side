import useTasks from "../../../../hooks/useTasks";

const OngoingProject = () => {
  const [tasks] = useTasks();
  // filter data with out  complete
  const filterData = tasks?.filter((task) => task?.CoStatus !== "completed");
  return (
    <div>
      {filterData?.map((data, i) => (
        <div
          className="flex  items-center w-full justify-between border p-3 rounded-md bg-gray-200 hover:bg-gray-300"
          key={data?._id}
        >
          <div className="flex items-center gap-1">
            <p>{i + 1}.</p>
            <h3 className="text-primary text-xl font-semibold">
              {data?.taskTitle}
            </h3>
          </div>
          <p>{data?.CoStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default OngoingProject;
