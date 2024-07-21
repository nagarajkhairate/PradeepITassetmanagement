import React, { ChangeEvent, useState } from 'react'
import {
  Box,
  Button,
  Input,
  Modal,
  Option,
  Select,
  Typography,
  FormLabel,
  Grid,
  Divider,
  FormControl,
} from '@mui/joy'
import { addSites } from '../../../redux/features/SitesSlice'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../../redux/store'
import AppForm from '../../../components/Common/AppForm'

interface AddSiteProps {
  open: any
  setOpen: any
}

interface Site {
  siteName: string
  description: string
  address: string
  aptSuite: string
  city: string
  state: string
  zipCode: number
  country: string
}

const initialSiteData: Site = {
  siteName: '',
  description: '',
  address: '',
  aptSuite: '',
  city: '',
  state: '',
  zipCode: 0,
  country: '',
}

const AddSite: React.FC<AddSiteProps> = ({ open, setOpen }) => {
  const [formData, setFormData] = useState<Site>(initialSiteData)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: string | null,
    field: string,
  ) => {
    if (newValue !== null) {
      setFormData((prevState) => ({ ...prevState, [field]: newValue }))
    }
  }


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      await dispatch(addSites(formData))
      setOpen()
    } catch (error) {
      console.log(error)
    }
      
  
    }

  return (
    <Modal open={open} onClose={setOpen}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          p: 4,
          borderRadius: 10,
          maxWidth: '600px',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Typography level="h4" sx={{ mb: 2 }}>
          Add New Site
        </Typography>
        <Divider />

        <Typography sx={{ mb: 2 }}>
          Enter the data about your new site in the fields below and we will add
          it to your list.
        </Typography>
        <AppForm onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>Site</FormLabel>
              <Input
                placeholder="Select Site"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              {' '}
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              {' '}
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select Country"
                name="country"
                required
                sx={{ height: '36px', mb: 2 }}
                value={formData.country}
                onChange={(event, newValue) =>
                  handleSelectChange(event, newValue, 'country')
                }
              >
                <Option value="india">India</Option>
                <Option value="usa">USA</Option>
                <Option value="canada">Canada</Option>
                <Option value="shrilankha">Shrilankha</Option>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>State</FormLabel>
              <Input
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>Zip Code</FormLabel>
              <Input
                placeholder="ZipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl>
              <FormLabel>Apt. / Suite</FormLabel>
              <Input
                placeholder="Apt./ Suite"
                name="aptSuite"
                value={formData.aptSuite}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              mr: 1,
              background: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: '#333', // Darker shade of black
              },
            }}
          >
            Cancel
          </Button>
          <Button
          type="Submit"
            sx={{
              background: '#fdd835',
              color: 'black',
              '&:hover': {
                backgroundColor: '#c6a700', // Darker shade of #fdd835
              },
            }}
          >
            Add Site
          </Button>
          </Box>
        </AppForm>
       
      
      </Box>
    </Modal>
  )
}

export default AddSite

