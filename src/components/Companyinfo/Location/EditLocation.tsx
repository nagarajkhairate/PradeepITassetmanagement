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
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteLocation,
  updateLocation,
} from '../../../Redux/features/LocationSlice'
import { ThunkDispatch } from 'redux-thunk'
import AppForm from '../../Common/AppForm'
import { RootState } from '../../../redux/store'

type Location = {
  id: number
  location: string
}

interface Props {
  locationName: Location[]
  matchedSelected: number[]
  setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>
  handleDeleteOpen: () => void
}

export function EditLocation({
  locationName,
  matchedSelected,
  setMatchedSelected,
  handleDeleteOpen,
}: Props) {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [locData, setLocData] = useState<{ locationData: Location[] }>({
    locationData: [],
  })
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const locations = useSelector((state: RootState) => state.location.data)
  console.log(locations)
  const selectedLocation =
    selectedCell !== null ? locations[selectedCell] : null

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index],
    )
  }

  const handleClickEditOpen = () => {
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedCell(null)
  }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedLocation !== null) {
      const location = (e.target as any).location.value
      const updatedCategory = {
        ...selectedLocation,
        location: capitalizeWords(location),
      }
      dispatch(updateLocation(updatedCategory))
      handleEditClose()
    }
  }

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleDeleteButton = (index: number) => {
    setSelectedCell(index)
    handleDeleteOpen()
  }

  useEffect(() => {
    setSelectedCell(null)
  }, [locations])

  const handleEdit = (index: number) => {
    setSelectedCell(index)
    handleClickEditOpen()
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
        <Box
          sx={{
            overflowX: 'auto',
            fontSize: '14px',
            whiteSpace: 'nowrap',
          }}
        >
          <Table borderAxis="both" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ width: 30, background: '#fff8e6',verticalAlign:'middle' }}>
                  <Checkbox
                    size="sm"
                    indeterminate={
                      matchedSelected.length > 0 &&
                      matchedSelected.length < locations.length
                    }
                    checked={
                      matchedSelected.length > 0 &&
                      matchedSelected.length === locations.length
                    }
                    onChange={() => {
                      if (
                        matchedSelected.length > 0 &&
                        matchedSelected.length === locations.length
                      ) {
                        setMatchedSelected([])
                      } else {
                        const newSelecteds = locations.map((_, index) => index)
                        setMatchedSelected(newSelecteds)
                      }
                    }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </th>
                <th style={{ background: '#fff8e6',verticalAlign:'middle' }}>Location</th>
                <th style={{ background: '#fff8e6',verticalAlign:'middle' }}>Edit</th>
                <th style={{ background: '#fff8e6',verticalAlign:'middle' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {locations.length > 0 ? (
                locations.map((custom, index) => (
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
                        onClick={() => handleEdit(index)}
                        sx={{
                          fontSize: '13px',
                          background: '#ffffff',
                          color: 'green',
                          display: 'flex',
                          justifyContent: {
                            md: 'flex-end',
                            xs: 'center',
                          },
                          marginLeft: 'none',
                          border: '1px solid green ',
                          borderRadius: '13px',
                          '&:hover': {
                            color: 'white',
                            background: 'green',
                          },
                          padding: '.25rem .55rem',
                        }}
                      >
                        <EditOutlinedIcon sx={{ fontSize: '18px' }} />
                        Edit
                      </Button>
                    </td>

                    <td>
                      <Button
                        onClick={() => handleDeleteButton(index)}
                        sx={{
                          fontSize: '13px',
                          background: '#ffffff',
                          color: '#d32f2f',
                          display: 'flex',
                          justifyContent: { md: 'flex-end', xs: 'center' },

                          marginLeft: 'none',
                          border: '1px solid red ',
                          borderRadius: '13px',
                          '&:hover': {
                            color: 'white',
                            background: '#d32f2f',
                          },
                          padding: '.5rem .15rem',
                        }}
                      >
                        <DeleteForeverIcon sx={{ fontSize: '18px' }} />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Box>

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
                    required
                    sx={{ width: '70%', marginLeft: '10px' }}
                    defaultValue={
                      selectedLocation ? selectedLocation.location : ''
                    }
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
              </AppForm>
            </div>
          </Sheet>
        </Modal>
      </Stack>
    </>
  )
}

export default EditLocation
