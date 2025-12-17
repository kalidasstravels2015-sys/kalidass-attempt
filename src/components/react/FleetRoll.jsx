import React, { useRef, useState, useEffect } from 'react';
import siteContent from '../../data/siteContent.json';
import { useLanguage } from '../../hooks/useLanguage';

const FleetCard = ({ vehicle, lang, isVisible }) => {
    // Basic lazy rendering: if hasn't been visible yet, render placeholder or nothing?
    // But intersection observer on parent should handle when to mount.
    // If we mount the whole list but use IntersectionObserver on individual items, we can delay *Image* loading and heavy DOM.
    // Actually, user wants "Lazy load fleet cards on scroll".

    return (
        <div className="flex-shrink-0 w-72 snap-center md:w-auto md:snap-align-none transition-opacity duration-500 opacity-100">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-200">
                    {isVisible && (
                        <>
                            <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-xl font-bold text-white">
                                    {lang === 'ta' ? (vehicle.name_ta || vehicle.name) : vehicle.name}
                                </h3>
                            </div>
                        </>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300">
                        <div>
                            <p className="text-sm text-gray-600">{lang === 'ta' ? 'கி.மீ. கட்டணம்' : 'Rate per KM'}</p>
                            <p className="text-2xl font-bold text-blue-600">{lang === 'ta' ? (vehicle.rate_ta || vehicle.rate) : vehicle.rate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">{lang === 'ta' ? 'கொள்ளளவு' : 'Capacity'}</p>
                            <p className="text-lg font-semibold text-gray-900">{lang === 'ta' ? (vehicle.caps_ta || vehicle.caps) : vehicle.caps}</p>
                            <p className="text-xs text-gray-600">{lang === 'ta' ? (vehicle.bags_ta || vehicle.bags) : vehicle.bags}</p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 text-sm text-gray-700">
                        {vehicle.details.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                {/* Note: details might not be bilingual in JSON yet, if not usage fallback */}
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FleetRoll = ({ currentLang }) => {
    const fleet = siteContent.fleet;
    const isSSR = !!currentLang;
    const contextLang = useLanguage();
    const lang = isSSR ? currentLang : contextLang;
    const [visibleCount, setVisibleCount] = useState(3); // Start with a few
    const containerRef = useRef(null);

    useEffect(() => {
        // Simple intersection observer to load more as we scroll?
        // Or just load them all but delayed?
        // "Lazy load fleet cards on scroll" implies infinite scrolling or loading as they come into view.
        // Since it's a horizontal scroll on mobile and grid on desktop,
        // let's use IntersectionObserver to detect when the SECTION is visible, then load first batch.

        // Actually, for "Lazy load ... on scroll", optimal is to render placeholders and swap content.
        // Or incrementally increase `visibleCount` as user scrolls down the page.

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // fast lazy load: trigger all after a delay or incrementally
                setVisibleCount(fleet.length);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="fleet" className="py-10 md:py-16 bg-white" ref={containerRef} aria-labelledby="fleet-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 id="fleet-heading" className="text-2xl md:text-4xl font-extrabold text-gray-900 inline-block relative mb-4">
                        {lang === 'ta' ? 'எங்கள் பிரீமியம் வாகனங்கள்' : 'Our Premium Fleet'}
                        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-red-600 rounded-full"></div>
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto mt-4">
                        {lang === 'ta' ? 'உங்கள் பயணத்திற்கு ஏற்ற வாகனத்தைத் தேர்வு செய்யவும்' : 'Choose from our well-maintained fleet of vehicles for your journey'}
                    </p>
                </div>

                {/* Fleet Grid/Scroll Container */}
                <div className="relative">
                    <div
                        className="flex overflow-x-auto snap-x snap-mandatory pb-6 space-x-4 md:space-x-6 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 scrollbar-hide focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl"
                        tabIndex={0}
                        role="region"
                        aria-label="Fleet Gallery"
                    >
                        {fleet.slice(0, visibleCount).map((vehicle, index) => (
                            <FleetCard key={index} vehicle={vehicle} lang={lang} isVisible={true} />
                        ))}
                        {/* Skeletons for remaing if needed, but we just lazy append so it's fine */}
                    </div>

                    {/* Scroll Indicators (Mobile Only) */}
                    <div className="flex justify-center mt-6 space-x-2 md:hidden" aria-hidden="true">
                        {fleet.slice(0, visibleCount).map((_, index) => (
                            <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
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

export default FleetRoll;
