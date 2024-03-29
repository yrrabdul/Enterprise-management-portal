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
    required: true
  },
  // Additional fields for hourly employees
  normalStartTime: {
    type: String,
    required: true,
    default: '00:00'
  },
  normalEndTime: {
    type: String,
    required: true,
    default: '00:00'
  },
  overtimeStartTime: {
    type: String,
    required: true,
    default: '00:00'
  },
  overtimeEndTime: {
    type: String,
    required: true,
    default: '00:00'
  }
});

// Create and export the EmployeeAttendance model
module.exports = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema);