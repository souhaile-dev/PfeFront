import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for better design
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '80%',
  maxWidth: '600px',
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: '12px',
}));

const CommandesForm = () => {
  const [formValues, setFormValues] = useState({
    vehicleId: '',
    driverId: '',
    destinationLatitude: '',
    destinationLongitude: '',
    isConfirmed: false,
    isDelivered: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Commandes Form Submitted:', formValues);
  };

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Commandes Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Vehicle ID"
                  name="vehicleId"
                  value={formValues.vehicleId}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Driver ID"
                  name="driverId"
                  value={formValues.driverId}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination From"
                  name="go from"
                  value={formValues.destinationLatitude}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination TO"
                  name="destinationLongitude"
                  value={formValues.destinationLongitude}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.isConfirmed}
                      onChange={handleCheckboxChange}
                      name="isConfirmed"
                      color="primary"
                    />
                  }
                  label="Is Confirmed?"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formValues.isDelivered}
                      onChange={handleCheckboxChange}
                      name="isDelivered"
                      color="primary"
                    />
                  }
                  label="Is Delivered?"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ borderRadius: '8px' }}
                >
                  Save Commandes
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default CommandesForm;
