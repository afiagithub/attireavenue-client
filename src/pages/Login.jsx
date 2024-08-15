import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "../components/SocialLogin"
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../providers/AuthProviders";
import LoginLogo from '../lotties/login.json'
import Lottie from "lottie-react";

const Login = () => {
    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';

    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, pass } = data;
        signInUser(email, pass)
            .then((result) => {
                if (result.user)
                    navigate(`${from}`)
                toast.success("Successfully Logged In")
            })
            .catch(() => {
                toast.error("Invalid Credential")
            });
    }
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full rounded-md 
        sm:p-10 my-5 gap-10">
            <Helmet>
                <title>AttireAvenue | Login</title>
            </Helmet>
            <p className="w-2/5 mx-auto"><Lottie animationData={LoginLogo} loop={true}></Lottie></p>
            <div className="flex flex-col w-4/5 md:w-3/4 lg:w-2/5 mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold text-[#921A40]">Sign in</h1>
                    <p className="text-sm dark:text-[#921A40]">Sign in to access your account</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" placeholder="leroy@jenkins.com" {...register("email", { required: true })}
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        </div>
                        {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                        <div className="relative">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-secondary">Forgot password?</a>
                            </div>
                            <input type={show ? "text" : "password"} name="password" {...register("pass", { required: true })}
                                placeholder="*****" {...register("pass", { required: true })}
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                            <div className="absolute top-10 right-4 text-lg" onClick={handleToggle}>
                                {show ? <FaEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>
                        {errors.pass && <span className="text-red-700 font-semibold">This field is required</span>}
                    </div>
                    <div className="space-y-2">
                        <div>
                            <input type="submit" value="Sign In"
                                className="w-full px-8 py-3 bg-[#921A40] text-white border-2 border-[#921A40] 
                                hover:border-[#921A40] hover:bg-transparent hover:text-[#921A40] rounded-xl font-bold" />
                        </div>
                        <p className="px-6 text-sm text-center">Don't have an account yet?
                            <Link to="/register" className="hover:underline dark:text-[#921A40] font-bold">
                                Sign up</Link>.
                        </p>
                    </div>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;