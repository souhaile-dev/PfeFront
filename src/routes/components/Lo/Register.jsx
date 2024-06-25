// src/routes/components/Lo/Register.jsx
import React, { useState } from "react";
import { auth, db, createUserWithEmailAndPassword } from "./FirebaseConfig";
import { useNavigate } from 'react-router-dom';
import { collection, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import './Register.css';

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering user with email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully:", userCredential);
      const user = userCredential.user;

      // Add user details to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        lastName,
        userName,
        email,
        role,
      });

      alert("Added successfully!");
      navigate('/login');
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="FirstName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="LastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="UserName"
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
