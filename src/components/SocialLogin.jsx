import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProviders";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const axiosPublic = useAxiosPublic()

    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(async (result) => {
                navigate(`${from}`)
                toast.success("Successfully Logged In");
                if (result.user) {
                    const userInfo = {
                        name: result.user.displayName,
                        email: result.user.email,
                        photo: result.user.photoURL || 'https://i.ibb.co/QnTrVRz/icon.jpg'
                    }
                    const res = await axiosPublic.post("/users", userInfo);
                    if (res.data.insertedId) {
                        console.log({success: true});
                        
                    }
                }
            });
    }

    return (
        <div>
            <div className="mt-5 flex flex-row items-center gap-4">
                <hr className="flex-grow" />
                <p className="text-[#2D3663]">Or Sign In Using</p>
                <hr className="flex-grow" />
            </div>
            <div className="mt-5 flex flex-row items-center justify-center gap-5 ">
                <button onClick={() => handleSocialLogin(googleLogin)} className="py-3">
                    <FcGoogle className="text-2xl" />
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;