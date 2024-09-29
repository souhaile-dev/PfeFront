import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for better design
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f0f4f8',
  padding: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '90%',
  maxWidth: '800px',
  margin: theme.spacing(2),
  padding: theme.spacing(3),
  boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.1)',
  borderRadius: '15px',
  backgroundColor: '#ffffff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '25px',
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 'bold',
  background: 'linear-gradient(to right, #00c6ff, #0072ff)',
  color: '#ffffff',
  boxShadow: '0px 6px 15px rgba(0, 123, 255, 0.4)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 20px rgba(0, 123, 255, 0.6)',
  },
}));

const ClientForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    ice: '',
    if: '',
    rc: '',
    cin: '',
    address: '',
    email: '',
    tel: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log('Client Form Submitted:', formValues);
  };

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
            Client Information
          </Typography>
          <Divider sx={{ marginBottom: '20px' }} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ice"
                  name="ice"
                  value={formValues.ice}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="IF"
                  name="if"
                  value={formValues.if}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="RC"
                  name="rc"
                  value={formValues.rc}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CIN"
                  name="cin"
                  value={formValues.cin}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tel"
                  name="tel"
                  value={formValues.tel}
                  onChange={handleInputChange}
                  variant="outlined"
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Save Client Information
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default ClientForm;
