import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer
            className="text-white pt-5"
            style={{
                background: "#0f172a",
            }}
        >
            <div className="container">

                <div className="row gy-5">

                    {/* Brand */}

                    <div className="col-lg-4">

                        <h2 className="fw-bold mb-3">
                            CV Store
                        </h2>

                        <p
                            className="text-light"
                            style={{
                                lineHeight: "1.8",
                            }}
                        >
                            Your trusted destination for
                            premium electronics, fashion,
                            books and accessories. Shop with
                            confidence, secure payments and
                            fast delivery.
                        </p>

                        <div className="d-flex gap-2 mt-4">

                            <button className="btn btn-outline-light rounded-circle">
                                <FaFacebookF />
                            </button>

                            <button className="btn btn-outline-light rounded-circle">
                                <FaInstagram />
                            </button>

                            <button className="btn btn-outline-light rounded-circle">
                                <FaTwitter />
                            </button>

                            <button className="btn btn-outline-light rounded-circle">
                                <FaLinkedinIn />
                            </button>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div className="col-6 col-md-4 col-lg-2">

                        <h5 className="fw-bold mb-4">
                            Quick Links
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-3">
                                <Link
                                    to="/"
                                    className="text-decoration-none text-light"
                                >
                                    Home
                                </Link>
                            </li>

                            <li className="mb-3">
                                <Link
                                    to="/userproducts"
                                    className="text-decoration-none text-light"
                                >
                                    Products
                                </Link>
                            </li>

                            <li className="mb-3">
                                <Link
                                    to="/my-orders"
                                    className="text-decoration-none text-light"
                                >
                                    Orders
                                </Link>
                            </li>

                            <li className="mb-3">
                                <Link
                                    to="/contact"
                                    className="text-decoration-none text-light"
                                >
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Customer Service */}

                    <div className="col-6 col-md-4 col-lg-3">

                        <h5 className="fw-bold mb-4">
                            Customer Service
                        </h5>

                        <ul className="list-unstyled">

                            <li className="mb-3">
                                Help Center
                            </li>

                            <li className="mb-3">
                                Return Policy
                            </li>

                            <li className="mb-3">
                                Shipping Info
                            </li>

                            <li className="mb-3">
                                FAQs
                            </li>

                        </ul>

                    </div>

                    {/* Contact */}

                    <div className="col-md-4 col-lg-3">

                        <h5 className="fw-bold mb-4">
                            Contact Us
                        </h5>

                        <p className="mb-3">

                            <FaMapMarkerAlt className="me-2" />

                            Gorakhpur, Uttar Pradesh

                        </p>

                        <p className="mb-3">

                            <FaPhoneAlt className="me-2" />

                            +91 9264975898

                        </p>

                        <p>

                            <FaEnvelope className="me-2" />

                            support@cvstore.com

                        </p>

                    </div>

                </div>

                {/* Bottom Bar */}

                <div className="border-top mt-5 pt-4 pb-4">

                    <div className="row">

                        <div className="col-md-6 text-center text-md-start">

                            <p className="mb-0 text-light">
                                © {new Date().getFullYear()} CV Store.
                                All Rights Reserved.
                            </p>

                        </div>

                        <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">

                            <span className="text-light me-3">
                                Privacy Policy
                            </span>

                            <span className="text-light">
                                Terms & Conditions
                            </span>

                        </div>

                    </div>

                </div>

            </div>
        </footer>
    );
}

export default Footer;