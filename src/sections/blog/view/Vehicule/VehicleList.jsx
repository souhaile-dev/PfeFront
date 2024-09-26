import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

const VehicleList = ({ vehicles, onEditClick, onDeleteClick }) => {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      onDeleteClick(id);
    }
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Vehicle List
      </Typography>
      {vehicles.length === 0 ? (
        <Typography variant="body1">No vehicles available.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Provider</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Registration Number</strong></TableCell>
                <TableCell><strong>Current Mileage</strong></TableCell>
                <TableCell><strong>Cargo Height</strong></TableCell>
                <TableCell><strong>Buying State</strong></TableCell> {/* Updated */}
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell>{vehicle.name || 'N/A'}</TableCell>
                  <TableCell>{vehicle.provider || 'N/A'}</TableCell>
                  <TableCell>{vehicle.type || 'N/A'}</TableCell>
                  <TableCell>{vehicle.registrationNumber || 'N/A'}</TableCell>
                  <TableCell>{vehicle.currentMileage || 'N/A'}</TableCell>
                  <TableCell>{vehicle.cargoHeight || 'N/A'}</TableCell>
                  <TableCell>{vehicle.buyingState || 'N/A'}</TableCell> {/* Updated */}
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onEditClick(vehicle)}
                      style={{ marginRight: '8px' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => handleDelete(vehicle.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default VehicleList;
