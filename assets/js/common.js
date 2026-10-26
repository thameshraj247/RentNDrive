// Royal Fleet Car Rental - Shared UI Controller (Common across all pages)

document.addEventListener("DOMContentLoaded", () => {
  initCommonNav();
  initMobileMenu();
});

// Update Navbar based on store state
function initCommonNav() {
  const navAuthContainer = document.getElementById("nav-auth-container");
  if (!navAuthContainer) return;

  const isLoggedIn = store.state.isLoggedIn;
  const user = store.state.currentUser;

  if (isLoggedIn && user) {
    navAuthContainer.innerHTML = `
      <div class="flex items-center space-x-3">
        <a href="dashboard.html" class="flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors">
          <img src="${user.avatar}" alt="${user.name}" class="w-7 h-7 rounded-full object-cover border border-blue-600">
          <div class="text-left hidden sm:block">
            <span class="block text-xs font-bold text-blue-900 leading-tight">${user.name.split(' ')[0]}</span>
            <span class="block text-[10px] text-amber-600 font-semibold uppercase tracking-wider">${user.tier ? user.tier.split(' ')[0] : 'Member'}</span>
          </div>
          <i class="fa-solid fa-chevron-right text-xs text-blue-700 ml-1"></i>
        </a>
        <button id="nav-logout-btn" class="text-xs text-slate-500 hover:text-red-600 transition-colors px-2 py-1" title="Sign Out">
          <i class="fa-solid fa-arrow-right-from-bracket text-base"></i>
        </button>
      </div>
    `;

    const logoutBtn = document.getElementById("nav-logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        store.logout();
        showToast("Signed out successfully", "info");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 600);
      });
    }
  } else {
    navAuthContainer.innerHTML = `
      <div class="flex items-center space-x-2">
        <a href="login.html" class="text-sm font-semibold text-slate-700 hover:text-blue-700 px-3 py-2 transition-colors">
          Sign In
        </a>
        <a href="login.html" class="btn-royal-primary text-xs font-semibold px-4 py-2.5 rounded-full inline-flex items-center space-x-1.5 shadow-sm">
          <i class="fa-solid fa-user-plus text-xs"></i>
          <span>Register</span>
        </a>
      </div>
    `;
  }
}

// Mobile Drawer Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Global Toast Notification
function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toast-notification-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-notification-container";
    toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 text-xs font-bold animate-fade-in transition-all ${
    type === 'success' ? 'bg-slate-900 text-white border border-emerald-500/50' :
    type === 'error' ? 'bg-rose-900 text-white' :
    'bg-blue-900 text-white border border-blue-400/40'
  }`;

  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-info text-blue-300'} text-sm"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Pure Native HTML5 Canvas Confetti (Zero external libraries)
function triggerNativeConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#1e40af", "#1d4ed8", "#3b82f6", "#d97706", "#fde047", "#10b981", "#ffffff"];
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.45 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 1.2) * 12,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.28,
      opacity: 1
    });
  }

  const startTime = performance.now();
  const animate = (time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.009;

      if (p.opacity > 0) {
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (alive && (time - startTime) < 3200) {
      requestAnimationFrame(animate);
    } else {
      canvas.remove();
    }
  };
  requestAnimationFrame(animate);
}

// Universal Booking Modal (Callable from any page)
function openUniversalBookingModal(carId) {
  const car = store.getVehicleById(carId);
  if (!car) return;

  if (!store.state.isLoggedIn) {
    showToast("Please sign in or use 1-click demo to book a car", "info");
    setTimeout(() => { window.location.href = "login.html"; }, 800);
    return;
  }

  let modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "global-modal-container";
    document.body.appendChild(modalContainer);
  }

  const user = store.state.currentUser;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in" id="booking-modal-backdrop">
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-amber-200/80 shadow-2xl relative p-6 sm:p-8">
        <button id="booking-modal-close" class="absolute top-5 right-5 text-slate-400 hover:text-slate-700">
          <i class="fa-solid fa-xmark text-lg"></i>
        </button>

        <div class="flex items-center space-x-2 text-xs mb-6 pb-4 border-b border-slate-100">
          <span class="font-bold text-blue-900 flex items-center">
            <span class="w-5 h-5 rounded-full bg-blue-900 text-white inline-flex items-center justify-center text-[10px] mr-1.5">1</span>
            Configure Trip
          </span>
          <span class="text-slate-300">→</span>
          <span class="font-bold text-slate-400 flex items-center">
            <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 inline-flex items-center justify-center text-[10px] mr-1.5">2</span>
            Coverage & Addons
          </span>
          <span class="text-slate-300">→</span>
          <span class="font-bold text-slate-400 flex items-center">
            <span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 inline-flex items-center justify-center text-[10px] mr-1.5">3</span>
            Confirm & Pay
          </span>
        </div>

        <div class="flex items-center space-x-4 p-3.5 bg-cream-50 rounded-2xl border border-amber-200/60 mb-6">
          <img src="${car.image}" alt="${car.name}" class="w-18 h-14 rounded-xl object-cover border border-slate-200">
          <div class="flex-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-800">${car.categoryName}</span>
            <h4 class="text-base font-extrabold text-slate-900">${car.name}</h4>
            <p class="text-xs text-slate-500">$${car.pricePerDay}/day • Includes 24/7 Roadside Assistance</p>
          </div>
        </div>

        <form id="booking-wizard-form" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Pick-up Location</label>
              <select id="book-pickup-loc" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none">
                ${store.state.locations.map(l => `<option value="${l.name}">${l.name}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Return Location</label>
              <select id="book-return-loc" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none">
                ${store.state.locations.map(l => `<option value="${l.name}">${l.name}</option>`).join('')}
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Pick-up Date</label>
              <input type="date" id="book-pickup-date" value="${new Date(Date.now() + 86400000).toISOString().split('T')[0]}" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Return Date</label>
              <input type="date" id="book-return-date" value="${new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]}" class="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Protection Package</label>
            <div class="space-y-2">
              ${store.state.insuranceTiers.map(tier => `
                <label class="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-500 cursor-pointer bg-slate-50/60">
                  <div class="flex items-center space-x-3">
                    <input type="radio" name="book-insurance" value="${tier.id}" data-rate="${tier.dailyRate}" data-name="${tier.name}" ${tier.id === 'premium' ? 'checked' : ''} class="text-blue-700">
                    <div>
                      <span class="block text-xs font-bold text-slate-900">${tier.name} (${tier.deductible})</span>
                      <span class="block text-[10px] text-slate-500">${tier.features[0]}</span>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${tier.dailyRate === 0 ? 'text-emerald-700' : 'text-slate-800'}">
                    ${tier.dailyRate === 0 ? 'Included' : `+$${tier.dailyRate}/day`}
                  </span>
                </label>
              `).join('')}
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Optional Travel Add-ons</label>
            <div class="grid grid-cols-2 gap-2">
              ${store.state.addons.map(a => `
                <label class="flex items-center space-x-2 p-2 rounded-xl border border-slate-200 bg-slate-50/60 text-xs cursor-pointer">
                  <input type="checkbox" name="book-addon" value="${a.id}" data-rate="${a.pricePerDay}" data-name="${a.name}" data-flat="${a.flatFee || false}" class="rounded text-blue-700">
                  <div>
                    <span class="block font-semibold text-slate-800 text-[11px]">${a.name}</span>
                    <span class="text-[10px] text-slate-500">${a.flatFee ? `$${a.pricePerDay} flat` : `+$${a.pricePerDay}/day`}</span>
                  </div>
                </label>
              `).join('')}
            </div>
          </div>

          <div class="p-3.5 bg-blue-50 rounded-2xl border border-blue-200">
            <span class="text-[10px] font-bold uppercase tracking-wider text-blue-900 block mb-1">Payment Method</span>
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-slate-800">
                <i class="fa-solid fa-credit-card text-blue-700 mr-1.5"></i>
                ${user.paymentMethods && user.paymentMethods[0] ? `${user.paymentMethods[0].brand} ending in ${user.paymentMethods[0].last4}` : 'Primary Visa on file'}
              </span>
              <span class="text-emerald-700 font-bold text-[11px]"><i class="fa-solid fa-shield-halved mr-1"></i> Instant Pre-Authorized</span>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="block text-xs text-slate-500">Estimated Total (Inc. Taxes & Fees)</span>
              <span id="booking-modal-total" class="text-2xl font-black text-blue-900">$0.00</span>
            </div>

            <button type="submit" class="btn-royal-primary text-xs font-bold px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
              <i class="fa-solid fa-lock text-xs"></i>
              <span>Complete Instant Booking</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const updateModalPrice = () => {
    const pDate = new Date(document.getElementById("book-pickup-date").value);
    const rDate = new Date(document.getElementById("book-return-date").value);
    let diffDays = Math.ceil((rDate - pDate) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) diffDays = 1;

    const baseTotal = car.pricePerDay * diffDays;
    const checkedIns = document.querySelector('input[name="book-insurance"]:checked');
    const insDaily = checkedIns ? parseFloat(checkedIns.getAttribute("data-rate")) : 0;
    const insTotal = insDaily * diffDays;

    let addonsTotal = 0;
    document.querySelectorAll('input[name="book-addon"]:checked').forEach(cb => {
      const rate = parseFloat(cb.getAttribute("data-rate"));
      const isFlat = cb.getAttribute("data-flat") === "true";
      addonsTotal += isFlat ? rate : (rate * diffDays);
    });

    const taxes = (baseTotal + insTotal + addonsTotal) * 0.08;
    const grandTotal = baseTotal + insTotal + addonsTotal + taxes;

    document.getElementById("booking-modal-total").textContent = `$${grandTotal.toFixed(2)}`;
    return { diffDays, baseTotal, insTotal, addonsTotal, taxes, grandTotal };
  };

  document.getElementById("book-pickup-date").addEventListener("change", updateModalPrice);
  document.getElementById("book-return-date").addEventListener("change", updateModalPrice);
  document.querySelectorAll('input[name="book-insurance"]').forEach(r => r.addEventListener("change", updateModalPrice));
  document.querySelectorAll('input[name="book-addon"]').forEach(cb => cb.addEventListener("change", updateModalPrice));

  updateModalPrice();

  document.getElementById("booking-modal-close").addEventListener("click", () => {
    modalContainer.innerHTML = "";
  });

  document.getElementById("booking-wizard-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const calc = updateModalPrice();

    const pickupLoc = document.getElementById("book-pickup-loc").value;
    const returnLoc = document.getElementById("book-return-loc").value;
    const pDate = document.getElementById("book-pickup-date").value;
    const rDate = document.getElementById("book-return-date").value;

    const checkedIns = document.querySelector('input[name="book-insurance"]:checked');
    const insId = checkedIns ? checkedIns.value : "basic";
    const insName = checkedIns ? checkedIns.getAttribute("data-name") : "Basic Protection";

    const selectedAddons = [];
    const addonItems = [];
    document.querySelectorAll('input[name="book-addon"]:checked').forEach(cb => {
      selectedAddons.push(cb.value);
      const rate = parseFloat(cb.getAttribute("data-rate"));
      const isFlat = cb.getAttribute("data-flat") === "true";
      addonItems.push({
        id: cb.value,
        name: cb.getAttribute("data-name"),
        totalPrice: isFlat ? rate : (rate * calc.diffDays)
      });
    });

    const bookingResult = store.createBooking({
      carId: car.id,
      pickupLocationName: pickupLoc,
      returnLocationName: returnLoc,
      pickupDate: pDate,
      pickupTime: "10:00 AM",
      returnDate: rDate,
      returnTime: "10:00 AM",
      days: calc.diffDays,
      baseTotal: calc.baseTotal,
      insuranceId: insId,
      insuranceName: insName,
      insuranceCost: calc.insTotal,
      addons: selectedAddons,
      addonItems: addonItems,
      addonsCost: calc.addonsTotal,
      taxes: calc.taxes,
      totalAmount: calc.grandTotal,
      paymentMethod: user.paymentMethods[0] ? `${user.paymentMethods[0].brand} ending in ${user.paymentMethods[0].last4}` : "Visa ending in 4242"
    });

    modalContainer.innerHTML = "";
    triggerNativeConfetti();
    showToast(`Trip booked successfully! Ref: ${bookingResult.booking.id}`, "success");

    setTimeout(() => {
      window.location.href = "dashboard.html#rentals";
    }, 1200);
  });
}

// Universal Car Specs Modal (Callable from any page)
function openCarSpecsModal(carId) {
  const car = store.getVehicleById(carId);
  if (!car) return;

  let modalContainer = document.getElementById("global-modal-container");
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "global-modal-container";
    document.body.appendChild(modalContainer);
  }

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-amber-200/80 shadow-2xl relative">
        <button id="modal-close-btn" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark"></i>
        </button>

        <div class="relative h-64 bg-slate-900 overflow-hidden">
          <img src="${car.image}" alt="${car.name}" class="w-full h-full object-cover">
          <div class="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold">
            ${car.categoryName} • ${car.year} Model
          </div>
        </div>

        <div class="p-6 sm:p-8">
          <div class="flex items-start justify-between mb-4">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-800">${car.brand}</span>
              <h3 class="text-2xl font-black text-slate-900">${car.name}</h3>
              <p class="text-xs text-slate-500 mt-1">${car.description}</p>
            </div>
            <div class="text-right">
              <span class="text-2xl font-black text-blue-900">$${car.pricePerDay}</span>
              <span class="text-xs text-slate-500 block">per day</span>
            </div>
          </div>

          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Technical Specifications</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            <div class="bg-cream-50 p-2.5 rounded-xl border border-amber-200/50 text-center">
              <span class="block text-[10px] text-slate-400 uppercase">Engine</span>
              <span class="text-xs font-bold text-slate-800">${car.specs.engine.split(' ')[0]}</span>
            </div>
            <div class="bg-cream-50 p-2.5 rounded-xl border border-amber-200/50 text-center">
              <span class="block text-[10px] text-slate-400 uppercase">Horsepower</span>
              <span class="text-xs font-bold text-slate-800">${car.specs.horsepower}</span>
            </div>
            <div class="bg-cream-50 p-2.5 rounded-xl border border-amber-200/50 text-center">
              <span class="block text-[10px] text-slate-400 uppercase">0-60 MPH</span>
              <span class="text-xs font-bold text-slate-800">${car.specs.acceleration}</span>
            </div>
            <div class="bg-cream-50 p-2.5 rounded-xl border border-amber-200/50 text-center">
              <span class="block text-[10px] text-slate-400 uppercase">Range / Fuel</span>
              <span class="text-xs font-bold text-slate-800">${car.mileage}</span>
            </div>
          </div>

          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Included Luxury Amenities</h4>
          <div class="grid grid-cols-2 gap-2 mb-8">
            ${car.features.map(f => `
              <div class="flex items-center text-xs text-slate-700">
                <i class="fa-solid fa-check text-blue-600 mr-2 text-xs"></i>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>

          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span class="text-xs text-slate-500">Refundable Deposit Hold:</span>
              <span class="font-bold text-slate-800 text-xs ml-1">$${car.deposit}</span>
            </div>
            <button id="modal-reserve-btn" class="btn-royal-primary text-xs font-bold px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg">
              <span>Proceed to Reserve</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("modal-close-btn").addEventListener("click", () => {
    modalContainer.innerHTML = "";
  });

  document.getElementById("modal-reserve-btn").addEventListener("click", () => {
    modalContainer.innerHTML = "";
    openUniversalBookingModal(car.id);
  });
}
