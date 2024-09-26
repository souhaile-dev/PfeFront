import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import Modal from 'react-modal';
import { FiPlus } from 'react-icons/fi';

Modal.setAppElement('#root');

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee/All', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched employees:", response.data);
        setEmployees(response.data);
      } catch (error) {
        if (error.response) {
          console.error(`Error: ${error.response.status} - ${error.response.data}`);
        } else {
          console.error("There was an error fetching the employees!", error);
        }
      }
    };
  
    fetchEmployees();
  }, [token]);
  
  const fetchEmployeeById = async (id) => {
    try {
      const response = await axios.get(`https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched employee by ID:", response.data);
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the employee!", error);
    }
  };

  const handleAddEmployee = async (employee) => {
    const dto = {
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Imatriculation: employee.Imatriculation,
      Email: employee.Email,
      Password: employee.Password,
      CIN: employee.CIN,
      CNSS: employee.CNSS,
      Roles: employee.Roles,  // Ensure Roles is correctly structured
      BirthDate: formatDate(employee.BirthDate),  // Ensure birth date is correctly formatted
    };
  
    try {
      const response = await axios.post('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee', dto, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Employee added successfully:", response.data);
      setEmployees([...employees, response.data]);
      setIsFormOpen(false);
    } catch (error) {
      if (error.response) {
        console.error("Error saving employee:", error.response.data);
        if (error.response.data.errors) {
          Object.keys(error.response.data.errors).forEach((key) => {
            console.error(`${key}: ${error.response.data.errors[key]}`);
          });
        }
      } else {
        console.error("Error saving employee:", error.message);
      }
    }
  };
  
  const formatDate = (date) => {
    const isoDate = new Date(date).toISOString(); // Converts to ISO 8601 format
    return isoDate;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert birthDate to ISO format before sending
    const formattedEmployee = {
      ...employee,
      birthDate: formatDate(employee.birthDate)
    };
  
    onAddEmployee(formattedEmployee);
    onClose();
  };
  
  

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Delete employee response:", response.data);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error("There was an error deleting the employee!", error);
    }
  };

  const handleEditEmployee = (employee) => {
    setCurrentEmployee(employee);
    setIsEditMode(true);
    setIsFormOpen(true);
  };
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      marginTop: '3%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '80vh',
      overflowY: 'auto',
      backgroundColor: '#C0C0C0',  // Adds vertical scrolling
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };
  

  return (
    <div style={{ padding: '24px' }}>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => setIsFormOpen(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4F46E5',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FiPlus style={{ marginRight: '8px' }} />
          Add Employee
        </button>
      </div>
      <EmployeeList
        employees={employees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />
      <EmployeeForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setIsEditMode(false);
          setCurrentEmployee(null);
        }}
        onAddEmployee={handleAddEmployee}
        isEditMode={isEditMode}
        currentEmployee={currentEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;
