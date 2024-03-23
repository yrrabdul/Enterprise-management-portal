import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from './components/nav/navbar';
import CashFlow from './components/cash-flow/cash-flow';
import Customer from './components/customer/customer';
import Dashboard from './components/dashboard/dashboard';
import Documents from './components/documents/documents';
import Employees from './components/employees/employees';
import EmployeeModules from './components/employees/employee-modules';
import GeneralReports from './components/general-reports/general-reports';
import Ledger from './components/ledger/ledger';
import Machinery from './components/machinery/machinery';
import OpeningBalance from './components/opening-balance/opening-balance';
import OtherAccounts from './components/other-accounts/other-accounts';
import Owner from './components/owner/owner';
import Projects from './components/projects/projects';
import Purchase from './components/purchase/purchase';
import Settings from './components/settings/settings';
import Stock from './components/stock/stock';
import Vehicle from './components/vehicle/vehicle';
import EmployeeGroups from './components/employees/employee-groups';
import AddEmployeePage from './components/employees/add-employee';


// New Component to combine Employees and EmployeeModules
const EmployeeMain = () => {
  return (
    <>
      <Employees />
      <EmployeeModules />
    </>
  );
};

// New Component to combine Employees and EmployeeGroups
const EmployeeGrps = () => {
  return (
    <>
      <Employees />
      <EmployeeGroups />
    </>
  );
};

// New Component to combine Employees and AddEmployeePage
const AddEmployee = () => {
  return (
    <>
      <Employees />
      <AddEmployeePage />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/opening-balance" element={<OpeningBalance />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/cash-flow" element={<CashFlow />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/employees" element={<EmployeeMain />} />
        <Route path="/employees/employee-groups" element={<EmployeeGrps />} />
        <Route path="/employees/add-employee" element={<AddEmployee />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/general-reports" element={<GeneralReports />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/vehicle" element={<Vehicle />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/machinery" element={<Machinery />} />
        <Route path="/other-accounts" element={<OtherAccounts />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

