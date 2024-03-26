import React, { useState, useEffect } from 'react';
import './employee-issue.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios'; // Import axios for making HTTP requests

const EmployeeIssue = () => {
  // State variables
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [employees, setEmployees] = useState([]); // State to store fetched employees
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility

  // Dummy project names
  const dummyProjects = ['Project A', 'Project B', 'Project C'];

  // Fetch employees from the database
  useEffect(() => {
    const fetchEmployees = async () => {
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

    fetchEmployees();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/addissue', {
        selectedProjects,
        selectedEmployee,
        startDate,
        endDate
      });
      console.log('Issue added:', response.data);
      // Reset form fields
      setSelectedProjects([]);
      setSelectedEmployee('');
      setStartDate('');
      setEndDate('');
      // Show alert upon successful submission
      setShowAlert(true);
      // Hide alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding issue:', error);
    }
  };

  // Handle project checkbox change
  const handleProjectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedProjects([...selectedProjects, value]);
    } else {
      setSelectedProjects(selectedProjects.filter(project => project !== value));
    }
  };

  return (
    <div className='container issue-main'>
      <div className='issue-submain'>
        <h2>Employee Issue</h2>
        {showAlert && (
          <div className='alert alert-success' role='alert'>
            Project assigned successfully!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-4'>
            <label>Select Projects:</label>
            <div>
              {dummyProjects.map((project, index) => (
                <div key={index} className='form-check'>
                  <input
                    type='checkbox'
                    id={`project-${index}`}
                    className='form-check-input'
                    value={project}
                    checked={selectedProjects.includes(project)}
                    onChange={handleProjectChange}
                  />
                  <label htmlFor={`project-${index}`} className='form-check-label'>
                    {project}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='employee'>Select Employee:</label>
            <select id='employee' className='form-select select-dropdown mb-4' value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
              <option value=''>Select Employee</option>
              {/* Map over employees array to populate dropdown */}
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='start-date'>Start Date:</label>
            <input type='date' id='start-date' className='form-control mb-4' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className='form-group'>
            <label htmlFor='end-date'>End Date:</label>
            <input type='date' id='end-date' className='form-control mb-4' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button type='submit' className='btn mb-4'>
            Assign Project
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default EmployeeIssue;
