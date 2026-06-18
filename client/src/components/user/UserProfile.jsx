import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { uploadProfilePhoto } from "../../services/userService";
import { FaCamera } from "react-icons/fa";
import { getOrders } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserProfile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );
    console.log("User Data:", user);

    const [photo, setPhoto] = useState(user?.profilePhoto);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {

            const currentUser = JSON.parse(
                localStorage.getItem("user")
            );

            const { data } =
                await getOrders();

            const myOrders =
                data.orders.filter(
                    (order) =>
                        order.email ===
                        currentUser.email
                );

            setOrders(myOrders);

        } catch (error) {

            console.log(error);

        }
    };

    const totalSpent = orders.reduce(
        (acc, order) => acc + order.totalAmount,
        0
    );

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = cart.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const handlePhotoUpload = async (e) => {

        const file =
            e.target.files[0];

        if (!file) return;

        const formData =
            new FormData();

        formData.append(
            "image",
            file
        );

        try {

            const res =
                await uploadProfilePhoto(
                    user.id,
                    formData
                );

            setPhoto(
                res.data.profilePhoto
            );

            const updatedUser = {
                ...user,
                profilePhoto:
                    res.data.profilePhoto,
            };

            localStorage.setItem(
                "user",
                JSON.stringify(
                    updatedUser
                )
            );

            toast.successt(
                "Profile Photo Updated"
            );

        } catch (error) {

            console.log(error);

        }

    };

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-lg-9">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "25px",
                                overflow: "hidden",
                            }}
                        >

                            {/* Cover Banner */}

                            <div
                                style={{
                                    height: "220px",
                                    background:
                                        "linear-gradient(135deg,#210944,#08264c)",
                                }}
                            ></div>

                            <div className="card-body text-center">

                                {/* Profile Image */}

                                <div
                                    className="position-relative d-inline-block"
                                    style={{
                                        marginTop: "-100px",
                                    }}
                                >

                                    <img
                                        src={
                                            photo ||
                                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        }
                                        alt="Profile"
                                        width="180"
                                        height="180"
                                        className="rounded-circle shadow"
                                        style={{
                                            objectFit: "cover",
                                            border: "6px solid white",
                                        }}
                                    />

                                    <label
                                        className="btn btn-primary rounded-circle position-absolute"
                                        style={{
                                            bottom: "10px",
                                            right: "10px",
                                            width: "45px",
                                            height: "45px",
                                        }}
                                    >
                                        <FaCamera />

                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={handlePhotoUpload}
                                        />
                                    </label>

                                </div>

                                {/* User Info */}

                                <h2 className="fw-bold mt-4">
                                    {user?.name}
                                </h2>

                                <p className="text-muted">
                                    {user?.email}
                                </p>

                                <span className="badge bg-success px-3 py-2">
                                    Verified User
                                </span>

                                {/* Stats */}

                                {/* Stats */}

                                <div className="row mt-5 g-3">

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm">

                                            <div className="card-body text-center">

                                                <h2 className="fw-bold text-primary">
                                                    {orders.length}
                                                </h2>

                                                <p className="mb-0">
                                                    Total Orders
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm">

                                            <div className="card-body text-center">

                                                <h2 className="fw-bold text-success">
                                                    ₹{totalSpent}
                                                </h2>

                                                <p className="mb-0">
                                                    Total Spending
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-md-4">

                                        <div className="card border-0 shadow-sm">

                                            <div className="card-body text-center">

                                                <h2 className="fw-bold text-warning">
                                                    {cartCount}
                                                </h2>

                                                <p className="mb-0">
                                                    Cart Items
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Account Info */}

                                <div className="card border-0 bg-light mt-5">

                                    <div className="card-body text-start">

                                        <h4 className="fw-bold mb-4">
                                            Account Information
                                        </h4>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

                                                <small className="text-muted">
                                                    Full Name
                                                </small>

                                                <h6 className="fw-bold">
                                                    {user?.name}
                                                </h6>

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <small className="text-muted">
                                                    Email Address
                                                </small>

                                                <h6 className="fw-bold">
                                                    {user?.email}
                                                </h6>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Buttons */}

                                <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">

                                    <a
                                        href="/my-orders"
                                        className="btn btn-primary px-4 py-2"
                                    >
                                        My Orders
                                    </a>

                                    <button
                                        className="btn btn-outline-dark px-4 py-2"
                                        onClick={() =>
                                            navigate("/edit-profile")
                                        }
                                    >
                                        Edit Profile
                                    </button>

                                    <button
                                        className="btn btn-danger px-4 py-2"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("user");
                                            window.location.href = "/login";
                                        }}
                                    >
                                        Logout
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default UserProfile;