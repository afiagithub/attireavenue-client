import { IoMdStar } from "react-icons/io";

const SingleProduct = ({ pr }) => {
    const { name, image, description, price, brand, category, ratings, product_creation_date } = pr;
    return (
        <div className="card bg-base-100 w-[375px] shadow-xl">
            <figure className="">
                <img className="h-80 w-full object-cover"
                    src={image}
                    alt="image" />
            </figure>
            <div className="card-body">
                <div className="h-28">
                    <div className="flex justify-between items-center gap-5 mb-3">
                        <h2 className="card-title font-fira">
                            {name}
                        </h2>
                        <p className="text-right">
                            <span className="badge bg-[#921A40] text-white font-semibold text-lg">${price}</span>
                        </p>
                    </div>
                    <p>{description.slice(0, 80)}...</p>
                </div>
                <div className="flex justify-between text-sm">
                    <p className="font-bold">Brand: <span className="badge badge-info font-semibold">{brand}</span></p>
                    <p className="font-bold">Category: <span className="badge text-[#921A40] bg-[#e6c0cc] font-semibold">{category}</span></p>
                </div>
                <div className="flex justify-between text-sm">
                    <p className="flex flex-row gap-1 font-bold">Rating:
                        <span className="font-semibold">{ratings}</span>
                        <IoMdStar className="text-yellow-400 text-lg justify-center items-center" /></p>
                    <p className="font-bold">Added On: <span className="text-[#921A40] font-semibold">{product_creation_date}</span></p>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;