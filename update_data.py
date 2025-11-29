import json

data = [
  {
    "slug": "acting-driver-within-chennai",
    "category": "Acting Driver Services",
    "title": "Acting Driver – Within Chennai",
    "overview": "Professional acting driver service for your personal car within Chennai city limits. Ideal for office commute, shopping, hospital visits, family travel, elderly support.",
    "tariff": {
      "headers": ["Duration", "Charges"],
      "rows": [
        ["2 Hours", "₹350"],
        ["4 Hours", "₹500"],
        ["8 Hours (Full Day)", "₹800"],
        ["Extra Hour", "₹100/hr"],
        ["Night Duty (10 PM – 5 AM)", "+₹150"]
      ],
      "note": "KM Not Counted — Only time-based."
    },
    "includes": ["Background-verified driver", "Manual & automatic car support", "Smooth & safe driving"],
    "excludes": ["Parking", "Toll", "Food (not needed for city trips)"],
    "faq": [
      { "q": "Can I extend hours?", "a": "Yes. ₹100/hr." },
      { "q": "Will the driver help with luggage?", "a": "Yes, light luggage." },
      { "q": "Can I book last-minute?", "a": "Usually available; depends on peak time." }
    ],
    "notes": ["Service starts & ends at your location.", "No hidden charges."],
    "whatsappMsg": "Hi, I need an Acting Driver within Chennai."
  },
  {
    "slug": "acting-driver-outstation-one-way",
    "category": "Acting Driver Services",
    "title": "Acting Driver – Outstation One Way",
    "overview": "Driver takes your personal car from Chennai to any destination outside Chennai (only drop-off, no return).",
    "tariff": {
      "headers": ["Component", "Rate"],
      "rows": [
        ["Base (first 150 km)", "₹1,500"],
        ["Additional Distance", "₹10/km"],
        ["Night Halt (if needed)", "₹400"]
      ]
    },
    "includes": ["Professional highway driver", "Safe long-distance driving"],
    "excludes": ["Driver food", "Return travel (if required)"],
    "faq": [
      { "q": "What if the trip cancels?", "a": "Before dispatch → Free. After dispatch → ₹300" },
      { "q": "Can I get a return driver separately?", "a": "Yes, book separately." }
    ],
    "whatsappMsg": "Hi, I need an outstation one-way driver."
  },
  {
    "slug": "acting-driver-outstation-round-trip",
    "category": "Acting Driver Services",
    "title": "Acting Driver – Outstation Round Trip",
    "overview": "Driver accompanies your car for onward & return trip. Suitable for family functions, temple tours, business travel.",
    "tariff": {
      "headers": ["Vehicle Type", "Driver Bata", "Night Charge"],
      "rows": [
        ["Sedan", "₹500", "₹150"],
        ["SUV", "₹600", "₹150"],
        ["Crysta", "₹700", "₹150"]
      ]
    },
    "faq": [
      { "q": "How many hours is 1 day?", "a": "Up to 14 hours." },
      { "q": "Is food mandatory for long trips?", "a": "If trip exceeds 10 hrs, food allowance appreciated." }
    ],
    "whatsappMsg": "Hi, I need an outstation round-trip acting driver."
  },
  {
    "slug": "night-driving-driver",
    "category": "Acting Driver Services",
    "title": "Night Driving Driver",
    "overview": "Night driving specialist for late-night events, airport trips, emergencies.",
    "tariff": {
      "headers": ["Duration", "Rate"],
      "rows": [
        ["Up to 3 hrs", "₹600"],
        ["Extra hr", "₹150"]
      ]
    },
    "includes": ["Night safety trained drivers", "Doorstep pickup"],
    "faq": [
      { "q": "Is waiting charge extra?", "a": "Yes, counted as extra hour." }
    ],
    "whatsappMsg": "Hi, I need a night driving driver."
  },
  {
    "slug": "driver-for-senior-citizens",
    "category": "Acting Driver Services",
    "title": "Driver for Senior Citizens",
    "overview": "Gentle, patient, verified drivers for elderly travel like temple trips, hospitals, day outings.",
    "tariff": {
      "headers": ["Duration", "Rate"],
      "rows": [
        ["4 Hours", "₹500"],
        ["8 Hours", "₹800"],
        ["Extra Hour", "₹100"]
      ]
    },
    "includes": ["Assistance getting in/out", "Slow & steady driving", "Respectful behaviour"],
    "faq": [
      { "q": "Can driver accompany inside hospital?", "a": "Yes (short duration)." }
    ],
    "whatsappMsg": "Hi, I need a driver for senior citizen travel."
  },
  {
    "slug": "office-commute-driver-monthly",
    "category": "Acting Driver Services",
    "title": "Office Commute Driver (Monthly)",
    "overview": "Daily home → office → home driver arrangement.",
    "tariff": {
      "headers": ["Plan", "Pricing"],
      "rows": [
        ["1 Shift (pickup or drop)", "₹12,000/month"],
        ["2 Shift (pickup + drop)", "₹15,000/month"]
      ]
    },
    "notes": ["Limited to Chennai city limits", "Fuel borne by customer"],
    "whatsappMsg": "Hi, I need a monthly office commute driver."
  },
  {
    "slug": "monthly-car-with-driver-corporate",
    "category": "Corporate Travel",
    "title": "Monthly Car With Driver (Corporate Plan)",
    "overview": "Your company deserves reliable travel with no surprises. We share all charges upfront — no sudden add-ons, no confusion.\n\n⭐ Who is this for?\nCompanies needing a dedicated car + driver for:\n- Daily official visits\n- Client meetings\n- Transporting staff safely\n- Management-level mobility",
    "tariff": {
      "headers": ["Vehicle", "Monthly Rate", "Driver Hours", "Note"],
      "rows": [
        ["Sedan", "₹38,000", "10 hrs/day", "Fuel extra (actuals)"],
        ["SUV (Ertiga/XL6)", "₹48,000", "10 hrs/day", "–"],
        ["Innova", "₹58,000", "10 hrs/day", "–"]
      ],
      "note": "Friendly Hint ❤️: We show per-day & per-hour structure openly so your finance team can plan properly. No end-of-month shocks."
    },
    "includes": [
      "Dedicated driver daily",
      "Driver replacements on leave",
      "Basic car cleaning",
      "Monthly report (optional)",
      "No hidden charges",
      "Replacement driver support",
      "Professional behaviour & punctuality",
      "Monthly invoice support",
      "Real-time communication"
    ],
    "excludes": [
      "Fuel (actual usage)",
      "Toll, parking (actuals)"
    ],
    "faq": [
      { "q": "What if driver is sick?", "a": "We send a replacement automatically." },
      { "q": "Can I extend hours?", "a": "Yes, ₹100/hr overtime." }
    ],
    "whatsappMsg": "Hi, I need a monthly corporate car plan."
  },
  {
    "slug": "employee-pickup-drop",
    "category": "Corporate Travel",
    "title": "Employee Pickup & Drop",
    "overview": "A safe and punctual system for daily staff movement. We are fully transparent so HR can plan without worry.",
    "tariff": {
      "headers": ["Service", "Rate"],
      "rows": [
        ["Per Trip", "₹350 – ₹500"],
        ["Monthly (One Person)", "₹10,000 – ₹14,000"]
      ],
      "note": "Friendly Hint: We calculate tariff based on route km, traffic hours, and number of stops. Everything is communicated clearly."
    },
    "includes": [
      "Safety-first policy (especially for women staff)",
      "GPS tracking on request",
      "No hidden route charges",
      "Drivers trained for corporate etiquette"
    ],
    "faq": [
      { "q": "Is multi-stop allowed?", "a": "Yes → ₹50–₹100 per extra stop." }
    ],
    "whatsappMsg": "Need staff pickup/drop service."
  },
  {
    "slug": "business-trip-car-rental",
    "category": "Corporate Travel",
    "title": "Business Trip Car Rental",
    "overview": "Perfect for meetings, client visits, and day-long travel.",
    "tariff": {
      "headers": ["Package", "Sedan", "SUV", "Crysta"],
      "rows": [
        ["4 hrs / 40 km", "₹1,300", "₹1,800", "₹2,500"],
        ["8 hrs / 80 km", "₹2,000", "₹2,800", "₹3,800"],
        ["Extra km", "₹13/km", "₹16/km", "₹20/km"]
      ],
      "note": "Friendly Note: We keep our packages simple so you don’t have to calculate anything."
    },
    "faq": [
      { "q": "Can I extend the 4-hour package?", "a": "Yes, extra hours billed as extra km + ₹100/hr." }
    ],
    "whatsappMsg": "Book car for business meetings."
  },
  {
    "slug": "corporate-airport-transfer",
    "category": "Corporate Travel",
    "title": "Corporate Airport Transfer",
    "overview": "Friendly, simple, reassuring and fully transparent.",
    "tariff": {
      "headers": ["Vehicle", "Price"],
      "rows": [
        ["Sedan", "₹800"],
        ["SUV", "₹1,200"],
        ["Crysta", "₹1,700"]
      ],
      "note": "Parking & toll extra (actual)."
    },
    "includes": [
      "Fixed pricing",
      "Guaranteed on-time pickup",
      "Drivers trained for airport protocols",
      "GST bills available (optional)",
      "Transparent tariff (nothing hidden)"
    ],
    "whatsappMsg": "Corporate airport transfer required."
  },
  {
    "slug": "airport-drop-sedan",
    "category": "Airport Transfers",
    "title": "Airport Drop – Sedan",
    "overview": "Airport travel should feel peaceful, not stressful. We keep all charges upfront.",
    "tariff": {
      "headers": ["Route", "Fare"],
      "rows": [
        ["Most Chennai Zones", "₹800 – ₹1,000"],
        ["Long-distance zones (OMR/ECR/Outer South)", "₹1,100 – ₹1,300"]
      ],
      "note": "Hint ❤️: No extra km surprises. We follow zone-based pricing."
    },
    "includes": [
      "Clean AC sedan",
      "Professional trained driver",
      "Luggage handling"
    ],
    "excludes": [
      "Parking (₹50–₹120 approx)",
      "Waiting charges (₹100/15 min)"
    ],
    "faq": [
      { "q": "When should I start from home?", "a": "Domestic → 2 hours before. International → 3 hours before." }
    ],
    "whatsappMsg": "Airport Drop – Sedan."
  },
  {
    "slug": "airport-drop-suv",
    "category": "Airport Transfers",
    "title": "Airport Drop – SUV",
    "overview": "Ideal for families with luggage or corporate teams.",
    "tariff": {
      "headers": ["Fare"],
      "rows": [
        ["₹1,000 – ₹1,300 (zone based)"]
      ],
      "note": "Parking extra (actuals)."
    },
    "notes": [
      "Friendly Note: SUVs are assigned when: ✔ more luggage ✔ smoother ride preferred ✔ more comfort needed"
    ],
    "whatsappMsg": "Airport Drop – SUV."
  },
  {
    "slug": "airport-pickup-sedan",
    "category": "Airport Transfers",
    "title": "Airport Pickup – Sedan",
    "tariff": {
      "headers": ["Fare"],
      "rows": [
        ["₹1,000 – ₹1,200"]
      ],
      "note": "Parking extra (actuals)."
    },
    "includes": [
      "Driver arrives early",
      "Name-board (optional)",
      "30 mins free waiting"
    ],
    "whatsappMsg": "Airport Pickup – Sedan."
  },
  {
    "slug": "airport-pickup-suv",
    "category": "Airport Transfers",
    "title": "Airport Pickup – SUV",
    "overview": "Ideal for 3–5 people, luggage-friendly.",
    "tariff": {
      "headers": ["Fare"],
      "rows": [
        ["₹1,400 – ₹1,700"]
      ],
      "note": "30 min free waiting"
    },
    "whatsappMsg": "Airport Pickup – SUV."
  },
  {
    "slug": "airport-transfer-tempo-traveller",
    "category": "Airport Transfers",
    "title": "Airport Transfer – Tempo Traveller",
    "overview": "Perfect for group arrivals, wedding guests, family trips.",
    "tariff": {
      "headers": ["Vehicle", "Price"],
      "rows": [
        ["12 Seater", "₹3,000"],
        ["17 Seater", "₹3,800"]
      ]
    },
    "notes": [
      "Friendly Hint ❤️: Luggage space is limited in TT. Tell us in advance if you have 8+ big suitcases so we can plan better."
    ],
    "whatsappMsg": "Airport TT Booking."
  },
  {
    "slug": "airport-parcel-luggage-delivery",
    "category": "Airport Transfers",
    "title": "Airport Parcel / Luggage Delivery",
    "overview": "Useful for heavy luggage, shifting, airport parcel pickup.",
    "tariff": {
      "headers": ["Vehicle", "Rate"],
      "rows": [
        ["Bada Dost i4", "₹900 – ₹1,200"],
        ["Tempo Traveller", "₹2,200"]
      ]
    },
    "whatsappMsg": "Airport Parcel Delivery."
  },
  {
    "slug": "tirupati-package",
    "category": "Temple Tours",
    "title": "Tirupati Balaji Darshan Package",
    "overview": "Complete darshan package with accommodation assistance and guided darshan.",
    "tariff": {
      "headers": ["Vehicle", "Total Fare"],
      "rows": [
        ["Etios/Dzire", "₹4,500"],
        ["Innova", "₹6,500"],
        ["Crysta", "₹7,500"],
        ["Tempo Traveller", "₹9,500"]
      ],
      "note": "Includes Toll, Parking, Driver Bata. Excludes Darshan Tickets."
    },
    "includes": ["Doorstep Pickup & Drop", "Toll & Parking", "Driver Allowance"],
    "excludes": ["Darshan Tickets", "Food & Accommodation"],
    "whatsappMsg": "Hi, I need details for Tirupati Package."
  },
  {
    "slug": "kanchipuram-temple-trip",
    "category": "Temple Tours",
    "title": "Kanchipuram Temple Trip (Half Day from Chennai)",
    "overview": "Kanchipuram is close, peaceful, and perfect for quick temple visits. We keep the pricing simple & transparent so families and senior citizens can travel confidently.\n\n⭐ Trip Overview\n- Chennai → Kanchipuram → Chennai\n- 150 km approx\n- Half-day or full-day options\n- Great for: temple visits, shopping, senior citizens",
    "tariff": {
      "headers": ["Vehicle", "Rate/km", "Driver Bata", "Est. Total Fare"],
      "rows": [
        ["Sedan", "₹13/km", "₹500", "₹2,800 – ₹3,200"],
        ["SUV (Ertiga/XL6)", "₹16/km", "₹600", "₹4,000 – ₹4,500"],
        ["Innova", "₹18/km", "₹700", "₹4,800 – ₹5,200"],
        ["Crysta", "₹20/km", "₹700", "₹5,500 – ₹6,000"]
      ],
      "note": "Friendly Hint ❤️: We show complete fare ranges so you know exactly what to expect. No hidden fees."
    },
    "includes": [
      "Car + professional driver",
      "Assistance for senior citizens",
      "Flexible timings",
      "Free temple parking guidance"
    ],
    "excludes": [
      "Parking (actuals)",
      "Toll charges (if route via highway)"
    ],
    "faq": [
      { "q": "Best start time?", "a": "Early morning 6–7 AM avoids traffic & temple rush." },
      { "q": "Can we visit 3–4 temples?", "a": "Yes — customise as you wish." }
    ],
    "whatsappMsg": "Hi, I need the Kanchipuram temple trip package."
  },
  {
    "slug": "thiruvannamalai-girivalam-trip",
    "category": "Temple Tours",
    "title": "Thiruvannamalai Girivalam (1 Day / Night Trip)",
    "overview": "A peaceful spiritual trip for Girivalam or temple darshan.\n\n⭐ Trip Info\n- Chennai → Thiruvannamalai → Chennai\n- 250 km approx\n- Popular for Pournami Girivalam",
    "tariff": {
      "headers": ["Vehicle", "Rate/km", "Driver Bata", "Est. Fare"],
      "rows": [
        ["Sedan", "₹13/km", "₹500", "₹3,800 – ₹4,300"],
        ["SUV", "₹16/km", "₹600", "₹5,000 – ₹5,700"],
        ["Innova/Crysta", "₹18–20/km", "₹700", "₹6,000 – ₹7,200"]
      ],
      "note": "Parking & toll extra."
    },
    "notes": [
      "Friendly Note: Night Girivalam requires alert drivers. We assign our most experienced night-route drivers."
    ],
    "faq": [
      { "q": "Is night driving safe?", "a": "Yes — we send only experienced highway drivers." }
    ],
    "whatsappMsg": "Need Thiruvannamalai Girivalam trip."
  },
  {
    "slug": "chidambaram-temple-trip",
    "category": "Temple Tours",
    "title": "Chidambaram Natarajar Temple Trip",
    "overview": "A spiritually rich trip with a relaxed journey.",
    "tariff": {
      "headers": ["Vehicle", "Est. Fare"],
      "rows": [
        ["Sedan", "₹5,100 – ₹5,600"],
        ["SUV", "₹7,300 – ₹8,000"],
        ["Innova", "₹9,000 – ₹10,000"],
        ["Crysta", "₹10,500 – ₹11,500"]
      ],
      "note": "Why the range? Transparent — depends on: actual km, route chosen, toll count"
    },
    "whatsappMsg": "Chidambaram trip details."
  },
  {
    "slug": "rameswaram-2-days",
    "category": "Temple Tours",
    "title": "Rameswaram (2-Day Trip)",
    "overview": "Long, peaceful coastal travel. Suitable for families & senior devotees.",
    "tariff": {
      "headers": ["Vehicle", "Estimated Total"],
      "rows": [
        ["Sedan", "₹12,000 – ₹13,500"],
        ["SUV", "₹15,500 – ₹17,000"],
        ["Innova", "₹17,500 – ₹19,000"],
        ["Crysta", "₹19,500 – ₹21,000"],
        ["Tempo Traveller", "₹23,000 – ₹26,000"]
      ],
      "note": "Includes 2-day driver bata. Toll/Parking extra."
    },
    "faq": [
      { "q": "Is Dhanushkodi included?", "a": "Yes — morning visit recommended." }
    ],
    "whatsappMsg": "Book Rameswaram 2-day package."
  },
  {
    "slug": "navagraha-tour",
    "category": "Temple Tours",
    "title": "Navagraha Temple Tour (1 Day or 2 Days)",
    "tariff": {
      "headers": ["Duration", "Vehicle", "Est. Fare"],
      "rows": [
        ["1-Day Trip (~350–400 km)", "Sedan", "₹6,500 – ₹7,200"],
        ["1-Day Trip (~350–400 km)", "SUV", "₹8,500 – ₹9,500"],
        ["1-Day Trip (~350–400 km)", "Innova", "₹10,000 – ₹11,000"],
        ["2-Day Trip (~600–650 km)", "Sedan", "₹9,500 – ₹10,500"],
        ["2-Day Trip (~600–650 km)", "SUV", "₹13,000 – ₹14,500"],
        ["2-Day Trip (~600–650 km)", "Innova", "₹15,000 – ₹17,000"]
      ]
    },
    "whatsappMsg": "Navagraha trip details please."
  },
  {
    "slug": "sabarimala-trip",
    "category": "Temple Tours",
    "title": "Sabarimala Trip (Season Service)",
    "overview": "High-demand route — safety and comfort first.",
    "tariff": {
      "headers": ["Vehicle", "Total Estimate"],
      "rows": [
        ["Sedan", "₹9,500 – ₹11,000"],
        ["SUV", "₹13,000 – ₹15,500"],
        ["Innova/Crysta", "₹15,500 – ₹19,000"],
        ["Tempo Traveller", "₹22,000 – ₹28,000"]
      ],
      "note": "Includes multiple driver bata days."
    },
    "whatsappMsg": "Sabarimala trip booking."
  },
  {
    "slug": "pondicherry-one-day-trip",
    "category": "Temple Tours",
    "title": "Pondicherry Day Trip",
    "tariff": {
      "headers": ["Vehicle", "Total Fare"],
      "rows": [
        ["Sedan", "₹4,800 – ₹5,200"],
        ["SUV", "₹6,500 – ₹7,200"],
        ["Innova", "₹7,500 – ₹8,200"]
      ],
      "note": "270 km round trip"
    },
    "whatsappMsg": "Pondicherry trip details."
  },
  {
    "slug": "vellore-golden-temple",
    "category": "Temple Tours",
    "title": "Vellore Golden Temple Trip",
    "tariff": {
      "headers": ["Vehicle", "Fare"],
      "rows": [
        ["Sedan", "₹3,800 – ₹4,300"],
        ["SUV", "₹5,000 – ₹5,800"],
        ["Innova", "₹6,000 – ₹6,800"]
      ],
      "note": "260 km approx"
    },
    "whatsappMsg": "Vellore Golden Temple trip."
  },
  {
    "slug": "mahabalipuram-ecr-temple-route",
    "category": "Temple Tours",
    "title": "Mahabalipuram & ECR Temples (Half-Day / Full-Day)",
    "tariff": {
      "headers": ["Vehicle", "Half-Day", "Full-Day"],
      "rows": [
        ["Sedan", "₹2,500", "₹3,500"],
        ["SUV", "₹3,800", "₹4,800"],
        ["Innova", "₹4,500", "₹5,800"]
      ],
      "note": "KM calculated based on ECR route."
    },
    "whatsappMsg": "Mahabalipuram trip booking."
  },
  {
    "slug": "sedan-rental-chennai",
    "category": "Premium Fleet Rental",
    "title": "Sedan Car Rental (Chennai)",
    "tariff": {
      "headers": ["Package", "Price"],
      "rows": [
        ["4 hrs / 40 km", "₹1,300"],
        ["8 hrs / 80 km", "₹2,000"],
        ["Extra km", "₹13/km"]
      ],
      "note": "Outstation: ₹13/km. Driver bata ₹500/day. Min 250 km/day applies (standard everywhere in Chennai)"
    },
    "whatsappMsg": "Need Sedan rental."
  },
  {
    "slug": "suv-ertiga-rental",
    "category": "Premium Fleet Rental",
    "title": "SUV / Ertiga / XL6 Rental",
    "tariff": {
      "headers": ["Package", "Price"],
      "rows": [
        ["4 hrs", "₹1,800"],
        ["8 hrs", "₹2,600"],
        ["Extra km", "₹16/km"]
      ],
      "note": "Outstation: ₹16/km + driver bata ₹600/day"
    },
    "whatsappMsg": "SUV / Ertiga rental booking."
  },
  {
    "slug": "innova-rental",
    "category": "Premium Fleet Rental",
    "title": "Innova Rental",
    "tariff": {
      "headers": ["Hours", "Price"],
      "rows": [
        ["4 hrs", "₹2,000"],
        ["8 hrs", "₹3,000"],
        ["Extra km", "₹18/km"]
      ],
      "note": "Outstation: ₹18/km + driver bata ₹700/day"
    },
    "whatsappMsg": "Innova rental needed."
  },
  {
    "slug": "innova-crysta-rental",
    "category": "Premium Fleet Rental",
    "title": "Innova Crysta Rental",
    "tariff": {
      "headers": ["Hours", "Price"],
      "rows": [
        ["4 hrs", "₹2,500"],
        ["8 hrs", "₹3,800"],
        ["Extra km", "₹20/km"]
      ],
      "note": "Outstation: ₹20/km (premium MPV). Driver bata ₹700/day"
    },
    "whatsappMsg": "Crysta booking."
  },
  {
    "slug": "tempo-traveller-rental",
    "category": "Premium Fleet Rental",
    "title": "Tempo Traveller Rental (12–17 Seater)",
    "tariff": {
      "headers": ["Seating", "Price"],
      "rows": [
        ["12 Seater", "₹4,000"],
        ["17 Seater", "₹5,000"],
        ["Extra km", "₹24/km"]
      ],
      "note": "Outstation: ₹24/km + driver bata ₹1,000/day. Min 300 km/day recommended for group trips."
    },
    "whatsappMsg": "TT booking."
  },
  {
    "slug": "bada-dost-i4-goods-delivery",
    "category": "Premium Fleet Rental",
    "title": "Bada Dost i4 – Goods Delivery",
    "overview": "Ideal for airport luggage, shifting small goods, parcel runs.",
    "tariff": {
      "headers": ["Service", "Rate"],
      "rows": [
        ["Local One-Way Trip", "₹900 – ₹1,200"],
        ["Outstation", "₹28/km"],
        ["Waiting charge", "₹100 / hour"]
      ]
    },
    "whatsappMsg": "Bada Dost booking."
  },
  {
    "slug": "one-day-chennai-city-tour",
    "category": "Misc Services",
    "title": "Chennai City Sightseeing (1 Day Trip)",
    "overview": "Explore Chennai’s iconic locations with a flexible plan.",
    "tariff": {
      "headers": ["Vehicle", "Rate"],
      "rows": [
        ["Sedan", "₹2,500 – ₹3,000"],
        ["SUV", "₹3,800 – ₹4,500"],
        ["Innova", "₹4,800 – ₹5,500"]
      ],
      "note": "8 hrs / 80 km package. Extra km → as per master rates."
    },
    "whatsappMsg": "City tour booking."
  },
  {
    "slug": "outstation-car-rental-per-km",
    "category": "Misc Services",
    "title": "Outstation Car Rental (Per Km Tariff)",
    "overview": "This is our master transparent tariff page.",
    "tariff": {
      "headers": ["Vehicle", "Rate/km"],
      "rows": [
        ["Sedan", "₹13/km"],
        ["SUV (Ertiga/XL6)", "₹16/km"],
        ["Innova", "₹18/km"],
        ["Crysta", "₹20/km"],
        ["Tempo Traveller", "₹24/km"]
      ],
      "note": "Driver bata per day → ₹500 / ₹600 / ₹700 / ₹1,000 accordingly"
    },
    "notes": [
      "Why we show everything openly: To build trust. To avoid confusion. To make planning easy for families."
    ],
    "whatsappMsg": "Outstation car rental enquiry."
  },
  {
    "slug": "luggage-parcel-delivery-chennai",
    "category": "Misc Services",
    "title": "Parcel / Luggage Delivery in Chennai",
    "overview": "Local goods movement, urgent parcels, luggage transfers.",
    "tariff": {
      "headers": ["Vehicle", "Rate"],
      "rows": [
        ["Bada Dost", "₹900 – ₹1,200"],
        ["TT Van", "₹2,200"]
      ],
      "note": "Waiting: ₹100/hr"
    },
    "whatsappMsg": "Chennai parcel delivery."
  },
  {
    "slug": "driver-car-for-weddings",
    "category": "Misc Services",
    "title": "Driver + Car for Wedding Events",
    "tariff": {
      "headers": ["Vehicle", "Rate"],
      "rows": [
        ["Sedan", "₹2,500 – ₹3,000"],
        ["Innova", "₹4,500 – ₹5,000"],
        ["Crysta", "₹5,500 – ₹6,000"],
        ["TT", "₹7,000 – ₹9,000"]
      ],
      "note": "Decoration available on request (extra)."
    },
    "whatsappMsg": "Wedding event car needed."
  }
]

with open('src/data/serviceDetails.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
