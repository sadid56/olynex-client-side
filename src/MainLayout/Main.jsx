import { Outlet } from "react-router-dom";
import Navber from "../shared/Navber/Navber";
import Sidebere from "../shared/sideber/Sidebere";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Main = () => {
  // toggle sideber conditional state
  const [isToggle, setIsToggle] = useState(false);
  return (
    <div className="flex">
      {/* dashboard sideber */}
      <div
        className={`transition-all duration-300 z-50 fixed top-0 ${
          isToggle ? "translate-x-0" : "-translate-x-72"
        }`}
      >
        <Sidebere setIsToggle={setIsToggle}/>
      </div>
      {/* main layout or navber */}
      <div className={`w-full transition-all duration-300`}>
        <nav className="flex z-10 items-center w-full sticky top-0 px-3 bg-[#00215E]">
          <button onClick={() => setIsToggle(true)}>
            <FaBars className="text-2xl text-white" />
          </button>
          <Navber />
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
