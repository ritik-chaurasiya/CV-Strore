import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function Cart() {

    const [cartItems, setCartItems] =
        useState([]);
    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    const cartKey =
        user
            ? `cart_${user.id}`
            : "guest_cart";

    useEffect(() => {

        // console.log("USER =", user);

        // console.log("CART KEY =", cartKey);

        // console.log(
        //     "LOCAL STORAGE CART =",
        //     localStorage.getItem(cartKey)
        // );

        const cart =
            JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

        console.log("CART ITEMS =", cart);

        setCartItems(cart);

    }, []);

    const removeItem = (id) => {

        const updatedCart = cartItems.filter(
            (item) => item._id !== id
        );

        setCartItems(updatedCart);

        localStorage.setItem(
            cartKey,
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    const totalPrice = cartItems.reduce(
        (acc, item) =>
            acc + item.price * item.quantity,
        0
    );

    const increaseQty = (id) => {

        const updatedCart = cartItems.map((item) =>
            item._id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                }
                : item
        );

        setCartItems(updatedCart);

        localStorage.setItem(
            cartKey,
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };
  
    const decreaseQty = (id) => {

        const updatedCart = cartItems.flatMap((item) => {

            if (item._id !== id) {
                return [item];
            }

            if (item.quantity > 1) {
                return [{
                    ...item,
                    quantity: item.quantity - 1,
                }];
            }

            return [];
        });

        setCartItems(updatedCart);

        localStorage.setItem(
            cartKey,
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    const navigate = useNavigate();

    // console.log("USER =", user);
    // console.log("CART KEY =", cartKey);
    // console.log(
    //     "LOCAL STORAGE CART =",
    //     localStorage.getItem(cartKey)
    // );

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">
                    Shopping Cart
                </h2>

                {cartItems.length === 0 ? (
                    <h4>Your cart is empty</h4>
                ) : (
                    <>
                        {cartItems.map((item) => (

                            <div
                                key={item._id}
                                className="card mb-3"
                            >
                                <div className="card-body d-flex align-items-center">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width="80"
                                        height="80"
                                        style={{
                                            objectFit:
                                                "contain",
                                        }}
                                    />

                                    <div className="ms-3 flex-grow-1">

                                        <h5 className="fw-bold">
                                            {item.name}
                                        </h5>

                                        <p className="mb-1 text-success fw-semibold">
                                            ₹{item.price}
                                        </p>

                                        <div className="d-flex align-items-center gap-2">

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => decreaseQty(item._id)}
                                            >
                                                -
                                            </button>

                                            <span
                                                className="fw-bold"
                                                style={{
                                                    minWidth: "30px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                {item.quantity}
                                            </span>

                                            <button
                                                className="btn btn-outline-success btn-sm"
                                                onClick={() => increaseQty(item._id)}
                                            >
                                                +
                                            </button>

                                        </div>

                                        <p className="mt-2 mb-0 text-muted">
                                            Subtotal: ₹
                                            {item.price * item.quantity}
                                        </p>

                                    </div>

                                    <button
                                        className="btn btn-danger"
                                        onClick={() => removeItem(item._id)}
                                    >
                                        Remove
                                    </button>

                                </div>
                            </div>

                        ))}

                        <div className="text-end">

                            <h3>
                                Total: ₹{totalPrice}
                            </h3>

                                <button
                                    className="btn btn-success"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Checkout
                                </button>

                        </div>

                    </>
                )}

            </div>

            <Footer />
        </>
    );
}

export default Cart;