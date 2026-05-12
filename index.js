const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://outpro-india-sand.vercel.app/'] }));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Atlas Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Outpro India Backend API Running');
});

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
