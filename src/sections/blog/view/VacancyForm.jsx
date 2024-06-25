import React, { useState } from 'react';
import Modal from 'react-modal';

const VacancyForm = ({ isOpen, onClose, onAddVacancy, employees }) => {
  const [vacancy, setVacancy] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVacancy((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVacancy(parseInt(vacancy.employeeId), { startDate: vacancy.startDate, endDate: vacancy.endDate });
    setVacancy({
      employeeId: '',
      startDate: '',
      endDate: '',
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
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} contentLabel="Add Vacancy">
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add Vacancy</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ marginBottom: '8px', fontWeight: '500' }}>Employee</label>
          <select name="employeeId" value={vacancy.employeeId} onChange={handleChange} style={inputStyles} required>
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ marginBottom: '8px', fontWeight: '500' }}>Start Date</label>
          <input type="date" name="startDate" value={vacancy.startDate} onChange={handleChange} style={inputStyles} required />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ marginBottom: '8px', fontWeight: '500' }}>End Date</label>
          <input type="date" name="endDate" value={vacancy.endDate} onChange={handleChange} style={inputStyles} required />
        </div>
        <button type="submit" style={buttonStyles.primary}>Add Vacancy</button>
      </form>
      <button onClick={onClose} style={buttonStyles.secondary}>Close</button>
    </Modal>
  );
};

export default VacancyForm;
