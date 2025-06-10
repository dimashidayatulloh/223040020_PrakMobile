const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/food', foodRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => res.send('Food Order API is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});