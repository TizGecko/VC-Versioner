const form = document.getElementById('bookingForm');
const bookingsList = document.getElementById('bookingsList');

async function fetchBookings() {
    const res = await fetch('http://localhost:3000/api/bookings');
    const bookings = await res.json();
    bookingsList.innerHTML = bookings.map(b => `<li>${b.date} ${b.time} - ${b.name} (${b.email})</li>`).join('');
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = {
        name: form.name.value,
        email: form.email.value,
        date: form.date.value,
        time: form.time.value
    };
    await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    form.reset();
    fetchBookings();
});

fetchBookings();