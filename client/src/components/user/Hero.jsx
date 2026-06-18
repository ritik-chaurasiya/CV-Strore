import { Link } from "react-router-dom";

function Hero() {
    return (
        <section
            className="py-5 overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg,#210944,#08264c)",
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
            }}
        >
            <div className="container">

                <div className="row align-items-center">

                    {/* Left Side */}

                    <div className="col-lg-6 text-center text-lg-start">

                        <span className="badge bg-warning text-dark px-3 py-2 mb-3">
                            New Collection 2026
                        </span>

                        <h1
                            className="fw-bold text-white mb-4"
                            style={{
                                fontSize:
                                    "clamp(2.5rem,5vw,4.8rem)",
                                lineHeight: "1.1",
                            }}
                        >
                            Shop Smarter,
                            <br />
                            Live Better
                        </h1>

                        <p
                            className="lead text-light mb-4"
                            style={{
                                maxWidth: "550px",
                            }}
                        >
                            Discover premium electronics,
                            fashion, books and accessories
                            with secure payments and
                            lightning-fast delivery.
                        </p>

                        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">

                            <Link
                                to="/userproducts"
                                className="btn btn-warning btn-lg px-4 fw-bold"
                            >
                                Shop Now
                            </Link>

                            <Link
                                to="/signup"
                                className="btn btn-outline-light btn-lg px-4"
                            >
                                Join Now
                            </Link>

                        </div>

                        {/* Stats */}

                        <div className="row mt-5 text-center text-lg-start">

                            <div className="col-4">
                                <h3 className="fw-bold text-warning">
                                    10K+
                                </h3>
                                <small className="text-light">
                                    Customers
                                </small>
                            </div>

                            <div className="col-4">
                                <h3 className="fw-bold text-warning">
                                    500+
                                </h3>
                                <small className="text-light">
                                    Products
                                </small>
                            </div>

                            <div className="col-4">
                                <h3 className="fw-bold text-warning">
                                    99%
                                </h3>
                                <small className="text-light">
                                    Satisfaction
                                </small>
                            </div>

                        </div>

                    </div>

                    {/* Right Side */}

                    <div className="col-lg-6 mt-5 mt-lg-0">

                        <div className="position-relative">

                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
                                alt="Shopping"
                                className="img-fluid rounded-4 shadow-lg"
                            />

                            {/* Floating Card 1 */}

                            <div
                                className="
                                    d-none
                                    d-md-block
                                    position-absolute
                                    bg-white
                                    shadow
                                    rounded-4
                                    p-3
                                "
                                style={{
                                    top: "20px",
                                    left: "-20px",
                                }}
                            >
                                <h6 className="mb-0">
                                    🚚 Free Delivery
                                </h6>
                            </div>

                            {/* Floating Card 2 */}

                            <div
                                className="
                                    d-none
                                    d-md-block
                                    position-absolute
                                    bg-white
                                    shadow
                                    rounded-4
                                    p-3
                                "
                                style={{
                                    bottom: "20px",
                                    right: "-20px",
                                }}
                            >
                                <h6 className="mb-0">
                                    ⭐ 4.9 Customer Rating
                                </h6>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;