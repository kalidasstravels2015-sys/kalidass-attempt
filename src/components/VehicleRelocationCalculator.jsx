import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Navigation, 
  Calculator,
  ArrowRight,
  Info
} from 'lucide-react';
import tnBusFares from '../data/tnBusFares.json';

export default function VehicleRelocationCalculator() {
  // Calculator State
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  // Google Maps Init
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;
    const intervalId = setInterval(() => {
      attempts++;
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(intervalId);
        
        const options = {
          componentRestrictions: { country: "in" },
          fields: ["geometry", "name"],
          strictBounds: false,
        };

        if (pickupRef.current) {
            const autocompletePickup = new window.google.maps.places.Autocomplete(pickupRef.current, options);
            autocompletePickup.addListener('place_changed', () => {
                const place = autocompletePickup.getPlace();
                if (place.name) setPickup(place.name);
            });
        }
        if (dropRef.current) {
            const autocompleteDrop = new window.google.maps.places.Autocomplete(dropRef.current, options);
            autocompleteDrop.addListener('place_changed', () => {
                const place = autocompleteDrop.getPlace();
                if (place.name) setDrop(place.name);
            });
        }
      } else if (attempts >= maxAttempts) {
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const finalizeCalculation = (dist, duration, busFare) => {
    const BATA_PER_DAY = 1000;
    const FOOD_PER_DAY = 300;
    
    const total = BATA_PER_DAY + FOOD_PER_DAY + busFare;

    setResult({
      total,
      dist,
      duration,
      breakdown: {
        bata: BATA_PER_DAY,
        food: FOOD_PER_DAY,
        bus: busFare
      }
    });
    setLoading(false);
  };

  const calculateCost = () => {
    if (!pickup || !drop) {
      alert("Please enter both locations");
      return;
    }

    setLoading(true);
    setResult(null);

    // 1. Local Lookup
    const p = pickup.toLowerCase();
    const d = drop.toLowerCase();
    const route = tnBusFares.find(r => 
      (p.includes(r.source) && d.includes(r.destination)) ||
      (p.includes(r.destination) && d.includes(r.source))
    );

    if (route) {
      setTimeout(() => {
        const realDist = route.distanceKm;
        const durationText = Math.round(realDist / 50) + " hrs (Est)";
        const busFare = route.setcFare;
        finalizeCalculation(realDist, durationText, busFare);
      }, 600);
      return;
    }

    // 2. API Lookup
    if (window.google && window.google.maps) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [pickup],
          destinations: [drop],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.METRIC,
        },
        (response, status) => {
          if (status !== "OK") {
            alert("Error with distance service");
            setLoading(false);
            return;
          }
          const row = response.rows[0];
          if (!row) {
             setLoading(false);
             return;
          }
          const element = row.elements[0];
          if (element.status !== "OK") {
            alert("Could not calculate distance.");
            setLoading(false);
            return;
          }

          const distanceInMeters = element.distance.value;
          const realDist = Math.round(distanceInMeters / 1000);
          const durationText = element.duration.text;
          const calculatedFare = Math.round(realDist * 1.2); // Fallback fare

          finalizeCalculation(realDist, durationText, calculatedFare);
        }
      );
    } else {
      alert("Google Maps API not loaded");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xl text-slate-900">
       <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-indigo-600 rounded-lg">
           <Calculator className="w-5 h-5 text-white" />
         </div>
         <div>
           <h3 className="font-bold text-slate-900 text-lg">Get Instant Quote</h3>
           <p className="text-xs text-slate-500">Estimate your relocation cost</p>
         </div>
       </div>
       
       <div className="space-y-4">
         <div>
           <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Pickup City</label>
           <div className="relative">
             <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
             <input 
               ref={pickupRef}
               type="text" 
               placeholder="e.g. Coimbatore"
               className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
               onChange={(e) => setPickup(e.target.value)}
             />
           </div>
         </div>

         <div>
           <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Drop City</label>
           <div className="relative">
             <Navigation className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
             <input 
               ref={dropRef}
               type="text" 
               placeholder="e.g. Chennai"
               className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-medium"
               onChange={(e) => setDrop(e.target.value)}
             />
           </div>
         </div>

         <button 
           onClick={calculateCost}
           disabled={loading}
           className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center shadow-lg disabled:opacity-70"
         >
           {loading ? 'Calculating...' : <span className="flex items-center">Calculate Cost <ArrowRight className="w-4 h-4 ml-2" /></span>}
         </button>

         <div className="mt-3 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex gap-2 items-start">
           <Info className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
           <p className="text-xs text-yellow-800 leading-relaxed font-medium">
             <span className="font-bold">Note:</span> Fuel & Tolls are extra. Driver travel cost is reimbursed at actuals (Bus/Train).
           </p>
         </div>
       </div>

       {result && (
         <div className="mt-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
           <div className="flex justify-between items-end mb-4">
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Estimated Total</p>
               <p className="text-3xl font-extrabold text-slate-900 tracking-tight">₹{result.total}</p>
             </div>
             <div className="text-right">
               <p className="text-sm font-bold text-slate-600">{result.dist} km</p>
               <p className="text-xs text-slate-400">{result.duration}</p>
             </div>
           </div>

           <div className="space-y-2 text-sm bg-slate-50 p-3 rounded-lg">
             <div className="flex justify-between">
               <span className="text-slate-600">Driver Bata</span>
               <span className="font-bold text-slate-900">₹{result.breakdown.bata}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-slate-600">Food Allowance</span>
               <span className="font-bold text-slate-900">₹{result.breakdown.food}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-slate-600">Return Travel (Est)</span>
               <span className="font-bold text-slate-900">₹{result.breakdown.bus}</span>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}
