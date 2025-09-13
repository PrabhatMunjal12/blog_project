// import React, { useState } from "react";
// import axios from "axios";
// import "../styles/login.css";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//     const navigate = useNavigate();
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//     });

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("https://blog-project-5xqq.onrender.com/api/v1/user/login", input);
//             alert(res.data.message);
//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem("username", res.data.name);
//             navigate("/");
//         } catch (error) {
//             alert(error.response?.data?.message || "Login failed!");
//         }
//     };

//     return (
//         <div
//             className="login-page d-flex justify-content-center align-items-center vh-100"
//             style={{
//                 backgroundImage:
//                     "url('https://source.unsplash.com/random/1920x1080/?technology')",
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 position: "relative",
//             }}
//         >
//             {/* Blur + Overlay */}
//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     bottom: 0,
//                     left: 0,
//                     backdropFilter: "blur(6px)", // main blur
//                     backgroundColor: "rgba(0,0,0,0.4)", // dim overlay
//                     zIndex: 1,
//                 }}
//             ></div>

//             {/* Login Card */}
//             <div
//                 className="card shadow p-4"
//                 style={{
//                     width: "400px",
//                     zIndex: 2, // ensures it's above the blur
//                 }}
//             >
//                 <h2 className="text-center mb-4 fw-bold text-primary">Login to your Account</h2>
//                 <form onSubmit={handleLogin}>
//                     {/* Email Input */}
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             name="email"
//                             value={input.email}
//                             onChange={(e) =>
//                                 setInput({ ...input, [e.target.name]: e.target.value })
//                             }
//                             id="email"
//                             placeholder="Enter your Email"
//                             required
//                         />
//                     </div>

//                     {/* Password Input */}
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             name="password"
//                             value={input.password}
//                             onChange={(e) =>
//                                 setInput({ ...input, [e.target.name]: e.target.value })
//                             }
//                             id="password"
//                             placeholder="Enter your Password"
//                             required
//                         />
//                     </div>
//                     <p className="text-center mt-2">
//                         <Link to={'/forget-password'}>Forget Password</Link>
//                     </p>

//                     {/* Submit Button */}
//                     <button type="submit" className="btn btn-primary w-100">
//                         Login
//                     </button>
//                 </form>
//                 <p className="text-center mt-3">
//                     Don't have an account?{""}
//                     <Link to={"/register"} className="fw-semibold text-primary">Register</Link >
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "https://blog-project-1-5ih2.onrender.com/api/v1/user/login",
                input
            );
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.name);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Login failed!");
        }
    };

    return (
        <div className="login-page d-flex justify-content-center align-items-center vh-100">
            {/* Login Card */}
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">
                    Login to your Account
                </h2>
                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={input.email}
                            onChange={(e) =>
                                setInput({ ...input, [e.target.name]: e.target.value })
                            }
                            id="email"
                            placeholder="Enter your Email"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={input.password}
                            onChange={(e) =>
                                setInput({ ...input, [e.target.name]: e.target.value })
                            }
                            id="password"
                            placeholder="Enter your Password"
                            required
                        />
                    </div>

                    <p className="text-center mt-2">
                        <Link to="/forget-password">Forget Password</Link>
                    </p>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>

                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <Link to="/register" className="fw-semibold text-primary">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
