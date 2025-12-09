import React from "react";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Premium Arabica Roast",
    price: "$24.99",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400&h=400",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Organic Green Beans",
    price: "$18.50",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&q=80&w=400&h=400",
    tag: "New Arrival",
  },
  {
    id: 3,
    name: "Ethiopian Yirgacheffe",
    price: "$29.00",
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400&h=400",
    tag: "Signature",
  },
  {
    id: 4,
    name: "Espresso Blend",
    price: "$22.00",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400&h=400",
    tag: "Popular",
  },
  {
    id: 5,
    name: "Cold Brew Kit",
    price: "$35.00",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b5c73312?auto=format&fit=crop&q=80&w=400&h=400",
    tag: "Limited",
  },
];

const ProductCard = ({ product }) => (
  <div className="w-[300px] md:w-[320px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-red-500/50 hover:shadow-2xl hover:bg-white/10 transition-all duration-500 flex-shrink-0 relative">
    {/* Image Container */}
    <div className="h-64 overflow-hidden relative">
      <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
        {product.tag}
      </span>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300 z-0" />
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
      />
    </div>

    {/* Content */}
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
          {product.name}
        </h3>
      </div>

      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < Math.floor(product.rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
        <span className="text-gray-400 text-xs ml-2">({product.rating})</span>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <Link
          to="/products"
          className="text-white text-sm font-semibold hover:text-red-400 transition-colors flex items-center group/btn"
        >
          Details{" "}
          <ArrowRight
            size={16}
            className="ml-1 transform group-hover/btn:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  </div>
);

const Productroll = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 border-y border-white/5 relative overflow-hidden">
      {/* Style for the slow roll animation */}
      <style>
        {`
          @keyframes scroll-slow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-slow {
            animation: scroll-slow 60s linear infinite;
          }
        `}
      </style>

      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row items-end justify-between">
        <div className="text-left">
          <h2 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-2 animate-fade-in-up">
            Our Products
          </h2>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Collections
            </span>
          </h1>
        </div>
        <Link
          to="/products"
          className="hidden md:flex items-center space-x-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-300 group"
        >
          <span>View All Products</span>
          <ArrowRight
            size={18}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* Rolling Container */}
      <div className="w-full overflow-hidden mask-linear-gradient-wide">
        <div className="flex animate-scroll-slow whitespace-nowrap group hover:[animation-play-state:paused] py-10">
          {/* First Set */}
          <div className="flex space-x-8 mx-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Duplicate Set 1 */}
          <div className="flex space-x-8 mx-4">
            {products.map((product) => (
              <ProductCard key={`${product.id}-dup1`} product={product} />
            ))}
          </div>

          {/* Duplicate Set 2 (Extra width for large screens) */}
          <div className="flex space-x-8 mx-4">
            {products.map((product) => (
              <ProductCard key={`${product.id}-dup2`} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-center mt-8">
        <Link
          to="/products"
          className="flex items-center space-x-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-red-600 hover:border-red-600 transition-all duration-300"
        >
          <span>View All Products</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

export default Productroll;
