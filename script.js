// ============================================================
// 1. EVENTS DATA ARRAY — Add/remove events here easily
// ============================================================
const events = [
  {
    id: "ev-1",
    title: "Avengers: Secret Wars",
    category: "movie",
    label: "Movie",
    date: "25 March 2026",
    location: "Chennai, Tamil Nadu",
    price: "₹350",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=200&fit=crop",
    value: "avengers"
  },
  {
    id: "ev-2",
    title: "AR Rahman Live 2026",
    category: "concert",
    label: "Concert",
    date: "28 March 2026",
    location: "Mumbai, Maharashtra",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=200&fit=crop",
    value: "ar-rahman"
  },
  {
    id: "ev-3",
    title: "IPL 2026 Final",
    category: "sports",
    label: "Sports",
    date: "30 March 2026",
    location: "Chennai, Tamil Nadu",
    price: "₹750",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=200&fit=crop",
    value: "ipl"
  }
];

// ============================================================
// 2. REUSABLE CARD COMPONENT — builds one card's HTML
// ============================================================
function createEventCard(event) {
  // Create the card element
  const card = document.createElement("div");
  card.className = "event-card reveal";
  card.dataset.category = event.category;   // used for filtering

  // Build inner HTML using a template literal
  card.innerHTML = `
    <div class="card-badge ${event.category}">${event.label}</div>
    <img src="${event.image}" alt="${event.title}" loading="lazy">
    <div class="card-body">
      <h3>${event.title}</h3>
      <p><i class="fas fa-calendar-alt"></i> ${event.date}</p>
      <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
      <p class="price"><i class="fas fa-tag"></i> ${event.price} / ticket</p>
      <button id="${event.id}" class="book-btn">
        <i class="fas fa-ticket-alt"></i> Book Ticket
      </button>
    </div>
  `;

  // Attach booking click handler
  const btn = card.querySelector("button");
  btn.addEventListener("click", () => bookTicket(event.id, event.title, event.value, btn));

  return card;
}

// ============================================================
// 3. RENDER EVENTS INTO THE GRID
// ============================================================
function renderEvents(filter = "all") {
  const grid = document.getElementById("event-grid");
  grid.innerHTML = ""; // clear previous cards

  const filtered = filter === "all"
    ? events
    : events.filter(ev => ev.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="no-events">No events found in this category.</p>`;
    return;
  }

  filtered.forEach(event => {
    const card = createEventCard(event);
    grid.appendChild(card);
  });

  // Trigger scroll reveal for newly added cards
  setTimeout(revealElements, 50);
}

// ============================================================
// 4. CATEGORY FILTER BUTTONS
// ============================================================
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    // Remove active class from all buttons
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    // Set active on the clicked button
    this.classList.add("active");

    // Render with the selected filter
    renderEvents(this.dataset.filter);
  });
});

// ============================================================
// 5. HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// ============================================================
// 6. STICKY HEADER SHADOW ON SCROLL
// ============================================================
window.addEventListener("scroll", () => {
  document.getElementById("header").classList.toggle("scrolled", window.scrollY > 20);
  revealElements();
});

// ============================================================
// 7. SMOOTH SCROLL FOR NAV & BUTTONS
// ============================================================
document.querySelectorAll(".nav-link, .btn").forEach(link => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ============================================================
// 8. SCROLL REVEAL ANIMATION
// ============================================================
function revealElements() {
  document.querySelectorAll(".reveal").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add("visible");
    }
  });
}

// ============================================================
// 9. BOOK TICKET — toggle booked state
// ============================================================
function bookTicket(btnId, eventName, eventValue, btn) {
  // btn is passed directly from the card component
  if (!btn) btn = document.getElementById(btnId);

  if (btn.classList.contains("booked")) {
    btn.classList.remove("booked");
    btn.innerHTML = '<i class="fas fa-ticket-alt"></i> Book Ticket';
    showToast("Booking cancelled for " + eventName);

    const sel = document.getElementById("event");
    if (sel.value === eventValue) sel.value = "";
  } else {
    btn.classList.add("booked");
    btn.innerHTML = '<i class="fas fa-check-circle"></i> Booked!';
    showToast("🎉 " + eventName + " added to your booking!");

    document.getElementById("event").value = eventValue;

    setTimeout(() => {
      document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    }, 900);
  }
}

// ============================================================
// 10. FORM VALIDATION — with input highlight feedback
// ============================================================
const form = document.getElementById("booking-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name    = document.getElementById("name");
  const email   = document.getElementById("email");
  const event   = document.getElementById("event");
  const tickets = document.getElementById("tickets");

  let valid = true;

  // Name
  if (name.value.trim() === "") {
    showError("name", "Please enter your full name.");
    setInputState(name, false);
    valid = false;
  } else {
    clearError("name");
    setInputState(name, true);
  }

  // Email — regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError("email", "Please enter a valid email address.");
    setInputState(email, false);
    valid = false;
  } else {
    clearError("email");
    setInputState(email, true);
  }

  // Event
  if (event.value === "") {
    showError("event", "Please select an event.");
    setInputState(event, false);
    valid = false;
  } else {
    clearError("event");
    setInputState(event, true);
  }

  // Tickets
  const ticketCount = parseInt(tickets.value);
  if (isNaN(ticketCount) || ticketCount < 1 || ticketCount > 10) {
    showError("tickets", "Please enter a number between 1 and 10.");
    setInputState(tickets, false);
    valid = false;
  } else {
    clearError("tickets");
    setInputState(tickets, true);
  }

  // Success — show loading spinner, then toast
  if (valid) {
    const submitBtn = document.getElementById("submit-btn");
    const btnText   = submitBtn.querySelector(".btn-text");
    const loader    = document.getElementById("btn-loader");

    btnText.style.display = "none";
    loader.style.display  = "flex";
    submitBtn.disabled    = true;

    setTimeout(() => {
      btnText.style.display = "flex";
      loader.style.display  = "none";
      submitBtn.disabled    = false;
      showToast("🎉 Booking confirmed! Check your email.");
      form.reset();
      // Clear all input highlights on reset
      [name, email, event, tickets].forEach(el => el.classList.remove("input-valid", "input-error"));
    }, 2000);
  }
});

// Live validation — clear error as user types
["name", "email", "event", "tickets"].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("input", () => {
    clearError(id);
    el.classList.remove("input-error", "input-valid");
  });
});

// ============================================================
// 11. HELPER FUNCTIONS
// ============================================================
function showError(id, msg) {
  document.getElementById(id + "-error").innerText = msg;
}

function clearError(id) {
  document.getElementById(id + "-error").innerText = "";
}

// Highlight input as valid (green border) or invalid (red)
function setInputState(el, isValid) {
  el.classList.toggle("input-valid", isValid);
  el.classList.toggle("input-error", !isValid);
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-msg").innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ============================================================
// 12. INIT — render all cards on page load
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  renderEvents("all");  // render all event cards at start
  revealElements();     // reveal any already-visible elements
});
