import{j as e}from"./jsx-runtime.BjG_zV1W.js";import"./index.Ca3WTVtt.js";import{u as m}from"./useLanguage.BgUTl6gZ.js";const t=[{name:"Airport Authority of India",logo:"/images/partners/airport-chennai.png",alt:"Airport Authority of India - Official taxi partner for Chennai Airport pickup and drop"},{name:"L&T",logo:"/images/partners/landt.webp",alt:"Larsen & Toubro (L&T) Construction Chennai - Corporate employee transport partner"},{name:"Reliance Jio",logo:"/images/partners/jio.jpg",alt:"Reliance Jio Infocomm - Monthly cab services for corporate staff in Chennai"},{name:"Savaari",logo:"/images/partners/Savaari.png",alt:"Savaari Car Rentals - Trusted local taxi operator partner"},{name:"Saravn Enterprises",logo:"/images/partners/saravn.png",alt:"Saravn Enterprises - Dedicated logistics and staff transport provider"},{name:"Cognizant",logo:"/images/partners/Cognizant.png",alt:"Cognizant Technology Solutions - IT employee daily commute partner"},{name:"TN Police",logo:"/images/partners/tn-police.png",alt:"Tamil Nadu Police - Trusted vehicle provider for official duties"}],g=({currentLang:o})=>{const n=!!o,i=m(),s=n?o:i,l=[...t,...t];return e.jsxs("section",{className:"py-10 md:py-16 bg-gray-50 overflow-hidden border-t border-gray-200",children:[e.jsxs("div",{className:"max-w-7xl mx-auto px-4 mb-12 text-center",children:[e.jsxs("h2",{className:"text-2xl md:text-4xl font-extrabold text-gray-900 inline-block relative mb-4",children:[s==="ta"?"தொழில்துறை தலைவர்களால் நம்பப்படுகிறது":"Trusted By Industry Leaders",e.jsx("div",{className:"absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1.5 bg-red-600 rounded-full"})]}),e.jsx("p",{className:"text-base text-gray-600 max-w-2xl mx-auto mt-4",children:s==="ta"?"இந்த மதிப்புமிக்க நிறுவனங்களுக்கு சேவை செய்வதில் பெருமை கொள்கிறோம்":"Proud to serve these esteemed organizations"})]}),e.jsxs("div",{className:"relative w-full max-w-6xl mx-auto",children:[e.jsx("div",{className:"absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"}),e.jsx("div",{className:"absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"}),e.jsx("div",{className:"flex w-max animate-scroll hover:pause focus:pause items-center focus:outline-none focus:ring-2 focus:ring-red-500 rounded-xl",tabIndex:0,role:"region","aria-label":"Partner Logos",children:l.map((a,r)=>e.jsx("div",{className:"flex-shrink-0 mx-8 md:mx-12","aria-hidden":r>=t.length?"true":"false",children:e.jsx("div",{className:"w-44 h-24 md:w-56 md:h-32 flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-100 p-4",children:a.logo?e.jsx("img",{src:a.logo,alt:r>=t.length?"":a.alt||a.name,className:"object-contain w-full h-full transition-all duration-500 transform hover:scale-110",loading:"lazy"}):e.jsx("span",{className:"font-bold text-gray-400 text-lg",children:a.name})})},r))})]}),e.jsx("style",{children:`
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
      `})]})};export{g as default};
