const express = require('express');
const router = express.Router();
const Employee = require('../models/Addemployee');

// Create a new employee
router.post('/addemployee', async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).send(newEmployee);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Define a GET route to retrieve all employees
router.get('/getemployees', async (req, res) => {
    try {
        const employees = await Employee.find(); // Retrieve all employees from the database
        res.status(200).json(employees); // Send the retrieved employees as JSON response
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors
    }
});

// Route to update an employee by ID
router.put('/updateemployee/:id', async (req, res) => {
    const { id } = req.params;
    const { empName, fatherName, cnic, contactNumber, referenceName, referenceNumber, empID, groupName, salaryType, monthlySalary, normalRate, overRate, picture, document, active } = req.body;

    try {
        // Find the employee by ID
        let employee = await Employee.findById(id);

        // Check if employee exists
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update employee data
        employee.empName = empName;
        employee.fatherName = fatherName;
        employee.cnic = cnic;
        employee.contactNumber = contactNumber;
        employee.referenceName = referenceName;
        employee.referenceNumber = referenceNumber;
        employee.empID = empID;
        employee.groupName = groupName;
        employee.salaryType = salaryType;
        employee.monthlySalary = monthlySalary;
        employee.normalRate = normalRate;
        employee.overRate = overRate;
        employee.picture = picture;
        employee.document = document;
        employee.active = active;

        // Save updated employee
        await employee.save();

        res.status(200).json({ message: 'Employee updated successfully', data: employee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update the active status of an employee by ID
router.put('/updateactive/:id', async (req, res) => {
    const { id } = req.params;
    const { active } = req.body;

    try {
        // Find the employee by ID in the database
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Update the active status of the employee
        employee.active = active;
        await employee.save();

        res.status(200).json({ message: 'Employee active status updated successfully', employee });
    } catch (error) {
        console.error('Error updating employee active status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
