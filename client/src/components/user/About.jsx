import { FaShoppingBag, FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
    return (
        <>
            <Navbar />

            <div className="container py-5">

                {/* Heading */}

                <div className="text-center mb-5">
                    <h1
                        className="fw-bold"
                        style={{
                            color: "#210944",
                        }}
                    >
                        About CV Store
                    </h1>

                    <p className="text-muted fs-5">
                        Your trusted destination for quality products at affordable prices.
                    </p>
                </div>

                {/* About Content */}

                <div className="row align-items-center g-5">

                    <div className="col-lg-6">

                        <img
                            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=1000"
                            alt="About Us"
                            className="img-fluid rounded shadow"
                        />

                    </div>

                    <div className="col-lg-6">

                        <h2 className="fw-bold mb-4">
                            Welcome to CV Store
                        </h2>

                        <p className="text-muted">
                            CV Store is a modern e-commerce platform designed to
                            provide customers with the best shopping experience.
                            We offer a wide range of products including electronics,
                            fashion, books, gaming accessories, groceries, and more.
                        </p>

                        <p className="text-muted">
                            Our goal is to deliver high-quality products,
                            secure payments, fast delivery, and excellent
                            customer support.
                        </p>

                    </div>

                </div>

                {/* Features */}

                <div className="row g-4 mt-5">

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                            <FaShoppingBag
                                size={50}
                                className="mx-auto mb-3"
                                color="#210944"
                            />

                            <h5 className="fw-bold">
                                Wide Range
                            </h5>

                            <p className="text-muted">
                                Thousands of products across multiple categories.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                            <FaTruck
                                size={50}
                                className="mx-auto mb-3"
                                color="#210944"
                            />

                            <h5 className="fw-bold">
                                Fast Delivery
                            </h5>

                            <p className="text-muted">
                                Quick and reliable delivery to your doorstep.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                            <FaShieldAlt
                                size={50}
                                className="mx-auto mb-3"
                                color="#210944"
                            />

                            <h5 className="fw-bold">
                                Secure Payment
                            </h5>

                            <p className="text-muted">
                                Safe and secure payment methods for every purchase.
                            </p>

                        </div>

                    </div>

                    <div className="col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100 text-center p-4">

                            <FaHeadset
                                size={50}
                                className="mx-auto mb-3"
                                color="#210944"
                            />

                            <h5 className="fw-bold">
                                24/7 Support
                            </h5>

                            <p className="text-muted">
                                Dedicated customer support whenever you need help.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            <Footer/>
        </>
    );
}

export default About;