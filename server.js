const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const Addgroup = require('./src/components/models/Addgroup');
const Addemployee = require('./src/components/models/Addemployee');

// Import routes
const addgroupRoutes = require('./src/components/routes/Addgroup');
const addEmployeeRoutes = require('./src/components/routes/Addemployee');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Alsyed', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use('/api', addgroupRoutes);
app.use('/api', addEmployeeRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
