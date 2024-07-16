import React from 'react'
import { Box, Modal } from '@mui/joy'
import { useSelector, useDispatch } from 'react-redux'
import { Typography, Divider } from '@mui/joy'
import Button from '@mui/joy/Button'
import { FormControl, FormLabel } from '@mui/joy'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'


import { Select, Option } from '@mui/joy'
import { useState } from 'react'
import EditLocation from './EditLocation'
import AppView from '../../../components/Common/AppView'

import { ThunkDispatch } from 'redux-thunk'
import AddLocation from './AddLocation'
import AddIcon from '@mui/icons-material/Add'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import DeleteLocation from './DeleteLocation'
import { RootState } from '../../../redux/store'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import { fetchLocation } from '../../../redux/features/LocationSlice'

interface LocationProps {
  activeTab: number
  setActiveTab: (tab: number) => void
}

const LocationPage: React.FunctionComponent<LocationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const locations = useSelector((state: RootState) => state.location.data)
  console.log(locations)

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  const handleNext = () => {
    setActiveTab(activeTab + 1)
  }

  const handleBack = () => {
    setActiveTab(activeTab - 1)
  }

  React.useEffect(() => {
    dispatch(fetchLocation())
  }, [])

  return (
    <AppView>
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
                sx={{
                  fontSize: '1.1rem',
                  color: '#FABC1E',
                  alignItems: 'center',
                }}
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
                  fontSize: '13px',
                  // background: '#ffffff',
                  borderRadius: '15px',
                  // color: '#d32f2f',
                  background: '#d32f2f',
                  display: 'flex',
                  justifyContent: { md: 'flex-end', xs: 'center' },
                  marginLeft: 'none',
                  border: '1px solid red',

                  padding: '.5rem .10rem',
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
              }}
              open={open}
              onClose={setOpen}
            >
              <AddLocation
                open={open}
                setOpen={setOpen}
              />
            </Modal>
          )}
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
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { md: 'row', xs: 'column' },
                justifyContent: { xs: 'center', md: 'space-between' },
                marginTop: '1px',
                padding: '10px',
                m: { md: 'none', xs: 'center' },
              }}
            >
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  m: { md: 'none', xs: 'center' },
                }}
              >
                <FormLabel
                  sx={{
                    marginTop: '6px',
                    mb: { xs: 1, md: 1 },
                    m: { md: 'none', xs: 'center' },
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
                >
                  <Option value="Location1">Location1</Option>
                </Select>
              </FormControl>
            </Box>
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
          <EditLocation
            locationName={locations}
            matchedSelected={matchedSelected}
            setMatchedSelected={setMatchedSelected}
            handleDeleteOpen={handleDeleteOpen}
          />
        </Box>
        <Divider />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          sx={{
            background: '#388e3c',
            color: 'white',
            '&:hover': { background: '#388e3B' },
            borderRadius: '10px',
          }}
          disabled={activeTab === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            background: '#FABC1E',
            color: 'black',
            '&:hover': { background: '#E1A91B' },
            borderRadius: '10px',
          }}
          onClick={handleNext}
        >
          Continue
        </Button>
      </Box>
      </Box>

      <DeleteLocation
        selectedCell={null}
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

export default LocationPage
