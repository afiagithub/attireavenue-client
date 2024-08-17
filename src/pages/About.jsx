import { Helmet } from "react-helmet-async";
import aboutImg from "../../public/about.jpg"

const About = () => {
    return (
        <div className="px-5 md:px-10 lg:px-16 py-3 md:py-5 lg:py-6">
            <Helmet>
                <title>AttireAvanue | About Us</title>
            </Helmet>
            <div className="hero lg:mt-5">
                <div className="flex flex-col lg:flex-row-reverse justify-between gap-5">
                    <img src={aboutImg} className="lg:w-2/5 rounded-lg shadow-2xl" />
                    <div className="lg:w-3/5">
                        <h1 className="font-fira leading-snug text-4xl lg:text-4xl font-bold">
                            Embrace Your Unique Style with AttireAvenue</h1>
                        <p className="py-8 lg:w-5/6 ">Welcome to
                            <span className="text-[#921A40] font-bold"> AttireAvenue </span>
                            where we celebrate individuality and self-expression through fashion.
                            Our curated collections are designed to empower you with timeless pieces that
                            blend quality, comfort, and modern trends. Whether you're looking for classic
                            essentials or statement pieces, we believe in offering something for everyone.</p>
                    </div>
                </div>
            </div>

            {/* contact section */}
            <section id="contact" className="lg:py-10 mt-10 rounded-2xl">
                <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                    <div className="py-6 md:py-0 lg:px-6">
                        <h1 className="text-3xl font-bold">Get in touch</h1>
                        <p className="pt-2 pb-4 font-bold text-lg">Fill in the form to contact us</p>
                        <div className="space-y-4">
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                                <span>Banani, Road No. 22, Dhaka-1213</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span>+1 234 567 999</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span>attireavenue@gmail.com</span>
                            </p>
                        </div>
                    </div>
                    <form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                        <label className="block">
                            <span className="mb-1 text-lg">Full name</span>
                            <input type="text" placeholder="Your Name"
                                className="block mt-3 py-3 pl-4 w-full rounded-xl shadow-sm focus:ring focus:ring-opacity-75 
                            focus:dark:ring-[#921A40] dark:bg-gray-100" />
                        </label>
                        <label className="block">
                            <span className="mb-1 text-lg">Email address</span>
                            <input type="email" placeholder="Your Email"
                                className="block mt-3 py-3 pl-4 w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 
                            focus:dark:ring-[#921A40] dark:bg-gray-100" />
                        </label>
                        <label className="block">
                            <span className="mb-1 text-lg">Message</span>
                            <textarea rows="3" className="block mt-3 py-3 pl-4 w-full 
                            rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-[#921A40] dark:bg-gray-100"></textarea>
                        </label>
                        <button type="button" className="btn bg-[#921A40] text-white text-xl 
                        font-semibold px-6 border-2 border-[#921A40] hover:text-[#921A40] hover:bg-transparent 
                        hover:border-[#921A40]">Submit</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default About;