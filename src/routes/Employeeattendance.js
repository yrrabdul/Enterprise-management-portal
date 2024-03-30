// Import required modules
const express = require('express');
const router = express.Router();
const EmployeeAttendance = require('../models/Employeeattendance');

// Route to save attendance data
router.post('/saveAttendance', async (req, res) => {
    const { date, empID,empName, groupName, employeeProject, attendanceStatus,salaryType, normalStartTime, normalEndTime, overtimeStartTime, overtimeEndTime, monthlySalary,overRate, normalRate } = req.body;
    try {
      // Create a new EmployeeAttendance document
      const newAttendance = new EmployeeAttendance({
        date,
        empID,
        empName,
        groupName,
        employeeProject,
        attendanceStatus,
        salaryType,
        normalStartTime,
        normalEndTime,
        overtimeStartTime,
        overtimeEndTime,
        monthlySalary,
        overRate,
        normalRate
      });
      // Save the new document to the database
      await newAttendance.save();
      res.status(201).json({ message: 'Attendance data saved successfully' });
    } catch (error) {
      console.error('Error saving attendance data:', error);
      res.status(500).json({ message: 'Failed to save attendance data' });
    }
});

// Route to fetch all attendance data for all employees
router.get('/attendance', async (req, res) => {
  try {
    // Find all attendance records
    const attendanceData = await EmployeeAttendance.find();

    // Send the attendance data as a response
    res.status(200).json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ message: 'Failed to fetch attendance data' });
  }
});

module.exports = router;
