import React from 'react';

const VehicleList = ({ vehicles, onEditClick, onDeleteClick }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      onDeleteClick(id);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-4">Vehicle List</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Provider</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Registration Number</th>
              <th className="py-2 px-4 border-b">Current Mileage</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td className="py-2 px-4 border-b">{vehicle.name}</td>
                <td className="py-2 px-4 border-b">{vehicle.provider || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{vehicle.type}</td>
                <td className="py-2 px-4 border-b">{vehicle.registrationNumber}</td>
                <td className="py-2 px-4 border-b">{vehicle.currentMileage}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => onEditClick(vehicle)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VehicleList;
