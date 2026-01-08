import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";


const ContactUsPage = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Pre-fill subject from navigation state
  useEffect(() => {
    if (location.state?.subject) {
      setFormData((prev) => ({ ...prev, subject: location.state.subject }));
    }
  }, [location.state]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simulate Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", address: "", company: "", subject: "", message: "" });
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 dark:text-white pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background Decor (Glows) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 dark:bg-red-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-red-500 dark:text-red-400 font-bold uppercase tracking-widest text-sm animate-fade-in-up">
            Contact Us
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight animate-fade-in-up delay-100">
            Let's Start a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
              Conversation
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg animate-fade-in-up delay-200">
            Have a project in mind or just want to say hi? We'd love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Contact Info */}
          <div className="space-y-10 animate-fade-in-left delay-300">
            {/* Info Cards */}
            <div className="space-y-6">
              <ContactCard
                icon={<Mail className="w-6 h-6 text-red-500" />}
                title="Email Us"
                content="derarabusiness53@gmail.com"
                subContent="Support team available 24/7"
              />
              <ContactCard
                icon={<Phone className="w-6 h-6 text-red-500" />}
                title="Call Us"
                content="+251 984 00 87 75"
                subContent="Mon-Fri, 9am - 6pm EST"
              />
              <ContactCard
                icon={<MapPin className="w-6 h-6 text-red-500" />}
                title="Visit Us"
                content="Akaki-Kality Sub-City, Woreda 13, Tullu Dimtu"
                subContent="Hamer Building, 3rd Floor, Office T0011, Addis Ababa"
              />
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <SocialBtn icon={<Github size={20} />} />
                <SocialBtn icon={<Twitter size={20} />} />
                <SocialBtn icon={<Linkedin size={20} />} />
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="p-6 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-2xl backdrop-blur-md shadow-lg">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                Need a quick answer?
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Check out our frequently asked questions to find what you're
                looking for faster.
              </p>
              <button className="text-red-500 dark:text-red-400 text-sm font-semibold flex items-center hover:text-red-600 dark:hover:text-red-300 transition-colors">
                Visit FAQ <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative animate-fade-in-right delay-300">
            {isSuccess ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl z-20 text-center p-8 transition-all duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-8 px-6 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 rounded-full text-sm font-semibold text-gray-900 dark:text-white transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Your Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputGroup
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

               <InputGroup
                label="Address"
                name="address"
                type="text"
                placeholder="123 Coffee Street"
                value={formData.address}
                onChange={handleChange}
              />
              
              <InputGroup
                label="Company (Optional)"
                name="company"
                type="text"
                placeholder="Coffee Co. Ltd"
                value={formData.company}
                onChange={handleChange}
              />

              <InputGroup
                label="Subject"
                name="subject"
                type="text"
                placeholder="Project Inquiry"
                value={formData.subject}
                onChange={handleChange}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-100 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 resize-none hover:bg-gray-200 dark:hover:bg-black/30"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-white shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed opacity-70"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 hover:shadow-red-600/20 hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>
                    Sending...
                  </span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-20 rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[400px] w-full relative animate-fade-in-up delay-500 bg-gray-900">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.707769854737!2d38.82261!3d8.86599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8575017e4063%3A0x86bd4f2503282255!2sTullu%20Dimtu%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1709927654321!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Reusable Components

const InputGroup = ({ label, name, type, placeholder, value, onChange }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{label}</label>
    <input
      type={type}
      name={name}
      required
      value={value}
      onChange={onChange}
      className="w-full bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-black/30"
      placeholder={placeholder}
    />
  </div>
);

const ContactCard = ({ icon, title, content, subContent }) => (
  <div className="flex items-start bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/10 p-4 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors duration-300 backdrop-blur-md group shadow-sm">
    <div className="p-3 bg-gray-200 dark:bg-black/20 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300 border border-gray-300 dark:border-white/5">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-800 dark:text-gray-200 font-medium">{content}</p>
      {subContent && <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{subContent}</p>}
    </div>
  </div>
);

const SocialBtn = ({ icon }) => (
  <a
    href="#"
    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 hover:-translate-y-1"
  >
    {icon}
  </a>
);

export default ContactUsPage;
