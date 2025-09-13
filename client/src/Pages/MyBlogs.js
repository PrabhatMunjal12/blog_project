import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBlogs = async () => {
            try {
                const res = await axios.get("https://blog-project-1-5ih2.onrender.com/api/v1/get/all/myblogs", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log("My Blogs:", res.data);
                setBlogs(res.data.fetchAllMyBlogs); // directly set data
            } catch (error) {
                console.error("Error fetching my blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyBlogs();
    }, []);

    const handleDelete = async (blogId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(
                `https://blog-project-1-5ih2.onrender.com/api/v1/delete/blog/${blogId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log("Deleted:", res.data);

            // remove deleted blog from UI
            setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== blogId));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    return (
        <main className="my-5">
            <div className="container shadow-lg p-4">
                <section className="text-center">
                    <h2 className="mb-5 my-3 text-white bg-primary fw-bold">My Blogs</h2>

                    <div className="row g-4">
                        {loading ? (
                            <h2>Loading...</h2>
                        ) : blogs.length > 0 ? (
                            blogs.map((item) => (
                                <div
                                    className="col-lg-4 col-md-6 d-flex align-items-stretch"
                                    key={item._id}
                                >
                                    <div className="card h-100 shadow-sm">
                                        {/* Card Image */}
                                        {item.thumbnail && (
                                            <img
                                                src={`https://blog-project-1-5ih2.onrender.com/${item.thumbnail}`}
                                                alt={item.title}
                                                className="card-img-top"
                                            />
                                        )}

                                        {/* Card Body */}
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{item.title}</h5>
                                            <p className="card-text flex-grow-1">
                                                {item.description?.length > 100
                                                    ? item.description.substring(0, 100) + "..."
                                                    : item.description}
                                            </p>
                                            <div className="d-flex justify-content-between gap-2 mt-3">
                                                <Link
                                                    to={`/blog/${item._id}`}
                                                    className="btn btn-primary mt-auto"
                                                >
                                                    Read More
                                                </Link>
                                                <button
                                                    className="btn btn-danger mt-2"
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h3>No blogs found</h3>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default MyBlogs;
