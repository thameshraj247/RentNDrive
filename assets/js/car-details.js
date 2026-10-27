

(function () {
  "use strict";

  
  const VEHICLES = [
    {
      id: 1,
      name: "Mercedes-Benz S-Class 580",
      brand: "Mercedes-Benz",
      model: "S-Class 580 4MATIC",
      year: 2025,
      category: "Luxury Sedan",
      price: 185,
      rating: 4.96,
      reviews: 48,
      seats: 5,
      transmission: "Automatic",
      gearbox: "9G-TRONIC Auto",
      fuel: "Mild Hybrid Petrol",
      economy: "24 MPG",
      bags: 3,
      tag: "Executive Choice",
      img: "fleet-mercedes-s580.jpg",
      gallery: [
        "fleet-mercedes-s580.jpg",
        "hero-fleet.jpg",
        "fleet-mercedes-c300.jpg"
      ],
      description: "The benchmark of automotive luxury. Whisper-quiet cabin, unmatched ride comfort, and effortless power make every journey first-class with state-of-the-art massaging executive seats.",
      engine: "4.0L V8 Biturbo with EQ Boost",
      horsepower: "496 HP",
      acceleration: "4.4s (0-60 mph)",
      topSpeed: "155 mph",
      deposit: "$500",
      features: [
        "Burmester 4D High-End Surround Audio",
        "Active Multicontour Heated & Massaging Seats",
        "Active Ambient Lighting (64 Colors)",
        "360° Surround View Camera with Park Assist",
        "Distronic Plus Autonomous Adaptive Cruise",
        "Executive Rear Seat Package with Wireless Charging"
      ]
    },
    {
      id: 2,
      name: "Porsche Cayenne GTS",
      brand: "Porsche",
      model: "Cayenne GTS Coupe",
      year: 2024,
      category: "Adventure SUV",
      price: 195,
      rating: 4.98,
      reviews: 62,
      seats: 5,
      transmission: "Automatic",
      gearbox: "PDK 8-Speed",
      fuel: "Twin-Turbo Petrol",
      economy: "19 MPG",
      bags: 4,
      tag: "Best Seller",
      img: "fleet-porsche-cayenne.jpg",
      gallery: [
        "fleet-porsche-cayenne.jpg",
        "hero-home.jpg",
        "plan-weekly.jpg"
      ],
      description: "Combining true sports car DNA with SUV versatility. Command winding mountain roads or coastal highways with supreme confidence and twin-turbo V8 throttle response.",
      engine: "4.0L Twin-Turbo V8",
      horsepower: "493 HP",
      acceleration: "4.1s (0-60 mph)",
      topSpeed: "171 mph",
      deposit: "$600",
      features: [
        "Sport Chrono Package with Mode Switch",
        "Adaptive Air Suspension with PASM",
        "Panoramic Fixed Glass Roof",
        "Porsche Communication Management (PCM)",
        "Bose Premium 14-Speaker Audio",
        "Active All-Wheel Drive with Torque Vectoring"
      ]
    },
    {
      id: 3,
      name: "Tesla Model S Plaid",
      brand: "Tesla",
      model: "Model S Plaid Tri-Motor",
      year: 2025,
      category: "Electric & Hybrid",
      price: 165,
      rating: 4.94,
      reviews: 89,
      seats: 5,
      transmission: "Single-Speed",
      gearbox: "Single-Speed EV",
      fuel: "100% Electric",
      economy: "396 Miles Range",
      bags: 4,
      tag: "Zero Emission",
      img: "fleet-tesla-plaid.jpg",
      gallery: [
        "fleet-tesla-plaid.jpg",
        "cat-electric.jpg",
        "fleet-taycan.jpg"
      ],
      description: "Sub-2-second acceleration meets zero emissions. Includes seamless complimentary access to Tesla's nationwide Supercharger network and full gaming screen for passengers.",
      engine: "Tri-Motor Electric Drive Unit",
      horsepower: "1,020 HP",
      acceleration: "1.99s (0-60 mph)",
      topSpeed: "200 mph",
      deposit: "$450",
      features: [
        "Tri-Motor All-Wheel Drive with Torque Vectoring",
        "Full Self-Driving Autopilot Capability",
        "Yoke Steering with Haptic Feedback",
        "Rear Passenger Cinema & Gaming Display",
        "Supercharging Included Across Network",
        "Hospital-Grade HEPA Cabin Air Filtration"
      ]
    },
    {
      id: 4,
      name: "Porsche 911 Carrera Cabriolet",
      brand: "Porsche",
      model: "911 Carrera Cabriolet (992)",
      year: 2024,
      category: "Convertible Exotics",
      price: 280,
      rating: 4.99,
      reviews: 34,
      seats: 4,
      transmission: "Automatic",
      gearbox: "8-Speed PDK",
      fuel: "Twin-Turbo Boxer 6",
      economy: "21 MPG",
      bags: 2,
      tag: "Iconic Roadster",
      img: "fleet-porsche-911cab.jpg",
      gallery: [
        "fleet-porsche-911cab.jpg",
        "cat-convertible.jpg",
        "fleet-bmw-m4.jpg"
      ],
      description: "Drop the power roof in 12 seconds, hear the rear-mounted boxer roar, and immerse yourself in coastal sunshine. The definitive grand touring sports convertible.",
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: "379 HP",
      acceleration: "3.8s (0-60 mph)",
      topSpeed: "181 mph",
      deposit: "$800",
      features: [
        "Fully Automatic Power Soft-Top (Opens in 12s)",
        "Switchable Dual-Mode Sport Exhaust System",
        "Porsche Active Suspension Management (PASM)",
        "LED Matrix Headlights with Porsche Dynamic Light",
        "Sport Chrono Dial with Launch Control",
        "Carbon Fiber Interior Accent Package"
      ]
    },
    {
      id: 5,
      name: "BMW 7-Series 740i M-Sport",
      brand: "BMW",
      model: "740i Sedan M Sport",
      year: 2025,
      category: "Luxury Sedan",
      price: 175,
      rating: 4.92,
      reviews: 41,
      seats: 5,
      transmission: "Automatic",
      gearbox: "Steptronic Sport 8-Speed",
      fuel: "Mild Hybrid Turbo I6",
      economy: "28 MPG",
      bags: 3,
      tag: "Cinema Luxury",
      img: "fleet-bmw-740i.jpg",
      gallery: [
        "fleet-bmw-740i.jpg",
        "hero-fleet.jpg",
        "fleet-mercedes-s580.jpg"
      ],
      description: "Futuristic luxury featuring a 31.3-inch 8K BMW Theater Screen for rear passengers. Redefining modern VIP travel with crystal controls and panoramic sky lounge.",
      engine: "3.0L TwinPower Turbo I6",
      horsepower: "375 HP",
      acceleration: "5.1s (0-60 mph)",
      topSpeed: "155 mph",
      deposit: "$500",
      features: [
        "31.3-inch 8K BMW Rear Theater Display",
        "Panoramic Sky Lounge LED Roof with Light Patterns",
        "Bowers & Wilkins Diamond Surround Audio",
        "Active Driving Assistant Professional",
        "Handcrafted CraftedClarity Glass Controls",
        "M Sport Aero Package with Shadowline Trim"
      ]
    },
    {
      id: 6,
      name: "Range Rover Autobiography",
      brand: "Land Rover",
      model: "Range Rover LWB Autobiography",
      year: 2025,
      category: "Adventure SUV",
      price: 240,
      rating: 4.97,
      reviews: 53,
      seats: 5,
      transmission: "Automatic",
      gearbox: "8-Speed ZF Auto",
      fuel: "Twin-Turbo V8",
      economy: "18 MPG",
      bags: 5,
      tag: "Royal Flagship",
      img: "fleet-rangerover.jpg",
      gallery: [
        "fleet-rangerover.jpg",
        "about-story.jpg",
        "cat-suv.jpg"
      ],
      description: "Peerless British grandeur. Whether pulling up to a 5-star gala or traversing alpine passes in comfort, arrive in unmatched elegance and commanding ride height.",
      engine: "4.4L Twin-Turbo V8",
      horsepower: "523 HP",
      acceleration: "4.4s (0-60 mph)",
      topSpeed: "155 mph",
      deposit: "$750",
      features: [
        "All-Terrain Progress Control (ATPC) Terrain Response",
        "Meridian Signature 35-Speaker 3D Audio",
        "Executive Class Rear Airline Seating",
        "Active Noise Cancellation in Headrests",
        "Electrically Deployable Automatic Side Steps",
        "Four-Wheel Steering for Agile Urban Manoeuvres"
      ]
    },
    {
      id: 7,
      name: "Porsche Taycan 4S Cross Turismo",
      brand: "Porsche",
      model: "Taycan 4S Cross Turismo",
      year: 2024,
      category: "Electric & Hybrid",
      price: 205,
      rating: 4.95,
      reviews: 29,
      seats: 5,
      transmission: "Single-Speed",
      gearbox: "2-Speed EV Rear / 1-Speed Front",
      fuel: "100% Electric",
      economy: "285 Miles Range",
      bags: 3,
      tag: "High Performance EV",
      img: "fleet-taycan.jpg",
      gallery: [
        "fleet-taycan.jpg",
        "cat-electric.jpg",
        "fleet-tesla-plaid.jpg"
      ],
      description: "Porsche precision with shooting-brake practicality. Charges from 10% to 80% in just 18 minutes on DC fast chargers with all-wheel drive stability.",
      engine: "Dual Permanent Magnet Synchronous Motors",
      horsepower: "522 HP",
      acceleration: "3.9s (0-60 mph)",
      topSpeed: "149 mph",
      deposit: "$600",
      features: [
        "800-Volt Ultra-Fast Charging Architecture",
        "Gravel Off-Road Driving Mode with Raised Suspension",
        "Porsche Electric Sport Sound Synthesizer",
        "Dedicated Front Passenger Touchscreen",
        "Adaptive Air Suspension with Smart Lift",
        "Performance Battery Plus (93.4 kWh)"
      ]
    },
    {
      id: 8,
      name: "Cadillac Escalade Sport ESV",
      brand: "Cadillac",
      model: "Escalade Sport ESV Platinum",
      year: 2025,
      category: "Adventure SUV",
      price: 215,
      rating: 4.91,
      reviews: 76,
      seats: 7,
      transmission: "Automatic",
      gearbox: "10-Speed Automatic",
      fuel: "6.2L V8",
      economy: "16 MPG",
      bags: 6,
      tag: "7-Passenger VIP",
      img: "fleet-escalade.jpg",
      gallery: [
        "fleet-escalade.jpg",
        "cat-suv.jpg",
        "fleet-rangerover.jpg"
      ],
      description: "The grandest American luxury SUV. Unmatched 7-passenger space with cavernous luggage volume, curved OLED displays, and hands-free highway capability.",
      engine: "6.2L V8 VVT with Dynamic Fuel Mgmt",
      horsepower: "420 HP",
      acceleration: "5.9s (0-60 mph)",
      topSpeed: "130 mph",
      deposit: "$650",
      features: [
        "Curved 38-inch Total Diagonal OLED Display",
        "AKG Studio Reference 36-Speaker Audio",
        "Super Cruise Hands-Free Driving Assistance",
        "Console Refrigerator with Freezer Mode",
        "Power-Folding 3rd Row and Captain's Chairs",
        "Full Color Head-Up Display & Night Vision"
      ]
    },
    {
      id: 9,
      name: "BMW M4 Competition Convertible",
      brand: "BMW",
      model: "M4 Competition xDrive Convertible",
      year: 2024,
      category: "Convertible Exotics",
      price: 235,
      rating: 4.96,
      reviews: 38,
      seats: 4,
      transmission: "Automatic",
      gearbox: "8-Speed M Steptronic",
      fuel: "TwinPower Turbo Petrol",
      economy: "22 MPG",
      bags: 2,
      tag: "M Performance",
      img: "fleet-bmw-m4.jpg",
      gallery: [
        "fleet-bmw-m4.jpg",
        "fleet-porsche-911cab.jpg",
        "cat-convertible.jpg"
      ],
      description: "Aggressive M-division performance with open-air exhilaration. 503 HP channeled to all four wheels for relentless grip and spine-tingling exhaust notes.",
      engine: "3.0L BMW M TwinPower Turbo Inline-6",
      horsepower: "503 HP",
      acceleration: "3.6s (0-60 mph)",
      topSpeed: "180 mph",
      deposit: "$700",
      features: [
        "M xDrive Intelligent All-Wheel Drive",
        "M Carbon Bucket Heated Sport Seats",
        "Head-Up Display with Dedicated M Track Mode",
        "Harman Kardon Surround Sound System",
        "Adaptive M Sport Suspension & Active Diff",
        "Panel Bow Power Convertible Roof (18s)"
      ]
    },
    {
      id: 10,
      name: "Mercedes-Benz C300 AMG Line",
      brand: "Mercedes-Benz",
      model: "C300 Sedan AMG Line",
      year: 2024,
      category: "Economy & Compact",
      price: 89,
      rating: 4.88,
      reviews: 112,
      seats: 5,
      transmission: "Automatic",
      gearbox: "9G-TRONIC Auto",
      fuel: "Mild Hybrid Turbo I4",
      economy: "35 MPG",
      bags: 2,
      tag: "Smart Travel",
      img: "fleet-mercedes-c300.jpg",
      gallery: [
        "fleet-mercedes-c300.jpg",
        "cat-luxury.jpg",
        "hero-fleet.jpg"
      ],
      description: "Chic, fuel-efficient luxury that punches well above its weight. Perfect for urban exploration, business meetings, and effortless coastal weekend getaways.",
      engine: "2.0L Turbocharged I4 with EQ Boost",
      horsepower: "255 HP",
      acceleration: "5.7s (0-60 mph)",
      topSpeed: "130 mph",
      deposit: "$300",
      features: [
        "11.9-inch Portrait Central Touchscreen",
        "AMG Aerodynamic Body Styling & Alloy Wheels",
        "Wireless Apple CarPlay & Android Auto",
        "Ambient Lighting with 64 Selectable Colors",
        "Active Brake Assist & Blind Spot Monitoring",
        "Keyless-GO with Hands-Free Access"
      ]
    },
    {
      id: 11,
      name: "Audi A4 45 TFSI S-Line",
      brand: "Audi",
      model: "A4 Sedan 45 TFSI Quattro",
      year: 2024,
      category: "Economy & Compact",
      price: 82,
      rating: 4.85,
      reviews: 94,
      seats: 5,
      transmission: "Automatic",
      gearbox: "7-Speed S Tronic Dual-Clutch",
      fuel: "Turbocharged Petrol",
      economy: "32 MPG",
      bags: 2,
      tag: "Best Value",
      img: "fleet-audi-a4.jpg",
      gallery: [
        "fleet-audi-a4.jpg",
        "cat-compact.jpg",
        "fleet-mercedes-c300.jpg"
      ],
      description: "Agile, impeccably built, and confident in all weather. The gold standard for stylish executive car hire and seamless road trip comfort.",
      engine: "2.0L TFSI Turbocharged 4-Cylinder",
      horsepower: "261 HP",
      acceleration: "5.2s (0-60 mph)",
      topSpeed: "130 mph",
      deposit: "$300",
      features: [
        "Audi Virtual Cockpit Plus Digital Cluster",
        "Legendary Quattro All-Wheel Drive Grip",
        "Bang & Olufsen 3D Premium Sound System",
        "Matrix LED Headlights with Dynamic Indicators",
        "Heated Leather Sport Seats with Lumbar",
        "Audi Pre Sense City Collision Avoidance"
      ]
    },
    {
      id: 12,
      name: "Mercedes-Benz EQS 450+ Sedan",
      brand: "Mercedes-Benz",
      model: "EQS 450+ Luxury Sedan",
      year: 2025,
      category: "Electric & Hybrid",
      price: 170,
      rating: 4.93,
      reviews: 37,
      seats: 5,
      transmission: "Single-Speed",
      gearbox: "Single-Speed EV",
      fuel: "100% Electric",
      economy: "410 Miles Range",
      bags: 3,
      tag: "Ultra Range",
      img: "fleet-mercedes-eqs.jpg",
      gallery: [
        "fleet-mercedes-eqs.jpg",
        "cat-electric.jpg",
        "fleet-mercedes-s580.jpg"
      ],
      description: "The apex of electric prestige. Glides across the road in near-silence with up to 410 miles of single-charge range and sweeping aerodynamic contours.",
      engine: "Electric Permanently Excited Synchronous Motor",
      horsepower: "355 HP",
      acceleration: "5.9s (0-60 mph)",
      topSpeed: "130 mph",
      deposit: "$500",
      features: [
        "Hyperscreen Pillar-to-Pillar Glass Cockpit",
        "10-Degree Rear-Axle Steering for Agile Turns",
        "Airmatic Air Suspension with Adaptive Damping",
        "Energizing Air Control Plus with HEPA Filtration",
        "Ultra-Aerodynamic 0.20 Drag Coefficient",
        "Burmester 3D Surround Sound with Sound Experiences"
      ]
    }
  ];

  
  const $ = (sel) => document.querySelector(sel);

  function getCarFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const carId = parseInt(params.get("car"), 10) || 1;
    return VEHICLES.find(v => v.id === carId) || VEHICLES[0];
  }

  function renderCarDetails() {
    const car = getCarFromUrl();

    
    document.title = `${car.name} | RentNDrive Luxury Car Rentals`;
    const breadcrumbName = $("#breadcrumbCarName");
    if (breadcrumbName) breadcrumbName.textContent = car.name;

    
    const brandEl = $("#carBrand");
    if (brandEl) brandEl.textContent = car.brand;
    const titleEl = $("#carTitle");
    if (titleEl) titleEl.textContent = car.name;
    const galleryNameEl = $("#galleryCarName");
    if (galleryNameEl) galleryNameEl.textContent = car.name;
    const descEl = $("#carDesc");
    if (descEl) descEl.textContent = car.description;
    const ratingEl = $("#carRating");
    if (ratingEl) ratingEl.textContent = `${car.rating} (${car.reviews} verified reviews)`;

    
    const priceEl = $("#carPrice");
    if (priceEl) priceEl.textContent = `$${car.price}`;

    
    const tagEl = $("#carTag");
    if (tagEl) {
      if (car.tag) {
        tagEl.textContent = `★ ${car.tag}`;
        tagEl.style.display = "inline-block";
      } else {
        tagEl.style.display = "none";
      }
    }

    
    const specSeats = $("#specSeats");
    if (specSeats) specSeats.textContent = `${car.seats} Adult Seats`;
    const specTrans = $("#specTransmission");
    if (specTrans) specTrans.textContent = car.gearbox || car.transmission;
    const specFuel = $("#specFuel");
    if (specFuel) specFuel.textContent = car.fuel;
    const specBags = $("#specBags");
    if (specBags) specBags.textContent = `${car.bags} Luggage Bags`;

    
    const tableEngine = $("#tableEngine");
    if (tableEngine) tableEngine.textContent = car.engine || "High-Output Performance Engine";
    const tableHp = $("#tableHorsepower");
    if (tableHp) tableHp.textContent = car.horsepower || "350+ HP";
    const tableAccel = $("#tableAcceleration");
    if (tableAccel) tableAccel.textContent = car.acceleration || "4.5s (0-60 mph)";
    const tableTopSpeed = $("#tableTopSpeed");
    if (tableTopSpeed) tableTopSpeed.textContent = car.topSpeed || "155 mph";
    const tableDeposit = $("#tableDeposit");
    if (tableDeposit) tableDeposit.textContent = car.deposit || "$500";
    const tableMileage = $("#tableMileage");
    if (tableMileage) tableMileage.textContent = car.economy || "Unlimited Highway";

    
    const featuresList = $("#featuresList");
    if (featuresList && Array.isArray(car.features)) {
      featuresList.innerHTML = car.features.map(f => `
        <li><i class="fa-solid fa-circle-check"></i> ${f}</li>
      `).join("");
    }

    
    const mainImg = $("#mainCarImg");
    if (mainImg) {
      mainImg.src = car.img;
      mainImg.alt = car.name;
    }

    const thumbRow = $("#thumbRow");
    if (thumbRow && Array.isArray(car.gallery)) {
      thumbRow.innerHTML = car.gallery.map((src, i) => `
        <div class="car-thumb ${i === 0 ? 'active' : ''}" data-src="${src}">
          <img src="${src}" alt="${car.name} view ${i + 1}" loading="lazy">
        </div>
      `).join("");

      
      thumbRow.querySelectorAll(".car-thumb").forEach(thumb => {
        thumb.addEventListener("click", () => {
          thumbRow.querySelectorAll(".car-thumb").forEach(t => t.classList.remove("active"));
          thumb.classList.add("active");
          if (mainImg) mainImg.src = thumb.dataset.src;
        });
      });
    }

    
    const bookBtn = $("#carBookBtn");
    if (bookBtn) {
      bookBtn.href = `login.html?car=${car.id}`;
    }

    
    const bannerTitle = $("#bannerCarTitle");
    if (bannerTitle) bannerTitle.textContent = car.name;
    const bannerBg = $("#bannerBgImg");
    if (bannerBg) {
      
      bannerBg.src = (car.gallery && car.gallery[1]) ? car.gallery[1] : (car.img || "hero-fleet.jpg");
    }

    
    document.querySelectorAll(".details-faq-q").forEach(q => {
      q.addEventListener("click", () => {
        const item = q.closest(".details-faq-item");
        if (item) {
          const isActive = item.classList.contains("active");
          document.querySelectorAll(".details-faq-item").forEach(it => it.classList.remove("active"));
          if (!isActive) item.classList.add("active");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", renderCarDetails);
})();
