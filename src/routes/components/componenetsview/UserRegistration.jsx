// src/routes/components/componenetsview/UserRegistration.jsx

import React, { useState } from 'react';

const UserRegistration = ({ onAddUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    role: 'chauffeur',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onAddUser prop to add the user
    onAddUser(formData);
    setFormData({
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      role: 'chauffeur',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {['firstName', 'lastName', 'userName', 'email', 'password'].map((field) => (
        <div key={field}>
          <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      ))}
      <div>
        <label className="block text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="chauffeur">Chauffeur</option>
          <option value="employe">Employe</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default UserRegistration;
