import React, { useEffect } from "react";
import LatestBlog from "../../components/blog/LatestBlogCard";
import BlogCards from "../../components/blog/BlogCards";

export default function Blog() {
     useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-slate-900 dark:to-black bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 dark:text-white">
            <LatestBlog />
            <BlogCards />
        </div>
    );
}
