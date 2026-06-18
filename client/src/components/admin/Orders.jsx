import {
    useEffect,
    useState,
} from "react";

import {
    getOrders,
    updateOrderStatus,
} from "../../services/orderService";

function Orders() {

    const [orders,
        setOrders] =
        useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders =
        async () => {

            try {

                const {
                    data,
                } =
                    await getOrders();

                setOrders(
                    data.orders
                );

            } catch (
            error
            ) {

                console.log(
                    error
                );

            }

        };

    const handleStatusChange =
        async (
            orderId,
            status
        ) => {

            try {

                await updateOrderStatus(
                    orderId,
                    status
                );

                fetchOrders();

            } catch (
            error
            ) {

                console.log(
                    error
                );

            }

        };

    return (
        <div className="container-fluid">

            {/* Header */}

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    borderRadius: "20px",
                    background:
                        "linear-gradient(135deg,#210944,#08264c)",
                }}
            >
                <div className="card-body text-white d-flex justify-content-between align-items-center flex-wrap">

                    <div>
                        <h2 className="fw-bold mb-1">
                            Orders Management
                        </h2>

                        <p className="mb-0 opacity-75">
                            Manage customer orders efficiently
                        </p>
                    </div>

                    <div className="mt-3 mt-md-0">
                        <span className="badge bg-light text-dark fs-6">
                            Total Orders: {orders.length}
                        </span>
                    </div>

                </div>
            </div>

            {/* Stats Cards */}

            <div className="row g-4 mb-4">

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px",
                        }}
                    >
                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Orders
                            </h6>

                            <h2 className="fw-bold">
                                {orders.length}
                            </h2>

                        </div>
                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px",
                        }}
                    >
                        <div className="card-body">

                            <h6 className="text-muted">
                                Revenue
                            </h6>

                            <h2 className="fw-bold text-success">
                                ₹
                                {orders.reduce(
                                    (acc, order) =>
                                        acc +
                                        order.totalAmount,
                                    0
                                )}
                            </h2>

                        </div>
                    </div>

                </div>

                <div className="col-md-4">

                    <div
                        className="card border-0 shadow-lg"
                        style={{
                            borderRadius: "20px",
                        }}
                    >
                        <div className="card-body">

                            <h6 className="text-muted">
                                Pending Orders
                            </h6>

                            <h2 className="fw-bold text-warning">
                                {
                                    orders.filter(
                                        (o) =>
                                            o.orderStatus ===
                                            "Pending"
                                    ).length
                                }
                            </h2>

                        </div>
                    </div>

                </div>

            </div>

            {/* Orders Table */}

            <div
                className="card border-0 shadow-lg"
                style={{
                    borderRadius: "20px",
                }}
            >

                <div
                    className="card-header text-white"
                    style={{
                        background:
                            "linear-gradient(135deg,#210944,#08264c)",
                    }}
                >
                    <h5 className="m-0 fw-bold">
                        Orders List
                    </h5>
                </div>

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead>

                                <tr>
                                    <th>Customer</th>
                                    <th>Phone</th>
                                    <th>Products</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {orders.map((order) => (

                                    <tr key={order._id}>

                                        <td className="fw-semibold">
                                            {order.name}
                                        </td>

                                        <td>
                                            {order.phone}
                                        </td>

                                        <td>
                                            {order.items?.length || 0}
                                        </td>

                                        <td>
                                            ₹{order.totalAmount}
                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${order.orderStatus ===
                                                        "Pending"
                                                        ? "bg-warning text-dark"
                                                        : order.orderStatus ===
                                                            "Delivered"
                                                            ? "bg-success"
                                                            : order.orderStatus ===
                                                                "Cancelled"
                                                                ? "bg-danger"
                                                                : "bg-primary"
                                                    }`}
                                            >
                                                {
                                                    order.orderStatus
                                                }
                                            </span>

                                        </td>

                                        <td>

                                            <select
                                                className="form-select shadow-sm border-0 fw-semibold"
                                                style={{
                                                    minWidth: "170px",
                                                    borderRadius: "12px",
                                                    backgroundColor:
                                                        order.orderStatus === "Pending"
                                                            ? "#fff3cd"
                                                            : order.orderStatus === "Processing"
                                                                ? "#cfe2ff"
                                                                : order.orderStatus === "Shipped"
                                                                    ? "#cff4fc"
                                                                    : order.orderStatus === "Delivered"
                                                                        ? "#d1e7dd"
                                                                        : "#f8d7da",
                                                }}
                                                value={order.orderStatus}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order._id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Processing">
                                                    Processing
                                                </option>

                                                <option value="Shipped">
                                                    Shipped
                                                </option>

                                                <option value="Delivered">
                                                    Delivered
                                                </option>

                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>

                                            </select>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Orders;