import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://blog-project-5xqq.onrender.com/api/v1/forget/password", {
                email: email,
            });
            alert(res.data.message);
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">
                    Forget Password
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;
