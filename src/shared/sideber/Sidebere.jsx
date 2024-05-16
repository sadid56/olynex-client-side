import { NavLink } from "react-router-dom";


const Sidebere = () => {
    return (
        <div className="bg-slate-900 text-white h-screen px-10">
            <h2>Olynex</h2>
            <ul>
                <li><NavLink to={"/dashboard/Boss-home"}>Home</NavLink></li>
                <li><NavLink to={"/dashboard/Boss-home2"}>Home</NavLink></li>
                <li><NavLink to={"/dashboard/Boss-home3"}>Home</NavLink></li>
                <li><NavLink to={"/dashboard/Boss-home4"}>Home</NavLink></li>
                <li><NavLink to={"/dashboard/Boss-home5"}>Home</NavLink></li>
            </ul>
        </div>
    );
};

export default Sidebere;