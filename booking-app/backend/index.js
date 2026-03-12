const express = require('express');
const cors = require('cors');
const { getBookings, addBooking } = require('./controllers');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/bookings', getBookings);
app.post('/api/bookings', addBooking);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));