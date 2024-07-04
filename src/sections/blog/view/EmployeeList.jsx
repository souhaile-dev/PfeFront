import React, { useState } from 'react';

const EmployeeList = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter((employee) =>
    `${employee.cin} `.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Employees List</h2>
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-2 rounded border border-gray-300"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="p-4 bg-gray-200 rounded-lg shadow hover:bg-gray-300 cursor-pointer">
            <h3 className="text-lg font-bold">{employee.firstName} {employee.lastName}</h3>
            <p className="text-gray-700">Username: {employee.userName}</p>
            <p className="text-gray-700">Email: {employee.email}</p>
            <p className="text-gray-700">CIN: {employee.cin}</p>
            <p className="text-gray-700">CNSS: {employee.cnss}</p>
            <p className="text-gray-700">Birth Date: {employee.birthDate}</p>
            <p className="text-gray-700">Role: {employee.role}</p>
            <div className="mt-2">
              <h4 className="text-base font-bold">Retard</h4>
              {employee.retard.length > 0 ? (
                <ul className="list-disc list-inside">
                  {employee.retard.map((r, index) => (
                    <li key={index} className="text-gray-700">{r.totalMinutes} minutes</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No Retard</p>
              )}
            </div>
            <div className="mt-2">
              <h4 className="text-base font-bold">Absence</h4>
              {employee.absence.length > 0 ? (
                <ul className="list-disc list-inside">
                  {employee.absence.map((a, index) => (
                    <li key={index} className="text-gray-700">{a.totalHours} hours ({Math.floor(a.totalHours / 12)} days)</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No Absence</p>
              )}
            </div>
            <div className="mt-2">
              <h4 className="text-base font-bold">Vacancy</h4>
              {employee.vacancy.length > 0 ? (
                <ul className="list-disc list-inside">
                  {employee.vacancy.map((v, index) => (
                    <li key={index} className="text-gray-700">From {v.startDate} to {v.endDate}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No Vacancy</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
