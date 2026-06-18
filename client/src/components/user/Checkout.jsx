import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { createOrder } from "../../services/orderService";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Checkout() {

    const navigate = useNavigate();
    
    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const cartKey =
        user
            ? `cart_${user.id}`
            : "guest_cart";

    const [cartItems, setCartItems] =
        useState([]);

    useEffect(() => {

        const savedCart =
            JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

        setCartItems(savedCart);

    }, [cartKey]);

    const totalPrice =
        cartItems.reduce(
            (acc, item) =>
                acc +
                item.price * item.quantity,
            0
        );

    const cart =
        JSON.parse(
            localStorage.getItem(cartKey)
        ) || [];
    console.log("CHECKOUT USER =", user);
    console.log("CHECKOUT CART KEY =", cartKey);
    console.log("CHECKOUT CART =", cart);

    const [shipping, setShipping] =
        useState({
            name: "",
            phone: "",
            address: "",
        });

    // const totalPrice = cart.reduce(
    //     (acc, item) =>
    //         acc +
    //         item.price * item.quantity,
    //     0
    // );

    const placeOrder = async () => {

        if (
            !shipping.name ||
            !shipping.phone ||
            !shipping.address
        ) {
            toast.warning(
                "Fill all fields"
            );
            return;
        }

        try {

            const orderData = {

                userId: user.id,

                name: shipping.name,

                email: user?.email,

                phone: shipping.phone,

                address: shipping.address,

                items: cart.map(
                    (item) => ({
                        productId: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                    })
                ),

                totalAmount: totalPrice,
            };

            await createOrder(
                orderData
            );

            localStorage.removeItem(cartKey);

            window.dispatchEvent(
                new Event(
                    "cartUpdated"
                )
            );

            navigate(
                "/order-success"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                "Order Failed"
            );
        }
    };

    console.log(localStorage.getItem("cart"));
    console.log(localStorage.getItem("guest_cart"));
    console.log(localStorage.getItem("user"));
    console.log(localStorage);

    return (
        <>
            <Navbar />

            <div
                className="container py-5"
                style={{
                    minHeight: "80vh",
                }}
            >

                <h2
                    className="fw-bold mb-4"
                    style={{
                        color: "#210944",
                    }}
                >
                    Checkout
                </h2>

                <div className="row g-4">

                    {/* Shipping Form */}

                    <div className="col-lg-8">

                        <div
                            className="card border-0 shadow-sm"
                            style={{
                                borderRadius: "20px",
                            }}
                        >
                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Shipping Details
                                </h4>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Full Name"
                                        value={shipping.name}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                name: e.target.value,
                                            })
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter Phone Number"
                                        value={shipping.phone}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                phone:
                                                    e.target.value,
                                            })
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Address
                                    </label>

                                    <textarea
                                        rows="4"
                                        className="form-control"
                                        placeholder="Enter Complete Address"
                                        value={shipping.address}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                address:
                                                    e.target.value,
                                            })
                                        }
                                    />

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Order Summary */}

                    <div className="col-lg-4">

                        <div
                            className="card border-0 shadow-sm"
                            style={{
                                borderRadius: "20px",
                            }}
                        >
                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Order Summary
                                </h4>

                                {cart.length === 0 ? (

                                    <p className="text-muted">
                                        Cart is Empty
                                    </p>

                                ) : (

                                    cart.map((item) => (

                                        <div
                                            key={item._id}
                                            className="d-flex justify-content-between mb-3"
                                        >

                                            <div>
                                                <h6 className="mb-0">
                                                    {item.name}
                                                </h6>

                                                <small className="text-muted">
                                                    Qty:
                                                    {" "}
                                                    {item.quantity}
                                                </small>
                                            </div>

                                            <strong>
                                                ₹
                                                {item.price *
                                                    item.quantity}
                                            </strong>

                                        </div>

                                    ))

                                )}

                                <hr />

                                <div className="d-flex justify-content-between mb-3">

                                    <h5 className="fw-bold">
                                        Total
                                    </h5>

                                    <h5
                                        className="fw-bold"
                                        style={{
                                            color:
                                                "#210944",
                                        }}
                                    >
                                        ₹{totalPrice}
                                    </h5>

                                </div>

                                <button
                                    className="btn w-100 text-white fw-bold py-3"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#210944,#08264c)",
                                        borderRadius:
                                            "12px",
                                    }}
                                    onClick={
                                        placeOrder
                                    }
                                    disabled={
                                        cart.length === 0
                                    }
                                >
                                    Place Order
                                </button>

                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Checkout;