import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { collection, addDoc } from 'firebase/firestore';
import { db } from 'src/routes/components/Lo/FirebaseConfig';

const StockForm = ({ onAddStock }) => {
  const [formData, setFormData] = useState({
    date: '',
    selled: '',
    buyed: '',
    currentStock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'stocks'), formData);
      if (typeof onAddStock === 'function') {
        onAddStock(formData);
      }
      setFormData({
        date: '',
        selled: '',
        buyed: '',
        currentStock: '',
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Stock Data</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Selled</label>
        <input
          type="number"
          name="selled"
          value={formData.selled}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Buyed</label>
        <input
          type="number"
          name="buyed"
          value={formData.buyed}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Current Stock</label>
        <input
          type="number"
          name="currentStock"
          value={formData.currentStock}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Add Stock Data
      </button>
    </form>
  );
};

StockForm.propTypes = {
  onAddStock: PropTypes.func,
};

export default StockForm;
