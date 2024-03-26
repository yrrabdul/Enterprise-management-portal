import React, { useState } from 'react';
import './employee-attendance.css';

const EmployeeAttendance = () => {
  // State variables
  const [selectedDate, setSelectedDate] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., upload Excel sheet, mark attendance)
    // Parse Excel sheet and update attendanceData accordingly
    console.log('Form submitted');
  };

  return (
    <div className="attendance-main">
      <div className="container">
        <h2 className="text-center mb-4">Employee Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="date" className="form-label">Select Date:</label>
              <input type="date" id="date" className="form-control" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label htmlFor="salaryType" className="form-label">Select Salary Type:</label>
              <select id="salaryType" className="form-select" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                <option value="">Select Salary Type</option>
                <option value="hourly">Hourly</option>
                <option value="salary">Salary</option>
              </select>
            </div>
          </div>
          {/* Other input fields for group selection, project selection, and Excel sheet upload */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="group" className="form-label">Select Group:</label>
              <select id="group" className="form-select" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                {/* Options for selecting group */}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="project" className="form-label">Select Project:</label>
              <select id="project" className="form-select" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                {/* Options for selecting project */}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="excel" className="form-label">Upload Excel Sheet:</label>
            <input type="file" id="excel" className="form-control" accept=".xlsx, .xls" />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
        {/* Display list of employees with attendance status */}
        <div className="attendance-list mt-5">
          <h3>Employee Attendance</h3>
          <table className="table group-table table-striped">
            <thead>
              <tr>
                <th className='table-header'>Employee Name</th>
                <th className='table-header'>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sania</td>
                <td>
                  <select>
                    <option value="P">P</option>
                    <option value="A">A</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
