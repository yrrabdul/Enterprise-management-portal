import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employee-attendance.css';

const EmployeeAttendance = () => {
  // Function to get today's date in the format yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];

  // State variables
  const [selectedDate, setSelectedDate] = useState(today); // Default to today's date
  const [salaryType, setSalaryType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Hardcoded dummy projects
  const dummyProjects = ['Project A', 'Project B', 'Project C'];

  useEffect(() => {
    fetchGroups();
  }, []);

  // Function to fetch group names
  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getgroups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchEmployees = async () => {
    if (!selectedGroup || !selectedProject || !salaryType) {
      // If any of the parameters are empty, show an alert and return early without making the API call
      alert('Please select all criteria (Group, Project, Salary Type) before fetching employees.');
      return;
    }
  
    try {
      const response = await axios.get('http://localhost:5000/api/getemployees', {
        params: {
          group: selectedGroup,
          project: selectedProject,
          salaryType: salaryType
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchEmployees(); // Fetch employees based on selected criteria
  };

  // Handle salary type change
  const handleSalaryTypeChange = (e) => {
    setSalaryType(e.target.value);
  };

  // Handle group selection change
  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  // Handle project selection change
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  return (
    <div className="attendance-main">
      <div className="container">
        <h2 className="text-center mb-4">Employee Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="date" className="form-label">Select Date:</label>
              <input type="date" id="date" className="form-control" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} max={today} />
            </div>
            <div className="col-md-4">
              <label htmlFor="salaryType" className="form-label">Select Salary Type:</label>
              <select id="salaryType" className="form-select" value={salaryType} onChange={handleSalaryTypeChange}>
                <option value="">Select Salary Type</option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="group" className="form-label">Select Group:</label>
              <select id="group" className="form-select" value={selectedGroup} onChange={handleGroupChange}>
                <option value="">Select Group</option>
                {groups.map(group => (
                  <option key={group._id} value={group.groupName}>{group.groupName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="project" className="form-label">Select Project:</label>
              <select id="project" className="form-select" value={selectedProject} onChange={handleProjectChange}>
                <option value="">Select Project</option>
                {dummyProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">Fetch Employees</button>
          </div>
        </form>
        <div className="attendance-list mt-5">
          <h3>Employee List</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.empID}>
                  <td>{employee.empName}</td>
                  <td>
                    <select>
                      <option value="P">Present</option>
                      <option value="A">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
