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
    const [crit, setCrit] = useState('');

    const axiosPublic = useAxiosPublic();
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', currentPage, itemsPerPage, crit],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-clothes?criteria=${crit}&page=${currentPage}&size=${itemsPerPage}`)
            setAllProducts(res.data);
        },
        refetchOnWindowFocus: false,
    })

    const { data: productCount = {}, isLoading: testLoading } = useQuery({
        queryKey: ['product-count'],
        queryFn: async () => {
            const res = await axiosPublic.get('/product-count')
            // console.log(res.data);
            return res.data
        },
        refetchOnWindowFocus: false,
    })

    const { count } = productCount;
    const noOfPages = Math.ceil(count / itemsPerPage);
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

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <div className="">
                    <select onChange={handleSort} className="p-3 text-[#921A40] font-semibold border-2 border-[#921A40] 
                hover:text-[#921A40] hover:bg-transparent hover:border-[#921A40] rounded-lg">
                        <option selected disabled>Filter</option>
                        <option value="1">Lowest Price to Highest</option>
                        <option value="2">Highest Price to Lowest</option>
                        <option value="3">Newest first</option>
                    </select>
                </div>
                <form onSubmit={handleSearch} className="flex flex-row gap-4 items-center justify-end mr-5 md:mr-10 mb-5 md:mb-8">
                    <input type="text" name="name" placeholder="Search" className="input input-bordered w-48 md:w-auto" />
                    <button className="btn bg-[#47CCC8] text-white border-2 border-[#47CCC8] 
                hover:border-[#47CCC8] hover:bg-transparent hover:text-[#47CCC8]">Search</button>
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
                        className={currentPage === page ? 'btn border-2 bg-[#47CCC8] text-white border-[#47CCC8]'
                            : 'btn border-2 border-[#47CCC8] bg-transparent text-[#47CCC8]'}>
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