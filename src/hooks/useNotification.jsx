
import useAxiosPublic from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useNotification = () => {
    const useAxios = useAxiosPublic()
    const {data: notifications, refetch, isLoading}= useQuery({
        queryKey:["notifications"],
        queryFn:async()=>{
            const res = await useAxios.get("/notifications");
            return res.data;
        }
    })
    return [notifications, refetch, isLoading]
};

export default useNotification;