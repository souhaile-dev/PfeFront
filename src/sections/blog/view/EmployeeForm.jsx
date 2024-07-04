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
      marginTop:'3%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '80vh',  // Ensures the modal does not exceed 80% of the viewport height
      overflowY: 'auto',
      backgroundColor:'#C0C0C0'  // Adds vertical scrolling
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  return (
    <Modal  isOpen={isOpen} onRequestClose={onClose} style={modalStyles} contentLabel="Add Employee">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Employee</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
        {['firstName', 'lastName', 'userName', 'email', 'password', 'cin', 'cnss', 'birthDate', 'role'].map((field) => (
          <div key={field} className="flex flex-col mb-4">
            <label className="mb-1 font-medium text-gray-100">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              name={field}
              value={employee[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-indigo-400 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">Add Employee</button>
      </form>
      <button onClick={onClose} className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">Close</button>
    </Modal>
  );
};

export default EmployeeForm;
