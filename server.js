const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 

// Import models
const Addgroup = require('./src/models/Addgroup');
const Addemployee = require('./src/models/Addemployee');
const EmployeeIssue = require('./src/models/employeeissue'); 
const EmployeeAttendance = require('./src/models/Employeeattendance');


// Import routes
const addgroupRoutes = require('./src/routes/Addgroup');
const addEmployeeRoutes = require('./src/routes/Addemployee');
const employeeIssueRoutes = require('./src/routes/employeeissue'); 
const employeeAttendanceRoutes = require('./src/routes/Employeeattendance')

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
app.use('/api', employeeIssueRoutes);
app.use('/api', employeeAttendanceRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
