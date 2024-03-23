import React, { useState } from 'react';
import './add-employee.css';

const AddEmployeePage = () => {
    return (
      <section className='add-employee-main'>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-6">
              <h2>Add Employee</h2>
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
              <select className="form-select mb-3">
                <option>Select Group</option>
                {/* Populate options dynamically with available groups */}
              </select>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" value="" id="activeCheck" />
                <label className="form-check-label" htmlFor="activeCheck">
                  Active
                </label>
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" value="" id="nonActiveCheck" />
                <label className="form-check-label" htmlFor="nonActiveCheck">
                  Non-Active
                </label>
              </div>
              <select className="form-select mb-3">
                <option>Select Salary Type</option>
                <option>Monthly Salary</option>
                <option>Per Hour Rate</option>
              </select>
              {/* Show these options based on salary type selection */}
              <div className="input-group mb-4">
                <input type="text" className="form-control" placeholder="Normal Rate" />
                <input type="text" className="form-control" placeholder="Over Time Rate" />
              </div>
              {/* File upload section */}
              <div className="input-group mb-4">
                <input type="file" className="form-control" id="fileUpload" />
              </div>
              <button className="btn btn-primary">Save</button>
              <button className="btn btn-warning">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
          {/* Table to display employees */}
          <div className="row mt-4">
            <div className="col-md-12">
              <h2>All Employees</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Code #</th>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>CNIC Number</th>
                    <th>Contact Number</th>
                    <th>Reference Name</th>
                    <th>Reference Number</th>
                    <th>Active/Non-Active</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Populate table rows dynamically with employee data */}
                  <tr>
                    <td>1</td>
                    <td>John Doe</td>
                    <td>Michael Doe</td>
                    <td>12345-6789012-3</td>
                    <td>1234567890</td>
                    <td>Jane Doe</td>
                    <td>0987654321</td>
                    <td>Active</td>
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
  