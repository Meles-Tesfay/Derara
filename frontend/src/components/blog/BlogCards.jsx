import React from "react";
import { blogPosts } from "../../assets/assets";

const BlogCards = ({ blogs }) => {
    // If blogs is null/undefined (initial load), use static fallback (excluding top 3).
    // If blogs is [] (fetched empty), use empty array.
    const finalPosts = blogs || blogPosts.slice(3);

    const ReadMoreArrow = (
        <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );

    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">

            {/* Title */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-black text-[#D62828] uppercase tracking-widest" style={{ fontFamily: '"Orbitron", sans-serif' }}>
                    This Week <span className="text-black dark:text-white underline decoration-[#D62828] decoration-4 underline-offset-4">Hot</span> Blogs
                </h1>
                <p className="mt-4 text-gray-800 dark:text-gray-300 font-medium max-w-2xl mx-auto">
                    Stay updated with trending insights, fresh stories, and top Ethiopian coffee highlights.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
                {finalPosts.map((post) => {
                     // Normalize
                     const isDynamic = !!post._id; 
                     const title = isDynamic ? post.title : (post.smallTitle || post.title);
                     const description = isDynamic ? post.description : (post.smallDescription || post.description);
                     const imgSrc = isDynamic ? post.image : (post.smallImgSrc || post.imgSrc);
                     const href = isDynamic ? '#' : post.href;
                    
                     return (
                    <a
                        key={post.id || post._id}
                        className="group block rounded-xl overflow-hidden"
                        href={href}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                            <div className="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                                <img
                                    className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full"
                                    src={imgSrc}
                                    alt={title}
                                />
                            </div>

                            <div className="grow">
                                <h3 className="text-lg font-bold text-[#2D1B13] dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors line-clamp-2">
                                    {title}
                                </h3>

                                <p className="mt-3 text-base text-gray-700 dark:text-gray-300 font-medium leading-relaxed border-l-2 border-black dark:border-white pl-3 line-clamp-3">
                                    {description}
                                </p>

                                <p className="mt-4 inline-flex items-center gap-x-1 text-sm text-[#D62828] font-bold uppercase tracking-wider group-hover:text-black dark:group-hover:text-white transition-colors">
                                    Read more {ReadMoreArrow}
                                </p>
                            </div>
                        </div>
                    </a>
                )})}
            </div>
        </div>

    );
};

export default BlogCards;
