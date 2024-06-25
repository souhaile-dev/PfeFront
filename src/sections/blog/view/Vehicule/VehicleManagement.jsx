import React, { useState } from 'react';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';
import MaintenanceForm from './MaintenanceForm';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const VehicleManagement = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isMaintenanceFormOpen, setIsMaintenanceFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const handleAddVehicle = (vehicle) => {
    setVehicles([...vehicles, { ...vehicle, id: vehicles.length + 1, maintenance: [] }]);
  };

  const handleEditVehicle = (updatedVehicle) => {
    setVehicles(vehicles.map(vehicle => vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle));
  };

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
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
      <button onClick={() => setIsFormOpen(true)} style={{ marginBottom: '10px', padding: '10px 20px', backgroundColor: '#4F46E5', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>Add Vehicle</button>
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
