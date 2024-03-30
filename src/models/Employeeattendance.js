// Import mongoose
const mongoose = require('mongoose');

// Define the EmployeeAttendance schema
const EmployeeAttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  empID: {
    type: String,
    required: true
  },
  empName: { 
    type: String, 
    required: true 
  },
  groupName: {
    type: String,
    required: true
  },
  employeeProject: {
    type: String,
    required: true
  },
  attendanceStatus: {
    type: String,
    required: true
  },
  salaryType: { 
    type: String,
    // required: true
},
  // Additional fields for hourly employees
  normalStartTime: {
    type: String,
    // required: true
  },
  normalEndTime: {
    type: String,
    // required: true
  },
  overtimeStartTime: {
    type: String,
    // required: true
  },
  overtimeEndTime: {
    type: String,
    // required: true
  },
  monthlySalary: {
    type: Number
  },
  overRate: {
    type: Number
  },
  normalRate: {
    type: Number
  },
});

// Create and export the EmployeeAttendance model
module.exports = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema);
