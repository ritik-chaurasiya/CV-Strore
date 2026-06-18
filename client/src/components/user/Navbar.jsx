import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";

function Navbar() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const cartKey =
        user
            ? `cart_${user.id}`
            : "guest_cart";

    const cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];

    const [cartCount,
        setCartCount] =
        useState(0);

    useEffect(() => {

        const updateCartCount = () => {
            const cart =
                JSON.parse(
                    localStorage.getItem(cartKey)
                ) || [];

            const totalItems = cart.reduce(
                (acc, item) => acc + item.quantity,
                0
            );

            setCartCount(totalItems);
        };

        updateCartCount();

        window.addEventListener(
            "cartUpdated",
            updateCartCount
        );
        window.dispatchEvent(
            new Event("cartUpdated")
        );

        return () => {

            window.removeEventListener(
                "cartUpdated",
                updateCartCount
            );

        };

    }, [cartKey]);

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/login");

    };

    const wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

    const wishlistCount =
        wishlist.length;

    return (

        <nav
            className="navbar navbar-dark shadow-sm"
            style={{
                background:
                    "linear-gradient(135deg,#210944,#08264c)",
            }}
        >

            <div className="container-fluid">

                {/* Top Row */}

                <div className="w-100 d-flex justify-content-between align-items-center">

                    <Link
                        className="navbar-brand fw-bold fs-4"
                        to="/user/dashboard"
                    >
                        CV Store
                    </Link>

                    <div className="d-flex align-items-center gap-2 flex-shrink-0">

                        {/* Cart */}

                        <Link
                            to="/cart"
                            className="btn btn-light position-relative rounded-circle"
                        >

                            <FaShoppingCart />

                            {cartCount > 0 && (

                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                >
                                    {cartCount}
                                </span>

                            )}

                        </Link>

                        <Link
                            to="/wishlist"
                            className="btn btn-light position-relative"
                        >
                            ❤️

                            {wishlistCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>

                        {/* Profile */}

                      

                        {token ? (

                            <div className="dropdown">
                                <div className="dropdown">

                                    <button
                                        className="btn p-0 border-0 bg-transparent"
                                        data-bs-toggle="dropdown"
                                    >
                                        <img
                                            src={
                                                user?.profilePhoto ||
                                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            }
                                            alt="Profile"
                                            width="45"
                                            height="45"
                                            className="rounded-circle border border-3 border-light shadow"
                                        />
                                    </button>

                                    <ul
                                        className="dropdown-menu dropdown-menu-end border-0 shadow-lg p-2"
                                        style={{
                                            width: "280px",
                                            borderRadius: "15px",
                                        }}
                                    >

                                        {/* User Info */}

                                        <li className="px-3 py-2">

                                            <div className="d-flex align-items-center">

                                                <img
                                                    src={
                                                        user?.profilePhoto ||
                                                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                                    }
                                                    alt="Profile"
                                                    width="55"
                                                    height="55"
                                                    className="rounded-circle me-3"
                                                />

                                                <div>

                                                    <h6 className="mb-0 fw-bold">
                                                        {user?.name}
                                                    </h6>

                                                    <small className="text-muted">
                                                        {user?.email}
                                                    </small>

                                                </div>

                                            </div>

                                        </li>

                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>
                                            <Link
                                                className="dropdown-item py-2"
                                                to="/userprofile"
                                            >
                                                👤 My Profile
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className="dropdown-item py-2"
                                                to="/my-orders"
                                            >
                                                📦 My Orders
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className="dropdown-item py-2"
                                                to="/cart"
                                            >
                                                🛒 My Cart
                                            </Link>
                                        </li>

                                        <li>
                                            <Link
                                                className="dropdown-item py-2"
                                                to="/contact"
                                            >
                                                🎧 Support
                                            </Link>
                                        </li>


                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li className="px-2 pb-2">

                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={logout}
                                            >
                                                Logout
                                            </button>

                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item py-2"
                                                to="/admin/login"
                                            >
                                                🔐 Admin Panel
                                            </Link>
                                        </li>


                                    </ul>

                                </div>
                            </div>

                        ) : (

                            <div className="d-flex gap-2">

                                {/* <Link
                                    to="/login"
                                    className="btn btn-light btn-sm"
                                >
                                    Login
                                </Link> */}

                                <Link
                                    to="/signup"
                                    className="btn btn-warning btn-sm"
                                >
                                    Sign Up
                                </Link>

                            </div>

                        )}


                    </div>

                </div>

                {/* Scroll Menu */}
                
                <div className="w-100 mt-2">

                    {/* Mobile */}

                    <div
                        className="
            d-flex
        d-md-none
        flex-wrap
        justify-content-center
        gap-2
        "
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >

                        <Link className="nav-link text-white px-3" to="/">
                            Home
                        </Link>

                        <Link className="nav-link text-white px-3" to="/userproducts">
                            Products
                        </Link>

                        <Link className="nav-link text-white px-3" to="/my-orders">
                            Orders
                        </Link>

                        <Link className="nav-link text-white px-3" to="/contact">
                            Contact
                        </Link>

                        <Link className="nav-link text-white px-3" to="/about">
                            About
                        </Link>

                    </div>

                    {/* Tablet + Desktop */}

                    <div
                        className="
            d-none
            d-md-flex
            justify-content-center
            gap-4
        "
                    >

                        <Link className="nav-link text-white" to="/">
                            Home
                        </Link>

                        <Link className="nav-link text-white" to="/userproducts">
                            Products
                        </Link>

                        <Link className="nav-link text-white" to="/my-orders">
                            Orders
                        </Link>

                        <Link className="nav-link text-white" to="/contact">
                            Contact
                        </Link>

                        <Link className="nav-link text-white" to="/about">
                            About
                        </Link>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;