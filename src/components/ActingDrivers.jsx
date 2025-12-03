import React from 'react';
import { 
  Moon, 
  MapPin, 
  Heart, 
  Wine, 
  ArrowRight,
  Calculator,
  MessageCircle
} from 'lucide-react';

// --- Sub-Components ---

const ServiceCard = ({ title, title_ta, subtitle, subtitle_ta, icon: Icon, desc, desc_ta, link, badge, badge_ta, ctaText, ctaText_ta }) => {
  const Wrapper = link ? 'a' : 'div';
  const wrapperProps = link ? { href: link } : {};

  return (
    <Wrapper 
      {...wrapperProps}
      className={`group relative bg-white rounded-2xl border border-slate-200 shadow-sm ${link ? 'hover:shadow-xl hover:border-indigo-600 cursor-pointer' : ''} transition-all duration-300 flex flex-col h-full overflow-hidden no-underline`}
    >
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-200 ${link ? 'group-hover:from-indigo-600 group-hover:to-indigo-400' : ''} transition-all duration-300`}></div>
      
      {badge && (
         <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10 border border-green-200">
           <Calculator className="w-3 h-3" /> 
           <span className="lang-en">{badge}</span>
           <span className="lang-ta">{badge_ta || badge}</span>
         </div>
      )}

      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center ${link ? 'group-hover:bg-indigo-600' : ''} transition-colors duration-300`}>
            <Icon className={`w-7 h-7 text-indigo-600 ${link ? 'group-hover:text-white' : ''} transition-colors duration-300`} />
          </div>
          {link && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-5 h-5 text-indigo-600" />
            </div>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          <span className="lang-en">{title}</span>
          <span className="lang-ta">{title_ta || title}</span>
        </h3>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-4">
          <span className="lang-en">{subtitle}</span>
          <span className="lang-ta">{subtitle_ta || subtitle}</span>
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          <span className="lang-en">{desc}</span>
          <span className="lang-ta">{desc_ta || desc}</span>
        </p>
      </div>
      
      {link && (
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center group-hover:bg-indigo-50 transition-colors">
          <span className={`text-xs font-bold ${ctaText === 'Book Now' ? 'text-green-600' : 'text-slate-500'} group-hover:text-indigo-700`}>
            <span className="lang-en">{ctaText || "View Packages"}</span>
            <span className="lang-ta">{ctaText_ta || "தொகுப்புகளைப் பார்க்கவும்"}</span>
          </span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
        </div>
      )}
    </Wrapper>
  );
};

export default function ActingDrivers() {
  return (
    <div className="font-sans text-slate-900 bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white py-24 lg:py-32 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <span className="lang-en">Private Chauffeur Services</span>
            <span className="lang-ta">தனிப்பட்ட ஓட்டுநர் சேவைகள்</span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            <span className="lang-en">Your Car. <br className="hidden md:block" /></span>
            <span className="lang-ta">உங்கள் கார். <br className="hidden md:block" /></span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">
              <span className="lang-en">Our Professional Pilot.</span>
              <span className="lang-ta">எங்கள் தொழில்முறை ஓட்டுநர்.</span>
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            <span className="lang-en">Love your car but hate the traffic? Whether it's a night drive to Madurai, moving your car to another district, or taking parents to the hospital—we have a specialist for that.</span>
            <span className="lang-ta">உங்கள் காரை நேசிக்கிறீர்கள் ஆனால் போக்குவரத்தை வெறுக்கிறீர்களா? மதுரைக்கு இரவுப் பயணம், உங்கள் காரை வேறு மாவட்டத்திற்கு மாற்றுவது அல்லது பெற்றோரை மருத்துவமனைக்கு அழைத்துச் செல்வது என எதுவாக இருந்தாலும் - எங்களிடம் அதற்கான நிபுணர் உள்ளார்.</span>
          </p>
        </div>
      </section>

      {/* 2. THE 4 SOLUTIONS (Main Branching) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card A: Highway Acting Driver */}
          <ServiceCard 
            title="Highway Acting Driver"
            title_ta="நெடுஞ்சாலை துணை ஓட்டுநர்"
            subtitle="Outstation Night Driver"
            subtitle_ta="வெளியூர் இரவு ஓட்டுநர்"
            icon={Moon}
            desc="Driving 7+ hours to Madurai or Coimbatore is exhausting. Sleep in the backseat while our specialist night driver handles the highway trucks and high-beams."
            desc_ta="மதுரை அல்லது கோயம்புத்தூருக்கு 7+ மணிநேரம் ஓட்டுவது சோர்வாக இருக்கும். நெடுஞ்சாலை லாரிகள் மற்றும் ஹை-பீம்களை எங்கள் சிறப்பு இரவு ஓட்டுநர் கையாளும் போது நீங்கள் பின் இருக்கையில் தூங்குங்கள்."
            link="/services/acting-drivers/highway-copilot"
            badge="Calculator Inside"
            badge_ta="கால்குலேட்டர் உள்ளது"
            ctaText="View Details"
            ctaText_ta="விவரங்களைப் பார்க்க"
          />

          {/* Card B: Vehicle Relocation */}
          <ServiceCard 
            title="Vehicle Relocation"
            title_ta="வாகன இடமாற்றம்"
            subtitle="Inter-District Transfer"
            subtitle_ta="மாவட்டங்களுக்கு இடையேயான பரிமாற்றம்"
            icon={MapPin}
            desc="Need your car moved from Chennai to your hometown (or vice versa)? We pick it up, inspect it via video call, and drive it safely to your doorstep."
            desc_ta="உங்கள் காரை சென்னையிலிருந்து உங்கள் சொந்த ஊருக்கு (அல்லது நேர்மாறாக) மாற்ற வேண்டுமா? நாங்கள் அதை எடுத்து, வீடியோ அழைப்பு மூலம் ஆய்வு செய்து, உங்கள் வீட்டு வாசலில் பாதுகாப்பாக ஓட்டிச் செல்கிறோம்."
            link="/services/acting-drivers/vehicle-relocation"
            badge="Calculator Inside"
            badge_ta="கால்குலேட்டர் உள்ளது"
            ctaText="View Details"
            ctaText_ta="விவரங்களைப் பார்க்க"
          />

          {/* Card C: Senior Assist */}
          <ServiceCard 
            title="Senior Citizen Assist"
            title_ta="மூத்த குடிமக்கள் உதவி"
            subtitle="Care-Giver Driver"
            subtitle_ta="பராமரிப்பாளர் ஓட்டுநர்"
            icon={Heart}
            desc="For elderly parents visiting Apollo/Sankara Nethralaya or temples. A patient, mature driver who helps with bags, handles parking, and waits during appointments."
            desc_ta="அப்போலோ/சங்கர நேத்ராலயா அல்லது கோவில்களுக்குச் செல்லும் வயதான பெற்றோருக்கு. பைகளை எடுத்துச் செல்ல உதவும், பார்க்கிங்கை கையாளும் மற்றும் சந்திப்புகளின் போது காத்திருக்கும் பொறுமையான, முதிர்ந்த ஓட்டுநர்."
          />

          {/* Card D: Designated Driver */}
          <ServiceCard 
            title="Party & City Drop"
            title_ta="பார்ட்டி & சிட்டி டிராப்"
            subtitle="Designated Driver"
            subtitle_ta="நியமிக்கப்பட்ட ஓட்டுநர்"
            icon={Wine}
            desc="Dinner at Nungambakkam or a wedding reception? Don't worry about parking or DUI checks. Enjoy your evening responsibly; we drive you home safely."
            desc_ta="நுங்கம்பாக்கத்தில் இரவு உணவு அல்லது திருமண வரவேற்பு? பார்க்கிங் அல்லது DUI சோதனைகள் பற்றி கவலைப்பட வேண்டாம். உங்கள் மாலையை பொறுப்புடன் அனுபவிக்கவும்; நாங்கள் உங்களை பாதுகாப்பாக வீட்டிற்கு அழைத்துச் செல்கிறோம்."
          />

        </div>
      </section>

      {/* 3. FOOTER CTA - WhatsApp */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="flex justify-center">
              <MessageCircle className="w-16 h-16 mb-4 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="lang-en">Have Questions? Let's Chat!</span>
            <span className="lang-ta">கேள்விகள் உள்ளதா? பேசலாம்!</span>
          </h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            <span className="lang-en">Get instant answers about our services, pricing, or custom requirements. Our team is ready to help you find the perfect transport solution.</span>
            <span className="lang-ta">எங்கள் சேவைகள், விலை அல்லது தனிப்பயன் தேவைகள் பற்றிய உடனடி பதில்களைப் பெறுங்கள். சரியான போக்குவரத்து தீர்வைக் கண்டறிய எங்கள் குழு உங்களுக்கு உதவ தயாராக உள்ளது.</span>
          </p>
          <a
            href="https://wa.me/919092303060?text=Hi%2C%20I%27m%20interested%20in%20Acting%20Driver%20Services.%20I%20have%20some%20questions."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-green-600 hover:bg-green-50 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6" />
            <span className="lang-en">Chat on WhatsApp</span>
            <span className="lang-ta">வாட்ஸ்அப்பில் அரட்டையடிக்கவும்</span>
          </a>
          <p className="text-green-100 text-sm mt-6">
            <span className="lang-en">💬 Typical response time: Under 5 minutes during business hours</span>
            <span className="lang-ta">💬 வழக்கமான பதில் நேரம்: வணிக நேரங்களில் 5 நிமிடங்களுக்குள்</span>
          </p>
        </div>
      </section>

    </div>
  );
}
