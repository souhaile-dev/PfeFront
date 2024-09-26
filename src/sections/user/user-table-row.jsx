import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function UserTableRow({
  selected,
  id,
  name,
  avatarUrl,
  role,
  status,
  email,
  imatriculation,
  cin,
  cnss,
  birthDate,
  currentSalary,
  handleClick,
  token,
  setUsers,
}) {
  const [open, setOpen] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [retardModalOpen, setRetardModalOpen] = useState(false);
  const [absenceModalOpen, setAbsenceModalOpen] = useState(false);
  const [vacancyModalOpen, setVacancyModalOpen] = useState(false);

  // State for editing user data
  const [formData, setFormData] = useState({
    firstName: name.split(' ')[0] || '',
    lastName: name.split(' ')[1] || '',
    imatriculation: imatriculation || '',
    email: email || '',
    password: '',
    cin: cin || '',
    cnss: cnss || '',
    birthDate: birthDate || '',
    role: role || 'EMPLOYEE',
    currentSalary: currentSalary || '',
  });

  // State for retard data
  const [retardData, setRetardData] = useState({
    empId: id,
    justified: false,
    description: '',
    startTime: '',
    endTime: '',
    totalminsy: 0,
    cin: cin || '',
  });

  // State for absence data
  const [absenceData, setAbsenceData] = useState({
    empId: id,
    justified: false,
    description: '',
    totalHours: 0,
  });

  // State for vacancy data
  const [vacancyData, setVacancyData] = useState({
    empId: id,
    start: '',
    end: '',
  });

  // Menu handling
  const handleOpenMenu = (event) => setOpen(event.currentTarget);
  const handleCloseMenu = () => setOpen(null);
  
  // Edit modal handling
  const handleOpenEditModal = () => {
    setEditModalOpen(true);
    setOpen(null);
  };
  const handleCloseEditModal = () => setEditModalOpen(false);

  // Retard modal handling
  const handleOpenRetardModal = () => setRetardModalOpen(true);
  const handleRetardModalClose = () => setRetardModalOpen(false);

  // Absence modal handling
  const handleOpenAbsenceModal = () => setAbsenceModalOpen(true);
  const handleAbsenceModalClose = () => setAbsenceModalOpen(false);

  // Vacancy modal handling
  const handleOpenVacancyModal = () => setVacancyModalOpen(true);
  const handleVacancyModalClose = () => setVacancyModalOpen(false);

  // Input change handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRetardChange = (event) => {
    const { name, value, type, checked } = event.target;
    setRetardData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAbsenceChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAbsenceData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleVacancyChange = (event) => {
    const { name, value } = event.target;
    setVacancyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit functions
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const updatedUserObject = {
      id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      imatriculation: formData.imatriculation,
      email: formData.email,
      password: formData.password,
      cin: formData.cin,
      cnss: formData.cnss,
      birthDate: new Date(formData.birthDate).toISOString(),
      roles: [{ id: 0, role: formData.role }],
      currentSalary: parseFloat(formData.currentSalary),
    };
  
    try {
      const response = await fetch(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUserObject),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update user: ${errorData.message || 'Unknown error'}`);
      }
  
      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditModalOpen(false); // Close the modal after success
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };
  

  const handleRetardSubmit = async () => {
    const totalMinutes = calculateTotalMinutes(retardData.startTime, retardData.endTime);
    const retardPayload = {
      empId: retardData.empId,
      justified: retardData.justified,
      description: retardData.description,
      totalminsy: totalMinutes,
      cin: retardData.cin,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Retard',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(retardPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add retard: ${errorData.message || 'Unknown error'}`);
      }

      console.log('Retard added successfully:', await response.json());
      setRetardModalOpen(false);
    } catch (error) {
      console.error('Error adding retard:', error.message);
    }
  };

  const handleAbsenceSubmit = async () => {
    const absencePayload = {
      empId: absenceData.empId,
      justified: absenceData.justified,
      description: absenceData.description,
      totalHours: absenceData.totalHours,
    };
  
    console.log("Submitting absence:", absencePayload); // Log the absence payload
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Absence',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(absencePayload),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to add absence: ${errorData.message || 'Unknown error'}`);
      }
  
      console.log('Absence added successfully:', await response.json());
      setAbsenceModalOpen(false);
    } catch (error) {
      console.error('Error adding absence:', error.message);
    }
  };

  const handleVacancySubmit = async () => {
    // Ensure start and end are converted to Date objects
    const startDate = new Date(vacancyData.start);
    const endDate = new Date(vacancyData.end);
  
    // Check if both dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Invalid start or end date");
      return;
    }
  
    const vacancyPayload = {
      empId: vacancyData.empId,
      start: startDate.toISOString(), // Convert Date to ISO string
      end: endDate.toISOString(),     // Convert Date to ISO string
    };
  
    console.log("Submitting vacancy:", vacancyPayload);
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vacancy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(vacancyPayload),
      });
  
      const responseText = await response.text();
      console.log("Response text:", responseText);
  
      if (!response.ok) {
        throw new Error(`Failed to add vacancy: ${responseText}`);
      }
  
      const result = JSON.parse(responseText);
      console.log('Vacancy added successfully:', result);
      setAbsenceModalOpen(false);  // Closing the modal (typo here previously with setAbsenceModalOpen)
    } catch (error) {
      console.error('Error adding vacancy:', error.message);
    }
  };
  

  // Function to calculate total minutes
  const calculateTotalMinutes = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const diff = (end - start) / (1000 * 60);
    return diff > 0 ? diff : 0;
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{imatriculation}</TableCell>
        <TableCell>{email || 'No'}</TableCell>
        <TableCell>{cin}</TableCell>
        <TableCell>{cnss}</TableCell>
        <TableCell>{birthDate}</TableCell>
        <TableCell>{currentSalary}</TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenEditModal}>
            <Iconify icon="eva:edit-fill" />
          </IconButton>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          <IconButton onClick={handleOpenRetardModal}>
            <Iconify icon="mdi:clock-outline" />
          </IconButton>
          <IconButton onClick={handleOpenAbsenceModal}>
            <Iconify icon="mdi:calendar-remove-outline" />
          </IconButton>
          <IconButton onClick={handleOpenVacancyModal}>
            <Iconify icon="mdi:calendar-range" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleCloseEditModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit User
          </Typography>
          <form onSubmit={handleSubmitEdit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Imatriculation"
              name="imatriculation"
              value={formData.imatriculation}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CIN"
              name="cin"
              value={formData.cin}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="CNSS"
              name="cnss"
              value={formData.cnss}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Birth Date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Current Salary"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            {/* Role Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                {['EMPLOYEE', 'ADMIN'].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </form>
          <Button onClick={handleCloseEditModal} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Retard Modal */}
      <Modal open={retardModalOpen} onClose={handleRetardModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Add Retard
          </Typography>
          <TextField
            label="Start Time (HH:MM)"
            name="startTime"
            value={retardData.startTime}
            onChange={handleRetardChange}
            fullWidth
            margin="normal"
            type="time"
          />
          <TextField
            label="End Time (HH:MM)"
            name="endTime"
            value={retardData.endTime}
            onChange={handleRetardChange}
            fullWidth
            margin="normal"
            type="time"
          />
          <TextField
            label="Description"
            name="description"
            value={retardData.description}
            onChange={handleRetardChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="justified"
                checked={retardData.justified}
                onChange={handleRetardChange}
              />
            }
            label="Justified"
          />
          <Button variant="contained" onClick={handleRetardSubmit} sx={{ mt: 2 }}>
            Add Retard
          </Button>
          <Button onClick={handleRetardModalClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Absence Modal */}
      <Modal open={absenceModalOpen} onClose={handleAbsenceModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Add Absence
          </Typography>
          <TextField
            label="Description"
            name="description"
            value={absenceData.description}
            onChange={handleAbsenceChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Total Hours"
            name="totalHours"
            type="number"
            value={absenceData.totalHours}
            onChange={handleAbsenceChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="justified"
                checked={absenceData.justified}
                onChange={handleAbsenceChange}
              />
            }
            label="Justified"
          />
          <Button variant="contained" onClick={handleAbsenceSubmit} sx={{ mt: 2 }}>
            Add Absence
          </Button>
          <Button onClick={handleAbsenceModalClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>

      {/* Vacancy Modal */}
      <Modal open={vacancyModalOpen} onClose={handleVacancyModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Add Vacancy
          </Typography>
          <TextField
            label="Start Date"
            name="start"
            type="datetime-local"
            value={vacancyData.start}
            onChange={handleVacancyChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="End Date"
            name="end"
            type="datetime-local"
            value={vacancyData.end}
            onChange={handleVacancyChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleVacancySubmit} sx={{ mt: 2 }}>
            Add Vacancy
          </Button>
          <Button onClick={handleVacancyModalClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  status: PropTypes.string,
  email: PropTypes.string,
  imatriculation: PropTypes.string,
  cin: PropTypes.string,
  cnss: PropTypes.string,
  birthDate: PropTypes.string,
  currentSalary: PropTypes.string,
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  setUsers: PropTypes.func.isRequired,
};
