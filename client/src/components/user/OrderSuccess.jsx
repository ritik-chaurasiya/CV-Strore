import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function OrderSuccess() {
    return (
        <>
            <Navbar />

            <div
                className="container d-flex justify-content-center align-items-center"
                style={{
                    minHeight: "80vh",
                }}
            >
                <div
                    className="card border-0 shadow-lg text-center p-5"
                    style={{
                        maxWidth: "650px",
                        width: "100%",
                        borderRadius: "20px",
                    }}
                >
                    <div
                        className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-circle"
                        style={{
                            width: "100px",
                            height: "100px",
                            background: "#d4edda",
                            fontSize: "50px",
                        }}
                    >
                        ✅
                    </div>

                    <h1
                        className="fw-bold mb-3"
                        style={{
                            color: "#210944",
                        }}
                    >
                        Order Confirmed!
                    </h1>

                    <p className="text-muted fs-5 mb-4">
                        Thank you for shopping with us.
                        Your order has been placed successfully
                        and will be processed shortly.
                    </p>

                    <div
                        className="bg-light rounded p-3 mb-4"
                    >
                        <h6 className="text-muted mb-2">
                            Order ID
                        </h6>

                        <h5 className="fw-bold">
                            #CV{Date.now()}
                        </h5>
                    </div>

                    <div className="row g-3">

                        <div className="col-md-6">

                            <Link
                                to="/userproducts"
                                className="btn btn-outline-dark w-100 py-2"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                        <div className="col-md-6">

                            <Link
                                to="/"
                                className="btn text-white w-100 py-2"
                                style={{
                                    background:
                                        "linear-gradient(135deg,#210944,#08264c)",
                                }}
                            >
                                Back To Home
                            </Link>

                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}

export default OrderSuccess;