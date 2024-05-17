import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center shadow-md rounded-lg w-fit space-y-3 p-3">
        <h2 className="text-primary text-4xl font-bold">Opps!</h2>
        <p className="text-red-500 font-medium">
          This page currently unavilable!
        </p>
        <div>
            <button onClick={()=>navigate(-1)} className="btn btn-error text-xl">Go back</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
