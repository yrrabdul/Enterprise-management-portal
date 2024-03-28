const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    empName: { 
        type: String, 
        required: true 
    },
    empID: {
        type: String, 
        required: true
    },
    fatherName: {
        type: String, 
        required: true
    },
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: { 
        type: String, 
        required: true
    },
    referenceName: { 
        type: String 
    },
    referenceNumber: {
        type: String 
    },
    groupName: {
        type: String,
        required: true
    },
    salaryType: { 
        type: String,
        required: true
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
    picture: {
        type: String
    }, 
    active: {
        type: String,
        default: 'Active' 
    },
    document: {
        type: String
    },
    projects: [{ 
        type: String // Assuming project names are strings
    }]
});

module.exports = mongoose.model('Employee', EmployeeSchema);
