let bookings = [];

function getBookings(req, res) {
    res.json(bookings);
}

function addBooking(req, res) {
    const { name, email, date, time } = req.body;
    if (!name || !email || !date || !time) {
        return res.status(400).json({ error: 'Dati mancanti' });
    }
    const newBooking = { id: bookings.length + 1, name, email, date, time };
    bookings.push(newBooking);
    res.status(201).json(newBooking);
}

module.exports = { getBookings, addBooking };