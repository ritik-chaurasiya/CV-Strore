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
        <section className="py-4 bg-light">

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
                        .slice(0, 60)
                        .map((product) => (

                           

                            <div
                                key={product._id}
                                className="col-4 col-md-3 col-lg-2 "
                            >

                                <div className="card h-100 shadow-sm border-0">

                                    {/* Product Image */}
                                    <div
                                        className="bg-white d-flex justify-content-center align-items-center p-2"
                                        style={{
                                            height: "120px",
                                        }}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="img-fluid"
                                            style={{
                                                maxHeight: "110px",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </div>

                                    <div className="card-body p-2 d-flex flex-column">

                                        {/* Product Name */}
                                        <h6
                                            className="fw-semibold m-1"
                                            style={{
                                                minHeight: "25px",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {product.name}
                                        </h6>

                                        {/* Price */}
                                        <div className="mb-1">

                                            <span
                                                className="fw-bold"
                                                style={{
                                                    fontSize: "14px",
                                                    color: "#210944",
                                                }}
                                            >
                                                ₹{product.price}
                                            </span>



                                        </div>

                                        {/* Stock */}
                                        <p className="mb-0">
                                            {product.stock > 0 ? (
                                                <span className="badge bg-success small">
                                                    In Stock ({product.stock})
                                                </span>
                                            ) : (
                                                <span className="badge bg-danger small">
                                                    Out Of Stock
                                                </span>
                                            )}
                                        </p>

                                        <button
                                            className="btn btn-sm w-100 mb-1"
                                            onClick={() => addToWishlist(product)}
                                        >
                                            ❤️
                                        </button>

                                        {/* Buttons */}
                                        <div className="mt-auto">

                                            {product.stock > 0 ? (
                                                <button
                                                    className="btn btn-warning btn-sm w-100 mb-1"
                                                    onClick={() => addToCart(product)}
                                                >
                                                    Add To Cart
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-danger btn-sm w-100 mb-1"
                                                    disabled
                                                >
                                                    Out Of Stock
                                                </button>
                                            )}

                                            <Link
                                                to={`/product/${product._id}`}
                                                className="btn btn-outline-primary btn-sm w-100"
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