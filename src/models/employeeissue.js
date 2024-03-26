const mongoose = require('mongoose');

const EmployeeIssueSchema = new mongoose.Schema({
    selectedProjects: [{
        type: String
    }],
    selectedEmployee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
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
});

module.exports = mongoose.model('EmployeeIssue', EmployeeIssueSchema);
