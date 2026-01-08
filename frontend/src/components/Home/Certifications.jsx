import React from "react";
import deraraCertificate from "../../assets/derara_certificate_modern.png";
import certeficate2 from "../../assets/certeficate2.png";
import certeficate3 from "../../assets/certeficate3.png";
import certeficate4 from "../../assets/certeficate4.png";
import certeficate5 from "../../assets/certeficate5.png";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Procurement Manager",
    company: "Global Coffee Co.",
    feedback:
      "Derara's commitment to quality is unmatched. Their beans are consistently the highlight of our seasonal blends.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Head Roaster",
    company: "Artisan Roasts",
    feedback:
      "The transparency in their supply chain gives us total confidence. A partner that truly cares about the farmers.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Director of Sourcing",
    company: "Bean & Leaf",
    feedback:
      "Reliable shipping and exceptional communication. Derara has been pivotal in our expansion into the Ethiopian market.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "CEO",
    company: "Organic Brews",
    feedback:
      "Their organic green beans are simply the best. Our customers rave about the flavor profile.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
  },
];

// Major Certificates (Static, Large)
const majorCertificates = [
  {
    id: 1,
    title: "Certificate of Competence",
    description: "Issued by Ethiopian Coffee and Tea Authority",
    image: deraraCertificate,
  },
  {
    id: 2,
    title: "Best Industry Leader 2024",
    description: "Awarded for exceptional service and innovation.",
    image: certeficate2,
  },
  {
    id: 3,
    title: "Security Audited",
    description: "Comprehensive security audit passed with excellence.",
    image: certeficate3,
  },
  {
    id: 4,
    title: "Top Export Agency",
    description: "Recognized as a leading export agency globally.",
    image: certeficate4,
  },
];

const Certifications = () => {
  return (
    <section className="py-20 bg-white dark:bg-black border-y border-gray-200 dark:border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/3 dark:bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Part 1: Major Certificates (Static & Big) */}
      <div className="container mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Our <span className="text-red-500">Certificates</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We are committed to maintaining the highest standards of quality and
            excellence.
          </p>
        </div>

        <div className="flex w-full overflow-hidden mask-linear-gradient mb-24">
          <div className="flex animate-scroll whitespace-nowrap group hover:[animation-play-state:paused]">
            {/* Set 1 */}
            <div className="flex space-x-10 mx-10">
              {majorCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="group relative bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500/30 w-[400px] md:w-[500px] flex-shrink-0"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-all duration-300 z-10" />
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors whitespace-normal">
                      {cert.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-400 text-sm whitespace-normal">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (Duplicate for Loop) */}
            <div className="flex space-x-10 mx-10">
              {majorCertificates.map((cert) => (
                <div
                  key={`${cert.id}-dup1`}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500/30 w-[400px] md:w-[500px] flex-shrink-0"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300 z-10" />
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors whitespace-normal">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm whitespace-normal">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Set 3 (Extra Duplicate for smooth loop on wide screens since items are few) */}
            <div className="flex space-x-10 mx-10">
              {majorCertificates.map((cert) => (
                <div
                  key={`${cert.id}-dup2`}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500/30 w-[400px] md:w-[500px] flex-shrink-0"
                >
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-300 z-10" />
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors whitespace-normal">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm whitespace-normal">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Testimonials (Rolling Cards) */}
      <div className="relative">
        <div className="container mx-auto px-6 mb-12">
          <h3 className="text-center text-red-500 uppercase tracking-[0.2em] text-sm font-semibold mb-2">
            Testimonials
          </h3>
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            What Our Partners Say
          </h2>
        </div>

        {/* Style for the animation */}
        <style>
          {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll-right {
           animation: scroll-right 40s linear infinite;
          }
        `}
        </style>

        <div className="flex w-full overflow-hidden mask-linear-gradient">
          {/* Container for the sliding items. */}
          <div className="flex animate-scroll-right whitespace-nowrap group hover:[animation-play-state:paused] py-4">
            {/* First Set */}
            <div className="flex space-x-8 mx-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-[350px] bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 p-6 rounded-2xl flex flex-col space-y-4 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors whitespace-normal"
                >
                  <p className="text-gray-700 dark:text-gray-300 italic font-semibold dark:font-normal">"{testimonial.feedback}"</p>
                  <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-300 dark:border-white/5">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500/50"
                    />
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-500 text-xs">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Duplicate Set for Infinite Loop */}
            <div className="flex space-x-8 mx-8">
              {testimonials.map((testimonial) => (
                <div
                  key={`${testimonial.id}-dup`}
                  className="w-[350px] bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 p-6 rounded-2xl flex flex-col space-y-4 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors whitespace-normal"
                >
                  <p className="text-gray-700 dark:text-gray-300 italic font-semibold dark:font-normal">"{testimonial.feedback}"</p>
                  <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-300 dark:border-white/5">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500/50"
                    />
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-500 text-xs">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

             {/* Triplicate Set for Infinite Loop (Safety) */}
             <div className="flex space-x-8 mx-8">
              {testimonials.map((testimonial) => (
                <div
                  key={`${testimonial.id}-dup2`}
                  className="w-[350px] bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 p-6 rounded-2xl flex flex-col space-y-4 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors whitespace-normal"
                >
                  <p className="text-gray-700 dark:text-gray-300 italic font-semibold dark:font-normal">"{testimonial.feedback}"</p>
                  <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-300 dark:border-white/5">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500/50"
                    />
                    <div>
                      <h4 className="text-gray-900 dark:text-white font-bold text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-500 text-xs">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
