import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employee-report.css';

const EmployeeReport = () => {
  // State variables
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonthFrom, setSelectedMonthFrom] = useState('');
  const [selectedDayFrom, setSelectedDayFrom] = useState('');
  const [selectedMonthTo, setSelectedMonthTo] = useState('');
  const [selectedDayTo, setSelectedDayTo] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedSummaryDetail, setSelectedSummaryDetail] = useState('');
  const [reportData, setReportData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Hardcoded dummy projects
  const dummyProjects = ['Project A', 'Project B', 'Project C'];

  // Initialize days array with values from 1 to 31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Months array for the dropdown
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  // Fetch groups and employees on component mount
  useEffect(() => {
    fetchGroups();
    fetchEmployees();
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

  // Function to fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getemployees');
      // Extracting only empName and empID from the response data
      const simplifiedEmployees = response.data.map(employee => ({
        id: employee.empID,
        name: employee.empName
      }));
      // Set the fetched employees to state
      setEmployees(simplifiedEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Handle year change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Handle month from change
  const handleMonthFromChange = (e) => {
    setSelectedMonthFrom(e.target.value);
  };

  // Handle day from change
  const handleDayFromChange = (e) => {
    setSelectedDayFrom(e.target.value);
  };

  // Handle month to change
  const handleMonthToChange = (e) => {
    setSelectedMonthTo(e.target.value);
  };

  // Handle day to change
  const handleDayToChange = (e) => {
    setSelectedDayTo(e.target.value);
  };

  // Handle project selection change
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  // Handle group selection change
  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  // Handle employee selection change
  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  // Handle summary/detail selection change
  const handleSummaryDetailChange = (e) => {
    setSelectedSummaryDetail(e.target.value);
  };

  // Function to handle form submission
  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      // Make an HTTP request to fetch report data based on selected criteria
      const response = await axios.get('http://localhost:5000/api/getreportdata', {
        params: {
          year: selectedYear,
          monthFrom: selectedMonthFrom,
          dayFrom: selectedDayFrom,
          monthTo: selectedMonthTo,
          dayTo: selectedDayTo,
          salaryType: salaryType,
          projectName: selectedProject,
          groupName: selectedGroup,
          employeeName: selectedEmployee,
          summaryDetail: selectedSummaryDetail
        }
      });
      // Update the report data state with the fetched data
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  return (
    <div className="report-main">
      <div className="container">
        <h2 className="text-center mb-4">Employee Report</h2>
        <form onSubmit={handleFetch}>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="year" className="form-label">Select Year:</label>
              <select id="year" className="form-select" value={selectedYear} onChange={handleYearChange}>
                <option value="">Select Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="monthFrom" className="form-label">Select Month (From):</label>
              <select id="monthFrom" className="form-select" value={selectedMonthFrom} onChange={handleMonthFromChange}>
                <option value="">Select Month</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="dayFrom" className="form-label">Select Day (From):</label>
              <select id="dayFrom" className="form-select" value={selectedDayFrom} onChange={handleDayFromChange}>
                <option value="">Select Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="monthTo" className="form-label">Select Month (To):</label>
              <select id="monthTo" className="form-select" value={selectedMonthTo} onChange={handleMonthToChange}>
                <option value="">Select Month</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="dayTo" className="form-label">Select Day (To):</label>
              <select id="dayTo" className="form-select" value={selectedDayTo} onChange={handleDayToChange}>
                <option value="">Select Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="salaryType" className="form-label">Salary Type:</label>
              <select id="salaryType" className="form-select" value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                <option value="">Select Salary Type</option>
                <option value="hourly">Hourly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="project" className="form-label">Project:</label>
              <select id="project" className="form-select" value={selectedProject} onChange={handleProjectChange}>
                <option value="">Select Project</option>
                {dummyProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="group" className="form-label">Group:</label>
              <select id="group" className="form-select" value={selectedGroup} onChange={handleGroupChange}>
                <option value="">Select Group</option>
                {groups.map(group => (
                  <option key={group._id} value={group.groupName}>{group.groupName}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="employee" className="form-label">Employee:</label>
              <select id="employee" className="form-select" value={selectedEmployee} onChange={handleEmployeeChange}>
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="summaryDetail" className="form-label">Summary/Detail:</label>
              <select id="summaryDetail" className="form-select" value={selectedSummaryDetail} onChange={handleSummaryDetailChange}>
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
                {selectedSummaryDetail === 'summary' ? (
                  <>
                    <th className='table-header'>Employee Name</th>
                    <th className='table-header'>Attendance Status</th>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reportData.map((rowData, index) => (
                <tr key={index}>
                  {selectedSummaryDetail !== 'summary' && (
                    <>
                      <td>{selectedProject}</td>
                      <td>{rowData.groupName}</td>
                    </>
                  )}
                  <td>{rowData.empName}</td>
                  {selectedSummaryDetail !== 'summary' && salaryType === 'hourly' && (
                    <>
                      <td>{rowData.normalRate}</td>
                      <td>{rowData.overRate}</td>
                      <td>{rowData.rateAverage}</td>
                      <td>{rowData.amount}</td>
                    </>
                  )}
                  {selectedSummaryDetail !== 'summary' && salaryType === 'monthly' && (
                    <>
                      <td>{rowData.totalAttendanceDays}</td>
                      <td>{rowData.totalAbsentDays}</td>
                      <td>{rowData.monthlySalary}</td>
                      <td>{rowData.totalAmount}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
