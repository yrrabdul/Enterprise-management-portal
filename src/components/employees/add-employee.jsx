import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './add-employee.css';

const AddEmployeePage = () => {
    const [salaryType, setSalaryType] = useState('monthly');
    const [groups, setGroups] = useState([]);
    const [activeStatus, setActiveStatus] = useState('Active');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getgroups');
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleSalaryTypeChange = (e) => {
        setSalaryType(e.target.value);
    };

    const handleEdit = () => {
        setSelectedStatus(activeStatus);
        setIsEditing(true);
    };

    const handleSave = () => {
        setActiveStatus(selectedStatus);
        setIsEditing(false);
    };

    const handleRadioChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    return (
        <section className='add-employee-main'>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-6">
                        <h2>Add Employee</h2>
                        {/* Your existing code */}
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Personal Info</h5>
                            </div>
                        </div>
                        <div className="input-group mb-4">
                            <input type="text" className="form-control" placeholder="Name"/>
                            <input type="text" className="form-control" placeholder="Father's Name" />
                        </div>
                        <div className="input-group mb-4">
                            <input type="text" className="form-control" placeholder="CNIC Number" />
                            <input type="text" className="form-control" placeholder="Contact Number" />
                        </div>
                        <div className="input-group mb-4">
                            <input type="text" className="form-control" placeholder="Reference Name" />
                            <input type="text" className="form-control" placeholder="Reference Number" />
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Select Group</h5>
                            </div>
                        </div>
                        <select className="form-select mb-3">
                            <option>Select Group</option>
                            {groups.map(group => (
                                <option key={group._id} value={group.groupName}>{group.groupName}</option>
                            ))}
                        </select>
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Salary Method</h5>
                            </div>
                        </div>
                        <select className="form-select mb-3" onChange={handleSalaryTypeChange} value={salaryType}>
                            <option value="monthly">Monthly Salary</option>
                            <option value="hourly">Per Hour Rate</option>
                        </select>
                        {salaryType === 'monthly' && (
                            <div className="input-group mb-4">
                                <input type="text" className="form-control" placeholder="Monthly Salary" />
                            </div>
                        )}
                        {salaryType === 'hourly' && (
                            <div className="input-group mb-4">
                                <input type="text" className="form-control" placeholder="Normal Rate" />
                                <input type="text" className="form-control" placeholder="Over Time Rate" />
                            </div>
                        )}
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Add Picture</h5>
                            </div>
                        </div>
                        <div className="input-group mb-4">
                            <input type="file" className="form-control" id="pictureUpload" accept="image/*" />
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <h5>Add Documents</h5>
                            </div>
                        </div>
                        <div className="input-group mb-4">
                            <input type="file" className="form-control" id="fileUpload" />
                        </div>
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <h2>All Employees</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Code #</th>
                                    <th>Name</th>
                                    <th>Contact Number</th>
                                    <th>Group</th>
                                    <th>Salary/Rate</th>
                                    <th>Picture</th>
                                    <th>Active/Non-Active</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>0302-0000212</td>
                                    <td>painting</td>
                                    <td>2000euro</td>
                                    <td>JanePic.png</td>
                                    <td>
                                        {isEditing ? (
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="activeRadio"
                                                    name="activeStatus"
                                                    value="Active"
                                                    checked={selectedStatus === 'Active'}
                                                    onChange={handleRadioChange}
                                                />
                                                <label className="form-check-label" htmlFor="activeRadio">Active</label>
                                                <br />
                                                <input
                                                    type="radio"
                                                    id="nonActiveRadio"
                                                    name="activeStatus"
                                                    value="Non-Active"
                                                    checked={selectedStatus === 'Non-Active'}
                                                    onChange={handleRadioChange}
                                                />
                                                <label className="form-check-label" htmlFor="nonActiveRadio">Non-Active</label>
                                                <br />
                                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                                            </div>
                                        ) : (
                                            <div>
                                                {activeStatus}
                                                <button className="btn btn-info mt-2" onClick={handleEdit}>Edit</button>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-warning">Edit</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddEmployeePage;
