import { useState } from "react";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { toast } from "react-toastify";

import { sendMessage } from "../../services/contactService";

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const res = await sendMessage(form);

            toast.info(res.data.message);

            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to send message"
            );

        } finally {

            setLoading(false);

        }
    };

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
                        Contact Us
                    </h1>

                    <p className="text-muted fs-5">
                        We'd love to hear from you.
                        Get in touch with us.
                    </p>

                </div>

                <div className="row g-5">

                    {/* Contact Information */}

                    <div className="col-lg-5">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h3
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#210944",
                                    }}
                                >
                                    Get In Touch
                                </h3>

                                {/* Address */}

                                <div className="d-flex align-items-center mb-4">

                                    <div
                                        className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            background:
                                                "linear-gradient(135deg,#210944,#08264c)",
                                        }}
                                    >
                                        <FaMapMarkerAlt />
                                    </div>

                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            Address
                                        </h6>

                                        <p className="text-muted mb-0">
                                            Lucknow, India
                                        </p>

                                    </div>

                                </div>

                                {/* Phone */}

                                <div className="d-flex align-items-center mb-4">

                                    <div
                                        className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            background:
                                                "linear-gradient(135deg,#210944,#08264c)",
                                        }}
                                    >
                                        <FaPhoneAlt />
                                    </div>

                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            Phone
                                        </h6>

                                        <p className="text-muted mb-0">
                                            +91 9264975898
                                        </p>

                                    </div>

                                </div>

                                {/* Email */}

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            background:
                                                "linear-gradient(135deg,#210944,#08264c)",
                                        }}
                                    >
                                        <FaEnvelope />
                                    </div>

                                    <div>

                                        <h6 className="fw-bold mb-1">
                                            Email
                                        </h6>

                                        <p className="text-muted mb-0">
                                            support@cvstore.com
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Contact Form */}

                    <div className="col-lg-7">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h3
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#210944",
                                    }}
                                >
                                    Send Message
                                </h3>

                                <form onSubmit={handleSubmit}>

                                    <div className="row">

                                        <div className="col-md-6 mb-3">

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your Name"
                                                value={form.name}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />

                                        </div>

                                        <div className="col-md-6 mb-3">

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Your Email"
                                                value={form.email}
                                                onChange={(e) =>
                                                    setForm({
                                                        ...form,
                                                        email: e.target.value,
                                                    })
                                                }
                                                required
                                            />

                                        </div>

                                    </div>

                                    <div className="mb-3">

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Subject"
                                            value={form.subject}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    subject: e.target.value,
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <textarea
                                            className="form-control"
                                            rows="5"
                                            placeholder="Your Message"
                                            value={form.message}
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    message: e.target.value,
                                                })
                                            }
                                            required
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn text-white px-4"
                                        disabled={loading}
                                        style={{
                                            background:
                                                "linear-gradient(135deg,#210944,#08264c)",
                                        }}
                                    >
                                        {
                                            loading
                                                ? "Sending..."
                                                : "Send Message"
                                        }
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Contact;