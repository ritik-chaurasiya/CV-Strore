import { useState } from "react";
import { verifyAdminOTP } from "../services/adminService";
import { toast } from "react-toastify";

function AdminVerifyOTP() {
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const email =
                localStorage.getItem("adminEmail");

            const res = await verifyAdminOTP({
                email,
                otp,
            });

            toast.info(res.data.message);

            window.location.href =
                "/admin/login";
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                "OTP Verification Failed"
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
                    className="text-center fw-bold mb-3"
                    style={{ color: "#250751" }}
                >
                    Verify OTP
                </h2>

                <p className="text-center text-muted mb-4">
                    Enter the OTP sent to your email
                </p>

                <div className="mb-3">
                    <label className="form-label fw-semibold">
                        OTP Code
                    </label>

                    <input
                        type="text"
                        className="form-control text-center"
                        placeholder="Enter 6 Digit OTP"
                        value={otp}
                        maxLength={6}
                        onChange={(e) =>
                            setOtp(e.target.value)
                        }
                        style={{
                            letterSpacing: "5px",
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}
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
                    Verify OTP
                </button>

                <p className="text-center mt-4">
                    Already verified?{" "}
                    <a
                        href="/admin/login"
                        className="fw-bold text-decoration-none"
                        style={{ color: "#250751" }}
                    >
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}

export default AdminVerifyOTP;