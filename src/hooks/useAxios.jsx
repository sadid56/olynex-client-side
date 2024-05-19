import axios from 'axios';
const useAxios = axios.create({
    baseURL: "https://olynex-server-gules.vercel.app"
})

const useAxiosPublic = () => {
    return useAxios;
};

export default useAxiosPublic;