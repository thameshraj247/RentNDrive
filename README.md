# 👑 Royal Fleet — Luxury Car Rental & Travel Experience

A modern, travel-friendly, responsive car rental website built with **separate HTML, CSS, and JavaScript files for every page**. Designed with the client's requested **Royal Blue** (`#1e3a8a` / `#1d4ed8` / `#172554`) and **Light Cream** (`#fdfbf7` / `#faf6ec` / `#e8dbbf`) color combination.

---

## ⚡ Multi-Page Architecture (Dedicated HTML, CSS, and JS)

Each page in the project has its own dedicated `.html`, `.css`, and `.js` file, backed by shared state and theme styles:

| Page | HTML File | Dedicated CSS | Dedicated JS |
| :--- | :--- | :--- | :--- |
| **Home Page** | [`index.html`](index.html) | [`assets/css/home.css`](assets/css/home.css) | [`assets/js/home.js`](assets/js/home.js) |
| **Fleet Page** | [`fleet.html`](fleet.html) | [`assets/css/fleet.css`](assets/css/fleet.css) | [`assets/js/fleet.js`](assets/js/fleet.js) |
| **Pricing & Plans** | [`pricing.html`](pricing.html) | [`assets/css/pricing.css`](assets/css/pricing.css) | [`assets/js/pricing.js`](assets/js/pricing.js) |
| **How It Works** | [`how-it-works.html`](how-it-works.html) | [`assets/css/how-it-works.css`](assets/css/how-it-works.css) | [`assets/js/how-it-works.js`](assets/js/how-it-works.js) |
| **Login Portal** | [`login.html`](login.html) | [`assets/css/login.css`](assets/css/login.css) | [`assets/js/login.js`](assets/js/login.js) |
| **Customer Dashboard** | [`dashboard.html`](dashboard.html) | [`assets/css/dashboard.css`](assets/css/dashboard.css) | [`assets/js/dashboard.js`](assets/js/dashboard.js) |

### Shared Modules:
- **`assets/css/common.css`**: Shared design variables, royal blue and cream palette, typography, navbar, footer, buttons, and modal dialogs.
- **`assets/js/data.js`**: Shared mock database containing 12 luxury vehicles, categories, locations, insurance tiers, add-ons, FAQs, and reviews.
- **`assets/js/store.js`**: Client-side reactive state manager with **LocalStorage persistence** so bookings, cancellations, extensions, and billing persist across all pages.
- **`assets/js/common.js`**: Shared navigation state, mobile menu toggle, toast alerts, universal booking wizard modal, and native HTML5 Canvas confetti.

---

## 🎨 Design System & Color Palette

- **Primary Royal Blue**: `#1e3a8a` / `#1d4ed8` / `#172554` (Deep luxury navy & vibrant royal accents)
- **Light Cream Surfaces**: `#fdfbf7` (Alabaster Cream background) / `#faf6ec` (Warm Ivory) / `#e8dbbf` (Champagne border highlights)
- **Accent Accoutrements**: `#d97706` (Amber gold luxury tags) / `#059669` (Emerald verification badges)
- **Typography**: Clean, executive typography using **Plus Jakarta Sans** and **Playfair Display**

---

## ✨ Features by Page

1. **Home Page (`index.html`)**:
   - High-definition landing background image with a smooth 26-second zoom animation (`kenBurnsEffect`).
   - Dual royal blue and translucent cream overlay ensuring razor-sharp contrast.
   - Interactive instant search widget that redirects with parameters to `fleet.html`.
   - Category chips (Luxury, SUV, Electric, Convertible, Compact) with hover scaling & rotation.
   - Live number count-up animation for stats (500+, 45+, 99.8%, 60s).
   - 4 featured vehicle cards with quick specs and booking triggers.

2. **Fleet Page (`fleet.html`)**:
   - Category filter tabs with vehicle count.
   - Search bar with live keyword filtering.
   - Powertrain filter (Electric, Hybrid, Petrol) & Transmission filter (Automatic, EV).
   - Daily rate price slider ($70 to $350+/day) and sorting options.
   - Quick specs modal and instant reservation wizard.

3. **Pricing & Plans (`pricing.html`)**:
   - 3 Rental Plans: Daily Explorer, Weekly Roadtripper (15% off), Monthly Executive Flex (30% off).
   - Comprehensive Protection Matrix: Basic ($1,500), Premium Shield ($250), Royal Elite ($0).
   - **Interactive Live Price Calculator**: Pick a vehicle, days slider (1 to 30), insurance tier, and travel add-ons to see real-time recalculation of itemized rates, duration discounts, and total cost.

4. **How It Works (`how-it-works.html`)**:
   - 4-step rental process with step badges and icons.
   - Renter checklist & policies (age, domestic & international license, deposits, fuel policy).
   - Categorized accordion FAQ with smooth expansion.

5. **Login Portal (`login.html`)**:
   - Split-screen layout with royal blue testimonials on the left and tabbed forms on the right.
   - **1-Click Demo Login button**: *"Login as Alex Morgan (Gold VIP)"* for instant authenticated testing.
   - Registration form with 1,000 bonus welcome loyalty points.

6. **Customer Dashboard (`dashboard.html`)**:
   - Overview: Active rental countdown, digital key launcher, stat metric tiles, recent invoices.
   - Browse & Book: Direct car reservation inside the customer portal.
   - My Rentals: Filter by Active, Upcoming, Completed, and Cancelled trips. Includes Digital Key pass, Trip Extension (+1, +2, +3, +7 days), and free cancellation with 100% refund.
   - Payments & Invoices: Billing history table, **Official Printable PDF Tax Invoice Viewer** (`window.print()`), and payment card management (Add Card, Set Default).
   - Profile Settings: Verified driver records, contact info, notification preferences, and demo reset.

---

## 💻 How to Run

Simply **double-click** [`index.html`](index.html) in your Windows file explorer. Navigate seamlessly between all pages using standard browser links. Zero installation or setup required.
