import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cin, setCin] = useState("");
  const [cnss, setCnss] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [currentSalary, setCurrentSalary] = useState(0);
  const [role, setRole] = useState("employee");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Prepare the payload
    const payload = {
      firstName: name,
      lastName: lastName,
      imatriculation: userName,
      email: email,
      roles: [
        {
          role: role.toUpperCase()  // Convert role to uppercase to match the API format
        }
      ],
      cin: cin,
      cnss: cnss,
      birthDate: new Date(birthDate).toISOString(),  // Convert date to ISO string format
      currentSalary: currentSalary,
      password: password
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    try {
      const response = await axios.post(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/signup',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Employee registered successfully:", response.data);
      alert("Added successfully!");
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error registering employee:", JSON.stringify(error.response.data, null, 2));
        alert(`Registration failed. Errors: ${JSON.stringify(error.response.data.errors, null, 2)}`);
      } else {
        console.error("Error registering employee:", error.message);
        alert("Registration failed. Please check the input and try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CIN"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CNSS"
          value={cnss}
          onChange={(e) => setCnss(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Birth Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Current Salary"
          value={currentSalary}
          onChange={(e) => setCurrentSalary(Number(e.target.value))}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="driver">Driver</option>
          <option value="employee">Employee</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
