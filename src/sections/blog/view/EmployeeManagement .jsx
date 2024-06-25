import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import RetardForm from './RetardForm';
import AbsenceForm from './AbsenceForm';
import VacancyForm from './VacancyForm';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRetardFormOpen, setIsRetardFormOpen] = useState(false);
  const [isAbsenceFormOpen, setIsAbsenceFormOpen] = useState(false);
  const [isVacancyFormOpen, setIsVacancyFormOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: employees.length + 1, retard: [], absence: [], vacancy: [] }]);
  };

  const handleAddRetard = (employeeId, retard) => {
    setEmployees(employees.map(emp => emp.id === employeeId ? { ...emp, retard: [...emp.retard, retard] } : emp));
  };

  const handleAddAbsence = (employeeId, absence) => {
    setEmployees(employees.map(emp => emp.id === employeeId ? { ...emp, absence: [...emp.absence, absence] } : emp));
  };

  const handleAddVacancy = (employeeId, vacancy) => {
    setEmployees(employees.map(emp => emp.id === employeeId ? { ...emp, vacancy: [...emp.vacancy, vacancy] } : emp));
  };

  return (
    <div style={{ padding: '24px' }}>
      <button onClick={() => setIsFormOpen(true)} style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Add Employee</button>
      <button onClick={() => setIsRetardFormOpen(true)} style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Manage Retard</button>
      <button onClick={() => setIsAbsenceFormOpen(true)} style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Manage Absence</button>
      <button onClick={() => setIsVacancyFormOpen(true)} style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Manage Vacancy</button>
      <EmployeeList employees={employees} />
      <EmployeeForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onAddEmployee={handleAddEmployee} />
      <RetardForm isOpen={isRetardFormOpen} onClose={() => setIsRetardFormOpen(false)} onAddRetard={handleAddRetard} employees={employees} />
      <AbsenceForm isOpen={isAbsenceFormOpen} onClose={() => setIsAbsenceFormOpen(false)} onAddAbsence={handleAddAbsence} employees={employees} />
      <VacancyForm isOpen={isVacancyFormOpen} onClose={() => setIsVacancyFormOpen(false)} onAddVacancy={handleAddVacancy} employees={employees} />
    </div>
  );
};

export default EmployeeManagement;
