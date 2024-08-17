import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from '../components/SingleProduct'
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from 'sweetalert2'

const AllProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [prCount, setPrCount] = useState(0)
    const [crit, setCrit] = useState('');
    const [cat, setCat] = useState('');
    const [brand, setBrand] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const axiosPublic = useAxiosPublic();
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', currentPage, itemsPerPage, crit, cat, brand, minPrice, maxPrice],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-clothes?criteria=${crit}&page=${currentPage}&size=${itemsPerPage}&cat=${cat}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            setAllProducts(res.data);
        },
        refetchOnWindowFocus: false,
    })

    const { data: productCount = {}, isLoading: testLoading } = useQuery({
        queryKey: ['product-count', cat, brand, minPrice, maxPrice],
        queryFn: async () => {
            const res = await axiosPublic.get(`/product-count?cat=${cat}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
            setPrCount(res.data.count)
        },
        refetchOnWindowFocus: false,
    })

    // const { count } = productCount;
    const noOfPages = Math.ceil(prCount / itemsPerPage);
    const pages = [];
    for (let i = 0; i < noOfPages; i++) {
        pages.push(i)
    }

    const handleItemsPerPage = (e) => {
        const newPerPage = parseInt(e.target.value)
        setCurrentPage(0)
        setItemsPerPage(newPerPage)
        refetch()
    }

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const res = await axiosPublic.get(`/search-name?name=${name}`)
        if (res.data.success === false) {
            return Swal.fire({
                title: "Not Found",
                text: `No match found for ${name}`,
                icon: "error"
            });
        }
        setAllProducts(res.data);
    }

    const handleSort = async (e) => {
        const criteria = e.target.value;
        setCrit(criteria);
    }

    const handleFilter = async (e) => {
        e.preventDefault();
        const category = e.target.category.value;
        const brandData = e.target.brand.value;
        const min_price = e.target.min_price.value;
        const max_price = e.target.max_price.value;

        if (min_price && max_price) {
            console.log(min_price, max_price);
            setMinPrice(min_price)
            setMaxPrice(max_price)
        }
        setCat(category);
        setBrand(brandData);
        setCrit('');


    }

    return (
        <div>
            <div className="lg:w-4/5 lg:mx-auto mb-8 text-sm px-10 lg:px-0">
                <form onSubmit={handleFilter} className="flex flex-col lg:flex-row gap-4 items-center justify-end">
                    <div className="flex flex-row gap-5">
                        <select className="p-3 text-[#921A40] font-semibold border-2 border-[#921A40] 
                hover:text-[#921A40] hover:bg-transparent hover:border-[#921A40] rounded-lg" name="category">
                            <option selected disabled>Category</option>
                            <option value="Shirts">Shirts</option>
                            <option value="Pants">Pants</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Dresses">Dresses</option>
                            <option value="Shoes">Shoes</option>
                        </select>
                        <select className="p-3 text-[#921A40] font-semibold border-2 border-[#921A40] 
                hover:text-[#921A40] hover:bg-transparent hover:border-[#921A40] rounded-lg" name="brand">
                            <option selected disabled>Brand</option>
                            <option value="Fabrico">Fabrico</option>
                            <option value="VogueNest">VogueNest</option>
                            <option value="Silhouette">Silhouette</option>
                            <option value="Focalore">Focalore</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-5">
                        <input type="text" name="min_price" placeholder="Min. Price"
                            className="input input-bordered w-48 md:w-auto" />
                        <input type="text" name="max_price" placeholder="Max Price"
                            className="input input-bordered w-48 md:w-auto" />
                    </div>
                    <button className="btn bg-[#921A40] text-white border-2 border-[#921A40] 
                hover:border-[#921A40] hover:bg-transparent hover:text-[#921A40]">Filter</button>
                </form>
            </div>
            <div className="flex flex-row justify-between items-center mb-10 px-10 lg:px-4">
                <select onChange={handleSort} className="p-3 text-[#921A40] font-semibold border-2 border-[#921A40] 
                hover:text-[#921A40] hover:bg-transparent hover:border-[#921A40] rounded-lg">
                    <option selected disabled>Sort By</option>
                    <option value="1">Lowest Price to Highest</option>
                    <option value="2">Highest Price to Lowest</option>
                    <option value="3">Newest first</option>
                </select>
                <form onSubmit={handleSearch} className="flex flex-row gap-4 items-center justify-end">
                    <input type="text" name="name" placeholder="Search" className="input input-bordered w-48 md:w-auto" />
                    <button className="btn bg-[#921A40] text-white border-2 border-[#921A40] 
                hover:border-[#921A40] hover:bg-transparent hover:text-[#921A40]">Search</button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
                {
                    allproducts.map(pr => <SingleProduct key={pr._id} pr={pr}></SingleProduct>)
                }
            </div>
            <div className="mt-5 text-center flex flex-row gap-5 justify-center items-center">
                <button onClick={handlePrev} className="btn btn-outline">Prev</button>
                {
                    pages.map(page => <button
                        onClick={() => setCurrentPage(page)}
                        key={page}
                        className={currentPage === page ? 'btn border-2 bg-[#921A40] text-white border-[#921A40]'
                            : 'btn border-2 border-[#921A40] bg-transparent text-[#921A40]'}>
                        {page + 1}
                    </button>)
                }
                <button onClick={handleNext} className="btn btn-outline">Next</button>
                <select value={itemsPerPage} onChange={handleItemsPerPage} className="border-2 p-3 rounded-xl border-black">
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="18">18</option>
                </select>
            </div>
        </div>
    );
};

export default AllProduct;