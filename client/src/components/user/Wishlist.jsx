import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Wishlist() {

    const [wishlist, setWishlist] =
        useState([]);

    useEffect(() => {

        const data =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        setWishlist(data);

    }, []);

    const removeFromWishlist = (id) => {

        const updated =
            wishlist.filter(
                (item) => item._id !== id
            );

        setWishlist(updated);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(updated)
        );
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <h2 className="fw-bold mb-4">
                    ❤️ My Wishlist
                </h2>

                {wishlist.length === 0 ? (

                    <div className="text-center py-5">
                        <h4>No items in wishlist</h4>
                    </div>

                ) : (

                    <div className="row g-4">

                        {wishlist.map((item) => (

                            <div
                                key={item._id}
                                className="col-md-4 col-lg-3"
                            >

                                <div className="card h-100 shadow-sm border-0">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="card-img-top p-3"
                                        style={{
                                            height: "220px",
                                            objectFit: "contain",
                                        }}
                                    />

                                    <div className="card-body d-flex flex-column">

                                        <h6 className="fw-bold">
                                            {item.name}
                                        </h6>

                                        <p className="text-muted">
                                            {item.category}
                                        </p>

                                        <h5 className="text-success fw-bold">
                                            ₹{item.price}
                                        </h5>

                                        <div className="mt-auto">

                                            <Link
                                                to={`/product/${item._id}`}
                                                className="btn btn-primary w-100 mb-2"
                                            >
                                                View Product
                                            </Link>

                                            <button
                                                className="btn btn-danger w-100"
                                                onClick={() =>
                                                    removeFromWishlist(item._id)
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <Footer />
        </>
    );
}

export default Wishlist;