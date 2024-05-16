import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxios";

// Employe role get in database
const useEmploye = () => {
  const { user } = useAuth();
  const useAxios = useAxiosPublic();
  const { data: employe, isFetching: emplyeLoading } = useQuery({
    queryKey: ["employee", user?.email],
    queryFn: async () => {
      const res = await useAxios.get(`/user/${user?.email}`);
      return res.data?.employe;
    },
  });
  return [employe, emplyeLoading];
};

export default useEmploye;
