import React, { useState } from 'react';
import siteContent from '../../data/siteContent.json';
import { useLanguage } from '../../hooks/useLanguage';
import { Star, Clock, Languages, ShieldCheck, ArrowRight } from "lucide-react";

// Helper image component
const DriverCard = ({ driver, lang }) => (
    <div className="flex-none w-72 snap-center bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:shadow-md transition-all duration-300 group">
        <div className="relative mb-4 overflow-hidden rounded-xl">
            <img
                src={driver.image}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                alt={lang === 'ta' ? (driver.name_ta || driver.name) : driver.name}
                loading="lazy"
            />
            <span className="absolute bottom-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                {lang === 'ta' ? (driver.tag_ta || driver.tag) : driver.tag}
            </span>
        </div>
        <h3 className="font-bold text-lg text-slate-900">{lang === 'ta' ? (driver.name_ta || driver.name) : driver.name}</h3>

        <div className="inline-flex items-center gap-1.5 mt-1 mb-2 px-2 py-0.5 bg-green-50 border border-green-100 rounded-md text-[10px] font-bold text-green-700">
            <ShieldCheck className="w-3 h-3" />
            PVC Verified
        </div>

        <div className="text-sm text-slate-600 mt-1 space-y-2">
            <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>{lang === 'ta' ? (driver.experience_ta || driver.experience) : driver.experience}</span>
            </div>
            <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>{lang === 'ta' ? (driver.languages_ta || driver.languages) : driver.languages}</span>
            </div>
        </div>
        <div className="flex text-yellow-400 mt-4 gap-0.5" aria-label="Rated 5 out of 5 stars" role="img">
            <Star className="w-4 h-4 fill-current" aria-hidden="true" />
            <Star className="w-4 h-4 fill-current" aria-hidden="true" />
            <Star className="w-4 h-4 fill-current" aria-hidden="true" />
            <Star className="w-4 h-4 fill-current" aria-hidden="true" />
            <Star className="w-4 h-4 fill-current" aria-hidden="true" />
        </div>
    </div>
);

const DriversCarousel = ({ currentLang }) => {
    const drivers = siteContent.drivers;
    const isSSR = !!currentLang;
    const contextLang = useLanguage();
    const lang = isSSR ? currentLang : contextLang;
    const [visibleCount, setVisibleCount] = useState(6);

    const visibleDrivers = drivers.slice(0, visibleCount);
    const hasMore = visibleCount < drivers.length;

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, drivers.length));
    };

    return (
        <section className="py-20 bg-slate-50" aria-labelledby="drivers-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 id="drivers-heading" className="text-2xl md:text-4xl font-extrabold text-gray-900 inline-block relative mb-4">
                        {lang === 'ta' ? 'எங்கள் தொழில்முறை ஓட்டுநர்கள்' : 'Our Professional Drivers'}
                        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-red-600 rounded-full"></div>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto mt-4">
                        {lang === 'ta'
                            ? 'அனுபவம் வாய்ந்த, சரிபார்க்கப்பட்ட மற்றும் பன்மொழி பேசும் ஓட்டுநர்கள் உங்கள் சேவையில்.'
                            : 'Experienced, verified, and multilingual drivers at your service.'}
                    </p>
                </div>

                {/* Change to grid layout for Load More logic if not carousel, OR keep carousel and append? 
            The requirement says "Show only 4-6 initially, Load More button". 
            A "Carousel" implies horizontal scroll. A "Load More" usually implies a Grid or List.
            If I just append to horizontal scroll, it might be weird.
            Let's assume Grid if "Load More" is used, or maybe the user wants to keep the carousel but just limit DOM?
            "18 driver cards loaded immediately" is bad. 
            If I render a Grid, I can easily use Load More.
            If I render a Carousel, "Load More" appends to the scroll list. 
            Given the previous design was a Scroll/Carousel, let's keep it but maybe it wraps?
            Actually, the original design `FleetRoll` and `Drivers` were `flex overflow-x-auto`.
            If I change to "Load More", usually we switch to grid for visibility.
            BUT, if I want to keep the design, I'll just append to the scroll area.
            Wait, 18 cards in a row is long.
            I will render them in the scroll container.
        */}
                <div
                    className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
                    tabIndex={0}
                    role="region"
                    aria-label="Drivers List"
                >
                    {visibleDrivers.map((driver, index) => (
                        <DriverCard key={index} driver={driver} lang={lang} />
                    ))}
                </div>

                {hasMore && (
                    <div className="text-center mt-8">
                        <button
                            onClick={loadMore}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-full text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {lang === 'ta' ? 'மேலும் காண்க' : 'Load More'}
                        </button>
                    </div>
                )}

                <div className="text-center mt-6">
                    <a
                        href="/drivers"
                        className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg px-2"
                    >
                        {lang === 'ta' ? 'அனைத்து ஓட்டுநர்களையும் காண்க' : 'View All Drivers'}
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                    </a>
                </div>
            </div>
            <style jsx>{`
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
        </section>
    );
};

export default DriversCarousel;
