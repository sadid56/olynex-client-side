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
        className={`transition-all duration-300 ${
          isToggle ? "translate-x-0 sticky" : "-translate-x-36 fixed"
        }`}
      >
        <Sidebere />
      </div>
      {/* main layout or navber */}
      <div className={`w-full transition-all duration-300`}>
        <nav className="flex items-center w-full px-3 bg-blue-500">
          <button onClick={() => setIsToggle(!isToggle)}>
            <FaBars className="text-2xl" />
          </button>
          <Navber />
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
