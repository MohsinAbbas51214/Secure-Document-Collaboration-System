const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const docRoutes = require('./routes/docRoutes');
const { authenticateJWT } = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection failed:', err));

app.use('/api/auth', authRoutes);
app.use('/api/documents', authenticateJWT, docRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
