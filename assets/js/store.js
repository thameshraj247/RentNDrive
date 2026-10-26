// Royal Fleet Car Rental - Application State Store (with LocalStorage persistence)

class AppStore {
  constructor() {
    this.STORAGE_KEY = "royalfleet_state_v1";
    this.listeners = [];
    this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.state = parsed;
      } else {
        this.resetToDefaults();
      }
    } catch (e) {
      console.error("Error loading state from localStorage, falling back to initial data:", e);
      this.resetToDefaults();
    }
  }

  resetToDefaults() {
    this.state = {
      currentUser: JSON.parse(JSON.stringify(INITIAL_DATA.demoUser)),
      isLoggedIn: true, // Default to demo user logged in for immediate dashboard exploration, can toggle
      vehicles: JSON.parse(JSON.stringify(INITIAL_DATA.vehicles)),
      categories: JSON.parse(JSON.stringify(INITIAL_DATA.categories)),
      locations: JSON.parse(JSON.stringify(INITIAL_DATA.locations)),
      insuranceTiers: JSON.parse(JSON.stringify(INITIAL_DATA.insuranceTiers)),
      addons: JSON.parse(JSON.stringify(INITIAL_DATA.addons)),
      plans: JSON.parse(JSON.stringify(INITIAL_DATA.rentalPlans)),
      searchQuery: {
        pickupLocation: "lax",
        returnLocation: "lax",
        pickupDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        pickupTime: "10:00",
        returnDate: new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0],
        returnTime: "10:00",
        category: "all"
      }
    };
    this.saveState();
  }

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      this.notifyListeners();
    } catch (e) {
      console.error("Failed to save state:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(fn => {
      try {
        fn(this.state);
      } catch (e) {
        console.error("State listener error:", e);
      }
    });
  }

  // Auth Methods
  login(email, password, customName) {
    const displayName = customName && customName.trim()
      ? customName.trim()
      : (email ? email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase()) : "Valued Customer");

    // If matching existing user
    if (this.state.currentUser && this.state.currentUser.email && this.state.currentUser.email.toLowerCase() === email.toLowerCase()) {
      if (customName && customName.trim()) {
        this.state.currentUser.name = customName.trim();
      }
      this.state.isLoggedIn = true;
    } else {
      // Login or auto-generate profile
      this.state.currentUser = {
        id: "user-" + Date.now().toString(36),
        name: displayName,
        email: email,
        phone: "+1 (555) 019-2831",
        avatar: "dash-user-alex.jpg",
        tier: "Silver Explorer",
        points: 500,
        licenseNumber: "DL-62849102-CA",
        licenseExpiry: "12/2028",
        activeRentalsCount: 0,
        completedRentalsCount: 0,
        totalSpent: 0,
        paymentMethods: [
          {
            id: "pm-" + Date.now(),
            type: "visa",
            brand: "Visa",
            last4: "4242",
            expiry: "12/28",
            holder: displayName.toUpperCase(),
            isDefault: true
          }
        ],
        bookings: [],
        invoices: []
      };
      this.state.isLoggedIn = true;
    }
    this.saveState();
    return { success: true, user: this.state.currentUser };
  }

  logout() {
    this.state.isLoggedIn = false;
    this.state.currentUser = null;
    this.saveState();
  }

  register(userData) {
    const newUser = {
      id: "user-" + Date.now().toString(36),
      name: userData.name || "Valued Traveler",
      email: userData.email,
      phone: userData.phone || "+1 (555) 123-4567",
      avatar: "car-1216.jpg",
      tier: "Silver Explorer",
      points: 1000, // Welcome bonus
      licenseNumber: userData.licenseNumber || "DL-" + Math.floor(10000000 + Math.random() * 90000000) + "-US",
      licenseExpiry: "10/2029",
      activeRentalsCount: 0,
      completedRentalsCount: 0,
      totalSpent: 0,
      paymentMethods: [
        {
          id: "pm-" + Date.now(),
          type: "visa",
          brand: "Visa",
          last4: "4242",
          expiry: "12/28",
          holder: (userData.name || "CARDHOLDER").toUpperCase(),
          isDefault: true
        }
      ],
      bookings: [],
      invoices: []
    };
    this.state.currentUser = newUser;
    this.state.isLoggedIn = true;
    this.saveState();
    return { success: true, user: newUser };
  }

  // Booking Methods
  createBooking(bookingPayload) {
    const user = this.state.currentUser;
    if (!user) throw new Error("User must be logged in to book");

    const vehicle = this.state.vehicles.find(v => v.id === bookingPayload.carId);
    if (!vehicle) throw new Error("Vehicle not found");

    const bookingId = "BK-" + Math.floor(1000 + Math.random() * 9000);
    const invoiceId = "INV-2026-" + Math.floor(1000 + Math.random() * 9000);

    const newBooking = {
      id: bookingId,
      carId: vehicle.id,
      carName: vehicle.name,
      carImage: vehicle.image,
      plateNumber: "RF-" + Math.floor(100 + Math.random() * 900) + "X",
      pickupLocation: bookingPayload.pickupLocationName || "Los Angeles Intl Airport (LAX)",
      returnLocation: bookingPayload.returnLocationName || "Los Angeles Intl Airport (LAX)",
      pickupDate: bookingPayload.pickupDate,
      pickupTime: bookingPayload.pickupTime || "10:00 AM",
      returnDate: bookingPayload.returnDate,
      returnTime: bookingPayload.returnTime || "10:00 AM",
      days: bookingPayload.days,
      dailyRate: vehicle.pricePerDay,
      baseTotal: bookingPayload.baseTotal,
      insuranceId: bookingPayload.insuranceId,
      insuranceName: bookingPayload.insuranceName,
      insuranceCost: bookingPayload.insuranceCost,
      addons: bookingPayload.addons || [],
      addonsCost: bookingPayload.addonsCost || 0,
      taxes: bookingPayload.taxes,
      depositAmount: vehicle.deposit,
      totalAmount: bookingPayload.totalAmount,
      status: "Active",
      paymentStatus: "Paid",
      invoiceId: invoiceId,
      keylessCode: "RF-" + Math.floor(1000 + Math.random() * 9000),
      odometerStart: Math.floor(5000 + Math.random() * 20000),
      createdAt: new Date().toISOString()
    };

    // Build matching Invoice
    const invoiceItems = [
      {
        description: `${vehicle.name} (${bookingPayload.days} day${bookingPayload.days > 1 ? 's' : ''} @ $${vehicle.pricePerDay}/day)`,
        amount: bookingPayload.baseTotal
      }
    ];

    if (bookingPayload.insuranceCost > 0) {
      invoiceItems.push({
        description: `Protection Tier: ${bookingPayload.insuranceName}`,
        amount: bookingPayload.insuranceCost
      });
    }

    if (bookingPayload.addonItems && bookingPayload.addonItems.length > 0) {
      bookingPayload.addonItems.forEach(addon => {
        invoiceItems.push({
          description: `Add-on: ${addon.name}`,
          amount: addon.totalPrice
        });
      });
    }

    invoiceItems.push({
      description: "State Vehicle Concession & Environmental Fee (8%)",
      amount: bookingPayload.taxes
    });

    const newInvoice = {
      id: invoiceId,
      bookingId: bookingId,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      dueDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      carName: vehicle.name,
      period: `${bookingPayload.pickupDate} - ${bookingPayload.returnDate} (${bookingPayload.days} Days)`,
      amount: bookingPayload.totalAmount,
      status: "Paid",
      method: bookingPayload.paymentMethod || "Visa ending in 4242",
      items: invoiceItems
    };

    user.bookings.unshift(newBooking);
    user.invoices.unshift(newInvoice);
    user.totalSpent = (parseFloat(user.totalSpent || 0) + parseFloat(bookingPayload.totalAmount)).toFixed(2);
    user.points = (user.points || 0) + Math.round(bookingPayload.totalAmount);

    this.saveState();
    return { booking: newBooking, invoice: newInvoice };
  }

  cancelBooking(bookingId) {
    const user = this.state.currentUser;
    if (!user) return false;
    const booking = user.bookings.find(b => b.id === bookingId);
    if (booking && booking.status !== "Completed" && booking.status !== "Cancelled") {
      booking.status = "Cancelled";
      // Find invoice and update
      const invoice = user.invoices.find(inv => inv.id === booking.invoiceId);
      if (invoice) {
        invoice.status = "Refunded (100% Free)";
      }
      this.saveState();
      return true;
    }
    return false;
  }

  extendBooking(bookingId, extraDays) {
    const user = this.state.currentUser;
    if (!user) return false;
    const booking = user.bookings.find(b => b.id === bookingId);
    if (!booking) return false;

    extraDays = parseInt(extraDays, 10) || 1;
    const currentReturn = new Date(booking.returnDate);
    currentReturn.setDate(currentReturn.getDate() + extraDays);
    booking.returnDate = currentReturn.toISOString().split("T")[0];
    booking.days += extraDays;

    const addedAmount = booking.dailyRate * extraDays;
    booking.baseTotal += addedAmount;
    booking.totalAmount = parseFloat((booking.totalAmount + addedAmount).toFixed(2));

    // Update user stats
    user.totalSpent = (parseFloat(user.totalSpent) + addedAmount).toFixed(2);

    this.saveState();
    return booking;
  }

  // Payment Methods
  addPaymentMethod(cardData) {
    const user = this.state.currentUser;
    if (!user) return false;
    const newCard = {
      id: "pm-" + Date.now(),
      type: cardData.type || "visa",
      brand: cardData.brand || "Visa",
      last4: cardData.number ? cardData.number.slice(-4) : "1234",
      expiry: cardData.expiry || "12/28",
      holder: (cardData.holder || user.name).toUpperCase(),
      isDefault: user.paymentMethods.length === 0
    };
    user.paymentMethods.push(newCard);
    this.saveState();
    return newCard;
  }

  removePaymentMethod(cardId) {
    const user = this.state.currentUser;
    if (!user) return false;
    user.paymentMethods = user.paymentMethods.filter(pm => pm.id !== cardId);
    if (user.paymentMethods.length > 0 && !user.paymentMethods.some(pm => pm.isDefault)) {
      user.paymentMethods[0].isDefault = true;
    }
    this.saveState();
    return true;
  }

  setDefaultPaymentMethod(cardId) {
    const user = this.state.currentUser;
    if (!user) return false;
    user.paymentMethods.forEach(pm => {
      pm.isDefault = pm.id === cardId;
    });
    this.saveState();
    return true;
  }

  // Profile update
  updateProfile(profileData) {
    const user = this.state.currentUser;
    if (!user) return false;
    Object.assign(user, profileData);
    this.saveState();
    return user;
  }

  // Getters
  getVehicles(filter = {}) {
    let list = [...this.state.vehicles];

    if (filter.category && filter.category !== "all") {
      list = list.filter(v => v.category === filter.category);
    }

    if (filter.search) {
      const q = filter.search.toLowerCase().trim();
      list = list.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.categoryName.toLowerCase().includes(q) ||
        v.features.some(f => f.toLowerCase().includes(q))
      );
    }

    if (filter.transmission && filter.transmission !== "all") {
      list = list.filter(v => v.transmission.toLowerCase().includes(filter.transmission.toLowerCase()));
    }

    if (filter.fuelType && filter.fuelType !== "all") {
      list = list.filter(v => v.fuelType.toLowerCase().includes(filter.fuelType.toLowerCase()));
    }

    if (filter.maxPrice) {
      list = list.filter(v => v.pricePerDay <= filter.maxPrice);
    }

    if (filter.seats && filter.seats !== "all") {
      const minSeats = parseInt(filter.seats, 10);
      list = list.filter(v => v.seats >= minSeats);
    }

    if (filter.sortBy) {
      if (filter.sortBy === "price-low") {
        list.sort((a, b) => a.pricePerDay - b.pricePerDay);
      } else if (filter.sortBy === "price-high") {
        list.sort((a, b) => b.pricePerDay - a.pricePerDay);
      } else if (filter.sortBy === "rating") {
        list.sort((a, b) => b.rating - a.rating);
      }
    }

    return list;
  }

  getVehicleById(id) {
    return this.state.vehicles.find(v => v.id === id);
  }

  getBookingById(id) {
    if (!this.state.currentUser) return null;
    return this.state.currentUser.bookings.find(b => b.id === id);
  }

  getInvoiceById(id) {
    if (!this.state.currentUser) return null;
    return this.state.currentUser.invoices.find(inv => inv.id === id);
  }
}

// Global store instance
const store = new AppStore();
