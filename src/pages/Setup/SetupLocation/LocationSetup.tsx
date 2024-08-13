import React from 'react'
import { Box, Modal } from '@mui/joy'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Divider } from '@mui/joy'
import Button from '@mui/joy/Button'
import { FormControl, FormLabel } from '@mui/joy'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Select, Option } from '@mui/joy'
import { useState } from 'react'
import LocationSetupEdit from './LocationSetupEdit'
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined'
import AppView from '../../../components/Common/AppView'
import {
  addLocation,
  fetchLocation,
} from '../../../redux/features/LocationSlice'
import { ThunkDispatch } from 'redux-thunk'
import LocationAdd from './LocationAdd'
import AddIcon from '@mui/icons-material/Add'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import LocationDelete from './LocationDelete'
import { RootState } from '../../../redux/store'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'

type Location = {
  id: number
  locations: string
}

const LocationSetup: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [locations, setLocations] = useState<string>('')
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [deleteOpen, setDeleteOpen] = useState(false)

  const location = useSelector((state: RootState) => state.location.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(location)

  const handleLocationChange = (updatedData: Location[]) => {
    // setLocationName(updatedData)
    console.log('location: ', JSON.stringify(updatedData))
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  React.useEffect(() => {
    dispatch(fetchLocation())
  }, [])

  return (
    <AppView>
      <Typography
        level="h3"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <RoomOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC12E' }} />
        Locations
      </Typography>

      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: 2,
            mb: 1,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                mt: 0,
              }}
            >
              <TuneOutlinedIcon
                style={{ fontSize: '1.1rem', color: '#FBC12E' }}
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
                '&:hover': {
                  backgroundColor: '#4caf50',
                },
                borderRadius: '15px',
                color: 'white',
              }}
              component="label"
              onClick={() => setOpen(true)}
            >
              <AddIcon /> Add New Location
            </Button>

            {matchedSelected.length > 0 && (
              <Button
                onClick={handleDeleteOpen}
                autoFocus
                variant="solid"
                sx={{
                  // fontSize: '13px',
                  borderRadius: '15px',
                  background: '#d32f2f',
                  '&:hover': {
                    backgroundColor: '#e57373',
                  },
                  display: 'flex',
                  justifyContent: { md: 'flex-end', xs: 'center' },
                  // marginLeft: 'none',
                  // border: '1px solid red',
                  padding: '.30rem .55rem',
                }}
              >
                <DeleteForeverIcon sx={{ fontSize: '15px' }} />
                Delete Location
              </Button>
            )}

            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: 'black',
                '&:hover': {
                  backgroundColor: '#616161',
                },
                borderRadius: '15px',
                color: 'white',
              }}
            >
              <PublishOutlinedIcon />
              Import Locations
            </Button>
          </Box>

          {open && (
            <Modal
              aria-labelledby="responsive-dialog-title"
              aria-describedby="modal-desc"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 5,
              }}
              open={open}
              onClose={setOpen}
            >
              <LocationAdd
                open={open}
                setOpen={setOpen}
                handleClose={handleClose}
              />
            </Modal>
          )}
        </Box>

        <Divider />

        <Box>
          <Box sx={{ marginTop: '10px' }}>
            <Typography>
              You may also add Locations. Locations are a subset of Sites. For
              example, the Site may be a building or address. The Location may
              be a specific room, office or floor within the Site. Select a Site
              and add your list of Locations here.
            </Typography>
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
              {/* <FormLabel
                sx={{
                  marginTop: '6px',
                  mb: { xs: 1, md: 1 },
                  m: { md: 'none' },
                }}
              ><Typography>Select a Site:</Typography>
                
              </FormLabel> */}

              {/* <Select
                placeholder="Nothing Selected"
                sx={{
                  marginLeft: { md: '20px' },
                  alignItems: 'center',
                  background: '#ff5252',
                  color: 'white',
                  borderRadius: '15px',
                }}
                required
              >
                <Option value="Location1">Location1</Option>
              </Select> */}
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              padding: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'center', md: 'flex-end' },
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
            locationName={location}
            matchedSelected={matchedSelected}
            setMatchedSelected={setMatchedSelected}
            handleDeleteOpen={handleDeleteOpen}
          />
        </Box>
        <Divider />
      </Box>

      <LocationDelete
        selectedCell={null}
        // onLocationChange={handleLocationChange}
        setMatchedSelected={setMatchedSelected}
        setSelectedCell={() => {}}
        locDatas={{ locationData: [] }}
        setLocDatas={() => {}}
        handleDeleteClose={handleDeleteClose}
        open={deleteOpen}
      />
    </AppView>
  )
}

export default LocationSetup
