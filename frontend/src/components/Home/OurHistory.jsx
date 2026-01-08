import React, { useRef } from "react";
import { Calendar, Award, TrendingUp, Users, Flag } from "lucide-react";

// Mock Data for History
const historyData = [
  {
    title: "Foundation & Global Expansion",
    description:
      "Derara was founded with a vision to revolutionize the coffee industry, deeply rooted in Ethiopian heritage. From a shared workspace to expanding internationally with offices in Dubai and London, we bring the authentic taste of Ethiopia to the world.",
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800", // Traditional Coffee Pouring
  },
  {
    title: "Industry Recognition",
    description:
      "Received the 'Tech Innovator of the Year' award for our sustainable export practices. Our commitment to excellence in delivering premium Ethiopian coffee was recognized on the global stage.",
    icon: <Award className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=800", // Coffee Cherries/Farm
  },
  {
    title: "Looking Ahead",
    description:
      "Today, we are a team of 500+ professionals pushing the boundaries of what's possible. We continue to empower local farmers while connecting the world with the finest Ethiopian beans.",
    icon: <Calendar className="w-6 h-6 text-white" />,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", // Modern Office/Growth
  },
];

const OurHistory = () => {
  return (
    <section className="py-20 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:via-slate-900 dark:to-black bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/5 dark:bg-red-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-red-500 dark:text-red-500 font-bold uppercase tracking-widest text-sm animate-fade-in-up">
            Our Journey
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            History of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Innovation
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
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
                    <div className="overflow-hidden rounded-2xl border border-gray-300 dark:border-white/10 shadow-xl relative h-64">
                      <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Icon/Dot on the Center Line */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)] z-20 border-4 border-white dark:border-gray-900">
                    {item.icon}
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-5/12 pl-16 md:pl-0">
                    <div className="bg-gray-100 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/10 p-8 rounded-2xl hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500/30">
                      {/* Mobile Image (Visible only on mobile) */}
                      <div className="md:hidden w-full h-48 rounded-xl overflow-hidden mb-6 border border-gray-300 dark:border-white/10">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-sm lg:text-base">
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
