const express = require('express');
const router = express.Router();
const EmployeeIssue = require('../models/employeeissue');

// Create a new employee issue
router.post('/addissue', async (req, res) => {
    try {
        const newIssue = new EmployeeIssue(req.body);
        await newIssue.save();
        res.status(201).send(newIssue);
    } catch (error) {
        console.error('Error adding employee issue:', error);
        res.status(400).send(error);
    }
});

// Get all employee issues
router.get('/getissues', async (req, res) => {
    try {
        const issues = await EmployeeIssue.find();
        res.status(200).json(issues);
    } catch (error) {
        console.error('Error fetching employee issues:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update employee issue by ID
router.put('/updateissue/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedIssue = await EmployeeIssue.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedIssue) {
            return res.status(404).json({ message: 'Employee issue not found' });
        }
        res.status(200).json(updatedIssue);
    } catch (error) {
        console.error('Error updating employee issue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete employee issue by ID
router.delete('/deleteissue/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIssue = await EmployeeIssue.findByIdAndDelete(id);
        if (!deletedIssue) {
            return res.status(404).json({ message: 'Employee issue not found' });
        }
        res.status(200).json({ message: 'Employee issue deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee issue:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;