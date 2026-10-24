/* ==========================================================================
   How It Works page behaviour: FAQ accordion.
   Functions only. Content and open/closed defaults come from the HTML.
   ========================================================================== */
(function () {
  "use strict";

  function setItemOpen(item, open) {
    const button = item.querySelector(".faq-toggle");
    const panel = item.querySelector(".faq-content");
    if (!button || !panel) return;

    item.classList.toggle("open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    panel.hidden = !open;
  }

  function closeAll(except) {
    document.querySelectorAll(".faq-item").forEach(item => {
      if (item !== except) setItemOpen(item, false);
    });
  }

  function toggleItem(item) {
    const shouldOpen = !item.classList.contains("open");
    closeAll(item);
    setItemOpen(item, shouldOpen);
  }

  function bindFaq() {
    document.addEventListener("click", e => {
      const button = e.target.closest(".faq-toggle");
      if (!button) return;
      toggleItem(button.closest(".faq-item"));
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-item").forEach(item => {
      setItemOpen(item, item.classList.contains("open"));
    });
  }

  /* ---------- Animated Stats Counter ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const useComma = el.dataset.format === "comma";
    const duration = 1800;
    const startTime = performance.now();

    function formatNumber(num) {
      if (decimals > 0) {
        return num.toFixed(decimals);
      }
      const rounded = Math.round(num);
      return useComma ? rounded.toLocaleString("en-US") : rounded.toString();
    }

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out cubic curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = target * easeOut;

      el.textContent = formatNumber(current) + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  function initStatsObserver() {
    const statSection = document.querySelector(".hiw-stats");
    const countElements = document.querySelectorAll(".hiw-stat strong[data-count]");
    if (!statSection || !countElements.length) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            countElements.forEach(el => animateCounter(el));
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      observer.observe(statSection);
    } else {
      // Fallback if IntersectionObserver is unsupported
      countElements.forEach(el => animateCounter(el));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFaq();
    bindFaq();
    initStatsObserver();
  });
})();
