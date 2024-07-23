import React, { useState, ChangeEvent } from 'react'
import {
  Box,
  Typography,
  Button,
  Input,
  FormLabel,
  IconButton,
  Grid,
  FormControl,
} from '@mui/joy'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccount } from '../../redux/features/AuthSlice'
import { ThunkDispatch } from 'redux-thunk'
import AppForm from '../Common/AppForm'
import { RootState } from '../../redux/store'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const LoginAccount: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(
    (state: RootState) => state.login,
  )
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let valid = true
    const newErrors = { email: '', password: '' }

    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = 'Please enter a valid email address.'
      valid = false
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
      valid = false
    }
    setErrors(newErrors)
    if (valid) {
      try {
      const LoginDetails=   await dispatch(loginAccount(formData))
        if (LoginDetails) {
          sessionStorage.setItem('user', JSON.stringify(LoginDetails.payload))
          navigate('/dashboard');
        } else {
          setErrors({ ...newErrors, email: 'Email or Password is not valid' })
        }
      } catch (error) {
        console.error('Login failed:', error)
      }
    }
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center"  
    // bgcolor="#FABC1E"
    >
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
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '15px',
              padding: '20px',
              background: '#ffffff',
            }}
          >
            <Typography level="h3">Login</Typography>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <FormControl>
                  <FormLabel htmlFor="email">Email :</FormLabel>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
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
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl>
                  <FormLabel htmlFor="password">Password :</FormLabel>

                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                  />
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      position: 'absolute',
                      right: '10px',
                      top: '25px',
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

                  {errors.password && (
                    <Typography
                      level="body-sm"
                      sx={{ ml: '10px', color: '#dc3545' }}
                    >
                      {errors.password}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Typography>Forgot Password?</Typography>
            <Button
              type="submit"
              size="md"
              sx={{
                background: '#FABC1E',
                color: 'black',
                '&:hover': {
                  background: '#e0a800',
                },
              }}
              disabled={loading}
            >
              {loading ? 'Loading' : 'Sign In'}
            </Button>
            {error && (
              <Typography
                level="body-sm"
                sx={{ ml: '10px', color: '#dc3545', fontSize: '12px' }}
              >
                {error}
              </Typography>
            )}
            <Link to="/register">
              <Typography>Sign up for Asset Management</Typography>
            </Link>
          </Box>
        </AppForm>
      </Box>
    </Box>
  )
}

export default LoginAccount
