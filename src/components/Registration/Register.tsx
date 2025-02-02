import React, { useState, ChangeEvent, FormEvent } from 'react'
import {
  Box,
  Typography,
  Button,
  Input,
  Checkbox,
  FormLabel,
  IconButton,
  FormControl,
  Grid,
} from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { createAccount } from '../../redux/features/AccountSlice'
import AppForm from '../Common/AppForm'
import { RootState } from '../../redux/store'
import { Link, useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import useColorSelector from '../../configs/useColorSelector'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  termsPrivacyPolicy: boolean
}

const Register: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const navigate = useNavigate()
  const styleConfigs = useColorSelector()
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsPrivacyPolicy: false,
  })

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  // const { loading, error } = useSelector(
  //   (state: RootState) => state.tenant
  // )
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
   
    const { name, value, checked, type } = e.target
    
    const newValue = type === 'checkbox' ? checked : value

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }))

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordsMatch(
        formData.password ===
          (name === 'password' ? newValue : formData.confirmPassword),
      )
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)

    const newErrors: { [key: string]: string } = {}
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required.'
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First Name should contain only letters.'
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required.'
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last Name should contain only letters.'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.'
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.'
    } else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)
    ) {
      newErrors.password =
        'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.'
    }

    if (!formData.termsPrivacyPolicy) {
      newErrors.termsPrivacyPolicy =
        "Please agree to 'Terms of Service' and 'Privacy Policy'."
    }
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
       const response=  await dispatch(createAccount(formData))
        if(response){
          localStorage.setItem('token', 'DummyTokenHere')
          localStorage.setItem('user', JSON.stringify(response.payload))
          navigate('/login')
         } else {
          setErrors({ ...newErrors, email: 'Email or Password is not valid' })
        }

        
      } catch (error) {
        console.error('Account creation failed:', error)
      }
    }
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" sx={{backgroundColor: styleConfigs.backgroundColor}}>

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
            <Typography level="h3">Create an Account</Typography>
            <Grid container spacing={2}>
              <Grid xs={12} sm={12} md={12} lg={12}>
                <FormControl>
                  <FormLabel htmlFor="firstName" sx={{ ml: '10px' }}>
                    First Name
                  </FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <Typography
                      level="body-sm"
                      sx={{ ml: '10px', color: '#dc3545', fontSize: '12px' }}
                    >
                      {errors.firstName}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid xs={12} sm={12} md={12} lg={12}>
                <FormControl>
                  <FormLabel htmlFor="lastName" sx={{ ml: '10px' }}>
                    Last Name
                  </FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <Typography
                      level="body-sm"
                      sx={{ ml: '10px', color: '#dc3545', fontSize: '12px' }}
                    >
                      {errors.lastName}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12}>
                <FormControl>
                  <FormLabel htmlFor="email" sx={{ ml: '10px' }}>
                    Email
                  </FormLabel>
                  <Input
                    type="email"
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
                      sx={{ ml: '10px', color: '#dc3545', fontSize: '12px' }}
                    >
                      {errors.email}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12}>
                <FormControl sx={{ position: 'relative' }}>
                  <FormLabel htmlFor="password" sx={{ ml: '10px' }}>
                    Password
                  </FormLabel>

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
                    sx={{ position: 'absolute', right: '10px', top: '25px' ,'&:hover': {
                          background: 'none',
                        }}}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>

                  {errors.password && (
                    <Typography
                      level="body-sm"
                      sx={{
                        ml: '10px',
                        color: '#dc3545',
                        fontSize: '12px',
                        
                      }}
                    >
                      {errors.password}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid xs={12} sm={12} md={12} lg={12}>
                <FormControl sx={{ position: 'relative' }}>
                  <FormLabel htmlFor="confirmPassword" sx={{ ml: '10px' }}>
                    Re-type Your Password
                  </FormLabel>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Re-type Your Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                  />
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    sx={{
                      position: 'absolute',
                      right: '10px',
                      top: '25px',
                      '&:hover': {
                        background: 'none',
                      },
                    }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>

                  {errors.confirmPassword && (
                    <Typography
                      level="body-sm"
                      sx={{ ml: '10px', color: '#dc3545', fontSize: '12px' }}
                    >
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', gap: '10px', mr: '30px' }}>
              <Checkbox
                name="termsPrivacyPolicy"
                checked={formData.termsPrivacyPolicy}
                onChange={handleChange}
              />
              <Typography>I Agree to the Terms & Privacy Policy.</Typography>
            </Box>
            {submitted && !formData.termsPrivacyPolicy && (
              <span
                style={{
                  color: '#dc3545',
                  fontSize: '12px',
                  marginLeft: '10px',
                }}
              >
                Please agree to Terms of Service and Privacy Policy.
              </span>
            )}

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
              // disabled={loading}
            >
              Sign Up
            </Button>
            {/* {error && (
                    <Typography
                      level="body-sm"
                      sx={{ ml: '10px', color: '#dc3545', fontSize: '12px' }}
                    >
                      {error}
                    </Typography>
                  )} */}
            <Link to="/login">
              <Typography> Already have an account?</Typography>
            </Link>
          </Box>
        </AppForm>
      </Box>
    </Box>
  )
}

export default Register
