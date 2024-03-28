import React, { useState } from 'react';
import './employee-report.css';

const EmployeeReport = () => {
  // State variables
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedSummaryDetail, setSelectedSummaryDetail] = useState('');
  const [reportData, setReportData] = useState([]);

  // Function to handle form submission
  const handleFetch = (e) => {
    e.preventDefault();
    // Logic to fetch report data based on selected criteria
    console.log('Fetching report data');
  };

  return (
    <div className="report-main">
      <div className="container">
        <h2 className="text-center mb-4">Employee Report</h2>
        <form onSubmit={handleFetch}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="dateFrom" className="form-label">Date From:</label>
              <input type="date" id="dateFrom" className="form-control" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="dateTo" className="form-label">Date To:</label>
              <input type="date" id="dateTo" className="form-control" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label htmlFor="salaryType" className="form-label">Salary Type:</label>
              <select id="salaryType" className="form-select" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                <option value="">Select Salary Type</option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-3">
              <label htmlFor="project" className="form-label">Project:</label>
              <select id="project" className="form-select" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                {/* Options for selecting project */}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="group" className="form-label">Group:</label>
              <select id="group" className="form-select" value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                {/* Options for selecting group */}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="employee" className="form-label">Employee:</label>
              <select id="employee" className="form-select" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
                {/* Options for selecting employee */}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="summaryDetail" className="form-label">Summary/Detail:</label>
              <select id="summaryDetail" className="form-select" value={selectedSummaryDetail} onChange={(e) => setSelectedSummaryDetail(e.target.value)}>
                <option value="">Select Summary/Detail</option>
                <option value="summary">Summary</option>
                <option value="detail">Detail</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Fetch</button>
        </form>
        {/* Display report data in a table */}
        <div className="report-data mt-5">
          <h3>Report Data</h3>
          <table className="table add-employee-table table-striped">
            <thead>
              <tr>
                <th className='table-header'>Project Name</th>
                <th className='table-header'>Group Name</th>
                <th className='table-header'>Employee Name</th>
                {salaryType === 'hourly' ? (
                  <>
                    <th className='table-header'>Total Normal Hours</th>
                    <th className='table-header'>Total Overtime</th>
                    <th className='table-header'>Rate Average</th>
                    <th className='table-header'>Amount</th>
                  </>
                ) : (
                  <>
                    <th className='table-header'>Total Attendance Days</th>
                    <th className='table-header'>Total Absent Days</th>
                    <th className='table-header'>Monthly Salary</th>
                    <th className='table-header'>Total Amount</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {/* Map over reportData and display each row */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
