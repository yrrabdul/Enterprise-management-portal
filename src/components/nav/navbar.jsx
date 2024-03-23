import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './navbar.css'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isNavbarOpen = true; 
  useEffect(() => {
    const linkColor = document.querySelectorAll('.nav_link');

    function colorLink() {
      linkColor.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    }

    linkColor.forEach((l) => l.addEventListener('click', colorLink));

    return () => {
      linkColor.forEach((l) => l.removeEventListener('click', colorLink));
    };
  }, []);
  return (
    <section>
      <div className="l-navbar show" id="nav-bar">
        <nav className="nav">
          <div>
            <Link to="/" className="nav_logo">
              <i className="bx bx-layer nav_logo-icon"> </i>
              <span className="nav_logo-name">AL-SYED</span>
            </Link>
            <div className="nav_list">
              <Link to="dashboard" className="nav_link active">
                <i className="fas fa-tachometer-alt" aria-hidden="true"></i>
                <span className="">Dashboard</span>
              </Link> 
              <Link to="projects" className="nav_link">
                <i className="fas fa-tasks" aria-hidden="true"></i>
                <span className="">Projects</span>
              </Link>
              <Link to="opening-balance" className="nav_link">
                <i className="fas fa-balance-scale" aria-hidden="true"></i>
                <span className="">Opening Balance</span>
              </Link>
              <Link to="owner" className="nav_link">
                <i className="fas fa-user-friends" aria-hidden="true"></i>
                <span className="">Owner/Partner</span>
              </Link>
              <Link to="customer" className="nav_link">
                <i className="fas fa-users" aria-hidden="true"></i>
                <span className="">Customer</span>
              </Link>
              <Link to="cash-flow" className="nav_link">
                <i className=" fas fa-money-bill-wave" aria-hidden="true"></i>
                <span className="">Cash Flow</span>
              </Link>
              <Link to="pruchase" className="nav_link">
                <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                <span className="">Purchase</span>
              </Link>
              <Link to="stock" className="nav_link">
                <i className="fas fa-boxes" aria-hidden="true"></i>
                <span className="">Stock</span>
              </Link>


                <Link to="employees" className="nav_link">
                  <i className="fas fa-users" aria-hidden="true"></i>
                  <span className="">Employee</span>
                </Link>
                
              <Link to="vehicle" className="nav_link">
                <i className="fas fa-car" aria-hidden="true"></i>
                <span className="">Vehicle</span>
              </Link>
              <Link to="machinery" className="nav_link">
                <i className="fas fa-cogs" aria-hidden="true"></i>
                <span className="">Machinery</span>
              </Link>
              <Link to="ledger" className="nav_link">
                <i className="fas fa-book" aria-hidden="true"></i>
                <span className="">Ledger</span>
              </Link>
              <Link to="documents" className="nav_link">
                <i className="fas fa-file" aria-hidden="true"></i>
                <span className="">Documents</span>
              </Link>
              <Link to="other-accounts" className="nav_link">
                <i className="fas fa-folder-open" aria-hidden="true"></i>
                <span className="">Other Accounts</span>
              </Link>
              <Link to="general-reports" className="nav_link">
                <i className="fas fa-chart-bar" aria-hidden="true"></i>
                <span className="">General Reports</span>
              </Link>
              <Link to="settings" className="nav_link">
                <i className="fas fa-cog" aria-hidden="true"></i>
                <span className="">Settings</span>
              </Link>
              
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
