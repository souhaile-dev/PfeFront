import React, { useState } from 'react';
import Modal from 'react-modal';

const EmployeeForm = ({ isOpen, onClose, onAddEmployee }) => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    cin: '',
    cnss: '',
    birthDate: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee(employee);
    setEmployee({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      cin: '',
      cnss: '',
      birthDate: '',
      role: '',
    });
    onClose();
  };

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  const inputStyles = {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const buttonStyles = {
    primary: {
      backgroundColor: '#4F46E5',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    secondary: {
      backgroundColor: '#6B7280',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} contentLabel="Add Employee">
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add Employee</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        {['firstName', 'lastName', 'userName', 'email', 'password', 'cin', 'cnss', 'birthDate', 'role'].map((field) => (
          <div key={field} style={{ display: 'flex', gap: '8px' }}>
            <label style={{ marginBottom: '8px', fontWeight: '500' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'} name={field} value={employee[field]} onChange={handleChange} style={inputStyles} required />
          </div>
        ))}
        <button type="submit" style={buttonStyles.primary}>Add Employee</button>
      </form>
      <button onClick={onClose} style={buttonStyles.secondary}>Close</button>
    </Modal>
  );
};

export default EmployeeForm;
