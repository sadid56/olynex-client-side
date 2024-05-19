/* eslint-disable react/prop-types */
import {format} from "timeago.js";

const AllUser = ({ user }) => {
  const { photo, name, role, date } = user;
  return (
    <div className="flex w-full justify-between items-center border p-2 rounded hover:bg-primary cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="avatar border-2 border-primary rounded-full">
          <div className="w-8 rounded-full ">
            <img src={photo} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-slate-800 text-xl font-semibold">{name}</h1>
          <h1 className="text-sm">{role}</h1>
        </div>
      </div>
      <h1 className="text-slate-600"><small>Join: {format(date)}</small></h1>
    </div>
  );
};

export default AllUser;
