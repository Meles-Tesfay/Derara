import React, { useState, useEffect } from "react";
import {
  Mountain,
  Droplets,
  Award,
  ArrowRight,
  X,
  Mail,
  ChevronLeft,
  Send,
  CheckCircle,
} from "lucide-react";
import yirgachafenatural from "../../assets/yirgachafenatural.png";
import yirgachafeWashed from "../../assets/yirgachafeWashed.png";
import sidamaWashed from "../../assets/sidamaWashed.png";
import sidamaImage from "../../assets/sidamma.jpg";
import limuWashed from "../../assets/limuWashed.png";
import gujiImage from "../../assets/guji.jpg";
import gujiNatural from "../../assets/gujiNatural.png";
import harrarImage from "../../assets/harrar.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

const Products = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/ops/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data.filter(p => p.isVisible !== false) : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  const coffeeProducts = products;

  return (
    <div className="Playfair Display relative min-h-screen bg-[#FDFCF8] dark:bg-[#0a0a0a] text-gray-900 dark:text-white selection:bg-red-500/30 overflow-hidden">
      {/* 🌟 Global Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none transform-gpu overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200/40 dark:bg-orange-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-200/40 dark:bg-red-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-green-200/40 dark:bg-green-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-amber-100/40 dark:bg-amber-900/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob" />
      </div>
      {/* 🌟 Hero Section */}
      <section className="relative py-32 px-6 md:px-20 text-center overflow-hidden">


        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase animate-fade-in-up">
            Our Collection
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-2xl">
            Ethiopia's Finest <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Green Coffee
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
            Sourced exclusively from the renowned high-altitude regions of
            Ethiopia. Each bean tells a story of heritage, soil, and sunlight.
          </p>
        </div>
      </section>

      {/* ☕ Product Grid Section */}
      <section className="relative z-10 py-10 px-6 md:px-20 max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {coffeeProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white dark:bg-white/5 rounded-3xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.region}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Header */}
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-playfair)]">
                    {product.region} {product.type.split(" ")[0]}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">
                    {product.region}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-200 text-base font-semibold leading-relaxed line-clamp-3 mb-6">
                  {product.short_desc}
                </p>

                {/* Flavor Profile Pills */}
                <div className="mt-auto flex flex-wrap gap-2 mb-6">
                  {product.profile.split(", ").map((flavor, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>

                {/* Request Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedProduct(product);
                  }}
                  className="w-full py-3 bg-[#B87333] text-white font-bold rounded-xl hover:bg-[#A55233] hover:shadow-[0_8px_25px_rgba(198,107,68,0.4)] hover:-translate-y-1 transition-all duration-300 active:scale-95 shadow-md"
                >
                  Interested ? Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 Final CTA Section */}
      <section className="relative z-10 py-32 px-6 text-center overflow-hidden mt-20">
        <div className="absolute inset-0 bg-red-900/5 dark:bg-red-900/5 bg-red-500/5 -skew-y-3 transform origin-bottom-right" />
        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Ready to Experience the Origin?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-400">
            Contact our sourcing team for current harvest availability, sample
            requests, and shipping logistics.
          </p>
          <button
            onClick={() => {
                if (isSignedIn) {
                    navigate('/dashboard');
                } else {
                    openSignIn({
                        afterSignInUrl: '/dashboard',
                        redirectUrl: '/dashboard'
                    });
                }
            }}
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-red-600 rounded-full hover:bg-red-700 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]"
          >
            Request Latest Offer Sheet
          </button>
        </div>
      </section>

      {/* 🟢 Product Logic Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-6xl h-[85vh] shadow-2xl animate-fade-in-up flex flex-col md:flex-row overflow-hidden">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setSelectedProduct(null);
              }}
              className="absolute top-4 right-4 z-10 p-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/3 relative h-64 md:h-full">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.region}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r" />
              <div className="absolute bottom-6 left-6 text-white md:hidden">
                <h3 className="text-3xl font-bold font-[family-name:var(--font-playfair)]">
                  {selectedProduct.region}
                </h3>
                <p className="opacity-90">{selectedProduct.type}</p>
              </div>
            </div>

            {/* Modal Content - Swappable */}
            <div className="w-full md:w-2/3 p-8 md:p-12 bg-white dark:bg-slate-900 overflow-y-auto relative">
              {!showForm ? (
                // 1. DETAIL VIEW
                <div className="flex flex-col h-full space-y-6 animate-fade-in-right">
                  <div className="hidden md:block">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-4xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-playfair)]">
                        {selectedProduct.region}
                      </h3>
                  {/*    <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-full">
                        <Award className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <span className="font-bold text-red-700 dark:text-red-300 text-sm">
                          {selectedProduct.score}
                        </span>
                      </div> */}
                    </div>
                    <p className="text-xl text-gray-500">
                      {selectedProduct.type}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      About this Coffee
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                      {selectedProduct.long_desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100 dark:border-white/10">
                  {/*    <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wilder">
                        Process
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedProduct.type}
                      </p>
                    </div>
                  <div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wilder">
                        Elevation
                      </span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedProduct.elevation}
                      </p>
                    </div> */}
                    <div className="col-span-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wilder">
                        Flavor Profile
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedProduct.profile
                          .split(", ")
                          .map((flavor, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-sm rounded-md"
                            >
                              {flavor}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2 mt-auto">
                    <button
                      type="button"
                      onClick={() => {
                        if (isSignedIn) {
                          navigate('/dashboard');
                        } else {
                          openSignIn({
                            afterSignInUrl: '/dashboard',
                            redirectUrl: '/dashboard'
                          });
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#C66B44] text-white font-bold rounded-xl hover:bg-[#A55233] hover:shadow-[0_10px_30px_rgba(198,107,68,0.4)] hover:-translate-y-1 transition-all duration-300 shadow-xl"
                    >
                      <Mail className="w-5 h-5" />
                      Submit Request
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProduct(null);
                      }}
                      className="px-8 py-4 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // 2. CONTACT FORM VIEW
                <div className="flex flex-col h-full animate-fade-in-left">
                  {/* Form Header */}
                  <div className="flex items-center gap-4 mb-8">
                    <button
                      onClick={() => setShowForm(false)}
                      className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Inquire about {selectedProduct.region}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>

                  {/* Success State */}
                  {formStatus === "success" ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
                      <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Request Sent!
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                          Thanks for your interest in our{" "}
                          {selectedProduct.region}. Our sourcing team will reach
                          out shortly.
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="mt-4 px-8 py-3 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white font-bold rounded-full hover:bg-gray-200"
                      >
                        Close Window
                      </button>
                    </div>
                  ) : (
                    /* The Form */
                    <form
                      onSubmit={handleFormSubmit}
                      className="flex-grow flex flex-col space-y-5"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Name
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Address
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="Shipping address"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Company <span className="opacity-50">(Opt)</span>
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all"
                            placeholder="Business name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 flex-grow">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Message
                        </label>
                        <textarea
                          required
                          rows="4"
                          defaultValue={`I'm interested in receiving a sample of the ${selectedProduct.region} ${selectedProduct.type}.`}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-[#1B4D3E]/50 outline-none transition-all resize-none h-full min-h-[120px]"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={formStatus === "submitting"}
                        className="w-full py-4 mt-auto bg-[#C66B44] text-white font-bold rounded-xl hover:bg-[#A55233] hover:shadow-[0_10px_30_rgba(198,107,68,0.4)] hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {formStatus === "submitting" ? (
                          "Sending Request..."
                        ) : (
                          <>
                            Send Request <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
