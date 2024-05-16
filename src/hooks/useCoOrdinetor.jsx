
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxios';

const useCoOrdinetor = () => {
    const {user} = useAuth();
    const useAxios = useAxiosPublic()
    const {data: co, isFetching:CoLoading} = useQuery({
        queryKey:["Co"],
        queryFn: async()=>{
            const res = await useAxios.get(`/user/${user?.email}`);
            return res.data.co_ordinetor
            
        }
    })
    return [co, CoLoading]
};

export default useCoOrdinetor;