import { createBrowserRouter } from "react-router-dom";
import Login from "../authentication/Login";
import Main from "../MainLayout/Main";
import DashboardMainHome from "../pages/dashboard/DashboardMainHome/DashboardMainHome";
import Registration from "../authentication/Registration";

const Routers = createBrowserRouter([
    {
        path:"/",
        element:<Login/>
    },
    {
        path:"registration",
        element:<Registration/>
    },
    {
        path:"/dashboard",
        element:<Main/>,
        children:[
            {
                path:"/dashboard",
                element: <DashboardMainHome/>
            }
        ]
    }
])

export default Routers;