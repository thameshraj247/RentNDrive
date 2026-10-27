
(function () {
  "use strict";

  const html = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const KEY = "rnd-admin-fleet-v3";

  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const fmtTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
  const daysBetween = (s, e) => Math.max(1, Math.ceil((new Date(e) - new Date(s)) / 86400000));
  const clone = (o) => JSON.parse(JSON.stringify(o));

  /* =====================================================
     SAMPLE DATA
     ===================================================== */
  const HUBS = [
    { id: "H1", name: "Beverly Hills Flagship Lounge", city: "Beverly Hills, CA", capacity: 6, hours: "24 / 7" },
    { id: "H2", name: "Mumbai International Terminal", city: "Mumbai, India", capacity: 5, hours: "24 / 7" },
    { id: "H3", name: "Bengaluru Central VIP Hub", city: "Bengaluru, India", capacity: 4, hours: "8 AM &ndash; 11 PM" },
    { id: "H4", name: "Chennai Downtown Showroom", city: "Chennai, India", capacity: 3, hours: "9 AM &ndash; 9 PM" },
  ];

  const CARS_SEED = [
    { id: "C1", name: "Mercedes-Benz S-Class 580", cls: "Luxury Sedan", rate: 185, img: "fleet-mercedes-s580.jpg", hub: "H1", status: "available", fuel: 94 },
    { id: "C2", name: "Porsche Cayenne GTS", cls: "Adventure SUV", rate: 195, img: "fleet-porsche-cayenne.jpg", hub: "H1", status: "rented", fuel: 71 },
    { id: "C3", name: "Tesla Model S Plaid", cls: "Electric & Hybrid", rate: 165, img: "fleet-tesla-plaid.jpg", hub: "H2", status: "available", fuel: 88 },
    { id: "C4", name: "Porsche 911 Carrera Cabriolet", cls: "Convertible Exotics", rate: 280, img: "fleet-porsche-911cab.jpg", hub: "H1", status: "rented", fuel: 63 },
    { id: "C5", name: "BMW 7-Series 740i M-Sport", cls: "Luxury Sedan", rate: 175, img: "fleet-bmw-740i.jpg", hub: "H3", status: "maintenance", fuel: 40 },
    { id: "C6", name: "Range Rover Autobiography", cls: "Adventure SUV", rate: 240, img: "fleet-rangerover.jpg", hub: "H2", status: "available", fuel: 97 },
    { id: "C7", name: "Porsche Taycan 4S Cross Turismo", cls: "Electric & Hybrid", rate: 205, img: "fleet-taycan.jpg", hub: "H3", status: "available", fuel: 92 },
    { id: "C8", name: "Cadillac Escalade Sport ESV", cls: "Adventure SUV", rate: 215, img: "fleet-escalade.jpg", hub: "H2", status: "available", fuel: 85 },
    { id: "C9", name: "BMW M4 Competition Convertible", cls: "Convertible Exotics", rate: 235, img: "fleet-bmw-m4.jpg", hub: "H4", status: "available", fuel: 90 },
    { id: "C10", name: "Mercedes-Benz C300 AMG Line", cls: "Economy & Compact", rate: 89, img: "fleet-mercedes-c300.jpg", hub: "H4", status: "available", fuel: 95 },
    { id: "C11", name: "Audi A4 45 TFSI S-Line", cls: "Economy & Compact", rate: 82, img: "fleet-audi-a4.jpg", hub: "H3", status: "available", fuel: 88 },
    { id: "C12", name: "Mercedes-Benz EQS 450+ Sedan", cls: "Electric & Hybrid", rate: 170, img: "fleet-mercedes-eqs.jpg", hub: "H1", status: "available", fuel: 91 },
  ];

  const RES_SEED = [
    { id: "RR-1001", customer: "Marco Rossi", car: "C1", hub: "H1", start: "2026-10-22T10:00", end: "2026-10-25T10:00", status: "active" },
    { id: "RR-1002", customer: "Elena Vane", car: "C2", hub: "H1", start: "2026-10-24T09:00", end: "2026-10-26T09:00", status: "confirmed" },
    { id: "RR-1003", customer: "Julian Gray", car: "C3", hub: "H2", start: "2026-10-25T14:00", end: "2026-10-28T14:00", status: "pending" },
    { id: "RR-1004", customer: "Aisha Khan", car: "C4", hub: "H2", start: "2026-10-27T10:00", end: "2026-10-29T10:00", status: "confirmed" },
    { id: "RR-1005", customer: "David Sterling", car: "C6", hub: "H4", start: "2026-10-10T10:00", end: "2026-10-14T10:00", status: "completed" },
    { id: "RR-1006", customer: "Alexander Wright", car: "C5", hub: "H3", start: "2026-10-18T09:00", end: "2026-10-20T09:00", status: "cancelled" },
  ];

  const CUSTOMERS = [
    { name: "Marco Rossi", email: "marco.rossi@example.com", city: "Milan", tier: "Elite" },
    { name: "Elena Vane", email: "elena.vane@example.com", city: "London", tier: "Platinum" },
    { name: "Julian Gray", email: "julian.gray@example.com", city: "Los Angeles", tier: "Gold" },
    { name: "Aisha Khan", email: "aisha.khan@example.com", city: "Mumbai", tier: "Platinum" },
    { name: "David Sterling", email: "david.sterling@example.com", city: "San Francisco", tier: "Elite" },
    { name: "Alexander Wright", email: "alexander.wright@example.com", city: "New York", tier: "Gold" },
  ];

  const TICKETS_SEED = [
    { id: "T-301", subject: "Change return time", client: "Elena Vane", priority: "High", status: "open" },
    { id: "T-302", subject: "Child seat request", client: "Julian Gray", priority: "Normal", status: "open" },
    { id: "T-298", subject: "Refund status", client: "Alexander Wright", priority: "Normal", status: "resolved" },
  ];

  const REVIEWS = [
    { name: "Marcus Vance", car: "Mercedes-Maybach S 680", stars: 5, text: "The Maybach was delivered to my private terminal within 30 minutes of landing. An experience without peer." },
    { name: "Elena Rostova", car: "Porsche 911 GT3 RS", stars: 5, text: "Flawless condition, sensational exhaust note, zero friction with the team." },
    { name: "David Sterling", car: "Tesla Model S Plaid", stars: 5, text: "The digital key handover and concierge responsiveness are in a class of their own." },
  ];

  const PLANS = [
    { name: "Weekend Drive", price: "from $420", desc: "Two days with any flagship car", perks: ["Doorstep delivery", "Zero-deductible cover", "Free fuel top-up"] },
    { name: "Weekly Escape", price: "from $1,400", desc: "Seven days with a multi-day discount", perks: ["24/7 concierge", "Priority car swap", "One mid-trip car change"] },
    { name: "Monthly Membership", price: "from $4,800 / month", desc: "Rotating fleet access for 30 days", perks: ["Unlimited car swaps", "Dedicated concierge", "Hub lounge access"] },
    { name: "Corporate Fleet", price: "Custom quote", desc: "Accounts for teams and executives", perks: ["Invoicing on account", "Driver management", "Dedicated account lead"] },
  ];

  // Monthly bookings for the bar chart (sample history)
  const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];
  const MONTHLY = [61, 74, 69, 88, 92, 97];

  const STATUS_LABEL = {
    pending: "Pending",
    confirmed: "Confirmed",
    active: "On the road",
    completed: "Completed",
    cancelled: "Cancelled",
    available: "Available",
    rented: "Rented",
    maintenance: "Maintenance",
  };

  const SECTIONS = {
    dashboard: ["Dashboard Overview", "Hi, welcome back to RentNDrive"],
    reservations: ["Reservations", "Confirm, start and close every booking"],
    fleet: ["Fleet", "Track every vehicle across all hubs"],
    live: ["Live Rentals", "Cars currently on the road"],
    hubs: ["Hubs & Locations", "Pick-up points across the network"],
    customers: ["Clients", "Client profiles and loyalty tiers"],
    payments: ["Payments", "Invoices, deposits and refunds"],
    plans: ["Rental Plans", "Packages shown on the website"],
    reviews: ["Reviews", "What clients say after their drive"],
    support: ["Support", "Client tickets and concierge requests"],
  };

  /* =====================================================
     STATE (persisted to localStorage)
     ===================================================== */
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { cars: clone(CARS_SEED), reservations: clone(RES_SEED), tickets: clone(TICKETS_SEED) };
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {}
  }
  let state = load();

  const carOf = (id) => state.cars.find((c) => c.id === id);
  const hubOf = (id) => HUBS.find((h) => h.id === id);
  const amountOf = (r) => carOf(r.car).rate * daysBetween(r.start, r.end);
  const paymentOf = (r) => (r.status === "cancelled" ? "Refunded" : r.status === "pending" ? "Unpaid" : "Paid");
  const pill = (status) => `<span class="adm-pill p-${status}">${STATUS_LABEL[status] || status}</span>`;

  /* =====================================================
     CHARTS (pure SVG, no external library)
     ===================================================== */
  function barChart(el, labels, values) {
    const W = 640, H = 260, top = 28, bottom = 226, left = 42, right = 12;
    const total = values.reduce((sum, val) => sum + val, 0);
    const max = Math.max(...values) * 1.15;
    const bw = (W - left - right) / labels.length;
    let grid = "";
    for (let i = 0; i <= 4; i++) {
      const y = bottom - ((bottom - top) * i) / 4;
      const v = Math.round((max * i) / 4);
      grid += `<line class="grid" x1="${left}" x2="${W - right}" y1="${y}" y2="${y}"/>
               <text class="axis" x="${left - 8}" y="${y + 4}" text-anchor="end">${v}</text>`;
    }
    const bars = values
      .map((v, i) => {
        const h = ((bottom - top) * v) / max;
        const x = left + i * bw + bw * 0.22;
        const w = bw * 0.56;
        const pct = total ? ((v / total) * 100).toFixed(1) : "0";
        return `<g class="bar-group" data-val="${v}" data-pct="${pct}%" tabindex="0">
                  <rect class="bar" style="--i:${i}" x="${x}" y="${bottom - h}" width="${w}" height="${h}" rx="8"/>
                  <g class="bar-tooltip">
                    <rect class="tip-bg" x="${x + w / 2 - 28}" y="${bottom - h - 30}" width="56" height="24" rx="6"/>
                    <path class="tip-arrow" d="M ${x + w / 2 - 4} ${bottom - h - 6} L ${x + w / 2} ${bottom - h - 2} L ${x + w / 2 + 4} ${bottom - h - 6} Z"/>
                    <text class="tip-txt" x="${x + w / 2}" y="${bottom - h - 14}" text-anchor="middle">${pct}%</text>
                  </g>
                  <text class="axis" x="${x + w / 2}" y="${bottom + 22}" text-anchor="middle">${labels[i]}</text>
                </g>`;
      })
      .join("");
    el.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly bookings">
        <defs>
          <linearGradient id="barFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" style="stop-color:var(--bar-a)"/>
            <stop offset="1" style="stop-color:var(--bar-b)"/>
          </linearGradient>
        </defs>
        ${grid}${bars}
      </svg>`;
  }

  function donut(el, legendEl, segs) {
    const total = segs.reduce((s, x) => s + x.value, 0);
    const R = 70, C = 2 * Math.PI * R;
    let offset = 0;
    const arcs = segs
      .map((s, i) => {
        const len = total ? (s.value / total) * C : 0;
        const pct = total ? Math.round((s.value / total) * 100) : 0;
        const arc = `<circle class="arc" cx="90" cy="90" r="${R}"
          data-idx="${i}" data-label="${esc(s.label)}" data-val="${s.value}" data-pct="${pct}%"
          tabindex="0"
          style="stroke:var(--c${i + 1});stroke-dasharray:${len} ${C - len};stroke-dashoffset:${-offset}"/>`;
        offset += len;
        return arc;
      })
      .join("");
    el.innerHTML = `
      <div class="donut-wrap">
        <svg viewBox="0 0 180 180" role="img" aria-label="Fleet mix">
          <circle class="track" cx="90" cy="90" r="${R}"/>
          <g transform="rotate(-90 90 90)">${arcs}</g>
          <text class="donut-num" id="donutNum" x="90" y="92" text-anchor="middle">${total}</text>
          <text class="donut-lbl" id="donutLbl" x="90" y="112" text-anchor="middle">bookings</text>
        </svg>
        <div class="donut-floating-tip" id="donutTip"></div>
      </div>`;
    legendEl.innerHTML = segs
      .map(
        (s, i) => `<li data-idx="${i}"><span class="dot" style="background:var(--c${i + 1})"></span>${esc(s.label)}
        <b>${total ? Math.round((s.value / total) * 100) : 0}%</b></li>`
      )
      .join("");

    const numEl = el.querySelector("#donutNum");
    const lblEl = el.querySelector("#donutLbl");
    const tipEl = el.querySelector("#donutTip");
    const legendItems = legendEl.querySelectorAll("li");

    function setActive(idx) {
      if (idx !== null && segs[idx]) {
        const s = segs[idx];
        const pct = total ? Math.round((s.value / total) * 100) : 0;
        numEl.textContent = pct + "%";
        lblEl.textContent = `${s.value} booking${s.value === 1 ? "" : "s"}`;
        tipEl.innerHTML = `<strong>${esc(s.label)}</strong><span>${s.value} booking${s.value === 1 ? "" : "s"} (${pct}%)</span>`;
        tipEl.classList.add("show");
        legendItems.forEach((li, i) => li.classList.toggle("active", i === idx));
      } else {
        numEl.textContent = total;
        lblEl.textContent = "bookings";
        tipEl.classList.remove("show");
        legendItems.forEach(li => li.classList.remove("active"));
      }
    }

    el.querySelectorAll(".arc").forEach((arc) => {
      const idx = parseInt(arc.dataset.idx, 10);
      arc.addEventListener("mouseenter", () => setActive(idx));
      arc.addEventListener("mouseleave", () => setActive(null));
      arc.addEventListener("focus", () => setActive(idx));
      arc.addEventListener("blur", () => setActive(null));
    });

    legendItems.forEach((li) => {
      const idx = parseInt(li.dataset.idx, 10);
      li.addEventListener("mouseenter", () => {
        setActive(idx);
        const matchArc = el.querySelector(`.arc[data-idx="${idx}"]`);
        if (matchArc) matchArc.classList.add("hovered");
      });
      li.addEventListener("mouseleave", () => {
        setActive(null);
        const matchArc = el.querySelector(`.arc[data-idx="${idx}"]`);
        if (matchArc) matchArc.classList.remove("hovered");
      });
    });
  }
  /* =====================================================
     RENDERERS
     ===================================================== */
  function renderStats() {
    const res = state.reservations;
    const live = res.filter((r) => r.status === "active").length;
    const rented = state.cars.filter((c) => c.status === "rented").length;
    const util = Math.round((rented / state.cars.length) * 100);
    const revenue = res.filter((r) => r.status !== "cancelled").reduce((s, r) => s + amountOf(r), 0);

    $("#statBookings").textContent = res.length;
    $("#statLive").textContent = live;
    $("#statUtil").textContent = util + "%";
    $("#statRevenue").textContent = money(revenue);
  }

  function renderCharts() {
    barChart($("#chartMonthly"), MONTHS, MONTHLY);

    const count = (ids) =>
      state.reservations.filter((r) => r.status !== "cancelled" && ids.includes(r.car)).length;
    donut($("#chartMix"), $("#mixLegend"), [
      { label: "Flagship luxury", value: count(["C1"]) },
      { label: "Exotic & track", value: count(["C2"]) },
      { label: "Electric", value: count(["C4"]) },
      { label: "SUV & sport", value: count(["C3", "C5", "C6"]) },
    ]);
  }

  function renderUpcoming() {
    const rows = state.reservations
      .filter((r) => r.status === "pending" || r.status === "confirmed")
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 5);

    $("#upBody").innerHTML = rows.length
      ? rows
          .map((r) => {
            const c = carOf(r.car);
            return `<tr>
              <td><span class="chip">${esc(c.name)}</span></td>
              <td>${esc(r.customer)}</td>
              <td>${fmtDate(r.start)}</td>
              <td>${fmtTime(r.start)} &ndash; ${fmtTime(r.end)}</td>
              <td>${pill(r.status)}</td>
            </tr>`;
          })
          .join("")
      : `<tr><td colspan="5" class="adm-empty">No upcoming appointments.</td></tr>`;
  }

  function reservationRow(r) {
    const c = carOf(r.car);
    const h = hubOf(r.hub);
    const acts = {
      pending: `<button class="adm-btn sm" data-act="confirm" data-id="${r.id}">Confirm</button>
                <button class="adm-btn sm ghost" data-act="cancel" data-id="${r.id}">Cancel</button>`,
      confirmed: `<button class="adm-btn sm" data-act="start" data-id="${r.id}">Start</button>
                  <button class="adm-btn sm ghost" data-act="cancel" data-id="${r.id}">Cancel</button>`,
      active: `<button class="adm-btn sm" data-act="complete" data-id="${r.id}">Complete</button>`,
    }[r.status] || "";

    return `<tr>
      <td><b>${esc(r.id)}</b></td>
      <td>${esc(r.customer)}</td>
      <td>${esc(c.name)}</td>
      <td>${esc(h.name)}</td>
      <td>${fmtDate(r.start)}<small>${fmtTime(r.start)}</small></td>
      <td>${fmtDate(r.end)}<small>${fmtTime(r.end)}</small></td>
      <td>${money(amountOf(r))}</td>
      <td>${pill(r.status)}</td>
      <td class="acts">${acts}</td>
    </tr>`;
  }

  function renderReservations() {
    const filter = $("#resFilter").value;
    const q = $("#globalSearch").value.trim().toLowerCase();

    const rows = state.reservations
      .filter((r) => filter === "all" || r.status === filter)
      .filter((r) => {
        if (!q) return true;
        const hay = [r.id, r.customer, carOf(r.car).name, hubOf(r.hub).name].join(" ").toLowerCase();
        return hay.includes(q);
      })
      .sort((a, b) => new Date(b.start) - new Date(a.start));

    $("#resBody").innerHTML = rows.length
      ? rows.map(reservationRow).join("")
      : `<tr><td colspan="9" class="adm-empty">No reservations match.</td></tr>`;
  }

  function renderFleet() {
    $("#fleetGrid").innerHTML = state.cars
      .map((c) => {
        const hub = hubOf(c.hub);
        const btn =
          c.status === "rented"
            ? `<button class="adm-btn sm ghost" disabled>Currently rented</button>`
            : `<button class="adm-btn sm ghost" data-act="car" data-id="${c.id}">
                 ${c.status === "maintenance" ? "Return to service" : "Send to maintenance"}
               </button>`;
        return `<article class="adm-car">
          <img src="${c.img}" alt="${esc(c.name)}" />
          <div class="adm-car-body">
            <div class="row"><strong>${esc(c.name)}</strong>${pill(c.status)}</div>
            <small>${esc(c.cls)} Â· ${esc(hub.name)}</small>
            <div class="fuel" aria-label="Fuel ${c.fuel}%"><span style="width:${c.fuel}%"></span></div>
            <div class="row"><small>Fuel ${c.fuel}%</small><b>${money(c.rate)} / day</b></div>
            ${btn}
          </div>
        </article>`;
      })
      .join("");
  }

  function renderLive() {
    const rows = state.reservations.filter((r) => r.status === "active");
    $("#liveList").innerHTML = rows.length
      ? rows
          .map((r) => {
            const c = carOf(r.car);
            const h = hubOf(r.hub);
            return `<article class="adm-live">
              <img src="${c.img}" alt="" />
              <div>
                <strong>${esc(c.name)}</strong>
                <small>${esc(r.customer)} Â· ${esc(r.id)}</small>
                <div class="meta">
                  <span><i class="fa-solid fa-location-dot"></i>${esc(h.name)}</span>
                  <span><i class="fa-regular fa-clock"></i>Returns ${fmtDate(r.end)} ${fmtTime(r.end)}</span>
                  <span><i class="fa-solid fa-gas-pump"></i>${c.fuel}% fuel</span>
                </div>
              </div>
              <button class="adm-btn sm" data-act="complete" data-id="${r.id}">Complete rental</button>
            </article>`;
          })
          .join("")
      : `<p class="adm-empty">No cars are on the road right now.</p>`;
  }

  function renderHubs() {
    $("#hubGrid").innerHTML = HUBS.map((h) => {
      const cars = state.cars.filter((c) => c.hub === h.id);
      const out = cars.filter((c) => c.status === "rented").length;
      const free = cars.filter((c) => c.status === "available").length;
      const occ = Math.min(100, Math.round((cars.length / h.capacity) * 100));
      return `<article class="adm-hub">
        <div class="adm-hub-head">
          <i class="fa-solid fa-location-dot"></i>
          <div><strong>${esc(h.name)}</strong><small>${esc(h.city)} Â· ${esc(h.hours)}</small></div>
        </div>
        <div class="occ"><span style="width:${occ}%"></span></div>
        <div class="meta">
          <span>${cars.length} of ${h.capacity} bays used</span>
          <span>${free} available Â· ${out} out</span>
        </div>
      </article>`;
    }).join("");
  }

  function renderCustomers() {
    $("#custBody").innerHTML = CUSTOMERS.map((c) => {
      const trips = state.reservations.filter((r) => r.customer === c.name && r.status !== "cancelled").length;
      const live = state.reservations.some((r) => r.customer === c.name && r.status === "active");
      const current = live ? pill("active") : `<span class="adm-muted">None</span>`;
      return `<tr>
        <td><b>${esc(c.name)}</b></td>
        <td>${esc(c.email)}</td>
        <td>${esc(c.city)}</td>
        <td><span class="adm-pill p-tier">${esc(c.tier)}</span></td>
        <td>${trips}</td>
        <td>${current}</td>
      </tr>`;
    }).join("");
  }

  function renderPayments() {
    const sum = (kind) =>
      state.reservations.filter((r) => paymentOf(r) === kind).reduce((s, r) => s + amountOf(r), 0);
    $("#payPaid").textContent = money(sum("Paid"));
    $("#payUnpaid").textContent = money(sum("Unpaid"));
    $("#payRefund").textContent = money(sum("Refunded"));

    $("#payBody").innerHTML = state.reservations
      .map((r) => {
        const p = paymentOf(r);
        return `<tr>
          <td>INV-${esc(r.id.replace("RR-", ""))}</td>
          <td>${esc(r.customer)}</td>
          <td>${esc(carOf(r.car).name)}</td>
          <td>${fmtDate(r.start)}</td>
          <td>${money(amountOf(r))}</td>
          <td><span class="adm-pill p-${p.toLowerCase()}">${p}</span></td>
        </tr>`;
      })
      .join("");
  }

  function renderPlans() {
    $("#planGrid").innerHTML = PLANS.map(
      (p) => `<article class="adm-plan">
        <h2>${esc(p.name)}</h2>
        <div class="price">${esc(p.price)}</div>
        <p>${esc(p.desc)}</p>
        <ul>${p.perks.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </article>`
    ).join("");
  }

  function renderReviews() {
    $("#reviewList").innerHTML = REVIEWS.map(
      (r) => `<article class="adm-review">
        <div class="stars">${"<i class=\"fa-solid fa-star\"></i>".repeat(r.stars)}</div>
        <p>&ldquo;${esc(r.text)}&rdquo;</p>
        <small><b>${esc(r.name)}</b> Â· ${esc(r.car)}</small>
      </article>`
    ).join("");
  }

  function renderSupport() {
    $("#tickBody").innerHTML = state.tickets
      .map((t) => {
        const action =
          t.status === "open"
            ? `<button class="adm-btn sm" data-act="resolve" data-id="${t.id}">Resolve</button>`
            : `<span class="adm-muted">Closed</span>`;
        return `<tr>
          <td><b>${esc(t.id)}</b></td>
          <td>${esc(t.subject)}</td>
          <td>${esc(t.client)}</td>
          <td>${esc(t.priority)}</td>
          <td><span class="adm-pill p-${t.status}">${t.status === "open" ? "Open" : "Resolved"}</span></td>
          <td>${action}</td>
        </tr>`;
      })
      .join("");
  }

  function renderAll() {
    renderStats();
    renderCharts();
    renderUpcoming();
    renderReservations();
    renderFleet();
    renderLive();
    renderHubs();
    renderCustomers();
    renderPayments();
    renderSupport();
  }

  /* =====================================================
     ACTIONS
     ===================================================== */
  function handle(act, id) {
    if (act === "resolve") {
      const t = state.tickets.find((x) => x.id === id);
      if (t) t.status = "resolved";
      toast("Ticket resolved", `${id} has been closed.`);
    } else if (act === "car") {
      const c = carOf(id);
      if (!c || c.status === "rented") return;
      c.status = c.status === "maintenance" ? "available" : "maintenance";
      toast("Fleet updated", `${c.name} is now ${STATUS_LABEL[c.status].toLowerCase()}.`);
    } else {
      const r = state.reservations.find((x) => x.id === id);
      if (!r) return;
      const car = carOf(r.car);

      if (act === "confirm") {
        r.status = "confirmed";
        toast("Reservation confirmed", `${r.id} for ${r.customer}.`);
      }
      if (act === "start") {
        r.status = "active";
        car.status = "rented";
        toast("Rental started", `${car.name} is on the road.`);
      }
      if (act === "complete") {
        r.status = "completed";
        car.status = "available";
        car.fuel = Math.max(35, car.fuel - 30);
        toast("Rental completed", `${r.id} is closed and the car is back in the fleet.`);
      }
      if (act === "cancel") {
        if (!window.confirm(`Cancel reservation ${r.id}?`)) return;
        r.status = "cancelled";
        if (car.status === "rented") car.status = "available";
        toast("Reservation cancelled", "The refund is recorded under Payments.");
      }
    }
    save();
    renderAll();
  }

  /* =====================================================
     NAVIGATION
     ===================================================== */
  const sidebar = $("#sidebar");
  const backdrop = $("#backdrop");

  function openSidebar() {
    sidebar.classList.add("open");
    backdrop.classList.add("open");
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("open");
  }

  function showSection(name) {
    if (!SECTIONS[name]) return;
    $$(".adm-link").forEach((b) => b.classList.toggle("active", b.dataset.section === name));
    $$(".adm-panel").forEach((p) => p.classList.toggle("active", p.id === "sec-" + name));
    $("#pageTitle").textContent = SECTIONS[name][0];
    $("#pageSub").textContent = SECTIONS[name][1];
    try {
      history.replaceState(null, "", "#" + name);
    } catch (e) {}
    closeSidebar();
  }

  $("#menuBtn").addEventListener("click", () => {
    if (sidebar.classList.contains("open")) closeSidebar();
    else openSidebar();
  });
  backdrop.addEventListener("click", closeSidebar);

  document.addEventListener("click", (e) => {
    const link = e.target.closest(".adm-link");
    if (link) return showSection(link.dataset.section);

    const go = e.target.closest("[data-go]");
    if (go) return showSection(go.dataset.go);

    const act = e.target.closest("[data-act]");
    if (act) return handle(act.dataset.act, act.dataset.id);
  });

  /* Global search: jumps to Reservations and filters the list */
  $("#globalSearch").addEventListener("input", () => {
    if ($("#globalSearch").value.trim() && !$("#sec-reservations").classList.contains("active")) {
      showSection("reservations");
    }
    renderReservations();
  });
  $("#resFilter").addEventListener("change", renderReservations);

  /* =====================================================
     TOAST
     ===================================================== */
  function toast(title, text) {
    const el = document.createElement("div");
    el.className = "adm-toast-item";
    el.innerHTML = `<strong>${esc(title)}</strong><small>${esc(text)}</small>`;
    $("#toastHost").appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 350);
    }, 3200);
  }

  /* =====================================================
     THEME AND DIRECTION (shared keys with the website)
     ===================================================== */
  function setDir(d) {
    html.setAttribute("dir", d);
    $("#dirToggle").textContent = d === "rtl" ? "LTR" : "RTL";
    try {
      localStorage.setItem("rnd-dir", d);
    } catch (e) {}
  }

  let savedTheme = null;
  let savedDir = null;
  try {
    savedTheme = localStorage.getItem("rnd-theme");
    savedDir = localStorage.getItem("rnd-dir");
  } catch (e) {}
  if (!savedTheme && window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) {
    savedTheme = "dark";
  }
  html.setAttribute("data-theme", savedTheme === "dark" ? "dark" : "light");
  setDir(savedDir === "rtl" ? "rtl" : "ltr");

  $("#themeToggle").addEventListener("click", () => {
    const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try {
      localStorage.setItem("rnd-theme", next);
    } catch (e) {}
  });

  $("#dirToggle").addEventListener("click", () => {
    setDir(html.getAttribute("dir") === "rtl" ? "ltr" : "rtl");
  });

  /* =====================================================
     START
     ===================================================== */
  renderAll();
  renderPlans();
  renderReviews();
  showSection(SECTIONS[location.hash.slice(1)] ? location.hash.slice(1) : "dashboard");
})();

/* =====================================================
   ACCOUNT MENU AND PROFILE POPUP
   ===================================================== */
(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const html = document.documentElement;
  const wrap = $("#userWrap");
  const avatar = $("#avatarBtn");
  const menu = $("#userMenu");
  const modal = $("#profileModal");
  const PROFILE_KEY = "rnd-admin-profile";

  if (!wrap || !avatar || !menu || !modal) return;

  let profile = { name: "Rhea Admin", email: "admin@rentndrive.com", role: "Operations Manager" };
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (saved) profile = saved;
  } catch (e) {}

  const initials = (name) =>
    name.split(/\s+/).filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  function paintProfile() {
    $("#menuName").textContent = profile.name;
    $("#menuEmail").textContent = profile.email;
    avatar.textContent = initials(profile.name);
    $("#pfName").value = profile.name;
    $("#pfEmail").value = profile.email;
    $("#pfRole").value = profile.role;
  }
  paintProfile();

  /* ---------- Dropdown ---------- */
  function openMenu() {
    menu.hidden = false;
    avatar.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    menu.hidden = true;
    avatar.setAttribute("aria-expanded", "false");
  }

  /* ---------- Popup ---------- */
  function openModal(mode) {
    $("#profileForm").hidden = mode !== "profile";
    $("#settingsBlock").hidden = mode !== "settings";
    $("#modalTitle").textContent = mode === "profile" ? "Profile" : "Settings";
    $("#setTheme").value = html.getAttribute("data-theme") === "dark" ? "dark" : "light";
    $("#setDir").value = html.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  avatar.addEventListener("click", (e) => {
    e.stopPropagation();
    if (menu.hidden) openMenu();
    else closeMenu();
  });

  document.addEventListener("click", (e) => {
    const item = e.target.closest("[data-menu]");
    if (item) {
      closeMenu();
      openModal(item.dataset.menu);
      return;
    }
    if (e.target.closest("[data-close]")) {
      closeModal();
      return;
    }
    if (!wrap.contains(e.target)) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      closeModal();
    }
  });

  /* ---------- Save profile ---------- */
  $("#profileForm").addEventListener("submit", (e) => {
    e.preventDefault();
    profile.name = $("#pfName").value.trim() || profile.name;
    profile.email = $("#pfEmail").value.trim() || profile.email;
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (err) {}
    paintProfile();
    closeModal();
  });

  /* ---------- Settings (same keys as the top-bar buttons) ---------- */
  $("#setTheme").addEventListener("change", (e) => {
    html.setAttribute("data-theme", e.target.value);
    try {
      localStorage.setItem("rnd-theme", e.target.value);
    } catch (err) {}
  });
  $("#setDir").addEventListener("change", (e) => {
    html.setAttribute("dir", e.target.value);
    $("#dirToggle").textContent = e.target.value === "rtl" ? "LTR" : "RTL";
    try {
      localStorage.setItem("rnd-dir", e.target.value);
    } catch (err) {}
  });
})();
