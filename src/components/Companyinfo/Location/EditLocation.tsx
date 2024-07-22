import React, { ChangeEvent, FunctionComponent, useState } from 'react'
import { Typography, Sheet } from '@mui/joy'

import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import { FormControl, FormLabel } from '@mui/joy'
import Input from '@mui/joy/Input'
import { useDispatch } from 'react-redux'
import { updateLocation } from '../../../redux/features/LocationSlice'
import { ThunkDispatch } from 'redux-thunk'
import AppForm from '../../Common/AppForm'
import { RootState } from '../../../redux/store'

interface LocationProps {
  location: any
  editOpen: any
  setEditOpen: () => void
}

const EditLocation: FunctionComponent<LocationProps> = ({
  location,
  editOpen,
  setEditOpen,
}) => {
  const [formData, setFormData] = useState<any>(location)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(updateLocation(formData))
    setEditOpen()
  }

  return (
    <Modal
      open={editOpen}
      onClose={setEditOpen}
      aria-labelledby="responsive-dialog-title"
      aria-describedby="modal-desc"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}
      >
        <Typography
          id="responsive-dialog-title"
          component="h2"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {'Edit the Customs here'}
        </Typography>

        <AppForm onSubmit={handleEditButton}>
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
              Location*
            </FormLabel>
            <Input
              variant="outlined"
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              required
              sx={{ width: '70%', marginLeft: '10px' }}
              defaultValue={location ? location.location : ''}
            />
          </FormControl>
          <Button
            autoFocus
            type="submit"
            variant="solid"
            sx={{
              background: '#fdd835',
              color: 'black',
              marginTop: '25px',
              marginLeft: '30%',
            }}
          >
            Update
          </Button>

          <Button
            type="button"
            onClick={() => setEditOpen()}
            autoFocus
            variant="solid"
            sx={{
              background: 'black',
              color: 'white',
              marginLeft: '50px',
            }}
          >
            Cancel
          </Button>
        </AppForm>
      </Sheet>
    </Modal>
  )
}

export default EditLocation
