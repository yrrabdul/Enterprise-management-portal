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
    // enum: ['P', 'A'], // 'P' for Present, 'A' for Absent
    required: true
  },
  // Additional fields for hourly employees
  normalWorkingHours: {
    type: Number,
    default: 0 // Default value set to 0
  },
  overtimeWorkingHours: {
    type: Number,
    default: 0 // Default value set to 0
  }
});

// Create and export the EmployeeAttendance model
module.exports = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema);