import {
    getDashboardStats,
    getMonthlyRevenue,
} from "../../services/adminService";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import {
    FaBox,
    FaShoppingCart,
    FaUsers,
    FaRupeeSign,
} from "react-icons/fa";

import {
    useEffect,
    useState,
} from "react";

function DashboardHome() {

    const [stats,
        setStats] =
        useState({
            totalProducts: 0,
            totalOrders: 0,
            totalUsers: 0,
            totalRevenue: 0,
        });
    const [revenueData,
        setRevenueData] =
        useState([]);

    useEffect(() => {

        fetchStats();
        fetchRevenue();

    }, []);

    const fetchRevenue =
        async () => {

            try {

                const { data } =
                    await getMonthlyRevenue();

                setRevenueData(
                    data.revenueData
                );

            } catch (error) {

                console.log(error);

            }

        };

    const fetchStats =
        async () => {

            try {

                const { data } =
                    await getDashboardStats();

                setStats(data);

            } catch (error) {

                console.log(error);

            }

        };

    const dashboardCards = [
        {
            title: "Products",
            value:
                stats.totalProducts,
            icon: <FaBox />,
            color: "primary",
        },
        {
            title: "Orders",
            value:
                stats.totalOrders,
            icon: <FaShoppingCart />,
            color: "success",
        },
        {
            title: "Users",
            value:
                stats.totalUsers,
            icon: <FaUsers />,
            color: "warning",
        },
        {
            title: "Revenue",
            value:
                `₹${stats.totalRevenue}`,
            icon: <FaRupeeSign />,
            color: "danger",
        },
    ];

    return (

        <div className="container-fluid">

            {/* Welcome Banner */}

            <div
                className="card border-0 shadow-lg mb-4"
                style={{
                    borderRadius: "20px",
                    background:
                        "linear-gradient(135deg,#210944,#08264c)",
                }}
            >
                <div className="card-body text-white d-flex justify-content-between align-items-center">

                    <div>

                        <h2 className="fw-bold">
                            Dashboard Overview
                        </h2>

                        <p className="mb-0">
                            Monitor products, orders, users & revenue
                        </p>

                    </div>

                    <span className="badge bg-light text-dark fs-6">
                        Revenue ₹{stats.totalRevenue}
                    </span>

                </div>
            </div>

            {/* Stats Cards */}

            <div className="row g-4 mb-4">

                {dashboardCards.map(
                    (item, index) => (

                        <div
                            key={index}
                            className="col-md-6 col-xl-3"
                        >

                            <div className="card border-0 shadow-lg">

                                <div className="card-body">

                                    <div className="d-flex justify-content-between align-items-center">

                                        <div>

                                            <h6 className="text-muted">
                                                {item.title}
                                            </h6>

                                            <h2 className="fw-bold">
                                                {item.value}
                                            </h2>

                                        </div>

                                        <div
                                            style={{
                                                fontSize: "35px",
                                                color: "#210944",
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                )}

            </div>

            {/* Analytics Row */}

            <div className="row g-4">

                <div className="col-lg-8">

                    <div className="card border-0 shadow-lg">

                        <div
                            className="card-header text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#210944,#08264c)",
                            }}
                        >
                            <h5 className="m-0">
                                Revenue Analytics
                            </h5>
                        </div>

                        <div className="card-body">

                            <ResponsiveContainer
                                width="100%"
                                height={350}
                            >
                                <LineChart
                                    data={revenueData}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis dataKey="month" />

                                    <YAxis />

                                    <Tooltip />

                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#210944"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

                <div className="col-lg-4">

                    <div className="card border-0 shadow-lg">

                        <div
                            className="card-header text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#210944,#08264c)",
                            }}
                        >
                            <h5 className="m-0">
                                Quick Statistics
                            </h5>
                        </div>

                        <div className="card-body">

                            <div className="list-group list-group-flush">

                                <div className="list-group-item d-flex justify-content-between">
                                    <span>Total Users</span>
                                    <strong>
                                        {stats.totalUsers}
                                    </strong>
                                </div>

                                <div className="list-group-item d-flex justify-content-between">
                                    <span>Total Orders</span>
                                    <strong>
                                        {stats.totalOrders}
                                    </strong>
                                </div>

                                <div className="list-group-item d-flex justify-content-between">
                                    <span>Total Revenue</span>
                                    <strong>
                                        ₹{stats.totalRevenue}
                                    </strong>
                                </div>

                                <div className="list-group-item d-flex justify-content-between">
                                    <span>Total Products</span>
                                    <strong>
                                        {stats.totalProducts}
                                    </strong>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default DashboardHome;