import useAllUser from "../../../../hooks/useAllUser";
import EmployeDetail from "./EmployeDetail";


const EmployeDetails = () => {
    const [allUser] = useAllUser()
    //  filter a  employee
    const filterEmployee = allUser?.filter(user => user?.role === "employe")
    return (
        <div className="mx-5">
            <h2 className="text-2xl font-semibold my-5"><span className="text-primary">Employee </span>work details:</h2>
            <div className="overflow-x-auto rounded-md">
  <table className="table">
    {/* head */}
    <thead className="bg-primary text-slate-800 py-3 text-sm font-medium">
      <tr>
        <th>Profile</th>
        <th>Email</th>
        <th>Join date</th>
        <th>Work Details</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        filterEmployee?.map(user =><EmployeDetail key={user?._id} user={user}/>)
      }
    </tbody>
  
    
  </table>
</div>
        </div>
    );
};

export default EmployeDetails;