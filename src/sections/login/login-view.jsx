// src/routes/components/Lo/LoginView.jsx

import { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { bgGradient } from 'src/theme/css';
import { useAuth } from '../../routes/components/Lo/AuthContext';

export default function LoginView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setUserData } = useAuth(); // Use setUserData from context
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  


  const handleClick2 = () => {
    navigate('/reg');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://tv5ug57ehvur5swsrfcnj5ohpe0iqqbu.lambda-url.us-east-1.on.aws/api/signin', { email, password });
  
      // Log the entire response object
      console.log('Login response object:', response);
  
      // Log the data from the response
      console.log('Response data:', response.data);
  
      // Extract the token from the response data
      const { token } = response.data;
  
      // Log the extracted token
      console.log('Token:', token);
  
      // Decode the JWT token
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
  
      // Extract role from the decoded token
      const role = decodedToken.role;
      console.log('Role from token:', role);
  
      // Store the token and set user data
      localStorage.setItem('token', token);
      setUserData({ email, role, token });
  
      // Navigate based on the role
      switch (role) {
        case 'ADMIN':
          navigate('/dashboard');
          break;
        case 'DRIVER':
          navigate('/blog');
          break;
        case 'EMPLOYEE':
          navigate('/employee-management');
          break;
        default:
          console.log('Unknown role:', role);
          navigate('/404');
          break;
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Minimal</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link onClick={handleClick2} style={{ cursor: 'pointer' }} variant="subtitle2" sx={{ ml: 0.5 }}>
              Create One
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                name="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5 }} loading={loading}>
              Sign in
            </LoadingButton>
          </form>
        </Card>
      </Stack>
    </Box>
  );
}
