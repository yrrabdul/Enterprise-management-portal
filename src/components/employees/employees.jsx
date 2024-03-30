import React, { useState, useEffect } from "react";
import "./employees.css";
import { Link } from "react-router-dom";

const Employees = () => {
  return (
    <>
      <div className="employees">
        <nav className="navbar navbar-dark bg-dark employees-nav">
          <a className="navbar-brand">
            <h4 className="nav-heading">Employees</h4>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Employees;
