import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxios";

const useAllUser = () => {
  const useAxios = useAxiosPublic();
  const { data: allUser } = useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const res = await useAxios.get("/users");
      return res.data;
    },
  });
  return [allUser];
};

export default useAllUser;
