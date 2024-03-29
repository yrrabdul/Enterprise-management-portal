// Import required modules
const express = require('express');
const router = express.Router();
const EmployeeAttendance = require('../models/Employeeattendance');

// Route to save attendance data
router.post('/saveAttendance', async (req, res) => {
  const { date, empID, groupName, employeeProject, attendanceStatus, normalStartTime, normalEndTime, overtimeStartTime, overtimeEndTime } = req.body;
  try {
    // Create a new EmployeeAttendance document
    const newAttendance = new EmployeeAttendance({
      date,
      empID,
      groupName,
      employeeProject,
      attendanceStatus,
      normalStartTime,
      normalEndTime,
      overtimeStartTime,
      overtimeEndTime
    });
    // Save the new document to the database
    await newAttendance.save();
    res.status(201).json({ message: 'Attendance data saved successfully' });
  } catch (error) {
    console.error('Error saving attendance data:', error);
    res.status(500).json({ message: 'Failed to save attendance data' });
  }
});


  // Route to fetch attendance data
  router.get('/getAttendance', async (req, res) => {
  try {
    // Fetch all attendance data from the database
    const attendanceData = await EmployeeAttendance.find();
    res.status(200).json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ message: 'Failed to fetch attendance data' });
  }
});

// Route to fetch all attendance data for a given employee ID
router.get('/attendance/:empID', async (req, res) => {
  const { empID } = req.params;

  try {
    // Find all attendance records for the given employee ID
    const attendanceData = await EmployeeAttendance.find({ empID });

    // Send the attendance data as a response
    res.status(200).json(attendanceData);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ message: 'Failed to fetch attendance data' });
  }
});


module.exports = router;