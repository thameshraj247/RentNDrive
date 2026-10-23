// RentNDrive - Pricing & Plans Interactive Estimator

document.addEventListener("DOMContentLoaded", () => {
  initPricingCalculator();
});

function initPricingCalculator() {
  const carSelect = document.getElementById("calc-car-select");
  const daysRange = document.getElementById("calc-days-range");
  const daysLabel = document.getElementById("calc-days-label");
  if (!carSelect || !daysRange) return;

  const VEHICLES = [
    { id: 1, name: "Mercedes-Benz S-Class 580", pricePerDay: 185, category: "Luxury Sedan" },
    { id: 2, name: "Porsche Cayenne GTS", pricePerDay: 195, category: "Adventure SUV" },
    { id: 3, name: "Tesla Model S Plaid", pricePerDay: 165, category: "Electric & EV" },
    { id: 4, name: "Porsche 911 Carrera Cabriolet", pricePerDay: 280, category: "Convertible" },
    { id: 5, name: "BMW 7-Series 740i M-Sport", pricePerDay: 175, category: "Luxury Sedan" },
    { id: 6, name: "Range Rover Autobiography", pricePerDay: 240, category: "Adventure SUV" },
    { id: 7, name: "Porsche Taycan 4S Cross Turismo", pricePerDay: 205, category: "Electric & EV" },
    { id: 8, name: "Cadillac Escalade Sport ESV", pricePerDay: 215, category: "Adventure SUV" },
    { id: 9, name: "BMW M4 Competition Convertible", pricePerDay: 235, category: "Convertible" },
    { id: 10, name: "Mercedes-Benz C300 AMG Line", pricePerDay: 89, category: "Premium Compact" },
    { id: 11, name: "Audi A4 45 TFSI S-Line", pricePerDay: 82, category: "Premium Compact" },
    { id: 12, name: "Mercedes-Benz EQS 450+ Sedan", pricePerDay: 170, category: "Electric & EV" }
  ];

  const findVehicle = (id) => VEHICLES.find((v) => String(v.id) === String(id)) || VEHICLES[0];
  const money = (n) => `$${Number(n).toFixed(2)}`;
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  // Populate vehicle options
  carSelect.innerHTML = VEHICLES.map(
    (car) => `<option value="${car.id}">${car.name} — $${car.pricePerDay}/day (${car.category})</option>`
  ).join("");

  const updateCalc = () => {
    const vehicle = findVehicle(carSelect.value);
    const days = parseInt(daysRange.value, 10);

    // Duration discount
    let discountRate = 0;
    let discountText = "";
    if (days >= 30) {
      discountRate = 0.30;
      discountText = " — 30% off";
    } else if (days >= 7) {
      discountRate = 0.15;
      discountText = " — 15% off";
    }
    if (daysLabel) {
      daysLabel.textContent = `${days} Day${days > 1 ? "s" : ""}${discountText}`;
    }

    // Vehicle Base
    const carRate = vehicle ? vehicle.pricePerDay : 185;
    const rawBase = carRate * days;
    const discountAmount = rawBase * discountRate;
    const discountedBase = rawBase - discountAmount;

    // Protection Package
    const checkedIns = document.querySelector('input[name="calc-insurance"]:checked');
    const insDailyRate = checkedIns ? parseFloat(checkedIns.getAttribute("data-rate")) : 0;
    const insSubtotal = insDailyRate * days;

    // Optional Add-ons
    let addonsSubtotal = 0;
    document.querySelectorAll('input[name="calc-addon"]:checked').forEach((cb) => {
      const rate = parseFloat(cb.getAttribute("data-rate"));
      addonsSubtotal += rate * days;
    });

    // Totals calculation
    const taxableAmount = discountedBase + insSubtotal + addonsSubtotal;
    const taxes = taxableAmount * 0.08;
    const grandTotal = taxableAmount + taxes;

    setText("calc-car-name", vehicle ? vehicle.name : "Selected Vehicle");
    setText("calc-base-subtotal", money(rawBase));

    const discountRow = document.getElementById("calc-discount-row");
    if (discountRow) {
      if (discountAmount > 0) {
        discountRow.classList.remove("hidden");
        setText("calc-discount-val", `-${money(discountAmount)} (${Math.round(discountRate * 100)}%)`);
      } else {
        discountRow.classList.add("hidden");
      }
    }

    setText("calc-insurance-subtotal", money(insSubtotal));
    setText("calc-addons-subtotal", money(addonsSubtotal));
    setText("calc-tax-subtotal", money(taxes));
    setText("calc-grand-total", money(grandTotal));
    setText("calc-daily-average", `Avg. ${money(grandTotal / days)}/day`);
  };

  // Event Listeners
  carSelect.addEventListener("change", updateCalc);
  daysRange.addEventListener("input", updateCalc);
  document.querySelectorAll('input[name="calc-insurance"]').forEach((r) => r.addEventListener("change", updateCalc));
  document.querySelectorAll('input[name="calc-addon"]').forEach((cb) => cb.addEventListener("change", updateCalc));

  const bookNowBtn = document.getElementById("calc-book-now-btn");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
      window.location.href = `login.html?car=${carSelect.value}&days=${daysRange.value}`;
    });
  }

  // Initial calculation run
  updateCalc();
}
