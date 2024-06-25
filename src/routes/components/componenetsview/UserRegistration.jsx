import 'tailwindcss/tailwind.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PasswordErrorMessage = () => (
  <p className="text-red-500 text-xs italic">Password should have at least 8 characters</p>
);

function UserRegistration({ onAddUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    const newUser = { firstName, lastName, password, role };
    onAddUser(newUser); // Call the onAddUser function passed as prop
    clearForm();
    navigate('/login'); // Navigate to login after registration
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setRole("");
  };

  return (
    <div className="w-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
            First name <sup className="text-red-500">*</sup>
          </label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
            Last name
          </label>
          <input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password <sup className="text-red-500">*</sup>
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {password.length > 0 && password.length < 8 && <PasswordErrorMessage />}
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
            Role <sup className="text-red-500">*</sup>
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Role</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>
        <button
          type="button"
          onClick={handleClick}
          disabled={!firstName || !lastName || !password || password.length < 8 || !role}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

// Define props validation
UserRegistration.propTypes = {
  onAddUser: PropTypes.func.isRequired,
};

export default UserRegistration;
