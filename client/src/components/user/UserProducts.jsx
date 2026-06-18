import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
// import { BiCategory } from "react-icons/bi";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Categories from "./Categories";
import { toast } from "react-toastify";

function UserProducts() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] =
        useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [keyword, category, page]);

    const fetchProducts = async () => {
        try {
            const { data } = await getProducts(
                keyword,
                category,
                page
            );

            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

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


    useEffect(() => {

        const searchParam =
            new URLSearchParams(
                location.search
            ).get("search");

        if (searchParam) {

            setKeyword(searchParam);

        }

    }, [location.search]);

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

            <Categories setCategory={setCategory} activeCategory={category} />

            <div className="container py-5">

                {/* Page Title */}

                <div className="text-center mb-5">
                    <h1
                        className="fw-bold"
                        style={{
                            color: "#210944",
                        }}
                    >
                        All Products
                    </h1>
                </div>

                {/* Search & Filter */}

                <div className="card border-0 shadow-sm mb-5">
                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-12 col-lg-8">

                                <div className="input-group">

                                    <span
                                        className="input-group-text text-white"
                                        style={{
                                            background:
                                                "linear-gradient(135deg,#210944,#08264c)",
                                        }}
                                    >
                                        <FaSearch />
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search products..."
                                        value={keyword}
                                        onChange={(e) =>
                                            setKeyword(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* Products Grid */}

                <div className="row g-4">

                    {products.map((product) => (

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

                {/* Pagination */}

                <div className="d-flex justify-content-center mt-5">

                    <nav>
                        <ul className="pagination">

                            {[...Array(totalPages)].map(
                                (_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${page === index + 1
                                            ? "active"
                                            : ""
                                            }`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setPage(index + 1)
                                            }
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                )
                            )}

                        </ul>
                    </nav>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default UserProducts;