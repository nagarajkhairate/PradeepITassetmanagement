import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, Sheet } from '@mui/joy'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import { FormControl, FormLabel } from '@mui/joy'
import Input from '@mui/joy/Input'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import LocationSetup from './LocationSetup'
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch, RootState } from '../../../Redux/store'
import { deleteLocation, updateLocation } from '../../../Redux/features/LocationSlice'
import { ThunkDispatch } from 'redux-thunk'


type Location = {
  id: number
  location: string
}

interface Props {
  locationName: Location[]
  onLocationChange: (updatedData: Location[]) => void
}

export function LocationSetupEdit({ locationName, onLocationChange }: Props) {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [locData, setLocData] = useState<{ locationData: Location[] }>({locationData: [],})
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const locations = useSelector((state: RootState) => state.locations.data)
// const dispatch = useDispatch<AppDispatch>()
console.log(locations)


  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index],
    )
    setSelectedCell(index)
  }

  const handleClickEditOpen = () => {
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedCell(null)

    // console.log(JSON.stringify(editOpen))
  }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const location = (e.target as any).location.value
    if (selectedCell !== null) {
      const updatedData = locData.locationData.map((item, index) =>
        index === selectedCell ? { ...item, location } : item,
      )
      setLocData({ ...locData, locationData: updatedData })
      handleEditClose()
      dispatch(updateLocation(updatedData))
      onLocationChange(updatedData)
    }
  }

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const deleteData = locData.locationData.filter(
      (_, index) => index !== selectedCell,
    )
    setLocData({ ...locData, locationData: deleteData })
    setMatchedSelected([])
    setDeleteOpen(false)
    // dispatch(deleteLocation())
    onLocationChange(deleteData)
  
  }

  const handleDeleteButton = () => {
    if (selectedCell !== null) {
      handleDeleteOpen()
    }
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  useEffect(() => {
    setLocData({ locationData: locationName })
  }, [locationName])

  const handleEdit = () => {
    if (selectedCell !== null) {
      handleClickEditOpen()
    }
  }

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
      <Table borderAxis="both" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: 30 }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    matchedSelected.length > 0 &&
                    matchedSelected.length < locData.locationData.length
                  }
                  checked={
                    matchedSelected.length > 0 &&
                    matchedSelected.length === locData.locationData.length
                  }
                  onChange={(event) => {
                    const isChecked = event.target.checked
                    setMatchedSelected(
                      isChecked
                        ? locData.locationData.map((_, index) => index)
                        : [],
                    )
                  }}
                  color={
                    matchedSelected.length > 0 &&
                    matchedSelected.length === locData.locationData.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th>Location</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
              <tbody>
              {locData.locationData.length > 0 ? locData.locationData.map((custom, index) => (
                    <tr key={custom.id}>
                      <td>
                        <Checkbox
                          checked={matchedSelected.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          color="primary"
                        />
                      </td>
                      <td>{custom.location}</td>
    
                      <td>
                        <Button
                          onClick={() => handleEdit()}
                          sx={{
                            background: '#ffffff',
                            color: 'green',
                            display: 'flex',
                            justifyContent: {md:'flex-end', xs:'center'},
                            marginLeft: 'none',
                            border: '1px solid green ',
                            borderRadius: '13px',
                            '&:hover': {
                              color: 'white',
                              background: 'green',
                            },
                          }}
                        >
                          <EditOutlinedIcon />
                          Edit
                        </Button>
                      </td>
    
                      <td>
                        <Button
                          onClick={() => handleDeleteButton()}
                          sx={{
                            background: '#ffffff',
                            color: '#d32f2f',
                            display: 'flex',
                            justifyContent: {md:'flex-end',xs:'center'},
                            marginLeft: 'none',
                            border: '1px solid red ',
                            borderRadius: '13px',
                            '&:hover': {
                              color: 'white',
                              background: '#d32f2f',
                            },
                          }}
                        >
                          <DeleteForeverIcon />
                          Delete
                        </Button>
                      </td>
                    </tr>
                     )): <tr ><td colSpan={4} style={{ textAlign: 'center' }}>No Data Found</td></tr> }
              </tbody>
               
                
       
        </Table>
      
        

        <Modal
          open={editOpen}
          onClose={handleEditClose}
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
            <div>
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

              <form onSubmit={handleEditButton}>
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
                    required
                    sx={{ width: '70%', marginLeft: '10px' }}
                    // defaultValue={
                    //   selectedCell !== null
                    //     ? locData.locationData[selectedCell].location
                    //     : ''
                    // }
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
                  onClick={handleEditClose}
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
              </form>
            </div>
          </Sheet>
        </Modal>

        <Modal
          open={deleteOpen}
          onClose={handleDeleteClose}
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
            <div>
              <Typography
                id="responsive-dialog-title"
                component="h2"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                {'Delete Customs here'}
              </Typography>

              <form onSubmit={handleDeleteSubmit}>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Box sx={{ marginBottom: '20px', padding: '20px' }}>
                    Are you sure you want to delete this Location?
                  </Box>
                  {/* <Input
                    variant="outlined"
                    // type="text"
                    // id="location"
                    // name="location"
                    required
                    sx={{ width: '92%', marginLeft: '20px' }}
                    defaultValue={
                      selectedCell !== null
                        ? locData.locationData[selectedCell].location: ''
                    }
                  /> */}
                </FormControl>
                <Button
                  autoFocus
                  type="submit"
                  variant="solid"
                  sx={{
                    background: '#fdd835',
                    color: 'black',
                    // marginTop: '25px',
                    marginLeft: '40%',
                  }}
                >
                  Confirm Delete
                </Button>

                <Button
                  type="button"
                  onClick={handleDeleteClose}
                  autoFocus
                  variant="solid"
                  sx={{
                    background: 'black',
                    color: 'white',
                    // marginTop: '25px',
                    marginLeft: '10px',
                  }}
                >
                  Cancel
                </Button>
              </form>
            </div>
          </Sheet>
        </Modal>
      </Stack>
    </>
  )
}

export default LocationSetupEdit
















