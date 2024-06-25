import React from 'react';

const VehicleList = ({ vehicles, onEditClick, onDeleteClick, onMaintenanceClick }) => {
  const containerStyles = {
    maxWidth: '1120px',
    margin: 'auto',
    padding: '24px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
  };

  const cardStyles = {
    padding: '16px',
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s',
  };

  const buttonStyles = {
    edit: {
      backgroundColor: '#4F46E5',
      color: '#fff',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '5px',
    },
    delete: {
      backgroundColor: '#E11D48',
      color: '#fff',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    maintenance: {
      backgroundColor: '#10B981',
      color: '#fff',
      padding: '5px 10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '5px',
    },
  };

  return (
    <div style={containerStyles}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Vehicles</h2>
      <div style={gridStyles}>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} style={cardStyles}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{vehicle.name}</h3>
            <p>Type: {vehicle.type}</p>
            <p>Registration Number: {vehicle.registrationNumber}</p>
            <p>Reservoid: {vehicle.reervoid}</p>
            <p>Consomation: {vehicle.consomation}</p>
            <p>Buying State: {vehicle.buyingState}</p>
            <p>Buying Mileage: {vehicle.buyingMileage}</p>
            <p>Current Mileage: {vehicle.currentMileage}</p>
            <p>Buying Price: {vehicle.buyingPrice}</p>
            <button style={buttonStyles.edit} onClick={() => onEditClick(vehicle)}>Edit</button>
            <button style={buttonStyles.delete} onClick={() => onDeleteClick(vehicle.id)}>Delete</button>
            <button style={buttonStyles.maintenance} onClick={() => onMaintenanceClick(vehicle.id)}>Add Maintenance</button>
            {vehicle.maintenance && vehicle.maintenance.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold' }}>Maintenance Records</h4>
                <ul>
                  {vehicle.maintenance.map((m, index) => (
                    <li key={index} style={{ color: '#374151' }}>
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
