const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();

// Init middleware - 이것을 사용함으로써 req.body가 그냥 JSON 받듯이 받아진다.
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.json({ msg: 'welcome to the contact keeper API' })
});

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));