import { useState } from "react";
import { signupUser } from "../services/authService";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signupUser(form);
            toast.info(res.data.message);
        } catch (err) {
            toast.error(err.response?.data?.message);
        }
    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #210944 0%, #310a71 40%, #08264c 100%)",
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="card shadow-lg border-0 p-4"
                style={{
                    maxWidth: "450px",
                    width: "100%",
                    borderRadius: "20px",
                    background: "white",
                }}
            >
                <h2
                    className="text-center fw-bold mb-4"
                    style={{ color: "#250751" }}
                >
                    Create Account 
                </h2>

                {/* <p className="text-center text-muted mb-4">
                    Join us and start your journey in CV
                </p> */}

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Create a password"
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value,
                            })
                        }
                    />
                </div>

                <button
                    type="submit"
                    className="btn w-100 text-white fw-bold"
                    style={{
                        background:
                            "linear-gradient(135deg, #300c65, #153d6f)",
                        border: "none",
                        padding: "12px",
                        borderRadius: "10px",
                    }}
                >
                    Create Account
                </button>

                <div className="d-flex align-items-center my-4">
                    <hr className="flex-grow-1" />
                    <span className="px-3 text-muted">OR</span>
                    <hr className="flex-grow-1" />
                </div>

                <button
                    type="button"
                    onClick={() =>
                        window.location.href =
                        "http://localhost:5000/api/auth/google"
                    }
                    className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                >
                    <FcGoogle size={24} />
                    Continue with Google
                </button>

                <p className="text-center mt-4 mb-0">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="fw-bold text-decoration-none"
                        style={{ color: "#250751" }}
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;