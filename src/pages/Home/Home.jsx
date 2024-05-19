import { useNavigate } from "react-router-dom";
import img from "../../assets/images/home.png"
import { FaArrowRight } from "react-icons/fa";
const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="mx-3">
                <img src={img} className="w-full md:w-96 object-cover" alt="" />
                <h2 className="text-4xl font-bold">Welcome to <span className="text-primary">Olynex!</span></h2>
                <p className="text-gray-400">This is a project management website in olynex.</p>
                <div className="flex justify-center mt-2">
                    <button onClick={()=>navigate("/dashboard/home")} className="btn btn-info text-white">Dashboard <FaArrowRight /></button>
                </div>
            </div>
        </div>
    );
};

export default Home;