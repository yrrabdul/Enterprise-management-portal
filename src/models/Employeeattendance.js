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
<<<<<<< HEAD
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
=======
  
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

<<<<<<< Updated upstream
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
>>>>>>> Stashed changes
>>>>>>> 5c3b08ee6f3d656a255ee1c31203ff6208a9271d
>>>>>>> 78e71b4e9e1252a71ba42dc22fed382409b67333
});

// Create and export the EmployeeAttendance model
module.exports = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema);
