import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import UserRegistration from 'src/routes/components/componenetsview/UserRegistration';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TableRow from '@mui/material/TableRow';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('firstName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [retardModalOpen, setRetardModalOpen] = useState(false);
  const [vacancyModalOpen, setVacancyModalOpen] = useState(false);
  const [absenceModalOpen, setAbsenceModalOpen] = useState(false);
  const [retardData, setRetardData] = useState([]);
  const [filteredRetardData, setFilteredRetardData] = useState([]);
  const [vacancyData, setVacancyData] = useState([]);
  const [filteredVacancyData, setFilteredVacancyData] = useState([]);
  const [absenceData, setAbsenceData] = useState([]);
  const [filteredAbsenceData, setFilteredAbsenceData] = useState([]);
  const [cinSearch, setCinSearch] = useState('');

  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    imatriculation: '',
    email: '',
    password: '',
    cin: '',
    cnss: '',
    birthDate: '',
    role: 'EMPLOYEE',
    currentSalary: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee/All',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch users, status: ' + response.status);
        }

        const data = await response.json();
        const mappedUsers = data.map((emp) => ({
          id: emp.id.toString(),
          firstName: emp.firstName,
          lastName: emp.lastName,
          imatriculation: emp.imatriculation,
          email: emp.email,
          roles: emp.roles ? emp.roles.map((role) => role.role) : [],
          cin: emp.cin,
          cnss: emp.cnss,
          birthDate: emp.birthDate,
          currentSalary: emp.currentSalary.toString(),
          status: 'active',
        }));

        setUsers(mappedUsers);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserAdded = async (e) => {
    e.preventDefault();
    const rolesArray = [
      {
        id: 0,
        dateCreation: new Date().toISOString(),
        lastUpdate: new Date().toISOString(),
        idCreateur: 0,
        idEmp: 0,
        role: formData.role,
      },
    ];

    const newUserObject = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      imatriculation: formData.imatriculation,
      email: formData.email,
      password: formData.password,
      roles: rolesArray,
      cin: formData.cin,
      cnss: formData.cnss,
      birthDate: new Date(formData.birthDate).toISOString(),
      currentSalary: parseFloat(formData.currentSalary),
    };

    try {
      const response = await fetch(
        'https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUserObject),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from backend:', errorData);
        throw new Error(`Failed to add user: ${errorData.message || 'Unknown error'}`);
      }

      const addedUser = await response.json();
      setUsers((prev) => [...prev, addedUser]);

      setOpenUserModal(false);
      setFormData({
        firstName: '',
        lastName: '',
        imatriculation: '',
        email: '',
        password: '',
        cin: '',
        cnss: '',
        birthDate: '',
        role: 'EMPLOYEE',
        currentSalary: '',
      });
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  const fetchRetardData = async () => {
    try {
      const response = await fetch('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Retard/All', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch retard data');
      }

      const retardData = await response.json();
      const mappedData = await Promise.all(
        retardData.map(async (retard) => {
          const empResponse = await fetch(`https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee/${retard.idEmp}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const employee = empResponse.ok ? await empResponse.json() : null;

          return {
            empId: retard.idEmp,
            cin: employee ? employee.cin : 'N/A', // Use employee CIN if available
            justified: retard.justified,
            description: retard.description,
            totalminsy: retard.totalmins || 0,
          };
        })
      );

      setRetardData(mappedData);
      setFilteredRetardData(mappedData); // Initialize filtered data
    } catch (error) {
      console.error('Error fetching retard data:', error.message);
    }
  };

  const fetchVacancyData = async () => {
    try {
      const response = await fetch('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Vacancy/All', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch vacancy data');
      }

      const vacancyData = await response.json();
      const mappedData = await Promise.all(
        vacancyData.map(async (vacancy) => {
          const empResponse = await fetch(`https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee/${vacancy.idEmp}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const employee = empResponse.ok ? await empResponse.json() : null;

          return {
            empId: vacancy.idEmp,
            cin: employee ? employee.cin : 'N/A', // Use employee CIN if available
            startDate: vacancy.startDate,
            endDate: vacancy.endDate,
          };
        })
      );

      setVacancyData(mappedData);
      setFilteredVacancyData(mappedData);
    } catch (error) {
      console.error('Error fetching vacancy data:', error.message);
    }
  };

  const fetchAbsenceData = async () => {
    try {
      const response = await fetch('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Absence/All', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch absence data');
      }

      const absenceData = await response.json();
      const mappedData = await Promise.all(
        absenceData.map(async (absence) => {
          const empResponse = await fetch(`https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/Employee/${absence.idEmp}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const employee = empResponse.ok ? await empResponse.json() : null;

          return {
            empId: absence.idEmp,
            cin: employee ? employee.cin : 'N/A',
            description: absence.description,
            totalHours: absence.totalHours,
            justified: absence.justified,
          };
        })
      );

      setAbsenceData(mappedData);
      setFilteredAbsenceData(mappedData);
    } catch (error) {
      console.error('Error fetching absence data:', error.message);
    }
  };

  const handleVacancySearch = () => {
    if (cinSearch) {
      const filtered = vacancyData.filter(vacancy => vacancy.cin.includes(cinSearch));
      setFilteredVacancyData(filtered);
    } else {
      setFilteredVacancyData(vacancyData);
    }
  };
  const handleAbsenceSearch = () => {
    if (cinSearch) {
      const filtered = absenceData.filter(absence => absence.cin.includes(cinSearch));
      setFilteredAbsenceData(filtered);
    } else {
      setFilteredAbsenceData(absenceData);
    }
  };




  const handleRetardSearch = () => {
    if (cinSearch) {
      const filtered = retardData.filter(retard => retard.cin.includes(cinSearch));
      setFilteredRetardData(filtered);
    } else {
      setFilteredRetardData(retardData);
    }
  };

  const handleVacancyModalOpen = () => {
    fetchVacancyData(); // Fetch vacancy data when opening the modal
    setVacancyModalOpen(true);
  };

  const handleAbsenceModalOpen = () => {
    fetchAbsenceData(); // Fetch absence data when opening the modal
    setAbsenceModalOpen(true);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => `${n.firstName} ${n.lastName}`);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenUserModal = () => {
    setOpenUserModal(true);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };

  const handleRetardModalOpen = () => {
    fetchRetardData(); // Fetch retard data when opening the modal
    setRetardModalOpen(true);
  };

  const handleRetardModalClose = () => {
    setRetardModalOpen(false);
  };

  const handleVacancyModalClose = () => {
    setVacancyModalOpen(false);
  };

  const handleAbsenceModalClose = () => {
    setAbsenceModalOpen(false);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const userModalBody = (
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
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add New Employee
      </Typography>
      <UserRegistration token={token} onUserAdded={handleUserAdded} />
      <Button onClick={handleCloseUserModal}>Close</Button>
    </Box>
  );

  const retardModalBody = (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" component="h2">
        Retards
      </Typography>
      <TextField
        label="Search by CIN"
        value={cinSearch}
        onChange={(e) => setCinSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleRetardSearch} sx={{ mt: 2 }}>
        Apply
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>CIN</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Justified</TableCell>
              <TableCell>Total Minutes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRetardData.map((retard) => (
              <TableRow key={retard.empId}>
                <TableCell>{retard.empId}</TableCell>
                <TableCell>{retard.cin}</TableCell>
                <TableCell>{retard.description}</TableCell>
                <TableCell>
                  <Checkbox checked={retard.justified} disabled />
                </TableCell>
                <TableCell>{retard.totalminsy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleRetardModalClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );

  const vacancyModalBody = (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" component="h2">
        Vacancies
      </Typography>
      <TextField
        label="Search by CIN"
        value={cinSearch}
        onChange={(e) => setCinSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleVacancySearch} sx={{ mt: 2 }}>
        Apply
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>CIN</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVacancyData.map((vacancy) => (
              <TableRow key={vacancy.empId}>
                <TableCell>{vacancy.empId}</TableCell>
                <TableCell>{vacancy.cin}</TableCell>
                <TableCell>{new Date(vacancy.startDate).toLocaleString()}</TableCell>
                <TableCell>{new Date(vacancy.endDate).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => setVacancyModalOpen(false)} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );
  const absenceModalBody = (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" component="h2">
        Absences
      </Typography>
      <TextField
        label="Search by CIN"
        value={cinSearch}
        onChange={(e) => setCinSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleAbsenceSearch} sx={{ mt: 2 }}>
        Apply
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>CIN</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Justified</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAbsenceData.map((absence) => (
              <TableRow key={absence.empId}>
                <TableCell>{absence.empId}</TableCell>
                <TableCell>{absence.cin}</TableCell>
                <TableCell>{absence.description}</TableCell>
                <TableCell>{absence.totalHours}</TableCell>
                <TableCell>
                  <Checkbox checked={absence.justified} disabled />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => setAbsenceModalOpen(false)} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  );

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleOpenUserModal}
        >
          New User
        </Button>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<WatchLaterIcon />}
          onClick={handleRetardModalOpen}
        >
          Show Retard
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleVacancyModalOpen}
        >
          Show Vacancies
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleAbsenceModalOpen}
        >
          Show Absences
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={(event) => setFilterName(event.target.value)}
          placeholder="Search by name or CIN"
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'firstName', label: 'First Name' },
                  { id: 'imatriculation', label: 'Imatriculation' },
                  { id: 'email', label: 'Email' },
                  { id: 'cin', label: 'CIN' },
                  { id: 'cnss', label: 'CNSS' },
                  { id: 'birthDate', label: 'Birth Date' },
                  { id: 'currentSalary', label: 'Salary' },
                  { id: 'statut', label: 'Status' },
                  { id: 'actions', label: 'Actions', align: 'center' },
                ]}
              />
             <TableBody>
  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
    <UserTableRow
      key={row.id}
      id={row.id}
      name={`${row.firstName} ${row.lastName}`}
      status={row.status}
      email={row.email}
      imatriculation={row.imatriculation}
      cin={row.cin}
      cnss={row.cnss}
      birthDate={row.birthDate}
      currentSalary={row.currentSalary}
      selected={selected.indexOf(`${row.firstName} ${row.lastName}`) !== -1}
      handleClick={(event) => handleClick(event, `${row.firstName} ${row.lastName}`)}
      token={token}  //{/* Pass the token */}
      setUsers={setUsers}  //{/* Pass setUsers */}
    />
  ))}
</TableBody>

            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Modal open={openUserModal} onClose={handleCloseUserModal}>
        {userModalBody}
      </Modal>

      <Modal open={retardModalOpen} onClose={handleRetardModalClose}>
        {retardModalBody}
      </Modal>

      <Modal open={vacancyModalOpen} onClose={handleVacancyModalClose}>
        {vacancyModalBody}
      </Modal>

      <Modal open={absenceModalOpen} onClose={handleAbsenceModalClose}>
        {absenceModalBody}
      </Modal>
    </Container>
  );
}
