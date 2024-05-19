/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCoOrdinetor from "../hooks/useCoOrdinetor";

// CO-ordinetor role private routers
const CORouter = ({children}) => {
    const {user, loading}= useAuth()
    const [co , CoLoading] = useCoOrdinetor()
    const location = useLocation()
    if(loading || CoLoading){
        return <p className="text-center">Loading...</p>
    }
    if(user && co){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
}
 
export default CORouter;