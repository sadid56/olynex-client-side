import "./bossCo.css";

const BossCoDashboardHeader = () => {
  // fake data
  const data = [
    {
      title: "Total project",
      value: 10,
    },
    {
      title: "Best Project",
      value: 4,
    },
    {
      title: "Total Employe",
      value: 20,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-5 my-3 mx-3">
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
