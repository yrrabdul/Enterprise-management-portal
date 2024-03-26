import React, { useState } from 'react';
import './employee-issue.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const EmployeeIssue = () => {
  // State variables
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedEmployees, setAssignedEmployees] = useState([]);

  // Dummy project names
  const dummyProjects = ['Project A', 'Project B', 'Project C'];

  // Dummy employee data
  const dummyEmployees = [
    { id: 1, name: 'Employee 1' },
    { id: 2, name: 'Employee 2' },
    { id: 3, name: 'Employee 3' }
  ];

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the submitted data (e.g., API call)
    console.log({
      selectedProject,
      selectedEmployee,
      startDate,
      endDate,
      assignedEmployees
    });
    // Reset form fields
    setSelectedProject('');
    setSelectedEmployee('');
    setStartDate('');
    setEndDate('');
    setAssignedEmployees([]);
  };

  return (
    <div className='container issue-main'>
      <div className='issue-submain'>
        <h2>Employee Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-4'>
            <label htmlFor="project">Select Project:</label>
            <select id="project" className='form-select select-dropdown mb-4' value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
              <option value="">Select Project</option>
              {dummyProjects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor="employee">Select Employee:</label>
            <select id="employee" className='form-select select-dropdown mb-4' value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
              <option value="">Select Employee</option>
              {dummyEmployees.map((employee) => (
                <option key={employee.id} value={employee.name}>{employee.name}</option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor="start-date">Start Date:</label>
            <input type="date" id="start-date" className='form-control mb-4' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor="end-date">End Date:</label>
            <input type="date" id="end-date" className='form-control mb-4' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button type="submit" className='btn mb-4'>Assign Project</button>
        </form>
        <div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeIssue;
