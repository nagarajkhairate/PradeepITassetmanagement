import React from 'react'
import { Box, Sheet, selectClasses } from '@mui/joy'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../Redux/store'
import { Typography, Divider } from '@mui/joy'
import Button from '@mui/joy/Button'
import { FormControl, FormLabel } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import Input from '@mui/joy/Input'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Select, Option } from '@mui/joy'
import Modal from '@mui/joy/Modal'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { useState } from 'react'
import LocationSetupEdit from './LocationSetupEdit'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import AppView from '../../../components/Common/AppView'
import { KeyboardArrowDown } from '@mui/icons-material'
import {addLocation} from '../../../Redux/features/LocationSlice'

type Location = {
  id: number
  location: string
}

const LocationSetup: React.FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [location, setLocation] = useState<string>('')
  const [locationName, setLocationName] = useState<Location[]>([])

  const locations = useSelector((state: RootState) => state.locations)
const dispatch = useDispatch<AppDispatch>()

  const handleLocationChange = (updatedData: Location[]) => {
    setLocationName(updatedData)
    console.log('location: ', JSON.stringify(updatedData))
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddLocation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newLocation: Location = {
      id: locationName.length
        ? locationName[locationName.length - 1].id + 1
        : 1,
      location: location,
    }
    setLocationName([...locationName, newLocation])
    setLocation('') // Clear the input field after adding
    handleClose()
    dispatch(addLocation(newLocation))
    // console.log(newLocation)
  }

  return (
    <AppView>
      <Typography level="h4" sx={{ display: 'flex', alignItems: 'center', gap:1 }}>
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#d32f2f' }}
        />
        Locations
      </Typography>

      <Box
        sx={{
          borderRadius: 'none',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                mt:0
              }}
            >
              <PlaylistAddCheckOutlinedIcon
                style={{ fontSize: '1.4rem', color: '#d32f2f', }}
              />
              List of Location
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: 2,
            }}
          >
            <Button
              autoFocus
              variant="solid"
              sx={{
                background: '#388e3c',
                borderRadius: '15px',
                color: 'white',
              }}
              component="label"
              onClick={handleClickOpen}
            >
              <AddIcon /> Add New Location
            </Button>

            <Modal
              aria-labelledby="responsive-dialog-title"
              aria-describedby="modal-desc"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              open={open}
              onClose={handleClose}
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
                    {'Add a Location'}
                  </Typography>
                  <Divider />

                  <Box sx={{ marginBottom: '10px' }}>
                    <form onSubmit={handleAddLocation}>
                      <FormControl
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      ></FormControl>

                      <Box
                        sx={{
                          marginTop: '1px',
                          marginBottom: '15px',
                          padding: '10px',
                        }}
                      >
                        <Typography sx={{ padding: 'none', width: '100%' }}>
                          Enter the data about your new location in the fields
                          below and we will add it to your list.
                        </Typography>
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
                            Site*:
                          </FormLabel>
                          {/* <Input
                                    value={category}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => setCategory(e.target.value)}
                                    placeholder="Type here"
                                    sx={{ marginLeft: "20px", width: "70%", marginTop:'10px', }}
                                  /> */}
                          <Select
                            placeholder="Select Site"
                            indicator={<KeyboardArrowDown />}
                            sx={{
                              width: 240,
                              [`& .${selectClasses.indicator}`]: {
                                transition: '0.2s',
                                [`&.${selectClasses.expanded}`]: {
                                  transform: 'rotate(-180deg)',
                                },
                              },
                            }}
                          >
                            <Option value="india">india</Option>
                            <Option value="delhi">Delhi</Option>
                            <Option value="banglore">Banglore</Option>
                          </Select>
                        </FormControl>

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
                              marginLeft: 'none',
                            }}
                          >
                            Location*:
                          </FormLabel>
                          <Input
                            value={location}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => setLocation(e.target.value)}
                            placeholder="Type here"
                            sx={{
                              marginLeft: '5px',
                              width: '50%',
                              marginTop: '10px',
                            }}
                          />
                        </FormControl>
                      </Box>
                      <Divider />

                      <Button
                        autoFocus
                        type="submit"
                        variant="solid"
                        sx={{
                          background: '#fdd835',
                          color: 'black',
                          marginTop: '25px',
                          marginLeft: '40%',
                        }}
                      >
                        Add
                      </Button>

                      <Button
                        type="button"
                        onClick={handleClose}
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
                  </Box>
                </div>
              </Sheet>
            </Modal>

            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: 'black',
                borderRadius: '15px',
                color: 'white',
              }}
            >
              <PublishOutlinedIcon />
              Import Locations
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Box sx={{ padding: '10px', marginTop: '10px' }}>
            You may also add Locations. Locations are a subset of Sites. For
            example, the Site may be a building or address. The Location may be
            a specific room, office or floor within the Site. Select a Site and
            add your list of Locations here.
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'space-between' },
              marginTop: '1px',
              // marginBottom: '15px',
              padding: '10px',
            }}
          >
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <FormLabel
                sx={{
                  marginTop: '6px',
                  mb: { xs: 1, md: 1 },              
                  m:{md:'none'},
                  
                }}
              >
                Select a Site:
              </FormLabel>

              <Select
                placeholder="Nothing Selected"
                sx={{
                  marginLeft: { md: '20px' },
                  alignItems: 'center',
                  background: '#ff5252',
                  color: 'white',
                  borderRadius: '15px',
                }}
                required
                // value={selectedValue}
                // onChange={(event) =>
                //   setSelectedValue(
                //     (event?.target as HTMLSelectElement)?.value ?? ""
                //   )
                // }
              >
                <Option value="Location1">Location1</Option>
              </Select>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'space-between' },
              padding: '10px',
            }}
          >
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Select
                placeholder="10"
                sx={{
                  // marginLeft: { md: '20px' },
                  alignItems: 'center',
                  background: 'none',
                  color: 'black',
                  borderRadius: '15px',
                }}
                required
              >
                <Option value="10">10</Option>
              </Select>

              <FormLabel
                sx={{
                  marginLeft: '10px',
                  marginTop: '6px',
                  mb: { xs: 1, md: 1 },
                }}
              >
                locations
              </FormLabel>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: 1,
              }}
            >
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',
                  
                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateBeforeOutlinedIcon />
              </Button>
              <Button
                sx={{
                  background: '#ffffff',
                  color: 'green',
                  border: '1px solid green ',

                  '&:hover': {
                    color: 'white',
                    background: 'green',
                  },
                }}
              >
                1
              </Button>
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',

                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateNextOutlinedIcon />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box>
          <LocationSetupEdit
            locationName={locationName}
            onLocationChange={handleLocationChange}
          />
        </Box>
        <Divider />
      </Box>
    </AppView>
  )
}

export default LocationSetup
