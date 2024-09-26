import React, { useState } from 'react';

const UserRegistration = ({ token, onUserAdded }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    imatriculation: '',
    email: '',
    password: '',
    cin: '',
    cnss: '',
    birthDate: '',
    role: 'EMPLOYEE',
    currentSalary: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare roles array similar to the successful curl command
    const rolesArray = [
      {
        id: 0,
        dateCreation: new Date().toISOString(),
        lasetUpdate: new Date().toISOString(), // Note the typo "lasetUpdate" is kept as in the backend
        idCreateur: 0,
        idEmp: 0,
        role: formData.role,
      },
    ];

    const newUserObject = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      imatriculation: formData.imatriculation,
      email: formData.email,
      password: formData.password,
      roles: rolesArray, // Send roles array as per the backend requirement
      cin: formData.cin,
      cnss: formData.cnss,
      birthDate: new Date(formData.birthDate).toISOString(), // Format birthDate as ISO string
      currentSalary: parseFloat(formData.currentSalary), // Ensure salary is sent as a number
    };

    try {
      const response = await fetch(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Ensure the token is sent
          },
          body: JSON.stringify(newUserObject), // Send user data as JSON
        }
      );

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from backend:', errorData);
        throw new Error(`Failed to add user: ${errorData.message || 'Unknown error'}`);
      }

      const addedUser = await response.json();
      console.log('User added successfully:', addedUser);

      onUserAdded(addedUser);

      // Reset form data after submission
      setFormData({
        firstName: '',
        lastName: '',
        imatriculation: '',
        email: '',
        password: '',
        cin: '',
        cnss: '',
        birthDate: '',
        role: 'EMPLOYEE',
        currentSalary: '',
      });
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {['firstName', 'lastName', 'imatriculation', 'email', 'password', 'cin', 'cnss', 'birthDate', 'currentSalary'].map((field) => (
        <div key={field}>
          <label className="block text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === 'password' ? 'password' : field === 'birthDate' ? 'date' : 'text'}
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
          <option value="EMPLOYEE">Employee</option>
          <option value="DRIVER">Driver</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default UserRegistration;
