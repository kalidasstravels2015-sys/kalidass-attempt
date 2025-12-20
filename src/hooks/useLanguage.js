import { useState, useEffect } from 'react';

export const LANGUAGE_EVENT = 'language-change';

export function useLanguage(initialLang = 'en') {
    const [lang, setLang] = useState(initialLang);

    useEffect(() => {
        // Initialize from localStorage or body class
        const savedLang = localStorage.getItem('preferred-lang');
        if (savedLang) {
            setLang(savedLang);
        } else if (document.body.classList.contains('lang-ta')) {
            setLang('ta');
        }

        const handleLangChange = (e) => {
            setLang(e.detail);
        };

        window.addEventListener(LANGUAGE_EVENT, handleLangChange);
        return () => window.removeEventListener(LANGUAGE_EVENT, handleLangChange);
    }, []);

    return lang;
}

export function setLanguage(lang) {
    const isTamil = lang === 'ta';

    if (isTamil) {
        document.body.classList.add('lang-ta');
    } else {
        document.body.classList.remove('lang-ta');
    }

    localStorage.setItem('preferred-lang', lang);

    // Dispatch custom event for React components
    window.dispatchEvent(new CustomEvent(LANGUAGE_EVENT, { detail: lang }));
}
