import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxios";

// CEO role get in database
const useCEO = () => {
    const {user} = useAuth();
    const useAxios = useAxiosPublic()
    const {data: seo, isFetching:CEOLoading} = useQuery({
        queryKey:["CEO", user?.email],
        queryFn: async()=>{
            const res = await useAxios.get(`/user/${user?.email}`);
            return res.data?.seo
            
        }
    })
    return [seo, CEOLoading]
};

export default useCEO;