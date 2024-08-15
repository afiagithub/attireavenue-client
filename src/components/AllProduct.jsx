import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SingleProduct from '../components/SingleProduct'
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const axiosPublic = useAxiosPublic();
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-clothes`)
            console.log(res.data);
            
            setAllProducts(res.data);
        },
        refetchOnWindowFocus: false,
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {
                allproducts.map(pr => <SingleProduct key={pr._id} pr={pr}></SingleProduct>)
            }
        </div>
    );
};

export default AllProduct;