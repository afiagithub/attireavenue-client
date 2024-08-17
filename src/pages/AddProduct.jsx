import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxiosPublic";
import aboutImg from '../../public/about.jpg'

const AddProduct = () => {
    const [startDate, setStartDate] = useState(new Date());
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();

    const handleAdd = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const brand = form.brand.value;
        const category = form.category.value;
        const price = Number(form.price.value);
        const ratings = Number(form.rate.value);
        const time = form.time.value;
        const image = form.image.value;
        const description = form.desc.value;

        const newProductData = {
            name,
            image,
            brand,
            category,
            price,
            ratings,
            product_creation_date: moment(startDate).format('YYYY-MM-DD'),
            product_creation_time: time,
            description
        }
        // console.log(newProductData);

        const res = await axiosPublic.post('/product', newProductData);
        if (res.data.insertedId) {
            Swal.fire({
                title: "Successful",
                text: "Added New Product",
                icon: "success"
            });
            navigate('/')
        }

    }
    return (
        <section className="mt-5 lg:mt-10">
            <Helmet>
                <title>AttireAvenue | Add Product</title>
            </Helmet>
            <div className="flex flex-col lg:flex-row justify-center min-h-screen">
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold font-ubuntu tracking-wider text-gray-800 capitalize ">
                            Add a Clothing Product
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Add a product, including details like name, brand, category, price, date of adding and descriptions,
                            to show the latest collections.
                        </p>

                        <form onSubmit={handleAdd} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Name</label>
                                <input name="name" type="text" placeholder="Enter Product Name"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Brand</label>
                                <input name="brand" type="text" placeholder="Enter Brand Name"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Category</label>
                                <input name="category" type="text" placeholder="Enter Category"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Price</label>
                                <input name="price" type="text" placeholder="Enter Price"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Rating</label>
                                <input name="rate" type="text" placeholder="Enter Price"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Photo URL</label>
                                <input name="image" placeholder="Enter image URL" type="url"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg " />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Date</label>
                                <DatePicker name="updatedDate"
                                    className='block w-full px-5 py-3 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg'
                                    selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 ">Creation Time (am/pm)</label>
                                <input name="time" type="text" placeholder="Enter Time"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                bg-white border border-gray-200 rounded-lg" />
                            </div>

                            <div className="col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 ">Description</label>
                                <textarea name="desc" rows={5} placeholder="Enter a short description"
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 
                                    bg-white border border-gray-200 rounded-lg"></textarea>
                            </div>
                            <button className="btn col-span-2 bg-[#921A40] text-white border-2 border-[#921A40] 
                    hover:border-[#921A40] hover:bg-transparent hover:text-[#921A40] text-lg">Add Product</button>
                        </form>
                    </div>
                </div>

                <div className="md:-ml-5 block lg:w-2/5">
                    <img className="h-32 lg:h-full w-full object-cover" src={aboutImg} alt="" />
                </div>
            </div>
        </section>
    );
};

export default AddProduct;