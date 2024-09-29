import React, { useState } from 'react';

// VehicleSelector Component
export const VehicleSelector = ({ vehicles, selectedVehicle, onVehicleSelect }) => {
  return (
    <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
      <h3>Select Vehicle</h3>
      <select value={selectedVehicle} onChange={(e) => onVehicleSelect(e.target.value)} style={{ width: '100%', padding: '5px', marginBottom: '10px' }}>
        <option value="">-- Select Vehicle --</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.matricule} value={vehicle.matricule}>
            {vehicle.matricule}
          </option>
        ))}
      </select>
    </div>
  );
};

// DestinationSelector Component
export const DestinationSelector = ({ destinations, onConfirm }) => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleSelectChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedCity) {
      onConfirm(selectedCity);
      setSelectedCity(''); // Reset after confirmation
    } else {
      alert('Please select a destination city.');
    }
  };

  return (
    <div style={{ position: 'absolute', top: 80, left: 20, zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
      <h3>Select Destination</h3>
      <select value={selectedCity} onChange={handleSelectChange} style={{ width: '100%', padding: '5px', marginBottom: '10px' }}>
        <option value="">-- Select City --</option>
        {destinations.map((city) => (
          <option key={city.name} value={city.name}>{city.name}</option>
        ))}
      </select>
      <button onClick={handleConfirm} style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
        Confirm
      </button>
    </div>
  );
};
