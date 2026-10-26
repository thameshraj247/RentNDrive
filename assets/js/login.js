// Royal Fleet Car Rental - Login & Register Controller

document.addEventListener("DOMContentLoaded", () => {
  initAuthTabs();
  initAuthForms();
  initDemoLogin();
  initPasswordToggles();
});

function initPasswordToggles() {
  document.querySelectorAll(".toggle-password-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";

      const icon = btn.querySelector("i");
      if (icon) {
        if (isPassword) {
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    });
  });
}

function initAuthTabs() {
  const signinTab = document.getElementById("auth-tab-signin");
  const registerTab = document.getElementById("auth-tab-register");
  const signinForm = document.getElementById("auth-signin-form");
  const registerForm = document.getElementById("auth-register-form");

  if (!signinTab || !registerTab) return;

  signinTab.addEventListener("click", () => {
    signinTab.classList.add("active");
    registerTab.classList.remove("active");
    signinForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
  });

  registerTab.addEventListener("click", () => {
    registerTab.classList.add("active");
    signinTab.classList.remove("active");
    registerForm.classList.remove("hidden");
    signinForm.classList.add("hidden");
  });

  const switchToRegister = document.getElementById("switch-to-register");
  if (switchToRegister) {
    switchToRegister.addEventListener("click", () => {
      registerTab.click();
    });
  }

  const switchToSignin = document.getElementById("switch-to-signin");
  if (switchToSignin) {
    switchToSignin.addEventListener("click", () => {
      signinTab.click();
    });
  }
}

function initAuthForms() {
  const signinForm = document.getElementById("auth-signin-form");
  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      try {
        const usernameInput = document.getElementById("signin-username");
        const username = usernameInput ? usernameInput.value.trim() : "";
        const emailInput = document.getElementById("signin-email");
        const email = emailInput ? emailInput.value.trim() : "";
        const passInput = document.getElementById("signin-password");
        const pass = passInput ? passInput.value : "";

        if (typeof store !== "undefined" && typeof store.login === "function") {
          store.login(email, pass, username);
        } else {
          // Direct fallback to localStorage in case store object is unavailable
          const displayName = username || (email ? email.split("@")[0] : "Valued Customer");
          const stateData = {
            isLoggedIn: true,
            currentUser: {
              id: "user-" + Date.now().toString(36),
              name: displayName,
              email: email,
              phone: "+1 (555) 019-2831",
              avatar: "dash-user-alex.jpg",
              tier: "Silver Explorer",
              licenseNumber: "DL-62849102-CA"
            }
          };
          localStorage.setItem("royalfleet_state_v1", JSON.stringify(stateData));
        }

        const loggedName = (typeof store !== "undefined" && store.state && store.state.currentUser)
          ? store.state.currentUser.name
          : (username || "Valued Customer");

        if (typeof showToast === "function") {
          showToast(`Welcome back, ${loggedName}!`, "success");
        }

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 300);
      } catch (err) {
        console.error("Login submission error:", err);
        window.location.href = "dashboard.html";
      }
    });
  }

  // Social Login Mock Handlers (Google & Apple)
  const googleBtn = document.getElementById("google-login-btn");
  if (googleBtn) {
    googleBtn.addEventListener("click", () => {
      try {
        const usernameInput = document.getElementById("signin-username");
        const customName = usernameInput && usernameInput.value.trim() ? usernameInput.value.trim() : "Alex Morgan";
        if (typeof store !== "undefined" && typeof store.login === "function") {
          store.login("alex.morgan@royalrentals.com", "demopass123", customName);
        } else {
          localStorage.setItem("royalfleet_state_v1", JSON.stringify({
            isLoggedIn: true,
            currentUser: {
              id: "user-101",
              name: customName,
              email: "alex.morgan@royalrentals.com",
              avatar: "dash-user-alex.jpg",
              tier: "Gold VIP Traveler"
            }
          }));
        }
        if (typeof showToast === "function") {
          showToast(`Signed in successfully as ${customName}!`, "success");
        }
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 300);
      } catch (err) {
        window.location.href = "dashboard.html";
      }
    });
  }

  const appleBtn = document.getElementById("apple-login-btn");
  if (appleBtn) {
    appleBtn.addEventListener("click", () => {
      try {
        const usernameInput = document.getElementById("signin-username");
        const customName = usernameInput && usernameInput.value.trim() ? usernameInput.value.trim() : "Alex Morgan";
        if (typeof store !== "undefined" && typeof store.login === "function") {
          store.login("alex.morgan@royalrentals.com", "demopass123", customName);
        } else {
          localStorage.setItem("royalfleet_state_v1", JSON.stringify({
            isLoggedIn: true,
            currentUser: {
              id: "user-101",
              name: customName,
              email: "alex.morgan@royalrentals.com",
              avatar: "dash-user-alex.jpg",
              tier: "Gold VIP Traveler"
            }
          }));
        }
        if (typeof showToast === "function") {
          showToast(`Signed in successfully as ${customName}!`, "success");
        }
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 300);
      } catch (err) {
        window.location.href = "dashboard.html";
      }
    });
  }

  const registerForm = document.getElementById("auth-register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("reg-name").value;
      const email = document.getElementById("reg-email").value;
      const phone = document.getElementById("reg-phone").value;
      const license = document.getElementById("reg-license").value;
      store.register({ name, email, phone, licenseNumber: license });
      showToast("Account created with 1,000 welcome points!", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);
    });
  }

  const forgotLink = document.getElementById("signin-forgot-pwd");
  if (forgotLink) {
    forgotLink.addEventListener("click", () => {
      showToast("Password reset instructions sent to registered email", "info");
    });
  }

  // Social Signup Handlers (Google & Apple) on Register Form
  const googleRegBtn = document.getElementById("google-register-btn");
  if (googleRegBtn) {
    googleRegBtn.addEventListener("click", () => {
      store.register({ name: "Alex Morgan", email: "alex.morgan@royalrentals.com", phone: "+1 (555) 019-2834", licenseNumber: "DL-98421039-CA" });
      showToast("Connecting via Google Account...", "info");
      setTimeout(() => {
        showToast("Account created via Google! Welcome to VIP tier.", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 600);
      }, 600);
    });
  }

  const appleRegBtn = document.getElementById("apple-register-btn");
  if (appleRegBtn) {
    appleRegBtn.addEventListener("click", () => {
      store.register({ name: "Alex Morgan", email: "alex.morgan@royalrentals.com", phone: "+1 (555) 019-2834", licenseNumber: "DL-98421039-CA" });
      showToast("Verifying Apple ID Sign Up...", "info");
      setTimeout(() => {
        showToast("Account created via Apple! Welcome to VIP tier.", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 600);
      }, 600);
    });
  }
}

function initDemoLogin() {
  const demoBtn = document.getElementById("demo-quick-login-btn");
  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      store.resetToDefaults();
      store.login("alex.morgan@royalrentals.com", "password123", "Alex Morgan");
      showToast("Signed in as Demo VIP Alex Morgan", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 600);
    });
  }
}

