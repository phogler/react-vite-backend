import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import Login from "./views/Login/Login.jsx";
import Orders from "./views/Orders/Orders.jsx";
import "./App.css";
import ErrorPage from "./views/ErrorPage/ErrorPage.jsx";
import OrderDetails from "./views/OrderDetails/OrderDetails.jsx";
import Products from "./views/Products/Products.jsx";
import ProductDetails from "./views/ProductDetails/ProductDetails.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/orders",
        element: <Orders />,
    },
    {
        path: "/orders/:id",
        element: <OrderDetails />,
    },
    {
        path: "/products",
        element: <Products />,
    },
    {
        path: "/products/:id",
        element: <ProductDetails/>
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
