import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProviders";

const SocialLogin = () => {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(async (result) => {
                if (result.user) {
                    navigate(`${from}`)
                    toast.success("Successfully Logged In")
                    
                    // const userInfo = {
                    //     name: result.user.displayName,
                    //     email: result.user.email || result.user?.reloadUserInfo?.screenName,
                    //     user_id: result.user.uid,
                    //     photo: result.user.photoURL || 'https://i.ibb.co/QnTrVRz/icon.jpg',
                    //     bloodType: '',
                    //     dist: '',
                    //     upazila: '',
                    //     status: 'active'

                    // }
                    // const res = await axiosPublic.post("/users", userInfo);
                    // if (res.data.insertedId) {
                    //     console.log({ message: 'success' });
                    // }
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