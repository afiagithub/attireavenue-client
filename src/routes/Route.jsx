import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import Register from "../pages/Register";
import Login from "../pages/Login";
import AddProduct from "../pages/AddProduct";
import PrivateRoute from "../protected/PrivateRoute";
import About from "../pages/About";

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
            },
            {
                path: '/about',
                element: <PrivateRoute><About></About></PrivateRoute>
            }
        ]
    },
]);

export default router;