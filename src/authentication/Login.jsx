/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/images/login.jpg";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Input from "../Components/Input/Input";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
const Login = () => {
  const { signIn} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // login user with firebase
  const onSubmit = async (data) => {
    try {
      await signIn(data?.email, data?.password)
        .then(() => {
          toast.success(`login Success !`);
          navigate("/dashboard/home");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (err) {
      console.log("sign in error --->", err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-900">
      <div
        className="h-[40vh] lg:h-[100vh] flex items-center bg-cover bg-opacity-80 lg:w-[45%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0, 0.7)),url(${img})`,
        }}
      >
        <div className="w-[80%] pl-4 md:pl-10">
          <h2 className="text-3xl md:text-5xl text-slate-300 font-semibold">
            <span className="text-primary">Welcome</span> back!
          </h2>
          <p className="text-slate-300 mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero error amet laudantium expedita accusantium eum optio nesciunt officiis vitae delectus!
          </p>
        </div>
      </div>

      {/* login form */}
      <div className="lg:w-[55%] ">
        <div
          style={{
            backdropFilter: "blur(50px)",
            boxShadow: "0px 0px 20px #16aae0",
          }}
          className="mx-5 lg:w-[60%] -mt-10 lg:mt-32 p-6 py-10 rounded-md lg:-ml-20"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
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
            {/* form action */}
            <div className="flex justify-center">
            <button className="button" type="submit" >
               Login
            </button>
            </div>
            <p className="text-slate-300">
              Don't have any account?{" "}
              <Link to={"/registration"} className="text-primary link">
                Create new account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
