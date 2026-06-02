"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const fetchLocalBlogs = async () => {
    const res = await fetch(`/api/blogs`);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
};

const LatestBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            setLoading(true);
            try {
                const { edges } = await fetchLocalBlogs();

                setBlogs(edges.slice(0, 3));
            } catch (error) {
                console.error("Failed to load blogs", error);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    return (
        <section className="w-full bg-white py-16 md:py-24 px-6 lg:px-16 font-sans">
            <div className="w-full mx-auto">
                <h2 className="text-4xl md:text-[44px] font-extrabold text-[#0a0a0a] mb-14 tracking-tight">
                    Our Latest Blogs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-full w-full text-center py-20 text-gray-500">Loading blogs...</div>
                    ) : (
                        blogs.map((blog, index) => {
                            const post = blog.node;
                            const blogUrl = `/Blogs/${post.handle}`;
                            const imageUrl = post.image?.url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop";

                            return (
                                <Link
                                    href={blogUrl}
                                    key={post.id || index}
                                    className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/60 cursor-pointer"
                                >
                                    <div className="w-full h-[240px] bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={imageUrl}
                                            alt={post.image?.altText || post.title}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow p-6 md:p-8">
                                        <span className="text-[#8c8c8c] font-bold text-[15px] mb-4 uppercase">
                                            Dead Stock Blog
                                        </span>

                                        <h4 className="text-[22px] font-semibold text-[#1a1a1a] leading-snug mb-8 flex-grow group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h4>

                                        <div className="flex justify-between items-center mt-auto w-full">
                                            <span className="text-[#8CC63F] font-bold text-[15px] group-hover:text-[#7ab036] transition-colors">
                                                Read More
                                            </span>
                                            <span className="text-[#999999] font-medium text-[14px]">
                                                Published on : {new Date(post.publishedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
                <div className="flex justify-center mt-16 md:mt-20">
                    <Link href="/Blogs" className="border border-[#8CC63F] text-[#8CC63F] px-10 py-3 text-[14px] font-semibold rounded hover:bg-[#8CC63F] hover:text-white transition-all duration-300 uppercase tracking-widest cursor-pointer">
                        VIEW ALL
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestBlogs;