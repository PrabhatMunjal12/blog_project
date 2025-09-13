import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const SingleBlog = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchSingleBlog = async () => {
            const res = await axios.get(`https://blog-project-1-5ih2.onrender.com/api/v1/get/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            );
            // console.log(id);
            console.log(res.data);
            setBlog(res.data.fetchBlogByID);
        };
        fetchSingleBlog();
    }, [id]);
    return (
        <>
            <div className='container shadow my-3'>
                <div className='col-md-12 d-flex items-center justify-content-center bg-light'>
                    <div className='row'>
                        <h1 className='my-3'>{blog.title}</h1>
                        <img src={`https://blog-project-1-5ih2.onrender.com/${blog.thumbnail}`}
                            className='img img-responsive img-rounded my-3'
                            alt='' />
                        <p className='my-3'>{blog.description}</p>
                    </div>
                </div>
                <button onClick={() => navigate("/")} className='btn btn-primary'>Back To Post</button>
            </div>
        </>
    );
};

export default SingleBlog;

// import axios from "axios";
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const SingleBlog = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [blog, setBlog] = useState(null);
//     const [error, setError] = useState(null);

//     // ✅ Guard against double fetching in StrictMode
//     const hasFetched = useRef(false);

//     useEffect(() => {
//         const fetchSingleBlog = async () => {
//             try {
//                 console.log("Fetching blog with ID:", id);

//                 const res = await axios.get(
//                     `http://localhost:9000/api/v1/get/blog/${id}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     }
//                 );

//                 console.log("API Response:", res.data);

//                 setBlog(res.data.fetchBlogByID);
//             } catch (err) {
//                 console.error("Error fetching blog:", err);
//                 setError("Failed to load blog.");
//             }
//         };

//         // ✅ Run only once
//         if (!hasFetched.current) {
//             hasFetched.current = true;
//             fetchSingleBlog();
//         }
//     }, [id]);

//     if (error) {
//         return <h2 className="text-center text-danger">{error}</h2>;
//     }

//     if (!blog) {
//         return <h2 className="text-center my-5">Loading...</h2>;
//     }

//     return (
//         <div className="container shadow my-3">
//             <div className="col-md-12 d-flex items-center justify-content-center bg-light">
//                 <div className="row">
//                     <h1 className="my-3">{blog?.title}</h1>
//                     {blog?.thumbnail && (
//                         <img
//                             src={`http://localhost:9000/${blog.thumbnail}`}
//                             className="img img-responsive img-rounded my-3"
//                             alt={blog?.title}
//                         />
//                     )}
//                     <p className="my-3">{blog?.description}</p>
//                 </div>
//             </div>
//             <button onClick={() => navigate("/")} className="btn btn-primary">
//                 Back To Post
//             </button>
//         </div>
//     );
// };

// export default SingleBlog;
