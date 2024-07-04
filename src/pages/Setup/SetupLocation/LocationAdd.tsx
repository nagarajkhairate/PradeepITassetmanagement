import { KeyboardArrowDown } from '@mui/icons-material'
import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Option, Select, Sheet, Typography, selectClasses } from '@mui/joy'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { fetchSites } from '../../../Redux/features/SitesSlice'
import AppForm from '../../../components/Common/AppForm'
import { addLocation } from '../../../Redux/features/LocationSlice'
import { RootState } from '../../../redux/store'


interface LocationAddProps {
  open:any,
  setOpen:any
  handleClose:() => void
  }

  const LocationAdd: React.FC<LocationAddProps> = ({open, setOpen, handleClose}) => {
    const [locationForm, setLocationForm] =useState<{ [key: string]: any }>({})
    const sites = useSelector((state:RootState) => state.sites.data);
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    
      React.useEffect(()=>{
        dispatch(fetchSites())
      },[dispatch])

      const handleAddLocation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const capitalizedForm = {
          ...locationForm,
          location: capitalizeWords(locationForm.location || '')
        }
        console.log(JSON.stringify(capitalizedForm))
        dispatch(addLocation(capitalizedForm))
        setOpen(false)
      }

      const capitalizeWords = (str: string) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase())
      }

      
      const HandleInputChange= (e: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value} = e.target
        setLocationForm((prevData:any)=>({
          ...prevData,
          [name]:value
        })
          
        )
      }

      const handleSelectChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
      ) => {
        setLocationForm((prevData:any)=>({
          ...prevData,
          siteId:newValue
        })
          
        )
      }

  return (
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
                    <AppForm onSubmit={handleAddLocation}>
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
                           onChange={handleSelectChange}
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
                            {sites && sites.map((site)=>(
                              <Option key={site.id} value={site.id}>{site.siteName}</Option>
                            ))}
                            
                            
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
                            // value={locationForm.location}
                            name='location'
                            onChange={HandleInputChange}
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
                    </AppForm>
                  </Box>
                </div>
              </Sheet>
  )
}

export default LocationAdd