import React, { useRef } from "react";
import { Calendar, Award, TrendingUp, Users, Flag } from "lucide-react";

// Mock Data for History
const historyData = [
  {
    year: "2015",
    title: "The Beginning",
    description:
      "Derara was founded with a simple vision: to revolutionize the industry with innovation and passion. We started as a small team of three in a shared workspace.",
    icon: <Flag className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800", // Coffee beans/start
  },
  {
    year: "2017",
    title: "First Major Milestone",
    description:
      "We launched our flagship product, securing our first 100 enterprise clients. This pivot marked the beginning of our exponential growth.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800", // Roasting/Production
  },
  {
    year: "2019",
    title: "Global Expansion",
    description:
      "Expansion into international markets. We opened offices in Dubai and London, bringing our unique solutions to a global audience.",
    icon: <Users className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&q=80&w=800", // Global/Logistics
  },
  {
    year: "2021",
    title: "Industry Recognition",
    description:
      "Received the 'Tech Innovator of the Year' award. Our commitment to excellence was recognized on the global stage.",
    icon: <Award className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800", // Award/Quality
  },
  {
    year: "2024",
    title: "Looking Ahead",
    description:
      "Today, we are a team of 500+ professionals pushing the boundaries of what's possible. The future is bright, and we are just getting started.",
    icon: <Calendar className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800", // Future/Meeting/Growth
  },
];

const OurHistory = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-slate-900 to-black text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-red-500 font-bold uppercase tracking-widest text-sm animate-fade-in-up">
            Our Journey
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            History of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Innovation
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From humble beginnings to industry leaders. Here is the timeline of
            our success.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-red-600/50 to-transparent rounded-full"></div>

          <div className="space-y-12 md:space-y-0">
            {historyData.map((item, index) => {
              const isEvent = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center justify-between w-full md:mb-16 ${
                    isEvent ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Side (Uses the previously empty spacer) */}
                  <div className="hidden md:block w-5/12 group">
                    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl relative h-64">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Icon/Dot on the Center Line */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] z-20 border-4 border-gray-900">
                    {item.icon}
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-5/12 pl-16 md:pl-0">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500/30">
                      {/* Mobile Image (Visible only on mobile) */}
                      <div className="md:hidden w-full h-48 rounded-xl overflow-hidden mb-6 border border-white/10">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <span className="text-red-400 font-bold text-xl mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurHistory;
