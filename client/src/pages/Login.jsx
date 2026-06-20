import { useState } from "react";
import { loginUser } from "../services/authService";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(form);

            console.log("Login Response:", res.data);

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            console.log(
                "Saved User:",
                localStorage.getItem("user")
            );

            navigate("/");

        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "Login Failed"
            );
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
                    backdropFilter: "blur(10px)",
                }}
            >
                <h2
                    className="text-center fw-bold mb-4"
                    style={{ color: "#250751" }}
                >
                    Welcome Back
                </h2>

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
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
                        placeholder="Enter your password"
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
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
                    Login
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
                        "https://cv-strore.onrender.com/api/auth/google"
                    }
                    className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                >
                    <FcGoogle size={24} />
                    Continue with Google
                </button>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="fw-bold text-decoration-none"
                        style={{ color: "#250751" }}
                    >
                        Sign Up
                    </a>
                </p>
                <div className="text-center mb-3">

                    <Link
                        to="/user-forgot-password"
                        className="text-decoration-none"
                        style={{
                            color: "#250751",
                            fontWeight: "600",
                        }}
                    >
                        Forgot Password?
                    </Link>
                    <p
                        className="text-muted"
                        style={{
                            fontSize: "14px",
                        }}
                    >
                        Enter your registered email address to receive a one-time verification code (OTP) and securely reset your password.
                    </p>

                </div>
            </form>
        </div>
    );
}

export default Login;