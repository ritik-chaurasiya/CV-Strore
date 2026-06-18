import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserResetPassword() {

    const [password, setPassword] =
        useState("");

    const [confirmPassword,
        setConfirmPassword] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            password !==
            confirmPassword
        ) {

            return toast.warning(
                "Passwords do not match"
            );

        }

        try {

            const email =
                localStorage.getItem(
                    "resetEmail"
                );

            const otp =
                localStorage.getItem(
                    "resetOTP"
                );

            const { data } =
                await axios.post(
                    "http://localhost:5000/api/auth/reset-password",
                    {
                        email,
                        otp,
                        password,
                    }
                );

            toast.info(data.message);

            localStorage.removeItem(
                "resetEmail"
            );

            localStorage.removeItem(
                "resetOTP"
            );

            window.location.href =
                "/login";

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg,#210944,#08264c)",
            }}
        >

            <div
                className="card border-0 shadow-lg p-4"
                style={{
                    maxWidth: "450px",
                    width: "100%",
                    borderRadius: "20px",
                }}
            >

                <h2
                    className="text-center fw-bold mb-3"
                    style={{
                        color: "#250751",
                    }}
                >
                    Reset Password
                </h2>

                <p className="text-center text-muted mb-4">

                    Create a new secure password
                    for your account.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label fw-semibold">
                            New Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn w-100 text-white fw-bold"
                        style={{
                            background:
                                "linear-gradient(135deg,#300c65,#153d6f)",
                            border: "none",
                            padding: "12px",
                            borderRadius: "10px",
                        }}
                    >
                        Reset Password
                    </button>

                </form>

            </div>

        </div>
    );
}

export default UserResetPassword;