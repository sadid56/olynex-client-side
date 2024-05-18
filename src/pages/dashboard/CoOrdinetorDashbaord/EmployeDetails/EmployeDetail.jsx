/* eslint-disable react/prop-types */
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const EmployeDetail = ({ user }) => {
  const { date, name, email, role, photo, _id } = user;
  const navigate = useNavigate();
  return (
    <tr className="hover:bg-gray-200 cursor-pointer border-b border-gray-200 text-[16px] font-medium">
      <td className="border-r border-gray-200">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={photo} alt="Avatar" />
            </div>
          </div>
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{role}</div>
          </div>
        </div>
      </td>
      <td className="border-r border-gray-200">{email}</td>
      <td className="border-r border-gray-200">{date.slice(0, 10)}</td>
      <th>
        <button
          onClick={()=>navigate(`/dashboard/employe-details/${_id}`)}
          className="btn btn-info text-white"
        >
          details <TbListDetails />
        </button>
      </th>
    </tr>
  );
};

export default EmployeDetail;
