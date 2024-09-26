import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

const Maintenance = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    problem: '',
    spends: 0,
    details: '',
    output: ''
  });
  const [vehicleId, setVehicleId] = useState(null);
  const [vehicleRegistration, setVehicleRegistration] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const token = localStorage.getItem('token'); // Retrieve the token from localStorage

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get(
          'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/maintenance/All',
          {
            headers: {
              Authorization: `Bearer ${token}` // Include token in the headers
            }
          }
        );
        setMaintenanceData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMaintenanceData();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVehicleSearch = async () => {
    try {
      const response = await axios.get(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/vehicles/All',
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the headers
          }
        }
      );

      // Filter vehicle by registration number from the response data
      const vehicle = response.data.find(
        (v) => v.registrationNumber.toLowerCase() === formData.registrationNumber.toLowerCase()
      );

      if (vehicle) {
        setVehicleId(vehicle.id);
        setVehicleRegistration(vehicle.registrationNumber);
        setMessage('Vehicle found. You can now add maintenance details.');
        setOpenSnackbar(true);
      } else {
        setMessage('Vehicle not found. Please check the registration number.');
        setOpenSnackbar(true);
      }
    } catch (err) {
      setMessage('Error fetching vehicle data. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleId) {
      setMessage('Please search and select a vehicle first.');
      setOpenSnackbar(true);
      return;
    }
    const maintenanceData = {
      idVehicle: vehicleId,
      problem: formData.problem,
      spends: formData.spends,
      details: formData.details,
      output: formData.output
    };
    try {
      await axios.post(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/maintenance',
        maintenanceData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the headers
          }
        }
      );
      setMessage('Maintenance record added successfully.');
      setOpenSnackbar(true);
      setFormData({
        registrationNumber: '',
        problem: '',
        spends: 0,
        details: '',
        output: ''
      });
    } catch (err) {
      setMessage('Error adding maintenance record. Please try again.');
      setOpenSnackbar(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Vehicle Maintenance Overview
      </Typography>
      
      {/* Maintenance Records Display */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {maintenanceData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.idVehicle}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Vehicle ID: {item.idVehicle}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Registration:</strong> {vehicleRegistration}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Problem:</strong> {item.problem}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Spends:</strong> ${item.spends}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Details:</strong> {item.details}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Output:</strong> {item.output}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  More Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Maintenance Form */}
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Maintenance Record
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Registration Number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" color="secondary" onClick={handleVehicleSearch} sx={{ mb: 2 }}>
            Search Vehicle
          </Button>
          <TextField
            label="Problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            required
          />
          <TextField
            label="Spends"
            name="spends"
            value={formData.spends}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="number"
            required
          />
          <TextField
            label="Details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            label="Output"
            name="output"
            value={formData.output}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add Maintenance
          </Button>
        </form>
      </Card>

      {/* Snackbar for displaying messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Maintenance;
