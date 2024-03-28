import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [groups, setGroups] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Hardcoded dummy projects
  const dummyProjects = ['Project A', 'Project B', 'Project C'];


  useEffect(() => {
    fetchGroups();
    fetchEmployee();
  }, []);

  // Function to handle form submission
  // const handleFetch = (e) => {
  //   e.preventDefault();
  //   // Logic to fetch report data based on selected criteria
  //   console.log('Fetching report data');
  // };

  // Function to fetch group names
  const fetchGroups = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/getgroups');
    setGroups(response.data);
  } catch (error) {
    console.error('Error fetching groups:', error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getemployees');
      
      // Extracting only empName and empID from the response data
      const simplifiedEmployees = response.data.map(employee => ({
        id: employee._id,
        name: employee.empName
      }));

      // Set the fetched employees to state
      setEmployees(simplifiedEmployees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      // Handle error if needed
    }
  };

  // Handle group selection change
 const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
  };

  // Handle project selection change
  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };
  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  }

  // Function to handle form submission
const handleFetch = async (e) => {
  e.preventDefault();
  try {
    // Make an HTTP request to your backend API
    const response = await axios.get('http://localhost:5000/api/getemployees', {
      params: {
        salaryType: salaryType,
        employeeName: selectedEmployee
      }
    });

    // Update the report data state with the fetched data
    setReportData(response.data);
  } catch (error) {
    console.error('Error fetching report data:', error);
    // Handle error if needed
  }
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
              <select id="project" className="form-select" value={selectedProject} onChange={handleProjectChange}>
                <option value="">Select Project</option>
                {dummyProjects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
                {/* Options for selecting project */}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="group" className="form-label">Group:</label>
              <select id="group" className="form-select" value={selectedGroup} onChange={handleGroupChange}>
                <option value="">Select Group</option>
                {groups.map(group => (
                  <option key={group._id} value={group.groupName}>{group.groupName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
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
