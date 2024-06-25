import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const VehicleForm = ({ isOpen, onClose, onSubmit, vehicle }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    registrationNumber: '',
    reervoid: '',
    consomation: '',
    buyingState: '',
    buyingMileage: '',
    currentMileage: '',
    buyingPrice: '',
    distance: '',
    fuelPrice: '',
    tripRevenue: '',
  });

  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: vehicle ? vehicle.id : Date.now() });
    setFormData({
      name: '',
      type: '',
      registrationNumber: '',
      reervoid: '',
      consomation: '',
      buyingState: '',
      buyingMileage: '',
      currentMileage: '',
      buyingPrice: '',
      distance: '',
      fuelPrice: '',
      tripRevenue: '',
    });
    onClose();
  };

  const calculateExpenses = () => {
    const fuelConsumption = parseFloat(formData.consomation); // in liters per 100 km
    const distance = parseFloat(formData.distance); // in km
    const fuelPrice = parseFloat(formData.fuelPrice); // in currency per liter
    const tripRevenue = parseFloat(formData.tripRevenue); // in currency

    if (isNaN(fuelConsumption) || isNaN(distance) || isNaN(fuelPrice) || isNaN(tripRevenue)) {
      return { fuelExpenses: 0, gain: 0 };
    }

    const fuelExpenses = (fuelConsumption / 100) * distance * fuelPrice;
    const gain = tripRevenue - fuelExpenses;

    return { fuelExpenses, gain };
  };

  const { fuelExpenses, gain } = calculateExpenses();

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      maxHeight: '90vh',
      overflowY: 'auto',
      width: '90%',
      maxWidth: '600px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      contentLabel="Vehicle Form"
    >
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
          {vehicle ? 'Edit Vehicle' : 'Add Vehicle'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {['name', 'type', 'registrationNumber', 'reervoid', 'consomation', 'buyingState', 'buyingMileage', 'currentMileage', 'buyingPrice', 'distance', 'fuelPrice', 'tripRevenue'].map((field) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
              <label style={{ marginBottom: '8px', fontWeight: '500' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '8px 0',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box',
                }}
                required
              />
            </div>
          ))}
          <div>
            <h3>Fuel Expenses: {fuelExpenses.toFixed(2)}</h3>
            <h3>Gain: {gain.toFixed(2)}</h3>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#4F46E5',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>
        <button
          onClick={onClose}
          style={{
            backgroundColor: '#6B7280',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default VehicleForm;
