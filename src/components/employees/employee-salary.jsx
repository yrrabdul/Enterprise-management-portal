// employee-salary.jsx

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
    }, []);

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
            const response = await axios.get('http://localhost:5000/api/getemployees');
            setEmployees(response.data);
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

    // Dummy entry for monthly salary table
    const monthlyDummyEntry = {
        code: 1,
        name: 'John Doe',
        groupName: 'Engineering',
        salary: '$5000'
    };

    // Dummy entry for hourly salary table
    const hourlyDummyEntry = {
        code: 2,
        name: 'Jane Smith',
        groupName: 'Sales',
        normalRate: '$20/hour',
        overTimeRate: '$30/hour'
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
                    <div className="col-md-12">
                        {salaryType === 'monthly' && (
                            <h2>Employee Salary Table (Monthly)</h2>
                        )}
                        {salaryType === 'hourly' && (
                            <h2>Employee Salary Table (Hourly)</h2>
                        )}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Code #</th>
                                    <th>Name</th>
                                    <th>Group Name</th>
                                    {salaryType === 'monthly' && <th>Salary</th>}
                                    {salaryType === 'hourly' && (
                                        <>
                                            <th>Normal Rate</th>
                                            <th>Over Time Rate</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{salaryType === 'monthly' ? monthlyDummyEntry.code : hourlyDummyEntry.code}</td>
                                    <td>{salaryType === 'monthly' ? monthlyDummyEntry.name : hourlyDummyEntry.name}</td>
                                    <td>{salaryType === 'monthly' ? monthlyDummyEntry.groupName : hourlyDummyEntry.groupName}</td>
                                    {salaryType === 'monthly' && <td>{monthlyDummyEntry.salary}</td>}
                                    {salaryType === 'hourly' && (
                                        <>
                                            <td>{hourlyDummyEntry.normalRate}</td>
                                            <td>{hourlyDummyEntry.overTimeRate}</td>
                                        </>
                                    )}
                                </tr>
                                {employees.map(employee => (
                                    <tr key={employee.code}>
                                        <td>{employee.code}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.groupName}</td>
                                        {salaryType === 'monthly' && <td>{employee.salary}</td>}
                                        {salaryType === 'hourly' && (
                                            <>
                                                <td>{employee.normalRate}</td>
                                                <td>{employee.overTimeRate}</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmployeeSalaryPage;
