import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const partners = [
    {
        name: "Airport Authority of India",
        logo: "/images/partners/airport-chennai.webp",
        alt: "Airport Authority of India - Official taxi partner for Chennai Airport pickup and drop",
    },
    {
        name: "L&T",
        logo: "/images/partners/landt.webp",
        alt: "Larsen & Toubro (L&T) Construction Chennai - Corporate employee transport partner"
    },
    {
        name: "Reliance Jio",
        logo: "/images/partners/jio.webp",
        alt: "Reliance Jio Infocomm - Monthly cab services for corporate staff in Chennai"
    },
    {
        name: "Savaari",
        logo: "/images/partners/Savaari.webp",
        alt: "Savaari Car Rentals - Trusted local taxi operator partner"
    },
    {
        name: "Saravn Enterprises",
        logo: "/images/partners/saravn.webp",
        alt: "Saravn Enterprises - Dedicated logistics and staff transport provider"
    },
    {
        name: "Cognizant",
        logo: "/images/partners/Cognizant.webp",
        alt: "Cognizant Technology Solutions - IT employee daily commute partner"
    },
    {
        name: "TN Police",
        logo: "/images/partners/tn-police.webp",
        alt: "Tamil Nadu Police - Trusted vehicle provider for official duties"
    },
];

const PartnersCarousel = ({ currentLang }) => {
    const isSSR = !!currentLang;
    const contextLang = useLanguage();
    const lang = isSSR ? currentLang : contextLang;

    // Optimizing DOM:
    // Instead of 3x duplication, we can use CSS mask text-scrolling or just 2x duplication if needed for seamless loop.
    // 2x is efficient enough for a seamless loop if the track width > container width.
    const scrollingPartners = [...partners, ...partners];

    return (
        <section className="py-10 md:py-16 bg-gray-50 overflow-hidden border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
                <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 inline-block relative mb-4">
                    {lang === 'ta' ? 'தொழில்துறை தலைவர்களால் நம்பப்படுகிறது' : 'Trusted By Industry Leaders'}
                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-red-600 rounded-full"></div>
                </h2>
                <p className="text-base text-gray-600 max-w-2xl mx-auto mt-4">
                    {lang === 'ta' ? 'இந்த மதிப்புமிக்க நிறுவனங்களுக்கு சேவை செய்வதில் பெருமை கொள்கிறோம்' : 'Proud to serve these esteemed organizations'}
                </p>
            </div>

            <div className="relative w-full max-w-6xl mx-auto">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

                {/* Scrolling Track - Reduced duplication */}
                <div
                    className="flex w-max animate-scroll hover:pause focus:pause items-center focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl"
                    tabIndex={0}
                    role="region"
                    aria-label="Partner Logos"
                >
                    {scrollingPartners.map((partner, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 mx-8 md:mx-12"
                            aria-hidden={index >= partners.length ? "true" : "false"}
                        >
                            <div className="w-44 h-24 md:w-56 md:h-32 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                {partner.logo ? (
                                    <img
                                        src={partner.logo}
                                        alt={index >= partners.length ? "" : (partner.alt || partner.name)}
                                        className="object-contain w-full h-full transition-all duration-500 transform hover:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <span className="font-bold text-gray-400 text-lg">
                                        {partner.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } 
          }
          /* moved 50% because list is doubled, so 50% is one full original set */
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .hover\\:pause:hover, .focus\\:pause:focus {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-scroll {
              animation: none;
              transform: translateX(0); /* Show first set */
              flex-wrap: wrap; /* Wrap if needed or just show overflow */
              justify-content: center;
              width: 100%;
            }
            /* Hide duplicates visually in reduced motion if wrapping looks bad, 
               but simpler to just stop scrolling. 
               However, with w-max, it might be cut off. 
               Better to allow horizontal scroll in reduced motion or wrap.
            */
          }
      `}</style>
        </section>
    );
};

export default PartnersCarousel;
