import AllProduct from "../components/AllProduct";

const Home = () => {
    return (
        <div>
            <h1 className="text-center text-4xl font-fira font-bold mb-5 mt-10">Showcasing Our Product</h1>
            <p className="text-center w-3/5 mx-auto mb-20">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat a eaque delectus veritatis ullam suscipit!</p>
            <div>
                <AllProduct></AllProduct>
            </div>
        </div>
    );
};

export default Home;