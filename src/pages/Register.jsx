import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../providers/AuthProviders";
import SocialLogin from "../components/SocialLogin"
import useAxiosPublic from '../hooks/useAxiosPublic'
import RegisterLogo from '../lotties/register.json'
import Lottie from "lottie-react";

const Register = () => {
    const { createUser, updateUserProfile, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const [show, setShow] = useState(false);
    const handleToggle = () => {
        setShow(!show);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { fullName, email, pass, confirmPass, photo } = data;
        console.log(data)
        if (pass.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(pass)) {
            toast.error("Password must have a uppercase and a lowercase letter");
            return;
        }
        else if (pass !== confirmPass) {
            toast.error("Password does not match Confirm Password");
            return;
        }
        createUser(email, pass)
            .then((result) => {
                updateUserProfile(fullName, photo)
                    .then(async () => {
                        setUser({ ...result.user, photoURL: photo, displayName: fullName })
                        const userInfo = {
                            name: fullName,
                            email,
                            photo: photo || 'https://i.ibb.co/QnTrVRz/icon.jpg'
                        }
                        const res = await axiosPublic.post("/users", userInfo);
                        console.log(res);
                        if (res.data.insertedId) {
                            navigate('/')
                            toast.success("Successfully Registered")
                        }
                        else{
                            toast.error("User already exists")
                        }
                    });
            })
            .catch((error) => {
                toast.error("User already exists")
                console.log(error.message)
            });
    }
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full rounded-md 
        sm:p-10 my-5 gap-10">
            <Helmet>
                <title>AttireAvenue | Register</title>
            </Helmet>
            <div className="lg:mt-20">
                <p className="w-72 mx-auto"><Lottie animationData={RegisterLogo} loop={true}></Lottie></p>
                <p className="text-black"><span className="text-4xl font-bold text-[#921A40]">Create </span>
                    an account and <br /> see our <span className="text-4xl font-bold text-[#921A40]">product showcase</span></p>
            </div>
            <div className="flex flex-col w-4/5 md:w-3/4 lg:w-2/5 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                    <div className="space-y-4 ">
                        <div>
                            <label className="block mb-2 text-sm">Full Name</label>
                            <input type="text" name="name" placeholder="Your Full Name" {...register("fullName")}
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm">Email address</label>
                            <input type="email" name="email" placeholder="Your Email" {...register("email", { required: true })}
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        </div>
                        {errors.email && <span className="text-red-700 font-semibold">This field is required</span>}
                        <div>
                            <label className="block mb-2 text-sm">Photo URL</label>
                            <input type="text" name="photo" placeholder="Your Photo URL" {...register("photo")}
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        </div>
                        <div className="relative">
                            <div className="flex justify-between mb-2">
                                <label className="text-sm">Password</label>
                            </div>
                            <input type={show ? "text" : "password"} name="password" id="password" placeholder="*****" {...register("pass", { required: true })}
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                            <div className="absolute top-10 right-4 text-lg" onClick={handleToggle}>
                                {show ? <FaEyeSlash /> : <FaRegEye />}
                            </div>
                        </div>
                        {errors.pass && <span className="text-red-700 font-semibold">This field is required</span>}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm">Confirm Password</label>
                            </div>
                            <input type="password" name="password" id="con-password" placeholder="*****" {...register("confirmPass", { required: true })}
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        </div>
                        {errors.confirmPass && <span className="text-red-700 font-semibold">This field is required</span>}
                    </div>
                    <div className="space-y-2">
                        <div>
                            <input type="submit" value="Sign Up"
                                className="w-full px-8 py-3 bg-[#921A40] text-white text-lg font-semibold rounded-xl 
                            border-2 border-[#921A40] hover:border-[#921A40] hover:bg-transparent 
                            hover:text-[#921A40]" />
                        </div>
                        <p className="px-6 text-sm text-center">Already have an account?
                            <Link to="/login" className="hover:underline dark:text-[#921A40] font-bold">
                                Sign in</Link>.
                        </p>
                    </div>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;