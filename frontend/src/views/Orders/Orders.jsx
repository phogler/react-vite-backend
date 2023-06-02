import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./Orders.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

const Orders = () => {
    const { token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        const res = await fetch("http://localhost:7777/api/orders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setOrders(data);
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusChange = async (e, orderId) => {
        const newStatus = Number(e.target.value);

        try {
            await fetch(`http://localhost:7777/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: newStatus,
                }),
            });
            await fetchAllOrders();
        } catch (error) {
            console.log("Error updating order status:", error);
        }
    };

    return !!token ? (
        <>
            <Navbar />
            <section className="order">
                <div className="content-container order-grid">
                    <div>
                        <div className="order-status-title">
                            <h1>Pending</h1>
                        </div>
                        <div>
                            {orders &&
                                orders
                                    .filter((order) => order.status.status === "pending")
                                    .map((order) => {
                                        return (
                                            <div key={order._id} className="order-card">
                                                <div className="order-card-user">
                                                    User: {order.user}
                                                    <select
                                                        name="status"
                                                        id="status"
                                                        onChange={(e) =>
                                                            handleStatusChange(e, order._id)
                                                        }>
                                                        <option value="1">Pending</option>
                                                        <option value="2">In Transit</option>
                                                        <option value="3">Delivered</option>
                                                    </select>
                                                </div>
                                                <Link to={order._id}>
                                                    <ul className="order-card-rows">
                                                        {order.orderRows.map((row) => {
                                                            return (
                                                                <li key={row.product?._id}>
                                                                    <p>Product: {row.product?.name}</p>
                                                                    <p>Price: {row.product?.price}kr</p>
                                                                    <p>Quantity: {row.quantity}</p>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </Link>
                                            </div>
                                        );
                                    })}
                        </div>
                    </div>
                    <div>
                        <div className="order-status-title">
                            <h1>In Transit</h1>
                        </div>
                        <div>
                            {orders &&
                                orders
                                    .filter((order) => order.status.status === "in transit")
                                    .map((order) => {
                                        return (
                                            <div key={order._id} className="order-card">
                                                <div className="order-card-user">
                                                    User: {order.user}
                                                    <select
                                                        name="status"
                                                        id="status"
                                                        onChange={(e) =>
                                                            handleStatusChange(e, order._id)
                                                        }>
                                                        <option value="2">In Transit</option>
                                                        <option value="3">Delivered</option>
                                                        <option value="1">Pending</option>
                                                    </select>
                                                </div>
                                                <Link to={order._id}>
                                                    <ul className="order-card-rows">
                                                        {order.orderRows.map((row) => {
                                                            return (
                                                                <li key={row.product?._id}>
                                                                    <p>Product: {row.product?.name}</p>
                                                                    <p>Price: {row.product?.price}kr</p>
                                                                    <p>Quantity: {row.quantity}</p>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </Link>
                                            </div>
                                        );
                                    })}
                        </div>
                    </div>
                    <div>
                        <div className="order-status-title">
                            <h1>Delivered</h1>
                        </div>
                        <div>
                            {orders &&
                                orders
                                    .filter((order) => order.status.status === "delivered")
                                    .map((order) => {
                                        return (
                                            <div key={order._id} className="order-card">
                                                <div className="order-card-user">
                                                    User: {order.user}
                                                    <select
                                                        name="status"
                                                        id="status"
                                                        onChange={(e) =>
                                                            handleStatusChange(e, order._id)
                                                        }>
                                                        <option value="3">Delivered</option>
                                                        <option value="2">In Transit</option>
                                                        <option value="1">Pending</option>
                                                    </select>
                                                </div>
                                                <Link to={order._id}>
                                                    <ul className="order-card-rows">
                                                        {order.orderRows.map((row) => {
                                                            return (
                                                                <li key={row.product?._id}>
                                                                    <p>Product: {row.product?.name}</p>
                                                                    <p>Price: {row.product?.price}kr</p>
                                                                    <p>Quantity: {row.quantity}</p>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </Link>
                                            </div>
                                        );
                                    })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    ) : (
        <Navigate to="/login" />
    );
};

export default Orders;
