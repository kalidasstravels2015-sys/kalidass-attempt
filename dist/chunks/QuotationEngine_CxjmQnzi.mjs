import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useId, useEffect, useRef } from 'react';
import { Car, ArrowRight, Repeat, AlertCircle, MapPin, Users, User, Phone, Calendar, Send, Plane } from 'lucide-react';
import 'web-vitals';

const trackEvent = (eventName, params = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  } else {
    console.log("[Analytics] Event:", eventName, params);
  }
};

const rates = {
  "Swift Dzire": 11,
  "Toyota Etios": 12,
  "Innova": 15,
  "Innova Crysta": 18,
  "Tempo Traveller": 21
};
const vehicleOptions = Object.keys(rates);
const sanitizeInput = (input) => {
  if (typeof input !== "string") return input;
  return input.replace(/[<>"'/`]/g, "").trim().slice(0, 100);
};
const ERROR_MSGS = {
  active: { en: "Too many attempts. Try again later.", ta: "அதிக முயற்சிகள். பின்னர் முயற்சிக்கவும்." },
  name: { en: "Name: 2-50 letters only", ta: "பெயர்: 2-50 எழுத்துக்கள் மட்டும்" },
  phone: { en: "Invalid Indian mobile number", ta: "தவறான மொபைல் எண்" },
  locations: { en: "Enter valid pickup & drop locations", ta: "சரியான இடங்களை உள்ளிடவும்" },
  date: { en: "Date must be in future", ta: "தேதி எதிர்காலத்தில் இருக்க வேண்டும்" }
};
function QuotationEngine({ showAirportTab = true, showBookingButton = true, title = "Book Your Ride", variant = "default" }) {
  const [activeTab, setActiveTab] = useState("oneway");
  const [airportMode, setAirportMode] = useState("drop");
  const [vehicle, setVehicle] = useState("Swift Dzire");
  const [passengers, setPassengers] = useState("4");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [estimate, setEstimate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [errors, setErrors] = useState({});
  const [botField, setBotField] = useState("");
  const formId = useId();
  useEffect(() => {
    trackEvent("booking_component_viewed", { variant });
  }, []);
  useEffect(() => {
    trackEvent("trip_type_selected", { trip_type: activeTab });
  }, [activeTab]);
  useEffect(() => {
    if (estimate > 0) {
      trackEvent("estimate_calculated", { vehicle, trip_type: activeTab, estimate, distance });
    }
  }, [estimate]);
  const pickupInputRef = useRef(null);
  const dropInputRef = useRef(null);
  const checkRateLimit = () => {
    try {
      const attempts = JSON.parse(localStorage.getItem("booking_attempts") || "[]");
      const now = Date.now();
      const oneHour = 60 * 60 * 1e3;
      const recent = attempts.filter((time) => now - time < oneHour);
      if (recent.length >= 5) {
        setErrors((prev) => ({ ...prev, global: ERROR_MSGS.active.en + " / " + ERROR_MSGS.active.ta }));
        return false;
      }
      recent.push(now);
      localStorage.setItem("booking_attempts", JSON.stringify(recent));
      return true;
    } catch (e) {
      return true;
    }
  };
  const validateField = (field, value) => {
    let error = null;
    const sanitized = sanitizeInput(value);
    switch (field) {
      case "name":
        if (!/^[a-zA-Z\s\.]{2,50}$/.test(sanitized)) {
          error = `${ERROR_MSGS.name.en} | ${ERROR_MSGS.name.ta}`;
        }
        break;
      case "phone":
        if (!/^[6-9]\d{9}$/.test(sanitized)) {
          error = `${ERROR_MSGS.phone.en} | ${ERROR_MSGS.phone.ta}`;
        }
        break;
      case "date":
        if (value && new Date(value) < /* @__PURE__ */ new Date()) {
          error = `${ERROR_MSGS.date.en} | ${ERROR_MSGS.date.ta}`;
        }
        break;
      case "location":
        if (sanitized.length > 0 && !/^[a-zA-Z0-9\s,.-]+$/.test(sanitized)) {
          error = "Invalid characters in location";
        }
        break;
    }
    return error;
  };
  const activeValidate = (field, value) => {
    const error = validateField(field, value);
    setErrors((prev) => {
      const newErrors = { ...prev };
      if (error) newErrors[field] = error;
      else delete newErrors[field];
      return newErrors;
    });
    return !error;
  };
  useEffect(() => {
    const pax = parseInt(passengers);
    if (pax <= 4) setVehicle("Swift Dzire");
    else if (pax <= 6) setVehicle("Innova");
    else if (pax <= 7) setVehicle("Innova Crysta");
    else setVehicle("Tempo Traveller");
    setShowResult(false);
  }, [passengers]);
  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) return;
      const options = {
        componentRestrictions: { country: "in" },
        fields: ["place_id", "geometry", "name", "formatted_address"]
      };
      if (pickupInputRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupInputRef.current, options);
        pickupAutocomplete.addListener("place_changed", () => {
          const place = pickupAutocomplete.getPlace();
          if (place.formatted_address) {
            setPickup(sanitizeInput(place.formatted_address));
            activeValidate("location", place.formatted_address);
            calculateDistance(place.formatted_address, drop);
            setShowResult(false);
          }
        });
      }
      if (dropInputRef.current) {
        const dropAutocomplete = new window.google.maps.places.Autocomplete(dropInputRef.current, options);
        dropAutocomplete.addListener("place_changed", () => {
          const place = dropAutocomplete.getPlace();
          if (place.formatted_address) {
            setDrop(sanitizeInput(place.formatted_address));
            activeValidate("location", place.formatted_address);
            calculateDistance(pickup, place.formatted_address);
            setShowResult(false);
          }
        });
      }
    };
    if (window.google && window.google.maps) {
      initAutocomplete();
    } else {
      window.addEventListener("google-maps-loaded", initAutocomplete);
      return () => window.removeEventListener("google-maps-loaded", initAutocomplete);
    }
  }, [pickup, drop, activeTab, airportMode]);
  const calculateDistance = (origin, destination) => {
    if (!origin || !destination || !window.google) return;
    if (activeValidate("location", origin) && activeValidate("location", destination)) {
      setLoading(true);
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          setLoading(false);
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distValue = response.rows[0].elements[0].distance.value / 1e3;
            const durText = response.rows[0].elements[0].duration.text;
            setDistance(distValue);
            setDuration(durText);
          } else {
            console.error("Distance calculation failed:", status);
          }
        }
      );
    }
  };
  useEffect(() => {
    if (distance && rates[vehicle]) {
      let rate = rates[vehicle];
      let totalCost = 0;
      if (activeTab === "round") {
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
  useEffect(() => {
    if (activeTab === "airport") {
      if (airportMode === "drop") {
        setDrop("Chennai International Airport (MAA)");
        if (pickup.includes("Airport")) setPickup("");
      } else {
        setPickup("Chennai International Airport (MAA)");
        if (drop.includes("Airport")) setDrop("");
      }
    }
  }, [activeTab, airportMode]);
  const handleWhatsApp = async () => {
    if (botField) {
      console.warn("Bot detected");
      return;
    }
    const isNameValid = activeValidate("name", name);
    const isPhoneValid = activeValidate("phone", phone);
    const isDateValid = date ? activeValidate("date", date) : true;
    const isPickupValid = pickup.length > 0;
    const isDropValid = drop.length > 0;
    if (!isNameValid || !isPhoneValid || !isDateValid || !isPickupValid || !isDropValid) {
      setErrors((prev) => ({
        ...prev,
        global: "Please fix errors above / மேலே உள்ள பிழைகளை சரிசெய்யவும்"
      }));
      trackEvent("booking_validation_error", {
        trip_type: activeTab
      });
      return;
    }
    if (!checkRateLimit()) return;
    trackEvent("booking_submit_attempt", { trip_type: activeTab, vehicle, estimate });
    const bookingData = {
      date: (/* @__PURE__ */ new Date()).toLocaleString(),
      tripType: activeTab,
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      pickup: sanitizeInput(pickup),
      drop: sanitizeInput(drop),
      vehicle,
      passengers,
      distance: distance ? distance.toFixed(1) : "",
      estimate,
      travelDate: date
    };
    try {
      await fetch("https://script.google.com/macros/s/AKfycbwoEpKqa3Qg-DIvMe06pGUgGLlC_0vJQev61nzIh9ssh1-uHZ5VtYkGzpMVwhEyi7tvEQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(bookingData)
      });
    } catch (e) {
      console.log("Logging simplified");
    }
    const message = `*New Booking Request*
    
*Customer:* ${sanitizeInput(name)}
*Phone:* ${sanitizeInput(phone)}
*Trip Details:*
🚗 Type: ${activeTab === "airport" ? "Airport Transfer" : activeTab === "round" ? "Round Trip" : "One Way"}
🚙 Vehicle: ${vehicle}
👥 Passengers: ${passengers}
📍 Pickup: ${sanitizeInput(pickup)}
📍 Drop: ${sanitizeInput(drop)}
📅 Date: ${date ? new Date(date).toLocaleString() : "Not Specified"}
📏 Distance: ${distance ? distance.toFixed(1) : "N/A"} km ${activeTab === "round" ? `(Round Trip: ${(distance * 2).toFixed(1)} km)` : ""}
202: ⏱️ Duration: ${duration || "N/A"}
${activeTab === "round" ? `📅 Days: ${days}` : ""}
💰 Est. Cost: ₹${estimate}

_Please confirm availability._`;
    trackEvent("booking_conversion_whatsapp", {
      estimate,
      trip_type: activeTab,
      vehicle
    });
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919092303060?text=${encodedMessage}`, "_blank");
  };
  const getInputClass = (field) => {
    return `flex items-center bg-slate-50 border rounded-xl px-4 py-3 transition-all ${errors[field] ? "border-red-500 ring-1 ring-red-500 bg-red-50" : "border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20"}`;
  };
  if (variant === "card") {
    return /* @__PURE__ */ jsxs("div", { className: "w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden font-sans", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          name: "website_url",
          style: { display: "none" },
          value: botField,
          onChange: (e) => setBotField(e.target.value),
          tabIndex: -1,
          autoComplete: "off"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "p-6 pb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsx(Car, { className: "w-10 h-10 text-indigo-600" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-slate-900", children: title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-500", children: "Get Instant Quote" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "px-6 mb-6", children: /* @__PURE__ */ jsx("div", { className: "bg-slate-100 p-1 rounded-xl flex", children: ["oneway", "round"].map((tab) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            setActiveTab(tab);
            setShowResult(false);
          },
          className: `flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`,
          "aria-current": activeTab === tab ? "page" : void 0,
          children: [
            tab === "oneway" ? /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(Repeat, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxs("span", { className: "capitalize", children: [
              tab,
              " Trip"
            ] })
          ]
        },
        tab
      )) }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-6 pb-8 space-y-5", children: [
        errors.global && /* @__PURE__ */ jsxs("div", { className: "p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4" }),
          " ",
          errors.global
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          ["Pickup", "Drop"].map((type) => /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: `${formId}-${type.toLowerCase()}`,
                className: "block text-xs font-bold text-slate-600 uppercase mb-1.5",
                children: [
                  type,
                  " Location"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: getInputClass("location"), children: [
              /* @__PURE__ */ jsx(MapPin, { className: `${type === "Pickup" ? "text-indigo-500" : "text-slate-400"} mr-3 w-5 h-5`, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: `${formId}-${type.toLowerCase()}`,
                  ref: type === "Pickup" ? pickupInputRef : dropInputRef,
                  type: "text",
                  value: type === "Pickup" ? pickup : drop,
                  onChange: (e) => {
                    const val = e.target.value;
                    type === "Pickup" ? setPickup(val) : setDrop(val);
                    setShowResult(false);
                  },
                  placeholder: "Enter City / Area",
                  className: "bg-transparent w-full outline-none text-sm text-slate-700 font-medium"
                }
              )
            ] })
          ] }, type)),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-passengers`, className: "block text-xs font-bold text-slate-600 uppercase mb-1.5", children: "Passengers" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500/20", children: [
                /* @__PURE__ */ jsx(Users, { className: "text-indigo-500 mr-3 w-5 h-5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    id: `${formId}-passengers`,
                    value: passengers,
                    onChange: (e) => {
                      setPassengers(e.target.value);
                      setShowResult(false);
                    },
                    className: "bg-transparent w-full outline-none text-sm text-slate-700 font-medium appearance-none",
                    children: ["4", "6", "7", "12"].map((n) => /* @__PURE__ */ jsxs("option", { value: n, children: [
                      n,
                      "+ Driver"
                    ] }, n))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-vehicle`, className: "block text-xs font-bold text-slate-600 uppercase mb-1.5", children: "Vehicle" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-100 border border-slate-200 rounded-xl px-4 py-3", children: [
                /* @__PURE__ */ jsx(Car, { className: "text-slate-500 mr-3 w-5 h-5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("select", { id: `${formId}-vehicle`, value: vehicle, disabled: true, className: "bg-transparent w-full outline-none text-sm text-slate-700 font-medium appearance-none cursor-not-allowed", children: vehicleOptions.map((v) => /* @__PURE__ */ jsx("option", { value: v, children: v }, v)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative group col-span-2 md:col-span-1", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-name`, className: "block text-xs font-bold text-slate-600 uppercase mb-1.5", children: "Name" }),
              /* @__PURE__ */ jsxs("div", { className: getInputClass("name"), children: [
                /* @__PURE__ */ jsx(User, { className: "text-slate-400 mr-3 w-5 h-5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: `${formId}-name`,
                    type: "text",
                    value: name,
                    onChange: (e) => {
                      setName(e.target.value);
                      activeValidate("name", e.target.value);
                    },
                    placeholder: "Your Name",
                    className: "bg-transparent w-full outline-none text-sm text-slate-700 font-medium"
                  }
                )
              ] }),
              errors.name && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-500 mt-1", role: "alert", children: errors.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "relative group col-span-2 md:col-span-1", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-phone`, className: "block text-xs font-bold text-slate-600 uppercase mb-1.5", children: "Phone" }),
              /* @__PURE__ */ jsxs("div", { className: getInputClass("phone"), children: [
                /* @__PURE__ */ jsx(Phone, { className: "text-slate-400 mr-3 w-5 h-5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: `${formId}-phone`,
                    type: "tel",
                    value: phone,
                    onChange: (e) => {
                      setPhone(e.target.value);
                      activeValidate("phone", e.target.value);
                    },
                    placeholder: "Mobile Number",
                    className: "bg-transparent w-full outline-none text-sm text-slate-700 font-medium"
                  }
                )
              ] }),
              errors.phone && /* @__PURE__ */ jsx("p", { className: "text-[10px] text-red-500 mt-1", role: "alert", children: errors.phone })
            ] }),
            activeTab === "round" && /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-days`, className: "block text-xs font-bold text-slate-600 uppercase mb-1.5", children: "Days" }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500/20", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "text-indigo-500 mr-3 w-5 h-5", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: `${formId}-days`,
                    type: "number",
                    min: "1",
                    value: days,
                    onChange: (e) => setDays(parseInt(e.target.value) || 1),
                    className: "bg-transparent w-full outline-none text-sm text-slate-700 font-medium"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center shadow-lg",
              onClick: () => setShowResult(true),
              children: [
                "Calculate Cost ",
                /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
              ]
            }
          ),
          showResult && /* @__PURE__ */ jsxs("div", { className: "space-y-4 animate-in fade-in slide-in-from-top-4 duration-300", children: [
            distance && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "block text-[10px] uppercase font-bold text-slate-400", children: "Distance" }),
                /* @__PURE__ */ jsxs("strong", { children: [
                  distance.toFixed(1),
                  " km"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "block text-[10px] uppercase font-bold text-slate-400", children: "Time" }),
                /* @__PURE__ */ jsx("strong", { children: duration })
              ] })
            ] }),
            estimate > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 rounded-2xl p-4 border border-emerald-100", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-4", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-emerald-700 font-bold uppercase", children: "Total Estimate" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-3xl font-black text-slate-800", children: [
                    "₹ ",
                    estimate.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-[10px] text-slate-500 text-right", children: [
                  "Rate: ₹",
                  rates[vehicle],
                  "/km"
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: handleWhatsApp,
                  className: "w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95",
                  children: [
                    /* @__PURE__ */ jsx(Send, { className: "w-4 h-4" }),
                    " Book on WhatsApp"
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl shadow-xl border-t-4 border-red-600 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        name: "website_url",
        style: { display: "none" },
        value: botField,
        onChange: (e) => setBotField(e.target.value),
        tabIndex: -1
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-center text-gray-800 py-2 border-b border-gray-100", children: title }),
    /* @__PURE__ */ jsx("div", { className: "flex border-b border-gray-100", children: ["oneway", "round", "airport"].map((tab) => (tab !== "airport" || showAirportTab) && /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setActiveTab(tab),
        className: `flex-1 py-2 text-xs text-center font-bold uppercase flex items-center justify-center gap-1 ${activeTab === tab ? "text-red-600 border-b-2 border-red-600 bg-red-50" : "text-gray-600"}`,
        "aria-current": activeTab === tab ? "page" : void 0,
        children: [
          tab === "airport" ? /* @__PURE__ */ jsx(Plane, { className: "w-3 h-3" }) : tab === "round" ? /* @__PURE__ */ jsx(Repeat, { className: "w-3 h-3" }) : /* @__PURE__ */ jsx(ArrowRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsx("span", { className: "hidden xs:inline", children: tab === "airport" ? "Airport" : tab === "round" ? "Round Trip" : "One Way" })
        ]
      },
      tab
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "p-4 space-y-3", children: [
      activeTab === "airport" && /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-100 p-1 rounded-lg flex text-[10px] font-bold", children: ["drop", "pickup"].map((mode) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setAirportMode(mode),
          className: `px-4 py-1.5 rounded-md transition-all ${airportMode === mode ? "bg-white text-red-600 shadow-sm" : "text-gray-600"}`,
          "aria-pressed": airportMode === mode,
          children: mode === "drop" ? "To Airport" : "From Airport"
        },
        mode
      )) }) }),
      errors.global && /* @__PURE__ */ jsxs("div", { className: "p-2 bg-red-50 text-red-600 text-[10px] font-bold rounded flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(AlertCircle, { className: "w-3 h-3" }),
        " ",
        errors.global
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        ["Pickup", "Drop"].map((type) => /* @__PURE__ */ jsxs("div", { className: "col-span-2 relative group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-mobile-${type}`, className: "text-[10px] font-bold text-gray-700 uppercase mb-0.5 block", children: type }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus-within:ring-1 focus-within:ring-red-500 transition", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "text-red-500 mr-2 w-4 h-4", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: `${formId}-mobile-${type}`,
                ref: type === "Pickup" ? pickupInputRef : dropInputRef,
                value: type === "Pickup" ? pickup : drop,
                onChange: (e) => type === "Pickup" ? setPickup(e.target.value) : setDrop(e.target.value),
                placeholder: "Enter Location",
                className: "bg-transparent w-full outline-none text-sm text-gray-700"
              }
            )
          ] })
        ] }, type)),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-mobile-name`, className: "text-[10px] font-bold text-gray-700 uppercase mb-0.5 block", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: `${formId}-mobile-name`,
              value: name,
              onChange: (e) => {
                setName(e.target.value);
                activeValidate("name", e.target.value);
              },
              placeholder: "Name",
              className: `w-full bg-gray-50 border rounded-lg px-3 py-2 text-sm outline-none ${errors.name ? "border-red-500" : "border-gray-200 focus:ring-1 focus:ring-red-500"}`
            }
          ),
          errors.name && /* @__PURE__ */ jsx("p", { className: "text-[8px] text-red-500", role: "alert", children: errors.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-mobile-phone`, className: "text-[10px] font-bold text-gray-700 uppercase mb-0.5 block", children: "Phone" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: `${formId}-mobile-phone`,
              value: phone,
              onChange: (e) => {
                setPhone(e.target.value);
                activeValidate("phone", e.target.value);
              },
              placeholder: "Mobile",
              className: `w-full bg-gray-50 border rounded-lg px-3 py-2 text-sm outline-none ${errors.phone ? "border-red-500" : "border-gray-200 focus:ring-1 focus:ring-red-500"}`
            }
          ),
          errors.phone && /* @__PURE__ */ jsx("p", { className: "text-[8px] text-red-500", role: "alert", children: errors.phone })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: `${formId}-mobile-date`, className: "text-[10px] font-bold text-gray-700 uppercase mb-0.5 block", children: "Date" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: `${formId}-mobile-date`,
              type: "datetime-local",
              value: date,
              onChange: (e) => setDate(e.target.value),
              className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-emerald-700 font-bold uppercase", children: "Estimate" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xl font-black text-gray-800", children: [
            "₹ ",
            estimate > 0 ? estimate.toLocaleString() : "0"
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleWhatsApp,
            disabled: estimate === 0,
            className: `px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 ${estimate > 0 ? "bg-[#25D366] text-white hover:bg-[#20bd5a]" : "bg-gray-300 text-gray-500"}`,
            children: [
              /* @__PURE__ */ jsx(Send, { className: "w-3 h-3" }),
              " Book"
            ]
          }
        )
      ] })
    ] })
  ] });
}

export { QuotationEngine as Q, trackEvent as t };
