

const SingleProduct = ({ pr }) => {
    const { name, image, description, price, brand, category, product_creation_date } = pr;
    return (
        <div className="card bg-base-100 w-[375px] shadow-xl">
            <figure className="">
                <img className="h-80 w-full object-cover"
                    src={image}
                    alt="image" />
            </figure>
            <div className="card-body">
                <div className="flex justify-between items-center gap-5">
                    <h2 className="card-title font-fira">
                        {name}
                    </h2>
                    <p className="text-right"><span className="badge bg-[#921A40] text-white font-semibold text-lg">${price}</span></p>
                </div>
                <p>{description.slice(0, 80)}...</p>
                <div className="flex justify-between text-sm font-medium">
                    <p>Brand: <span className="badge badge-info">{brand}</span></p>
                    <p>Category: <span className="badge text-[#921A40] bg-[#e6c0cc]">{category}</span></p>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;