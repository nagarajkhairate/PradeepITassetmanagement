import { KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Option, Select, Sheet, Typography, selectClasses } from '@mui/joy'
import React, { useState } from 'react'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import AddIcon from '@mui/icons-material/Add'


interface LocationAddProps {
    location: string
    setLocation: React.Dispatch<React.SetStateAction<string>>
    handleAddLocation: (e: React.FormEvent<HTMLFormElement>) => void
  }

  const LocationAdd: React.FC<LocationAddProps> = ({
    location,
    setLocation,
    handleAddLocation,

  }:LocationAddProps) => {
    const [open, setOpen] = useState<boolean>(false)

    const handleClickOpen = () => {
        setOpen(true)
      }

      const handleClose = () => {
        setOpen(false)
      }

      
      

  return (
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
  )
}

export default LocationAdd