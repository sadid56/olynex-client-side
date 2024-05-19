/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useMockup from "../hooks/useMockup";

// mockup role  private router
const MockupRouter = ({children}) => {
    const {user, loading}= useAuth()
    const [mockup, mockupLoading] = useMockup()
    const location = useLocation()
    if(loading || mockupLoading){
        return <p className="text-center">Loading...</p>
    }
    if(user && mockup){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
};

export default MockupRouter;