import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserVerifyResetOTP() {

    const [otp, setOtp] =
        useState("");

    const email =
        localStorage.getItem(
            "resetEmail"
        );

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const { data } =
                await axios.post(
                    "http://localhost:5000/api/auth/verify-reset-otp",
                    {
                        email,
                        otp,
                    }
                );

            toast.info(data.message);

            localStorage.setItem(
                "resetOTP",
                otp
            );

            window.location.href =
                "/user-reset-password";

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Invalid OTP"
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
                    Verify OTP
                </h2>

                <p className="text-center text-muted mb-4">

                    Enter the 6-digit OTP
                    sent to your email.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label fw-semibold">
                            OTP Code
                        </label>

                        <input
                            type="text"
                            className="form-control text-center"
                            placeholder="Enter OTP"
                            maxLength="6"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
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
                        Verify OTP
                    </button>

                </form>

            </div>

        </div>
    );
}

export default UserVerifyResetOTP;