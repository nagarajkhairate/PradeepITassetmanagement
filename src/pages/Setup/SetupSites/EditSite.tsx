import React, { useState, useEffect, ChangeEvent, memo } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Divider,
  Input,
} from '@mui/joy'
import { Site } from './SetupSites'
import { useDispatch } from 'react-redux'
import { updateSites } from '../../../redux/features/SitesSlice'
import AppForm from '../../../components/Common/AppForm'

import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'

interface EditSiteProps {
  open: boolean
  onClose: () => void
  site: Site | null
}

const EditSite: React.FC<EditSiteProps> = ({ open, onClose, site }) => {
  const [formData, setFormData] = useState<any>(site)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  useEffect(() => {
    setFormData(site)
  }, [site])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await dispatch(updateSites(formData))
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Edit Site
        </Typography>
        <Divider />
        {formData && (
          <AppForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Site</FormLabel>

                  <Input
                    placeholder="Site Name"
                    name="siteName"
                    value={formData.siteName}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
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
                <FormControl sx={{ mb: 2 }}>
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
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Apt. / Suite</FormLabel>
                  <Input
                    placeholder="Apt. / Suite"
                    name="aptSuite"
                    value={formData.aptSuite}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>City</FormLabel>
                  <Input
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
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
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Zip Code</FormLabel>
                  <Input
                    placeholder="ZipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    // error={!!zipCodeError}
                    // helperText={zipCodeError}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Country</FormLabel>
                  <Input
                    placeholder="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Box
               sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { md: 'row'},
                justifyContent: { xs: 'space-between', md: 'flex-end' },
                gap: '5px',
                mt: 4,
                flexWrap:'wrap'
              }}
            >
              <Button
               sx={{
                background: 'black',
                color: 'white',
                '&:hover': { background: "#424242" },
              }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="Submit"
                sx={{
                  background: '#fdd835',
                  '&:hover': { background: '#E1A91B' },
                  color: 'black',

                }}
              >
                Update
              </Button>
            </Box>
          </AppForm>
        )}
      </Box>
    </Modal>
  )
}

export default memo(EditSite)

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'White',
  p: 4,
  borderRadius: 10,
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto',
}
