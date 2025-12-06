import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.username || !input.email || !input.password) {
            alert("All fields are required!");
            return;
        }

        try {
            const res = await axios.post(
                "https://blog-project-5xqq.onrender.com/api/v1/user/register",
                input,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            alert(res.data.message);
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4 text-primary">SIGN UP HERE</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            name="username"
                            value={input.username}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Link to="/login" className="fw-semibold text-primary">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
