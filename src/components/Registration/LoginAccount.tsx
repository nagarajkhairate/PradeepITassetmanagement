import React, { useState, ChangeEvent } from 'react';
import { Box, Typography, Button, Input, FormLabel, IconButton } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../redux/features/AuthSlice';
import { ThunkDispatch } from 'redux-thunk';
import AppForm from '../Common/AppForm';
import { RootState } from '../../redux/store';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginAccount: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
      valid = false;
    }

    setErrors(newErrors);
    if (valid) {
      try {
        const response = await dispatch(loginAccount(formData));

        if (response.meta.requestStatus === 'fulfilled') {
          // Assuming successful response contains status 201
          navigate('/dashboard');
        } else {
          // Handle failed login
          setErrors({ ...newErrors, email: 'Email or Password is not valid' });
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  };



  return (
    <Box minHeight="100vh" display="flex" alignItems="center">
      <Box
        margin="auto"
        maxWidth="30rem"
        width="100%"
        boxShadow="0px 0px 24px rgba(0, 0, 0, 0.1)"
        borderRadius="1rem"
      >
        <AppForm onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '90%', sm: '450px' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              background: '#ffffff',
            }}
          >
            <Typography level="h3">Login</Typography>
            <Box sx={{ width: '100%' }}>
              <FormLabel htmlFor="email" sx={{ ml: '10px' }}>
                Email :
              </FormLabel>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                sx={{ width: '100%', m: '10px', borderRadius: '15px' }}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography
                  level="body-sm"
                  sx={{ ml: '10px', color: '#dc3545' }}
                >
                  {errors.email}
                </Typography>
              )}
            </Box>

            <Box sx={{ width: '100%', position: 'relative' }}>
              <FormLabel htmlFor="password" sx={{ ml: '10px' }}>
                Password :
              </FormLabel>
              <div style={{ position: 'relative', marginBottom: '20px' }}>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{
                    width: '100%',
                    m: '10px',
                    borderRadius: '15px',
                    paddingRight: '40px',
                  }}
                  error={!!errors.password}
                />
                <IconButton
                  onClick={()=> setShowPassword(!showPassword)}
                  sx={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    verticalAlign: 'middle',
                    padding: '10px',
                    '&:hover': {
                      background: 'none',
                    },
                  }}
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </div>
              {errors.password && (
                <Typography
                  level="body-sm"
                  sx={{ ml: '10px', color: '#dc3545' }}
                >
                  {errors.password}
                </Typography>
              )}
            </Box>
            <Typography>Forgot Password?</Typography>

            <Button
              type="submit"
              size="md"
              sx={{
                background: '#FABC1E',
                color: 'black',
                borderRadius: '15px',
                '&:hover': {
                  background: '#e0a800',
                },
              }}
            >
              Sign In
            </Button>
            <Link to="/register">
              {' '}
              <Typography>Sign up for Asset Management</Typography>
            </Link>
          </Box>
        </AppForm>
      </Box>
    </Box>
  );
};

export default LoginAccount;
