import { FaDiscord, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import useSingleUser from "../../hooks/useSingleUser";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const [singleUser] = useSingleUser()
  const {user} = useAuth()
  return (
    <div className="flex justify-center w-full min-h-screen items-center px-3">
        <div className="flex relative">
            {/* content  */}
            <div style={{boxShadow:"0px 0px 30px gray"}} className="w-full md:w-[600px] h-[400px]  p-5 rounded-md">
            <div className="w-[70%] space-y-3">
            <h2 className="text-4xl font-bold border-b border-primary w-fit">{user?.displayName}</h2>
            <h2 className="text-xl font-medium">Role: <span className="text-primary">{singleUser?.role}</span></h2>
            <p><span className="text-xl font-medium">bio</span> <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et consequatur fugit ex neque dolorem cupiditate aspernatur nostrum non consequuntur necessitatibus.
            </p>
            <div className="flex items-center gap-2">
              <button className="btn btn-sm text-xl btn-circle text-primary"><FaFacebook/></button>
              <button className="btn btn-sm text-xl btn-circle text-primary"><FaWhatsapp/></button>
              <button className="btn btn-sm text-xl btn-circle text-primary"><FaTwitter/></button>
              <button className="btn btn-sm text-xl btn-circle text-primary"><FaDiscord/></button>
            </div>
            </div>
            </div>
            {/* image */}
            <div className="w-[100px] md:w-[200px] h-fit shadow-md absolute right-2 md:-right-16 md:-top-16 -top-10 rounded">
                <img src="https://source.unsplash.com/MP0IUfwrn0A" className="w-full bg-cover rounded-md" alt="" />
            </div>
        </div>
    </div>
  );
};

export default Profile;
