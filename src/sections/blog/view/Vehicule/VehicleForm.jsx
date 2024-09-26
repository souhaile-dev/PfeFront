import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';

const VehicleForm = ({ isOpen, onClose, onSubmit, vehicle }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    provider: '',
    cargoHeight: 0,
    cargoLength: 0,
    cargoWidth: 0,
    cargoVolume: 0,
    hasCover: false,
    hasCooler: false,
    type: 'open',
    registrationNumber: '',
    reervoidVolume: 0,
    consumption: 0,
    purchasingState: '',
    purchasingMileage: 0,
    currentMileage: 0,
    purchasingPrice: 0,
  });

  // Populate form data when editing a vehicle
  useEffect(() => {
    if (vehicle) {
      setFormData(vehicle);
    } else {
      setFormData({
        id: '',
        name: '',
        provider: '',
        cargoHeight: 0,
        cargoLength: 0,
        cargoWidth: 0,
        cargoVolume: 0,
        hasCover: false,
        hasCooler: false,
        type: 'open',
        registrationNumber: '',
        reervoidVolume: 0,
        consumption: 0,
        purchasingState: '',
        purchasingMileage: 0,
        currentMileage: 0,
        purchasingPrice: 0,
      });
    }
  }, [vehicle]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: vehicle ? vehicle.id : Date.now() });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{vehicle ? 'Edit Vehicle' : 'Add Vehicle'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Provider Field */}
          <TextField
            label="Provider"
            name="provider"
            value={formData.provider}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Cargo Fields */}
          <TextField
            label="Cargo Height (cm)"
            name="cargoHeight"
            type="number"
            value={formData.cargoHeight}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cargo Length (cm)"
            name="cargoLength"
            type="number"
            value={formData.cargoLength}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cargo Width (cm)"
            name="cargoWidth"
            type="number"
            value={formData.cargoWidth}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cargo Volume (m³)"
            name="cargoVolume"
            type="number"
            value={formData.cargoVolume}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Has Cover Field */}
          <FormControlLabel
            control={
              <Checkbox
                name="hasCover"
                checked={formData.hasCover}
                onChange={handleChange}
              />
            }
            label="Has Cover"
          />

          {/* Has Cooler Field */}
          <FormControlLabel
            control={
              <Checkbox
                name="hasCooler"
                checked={formData.hasCooler}
                onChange={handleChange}
              />
            }
            label="Has Cooler"
          />

          {/* Vehicle Type Field */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Vehicle Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="covert">Covert</MenuItem>
              <MenuItem value="fridge">Fridge</MenuItem>
            </Select>
          </FormControl>

          {/* Registration Number Field */}
          <TextField
            label="Registration Number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Reervoid Volume Field */}
          <TextField
            label="Reervoid Volume"
            name="reervoidVolume"
            type="number"
            value={formData.reervoidVolume}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Consumption Field */}
          <TextField
            label="Consumption (L/100km)"
            name="consumption"
            type="number"
            value={formData.consumption}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Purchasing State Field */}
          <TextField
            label="Purchasing State"
            name="purchasingState"
            value={formData.purchasingState}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Purchasing Mileage Field */}
          <TextField
            label="Purchasing Mileage (km)"
            name="purchasingMileage"
            type="number"
            value={formData.purchasingMileage}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Current Mileage Field */}
          <TextField
            label="Current Mileage (km)"
            name="currentMileage"
            type="number"
            value={formData.currentMileage}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {/* Purchasing Price Field */}
          <TextField
            label="Purchasing Price ($)"
            name="purchasingPrice"
            type="number"
            value={formData.purchasingPrice}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          type="submit"
        >
          {vehicle ? 'Update Vehicle' : 'Add Vehicle'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleForm;
