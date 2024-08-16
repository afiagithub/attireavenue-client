import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import PrivateRoute from "../protected/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <PrivateRoute><Home></Home></PrivateRoute>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/add-product',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            }
        ]
    },
]);

export default router;