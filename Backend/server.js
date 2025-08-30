

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const extractionRoutes = require('./routes/extractionRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    'http://localhost:3000',
    'https://social-media-analyzer-45wb.onrender.com'

];

const corsOptions = {
    origin: function (origin, callback) {
      
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
          
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use(express.json());



app.use('/api', extractionRoutes);


// --- Server Start ---
app.listen(PORT, () => {
    console.log(`✅ Backend server is running and listening on http://localhost:${PORT}`);
});
