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
  const [empData,setEmpData] = useState([])
  const [empAtten,setEmpAtten] = useState([])


  // Hardcoded dummy projects
  const dummyProjects = ['Project A', 'Project B', 'Project C'];


  useEffect(() => {
    fetchGroups();
    fetchEmployee();
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
    console.log(e.target.value)
    setSelectedEmployee(e.target.value);
  }

  // Function to handle form submission
  // const handleFetch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Make an HTTP request to your backend API for attendance data filtered by group name
  //     const response = await axios.get('http://localhost:5000/api/getAttendance', {
  //       params: {
  //         groupName: selectedGroup
  //       }
  //     });
  
  //     // Update the report data state with the fetched attendance data
  //     setReportData(response.data);
  //   } catch (error) {
  //     console.error('Error fetching report data:', error);
  //     // Handle error if needed
  //   }
  // };

  const handleFetch = async (e) => {
    e.preventDefault();
    try {
      // Make HTTP requests to fetch data from multiple endpoints simultaneously
      const [attendanceResponse, employeesResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/getAttendance', {
          params: {
            groupName: selectedGroup
          }
        }),
        axios.post('http://localhost:5000/api/getEmp',{emp:selectedEmployee})
      ]);
 
      // Extract data from responses
      const attendanceData = attendanceResponse.data;
      const employeesData = employeesResponse.data;

      // Update state with fetched data
      setEmpAtten(attendanceData);
      setEmpData(employeesData);
  
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error if needed
    }
  };
const handleFilter = () => {
  console.log("Here");
  if (empData[0]["salaryType"] === salaryType && empData[0]["groupName"] === selectedGroup) {
    console.log("empData", empData);
    let isData = empAtten.filter(f => f.empID === empData[0]["_id"] && f.employeeProject === selectedProject && f.attendanceStatus === "P");
    let isDataA = empAtten.filter(f => f.empID === empData[0]["_id"] && f.employeeProject === selectedProject && f.attendanceStatus === "A");
    console.log("isData", isData);
    console.log("isDataA:", isDataA);
    const countP = isData.length;
    console.log("Count of 'P' status:", countP);
    const countA = isDataA.length;
    console.log("Count of 'A' status: " , countA);

    // if (isData.length > 0) {
    //   const hours = isData.reduce((acc, cur) => {
    //     const { normalWorkingHours, overtimeWorkingHours } = cur;
    //     acc.totalNormal += normalWorkingHours;
    //     acc.totalOver += overtimeWorkingHours;
    //     return acc;
    //   }, { totalNormal: 0, totalOver: 0 });
    if (isData.length > 0) {
      const hours = isData.reduce((acc, cur) => {
          const { normalEndTime, normalStartTime, overtimeEndTime, overtimeStartTime } = cur;
  
          // Calculating the differences
          const normalHoursDifference = getTimeDifference(normalEndTime, normalStartTime);
          const overtimeHoursDifference = getTimeDifference(overtimeEndTime, overtimeStartTime);
  
          // Adding the differences to the accumulator
          acc.totalNormal += normalHoursDifference;
          acc.totalOver += overtimeHoursDifference;
  
          return acc;
      }, { totalNormal: 0, totalOver: 0 });

      const { totalNormal, totalOver } = hours;
      const { overRate, normalRate, monthlySalary} = empData[0];
      const mOneSalary = monthlySalary/20;
      console.log("moneSalary", mOneSalary);
      const deductSalary = mOneSalary * countA;
      console.log("deductSalary:",deductSalary);
      console.log("overRate: ", overRate);
      console.log("normalRate: ", normalRate);
      const obj = { ...hours, normSal: totalNormal * normalRate, overSal: totalOver * overRate, monthlySalary, countP, countA,deductSalary };

      console.log("object is: ",obj);
      setReportData([obj]);
    } else {
      setReportData([]);
    }
  } else {
    setReportData([]);
  }
}

// Function to calculate time difference
function getTimeDifference(endTime, startTime) {
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const [startHour, startMinute] = startTime.split(":").map(Number);

    const totalEndMinutes = endHour * 60 + endMinute;
    const totalStartMinutes = startHour * 60 + startMinute;

    return (totalEndMinutes - totalStartMinutes) / 60; // Converting minutes to hours
}

// console.log(empAtten,empData)
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
                <option key={employee.id} value={employee.empName}>
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
        <button onClick={() => handleFilter()}>Show Data</button>
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
                      <td>{selectedGroup}</td>
                    </>
                  )}
                  <td>{selectedEmployee}</td>
                  {selectedSummaryDetail !== 'summary' && salaryType === 'hourly' && (
                    <>
                      <td>{rowData.totalNormal}</td>
                      <td>{rowData.totalOver}</td>
                      <td>{(rowData.totalNormal+rowData.totalOver)/2}</td>
                      <td>{rowData.normSal+rowData.overSal}</td>
                    </>
                  )}
                  {selectedSummaryDetail !== 'summary' && salaryType === 'monthly' && (
                    <>
                      <td>{rowData.countP}</td>
                      <td>{rowData.countA}</td>
                      <td>{rowData.monthlySalary}</td>
                      <td>{rowData.monthlySalary-rowData.deductSalary}</td>
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

{/* <tbody>
              {reportData.map((rowData, index) => (
                <tr key={index}>
                  {selectedSummaryDetail !== 'summary' && rowData.groupName === selectedGroup && (
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
            </tbody> */}