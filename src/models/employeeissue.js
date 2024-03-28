const mongoose = require('mongoose');

const EmployeeIssueSchema = new mongoose.Schema({
    empID: {
        type: String, // Assuming empID is stored as a string
        required: true
    },
    projects: [{
        projectName: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }]
});

module.exports = mongoose.model('EmployeeIssue', EmployeeIssueSchema);