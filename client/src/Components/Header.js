import axios from "axios";
import React from "react";
// import "./Header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        alert("Logout Success");
        navigate("/login");
    }

    const handleMyBlogs = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:9000/api/v1/get/all/myblogs`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(res.data.fetchAllMyBlogs);
            navigate('/my-blogs');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-fluid">
                {/* Brand Logo */}
                <Link className="navbar-brand text-white fw-bold" to="/">
                    CodeWithPrabhat
                </Link>

                {/* Mobile Toggle Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/add-blog">
                                Add Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white " to="/add-category">
                                Add Category
                            </Link>
                        </li>
                    </ul>

                    {/* Auth Buttons (UI only, no backend logic) */}
                    <div className="d-flex">
                        {token && token !== null ? (
                            <>
                                <button className="btn btn-primary">welcome: {username}</button>

                                <button onClick={handleMyBlogs} className="btn btn-primary">My Blogs</button>
                                <button onClick={handleLogout} className="btn bth-primary">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="btn btn-light me-2">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-light">Register</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
