import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../services/productService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await getSingleProduct(id);

            console.log("Product Data:", data);

            setProduct(data.product);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
 
    const addToCart = () => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.warning("Please login first");
            navigate("/login");
            return;
        }

        if (product.stock <= 0) {
            toast.success("Out Of Stock");
            return;
        }

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        const cartKey =
            `cart_${user.id}`;

        const cart =
            JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

        const existingProduct =
            cart.find(
                (item) =>
                    item._id === product._id
            );

        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({
                ...product,
                quantity: 1,
            });

        }

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        toast.success("Product Added To Cart");
    };

    const navigate = useNavigate();


    const buyNow = () => {

        const token = localStorage.getItem("token");

        if (!token) {
            toast.warning("Please login first");
            navigate("/login");
            return;
        }

        if (product.stock <= 0) {
            toast.success("Out Of Stock");
            return;
        }

        const user =
            JSON.parse(
                localStorage.getItem("user")
            );

        const cartKey =
            `cart_${user.id}`;

        localStorage.setItem(
            cartKey,
            JSON.stringify([
                {
                    ...product,
                    quantity: 1,
                },
            ])
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        navigate("/checkout");
    };

    const submitReview = async () => {
        try {

            const token =
                localStorage.getItem("token");

            if (!token) {
                toast.warning("Please login first");
                return;
            }

            const res = await fetch(
                `https://cv-strore.onrender.com/api/products/${id}/review`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        rating,
                        comment,
                    }),
                }
            );

            const data = await res.json();

            toast.info(data.message);

            fetchProduct();

            setComment("");

        } catch (error) {

            console.log(error);

        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <h3>Loading...</h3>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center mt-5">
                <h3>Product Not Found</h3>
            </div>
        );
    }

    const addToWishlist = (product) => {
        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        const exists = wishlist.find(
            (item) => item._id === product._id
        );

        if (exists) {
            toast.success("Already in Wishlist");
            return;
        }

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        toast.success("Added to Wishlist");
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">

                <div className="row g-5">

                    {/* Product Image */}

                    <div className="col-lg-5">

                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-3">

                                <div
                                    className="d-flex justify-content-center align-items-center bg-white"
                                    style={{
                                        height: "400px",
                                    }}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="img-fluid"
                                        style={{
                                            maxHeight: "350px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </div>

                                <div className="row g-2 mt-3">

                                    <div className="col-6">

                                        <button
                                            className="btn btn-warning w-100 fw-bold py-3"
                                            disabled={product.stock <= 0}
                                            onClick={addToCart}
                                        >
                                             Add To Cart
                                        </button>

                                    </div>

                                    <div className="col-6">

                                        <button
                                            className="btn btn-danger w-100 fw-bold py-3"
                                            disabled={product.stock <= 0}
                                            onClick={buyNow}
                                        >
                                             Buy Now
                                        </button>

                                    </div>

                                    <div className="col-12">

                                        <button
                                            className="btn btn-outline-danger w-100"
                                            onClick={() => addToWishlist(product)}
                                        >
                                            ❤️ Add To Wishlist
                                        </button>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Product Info */}
                    <div className="col-lg-7">

                        <span
                            className={`badge px-3 py-2 mb-3 ${product.stock > 0
                                ? "bg-success"
                                : "bg-danger"
                                }`}
                        >
                            {product.stock > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                        </span>

                        <h1
                            className="fw-bold mb-2"
                        >
                            {product.name}
                        </h1>

                        <p className="text-muted mb-2">
                            {product.category}
                        </p>

                        <div className="d-flex align-items-center mb-3">
                            <h2
                                className="fw-bold mb-0 fs-2"
                                style={{ color: "#210944" }}
                            >
                                ₹{product.price}
                            </h2>
                        </div>

                        <div className="mb-4">

                            <span className="badge bg-success px-3 py-2 fs-6">
                                ★ {product.averageRating?.toFixed(1) || 0}
                            </span>

                            <small className="text-muted ms-2">
                                {product.numReviews} Ratings
                            </small>

                        </div>

                        <div className="card shadow-sm border-0 mb-4">

                            <div className="card-body">

                                <h5 className="fw-bold mb-3">
                                    Description
                                </h5>

                                <p className="text-muted">
                                    {product.description}
                                </p>

                            </div>

                        </div>

                        <div className="row g-3">

                            <div className="col-md-6">

                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{
                                        borderRadius: "15px",
                                    }}
                                >
                                    <div className="card-body">

                                        <h6 className="text-muted">
                                            Category
                                        </h6>

                                        <h5 className="fw-bold">
                                            {product.category}
                                        </h5>

                                    </div>
                                </div>

                            </div>

                            <div className="col-md-6">

                                <div
                                    className="card border-0 shadow-sm"
                                    style={{
                                        borderRadius: "15px",
                                    }}
                                >
                                    <div className="card-body">

                                        <h6 className="text-muted">
                                            Available Stock
                                        </h6>

                                        <h5
                                            className={
                                                product.stock > 0
                                                    ? "text-success fw-bold"
                                                    : "text-danger fw-bold"
                                            }
                                        >
                                            {product.stock}
                                        </h5>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div> 

                <div className="row g-5 mt-5">

                    {/* Review Section */}
                    <div className="col-lg-5" >
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">

                                <h5 className="fw-bold mb-4">
                                    Write a Review
                                </h5>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Rating
                                    </label>

                                    <select
                                        className="form-select"
                                        value={rating}
                                        onChange={(e) =>
                                            setRating(e.target.value)
                                        }
                                    >
                                        <option value="5">
                                            ⭐⭐⭐⭐⭐ Excellent
                                        </option>

                                        <option value="4">
                                            ⭐⭐⭐⭐ Very Good
                                        </option>

                                        <option value="3">
                                            ⭐⭐⭐ Good
                                        </option>

                                        <option value="2">
                                            ⭐⭐ Fair
                                        </option>

                                        <option value="1">
                                            ⭐ Poor
                                        </option>

                                    </select>

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Comment
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Share your experience..."
                                        value={comment}
                                        onChange={(e) =>
                                            setComment(e.target.value)
                                        }
                                    />

                                </div>

                                <button
                                    className="btn btn-primary fw-bold py-3 w-100"
                                    onClick={submitReview}
                                >
                                    Submit Review
                                </button>

                            </div>
                        </div>
                    </div>

                    {/* Customer Reviews */}
                    <div className="col-lg-7">
                        <div className="mt-3">

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">

                                <h3 className="fw-bold">
                                    Customer Reviews
                                </h3>

                                <div className="text-md-end">

                                    <h4 className="text-warning mb-0">
                                        ⭐ {product.averageRating?.toFixed(1) || 0}
                                    </h4>

                                    <small className="text-muted">
                                        {product.numReviews} Reviews
                                    </small>

                                </div>

                            </div>

                            {product.reviews?.length === 0 ? (

                                <div className="alert alert-light border">
                                    No Reviews Yet
                                </div>

                            ) : (

                                product.reviews.map((review, index) => (

                                    <div
                                        key={index}
                                        className="card border-0 shadow-sm mb-3" style={{ borderRadius: "15px" }}
                                    >
                                        <div className="card-body">

                                            <div className="d-flex flex-column flex-md-row justify-content-between">

                                                <div>
                                                    <h6 className="fw-bold mb-1">
                                                        👤 {review.name}
                                                    </h6>

                                                    <small className="text-muted">
                                                        Verified Customer
                                                    </small>
                                                </div>

                                                <span className="badge bg-success px-3 py-2">
                                                    ★ {review.rating}
                                                </span>

                                            </div>

                                            <hr />

                                            <p className="text-muted mb-0">
                                                {review.comment}
                                            </p>

                                        </div>
                                    </div>

                                ))

                            )}

                        </div>
                    </div>

                </div>

            </div>    

            <Footer />
        </>
    );
}

export default ProductDetails;