// Import required modules
const express = require('express');
const router = express.Router();
const EmployeeAttendance = require('../models/Employeeattendance');

// Route to save attendance data
// Route to save attendance data
router.post('/saveAttendance', async (req, res) => {
    const { date, empID, groupName, employeeProject, attendanceStatus, normalWorkingHours, overtimeWorkingHours } = req.body;
    try {
      // Create a new EmployeeAttendance document
      const newAttendance = new EmployeeAttendance({
        date,
        empID,
        groupName,
        employeeProject,
        attendanceStatus,
        normalWorkingHours,
        overtimeWorkingHours
      });
      // Save the new document to the database
      await newAttendance.save();
      res.status(201).json({ message: 'Attendance data saved successfully' });
    } catch (error) {
      console.error('Error saving attendance data:', error);
      res.status(500).json({ message: 'Failed to save attendance data' });
    }
  });
module.exports = router;