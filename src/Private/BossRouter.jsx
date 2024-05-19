/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useBoss from "../hooks/useBoss";

// boss role private routers
const BossRouter = ({children}) => {
    const {user, loading}= useAuth()
    const [boss, bossLoading] = useBoss()
    const location = useLocation()
    if(loading || bossLoading){
        return <p className="text-center">Loading...</p>
    }
    if(user && boss){
        return children
    }
    return <Navigate state={location?.pathname} to='/login'/>
}
 
export default BossRouter;