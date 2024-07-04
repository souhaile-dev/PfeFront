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
      marginTop:'3%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '80vh',  // Ensures the modal does not exceed 80% of the viewport height
      overflowY: 'auto',
      backgroundColor:'gold'  // Adds vertical scrolling
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
        <h2 className="text-2xl font-bold mb-5 text-center">
          {vehicle ? 'Edit Vehicle' : 'Add Vehicle'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
          {['name', 'type', 'registrationNumber', 'reervoid', 'consomation', 'buyingState', 'buyingMileage', 'currentMileage', 'buyingPrice', 'distance', 'fuelPrice', 'tripRevenue'].map((field) => (
            <div key={field} className="flex flex-col mb-4">
              <label className="mb-2 font-medium text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
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
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
          >
            {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default VehicleForm;
