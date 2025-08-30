require('dotenv').config();
const express = require('express');
const cors = require('cors');
const extractionRoutes = require('./routes/extractionRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());


app.use(express.json());



app.use('/api', extractionRoutes);


app.listen(PORT, () => {
    console.log(`✅ Backend server is running and listening on http://localhost:${PORT}`);
});

