import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/home.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const res = await axios.get("https://blog-project-1-5ih2.onrender.com/api/v1/get/allblogs", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("Blogs from API:", res.data);
                setBlogs(res.data.fetchAllBlogs || []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchAllBlogs();
    }, []);

    return (
        <>
            <main className="my-5">
                <div className="container shadow-lg p-4">
                    <section className="text-center">
                        <h2 className="mb-5 my-3 fw-bold text-white bg-primary ">Latest Posts</h2>


                        <div className="row g-4">
                            {blogs && blogs.length > 0 ? (
                                blogs.map((item) => (
                                    <div
                                        className="col-lg-4 col-md-6 d-flex align-items-stretch"
                                        key={item._id || item.title}
                                    >
                                        <div className="card h-100 shadow-sm">
                                            {/* Card Image */}
                                            <img
                                                src={`https://blog-project-1-5ih2.onrender.com/${item.thumbnail}`}
                                                alt={item.title}
                                                className="card-img-top"
                                            />

                                            {/* Card Body */}
                                            <div className="card-body d-flex flex-column">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text flex-grow-1">
                                                    {item.description.length > 100
                                                        ? item.description.substring(0, 100) + "..."
                                                        : item.description}
                                                </p>
                                                <div className="d-flex justify-content-center mt-3">
                                                    <Link
                                                        to={`/blog/${item._id}`}
                                                        className="btn btn-primary mt-auto"
                                                    >
                                                        Read More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h2>Loading...</h2>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-primary text-lg-start">
                <div
                    className="text-center p-3 text-white fw-bold"
                    style={{ background: "rgba(0, 0, 0, 0.2)" }}
                >
                    © {new Date().getFullYear()} Copyright:
                    <a className="text-white mx-2" href="https://mdbootstrap.com/">
                        CodeWithPrabhat
                    </a>
                </div>
            </footer>
        </>
    );
};

export default Home;
