

(function () {
  "use strict";

  const root = document.documentElement;
  const store = {
    get(k, fallback) { try { return localStorage.getItem(k) || fallback; } catch (e) { return fallback; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  
  function applyTheme(theme) {
    const t = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", t);
    root.style.colorScheme = t;
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = t === "dark" ? "darkmodetitlelogo.png" : "titlelogo.png";
    }
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const label = t === "dark" ? "Switch to light mode" : "Switch to dark mode";
      btn.setAttribute("aria-label", label);
      btn.title = label;
    }
    store.set("rnd-theme", t);
  }

  function applyDirection(dir) {
    const d = dir === "rtl" ? "rtl" : "ltr";
    root.setAttribute("dir", d);
    const btn = document.getElementById("dirToggle");
    if (btn) {
      btn.textContent = d === "rtl" ? "LTR" : "RTL";
      btn.title = d === "rtl" ? "Switch to left-to-right" : "Switch to right-to-left";
      btn.setAttribute("aria-label", btn.title);
    }
    store.set("rnd-dir", d);
  }

  
  applyTheme(store.get("rnd-theme", "light"));
  applyDirection(store.get("rnd-dir", "ltr"));

  
  function getAuthState() {
    try {
      const raw = localStorage.getItem("royalfleet_state_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.currentUser && parsed.isLoggedIn) {
          return { isLoggedIn: true, user: parsed.currentUser };
        }
      }
    } catch (e) {
      console.error("Error reading auth state:", e);
    }
    return { isLoggedIn: false, user: null };
  }

  function handleLogout() {
    try {
      const raw = localStorage.getItem("royalfleet_state_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        parsed.isLoggedIn = false;
        parsed.currentUser = null;
        localStorage.setItem("royalfleet_state_v1", JSON.stringify(parsed));
      }
    } catch (e) {
      console.error("Error logging out:", e);
    }
    syncHeaderAuth();
    if (window.location.pathname.endsWith("dashboard.html")) {
      window.location.href = "login.html";
    } else {
      window.location.reload();
    }
  }

  function syncHeaderAuth() {
    const auth = getAuthState();
    const actionsContainers = document.querySelectorAll(".site-header .actions");
    if (!actionsContainers.length) return;

    actionsContainers.forEach(actions => {
      
      let wrapper = actions.querySelector(".profile-dropdown-wrapper");
      let loginBtn = actions.querySelector(".login-btn:not(.header-profile-btn)");

      if (auth.isLoggedIn && auth.user) {
        const fullName = auth.user.name || "Customer";
        const email = auth.user.email || "customer@royalfleet.com";
        const firstName = fullName.trim().split(" ")[0] || fullName;
        const initial = (fullName.trim()[0] || "U").toUpperCase();

        if (!wrapper) {
          
          const existingBtn = actions.querySelector(".login-btn");
          if (existingBtn) existingBtn.remove();

          wrapper = document.createElement("div");
          wrapper.className = "profile-dropdown-wrapper";
          
          
          const menuToggle = actions.querySelector("#menuToggle");
          if (menuToggle) {
            actions.insertBefore(wrapper, menuToggle);
          } else {
            actions.appendChild(wrapper);
          }
        }

        wrapper.innerHTML = `
          <button type="button" class="btn btn-primary login-btn header-profile-btn" id="headerProfileTrigger" aria-expanded="false" aria-haspopup="true" title="Account: ${fullName}">
            <i class="fa-solid fa-circle-user"></i>
            <span>${firstName}</span>
            <i class="fa-solid fa-chevron-down profile-chevron"></i>
          </button>
          <div class="profile-dropdown-menu" id="headerProfileMenu" role="menu">
            <div class="profile-dropdown-header">
              <div class="profile-dropdown-avatar">${initial}</div>
              <div class="profile-dropdown-user-details">
                <span class="profile-dropdown-name" title="${fullName}">${fullName}</span>
                <span class="profile-dropdown-email" title="${email}">${email}</span>
              </div>
            </div>
            <div class="profile-dropdown-items">
              <a href="dashboard.html" class="profile-dropdown-item" role="menuitem">
                <i class="fa-solid fa-gauge-high"></i>
                <span>Dashboard Overview</span>
              </a>
              <a href="dashboard.html#profile" class="profile-dropdown-item" role="menuitem">
                <i class="fa-solid fa-user-gear"></i>
                <span>Profile Settings</span>
              </a>
              <button type="button" class="profile-dropdown-item profile-item-logout" id="headerLogoutBtn" role="menuitem">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        `;

        const trigger = wrapper.querySelector("#headerProfileTrigger");
        const menu = wrapper.querySelector("#headerProfileMenu");
        const logoutBtn = wrapper.querySelector("#headerLogoutBtn");

        if (trigger && menu) {
          trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = menu.classList.toggle("show");
            trigger.setAttribute("aria-expanded", String(isOpen));
          });
        }

        if (logoutBtn) {
          logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            handleLogout();
          });
        }
      } else {
        
        if (wrapper) wrapper.remove();

        let currentBtn = actions.querySelector(".login-btn");
        if (!currentBtn) {
          const newBtn = document.createElement("a");
          newBtn.href = "login.html";
          newBtn.className = "btn btn-primary login-btn";
          newBtn.innerHTML = `<i class="fa-regular fa-user"></i><span>Login</span>`;
          const menuToggle = actions.querySelector("#menuToggle");
          if (menuToggle) {
            actions.insertBefore(newBtn, menuToggle);
          } else {
            actions.appendChild(newBtn);
          }
        } else {
          currentBtn.className = "btn btn-primary login-btn";
          currentBtn.href = "login.html";
          currentBtn.innerHTML = `<i class="fa-regular fa-user"></i><span>Login</span>`;
          currentBtn.removeAttribute("aria-expanded");
          currentBtn.removeAttribute("aria-haspopup");
        }
      }
    });
  }

  
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".profile-dropdown-wrapper")) {
      document.querySelectorAll(".profile-dropdown-menu.show").forEach(menu => {
        menu.classList.remove("show");
        const trigger = menu.parentElement.querySelector("#headerProfileTrigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });

  
  syncHeaderAuth();
  window.rndSyncHeaderAuth = syncHeaderAuth;
  window.rndGetAuthState = getAuthState;
  window.rndLogout = handleLogout;

  function initSiteControls() {
    syncHeaderAuth();
    
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }

    const dirBtn = document.getElementById("dirToggle");
    if (dirBtn) {
      dirBtn.addEventListener("click", () => {
        applyDirection(root.getAttribute("dir") === "rtl" ? "ltr" : "rtl");
      });
    }

    
    const header = document.getElementById("siteHeader");
    const nav = document.getElementById("mainNav");
    const menuBtn = document.getElementById("menuToggle");
    const backToTop = document.getElementById("backToTop");

    if (menuBtn && nav) {
      const toggleMenu = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        const icon = menuBtn.querySelector("i");
        if (icon) icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
      };

      menuBtn.addEventListener("click", toggleMenu);

      
      menuBtn.addEventListener("touchstart", (e) => {
        toggleMenu(e);
      }, { passive: false });

      
      nav.querySelectorAll(".nav-dropdown-toggle").forEach(toggle => {
        toggle.addEventListener("click", (e) => {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            const parent = toggle.closest(".nav-dropdown");
            if (parent) parent.classList.toggle("active");
          }
        });
      });

      
      document.addEventListener("click", (e) => {
        if (!e.target.closest("#mainNav") && !e.target.closest("#menuToggle")) {
          if (nav.classList.contains("open")) {
            nav.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            const icon = menuBtn.querySelector("i");
            if (icon) icon.className = "fa-solid fa-bars";
          }
        }
      });

      nav.querySelectorAll("a:not(.nav-dropdown-toggle)").forEach(a => {
        a.addEventListener("click", () => {
          nav.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
          const icon = menuBtn.querySelector("i");
          if (icon) icon.className = "fa-solid fa-bars";
        });
      });
    }

    if (header) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 20);
        if (backToTop) backToTop.classList.toggle("show", window.scrollY > 400);
      }, { passive: true });
    }

    if (backToTop) {
      backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    
    
    
    
    const animStyles = ["anim-rise", "anim-zoom", "anim-slide-left", "anim-flip-up", "anim-slide-right", "anim-shimmer"];
    
    
    const targetSections = document.querySelectorAll("main > section, body > section, .adm-panel, .adm-card, .adm-stat");
    targetSections.forEach((sec, idx) => {
      
      const chosenAnim = animStyles[idx % animStyles.length];
      if (!sec.classList.contains("hero") && !sec.classList.contains("about-hero") && !sec.classList.contains("p-hero") && !sec.classList.contains("fleet-hero") && !sec.classList.contains("contact-hero") && !sec.classList.contains("pricing-hero") && !sec.classList.contains("hiw-hero") && !sec.classList.contains("details-page-banner")) {
        sec.classList.add("reveal", chosenAnim);
      }
      
      
      const innerGrids = sec.querySelectorAll(".grid, .cat-grid, .fleet-cards, .story-grid, .values-grid, .standards-grid, .team-grid, .plans-grid, .protect-grid, .contact-cards-grid, .details-steps-grid, .p-booking-grid, .p-metrics-strip, .p-fleet-grid, .p-exp-grid, .p-vip-grid");
      innerGrids.forEach(g => {
        g.classList.add("stagger-in", "reveal");
      });
    });

    
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

      document.querySelectorAll(".reveal, [data-anim]").forEach(el => io.observe(el));
    } else {
      document.querySelectorAll(".reveal, [data-anim]").forEach(el => el.classList.add("in"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSiteControls);
  } else {
    initSiteControls();
  }

  
  window.rndApplyTheme = applyTheme;
  window.rndApplyDirection = applyDirection;
})();




