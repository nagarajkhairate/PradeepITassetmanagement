import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, Sheet, Select, selectClasses, Option } from '@mui/joy'
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
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteLocation,
  updateLocation,
} from '../../../redux/features/LocationSlice'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import AppForm from '../../../components/Common/AppForm'
import { KeyboardArrowDown } from '@mui/icons-material'

type Location = {
  id: number
  locations: string
}

interface Props {
  locationName: Location[]
  matchedSelected: number[]
  setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>
  handleDeleteOpen: () => void
}

export function LocationSetupEdit({
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
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const location = useSelector((state: RootState) => state.location.data)
  const sites = useSelector((state:RootState) => state.sites.data);
  console.log(location)
  const selectedLocation = selectedCell !== null ? location[selectedCell] : null

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
      const siteId=(e.target as any).site.value
      const updatedCategory = {
        ...selectedLocation,
        location: capitalizeWords(location),
        siteId,
      }
      dispatch(updateLocation(updatedCategory))
      handleEditClose()
    }
  }

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleDeleteButton = (index: number) => {
    setIsDelete(true)
    setSelectedCell(index)
    dispatch(deleteLocation(index))
  }

  useEffect(() => {
    setSelectedCell(null)
  }, [location])

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
            borderRadius: '5px',
          }}
        >
          <Table
            borderAxis="both"
            aria-label="basic table"
            style={{
              borderCollapse: 'collapse',
              border: '1px solid grey',
              minWidth: '500px',
              borderRadius: '5px',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: 35,
                    background: '#fff8e6',
                    verticalAlign: 'middle',
                  }}
                >
                  <Checkbox
                    size="sm"
                    indeterminate={
                      matchedSelected.length > 0 &&
                      matchedSelected.length < location.length
                    }
                    checked={
                      matchedSelected.length > 0 &&
                      matchedSelected.length === location.length
                    }
                    onChange={(event) => {
                      const isChecked = event.target.checked
                      setMatchedSelected(
                        isChecked ? location.map((_, index) => index) : [],
                      )
                    }}
                    color={
                      matchedSelected.length > 0 &&
                      matchedSelected.length === location.length
                        ? 'primary'
                        : undefined
                    }
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </th>
                <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                  Location
                </th>
                <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                  Edit
                </th>
                <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {location.length > 0 ? (
                location.map((custom, index) => (
                  <tr key={custom.id}>
                    <td>
                      <Checkbox
                        checked={matchedSelected.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        color="primary"
                      />
                    </td>
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {custom.location}
                    </td>

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
                        <EditOutlinedIcon sx={{ fontSize: '15px' }} />
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
                          padding: '.5rem .35rem',
                        }}
                      >
                        <DeleteForeverIcon sx={{ fontSize: '15px' }} />
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
            p: 3,
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
                    marginTop: '10px',
                  }}
                >
                  <FormLabel
                    sx={{
                      paddingTop: '20px',
                      marginLeft: '20px',
                    }}
                  >
                    Site<span style={{ color: 'red' }}>*</span>:
                  </FormLabel>

                  <Select
                    // onChange={handleSelectChange}
                    defaultValue={selectedLocation?.siteId}
                    placeholder="Select Site"
                    indicator={<KeyboardArrowDown />}
                    sx={{
                      width: { md: 180, xs: 138 },
                      marginLeft:'40px',
                      marginTop: 1,
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)',
                        },
                      },
                    }}
                    required
                  >
                    {sites &&
                      sites.map((site) => (
                        <Option key={site.id} value={site.id}>
                          {site.siteName}
                        </Option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <FormLabel sx={{ marginTop: '22px', marginLeft: '20px' }}>
                    Location<span style={{ color: 'red' }}>*</span>:
                  </FormLabel>
                  <Input
                    variant="outlined"
                    type="text"
                    id="location"
                    name="location"
                    required
                    sx={{ width: '60%', marginLeft: '10px', marginTop: 2 }}
                    defaultValue={
                      selectedLocation ? selectedLocation.location : ''
                    }
                  />
                </FormControl>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { md: 'row' },
                    justifyContent: { xs: 'space-between', md: 'flex-end' },
                    gap: '5px',
                    mt: 4,
                    flexWrap: 'wrap',
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleEditClose}
                    autoFocus
                    variant="solid"
                    sx={{
                      background: 'black',
                      color: 'white',
                      '&:hover': { background: '#424242' },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    autoFocus
                    type="submit"
                    variant="solid"
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
            </div>
          </Sheet>
        </Modal>
      </Stack>
    </>
  )
}

export default LocationSetupEdit
