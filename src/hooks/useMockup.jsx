
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxios";
import { useQuery } from "@tanstack/react-query";

// mockup role get in database
const useMockup = () => {
  const { user } = useAuth();
  const useAxios = useAxiosPublic();
  const { data: mockup, isLoading: mockupLoading } = useQuery({
    queryKey: ["mockup", user?.email],
    queryFn: async () => {
      const res = await useAxios.get(`/user/${user?.email}`);
      return res.data?.mockup;
    },
  });
  return [mockup, mockupLoading];
};

export default useMockup;
