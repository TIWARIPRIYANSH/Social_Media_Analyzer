require('dotenv').config();
const express = require('express');
const cors = require('cors');
const extractionRoutes = require('./routes/extractionRoutes');

const app = express();
const port = 3001;


app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json()); 


app.use('/api', extractionRoutes);

app.listen(port, () => {
  console.log(`✅ Backend server is running and listening on http://localhost:${port}`);
  //console.log('Architecture: MVC (Controllers & Routes)');
});

