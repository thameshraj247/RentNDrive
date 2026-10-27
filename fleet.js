
(function () {
  "use strict";

  const DEFAULT_MAX_PRICE = 350;

  const state = {
    category: "all",
    search: "",
    transmission: "all",
    fuel: "all",
    maxPrice: DEFAULT_MAX_PRICE,
    sort: "recommended"
  };

  const $ = (sel, scope = document) => scope.querySelector(sel);
  const $$ = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

  
  function getElements() {
    return {
      grid: $("#fleetGrid"),
      count: $("#resultCount"),
      word: $("#resultWord"),
      empty: $("#fleetEmpty"),
      search: $("#fleetSearch"),
      transmission: $("#fleetTransmission"),
      fuel: $("#fleetFuel"),
      sort: $("#fleetSort"),
      price: $("#fleetPrice"),
      priceLabel: $("#fleetPriceLabel"),
      tabs: $$(".fleet-cat-btn"),
      quickView: $("#quickView")
    };
  }

  const el = getElements();

  
  function getCards() {
    return $$(".car-card", el.grid);
  }

  function searchableText(card) {
    const d = card.dataset;
    return [d.name, d.brand, d.badge, d.tag, d.gearbox, d.fuel].join(" ").toLowerCase();
  }

  function matchesFilters(card) {
    const d = card.dataset;
    if (state.category !== "all" && d.category !== state.category) return false;
    if (state.transmission !== "all" && d.transmission !== state.transmission) return false;
    if (state.fuel !== "all" && d.fuel !== state.fuel) return false;
    if (Number(d.price) > state.maxPrice) return false;
    if (state.search && !searchableText(card).includes(state.search)) return false;
    return true;
  }

  
  function applyFilters() {
    let visible = 0;
    getCards().forEach(card => {
      const show = matchesFilters(card);
      card.hidden = !show;
      if (show) visible++;
    });

    if (el.count) el.count.textContent = visible;
    if (el.word) el.word.textContent = visible === 1 ? "vehicle" : "vehicles";
    if (el.empty) el.empty.hidden = visible > 0;
    if (el.grid) el.grid.hidden = visible === 0;
  }

  function sortCards() {
    const comparers = {
      "recommended": (a, b) => Number(a.dataset.id) - Number(b.dataset.id),
      "price-low": (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
      "price-high": (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
      "rating": (a, b) => Number(b.dataset.rating) - Number(a.dataset.rating)
    };
    const compare = comparers[state.sort] || comparers.recommended;

    getCards()
      .sort(compare)
      .forEach(card => el.grid.appendChild(card));
  }

  function setActiveTab() {
    el.tabs.forEach(tab => {
      tab.classList.toggle("active", tab.dataset.cat === state.category);
    });
  }

  function setPriceLabel() {
    if (el.priceLabel) el.priceLabel.textContent = `$${state.maxPrice}/day`;
  }

  function refresh() {
    sortCards();
    applyFilters();
  }

  
  function setCategory(cat) {
    state.category = cat;
    setActiveTab();
    applyFilters();
  }

  function resetFilters() {
    Object.assign(state, {
      category: "all",
      search: "",
      transmission: "all",
      fuel: "all",
      maxPrice: DEFAULT_MAX_PRICE,
      sort: "recommended"
    });

    if (el.search) el.search.value = "";
    if (el.transmission) el.transmission.value = "all";
    if (el.fuel) el.fuel.value = "all";
    if (el.sort) el.sort.value = "recommended";
    if (el.price) el.price.value = DEFAULT_MAX_PRICE;

    setPriceLabel();
    setActiveTab();
    refresh();
  }

  
  function setText(id, value) {
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function openQuickView(card) {
    if (!el.quickView) return;
    const d = card.dataset;

    setText("qvBrand", d.brand);
    setText("qvName", d.name);
    setText("qvSeats", `${d.seats} seats`);
    setText("qvGearbox", d.gearbox);
    setText("qvEconomy", d.economy);
    setText("qvBags", `${d.bags} bags`);
    setText("qvRating", `${d.rating} (${d.reviews} reviews)`);
    setText("qvFuel", d.fuel);
    setText("qvPrice", `$${d.price}`);

    const book = document.getElementById("qvBook");
    if (book) book.href = `login.html?car=${d.id}`;

    el.quickView.classList.add("open");
    el.quickView.setAttribute("aria-hidden", "false");
  }

  function closeQuickView() {
    if (!el.quickView) return;
    el.quickView.classList.remove("open");
    el.quickView.setAttribute("aria-hidden", "true");
  }

  
  function bindControls() {
    if (el.search) {
      el.search.addEventListener("input", () => {
        state.search = el.search.value.trim().toLowerCase();
        applyFilters();
      });
    }

    if (el.transmission) {
      el.transmission.addEventListener("change", () => {
        state.transmission = el.transmission.value;
        applyFilters();
      });
    }

    if (el.fuel) {
      el.fuel.addEventListener("change", () => {
        state.fuel = el.fuel.value;
        applyFilters();
      });
    }

    if (el.sort) {
      el.sort.addEventListener("change", () => {
        state.sort = el.sort.value;
        sortCards();
      });
    }

    if (el.price) {
      el.price.addEventListener("input", () => {
        state.maxPrice = Number(el.price.value);
        setPriceLabel();
        applyFilters();
      });
    }
  }

  function bindDelegatedClicks() {
    document.addEventListener("click", e => {
      const tab = e.target.closest(".fleet-cat-btn");
      if (tab) {
        setCategory(tab.dataset.cat);
        return;
      }

      const quickBtn = e.target.closest(".quick-view-btn");
      if (quickBtn) {
        openQuickView(quickBtn.closest(".car-card"));
        return;
      }

      if (e.target.closest("#qvClose") || e.target === el.quickView) {
        closeQuickView();
        return;
      }

      if (e.target.closest("#fleetReset") || e.target.closest("#fleetEmptyReset")) {
        resetFilters();
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeQuickView();
    });
  }

  function applyUrlCategory() {
    const cat = new URLSearchParams(window.location.search).get("category");
    if (cat) state.category = cat;
  }

  
  function init() {
    if (!el.grid) return;
    applyUrlCategory();
    setActiveTab();
    bindControls();
    bindDelegatedClicks();
    refresh();
  }

  document.addEventListener("DOMContentLoaded", init);
})();