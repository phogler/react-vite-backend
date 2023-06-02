import { useContext, useEffect, useState } from "react";
import { NavLink, Navigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./OrderDetails.css";
import { AuthContext } from "../../context/AuthContext";
import capitalize from "../../utils/capitalize";

const OrderDetails = () => {
    const { token } = useContext(AuthContext);
    const { id: orderId } = useParams();

    const [orderDetails, setOrderDetails] = useState({});
    const [orderStatus, setOrderStatus] = useState("");

    const fetchOrderDetails = async () => {
        try {
            const res = await fetch(`http://localhost:7777/api/orders/${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setOrderDetails(data);
            setOrderStatus(getStatusByString(data.status?.status) || "");
        } catch (error) {
            console.log("Error fetching order details:", error);
        }
    };

    const updateOrderStatus = async (newStatus) => {
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
            await fetchOrderDetails();
        } catch (error) {
            console.log("Error updating order status:", error);
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = Number(e.target.value);
        setOrderStatus(newStatus);
        await updateOrderStatus(newStatus);
    };

    const getStatusByString = (status) => {
        switch (status) {
            case "pending":
                return 1;
            case "in transit":
                return 2;
            case "delivered":
                return 3;
            default:
                return "";
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId, token]);

    return !!token ? (
        <>
            <Navbar />
            <section className="order-details">
                <div className="content-container">
                    <NavLink className="back-button" to="/orders">
                        Back To Orders
                    </NavLink>
                    <div>
                        <div className="order-details">
                            <h1>Order Details - {orderDetails._id}</h1>
                        </div>
                        <div className="order-details-info">
                            <p>User - {orderDetails.user}</p>
                            <div className="order-details-status">
                                <p>Status - {capitalize(`${orderDetails.status?.status}`)}</p>
                                <select
                                    name="status"
                                    id="status"
                                    value={orderStatus}
                                    onChange={handleStatusChange}>
                                    <option value="1">Pending</option>
                                    <option value="2">In Transit</option>
                                    <option value="3">Delivered</option>
                                </select>
                            </div>
                        </div>
                        <div className="order-details-orders">
                            {orderDetails.orderRows?.map((order) => {
                                return (
                                    <div className="order-details-card" key={order._id}>
                                        <p>OrderID: {order?._id}</p>
                                        <p>Product: {order.product?.name}</p>
                                        <p>Product Quantity: {order?.quantity}</p>
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

export default OrderDetails;
