import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './add-employee.css';

const AddEmployeePage = () => {
    const [salaryType, setSalaryType] = useState('monthly');
    const [groups, setGroups] = useState([]);
    const [formData, setFormData] = useState({
        empName: '',
        fatherName: '',
        cnic: '',
        contactNumber: '',
        referenceName: '',
        referenceNumber: '',
        empID: '',
        groupName: '',
        salaryType: 'monthly',
        monthlySalary: '',
        normalRate: '',
        overRate: '',
        picture: null,
        document: null
    });
    const [activeStatus, setActiveStatus] = useState('Active');
    const [isEditing, setIsEditing] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [employees, setEmployees] = useState([]);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editingEmployeeID, setEditingEmployeeID] = useState(null);



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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //convert image to base64
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result;
                console.log('Base64 image:', base64Image);
                setFormData({ ...formData, [e.target.name]: base64Image });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSalaryTypeChange = (e) => {
        setSalaryType(e.target.value);
        setFormData({ ...formData, salaryType: e.target.value });
    };

    //save in database 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const formDataWithFiles = new FormData();
        // Append fields with non-empty values to formDataWithFiles
        for (const key in formData) {
            // Check if the field has a non-empty value
            if (formData[key] !== '' && formData[key] !== null) {
                formDataWithFiles.append(key, formData[key]);
            }
        }  
        // Convert formDataWithFiles to JSON format
        const formDataJSON = {};
        for (const [key, value] of formDataWithFiles.entries()) {
            formDataJSON[key] = value;
        }
        console.log(formDataJSON);    
        try {
            await axios.post('http://localhost:5000/api/addemployee', formDataJSON);
            // Reset form data after successful submission
            setFormData({
                empName: '',
                fatherName: '',
                cnic: '',
                contactNumber: '',
                referenceName: '',
                referenceNumber: '',
                empID: '',
                groupName: '',
                salaryType: 'monthly',
                monthlySalary: '',
                normalRate: '',
                overRate: '',
                picture: null,
                document: null
            });
            alert('Employee added successfully');
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('Error adding employee');
        }
    };
      
    const handleEdit = (employee, index) => {
        setSelectedStatus(employee.active);
        setEditRowIndex(index);
    };

    const handleEditRow = (employee) => {
        setEditingEmployeeID(employee._id);
        // Populate the form fields with the data of the selected employee
        setFormData({
            empName: employee.empName,
            fatherName: employee.fatherName,
            cnic: employee.cnic,
            contactNumber: employee.contactNumber,
            referenceName: employee.referenceName,
            referenceNumber: employee.referenceNumber,
            empID: employee.empID,
            groupName: employee.groupName,
            salaryType: employee.salaryType,
            monthlySalary: employee.monthlySalary,
            normalRate: employee.normalRate,
            overRate: employee.overRate,
            picture: employee.picture,
            document: employee.document
        });

    };

    const handleSave = async (employee) => {
        try {
            const updatedEmployee = { ...employee, active: selectedStatus };
            await axios.put(`http://localhost:5000/api/updateactive/${employee._id}`, updatedEmployee);
            setEditRowIndex(null);
            fetchEmployees();
            alert('Employee status updated successfully');
        } catch (error) {
            console.error('Error updating employee status:', error);
            alert('Error updating employee status');
        }
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
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <h5>Personal Info</h5>
                                </div>
                            </div>
                            <div className="input-group mb-4">
                                <input type="text" className="form-control" name="empName" placeholder="Name" value={formData.empName} onChange={handleInputChange} />
                                <input type="text" className="form-control" name="fatherName" placeholder="Father's Name" value={formData.fatherName} onChange={handleInputChange} />
                            </div>
                            <div className="input-group mb-4">
                                <input type="text" className="form-control" name="cnic" placeholder="CNIC Number" value={formData.cnic} onChange={handleInputChange} />
                                <input type="text" className="form-control" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleInputChange} />
                            </div>
                            <div className="input-group mb-4">
                                <input type="text" className="form-control" name="referenceName" placeholder="Reference Name" value={formData.referenceName} onChange={handleInputChange} />
                                <input type="text" className="form-control" name="referenceNumber" placeholder="Reference Number" value={formData.referenceNumber} onChange={handleInputChange} />
                            </div>
                            <div className="input-group mb-4">
                                <input type="text" className="form-control" name="empID" placeholder="Employee ID" value={formData.empID} onChange={handleInputChange} />
                            </div>
                            <div className="row mb-4">
                            <div className="col">
                                <h5>Select Group</h5>
                            </div>
                            </div>
                            <select className="form-select mb-3" name="groupName" value={formData.groupName} onChange={handleInputChange}>
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
                                    <input type="text" className="form-control" name="monthlySalary" placeholder="Monthly Salary" value={formData.monthlySalary} onChange={handleInputChange} />
                                </div>
                            )}
                            {salaryType === 'hourly' && (
                                <div className="input-group mb-4">
                                    <input type="text" className="form-control" name="normalRate" placeholder="Normal Rate" value={formData.normalRate} onChange={handleInputChange} />
                                    <input type="text" className="form-control" name="overRate" placeholder="Over Time Rate" value={formData.overRate} onChange={handleInputChange} />
                                </div>
				 )}
                            <div className="row mb-4">
                                <div className="col">
                                    <h5>Add Picture</h5>
                                </div>
                            </div>
                            <div className="input-group mb-4">
                                <input type="file" className="form-control" name="picture" id="pictureUpload" accept="image/*" onChange={handleFileChange} />
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <h5>Add Documents</h5>
                                </div>
                            </div>
                            <div className="input-group mb-4">
                                <input type="file" className="form-control" name="document" id="fileUpload" onChange={handleFileChange} />
                            </div>
                            <button type="submit" className="btn btn">Save</button>
                        </form>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-6 col-lg-12 col-sm-4">
                        <h2>All Employees</h2>
                        <table className="table add-employee-table table-striped ">
                            <thead>
                                <tr>
                                    <th className='table-header'>Code #</th>
                                    <th className='table-header'>Name</th>
                                    <th className='table-header'>Contact Number</th>
                                    <th className='table-header'>Group</th>
                                    <th className='table-header'>Salary/Rate</th>
                                    <th className='table-header'>Picture</th>
                                    <th className='table-header'>Active/Non-Active</th>
                                    <th className='table-header'>Edit</th>
                                    <th className='table-header'>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={employee.empID}>
                                        <td>{employee.empID}</td>
                                        <td>{employee.empName}</td>
                                        <td>{employee.contactNumber}</td>
                                        <td>{employee.groupName}</td>
                                        <td>{employee.salaryType === 'monthly' ? `€ ${employee.monthlySalary}` : `€ ${employee.normalRate}/hr`}</td>
                                        <td>
                                            {employee.picture && typeof employee.picture === 'string' && employee.picture.startsWith('data:image') ? (
                                                <img src={employee.picture} alt="Employee" style={{ maxWidth: '100px' }} />
                                            ) : (
                                                <span>No Image</span>
                                            )}
                                        </td>
                                        <td>
                                            {editRowIndex === index ? (
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
                                                    <button className="btn" onClick={() => handleSave(employee)}>Save</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    {employee.active} <button className="btn btn-info mt-2" onClick={() => handleEdit(employee, index)}>Edit</button>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn btn" onClick={() => handleEditRow(employee)}>Edit</button>
                                        </td>
                                        <td>
                                            <button className="btn btn">Delete</button>
                                        </td>
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

export default AddEmployeePage;