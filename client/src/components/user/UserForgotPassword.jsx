import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserForgotPassword() {

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const { data } =
        await axios.post(
          "http://localhost:5000/api/auth/forgot-password",
          { email }
        );

      toast.info(data.message);

      localStorage.setItem(
        "resetEmail",
        email
      );

      window.location.href =
        "/user-verify-reset-otp";

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
        className="card shadow border-0 p-4"
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
          Forgot Password
        </h2>

        <p className="text-center text-muted mb-4">

          Enter your registered email
          address and we'll send you
          an OTP to reset your password.

        </p>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
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
            Send OTP
          </button>

        </form>

      </div>

    </div>
  );
}

export default UserForgotPassword;