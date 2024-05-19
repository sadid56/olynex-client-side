
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxios';

// boss role get in database
const useBoss = () => {
    const {user} = useAuth();
    const useAxios = useAxiosPublic()
    const {data: boss, isLoading:bossLoading} = useQuery({
        queryKey:["boss", user?.email],
        queryFn: async()=>{
            const res = await useAxios.get(`/user/${user?.email}`);
            return res.data?.boss
            
        }
    })
    return [boss, bossLoading]
};

export default useBoss;