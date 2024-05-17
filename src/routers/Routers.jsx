import { createBrowserRouter } from "react-router-dom";
import Login from "../authentication/Login";
import Main from "../MainLayout/Main";
import DashboardMainHome from "../pages/dashboard/DashboardMainHome/DashboardMainHome";
import Registration from "../authentication/Registration";
import PrivateRoute from "../Private/PrivateRoute";
import Profile from "../pages/profile/Profile";
import ErrorPage from "../pages/errorPage/ErrorPage";
import CORouter from "../Private/CoRouters";
import CreateTask from "../pages/dashboard/CoOrdinetorDashbaord/CreateTask/CreateTask";
import AllTask from "../pages/dashboard/CoOrdinetorDashbaord/allTask/AllTask";
import EmployeRouter from "../Private/EmployeRouter";
import MyTask from "../pages/dashboard/employDashboard/myTask/MyTask";
import ViewTask from "../pages/dashboard/employDashboard/myTask/ViewTask";
import VIewSubmitionCO from "../Components/viewSubmitionCo/VIewSubmitionCO";

const Routers = createBrowserRouter([
    {
        path:"/",
        element:<Login/>,
        errorElement:<ErrorPage/>,
    },
    {
        path:"registration",
        element:<Registration/>
    },
    {
        path:"/dashboard",
        element:<Main/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:"/dashboard/home",
                element: <PrivateRoute><DashboardMainHome/></PrivateRoute>
            },
            {
                path:"/dashboard/profile",
                element:<PrivateRoute><Profile/></PrivateRoute>
            },
            {
                path:"/dashboard/create-task",
                element:<CORouter><CreateTask/></CORouter>
            },
            {
                path:"/dashboard/all-tasks",
                element:<CORouter><AllTask/></CORouter>
            },
            {
                path:"/dashboard/my-task",
                element: <EmployeRouter><MyTask/></EmployeRouter>
            },
            {
                path:"/dashboard/my-task/:id",
                element:<EmployeRouter><ViewTask/></EmployeRouter>,
                loader: ({params})=> fetch(`http://localhost:5000/task/${params.id}`)
            },
            {
                path:"/dashboard/all-task/:id",
                element:<CORouter><VIewSubmitionCO/></CORouter>,
                loader: ({params})=> fetch(`http://localhost:5000/task/${params.id}`)
            }
        ]
    }
])

export default Routers;