import * as React from 'react'
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Typography,
  styled,
} from '@mui/joy'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import Grid from '@mui/joy/Grid'
import Button from '@mui/joy/Button'
import ButtonGroup from '@mui/joy/ButtonGroup'
import { useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Stack, Table, Checkbox } from '@mui/joy'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditSite from './EditSite'
import AddSite from './AddSite'
import DeleteSite from './DeleteSite'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import AppView from '../../../components/Common/AppView'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../Redux/store'
import {
  deleteSites,
  fetchSites,
  updateSites,
} from '../../../Redux/features/SitesSlice'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'

export interface Site {
  siteName: string
  description: string
  address: string
  aptSuite: string
  city: string
  state: string
  zipCode: number
  country: string
}

const SetupSites: React.FC = ({}) => {
  const theme = useTheme()
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(false)
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [isAddDialogOpen, setAddDialogOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useState<number | null>(null)

  const sites = useSelector((state: RootState) => state.sites.data)

  const handleDeleteClick = (site: Site) => {
    setSelectedSite(site)
    setDeleteOpen(true)
  }

  const handleDelete = () => {
    if (selectedSite) {
      dispatch(deleteSites(selectedSite))
      setDeleteOpen(false)
      setSelectedSite(null)
    }
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setSelectedSite(null)
  }

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index],
    )
    setSelectedCell(index)
  }

  const handleEditClick = (site: Site) => {
    dispatch(updateSites(selectedSite))
    setSelectedSite(site)
    setEditOpen(true)
  }

  React.useEffect(() => {
    dispatch(fetchSites())
  }, [dispatch])

  return (
    <AppView>
      <Typography level="h4" style={{ display: 'flex', alignItems: 'center' }}>
        <RoomOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC21E' }} />
        Sites
      </Typography>

      <Box
        sx={{
          borderRadius: 'none',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          padding: 2,
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
          <Grid
            container
            spacing={1}
            sx={{ flexGrow: 1, paddingTop: '20px', paddingBottom: '10px' }}
          >
            <Grid xs={4}>
              <Box
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typography
                  sx={{
                   
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '30px',
                    textAlign: { xs: 'center', md: 'left' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  <TuneOutlinedIcon
                    style={{
                      fontSize: '1.4rem',
                      color: '#FBC21E',
                      alignItems: 'center',
                    }}
                  />
                  List of Sites
                </Typography>
              </Box>
            </Grid>

            <Grid xs={12} sm={8}>
              <React.Fragment>
                <ButtonGroup
                  aria-label="button group"
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    gap: '1rem',
                    marginLeft: { xs: '15px', sm: '0' },
                    marginTop: { xs: '10px', sm: '0' },
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: 'green',
                      color: 'white',
                      fontSize: '15px',
                      padding: '10px',
                      borderRadius: '15px',
                      width: { xs: '100%', sm: 'auto', md: '150px' },
                      height: '40px',
                      '&:hover': {
                        backgroundColor: 'darkgreen',
                      },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <AddIcon sx={{ mr: 1, fontSize: '20px' }} />
                    Add New Site
                  </Button>

                  <Button
                    sx={{
                      fontSize: '15px',
                      width: { xs: '100%', sm: 'auto', md: '150px' },
                      marginRight: '10px',
                      height: '40px',
                      borderRadius: '15px',
                    }}
                  >
                    <PublishOutlinedIcon
                      style={{ marginRight: '8px', fontSize: '20px' }}
                    />
                    Import Sites
                  </Button>
                </ButtonGroup>
              </React.Fragment>
            </Grid>
          </Grid>
          <Divider />
        </Box>
        <Box sx={{ marginTop: '20px', padding: '20px', fontSize: '18px' }}>
          <b>AssetTiger</b> allows you to enter multiple <b>Sites</b>. For
          example, the <b>Site</b> may be a building or address. This means that
          you can better track each asset that is assigned to a given{' '}
          <b>Site</b>. A detailed <b>Site</b> makes it easy to find and count
          each asset.
        </Box>
        <Divider />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',

            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <FormControl
            sx={{
              display: 'flex',
            }}
          >
            <FormLabel
              sx={{
                marginLeft: '10px',
                marginTop: '6px',
                mb: { xs: 1, md: 1 },
              }}
            >
              Sites
            </FormLabel>
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
              {/* <Option value="10">10</Option>
                <Option value="9">9</Option>
                <Option value="8">8</Option> */}
            </Select>
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
        <Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
            }}
          >
            <Box
              sx={{
                overflowX: 'auto',
                fontSize: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              <Table
                borderAxis="both"
                style={{
                  borderCollapse: 'collapse',
                  border: '1px solid grey',
                  minWidth: '900px',
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 30, background: '#fff8e6' }}>
                      <Checkbox
                        size="sm"
                        indeterminate={
                          matchedSelected.length > 0 &&
                          matchedSelected.length < sites.length
                        }
                        checked={
                          matchedSelected.length > 0 &&
                          matchedSelected.length === sites.length
                        }
                        onChange={() => {
                          if (
                            matchedSelected.length > 0 &&
                            matchedSelected.length === sites.length
                          ) {
                            setMatchedSelected([])
                          } else {
                            const newSelecteds = sites.map((_, index) => index)
                            setMatchedSelected(newSelecteds)
                          }
                        }}
                      />
                    </th>
                    <th style={{ background: '#fff8e6' }}>Site</th>
                    <th style={{ background: '#fff8e6' }}>Description</th>
                    <th style={{ background: '#fff8e6' }}>Address</th>
                    <th style={{ background: '#fff8e6' }}>Apt. / Suite</th>
                    <th style={{ background: '#fff8e6' }}>City</th>
                    <th style={{ background: '#fff8e6' }}>State</th>
                    <th style={{ background: '#fff8e6' }}>Zip Code</th>
                    <th style={{ background: '#fff8e6' }}>Country</th>
                    <th style={{ background: '#fff8e6' }}>Edit</th>
                    <th style={{ background: '#fff8e6' }}> Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.length > 0 ? (
                    sites.map((site, index) => (
                      <tr key={index}>
                        <td>
                          <Checkbox
                            size="sm"
                            checked={matchedSelected.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                            color="primary"
                          />
                        </td>
                        <td>{site.siteName}</td>
                        <td>{site.description}</td>
                        <td>{site.address}</td>
                        <td>{site.aptSuite}</td>
                        <td>{site.city}</td>
                        <td>{site.state}</td>
                        <td>{site.zipCode}</td>
                        <td>{site.country}</td>
                        <td>
                          <div>
                            <Button
                              aria-label="edit"
                              onClick={() => handleEditClick(site)}
                              sx={{
                                fontSize: '12px',
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
                              }}
                            >
                              <EditIcon sx={{ fontSize: '12px' }} />
                              Edit
                            </Button>
                          </div>
                        </td>
                        <td>
                          <Button
                            aria-label="delete"
                            onClick={() => handleDeleteClick(site)}
                            sx={{
                              fontSize: '12px',
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
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '12px' }} />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} style={{ textAlign: 'center' }}>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Box>
          </Stack>
        </Box>
      </Box>
      <AddSite
        open={open}
        onClose={() => setOpen(false)}
        onSave={(newSite: Site) => {
          setOpen(false)
        }}
      />

      <EditSite
        open={isEditOpen}
        onClose={() => setEditOpen(false)}
        site={selectedSite}
        onSave={(updatedSite: Site) => {
          const updatedSites = sites.map((site) =>
            site === selectedSite ? updatedSite : site,
          )
          // setSites(updatedSites)
          setEditOpen(false)
          setSelectedSite(null)
        }}
      />

      <DeleteSite
        deleteOpen={deleteOpen}
        handleDelete={handleDelete}
        handleDeleteClose={handleDeleteClose}
      />
    </AppView>
  )
}

export default SetupSites
