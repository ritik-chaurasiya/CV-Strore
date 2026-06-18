import Navbar from "./Navbar";
// import { Link } from "react-router-dom";/
import {
    FaTruck,
    FaShieldAlt,
    FaHeadset,
    FaUndo,
} from "react-icons/fa";
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import { useState } from "react";

function UserDashboardHome() {
    const [category, setCategory] = useState("");
    return (
        <>
            <Navbar />
            <Hero />
            <Categories
                setCategory={setCategory}
                activeCategory={category}
            />
            <FeaturedProducts
                category={category}
            />

            {/* Why Choose Us */}

            <section className="bg-light py-5">
                <div className="container">

                    <h2 className="text-center fw-bold mb-5">
                        Why Choose Us
                    </h2>

                    <div className="row g-4">

                        <div className="col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm text-center h-100">
                                <div className="card-body">
                                    <FaTruck
                                        size={40}
                                        className="mb-3 text-primary"
                                    />
                                    <h5>Fast Delivery</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm text-center h-100">
                                <div className="card-body">
                                    <FaShieldAlt
                                        size={40}
                                        className="mb-3 text-success"
                                    />
                                    <h5>Secure Payment</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm text-center h-100">
                                <div className="card-body">
                                    <FaHeadset
                                        size={40}
                                        className="mb-3 text-warning"
                                    />
                                    <h5>24/7 Support</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm text-center h-100">
                                <div className="card-body">
                                    <FaUndo
                                        size={40}
                                        className="mb-3 text-danger"
                                    />
                                    <h5>Easy Returns</h5>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}

export default UserDashboardHome;