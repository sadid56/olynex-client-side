import { Link, useNavigate } from "react-router-dom";
import img from "../assets/images/login.jpg";
import Input from "../Components/Input/Input";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdAddPhotoAlternate } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxios";
const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, profileUpdate } = useAuth();
  const useAxios = useAxiosPublic();
  const navigate = useNavigate()
  // create user with firebase
  const onSubmit = async (data) => {
    try {
      // create account
      const  res = await createUser(data?.email, data?.password);
      // update user profile
     if(res){
      await profileUpdate(data?.name, data?.photo);
      const userInfo = {
        name: data?.name,
        photo: data?.photo,
        email: data?.email,
        role: "member",
        date: new Date(),
      };
      const response = await useAxios.post("/users", userInfo);
      if(response.data){
        toast.success("Account created!");
        navigate("/")
      }
     }
      
    } catch (err) {
      toast.error(`Error: ${err.message}`);
      console.error("Error in onSubmit:", err);
    }
  };
  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen bg-slate-900">
      <div className="lg:w-[55%]  flex justify-center lg:justify-end h-fit">
        <div
          style={{
            backdropFilter: "blur(50px)",
            boxShadow: "0px 0px 20px #16aae0",
          }}
          className="mx-5 lg:w-[60%] -mt-10 lg:mt-20 p-6 py-14 rounded-md lg:-mr-14"
        >
          {/* input form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              icon={FaUser}
              label="Name"
              type="text"
              name="name"
              register={register}
              required={true}
              errors={errors}
            />
            <Input
              icon={MdAddPhotoAlternate}
              label="Profile URL"
              type="text"
              name="photo"
              register={register}
              required={true}
              errors={errors}
            />
            <Input
              icon={MdEmail}
              label="Email"
              type="email"
              name="email"
              register={register}
              required={true}
              errors={errors}
            />
            <Input
              icon={RiLockPasswordFill}
              label="Password"
              type="password"
              name="password"
              register={register}
              required={true}
              errors={errors}
            />
            {/* input action  */}
            <div className="flex justify-center">
              <button type="submit" className="button">
                Registration
              </button>
            </div>
            <p className="text-slate-300">
              Already have an accoun?{" "}
              <Link to={"/"} className="text-primary link-hover">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* side content */}
      <div
        className="h-[40vh] lg:h-[100vh] flex items-center bg-cover bg-opacity-80 lg:w-[45%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0, 0.5)),url(${img})`,
        }}
      >
        <div className="w-[80%] pl-4 lg:pl-20">
          <h2 className="text-3xl md:text-5xl text-slate-300 font-semibold">
            Create a new <span className="text-primary">account!</span>
          </h2>
          <p className="text-slate-300 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            commodi tempora, veniam ipsum repellat incidunt. Quos blanditiis
            natus qui repellat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
