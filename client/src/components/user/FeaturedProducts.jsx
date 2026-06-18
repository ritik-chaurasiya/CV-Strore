import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FeaturedProducts({ category }) {

    const [products, setProducts] = useState([]);

    const token =
        localStorage.getItem("token");

    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts();

            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = category
        ? products.filter(
            (product) =>
                product.category
                    ?.toLowerCase()
                    .trim() ===
                category
                    ?.toLowerCase()
                    .trim()
        )
        : products;

    const addToCart = (product) => {

        if (product.stock <= 0) {
            toast.success("Product is out of stock");
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            toast.warning(
                "Please login first to add products to cart"
            );

            navigate("/login");

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
                (item) => item._id === product._id
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

        // console.log("USER =", user);
        // console.log("CART KEY =", cartKey);
        // console.log("CART DATA =", cart);

        toast.success("Product Added To Cart");
    };

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

        toast.error("Added to Wishlist");
    };

    return (
        <section className="py-5 bg-light">

            <div className="container">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2
                        className="fw-bold mb-0"
                        style={{
                            color: "#210944",
                        }}
                    >
                        {category
                            ? `${category} Products`
                            : "Featured Products"}
                    </h2>

                    <Link
                        to="/userproducts"
                        className="btn btn-outline-primary"
                    >
                        View All
                    </Link>

                </div>

                <div className="row g-4">

                    {filteredProducts
                        .slice(0, 8)
                        .map((product) => (

                            <div
                                key={product._id}
                                className="col-6 col-md-4 col-lg-3"
                            >

                                <div className="card h-100 border-0 shadow-sm">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="card-img-top p-3"
                                        style={{
                                            height: "220px",
                                            objectFit: "contain",
                                        }}
                                    />

                                    <div className="card-body d-flex flex-column">

                                        <h6
                                            className="fw-semibold"
                                            style={{
                                                minHeight: "48px",
                                            }}
                                        >
                                            {product.name}
                                        </h6>

                                        <p className="text-muted small mb-2">
                                            {product.category}
                                        </p>

                                        <h5
                                            className="fw-bold mb-3"
                                            style={{
                                                color: "#210944",
                                            }}
                                        >
                                            ₹{product.price}
                                        </h5>

                                        <p className="mb-3">
                                            {product.stock > 0 ? (
                                                <span className="badge bg-success">
                                                    In Stock ({product.stock})
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger">
                                                    Out Of Stock
                                                </span>
                                            )}
                                        </p>

                                        <div className="mt-auto">

                                            {product.stock > 0 ? (
                                                <button
                                                    className="btn btn-warning w-100 mb-2 fw-semibold"
                                                    onClick={() => addToCart(product)}
                                                >
                                                    Add To Cart
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-danger w-100 mb-2 fw-semibold"
                                                    disabled
                                                >
                                                    Out Of Stock
                                                </button>
                                            )}

                                            <button
                                                className="btn btn-outline-danger w-100 mb-2"
                                                onClick={() => addToWishlist(product)}
                                            >
                                                ❤️ Add To Wishlist
                                            </button>

                                            <Link
                                                to={`/product/${product._id}`}
                                                className="btn w-100 text-white"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg,#210944,#08264c)",
                                                }}
                                            >
                                                View Details
                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                </div>

                {filteredProducts.length === 0 && (

                    <div className="text-center py-5">

                        <h4 className="text-muted">
                            No Products Found
                        </h4>

                    </div>

                )}

            </div>

        </section>
    );
}

export default FeaturedProducts;