
      /* ---------- Data (replace with your own fleet) ---------- */
      const LOCATIONS = [
        { id: "airport", name: "International Airport" },
        { id: "downtown", name: "Downtown Hub" },
        { id: "harbor", name: "Harbor Station" },
        { id: "hotel", name: "Hotel Delivery" }
      ];

      const CARS = [
        { id: 1, name: "Mercedes-Benz S-Class", brand: "Mercedes-Benz", cat: "luxury", seats: 5, trans: "Automatic", bags: 3, price: 189, rating: 4.9, reviews: 312, icon: "fa-car-side", tag: "Most booked", img: "fleet-mercedes-s580.jpg" },
        { id: 2, name: "Porsche Cayenne GTS", brand: "Porsche", cat: "suv", seats: 5, trans: "Automatic", bags: 4, price: 230, rating: 4.8, reviews: 198, icon: "fa-truck-monster", tag: "Top rated", img: "fleet-porsche-cayenne.jpg" },
        { id: 3, name: "Tesla Model S Plaid", brand: "Tesla", cat: "electric", seats: 5, trans: "Automatic", bags: 3, price: 175, rating: 4.9, reviews: 421, icon: "fa-bolt", tag: "EV", img: "fleet-tesla-plaid.jpg" },
        { id: 4, name: "BMW M4 Convertible", brand: "BMW", cat: "convertible", seats: 4, trans: "Automatic", bags: 2, price: 210, rating: 4.7, reviews: 126, icon: "fa-wind", tag: "Open air", img: "fleet-bmw-m4.jpg" },
        { id: 5, name: "Range Rover Sport", brand: "Land Rover", cat: "suv", seats: 5, trans: "Automatic", bags: 4, price: 205, rating: 4.8, reviews: 240, icon: "fa-mountain-sun", tag: "Adventure", img: "fleet-rangerover.jpg" },
        { id: 6, name: "Porsche Taycan 4S", brand: "Porsche", cat: "electric", seats: 4, trans: "Automatic", bags: 2, price: 195, rating: 4.7, reviews: 158, icon: "fa-plug", tag: "Silent", img: "fleet-taycan.jpg" },
        { id: 7, name: "Cadillac Escalade V", brand: "Cadillac", cat: "suv", seats: 7, trans: "Automatic", bags: 5, price: 245, rating: 4.9, reviews: 184, icon: "fa-truck-monster", tag: "VIP Executive", img: "fleet-escalade.jpg" },
        { id: 8, name: "Mercedes EQS Sedan", brand: "Mercedes-Benz", cat: "electric", seats: 5, trans: "Automatic", bags: 3, price: 220, rating: 4.8, reviews: 142, icon: "fa-bolt", tag: "Luxury EV", img: "fleet-mercedes-eqs.jpg" }
      ];

      const $ = (sel, root = document) => root.querySelector(sel);
      const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

      /* ---------- Search form ---------- */
      $("#pickup").innerHTML = LOCATIONS.map(l => `<option value="${l.id}">${l.name}</option>`).join("");

      const today = new Date();
      const fmt = d => d.toISOString().slice(0, 10);
      const tomorrow = new Date(today.getTime() + 864e5);
      const after = new Date(today.getTime() + 5 * 864e5);
      $("#pDate").value = fmt(tomorrow);
      $("#rDate").value = fmt(after);
      $("#pDate").min = fmt(today);

      $("#searchForm").addEventListener("submit", e => {
        e.preventDefault();
        const params = new URLSearchParams({
          category: $("#category").value,
          pickup: $("#pickup").value,
          pDate: $("#pDate").value,
          rDate: $("#rDate").value
        });
        // Point this at your real fleet page
        window.location.href = `fleet.html?${params}`;
      });

      /* ---------- Fleet rendering & filtering ---------- */
      function renderCars(filter = "all") {
        const list = CARS.filter(c => filter === "all" || c.cat === filter);
        $("#fleetGrid").innerHTML = list.map(car => `
          <article class="car reveal in">
            <div class="car-media">
              ${car.tag ? `<span class="car-tag">${car.tag}</span>` : ""}
              <img src="${car.img}" alt="${car.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <i class="fa-solid ${car.icon}" style="display:none;"></i>
            </div>
            <div class="car-body">
              <div class="car-meta">
                <span>${car.brand}</span>
                <span><i class="fa-solid fa-star"></i> ${car.rating} (${car.reviews})</span>
              </div>
              <h3>${car.name}</h3>
              <div class="specs">
                <span><i class="fa-solid fa-user-group"></i>${car.seats} seats</span>
                <span><i class="fa-solid fa-gears"></i>${car.trans}</span>
                <span><i class="fa-solid fa-suitcase-rolling"></i>${car.bags} bags</span>
                <span><i class="fa-solid fa-shield-halved"></i>Insured</span>
              </div>
            </div>
            <div class="car-foot">
              <div class="price"><small>Daily rate</small><strong>$${car.price}<span> /day</span></strong></div>
              <a href="fleet.html?car=${car.id}" class="btn btn-primary">Book <i class="fa-solid fa-arrow-right flip"></i></a>
            </div>
          </article>
        `).join("");
      }

      $("#chips").addEventListener("click", e => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        $$(".chip").forEach(c => c.classList.toggle("active", c === chip));
        renderCars(chip.dataset.filter);
      });

      $$(".cat").forEach(card => card.addEventListener("click", () => {
        const cat = card.dataset.category;
        const chip = $(`.chip[data-filter="${cat}"]`);
        if (chip) chip.click();
        $("#fleet").scrollIntoView({ behavior: "smooth" });
      }));

      renderCars();

      /* ---------- Animated counters ---------- */
      function animateCount(el) {
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const dur = 1600;
        const step = now => {
          const p = Math.min((now - start) / dur, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          el.textContent = (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }

      /* ---------- Reveal on scroll & counters ---------- */
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          $$("[data-count]", entry.target).forEach(animateCount);
          if (entry.target.matches("[data-count]")) animateCount(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.15 });

      $$(".reveal").forEach(el => io.observe(el));
      $$(".stats").forEach(el => io.observe(el));
      $$(".stats").forEach(el => el.classList.add("reveal"));
    