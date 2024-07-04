import React from 'react';

const VehicleList = ({ vehicles, onEditClick, onDeleteClick, onMaintenanceClick }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
            <h3 className="text-lg font-bold">{vehicle.name}</h3>
            <p>Type: {vehicle.type}</p>
            <p>Registration Number: {vehicle.registrationNumber}</p>
            <p>Reservoid: {vehicle.reervoid}</p>
            <p>Consomation: {vehicle.consomation}</p>
            <p>Buying State: {vehicle.buyingState}</p>
            <p>Buying Mileage: {vehicle.buyingMileage}</p>
            <p>Current Mileage: {vehicle.currentMileage}</p>
            <p>Buying Price: {vehicle.buyingPrice}</p>
            <div className="flex space-x-2 mt-2">
              <button className="bg-indigo-600 text-white py-1 px-2 rounded hover:bg-indigo-700 transition" onClick={() => onEditClick(vehicle)}>Edit</button>
              <button className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition" onClick={() => onDeleteClick(vehicle.id)}>Delete</button>
              <button className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700 transition mt-2" onClick={() => onMaintenanceClick(vehicle.id)}>Add Maintenance</button>
            </div>
            {vehicle.maintenance && vehicle.maintenance.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-bold">Maintenance Records</h4>
                <ul className="list-disc list-inside">
                  {vehicle.maintenance.map((m, index) => (
                    <li key={index} className="text-gray-700">
                      <p>Problem: {m.problem}</p>
                      <p>Spends: {m.spends}</p>
                      <p>Details: {m.details}</p>
                      <p>Output: {m.output}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
