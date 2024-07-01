import React, { useState, useEffect } from 'react'
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
import { UseSelector, useDispatch } from 'react-redux'
import { UseDispatch } from 'react-redux'
import { updateSites } from '../../../Redux/features/SitesSlice'
import AppForm from '../../../components/Common/AppForm'

import { ThunkDispatch } from 'redux-thunk'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../redux/store'

interface EditSiteProps {
  open: boolean
  onClose: () => void
  site: Site | null
  onSave: (updateSites: Site) => void
}

const initialSitesData = {
  siteName: '',
  description: '',
  address: '',
  aptSuite: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
}

const EditSite: React.FC<EditSiteProps> = ({ open, onClose, site, onSave }) => {
  const [editedSite, setEditedSite] = useState<Site | null>(site)
  const [zipCodeError, setZipCodeError] = useState<string | null>(null)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  React.useEffect(() => {
    setEditedSite(site)
  }, [site])


  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === 'zipCode') {
      const zipCodeRegex = /^\d*$/
      if (!zipCodeRegex.test(value)) {
        setZipCodeError('Zip Code must be numeric')
        return
      } else {
        setZipCodeError(null)
      }
    }
    if (editedSite) {
      setEditedSite({
        ...editedSite,
        [event.target.name]: event.target.value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedSite) {
      const capitalizedSite = {
        ...editedSite,
        siteName: capitalizeWords(editedSite.siteName),
        description: capitalizeWords(editedSite.description),
        address: capitalizeWords(editedSite.address),
        aptSuite: capitalizeWords(editedSite.aptSuite),
        city: capitalizeWords(editedSite.city),
        state: capitalizeWords(editedSite.state),
        country: capitalizeWords(editedSite.country),
      }
    await dispatch(updateSites(capitalizedSite))
    onClose()
  }
  }


  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Edit Site
        </Typography>
        <Divider />
        {editedSite && (
          <AppForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12} md={6}>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Site</FormLabel>

                  <Input
                    placeholder="Site Name"
                    name="siteName"
                    value={editedSite.siteName}
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
                    value={editedSite.description}
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
                    value={editedSite.address}
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
                    value={editedSite.aptSuite}
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
                    value={editedSite.city}
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
                    value={editedSite.state}
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
                    value={editedSite.zipCode}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={!!zipCodeError}
                    helperText={zipCodeError}
                  />
                </FormControl>
                <FormControl sx={{ mb: 2 }}>
                  <FormLabel>Country</FormLabel>
                  <Input
                    placeholder="Country"
                    name="country"
                    value={editedSite.country}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={onClose} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="Submit">Update</Button>
            </Box>
          </AppForm>
        )}
      </Box>
    </Modal>
  )
}

export default EditSite

const modalStyle = {
  position: 'absolute' as 'absolute',
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
