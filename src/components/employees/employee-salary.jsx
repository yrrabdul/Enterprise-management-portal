import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './employee-salary.css';

const EmployeeSalaryPage = () => {
    const [salaryType, setSalaryType] = useState('monthly');
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [employees, setEmployees] = useState([]);
    const [editEmployeeId, setEditEmployeeId] = useState(null);
    const [editNormalRateId, setEditNormalRateId] = useState(null);
    const [editOverRateId, setEditOverRateId] = useState(null);
    const [editedNormalRate, setEditedNormalRate] = useState('');
    const [editedOverRate, setEditedOverRate] = useState('');  
    const [monthlySalary, setMonthlySalary] = useState('');

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
   // for updating monthly Salary
    const handleEditSalary = async (id, newMonthlySalary) => {
        try {
            await axios.put(`http://localhost:5000/api/updateMonthly/${id}`, { monthlySalary: newMonthlySalary });
            const updatedEmployees = employees.map(employee => {
                if (employee._id === id) {
                    return { ...employee, monthlySalary: newMonthlySalary };
                }
                return employee;
            });
            setEmployees(updatedEmployees);
            setEditEmployeeId(null); // Close edit mode after successful update
        } catch (error) {
            console.error('Error updating employee salary:', error);
        }
    };

    // Function to handle editing normal rate salary
    const handleEditNormalRateSalary = async (id, newNormalRate) => {
        try {
            await axios.put(`http://localhost:5000/api/updateNormalRate/${id}`, { normalRate: newNormalRate });
            const updatedEmployees = employees.map(employee => {
                if (employee._id === id) {
                    return { ...employee, normalRate: newNormalRate };
                }
                return employee;
            });
            setEmployees(updatedEmployees);
            setEditNormalRateId(null); // Close edit mode after successful update
        } catch (error) {
            console.error('Error updating employee salary:', error);
        }
    };

    // Function to handle editing over rate salary
    const handleEditOverRateSalary = async (id, newOverRate) => {
        try {
            await axios.put(`http://localhost:5000/api/updateOverRate/${id}`, { overRate: newOverRate });
            const updatedEmployees = employees.map(employee => {
                if (employee._id === id) {
                    return { ...employee, overRate: newOverRate };
                }
                return employee;
            });
            setEmployees(updatedEmployees);
            setEditOverRateId(null); // Close edit mode after successful update
        } catch (error) {
            console.error('Error updating employee salary:', error);
        }
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
                                                <td>
                                                {editNormalRateId === employee._id ? (
                                                    <div>
                                                        <input 
                                                            type="text" 
                                                            defaultValue={employee.normalRate} 
                                                            onChange={(e) => setEditedNormalRate(e.target.value)} 
                                                        />
                                                        <button onClick={() => handleEditNormalRateSalary(employee._id, editedNormalRate)}>Save</button>
                                                        <button onClick={() => setEditNormalRateId(null)}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {employee.normalRate}
                                                        <button 
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => setEditNormalRateId(employee._id)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                {editOverRateId === employee._id ? (
                                                    <div>
                                                        <input 
                                                            type="text" 
                                                            defaultValue={employee.overRate} 
                                                            onChange={(e) => setEditedOverRate(e.target.value)} 
                                                        />
                                                        <button onClick={() => handleEditOverRateSalary(employee._id, editedOverRate)}>Save</button>
                                                        <button onClick={() => setEditOverRateId(null)}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {employee.overRate}
                                                        <button 
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() => setEditOverRateId(employee._id)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                                
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
                                                <td>
                                                {editEmployeeId === employee._id ? (
                                                    <div>
                                                    <input 
                                                        type="text" 
                                                        defaultValue={employee.monthlySalary} 
                                                        onChange={(e) => setMonthlySalary(e.target.value)} 
                                                    />
                                                    <button onClick={() => handleEditSalary(employee._id, monthlySalary)}>Save</button>
                                                    <button onClick={() => setEditEmployeeId(null)}>Cancel</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                    {employee.monthlySalary}
                                                    <button 
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => setEditEmployeeId(employee._id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    </>
                                                )}
                                                </td>

                                                {/* <td>{employee.monthlySalary}<button className="btn btn-sm btn-primary"onClick={() => handleEditSalary(employee._id, employee.monthlySalary)}>Edit</button></td> */}
                                            </tr>
                                        );
                                    }
                                }
                                return null; 
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

