import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employee-salary.css';

const EmployeeSalaryPage = () => {
    const [salaryType, setSalaryType] = useState('monthly');
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchGroups();
        fetchEmployees();
    }, [salaryType, selectedGroup]);

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getgroups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getemployees', {
                params: {
                    salaryType: salaryType ,
                    groupName: selectedGroup
                }
            });
            setEmployees(response.data)
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSalaryTypeChange = (e) => {
        setSalaryType(e.target.value);
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value);
    };

    return (
        <section className='employee-salary-main'>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h2>Employee Salary</h2>
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Select Salary/Rate</h5>
                            </div>
                        </div>
                        <select className="form-select mb-3" onChange={handleSalaryTypeChange} value={salaryType}>
                            <option value="monthly">Monthly Salary</option>
                            <option value="hourly">Per Hour Rate</option>
                        </select>
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Select Group/All Groups</h5>
                            </div>
                        </div>
                        <select className="form-select mb-3" onChange={handleGroupChange} value={selectedGroup}>
                            <option value="all">All Groups</option>
                            {groups.map(group => (
                                <option key={group._id} value={group.groupName}>{group.groupName}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12 col-md-6 col-sm-4">
                        <h2>Employee Salary Table ({salaryType === 'monthly' ? 'Monthly' : 'Hourly'})</h2>
                        <table className="table salary-table table-striped">
                            <thead>
                                <tr>
                                    <th className='table-header'>Code #</th>
                                    <th className='table-header'>Name</th>
                                    <th className='table-header'>Group Name</th>
                                    {salaryType === 'monthly' && <th className='table-header'>Salary</th>}
                                    {salaryType === 'hourly' && (
                                        <>
                                            <th className='table-header'>Normal Rate</th>
                                            <th className='table-header'>Over Time Rate</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                            {employees.map(employee => {
                                // Check if salaryType is 'hourly' and both normalRate and overRate are not null or empty
                                if (salaryType === 'hourly' && employee.normalRate && employee.overRate) {
                                    // Check if the employee's group name matches the selected group
                                    if (selectedGroup === 'all' || employee.groupName === selectedGroup) {
                                        return (
                                            <tr key={employee.empID}>
                                                <td>{employee.empID}</td>
                                                <td>{employee.empName}</td>
                                                <td>{employee.groupName}</td>
                                                <td>{employee.normalRate}  <button className="btn btn-sm">Edit</button></td>
                                                <td>{employee.overRate} <button className="btn btn-sm">Edit</button></td>
                                            </tr>
                                        );
                                    }
                                }
                                // Check if salaryType is 'monthly' and monthlySalary is not null or empty
                                else if (salaryType === 'monthly' && employee.monthlySalary) {
                                    // Check if the employee's group name matches the selected group
                                    if (selectedGroup === 'all' || employee.groupName === selectedGroup) {
                                        return (
                                            <tr key={employee.empID}>
                                                <td>{employee.empID}</td>
                                                <td>{employee.empName}</td>
                                                <td>{employee.groupName}</td>
                                                <td>{employee.monthlySalary}<button className="btn btn-sm btn-primary">Edit</button></td>
                                            </tr>
                                        );
                                    }
                                }
                                return null; // Don't render anything if conditions are not met
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmployeeSalaryPage;

