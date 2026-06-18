import { FaSignOutAlt, } from "react-icons/fa";

import { Link, Outlet, } from "react-router-dom";


function AdminDashboard() {

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("role");

        window.location.href =
            "/admin/login";
    };

    return (
        <div className="container-fluid p-0">

            {/* Mobile Sidebar */}
            <div
                className="offcanvas offcanvas-start text-white"
                tabIndex="-1"
                id="adminSidebar"
                style={{
                    background:
                        "linear-gradient(180deg,#210944,#08264c)",
                }}
            >
                <div className="offcanvas-header">
                    <h4 className="fw-bold">
                        CV Admin
                    </h4>

                    <button
                        type="button"
                        className="btn-close btn-close-white"
                        data-bs-dismiss="offcanvas"
                    ></button>
                </div>

                <div className="offcanvas-body">
                    <ul className="list-unstyled">

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard"
                                className="text-white text-decoration-none"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/products"
                                className="text-white text-decoration-none"
                            >
                                Products
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/orders"
                                className="text-white text-decoration-none"
                            >
                                Orders
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/users"
                                className="text-white text-decoration-none"
                            >
                                Users
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/revenue"
                                className="text-white text-decoration-none"
                            >
                                Revenue
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="row g-0">

                {/* Desktop Sidebar */}
                <div
                    className="d-none d-md-block col-md-2 text-white p-4"
                    style={{
                        minHeight: "100vh",
                        background:
                            "linear-gradient(180deg,#210944,#08264c)",
                    }}
                >
                    <h3 className="fw-bold mb-5">
                        CV Admin
                    </h3>

                    <ul className="list-unstyled">

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard"
                                className="text-white text-decoration-none"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/products"
                                className="text-white text-decoration-none"
                            >
                                Products
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/orders"
                                className="text-white text-decoration-none"
                            >
                                Orders
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/users"
                                className="text-white text-decoration-none"
                            >
                                Users
                            </Link>
                        </li>

                        <li className="mb-4">
                            <Link
                                to="/admin/dashboard/revenue"
                                className="text-white text-decoration-none"
                            >
                                Revenue
                            </Link>
                        </li>

                    </ul>

                    <button
                        onClick={logout}
                        className="btn btn-danger mt-5"
                    >
                        <FaSignOutAlt />
                        {" "}Logout
                    </button>
                </div>

                {/* Main Content */}
                <div className="col-md-10 bg-light">

                    <div className="bg-white shadow-sm p-3">

                        <div className="d-flex justify-content-between align-items-center">

                            <div className="d-flex align-items-center gap-3">

                                <button
                                    className="btn btn-dark d-md-none"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#adminSidebar"
                                >
                                    ☰
                                </button>

                                <h3 className="fw-bold m-0">
                                    CV Admin Dashboard
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="p-4">
                        <Outlet />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;