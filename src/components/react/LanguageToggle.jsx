import React from 'react';
import { useLanguage, setLanguage } from '../../hooks/useLanguage';

const LanguageToggle = ({ isMobile, currentLang, targetUrl }) => {
    // If targetUrl is provided (SSR/SEO mode), use it. Otherwise fallback to client-side hook (legacy or specific use).
    const isSSR = !!targetUrl;

    // Legacy hook usage if needed
    const lang = isSSR ? currentLang : useLanguage();

    const toggleLanguage = () => {
        if (isSSR) return; // Link handles it
        const newLang = lang === 'en' ? 'ta' : 'en';
        setLanguage(newLang);
    };

    if (isMobile) {
        if (isSSR) {
            return (
                <a
                    href={targetUrl}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-700 active:bg-red-100 transition-colors shadow-sm no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label={`Switch to ${lang === 'en' ? 'Tamil' : 'English'}`}
                >
                    <span className="text-xs font-bold">{lang === 'en' ? 'தமிழ்' : 'ENG'}</span>
                    <i className="fa-solid fa-language text-red-500 text-sm" aria-hidden="true"></i>
                </a>
            );
        }

        return (
            <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-100 bg-red-50 text-red-700 active:bg-red-100 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label={`Switch to ${lang === 'en' ? 'Tamil' : 'English'}`}
            >
                <span className={`text-xs font-bold ${lang === 'ta' ? '' : 'hidden'}`}>தமிழ்</span>
                <span className={`text-xs font-bold ${lang === 'en' ? '' : 'hidden'}`}>ENG</span>
                <i className="fa-solid fa-language text-red-500 text-sm" aria-hidden="true"></i>
            </button>
        );
    }

    // Desktop
    if (isSSR) {
        return (
            <a
                href={targetUrl}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-red-600 transition-colors group no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label={`Switch to ${lang === 'en' ? 'Tamil' : 'English'}`}
            >
                <span className="text-sm font-bold text-gray-700 group-hover:text-red-600">
                    {lang === 'en' ? 'தமிழ்' : 'ENG'}
                </span>
                <i className="fa-solid fa-language text-gray-400 group-hover:text-red-600" aria-hidden="true"></i>
            </a>
        );
    }

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-red-600 transition-colors group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label={`Switch to ${lang === 'en' ? 'Tamil' : 'English'}`}
        >
            <span className={`text-sm font-bold text-gray-700 group-hover:text-red-600 ${lang === 'ta' ? '' : 'hidden'}`}>தமிழ்</span>
            <span className={`text-sm font-bold text-gray-700 group-hover:text-red-600 ${lang === 'en' ? '' : 'hidden'}`}>ENG</span>
            <i className="fa-solid fa-language text-gray-400 group-hover:text-red-600" aria-hidden="true"></i>
        </button>
    );
};

export default LanguageToggle;
