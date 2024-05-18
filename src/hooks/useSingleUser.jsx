import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "./useAxios";
const useSingleUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: singleUser, refetch } = useQuery({
    queryKey: ["singleUser", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
  return [singleUser, refetch];
};

export default useSingleUser;
