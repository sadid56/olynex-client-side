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
import BossRouter from "../Private/BossRouter";
import BossTasks from "../pages/dashboard/bossDashboard/bossTask/BossTasks";
import VIewSubmitionBoss from "../Components/viewSubmitionBOSS/VIewSubmitionBoss";
import MockupRouter from "../Private/MockupRouter";
import MockupTasks from "../pages/dashboard/mockupDashboard/mockupTasks/MockupTasks";
import ViewSubmitionMockup from "../Components/ViewSubmitionMockup/ViewSubmitionMockup";
import CEORouter from "../Private/CEORouter";
import SEOtasks from "../pages/dashboard/seoDashboard/SEOtasks/SEOtasks";
import ViewSubmitionSEO from "../Components/ViewSubmititonSEO/ViewSubmitionSEO";

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
            },
            {
                path:"/dashboard/all-task-boss/:id",
                element:<BossRouter><VIewSubmitionBoss/></BossRouter>,
                loader: ({params})=> fetch(`http://localhost:5000/task/${params.id}`)
            },
            {
                path:"/dashboard/all-task-boss",
                element: <BossRouter><BossTasks/></BossRouter>
            },
            {
                path:"/dashboard/all-task-mockup",
                element:<MockupRouter><MockupTasks/></MockupRouter>
            },
            {
                path:"/dashboard/all-task-mockup/:id",
                element:<MockupRouter><ViewSubmitionMockup/></MockupRouter>,
                loader: ({params})=> fetch(`http://localhost:5000/task/${params.id}`)
            },
            {
                path:"/dashboard/all-task-seo",
                element:<CEORouter><SEOtasks/></CEORouter>
            },
            {
                path:"/dashboard/all-task-seo/:id",
                element:<CEORouter><ViewSubmitionSEO/></CEORouter>,
                loader: ({params})=> fetch(`http://localhost:5000/task/${params.id}`)
            }
        ]
    }
])

export default Routers;