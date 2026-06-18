import { useEffect, useState } from "react";
import { cancelOrder, getOrders } from "../../services/orderService";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const { data } =
                await getOrders();

            const myOrders =
                data.orders.filter(
                    (order) =>
                        order.email === user.email
                );

            setOrders(myOrders);

        } catch (error) {

            console.log(error);

        }
    };

    const handleCancelOrder = async (id) => {

        try {

            await cancelOrder(id);

            toast.success(
                "Order Cancelled Successfully"
            );

            fetchOrders();

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to Cancel Order"
            );

        }
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">

                {/* Header */}

                <div
                    className="p-4 mb-4 rounded-4 text-white"
                    style={{
                        background:
                            "linear-gradient(135deg,#210944,#08264c)",
                    }}
                >
                    <h2 className="fw-bold mb-1">
                        My Orders
                    </h2>

                    <p className="mb-0">
                        Track your orders and delivery status
                    </p>
                </div>

                {/* Empty Orders */}

                {orders.length === 0 ? (

                    <div className="text-center py-5">

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            alt="No Orders"
                            width="120"
                        />

                        <h4 className="mt-3">
                            No Orders Yet
                        </h4>

                        <p className="text-muted">
                            Start shopping to see your orders here.
                        </p>

                    </div>

                ) : (

                    orders.map((order) => (

                        <div
                            key={order._id}
                            className="card border-0 shadow-sm mb-4"
                            style={{
                                borderRadius: "20px",
                            }}
                        >
                            <div className="card-body p-4">

                                {/* Order Header */}

                                <div className="d-flex justify-content-between align-items-center flex-wrap">

                                    <div>

                                        <p className="text-muted mb-1">
                                            Order ID
                                        </p>

                                        <h6 className="fw-bold">
                                            #{order._id.slice(-8)}
                                        </h6>

                                    </div>

                                    <div className="text-end">

                                        <span
                                            className={`badge px-3 py-2 ${order.orderStatus === "Pending"
                                                ? "bg-warning text-dark"
                                                : "bg-success"
                                                }`}
                                        >
                                            {order.orderStatus}
                                        </span>

                                        <p className="text-muted small mt-2 mb-0">
                                            Ordered On:
                                            {" "}
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                </div>

                                <hr />

                                {/* Products */}

                                {order.items.map((item, index) => (

                                    <div
                                        key={index}
                                        className="d-flex align-items-center mb-3"
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            width="90"
                                            height="90"
                                            className="border rounded p-2"
                                            style={{
                                                objectFit: "contain",
                                            }}
                                        />

                                        <div className="ms-3 flex-grow-1">

                                            <h6 className="fw-bold mb-1">
                                                {item.name}
                                            </h6>

                                            <p className="text-muted mb-1">
                                                Quantity:
                                                {" "}
                                                {item.quantity}
                                            </p>

                                            <h6
                                                className="fw-bold"
                                                style={{
                                                    color: "#210944",
                                                }}
                                            >
                                                ₹{item.price}
                                            </h6>

                                        </div>

                                    </div>

                                ))}

                                <hr />

                                {/* Delivery Status */}

                                <div className="row text-center mb-4">

                                    <div className="col">
                                        <span className="badge bg-warning">
                                            Pending
                                        </span>
                                    </div>

                                    <div className="col">
                                        <span className="badge bg-info">
                                            Processing
                                        </span>
                                    </div>

                                    <div className="col">
                                        <span className="badge bg-primary">
                                            Shipped
                                        </span>
                                    </div>

                                    <div className="col">
                                        <span className="badge bg-success">
                                            Delivered
                                        </span>
                                    </div>

                                </div>

                                {/* Footer */}

                                <div className="row align-items-center">

                                    <div className="col-md-4">

                                        <small className="text-muted">
                                            Customer
                                        </small>

                                        <h6>
                                            {order.name}
                                        </h6>

                                    </div>

                                    <div className="col-md-4">

                                        <small className="text-muted">
                                            Phone
                                        </small>

                                        <h6>
                                            {order.phone}
                                        </h6>

                                    </div>

                                    <div className="col-md-4 text-md-end">

                                        <small className="text-muted">
                                            Total Amount
                                        </small>

                                        <h4
                                            className="fw-bold"
                                            style={{
                                                color: "#210944",
                                            }}
                                        >
                                            ₹{order.totalAmount}
                                        </h4>

                                    </div>

                                </div>

                                <div className="mt-4 d-flex gap-2 justify-content-end">

                                    <button className="btn btn-outline-primary">
                                        Track Order
                                    </button>

                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() =>
                                            handleCancelOrder(order._id)
                                        }
                                        disabled={
                                            order.orderStatus === "Cancelled" ||
                                            order.orderStatus === "Delivered"
                                        }
                                    >
                                        {order.orderStatus === "Cancelled"
                                            ? "Cancelled"
                                            : "Cancel Order"}
                                    </button>

                                </div>

                            </div>
                        </div>

                    ))

                )}

            </div>

            <Footer />
        </>
    );
}

export default MyOrders;