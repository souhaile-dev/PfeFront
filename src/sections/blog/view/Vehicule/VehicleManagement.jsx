import React, { useState, useEffect } from 'react';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';
import MaintenanceForm from './MaintenanceForm';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const API_URL = 'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vehicles';

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = 'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vehicles/All';
  const API_URLpost = 'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vehicles';
  const API_URL_GET = 'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vehicles/All';
const API_URL_POST = 'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vehicles';
const API_URL_PUT = 'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vehicles'; // Include vehicle ID when using PUT


  // Fetch vehicles from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');  // Retrieve the token from localStorage
      try {
        const response = await fetch('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vehicles/All', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          }
        });
    
        // if (!response.ok) {
        //   throw new Error('Failed to fetch vehicles');
        // }
    
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVehicles();
  }, []);

  // Add vehicle to the API
  const handleAddVehicle = async (vehicle) => {
    setLoading(true);
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('Unauthorized: No token found, please login.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(API_URLpost, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Pass the token
        },
        body: JSON.stringify(vehicle)
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // To get detailed error from API response
        console.error('Error details:', errorData); // Log error details for debugging
        throw new Error('Failed to add vehicle');
      }
  
      const newVehicle = await response.json();
      setVehicles([...vehicles, newVehicle]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsFormOpen(false);
    }
  };
  
  

  // Update vehicle in the API
  const handleEditVehicle = async (updatedVehicle) => {
    setLoading(true);
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
  console.log('Token:', token);
    if (!token) {
      setError('Unauthorized: No token found, please login.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch(`${API_URLpost}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Include the Bearer token in the Authorization header
        },
        body: JSON.stringify(updatedVehicle)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update vehicle');
      }
  
      const updatedData = await response.json();
      setVehicles(vehicles.map(vehicle => vehicle.id === updatedData.id ? updatedData : vehicle));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsEditFormOpen(false);
    }
  };
  

  // Delete vehicle from the API
  const handleDeleteVehicle = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete vehicle');
      }

      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsEditFormOpen(true);
  };

  const handleAddMaintenance = (vehicleId, maintenance) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, maintenance: [...vehicle.maintenance, { ...maintenance, id: vehicle.maintenance.length + 1 }] } : vehicle
    ));
  };

  const handleMaintenanceClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setIsMaintenanceFormOpen(true);
  };

  return (
    <div style={{ padding: '24px' }}>
      <button
        onClick={() => setIsFormOpen(true)}
        style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}
      >
        Add Vehicle
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <VehicleList vehicles={vehicles} onEditClick={handleEditClick} onDeleteClick={handleDeleteVehicle} onMaintenanceClick={handleMaintenanceClick} />
      
      <VehicleForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleAddVehicle} />
      
      {selectedVehicle && (
        <VehicleForm
          isOpen={isEditFormOpen}
          onClose={() => setIsEditFormOpen(false)}
          onSubmit={handleEditVehicle}
          vehicle={selectedVehicle}
        />
      )}
      
      <MaintenanceForm isOpen={isMaintenanceFormOpen} onClose={() => setIsMaintenanceFormOpen(false)} onSubmit={handleAddMaintenance} vehicleId={selectedVehicleId} />
    </div>
  );
};

export default VehicleManagement;
