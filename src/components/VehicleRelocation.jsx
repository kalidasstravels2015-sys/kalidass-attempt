import React, { useState } from 'react';
import { 
  MapPin, 
  MessageCircle,
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import VehicleRelocationCalculator from './VehicleRelocationCalculator';

// --- Sub-Components ---

const ProcessStep = ({ step, title, desc }) => (
  <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-3 md:gap-4">
    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold border-2 border-indigo-200 text-sm md:text-base">
      {step}
    </div>
    <div>
      <h3 className="font-bold text-slate-900 text-sm md:text-lg">{title}</h3>
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-1 hidden md:block">{desc}</p>
    </div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
    <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-50 rounded-lg flex items-center justify-center md:mb-4 text-indigo-600 shrink-0">
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </div>
    <div>
      <h3 className="font-bold text-slate-900 md:mb-2 text-base md:text-lg">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed hidden md:block">{desc}</p>
    </div>
  </div>
);

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-slate-200 last:border-0">
    <button 
      className="w-full py-4 px-2 flex justify-between items-center text-left focus:outline-none hover:bg-slate-50 transition-colors"
      onClick={onClick}
    >
      <span className="font-semibold text-slate-900 text-sm md:text-base pr-4">{question}</span>
      {isOpen ? <ChevronUp className="w-5 h-5 text-indigo-600 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
    </button>
    {isOpen && (
      <div className="px-2 pb-6 text-slate-600 text-sm leading-relaxed">
        {answer}
      </div>
    )}
  </div>
);

export default function VehicleRelocation({ children }) {
  const [openFaq, setOpenFaq] = useState(0);
  
  const faqs = [
    {
      question: "How does the driver reach the pickup location?",
      answer: "We send the driver via Bus or Train to the city where your car is located. You will need to reimburse this travel ticket cost (actuals) along with the driving charges."
    },
    {
      question: "What about fuel and toll charges?",
      answer: "The car owner pays for Fuel and FastTag tolls. We recommend filling the tank before handover. Our driver will provide bills for any refuelling done during the trip."
    },
    {
      question: "Do you inspect the car before starting?",
      answer: "Yes. Before touching the steering wheel, our driver initiates a Video Call with you. He walks around the car, documenting existing scratches, dents, and the odometer reading to ensure transparency."
    },
    {
      question: "What if my car breaks down mid-way?",
      answer: "Our drivers are trained to handle basic checks. If a major breakdown occurs, they will coordinate with roadside assistance and stay with your vehicle until help arrives. They will not abandon the car."
    }
  ];

  return (
    <div className="font-sans text-slate-900 bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white pt-20 pb-32 lg:pt-28 lg:pb-48 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/80 to-slate-900 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-6">
            <MapPin className="w-3 h-3" /> Inter-District Transfer
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Move Your Car. <br/>
            <span className="text-indigo-400">Without Moving Yourself.</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Need your car brought from your hometown to Chennai? Or sending it back? We pick it up, drive it safely, and deliver it to your doorstep.
          </p>
        </div>
      </section>

      {/* CALCULATOR SECTION (Floating) */}
      <section className="relative z-20 -mt-24 px-4 pb-12">
        <div className="max-w-xl mx-auto">
           <VehicleRelocationCalculator />
        </div>
      </section>

      {/* 2. THE PROCESS (How it works) */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">Professional logistics for your personal vehicle.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <ProcessStep 
              step="1" 
              title="Driver Dispatch" 
              desc="We send a verified driver by Bus/Train to the pickup city (e.g., Coimbatore/Madurai)." 
            />
            <ProcessStep 
              step="2" 
              title="Video Inspection" 
              desc="Before starting, the driver does a live video call to record scratches, dents, and fuel levels." 
            />
            <ProcessStep 
              step="3" 
              title="The Drive" 
              desc="Live location sharing on WhatsApp. Safe driving speed (Max 90kmph) maintained throughout." 
            />
            <ProcessStep 
              step="4" 
              title="Doorstep Delivery" 
              desc="Car is delivered to your destination. Final inspection and key handover." 
            />
          </div>
        </div>
      </section>

      {children}

      {/* 3. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER CTA - WhatsApp */}
      <section className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <div className="flex justify-center">
              <MessageCircle className="w-16 h-16 mb-4 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Questions? Let's Chat!</h2>
          <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
            Get instant answers about our services, pricing, or custom requirements. Our team is ready to help you find the perfect transport solution.
          </p>
          <a
            href="https://wa.me/919092303060?text=Hi%2C%20I%27m%20interested%20in%20Vehicle%20Relocation%20Services.%20I%20have%20some%20questions."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-green-600 hover:bg-green-50 px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <MessageCircle className="w-6 h-6" />
            Chat on WhatsApp
          </a>
          <p className="text-green-100 text-sm mt-6">
            💬 Typical response time: Under 5 minutes during business hours
          </p>
        </div>
      </section>

    </div>
  );
}