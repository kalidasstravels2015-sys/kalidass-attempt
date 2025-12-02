import React, { useState, useEffect, useRef } from 'react';
import { Car, MapPin, Calendar, Calculator, Send, Plane, ArrowRight, Repeat, Users, User, Phone } from 'lucide-react';

const rates = {
  'Swift Dzire': 11,
  'Toyota Etios': 12,
  'Innova': 15,
  'Innova Crysta': 18,
  'Tempo Traveller': 21
};

const vehicleOptions = Object.keys(rates);

export default function QuotationEngine() {
  const [activeTab, setActiveTab] = useState('oneway'); // airport, oneway, round
  const [airportMode, setAirportMode] = useState('drop'); // drop (to airport), pickup (from airport)
  const [vehicle, setVehicle] = useState('Swift Dzire');
  const [passengers, setPassengers] = useState('4');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [estimate, setEstimate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1); // For round trip calculation
  
  // Customer Details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');

  const pickupInputRef = useRef(null);
  const dropInputRef = useRef(null);

  // Auto-select vehicle based on passengers
  useEffect(() => {
    const pax = parseInt(passengers);
    if (pax <= 4) setVehicle('Swift Dzire');
    else if (pax <= 6) setVehicle('Innova');
    else if (pax <= 7) setVehicle('Innova Crysta');
    else setVehicle('Tempo Traveller');
  }, [passengers]);

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) return;

      const options = {
        componentRestrictions: { country: 'in' },
        fields: ['place_id', 'geometry', 'name', 'formatted_address'],
      };

      if (pickupInputRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInputRef.current, options);
        pickupAutocomplete.addListener('place_changed', () => {
          const place = pickupAutocomplete.getPlace();
          if (place.formatted_address) {
            setPickup(place.formatted_address);
            calculateDistance(place.formatted_address, drop);
          }
        });
      }

      if (dropInputRef.current) {
        const dropAutocomplete = new window.google.maps.places.Autocomplete(dropInputRef.current, options);
        dropAutocomplete.addListener('place_changed', () => {
          const place = dropAutocomplete.getPlace();
          if (place.formatted_address) {
            setDrop(place.formatted_address);
            calculateDistance(pickup, place.formatted_address);
          }
        });
      }
    };

    if (window.google && window.google.maps) {
      initAutocomplete();
    } else {
      window.addEventListener('google-maps-loaded', initAutocomplete);
      return () => window.removeEventListener('google-maps-loaded', initAutocomplete);
    }
  }, [pickup, drop, activeTab, airportMode]);

  // Calculate Distance
  const calculateDistance = (origin, destination) => {
    if (!origin || !destination || !window.google) return;

    setLoading(true);
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        setLoading(false);
        if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
          const distValue = response.rows[0].elements[0].distance.value / 1000; // in km
          const durText = response.rows[0].elements[0].duration.text;
          setDistance(distValue);
          setDuration(durText);
        } else {
          console.error('Distance calculation failed:', status);
        }
      }
    );
  };

  // Recalculate estimate
  useEffect(() => {
    if (distance && rates[vehicle]) {
      let rate = rates[vehicle];
      let totalCost = 0;

      if (activeTab === 'round') {
        const minKm = days * 250;
        const actualRoundTripKm = distance * 2;
        const chargeableKm = Math.max(minKm, actualRoundTripKm);
        
        const baseFare = chargeableKm * rate;
        const driverBata = days * 300;
        
        totalCost = baseFare + driverBata;
      } else {
        totalCost = distance * rate;
      }

      setEstimate(Math.round(totalCost));
    } else {
      setEstimate(0);
    }
  }, [distance, vehicle, activeTab, days]);

  // Auto-fill Airport Location
  useEffect(() => {
    if (activeTab === 'airport') {
      if (airportMode === 'drop') {
        setDrop('Chennai International Airport (MAA)');
        if (pickup === 'Chennai International Airport (MAA)') setPickup('');
      } else {
        setPickup('Chennai International Airport (MAA)');
        if (drop === 'Chennai International Airport (MAA)') setDrop('');
      }
    } else {
      // Clear Airport if switching to One Way / Round Trip
      if (drop === 'Chennai International Airport (MAA)') setDrop('');
      if (pickup === 'Chennai International Airport (MAA)') setPickup('');
    }
  }, [activeTab, airportMode]);

  const handleWhatsApp = async () => {
    // 1. Send Data to Google Sheet (Fire and Forget)
    const bookingData = {
      date: new Date().toLocaleString(),
      tripType: activeTab,
      name: name || 'Anonymous',
      phone: phone || 'Not Provided',
      pickup,
      drop,
      vehicle,
      passengers,
      distance: distance ? distance.toFixed(1) : '',
      estimate,
      travelDate: date
    };

    try {
      // Replace with your deployed Google Apps Script Web App URL
      // We use no-cors because Google Scripts don't support CORS for simple POSTs easily, 
      // but the data still gets sent.
      await fetch('https://script.google.com/macros/s/AKfycbwoEpKqa3Qg-DIvMe06pGUgGLlC_0vJQev61nzIh9ssh1-uHZ5VtYkGzpMVwhEyi7tvEQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(bookingData)
      });
    } catch (e) {
      console.error("Error logging to sheet", e);
    }

    // 2. Open WhatsApp
    const message = `*New Booking Request*
    
*Customer:* ${name}
*Phone:* ${phone}
*Trip Details:*
🚗 Type: ${activeTab === 'airport' ? 'Airport Transfer' : activeTab === 'round' ? 'Round Trip' : 'One Way'}
🚙 Vehicle: ${vehicle}
👥 Passengers: ${passengers}
📍 Pickup: ${pickup}
📍 Drop: ${drop}
📅 Date: ${date ? new Date(date).toLocaleString() : 'Not Specified'}
📏 Distance: ${distance ? distance.toFixed(1) : 'N/A'} km ${activeTab === 'round' ? `(Round Trip: ${(distance * 2).toFixed(1)} km)` : ''}
⏱️ Duration: ${duration || 'N/A'}
${activeTab === 'round' ? `📅 Days: ${days}` : ''}
💰 Est. Cost: ₹${estimate}

_Please confirm availability._`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919092303060?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-0 border-t-4 border-red-600 overflow-hidden">
      <h2 className="text-lg font-bold text-center text-gray-800 py-2 border-b border-gray-100">
        Book Your Ride
      </h2>
      
      {/* Tabs - Compact */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('oneway')}
          className={`flex-1 py-2 text-xs text-center font-bold tracking-wide uppercase transition flex items-center justify-center gap-1 ${
            activeTab === 'oneway'
              ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
              : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <ArrowRight className="w-3 h-3" />
          <span>One Way</span>
        </button>
        <button
          onClick={() => setActiveTab('round')}
          className={`flex-1 py-2 text-xs text-center font-bold tracking-wide uppercase transition flex items-center justify-center gap-1 ${
            activeTab === 'round'
              ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
              : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <Repeat className="w-3 h-3" />
          <span>Round Trip</span>
        </button>
        <button
          onClick={() => setActiveTab('airport')}
          className={`flex-1 py-2 text-xs text-center font-bold tracking-wide uppercase transition flex items-center justify-center gap-1 ${
            activeTab === 'airport'
              ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
              : 'text-gray-500 hover:text-red-600'
          }`}
        >
          <Plane className="w-3 h-3" />
          <span>Airport</span>
        </button>
      </div>

      <div className="p-4 space-y-3">
        
        {/* Airport Mode Toggle */}
        {activeTab === 'airport' && (
          <div className="flex justify-center mb-2">
            <div className="bg-gray-100 p-1 rounded-lg flex text-[10px] font-bold">
              <button
                onClick={() => setAirportMode('drop')}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  airportMode === 'drop' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                To Airport
              </button>
              <button
                onClick={() => setAirportMode('pickup')}
                className={`px-4 py-1.5 rounded-md transition-all ${
                  airportMode === 'pickup' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500'
                }`}
              >
                From Airport
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          
          {/* Pickup - Full Width */}
          <div className="col-span-2 relative group">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Pickup Location</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 ring-red-500 transition">
              <MapPin className="text-red-500 mr-2 w-4 h-4" />
              <input
                ref={pickupInputRef}
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter City / Area"
                className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium"
              />
            </div>
          </div>

          {/* Drop - Full Width */}
          <div className="col-span-2 relative group">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Drop Location</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 ring-red-500 transition">
              <MapPin className="text-gray-400 mr-2 w-4 h-4" />
              <input
                ref={dropInputRef}
                type="text"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Enter Destination"
                className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium"
              />
            </div>
          </div>

          {/* Date - Full Width */}
          <div className="col-span-2 relative group">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Pickup Date</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 ring-red-500 transition">
              <Calendar className="text-red-500 mr-2 w-4 h-4" />
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium cursor-pointer"
              />
            </div>
          </div>

          {/* Passengers - Half Width */}
          <div className="col-span-1 relative group">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Passengers</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 ring-red-500 transition">
              <Users className="text-red-500 mr-2 w-4 h-4" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium appearance-none cursor-pointer"
              >
                <option value="4">4+ Driver</option>
                <option value="6">6+ Driver</option>
                <option value="7">7+ Driver</option>
                <option value="12">12+ Driver</option>
              </select>
            </div>
          </div>

          {/* Vehicle - Half Width */}
          <div className="col-span-1 relative group">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Vehicle (Auto)</label>
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2">
              <Car className="text-gray-500 mr-2 w-4 h-4" />
              <select
                value={vehicle}
                disabled
                className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium appearance-none cursor-not-allowed"
              >
                {vehicleOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Days (Round Trip) - Half Width */}
          {activeTab === 'round' && (
            <div className="col-span-1 relative group">
              <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Days</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 ring-red-500 transition">
                <Calendar className="text-red-500 mr-2 w-4 h-4" />
                <input
                  type="number"
                  min="1"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium"
                />
              </div>
            </div>
          )}

          {/* Name - Half Width */}
          <div className="col-span-1 relative group">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Name</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 ring-red-500 transition">
              <User className="text-gray-400 mr-2 w-4 h-4" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium"
              />
            </div>
          </div>

          {/* Phone - Half Width */}
          <div className="col-span-1 relative group">
            <label className="text-[10px] font-bold text-gray-500 uppercase mb-0.5 block">Phone</label>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 ring-red-500 transition">
              <Phone className="text-gray-400 mr-2 w-4 h-4" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile Number"
                className="bg-transparent w-full outline-none text-sm text-gray-700 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Distance Info - Compact */}
        {distance && (
          <div className="flex flex-row justify-between text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
            <div>
              <span className="block text-[10px] text-gray-400 uppercase">Distance</span>
              <strong>{distance.toFixed(1)} km</strong>
            </div>
            {activeTab === 'round' && (
              <div>
                <span className="block text-[10px] text-gray-400 uppercase">Round Trip</span>
                <strong className="text-red-600">{(distance * 2).toFixed(1)} km</strong>
              </div>
            )}
            <div className="text-right">
              <span className="block text-[10px] text-gray-400 uppercase">Duration</span>
              <strong>{duration}</strong>
            </div>
          </div>
        )}

        {/* Estimate - Compact */}
        <div className="bg-red-50 rounded-lg p-3 flex flex-col gap-2 border border-red-100">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-red-600 font-bold uppercase">Total Estimate</p>
              <div className="flex items-baseline gap-1">
                {loading ? (
                  <span className="text-lg text-gray-400 animate-pulse">...</span>
                ) : (
                  <p className="text-2xl font-black text-gray-800 leading-none">
                    ₹ {estimate > 0 ? estimate.toLocaleString() : '0'}
                  </p>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">*Excludes Tolls/Parking</p>
            </div>
            
            {estimate > 0 && (
               <div className="text-[10px] text-right text-gray-500">
                  <div>Rate: ₹{rates[vehicle]}/km</div>
                  {activeTab === 'round' && <div>+ Bata: ₹{days * 300}</div>}
               </div>
            )}
          </div>
          
          <button
            onClick={handleWhatsApp}
            disabled={estimate === 0}
            className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-transform shadow-sm ${
              estimate > 0 
                ? 'bg-[#25D366] hover:bg-[#20bd5a] text-white active:scale-95' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
            Book on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
