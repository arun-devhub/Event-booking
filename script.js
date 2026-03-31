// simple event data
const events = [
  {
    id: "ev1",
    title: "Avengers: Secret Wars",
    category: "movie",
    date: "25 March 2026",
    location: "Chennai",
    price: "₹350",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    value: "avengers"
  },
  {
    id: "ev2",
    title: "AR Rahman Live 2026",
    category: "concert",
    date: "28 March 2026",
    location: "Mumbai",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
    value: "ar-rahman"
  },
  {
    id: "ev3",
    title: "IPL 2026 Final",
    category: "sports",
    date: "30 March 2026",
    location: "Chennai",
    price: "₹750",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400",
    value: "ipl"
  }
];

// render events
  function loadEvents(type = "all") {
  const grid = document.getElementById("event-grid");
  grid.innerHTML = "";

  let list = events;
  if (type !== "all") {
    list = events.filter(e => e.category === type);
  }

  if (list.length === 0) {
    grid.innerHTML = "<p>No events found</p>";
    return;
  }

  list.forEach(e => {
    const div = document.createElement("div");
    div.className = "event-card";
    div.setAttribute("data-type", e.category);

    div.innerHTML = `
      <img src="${e.image}" />
      <div class="card-body">
        <h3>${e.title}</h3>
        <p>${e.date}</p>
        <p>${e.location}</p>
        <p>${e.price}</p>
        <button class="book-btn">Book</button>
      </div>
    `;

    const btn = div.querySelector(".book-btn");
    btn.addEventListener("click", () => handleBooking(e, btn));

    grid.appendChild(div);
  });
}

// filter buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    loadEvents(btn.dataset.filter);
  };
});

// booking logic
function handleBooking(event, btn) {
  if (btn.classList.contains("done")) {
    btn.classList.remove("done");
    btn.innerText = "Book";
    showMsg("Booking cancelled");
    document.getElementById("event").value = "";
  } else {
    btn.classList.add("done");
    btn.innerText = "Booked";

    showMsg(event.title + " selected");
    document.getElementById("event").value = event.value;

    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
  }
}

// simple toast
function showMsg(text) {
  const t = document.getElementById("toast");
  document.getElementById("toast-msg").innerText = text;

  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

// form validation (basic)
document.getElementById("booking-form").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const tickets = document.getElementById("tickets");

  if (name.value === "" || email.value === "" || tickets.value === "") {
    showMsg("Please fill all fields");
    return;
  }

  showMsg("Booking confirmed!");
  e.target.reset();
});

// menu toggle
const ham = document.getElementById("hamburger");
const nav = document.querySelector("nav");

ham.onclick = () => {
  nav.classList.toggle("open");
};

// initial load
document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});
