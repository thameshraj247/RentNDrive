/* ==========================================================================
   Home 2 - Luxury & Prestige Edition Specific Interactive Behaviour
   Filters, booking simulator, counter animations, interactive tabs
   ========================================================================== */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  document.addEventListener("DOMContentLoaded", () => {
    // 1. Fleet Category Filter Tabs
    const filterTabs = $$(".p-tab-btn");
    const fleetCards = $$(".p-fleet-card");

    filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const cat = tab.dataset.cat;
        filterTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        fleetCards.forEach(card => {
          const cardCat = card.dataset.category;
          if (cat === "all" || cardCat === cat) {
            card.style.display = "flex";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 20);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(16px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 250);
          }
        });
      });
    });

    // 2. VIP Pricing Toggle (Monthly vs Annual / Daily)
    const vipForm = $("#vipBookingForm");
    if (vipForm) {
      vipForm.addEventListener("submit", e => {
        e.preventDefault();
        const city = $("#pCity") ? $("#pCity").value : "Los Angeles";
        const car = $("#pVehicle") ? $("#pVehicle").value : "all";
        window.location.href = `fleet.html?pickup=${encodeURIComponent(city)}&car=${encodeURIComponent(car)}`;
      });
    }

    // 3. Smooth Counter Animations for Metrics
    const metrics = $$(".p-metric strong[data-count]");
    if ("IntersectionObserver" in window) {
      const metricObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const suffix = el.dataset.suffix || "";
            const decimals = parseInt(el.dataset.decimals || "0", 10);
            const duration = 1800;
            const startTime = performance.now();

            const updateCount = currentTime => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = (target * easeOut).toFixed(decimals);
              el.textContent = current + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                el.textContent = target.toFixed(decimals) + suffix;
              }
            };

            requestAnimationFrame(updateCount);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.3 });

      metrics.forEach(m => metricObserver.observe(m));
    } else {
      metrics.forEach(el => {
        el.textContent = el.dataset.count + (el.dataset.suffix || "");
      });
    }

    // 4. Interactive Feature Stack Hover Effects
    $$(".p-feature-row").forEach(row => {
      row.addEventListener("mouseenter", () => {
        const visualImg = $("#showcaseVisualImg");
        const newSrc = row.dataset.img;
        if (visualImg && newSrc) {
          visualImg.style.opacity = "0.7";
          visualImg.src = newSrc;
          setTimeout(() => {
            visualImg.style.opacity = "1";
          }, 150);
        }
      });
    });

    // 5. Ensure background video autoplays smoothly even on low-power mode
    const heroVid = $(".p-hero-video");
    if (heroVid) {
      const playPromise = heroVid.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser requires touch/click gesture
          document.body.addEventListener("click", () => heroVid.play(), { once: true });
          document.body.addEventListener("touchstart", () => heroVid.play(), { once: true });
        });
      }
    }
  });
})();
