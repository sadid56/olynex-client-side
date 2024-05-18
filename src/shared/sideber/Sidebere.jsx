/* eslint-disable react/prop-types */
import useCoOrdinetor from "../../hooks/useCoOrdinetor";
import useBoss from "../../hooks/useBoss";
import useMockup from "../../hooks/useMockup";
import useCEO from "../../hooks/useCEO";
import useEmploye from "../../hooks/useEmploye";
import { FaUserCircle, FaUsers, FaTasks, FaRegDotCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import {
  MdDashboard,
  MdKeyboardDoubleArrowLeft,
  MdOutlineCreateNewFolder,
  MdEvent,
  MdTaskAlt,
} from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BsListTask, BsChatDots } from "react-icons/bs";
import { BiTaskX } from "react-icons/bi";
import "./Sideber.css";
import StyledNavLink from "./StyleNavlink";
import { useState } from "react";
const Sidebere = ({ setIsToggle }) => {
  const [co] = useCoOrdinetor();
  const [boss] = useBoss();
  const [mockup] = useMockup();
  const [seo] = useCEO();
  const [employe] = useEmploye();
  const [toggleEvents, setToggleEvents] = useState(false);

  const userRoutes = [
    // Boss related
    {
      condition: boss,
      path: "/dashboard/all-task-boss",
      label: "Task Review",
      conditionIcon: <MdTaskAlt/>,
    },
    {
      condition: boss,
      path: "/dashboard/clients",
      label: "Clients",
      conditionIcon: <FaUsers />,
    },
    {
      condition: boss,
      path: "/dashboard/project-details",
      label: "Project Details",
      conditionIcon: <GoProjectRoadmap />,
    },
    {
      condition: boss,
      path: "/dashboard/messages",
      label: "Messages",
      conditionIcon: <BsChatDots />,
    },
    // CO related
    
    {
      condition: co,
      path: "/dashboard/all-tasks",
      label: "All tasks",
      conditionIcon: <MdTaskAlt/>,
    },
    {
      condition: co,
      path: "/dashboard/create-task",
      label: "Create Task",
      conditionIcon: <MdOutlineCreateNewFolder />,
    },
    {
      condition: co,
      path: "/dashboard/employe-details",
      label: "Employe Details",
      conditionIcon: <FaUsers />,
    },
    {
      condition: co,
      path: "/dashboard/create-task3",
      label: "All Project",
      conditionIcon: <GoProjectRoadmap />,
    },
    // mockup related
    {
      condition: mockup,
      path: "/dashboard/all-task-mockup",
      label: "Task Mockup",
      conditionIcon: <MdTaskAlt/>,
    },
    // SEO related
    {
      condition: seo,
      path: "/dashboard/all-task-seo",
      label: "SEO tasks",
      conditionIcon: <MdTaskAlt/>,
    },
    // employ related
    {
      condition: employe,
      path: "/dashboard/My-task",
      label: "My Task",
      conditionIcon: <BsListTask />,
    },
    {
      condition: employe,
      path: "/dashboard/complete-task",
      label: "Complete Task",
      conditionIcon: <FaTasks />,
    },
    {
      condition: employe,
      path: "/dashboard/progress-task",
      label: "Progress Task",
      conditionIcon: <BiTaskX />,
    },
  ];

  return (
    <div className="bg-slate-900 text-white  h-screen w-fit z-50">
      {/* logo and close sideber */}
      <div className="flex  items-center px-4 py-3 w-full justify-between border-b border-primary ">
        <h2 className="text-3xl font-semibold">
          <span className="text-primary font-bold">Oly</span>nex
        </h2>
        <button onClick={() => setIsToggle(false)} className="text-3xl">
          <MdKeyboardDoubleArrowLeft />
        </button>
      </div>

      <ul className="mt-10 flex flex-col justify-between h-[80vh] gap-5 px-7">
        <div id="nav" className="space-y-2">
          {/* dashboard home define with all user */}
          <li>
            <StyledNavLink to="/dashboard/home" icon={<MdDashboard />}>
              Dashboard
            </StyledNavLink>
          </li>
          {/* Conditional routes based on user role */}
          {userRoutes.map(
            ({ condition, path, label, conditionIcon }) =>
              condition && (
                <li key={path}>
                  <StyledNavLink to={path} icon={conditionIcon}>
                    {label}
                  </StyledNavLink>
                </li>
              )
          )}
          {/* event dropdown */}
          {
            boss && <div className="dropdown-container">
            <button
              className="flex items-center gap-2 text-xl font-semibold hover:bg-gray-600 p-2 rounded"
              onClick={() => setToggleEvents(!toggleEvents)}
            >
              <span className="bg-primary p-1 rounded-md text-white">
                <MdEvent />
              </span>
              Events{" "}
              {!toggleEvents ? <IoIosArrowForward /> : <IoIosArrowDown />}
            </button>
            <div className={`dropdown-menu ${toggleEvents ? "open" : ""} p-2`}>
              <ul className="dropdown-content space-y-2">
                <li className="flex items-center gap-2 hover:bg-gray-300 p-1 rounded cursor-pointer"><span><FaRegDotCircle/></span> Weekly event</li>
                <li className="flex items-center gap-2 hover:bg-gray-300 p-1 rounded cursor-pointer"><span><FaRegDotCircle/></span> Project event</li>
                <li className="flex items-center gap-2 hover:bg-gray-300 p-1 rounded cursor-pointer"><span><FaRegDotCircle/></span>Event</li>
              </ul>
            </div>
          </div>
          }
        </div>
        {/* profile & setting  rotuer  define in every user role */}
        <div className="mt-5 space-y-2">
          <li>
            <StyledNavLink to="/dashboard/profile" icon={<FaUserCircle />}>
              Profile
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/setting" icon={<IoMdSettings />}>
              Setting
            </StyledNavLink>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebere;
