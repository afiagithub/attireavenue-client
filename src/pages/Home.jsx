import AllProduct from "../components/AllProduct";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>AttireAvenue</title>
            </Helmet>
            <h1 className="text-center text-4xl font-fira font-bold mb-5 mt-10">Showcasing Our Product</h1>
            <p className="text-center w-3/5 mx-auto mb-10 lg:mb-20">
                Join our community and stay connected for exclusive offers, new arrivals, and more.
                Wear your story with AttireAvenue.</p>
            <div>
                <AllProduct></AllProduct>
            </div>
        </div>
    );
};

export default Home;