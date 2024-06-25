import React, { useState } from 'react';

const EmployeeList = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter((employee) =>
    `${employee.cin} `.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyles = {
    maxWidth: '1120px',
    margin: 'auto',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  };

  const inputStyles = {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    maxHeight: '400px',
    overflowY: 'auto',
  };

  const cardStyles = {
    padding: '16px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={containerStyles}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Employees</h2>
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyles}
      />
      <div style={gridStyles}>
        {filteredEmployees.map((employee) => (
          <div key={employee.id} style={{ ...cardStyles, cursor: 'pointer' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{employee.firstName} {employee.lastName}</h3>
            <p style={{ color: '#374151' }}>Username: {employee.userName}</p>
            <p style={{ color: '#374151' }}>Email: {employee.email}</p>
            <p style={{ color: '#374151' }}>CIN: {employee.cin}</p>
            <p style={{ color: '#374151' }}>CNSS: {employee.cnss}</p>
            <p style={{ color: '#374151' }}>Birth Date: {employee.birthDate}</p>
            <p style={{ color: '#374151' }}>Role: {employee.role}</p>
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>Retard</h4>
              {employee.retard.length > 0 ? (
                <ul>
                  {employee.retard.map((r, index) => (
                    <li key={index} style={{ color: '#374151' }}>{r.totalMinutes} minutes</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#374151' }}>No Retard</p>
              )}
            </div>
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>Absence</h4>
              {employee.absence.length > 0 ? (
                <ul>
                  {employee.absence.map((a, index) => (
                    <li key={index} style={{ color: '#374151' }}>{a.totalHours} hours ({Math.floor(a.totalHours / 12)} days)</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#374151' }}>No Absence</p>
              )}
            </div>
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>Vacancy</h4>
              {employee.vacancy.length > 0 ? (
                <ul>
                  {employee.vacancy.map((v, index) => (
                    <li key={index} style={{ color: '#374151' }}>From {v.startDate} to {v.endDate}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#374151' }}>No Vacancy</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
