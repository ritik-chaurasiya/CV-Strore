import {
    useEffect,
    useState,
} from "react";

import {
    getRevenue,
} from "../../services/orderService";

function Revenue() {

    const [stats,
        setStats] =
        useState({
            topCustomers: [],
            recentOrders: [],
        });

    useEffect(() => {

        fetchRevenue();

    }, []);

    const fetchRevenue =
        async () => {

            try {

                const { data } =
                    await getRevenue();

                setStats(data);

            } catch (error) {

                console.log(error);

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

                <div className="card-body text-white">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <h2 className="fw-bold mb-1">
                                Revenue Analytics
                            </h2>

                            <p className="mb-0 opacity-75">
                                Business Performance Overview
                            </p>

                        </div>

                        <div>

                            <span className="badge bg-light text-dark fs-6 px-3 py-2">
                                Revenue Dashboard
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Stats Cards */}

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow-lg h-100">

                        <div className="card-body text-center">

                            <h6 className="text-muted text-uppercase">
                                Total Revenue
                            </h6>

                            <h1 className="fw-bold text-success mt-3">
                                ₹{stats.totalRevenue || 0}
                            </h1>

                            <small className="text-muted">
                                All Time Earnings
                            </small>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow-lg h-100">

                        <div className="card-body text-center">

                            <h6 className="text-muted text-uppercase">
                                Total Orders
                            </h6>

                            <h1 className="fw-bold text-primary mt-3">
                                {stats.totalOrders || 0}
                            </h1>

                            <small className="text-muted">
                                Orders Received
                            </small>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow-lg h-100">

                        <div className="card-body text-center">

                            <h6 className="text-muted text-uppercase">
                                Delivered
                            </h6>

                            <h1 className="fw-bold text-success mt-3">
                                {stats.deliveredOrders || 0}
                            </h1>

                            <small className="text-muted">
                                Successfully Delivered
                            </small>

                        </div>

                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="card border-0 shadow-lg h-100">

                        <div className="card-body text-center">

                            <h6 className="text-muted text-uppercase">
                                Pending
                            </h6>

                            <h1 className="fw-bold text-warning mt-3">
                                {stats.pendingOrders || 0}
                            </h1>

                            <small className="text-muted">
                                Awaiting Processing
                            </small>

                        </div>

                    </div>

                </div>

            </div>

            {/* Top Customers + Recent Revenue */}

            <div className="row mt-4 g-4">

                {/* Top Customers */}

                <div className="col-lg-6">

                    <div className="card border-0 shadow-lg h-100">

                        <div
                            className="card-header text-white fw-bold"
                            style={{
                                background:
                                    "linear-gradient(135deg,#210944,#08264c)",
                            }}
                        >
                            Top Customers
                        </div>

                        <div className="card-body">

                            {stats.topCustomers?.length > 0 ? (

                                stats.topCustomers.map(
                                    (
                                        customer,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="d-flex justify-content-between align-items-center border-bottom py-3"
                                        >

                                            <div>

                                                <h6 className="mb-0 fw-bold">
                                                    {customer.name}
                                                </h6>

                                                <small className="text-muted">
                                                    Customer
                                                </small>

                                            </div>

                                            <span className="badge bg-success fs-6">
                                                ₹{customer.amount}
                                            </span>

                                        </div>

                                    )
                                )

                            ) : (

                                <p className="text-muted text-center">
                                    No customer data available
                                </p>

                            )}

                        </div>

                    </div>

                </div>

                {/* Recent Revenue */}

                <div className="col-lg-6">

                    <div className="card border-0 shadow-lg h-100">

                        <div
                            className="card-header text-white fw-bold"
                            style={{
                                background:
                                    "linear-gradient(135deg,#210944,#08264c)",
                            }}
                        >
                            Recent Revenue Activity
                        </div>

                        <div className="card-body">

                            {stats.recentOrders?.length > 0 ? (

                                stats.recentOrders.map(
                                    (
                                        order
                                    ) => (

                                        <div
                                            key={order._id}
                                            className="d-flex justify-content-between align-items-center border-bottom py-3"
                                        >

                                            <div>

                                                <h6 className="mb-0 fw-bold">
                                                    {order.name}
                                                </h6>

                                                <small className="text-muted">
                                                    Order #
                                                    {order._id.slice(-6)}
                                                </small>

                                            </div>

                                            <div className="text-end">

                                                <h6 className="fw-bold text-primary mb-1">
                                                    ₹{order.totalAmount}
                                                </h6>

                                                <span
                                                    className={`badge ${order.orderStatus ===
                                                            "Delivered"
                                                            ? "bg-success"
                                                            : "bg-warning text-dark"
                                                        }`}
                                                >
                                                    {
                                                        order.orderStatus
                                                    }
                                                </span>

                                            </div>

                                        </div>

                                    )
                                )

                            ) : (

                                <p className="text-muted text-center">
                                    No recent orders found
                                </p>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Revenue;