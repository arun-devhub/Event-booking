// BOOK BUTTON FUNCTION
function bookTicket(btnId, eventName) {
  const btn = document.getElementById(btnId);
  const isBooked = btn.classList.contains('booked');

  if (isBooked) {
    btn.classList.remove('booked');
    btn.textContent = 'Book Ticket';
    showToast(`Booking cancelled for ${eventName}`);
  } else {
    btn.classList.add('booked');
    btn.textContent = '✓ Booked!';
    showToast(`${eventName} added!`);

    // Auto select event
    const eventSelect = document.getElementById('event');

    if (btnId === 'book-1') eventSelect.value = 'avengers';
    if (btnId === 'book-2') eventSelect.value = 'coldplay';
    if (btnId === 'book-3') eventSelect.value = 'ipl';
  }
}

// FORM VALIDATION
const form = document.getElementById('booking-form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const event = document.getElementById('event');
  const tickets = document.getElementById('tickets');

  // NAME
  if (name.value.trim() === "") {
    showError('name', "Enter name");
    valid = false;
  } else {
    clearError('name');
  }

  // EMAIL
  if (!email.value.includes("@")) {
    showError('email', "Enter valid email");
    valid = false;
  } else {
    clearError('email');
  }

  // EVENT
  if (event.value === "") {
    showError('event', "Select event");
    valid = false;
  } else {
    clearError('event');
  }

  // TICKETS
  if (tickets.value < 1 || tickets.value > 10) {
    showError('tickets', "1-10 only");
    valid = false;
  } else {
    clearError('tickets');
  }

  if (valid) {
    showToast("Booking Successful 🎉");
    form.reset();
  }
});

// ERROR FUNCTIONS
function showError(id, msg) {
  document.getElementById(id + "-error").innerText = msg;
}

function clearError(id) {
  document.getElementById(id + "-error").innerText = "";
}

// TOAST
function showToast(message) {
  const toast = document.getElementById("toast");
  const msg = document.getElementById("toast-msg");

  msg.innerText = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
