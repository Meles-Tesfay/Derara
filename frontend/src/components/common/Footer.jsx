import React from "react";
import {
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import logo from "../../assets/image.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0a] text-gray-400 py-20 px-6 overflow-hidden border-t border-white/5">
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-900 z-0" />

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col items-start space-y-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-12 w-auto">
              <img
                src={logo}
                alt="Derara Logo"
                className="h-full object-contain"
              />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">
              Derara<span className="text-red-500">.</span>
            </span>
          </Link>
          <p className="leading-relaxed text-sm lg:text-base max-w-xs">
            Connecting the world with the rich heritage of Ethiopian coffee. We
            prioritize sustainable farming, fair trade, and exceptional quality
            in every bean we provide.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
            Explore
          </h3>
          <ul className="space-y-4">
            {[
              "Our Origins",
              "Green Coffee",
              "Roasted Beans",
              "Sustainability",
              "Wholesale",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-red-500 hover:translate-x-2 transition-all duration-300 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
            Contact Us
          </h3>
          <ul className="space-y-4 text-sm lg:text-base">
            <li>
              <a
                href="tel:+251911000000"
                className="hover:text-red-500 transition-colors block"
              >
                +251 911 00 00 00
              </a>
            </li>
            <li>
              <a
                href="mailto:info@derarabusiness.com"
                className="hover:text-red-500 transition-colors block"
              >
                info@derarabusiness.com
              </a>
            </li>
            <li>
              <span className="block mt-2">
                Bole Sub City, Woreda 03
                <br />
                Addis Ababa, Ethiopia
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
            Stay Connected
          </h3>
          <p className="text-sm mb-6">
            Join our newsletter for origin trips, harvest updates, and market
            insights.
          </p>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              required
              className="w-full bg-white/5 border border-white/10 p-4 text-white rounded-lg focus:outline-none focus:border-red-500 focus:bg-white/10 placeholder-gray-600 transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm gap-6">
        <div>
          &copy; {new Date().getFullYear()} Derara Business. All rights
          reserved.
        </div>

        <div className="flex gap-6">
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-xl hover:text-red-500 hover:-translate-y-1 transition-all duration-300"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-xl hover:text-red-500 hover:-translate-y-1 transition-all duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-xl hover:text-red-500 hover:-translate-y-1 transition-all duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="text-xl hover:text-red-500 hover:-translate-y-1 transition-all duration-300"
          >
            <FaFacebookF />
          </a>
        </div>

        <div className="flex gap-8">
          <a href="#" className="hover:text-red-500 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
