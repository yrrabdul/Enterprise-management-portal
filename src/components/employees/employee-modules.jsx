import React, { useState, useEffect } from "react";
import "./employees.css";
import { Link } from "react-router-dom";

const EmployeeModules = () => {
  return (
    <>
      <section className="employee-features">
        <div className="container justify-content-center">
          <div className="row">
          <div className="col-lg-4 col-sm-6 col-md-4 employee-card">
              <Link to="/employees/employee-groups">
                <div className="card bg-light text-center">
                  <div className="card-body">
                    <i className="fas fa-user fa-3x mb-2"></i>
                    <h5 className="card-title">Employee Group</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-4 employee-card">
              <Link to="/employees/add-employee">
                <div className="card bg-light text-center">
                  <div className="card-body">
                    <i className="fas fa-user-plus fa-3x mb-2"></i>
                    <h5 className="card-title">Add Employee</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-4 employee-card">
              <Link to="/employees/employee-salary">
                <div className="card bg-light text-center">
                  <div className="card-body">
                    <i className="fas fa-money-bill fa-3x mb-2"></i>
                    <h5 className="card-title">Employee Salary/Rate</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-4 employee-card">
              <Link>
                <div className="card bg-light text-center">
                  <div className="card-body">
                    <i className="fas fa-tasks fa-3x mb-2"></i>
                    <h5 className="card-title">Assign Projects</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-4 employee-card">
              <Link>
                <div className="card bg-light text-center">
                  <div className="card-body">
                    <i className="fas fa-calendar-check fa-3x mb-2"></i>
                    <h5 className="card-title">Employee Attendance</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-sm-6 col-md-4 employee-card">
              <Link>
                <div className="card bg-light text-center">
                  <div className="card-body">
                    <i className="fas fa-chart-bar fa-3x mb-2"></i>
                    <h5 className="card-title">Employee Reports</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmployeeModules;
