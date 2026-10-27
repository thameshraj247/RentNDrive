
const INITIAL_DATA = {
  vehicles: [
    {
      id: "car-001",
      name: "Mercedes-Benz S-Class 580",
      brand: "Mercedes-Benz",
      model: "S-Class 580 4MATIC",
      year: 2025,
      category: "luxury",
      categoryName: "Luxury Sedan",
      pricePerDay: 185,
      weeklyDiscount: 15,
      rating: 4.96,
      reviewsCount: 48,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Mild Hybrid Petrol",
      mileage: "24 MPG",
      luggageCapacity: "3 Large Bags",
      image: "fleet-mercedes-s580.jpg",
      gallery: [
        "fleet-mercedes-s580.jpg", "hero-fleet.jpg", "fleet-mercedes-c300.jpg"],
      features: ["Burmester 4D Audio", "Heated & Massaging Seats", "Active Ambient Light", "360° Surround Camera", "Distronic Cruise Control", "Executive Rear Seating"],
      description: "The benchmark of automotive luxury. Whisper-quiet cabin, unmatched ride comfort, and effortless power make every journey first-class.",
      specs: {
        engine: "4.0L V8 Biturbo with EQ Boost",
        horsepower: "496 HP",
        acceleration: "4.4s (0-60 mph)",
        topSpeed: "155 mph"
      },
      deposit: 500,
      available: true,
      popular: true,
      tag: "Executive Choice"
    },
    {
      id: "car-002",
      name: "Porsche Cayenne GTS",
      brand: "Porsche",
      model: "Cayenne GTS Coupe",
      year: 2024,
      category: "suv",
      categoryName: "Adventure SUV",
      pricePerDay: 195,
      weeklyDiscount: 15,
      rating: 4.98,
      reviewsCount: 62,
      seats: 5,
      transmission: "PDK Automatic",
      fuelType: "Twin-Turbo Petrol",
      mileage: "19 MPG",
      luggageCapacity: "4 Large Bags",
      image: "fleet-porsche-cayenne.jpg",
      gallery: [
        "fleet-porsche-cayenne.jpg", "hero-home.jpg", "plan-weekly.jpg"],
      features: ["Sport Chrono Package", "Adaptive Air Suspension", "Panoramic Sunroof", "Porsche Communication Mgmt", "Bose Surround System", "All-Wheel Drive"],
      description: "Combining true sports car DNA with SUV versatility. Command winding mountain roads or coastal highways with supreme confidence.",
      specs: {
        engine: "4.0L Twin-Turbo V8",
        horsepower: "493 HP",
        acceleration: "4.1s (0-60 mph)",
        topSpeed: "171 mph"
      },
      deposit: 600,
      available: true,
      popular: true,
      tag: "Best Seller"
    },
    {
      id: "car-003",
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      model: "Model S Plaid Tri-Motor",
      year: 2025,
      category: "electric",
      categoryName: "Electric & Hybrid",
      pricePerDay: 165,
      weeklyDiscount: 15,
      rating: 4.94,
      reviewsCount: 89,
      seats: 5,
      transmission: "Single-Speed EV",
      fuelType: "100% Electric",
      mileage: "396 Miles Range",
      luggageCapacity: "4 Bags + Front Trunk",
      image: "fleet-tesla-plaid.jpg",
      gallery: [
        "fleet-tesla-plaid.jpg", "cat-electric.jpg"],
      features: ["Tri-Motor All-Wheel Drive", "Full Self-Driving Ready", "Yoke Steering Wheel", "Rear Seat Gaming Display", "Supercharging Included", "HEPA Filtration"],
      description: "Sub-2-second acceleration meets zero emissions. Includes seamless access to Tesla's nationwide Supercharger network.",
      specs: {
        engine: "Tri-Motor Electric Drive",
        horsepower: "1,020 HP",
        acceleration: "1.99s (0-60 mph)",
        topSpeed: "200 mph"
      },
      deposit: 450,
      available: true,
      popular: true,
      tag: "Zero Emission"
    },
    {
      id: "car-004",
      name: "Porsche 911 Carrera Cabriolet",
      brand: "Porsche",
      model: "911 Carrera Cabriolet (992)",
      year: 2024,
      category: "convertible",
      categoryName: "Convertible Exotics",
      pricePerDay: 280,
      weeklyDiscount: 12,
      rating: 4.99,
      reviewsCount: 34,
      seats: 4,
      transmission: "8-Speed PDK",
      fuelType: "Twin-Turbo Boxer 6",
      mileage: "21 MPG",
      luggageCapacity: "2 Weekend Duffle Bags",
      image: "fleet-porsche-911cab.jpg",
      gallery: [
        "fleet-porsche-911cab.jpg", "cat-convertible.jpg"],
      features: ["Power Soft-Top (12s)", "Sport Exhaust System", "Sport Chrono Clock", "PASM Sport Suspension", "LED Matrix Headlights", "Carbon Interior Trim"],
      description: "Drop the top, hear the boxer roar, and immerse yourself in coastal sunshine. The ultimate open-air driving icon.",
      specs: {
        engine: "3.0L Twin-Turbo Flat-6",
        horsepower: "379 HP",
        acceleration: "3.8s (0-60 mph)",
        topSpeed: "181 mph"
      },
      deposit: 800,
      available: true,
      popular: true,
      tag: "Iconic Roadster"
    },
    {
      id: "car-005",
      name: "BMW 7-Series 740i M-Sport",
      brand: "BMW",
      model: "740i Sedan M Sport",
      year: 2025,
      category: "luxury",
      categoryName: "Luxury Sedan",
      pricePerDay: 175,
      weeklyDiscount: 15,
      rating: 4.92,
      reviewsCount: 41,
      seats: 5,
      transmission: "Steptronic Sport Auto",
      fuelType: "Mild Hybrid Turbo I6",
      mileage: "28 MPG",
      luggageCapacity: "3 Large Bags",
      image: "fleet-bmw-740i.jpg",
      gallery: [
        "fleet-bmw-740i.jpg", "hero-fleet.jpg"],
      features: ["BMW Theater Screen (31.3-inch)", "Panoramic Sky Lounge LED Roof", "Bowers & Wilkins Diamond Sound", "Driving Assistant Professional", "Crystal Glass Controls"],
      description: "Futuristic luxury with a 31-inch cinema screen for rear passengers. Redefining modern VIP travel.",
      specs: {
        engine: "3.0L TwinPower Turbo I6",
        horsepower: "375 HP",
        acceleration: "5.1s (0-60 mph)",
        topSpeed: "155 mph"
      },
      deposit: 500,
      available: true,
      popular: false,
      tag: "Cinema Luxury"
    },
    {
      id: "car-006",
      name: "Range Rover Autobiography",
      brand: "Land Rover",
      model: "Range Rover LWB Autobiography",
      year: 2025,
      category: "suv",
      categoryName: "Adventure SUV",
      pricePerDay: 240,
      weeklyDiscount: 15,
      rating: 4.97,
      reviewsCount: 53,
      seats: 5,
      transmission: "8-Speed ZF Auto",
      fuelType: "Twin-Turbo V8",
      mileage: "18 MPG",
      luggageCapacity: "5 Large Bags",
      image: "fleet-rangerover.jpg",
      gallery: [
        "fleet-rangerover.jpg", "about-story.jpg"],
      features: ["All-Terrain Progress Control", "Meridian Signature 35-speaker Audio", "Executive Class Rear Seats", "Active Noise Cancellation", "Electric Deployable Side Steps"],
      description: "Peerless British grandeur. Whether pulling up to a 5-star gala or traversing alpine terrain, arrive in unmatched elegance.",
      specs: {
        engine: "4.4L Twin-Turbo V8",
        horsepower: "523 HP",
        acceleration: "4.4s (0-60 mph)",
        topSpeed: "155 mph"
      },
      deposit: 750,
      available: true,
      popular: true,
      tag: "Royal Flagship"
    },
    {
      id: "car-007",
      name: "Porsche Taycan 4S Cross Turismo",
      brand: "Porsche",
      model: "Taycan 4S Cross Turismo",
      year: 2024,
      category: "electric",
      categoryName: "Electric & Hybrid",
      pricePerDay: 205,
      weeklyDiscount: 15,
      rating: 4.95,
      reviewsCount: 29,
      seats: 5,
      transmission: "2-Speed EV Rear / 1-Speed Front",
      fuelType: "100% Electric",
      mileage: "285 Miles Range",
      luggageCapacity: "3 Bags + Frunk",
      image: "fleet-taycan.jpg",
      gallery: [
        "fleet-taycan.jpg", "cat-electric.jpg"],
      features: ["800-Volt Architecture", "Gravel Off-Road Mode", "Porsche Electric Sport Sound", "Passenger Display Screen", "Adaptive Air Suspension"],
      description: "Porsche precision with shooting brake practicality. Charge from 10% to 80% in just 18 minutes on DC fast chargers.",
      specs: {
        engine: "Dual Permanent Magnet Motors",
        horsepower: "522 HP",
        acceleration: "3.9s (0-60 mph)",
        topSpeed: "149 mph"
      },
      deposit: 600,
      available: true,
      popular: false,
      tag: "High Performance EV"
    },
    {
      id: "car-008",
      name: "Cadillac Escalade Sport ESV",
      brand: "Cadillac",
      model: "Escalade Sport ESV Platinum",
      year: 2025,
      category: "suv",
      categoryName: "Adventure SUV",
      pricePerDay: 215,
      weeklyDiscount: 15,
      rating: 4.91,
      reviewsCount: 76,
      seats: 7,
      transmission: "10-Speed Automatic",
      fuelType: "6.2L V8",
      mileage: "16 MPG",
      luggageCapacity: "6 Large Suitcases",
      image: "fleet-escalade.jpg",
      gallery: [
        "fleet-escalade.jpg", "cat-suv.jpg"],
      features: ["38-inch Curved OLED Display", "AKG Studio 36-Speaker Audio", "Super Cruise Hands-Free Driving", "Tri-Zone Climate Control", "Heated/Cooled Cupholders", "Power 3rd Row"],
      description: "The grandest American SUV. Unmatched 7-passenger luxury with cavernous space for everyone's luggage and gear.",
      specs: {
        engine: "6.2L V8 VVT",
        horsepower: "420 HP",
        acceleration: "5.9s (0-60 mph)",
        topSpeed: "130 mph"
      },
      deposit: 650,
      available: true,
      popular: true,
      tag: "7-Passenger VIP"
    },
    {
      id: "car-009",
      name: "BMW M4 Competition Convertible",
      brand: "BMW",
      model: "M4 Competition xDrive Convertible",
      year: 2024,
      category: "convertible",
      categoryName: "Convertible Exotics",
      pricePerDay: 235,
      weeklyDiscount: 12,
      rating: 4.96,
      reviewsCount: 38,
      seats: 4,
      transmission: "8-Speed M Steptronic",
      fuelType: "TwinPower Turbo Petrol",
      mileage: "22 MPG",
      luggageCapacity: "2 Bags",
      image: "fleet-bmw-m4.jpg",
      gallery: [
        "fleet-bmw-m4.jpg", "fleet-porsche-911cab.jpg"],
      features: ["M xDrive All-Wheel Drive", "M Carbon Bucket Seats", "Head-Up Display with Track Mode", "Harman Kardon Audio", "Adaptive M Suspension"],
      description: "Aggressive performance with open-air exhilaration. 503 HP channeled to all four wheels for relentless cornering grip.",
      specs: {
        engine: "3.0L BMW M TwinPower Turbo I6",
        horsepower: "503 HP",
        acceleration: "3.6s (0-60 mph)",
        topSpeed: "180 mph"
      },
      deposit: 700,
      available: true,
      popular: false,
      tag: "M Performance"
    },
    {
      id: "car-010",
      name: "Mercedes-Benz C300 AMG Line",
      brand: "Mercedes-Benz",
      model: "C300 Sedan AMG Line",
      year: 2024,
      category: "compact",
      categoryName: "Economy & Compact",
      pricePerDay: 89,
      weeklyDiscount: 20,
      rating: 4.88,
      reviewsCount: 112,
      seats: 5,
      transmission: "9G-TRONIC Auto",
      fuelType: "Mild Hybrid Turbo I4",
      mileage: "35 MPG",
      luggageCapacity: "2 Large Bags",
      image: "fleet-mercedes-c300.jpg",
      gallery: [
        "fleet-mercedes-c300.jpg", "cat-luxury.jpg"],
      features: ["11.9-inch Portrait Touchscreen", "AMG Body Styling", "Wireless Apple CarPlay & Android Auto", "Ambient Lighting 64 Colors", "Active Brake Assist"],
      description: "Chic, fuel-efficient luxury that punches well above its weight. Perfect for urban exploration, business meetings, and weekend getaways.",
      specs: {
        engine: "2.0L Turbocharged I4 with EQ",
        horsepower: "255 HP",
        acceleration: "5.7s (0-60 mph)",
        topSpeed: "130 mph"
      },
      deposit: 300,
      available: true,
      popular: true,
      tag: "Smart Travel"
    },
    {
      id: "car-011",
      name: "Audi A4 45 TFSI S-Line",
      brand: "Audi",
      model: "A4 Sedan 45 TFSI Quattro",
      year: 2024,
      category: "compact",
      categoryName: "Economy & Compact",
      pricePerDay: 82,
      weeklyDiscount: 18,
      rating: 4.85,
      reviewsCount: 94,
      seats: 5,
      transmission: "7-Speed S Tronic Dual-Clutch",
      fuelType: "Turbocharged Petrol",
      mileage: "32 MPG",
      luggageCapacity: "2 Large Bags",
      image: "fleet-audi-a4.jpg",
      gallery: [
        "fleet-audi-a4.jpg", "cat-compact.jpg"],
      features: ["Audi Virtual Cockpit Plus", "Legendary Quattro All-Wheel Drive", "Bang & Olufsen 3D Sound", "Matrix LED Headlights", "Heated Sport Seats"],
      description: "Agile, impeccably built, and confident in all weather. The gold standard for stylish executive car hire.",
      specs: {
        engine: "2.0L TFSI Turbo 4-Cylinder",
        horsepower: "261 HP",
        acceleration: "5.2s (0-60 mph)",
        topSpeed: "130 mph"
      },
      deposit: 300,
      available: true,
      popular: false,
      tag: "Best Value"
    },
    {
      id: "car-012",
      name: "Mercedes-Benz EQS 450+ Sedan",
      brand: "Mercedes-Benz",
      model: "EQS 450+ Luxury Sedan",
      year: 2025,
      category: "electric",
      categoryName: "Electric & Hybrid",
      pricePerDay: 170,
      weeklyDiscount: 15,
      rating: 4.93,
      reviewsCount: 37,
      seats: 5,
      transmission: "Single-Speed EV",
      fuelType: "100% Electric",
      mileage: "410 Miles Range",
      luggageCapacity: "3 Large Bags",
      image: "fleet-mercedes-eqs.jpg",
      gallery: [
        "fleet-mercedes-eqs.jpg", "cat-electric.jpg"],
      features: ["Hyperscreen Glass Cockpit", "Rear-Axle Steering (10°)", "Airmatic Air Suspension", "Energizing Comfort Packages", "Ultra-Aerodynamic 0.20 Cd"],
      description: "The apex of electric prestige. Glides across the road in near-silence with up to 410 miles of single-charge range.",
      specs: {
        engine: "Electric Permanently Excited Motor",
        horsepower: "355 HP",
        acceleration: "5.9s (0-60 mph)",
        topSpeed: "130 mph"
      },
      deposit: 500,
      available: true,
      popular: false,
      tag: "Ultra Range"
    }
  ],

  categories: [
    { id: "all", name: "All Vehicles", count: 12, icon: "fa-car" },
    { id: "luxury", name: "Luxury Sedans", count: 3, icon: "fa-crown", description: "First-class comfort and quiet sophistication" },
    { id: "suv", name: "Adventure SUVs", count: 3, icon: "fa-mountain-sun", description: "Spacious luxury with 4x4 capability" },
    { id: "electric", name: "Electric & EV", count: 3, icon: "fa-bolt", description: "Zero emissions, instant torque & cutting-edge tech" },
    { id: "convertible", name: "Convertibles", count: 2, icon: "fa-wind", description: "Top-down open-air driving thrills" },
    { id: "compact", name: "Premium Compact", count: 2, icon: "fa-gauge-high", description: "Agile, efficient and refined city cruisers" }
  ],

  locations: [
    { id: "lax", name: "Los Angeles Intl Airport (LAX) - Terminal VIP Dropoff", fee: 0 },
    { id: "sfo", name: "San Francisco - Union Square Luxury Hub", fee: 0 },
    { id: "jfk", name: "New York JFK Intl Airport - Royal Sky Lounge", fee: 15 },
    { id: "mia", name: "Miami Beach - South Beach Ocean Drive Suite", fee: 0 },
    { id: "las", name: "Las Vegas Strip - Bellagio Concierge Station", fee: 0 },
    { id: "sea", name: "Seattle-Tacoma Intl Airport (SEA)", fee: 10 },
    { id: "ord", name: "Chicago O'Hare Intl Airport (ORD)", fee: 10 },
    { id: "doorstep", name: "White-Glove Doorstep Delivery (Hotel or Home)", fee: 45 }
  ],

  insuranceTiers: [
    {
      id: "basic",
      name: "Basic Protection",
      badge: "Standard",
      dailyRate: 0,
      deductible: "$1,500 Deductible",
      features: [
        "Statutory Third-Party Liability",
        "Collision Damage Waiver ($1,500 deductible)",
        "Basic Breakdown Telephone Assistance",
        "Standard Cleaning Included"
      ],
      recommended: false
    },
    {
      id: "premium",
      name: "Premium Shield",
      badge: "Most Popular",
      dailyRate: 24,
      deductible: "$250 Deductible",
      features: [
        "Comprehensive Collision Waiver ($250 deductible)",
        "Tire, Glass & Windshield Coverage Included",
        "24/7 Priority Emergency Roadside Dispatch",
        "Personal Effects & Baggage Protection ($3,000)",
        "Zero Fee Date & Trip Modifications"
      ],
      recommended: true
    },
    {
      id: "royal",
      name: "Royal Elite Peace-of-Mind",
      badge: "Zero Liability",
      dailyRate: 42,
      deductible: "$0 Deductible",
      features: [
        "100% Zero Deductible / Zero Excess Liability",
        "Full Undercarriage, Roof & Glass Protection",
        "Lost Key Replacement & Towing Included",
        "Personal Accident Insurance ($100,000)",
        "VIP Replacement Car Within 60 Minutes"
      ],
      recommended: false
    }
  ],

  addons: [
    { id: "gps", name: "Pre-loaded Satellite Navigation", pricePerDay: 7, icon: "fa-map-location-dot", description: "Offline high-precision 3D maps and real-time live traffic" },
    { id: "child_seat", name: "Premium Cybex Child Safety Seat", pricePerDay: 12, icon: "fa-baby", description: "Infant, toddler, or booster ISOFIX certified seats" },
    { id: "extra_driver", name: "Additional Verified Driver", pricePerDay: 10, icon: "fa-user-plus", description: "Share the wheel with full legal insurance coverage" },
    { id: "wifi", name: "Unlimited 5G In-Car Wi-Fi Hotspot", pricePerDay: 9, icon: "fa-wifi", description: "Connect up to 8 smartphones, tablets, or laptops" },
    { id: "prepaid_fuel", name: "Pre-Paid Fuel / Fast Charging", pricePerDay: 49, icon: "fa-gas-pump", flatFee: true, description: "Return on empty with zero refuel service fees" }
  ],

  rentalPlans: [
    {
      id: "daily",
      name: "Daily Explorer",
      tagline: "For spontaneous getaways & executive day meetings",
      badge: "Flexible",
      discount: "Standard Rates",
      minDays: 1,
      features: [
        "200 Free Miles Included per day",
        "Free Cancellation up to 24h prior",
        "Complimentary airport / valet pickup",
        "24/7 Concierge Hotline",
        "Standard Vehicle Cleanliness Guarantee"
      ]
    },
    {
      id: "weekly",
      name: "Weekly Roadtripper",
      tagline: "Unwind on coastal scenic drives & cross-state travel",
      badge: "Save 15%",
      discount: "15% OFF Daily Rates",
      minDays: 7,
      popular: true,
      features: [
        "1,500 Free Miles Included per week",
        "1 Free Additional Driver included ($70 value)",
        "Free Child Safety Seat on request",
        "Priority Vehicle Upgrade if available",
        "Flexible contactless drop-off anytime"
      ]
    },
    {
      id: "monthly",
      name: "Monthly Executive Flex",
      tagline: "Luxury subscription without long-term lease commitments",
      badge: "Save 30%",
      discount: "30% OFF Daily Rates",
      minDays: 30,
      features: [
        "Unlimited Mileage across contiguous states",
        "Complimentary Car Swap every 14 days",
        "Zero Security Deposit on Tier 1 status",
        "Dedicated VIP Account Concierge",
        "Complimentary Bi-weekly White-Glove Detailing"
      ]
    }
  ],

  howItWorksSteps: [
    {
      step: "01",
      title: "Select & Personalize",
      description: "Browse our handpicked fleet of luxury sedans, prestige SUVs, and electric speedsters. Pick your trip dates and tailored protection tier.",
      icon: "fa-car-side"
    },
    {
      step: "02",
      title: "60-Second Digital Verification",
      description: "Fast-track your booking with instant ID check. Snap a photo of your driver's license and credit card with bank-level encryption.",
      icon: "fa-id-card-clip"
    },
    {
      step: "03",
      title: "Keyless Unlock or White-Glove Handover",
      description: "Use your Royal Digital Key on your phone to drive away instantly, or have our uniformed concierge deliver the car straight to your hotel.",
      icon: "fa-key"
    },
    {
      step: "04",
      title: "Drive in Splendor & Return Hassle-Free",
      description: "Enjoy effortless miles. When done, drop the keys at any of our 45+ premier locations or request a curbside collection agent.",
      icon: "fa-flag-checkered"
    }
  ],

  requirements: [
    {
      title: "Minimum Age Requirements",
      description: "Drivers must be 21+ years old. Drivers aged 21-24 are subject to a modest young-driver supplement. Luxury and exotic tiers require age 25+."
    },
    {
      title: "Valid Driver's License",
      description: "Must hold an unexpired full driver's license held for at least 1 year. Non-US residents are warmly welcomed with an International Driving Permit (IDP) alongside their home passport."
    },
    {
      title: "Payment & Security Deposit",
      description: "A major credit card (Visa, Mastercard, Amex) in the primary driver's name is required. Refundable authorization holds are released within 24-48 hours of return."
    },
    {
      title: "Transparent Fuel / Battery Policy",
      description: "Like-for-like return policy: return with the same fuel/charge level you started with, or choose our discounted Pre-Paid Fuel option at checkout."
    }
  ],

  faqs: [
    {
      category: "Booking & Cancellation",
      question: "Can I modify or cancel my reservation for free?",
      answer: "Yes, absolutely! You can cancel or modify your reservation up to 24 hours prior to the scheduled pickup time for a 100% full refund with zero cancellation fees. Changes can be made directly in your Customer Dashboard under 'My Rentals'."
    },
    {
      category: "Insurance & Safety",
      question: "Do I need personal car insurance to rent a vehicle?",
      answer: "No, personal insurance is not mandatory. All Royal Fleet bookings include standard third-party liability by default. For total peace of mind, we recommend our 'Premium Shield' or 'Royal Elite' tiers with $0 deductible."
    },
    {
      category: "Delivery & Pickup",
      question: "Can I pick up the car at an airport and drop it off in another city?",
      answer: "Yes! We specialize in seamless one-way journeys between all our premier locations (e.g., pick up at LAX and drop off at San Francisco Union Square). One-way drop-off fees are clearly calculated upfront before checkout."
    },
    {
      category: "Security Deposit",
      question: "How does the refundable security deposit work?",
      answer: "A temporary pre-authorization hold ($300 - $800 depending on vehicle tier) is placed on your card at pickup. As soon as the vehicle is returned in good condition, the hold is released immediately by our system."
    },
    {
      category: "EV Charging",
      question: "How does charging work with electric vehicles like Tesla or Porsche Taycan?",
      answer: "Every electric vehicle is handed over with at least 85% battery charge. You receive seamless access to public networks. Tesla models feature automatic Supercharging billing routed directly to your trip invoice with zero markup."
    },
    {
      category: "Booking & Cancellation",
      question: "Can I add a second driver to my rental?",
      answer: "Yes! You can add an extra verified driver during booking or via your Customer Dashboard. For Weekly Roadtripper and Monthly plans, one additional driver is completely free."
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Julian Vance",
      role: "Venture Capitalist, San Francisco",
      avatar: "car-1216.jpg",
      rating: 5,
      car: "Porsche Cayenne GTS Coupe",
      date: "October 14, 2026",
      trip: "Pacific Coast Highway Weekend",
      content: "Impeccable service from start to finish. The Cayenne GTS was delivered to my hotel in immaculate condition. The digital key unlock worked seamlessly. Will never rent through legacy counters again."
    },
    {
      id: "rev-2",
      author: "Sophia Chen",
      role: "Creative Director, New York",
      avatar: "car-1216.jpg",
      rating: 5,
      car: "Mercedes-Benz S-Class 580",
      date: "September 28, 2026",
      trip: "Hamptons Executive Retreat",
      content: "The S-Class was heaven on long highway stretches. Burmester sound system is surreal. Billing was crystal clear with zero surprise fees. The dashboard makes managing invoices and dates an absolute breeze."
    },
    {
      id: "rev-3",
      author: "Marcus Sterling",
      role: "Architect, Austin",
      avatar: "car-1216.jpg",
      rating: 5,
      car: "Tesla Model S Plaid",
      date: "October 02, 2026",
      trip: "Napa Valley Roadtrip",
      content: "Ludicrous speed with unbelievable refinement. Royal Fleet provided instant approval and contactless pickup at SFO. Truly the most customer-centric car rental platform available."
    }
  ],

  demoUser: {
    id: "user-101",
    name: "Alex Morgan",
    email: "alex.morgan@royalrentals.com",
    phone: "+1 (555) 234-5678",
    avatar: "car-1216.jpg",
    tier: "Gold VIP Traveler",
    points: 2450,
    licenseNumber: "DL-98421039-CA",
    licenseExpiry: "09/2029",
    activeRentalsCount: 1,
    completedRentalsCount: 3,
    totalSpent: 3120,
    paymentMethods: [
      {
        id: "pm-1",
        type: "visa",
        brand: "Visa",
        last4: "4242",
        expiry: "08/28",
        holder: "ALEX MORGAN",
        isDefault: true
      },
      {
        id: "pm-2",
        type: "mastercard",
        brand: "Mastercard",
        last4: "8891",
        expiry: "11/27",
        holder: "ALEX MORGAN",
        isDefault: false
      }
    ],
    bookings: [
      {
        id: "BK-8841",
        carId: "car-002",
        carName: "Porsche Cayenne GTS Coupe",
        carImage: "car-1216.jpg",
        plateNumber: "7ROYAL9",
        pickupLocation: "Los Angeles Intl Airport (LAX) - Terminal VIP Dropoff",
        returnLocation: "Los Angeles Intl Airport (LAX) - Terminal VIP Dropoff",
        pickupDate: "2026-10-20",
        pickupTime: "10:00 AM",
        returnDate: "2026-10-25",
        returnTime: "06:00 PM",
        days: 5,
        dailyRate: 195,
        baseTotal: 975,
        insuranceId: "premium",
        insuranceName: "Premium Shield ($250 Deductible)",
        insuranceCost: 120,
        addons: ["gps", "extra_driver"],
        addonsCost: 85,
        taxes: 94.40,
        depositAmount: 600,
        totalAmount: 1170.00,
        status: "Active",
        paymentStatus: "Paid",
        invoiceId: "INV-2026-9041",
        keylessCode: "RF-8821",
        odometerStart: 12450,
        createdAt: "2026-10-18T14:30:00Z"
      },
      {
        id: "BK-8902",
        carId: "car-003",
        carName: "Tesla Model S Plaid",
        carImage: "car-1216.jpg",
        plateNumber: "EV-PLAID-3",
        pickupLocation: "San Francisco - Union Square Luxury Hub",
        returnLocation: "San Francisco - Union Square Luxury Hub",
        pickupDate: "2026-11-12",
        pickupTime: "09:00 AM",
        returnDate: "2026-11-16",
        returnTime: "05:00 PM",
        days: 4,
        dailyRate: 165,
        baseTotal: 660,
        insuranceId: "basic",
        insuranceName: "Basic Protection",
        insuranceCost: 0,
        addons: ["wifi"],
        addonsCost: 36,
        taxes: 55.68,
        depositAmount: 450,
        totalAmount: 740.00,
        status: "Upcoming",
        paymentStatus: "Paid",
        invoiceId: "INV-2026-8714",
        keylessCode: "RF-9104",
        odometerStart: 8900,
        createdAt: "2026-10-21T09:15:00Z"
      },
      {
        id: "BK-7629",
        carId: "car-001",
        carName: "Mercedes-Benz S-Class 580",
        carImage: "car-1216.jpg",
        plateNumber: "6LUX882",
        pickupLocation: "Miami Beach - South Beach Ocean Drive Suite",
        returnLocation: "Miami Beach - South Beach Ocean Drive Suite",
        pickupDate: "2026-09-10",
        pickupTime: "11:00 AM",
        returnDate: "2026-09-14",
        returnTime: "11:00 AM",
        days: 4,
        dailyRate: 185,
        baseTotal: 740,
        insuranceId: "premium",
        insuranceName: "Premium Shield",
        insuranceCost: 96,
        addons: ["gps"],
        addonsCost: 28,
        taxes: 69.12,
        depositAmount: 500,
        totalAmount: 925.00,
        status: "Completed",
        paymentStatus: "Paid",
        invoiceId: "INV-2026-7629",
        keylessCode: "RF-7128",
        odometerStart: 18420,
        createdAt: "2026-09-08T16:20:00Z"
      },
      {
        id: "BK-6411",
        carId: "car-005",
        carName: "BMW 7-Series 740i M-Sport",
        carImage: "car-1216.jpg",
        plateNumber: "4M740X",
        pickupLocation: "Los Angeles Intl Airport (LAX) - Terminal VIP Dropoff",
        returnLocation: "Los Angeles Intl Airport (LAX) - Terminal VIP Dropoff",
        pickupDate: "2026-08-01",
        pickupTime: "02:00 PM",
        returnDate: "2026-08-05",
        returnTime: "02:00 PM",
        days: 4,
        dailyRate: 175,
        baseTotal: 700,
        insuranceId: "basic",
        insuranceName: "Basic Protection",
        insuranceCost: 0,
        addons: ["wifi"],
        addonsCost: 36,
        taxes: 58.88,
        depositAmount: 500,
        totalAmount: 875.00,
        status: "Completed",
        paymentStatus: "Paid",
        invoiceId: "INV-2026-6411",
        keylessCode: "RF-6421",
        odometerStart: 22100,
        createdAt: "2026-07-29T10:45:00Z"
      },
      {
        id: "BK-5120",
        carId: "car-011",
        carName: "Audi A4 45 TFSI S-Line",
        carImage: "car-1216.jpg",
        plateNumber: "AUDI-442",
        pickupLocation: "San Francisco - Union Square Luxury Hub",
        returnLocation: "San Francisco - Union Square Luxury Hub",
        pickupDate: "2026-06-15",
        pickupTime: "10:00 AM",
        returnDate: "2026-06-19",
        returnTime: "10:00 AM",
        days: 4,
        dailyRate: 82,
        baseTotal: 328,
        insuranceId: "basic",
        insuranceName: "Basic Protection",
        insuranceCost: 0,
        addons: [],
        addonsCost: 0,
        taxes: 26.24,
        depositAmount: 300,
        totalAmount: 410.00,
        status: "Completed",
        paymentStatus: "Paid",
        invoiceId: "INV-2026-5120",
        keylessCode: "RF-5110",
        odometerStart: 15300,
        createdAt: "2026-06-12T11:10:00Z"
      }
    ],
    invoices: [
      {
        id: "INV-2026-9041",
        bookingId: "BK-8841",
        date: "Oct 19, 2026",
        dueDate: "Oct 19, 2026",
        carName: "Porsche Cayenne GTS Coupe",
        period: "Oct 20, 2026 - Oct 25, 2026 (5 Days)",
        amount: 1170.00,
        status: "Paid",
        method: "Visa ending in 4242",
        items: [
          { description: "Porsche Cayenne GTS Coupe (5 days @ $195/day)", amount: 975.00 },
          { description: "Premium Shield Insurance ($24/day x 5 days)", amount: 120.00 },
          { description: "Optional Add-on: Pre-loaded Satellite GPS ($7/day)", amount: 35.00 },
          { description: "Optional Add-on: Additional Verified Driver ($10/day)", amount: 50.00 },
          { description: "State Automotive Taxes & Airport Concession (8%)", amount: 94.40 },
          { description: "Security Deposit Hold (Authorized & Pending Return)", amount: 600.00, isHold: true }
        ]
      },
      {
        id: "INV-2026-8714",
        bookingId: "BK-8902",
        date: "Oct 21, 2026",
        dueDate: "Oct 21, 2026",
        carName: "Tesla Model S Plaid",
        period: "Nov 12, 2026 - Nov 16, 2026 (4 Days)",
        amount: 740.00,
        status: "Paid",
        method: "Visa ending in 4242",
        items: [
          { description: "Tesla Model S Plaid (4 days @ $165/day)", amount: 660.00 },
          { description: "Basic Protection Package ($0 deductible tier)", amount: 0.00 },
          { description: "Optional Add-on: Unlimited 5G Wi-Fi Hotspot ($9/day)", amount: 36.00 },
          { description: "State Highway Taxes & Environmental Fee", amount: 55.68 }
        ]
      },
      {
        id: "INV-2026-7629",
        bookingId: "BK-7629",
        date: "Sep 08, 2026",
        dueDate: "Sep 08, 2026",
        carName: "Mercedes-Benz S-Class 580",
        period: "Sep 10, 2026 - Sep 14, 2026 (4 Days)",
        amount: 925.00,
        status: "Paid",
        method: "Mastercard ending in 8891",
        items: [
          { description: "Mercedes-Benz S-Class 580 (4 days @ $185/day)", amount: 740.00 },
          { description: "Premium Shield Insurance ($24/day x 4 days)", amount: 96.00 },
          { description: "Optional Add-on: Pre-loaded Satellite GPS", amount: 28.00 },
          { description: "State Vehicle Taxes & Surcharge", amount: 69.12 }
        ]
      },
      {
        id: "INV-2026-6411",
        bookingId: "BK-6411",
        date: "Jul 29, 2026",
        dueDate: "Jul 29, 2026",
        carName: "BMW 7-Series 740i M-Sport",
        period: "Aug 01, 2026 - Aug 05, 2026 (4 Days)",
        amount: 875.00,
        status: "Paid",
        method: "Visa ending in 4242",
        items: [
          { description: "BMW 7-Series 740i M-Sport (4 days @ $175/day)", amount: 700.00 },
          { description: "Basic Protection Package", amount: 0.00 },
          { description: "Optional Add-on: Unlimited 5G Wi-Fi Hotspot", amount: 36.00 },
          { description: "State Taxes and Facilities Fee", amount: 58.88 }
        ]
      },
      {
        id: "INV-2026-5120",
        bookingId: "BK-5120",
        date: "Jun 12, 2026",
        dueDate: "Jun 12, 2026",
        carName: "Audi A4 45 TFSI S-Line",
        period: "Jun 15, 2026 - Jun 19, 2026 (4 Days)",
        amount: 410.00,
        status: "Paid",
        method: "Visa ending in 4242",
        items: [
          { description: "Audi A4 45 TFSI S-Line (4 days @ $82/day)", amount: 328.00 },
          { description: "Basic Protection Tier", amount: 0.00 },
          { description: "State Surcharge & Registration Fee", amount: 26.24 }
        ]
      }
    ]
  }
};
