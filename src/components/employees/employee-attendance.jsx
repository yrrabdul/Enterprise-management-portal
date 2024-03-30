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
  const [groups, setGroups] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

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
      const response = await axios.get('http://localhost:5000/api/getemployees');
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

  // Function to handle input change and update the attendanceData state
  const handleInputChange = (employeeId, employeeName, employeeData, field, value) => {
    const index = attendanceData.findIndex(data => data.employeeId === employeeId);
  
    if (index === -1) {
      setAttendanceData(prevData => [
        ...prevData,
        { employeeId, employeeName, ...employeeData, [field]: value }
      ]);
    } else {
      setAttendanceData(prevData => {
        const newData = [...prevData];
        newData[index][field] = value;
        // Update other generic data fields
        Object.assign(newData[index], employeeData);
        return newData;
      });
    }
  };
  

  // Handle submission of attendance data
  const handleAttendanceSubmit = async () => {
    try {
      // Iterate through attendanceData and send attendance data for each employee
      for (const data of attendanceData) {
        const rowData = {
          date: selectedDate,
          empID: data.employeeId,
          empName: data.employeeName,
          groupName: selectedGroup,
          employeeProject: selectedProject,
          attendanceStatus: data.attendanceStatus,
          normalStartTime: data.normalStartTime,
          normalEndTime: data.normalEndTime,
          overtimeStartTime: data.overtimeStartTime,
<<<<<<< HEAD
=======
<<<<<<< Updated upstream
          overtimeEndTime: data.overtimeEndTime
=======
>>>>>>> 5c3b08ee6f3d656a255ee1c31203ff6208a9271d
          overtimeEndTime: data.overtimeEndTime,
          monthlySalary:data.monthlySalary,
          overRate:data.overRate,
          normalRate:data.normalRate

<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> 5c3b08ee6f3d656a255ee1c31203ff6208a9271d
        };

        // Make POST request to save attendance data for the current row
        await axios.post('http://localhost:5000/api/saveAttendance', rowData);
      }
      
      // Display success message
      alert('Attendance data saved successfully');
    } catch (error) {
      console.error('Error saving attendance data:', error);
      alert('Failed to save attendance data');
    }
     // Clear attendanceData state after successful save
     setAttendanceData([]);
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
                <th className='table-header'>Employee ID</th>
                <th className='table-header'>Group Name</th>
                <th className='table-header'>Project</th>
                {salaryType === 'hourly' && (
                  <>
                    <th className='table-header'>Normal Start Time</th>
                    <th className='table-header'>Normal End Time</th>
                    <th className='table-header'>Overtime Start Time</th>
                    <th className='table-header'>Overtime End Time</th>
                  </>
                )}
                <th className='table-header'>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
  {employees.map(employee => {
    const isGroupMatch = employee.groupName === selectedGroup;
    const isProjectMatch = employee.projects.includes(selectedProject);
    const isSalaryTypeMatch = employee.salaryType === salaryType;
<<<<<<< HEAD

    if (isGroupMatch && isProjectMatch && isSalaryTypeMatch) {
      return (
        <tr key={employee._id}>
          <td>{employee.empID}</td>
          <td>{employee.groupName}</td>
          <td>{selectedProject}</td>
          {salaryType === 'hourly' && (
            <>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'normalStartTime', e.target.value)} /></td>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'normalEndTime', e.target.value)} /></td>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'overtimeStartTime', e.target.value)} /></td>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'overtimeEndTime', e.target.value)} /></td>
            </>
          )}
          <td>
            <div>
              <label>
                <input
                  type="radio"
                  name={`attendance_${employee.empID}`}
                  value="P"
                  onChange={(e) => handleInputChange(employee.empID, employee.empName, { monthlySalary: employee.monthlySalary }, 'attendanceStatus', e.target.value)}
                />
                Present
              </label>
              <label>
                <input
                  type="radio"
                  name={`attendance_${employee.empID}`}
                  value="A"
                  onChange={(e) => handleInputChange(employee.empID, employee.empName, { monthlySalary: employee.monthlySalary }, 'attendanceStatus', e.target.value)}
                />
                Absent
              </label>
            </div>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  })}
</tbody>

=======

    if (isGroupMatch && isProjectMatch && isSalaryTypeMatch) {
      return (
        <tr key={employee._id}>
          <td>{employee.empID}</td>
          <td>{employee.groupName}</td>
          <td>{selectedProject}</td>
          {salaryType === 'hourly' && (
            <>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'normalStartTime', e.target.value)} /></td>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'normalEndTime', e.target.value)} /></td>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'overtimeStartTime', e.target.value)} /></td>
              <td><input type="time" onChange={(e) => handleInputChange(employee.empID, employee.empName, { normalRate: employee.normalRate, overRate: employee.overRate }, 'overtimeEndTime', e.target.value)} /></td>
            </>
          )}
          <td>
            <div>
              <label>
                <input
                  type="radio"
                  name={`attendance_${employee.empID}`}
                  value="P"
                  onChange={(e) => handleInputChange(employee.empID, employee.empName, { monthlySalary: employee.monthlySalary }, 'attendanceStatus', e.target.value)}
                />
                Present
              </label>
              <label>
                <input
                  type="radio"
                  name={`attendance_${employee.empID}`}
                  value="A"
                  onChange={(e) => handleInputChange(employee.empID, employee.empName, { monthlySalary: employee.monthlySalary }, 'attendanceStatus', e.target.value)}
                />
                Absent
              </label>
            </div>
          </td>
        </tr>
      );
    } else {
      return null;
    }
  })}
</tbody>

<<<<<<< Updated upstream
                if (isGroupMatch && isProjectMatch && isSalaryTypeMatch) {
                  return (
                    <tr key={employee._id}>
                      <td>{employee.empID}</td>
                      <td>{employee.empName}</td>
                      <td>{employee.groupName}</td>
                      <td>{selectedProject}</td>
                      {salaryType === 'hourly' && (
                        <>
                          <td><input type="time" onChange={(e) => handleInputChange(employee._id, 'normalStartTime', e.target.value)} /></td>
                          <td><input type="time" onChange={(e) => handleInputChange(employee._id, 'normalEndTime', e.target.value)} /></td>
                          <td><input type="time" onChange={(e) => handleInputChange(employee._id, 'overtimeStartTime', e.target.value)} /></td>
                          <td><input type="time" onChange={(e) => handleInputChange(employee._id, 'overtimeEndTime', e.target.value)} /></td>
                        </>
                      )}
                      <td>
                        <div>
                          <label>
                            <input
                              type="radio"
                              name={`attendance_${employee._id}`}
                              value="P"
                              onChange={(e) => handleInputChange(employee._id, 'attendanceStatus', e.target.value)}
                            />
                            Present
                          </label>
                          <label>
                            <input
                              type="radio"
                              name={`attendance_${employee._id}`}
                              value="A"
                              onChange={(e) => handleInputChange(employee._id, 'attendanceStatus', e.target.value)}
                            />
                            Absent
                          </label>
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
=======
>>>>>>> Stashed changes
>>>>>>> 5c3b08ee6f3d656a255ee1c31203ff6208a9271d
          </table>
          <div className="mb-3">
            <button onClick={handleAttendanceSubmit} className="btn btn-primary">Submit Attendance</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance;
