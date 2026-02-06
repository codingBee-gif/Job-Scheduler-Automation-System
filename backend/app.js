const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/job.routes');


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', jobRoutes);

app.get('/', (req, res) => {
  res.send('Dotix Job Scheduler API running');
});

module.exports = app;
