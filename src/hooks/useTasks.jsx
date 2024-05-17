import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxios";

const useTasks = () => {
    const useAxios = useAxiosPublic()
    const {data: tasks, refetch, isLoading}= useQuery({
        queryKey:["tasks"],
        queryFn:async()=>{
            const res = await useAxios.get("/tasks");
            return res.data;
        }
    })
    return [tasks, refetch, isLoading]
};

export default useTasks;