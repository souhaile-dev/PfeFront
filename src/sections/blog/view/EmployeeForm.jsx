import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const VehicleForm = ({ isOpen, onClose, onSubmit, vehicle, mode }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'open',
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
    if (mode === 'edit' && vehicle) {
      // Populate form when editing a vehicle
      setFormData(vehicle);
    } else if (mode === 'add') {
      // Reset the form when adding a new vehicle
      setFormData({
        name: '',
        type: 'open',
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
    }
  }, [vehicle, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: vehicle ? vehicle.id : Date.now() });
    onClose(); // Close the modal after submission
  };

  const calculateExpenses = () => {
    const fuelConsumption = parseFloat(formData.consomation);
    const distance = parseFloat(formData.distance);
    const fuelPrice = parseFloat(formData.fuelPrice);
    const tripRevenue = parseFloat(formData.tripRevenue);

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
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
      width: '95%',
      maxWidth: '600px',
      maxHeight: '85vh',
      overflowY: 'auto',
      backgroundColor: '#fff',
      color: '#333',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} contentLabel="Vehicle Form">
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {mode === 'edit' ? 'Edit Vehicle' : 'Add Vehicle'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-600">Vehicle Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="open">Open</option>
              <option value="covert">Covert</option>
              <option value="fridge">Fridge</option>
            </select>
          </div>

          <div className="flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-600">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Other fields */}
          {/* Same pattern for other fields */}

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-gray-700 mb-2">
              Fuel Expenses: <span className="text-indigo-600">${fuelExpenses.toFixed(2)}</span>
            </h3>
            <h3 className="font-bold text-gray-700">
              Gain: <span className="text-green-600">${gain.toFixed(2)}</span>
            </h3>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 px-5 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {mode === 'edit' ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-6 bg-gray-400 text-white py-3 px-5 rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default VehicleForm;
