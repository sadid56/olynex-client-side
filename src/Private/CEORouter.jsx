/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCEO from "../hooks/useCEO";

// CEO role private router
const CEORouter = ({children}) => {
    const {user, loading}= useAuth()
    const [seo , CEOLoading] = useCEO()
    const location = useLocation()
    if(loading || CEOLoading){
        return <p className="text-center">Loading...</p>
    }
    if(user && seo){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
};

export default CEORouter;