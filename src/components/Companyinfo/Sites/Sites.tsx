import React, { useEffect } from 'react'
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Select,
  Typography,
} from '@mui/joy'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import Grid from '@mui/joy/Grid'
import Button from '@mui/joy/Button'
import ButtonGroup from '@mui/joy/ButtonGroup'
import { useState } from 'react'
import { Stack, Table, Checkbox } from '@mui/joy'
import AddIcon from '@mui/icons-material/Add'
import AddSite from '../../../pages/Setup/SetupSites/AddSite'
import EditSite from '../../../pages/Setup/SetupSites/EditSite'
import DeleteSite from '../../../pages/Setup/SetupSites/DeleteSite'
import AppView from '../../Common/AppView'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {
  deleteSites,
  fetchSites,
  updateSites,
} from '../../../redux/features/SitesSlice'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

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

interface SiteProps {
  activeTab: number
  setActiveTab: (tab: number) => void
}

const Sites: React.FC<SiteProps> = ({ activeTab, setActiveTab }) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [open, setOpen] = useState(false)
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const [isEditDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const sites = useSelector((state: RootState) => state.sites.data)
  const step = useSelector((state: RootState) => state.steps.data)
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
  }

  const handleEditClick = (site: Site) => {
    dispatch(updateSites(selectedSite))
    setSelectedSite(site)
    setEditDialogOpen(true)
  }

  const handleNext = () => {
    setActiveTab(activeTab + 1)
  }

  const handleBack = () => {
    setActiveTab(activeTab - 1)
  }

  useEffect(() => {
    dispatch(fetchSites())
  }, [dispatch])

  return (
    <AppView>
      <Box
        sx={{
          borderRadius: '10px',
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
            mb: 1,
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
                  level="h4"
                  sx={{
                    fontSize: '1.4rem',
                    fontWeight: 500,
                    lineHeight: '30px',
                    textAlign: { xs: 'center', md: 'left' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  <TuneOutlinedIcon
                    sx={{
                      fontSize: '1.1rem',
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
                    <AddIcon /> Add New Site
                  </Button>

                  {matchedSelected.length > 0 && (
                    <Button
                      type="submit"
                      onClick={handleDelete}
                      sx={{
                        fontSize: '13px',
                        borderRadius: '15px',
                        background: '#d32f2f',
                        display: 'flex',
                        justifyContent: { md: 'flex-end', xs: 'center' },
                        marginLeft: 'none',
                        border: '1px solid red',
                        padding: '.5rem .10rem',
                      }}
                    >
                      <DeleteForeverIcon sx={{ fontSize: '15px' }} />
                      Delete Site
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
                    Import sites
                  </Button>
                </ButtonGroup>
              </React.Fragment>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Typography
          sx={{ marginTop: '20px', padding: '10px', fontSize: '14px' }}
        >
          <strong>AssetTiger</strong> allows you to enter multiple{' '}
          <strong>Sites</strong>. For example, the <strong>Site</strong> may be
          a building or address. This means that you can better track each asset
          that is assigned to a given <strong>Site</strong>. A detailed{' '}
          <strong>Site</strong> makes it easy to find and count each asset.
        </Typography>
        <Divider />

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
            <FormLabel
              sx={{
                fontSize: '14px',
                marginLeft: '10px',
                marginTop: '6px',
                mb: { xs: 1, md: 1 },
              }}
            >
              <strong>Sites</strong>
            </FormLabel>
            <Select
              placeholder="1"
              sx={{
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

        <Stack
          sx={{
            width: '100%',
            borderRadius: 'sm',
            flexShrink: 1,
            overflow: 'auto',
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            sx={{
              fontSize: '15px',
              border: '1px solid #f2f2f2',
              minWidth: '700px',
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
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {site.siteName}
                    </td>
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {site.description}
                    </td>
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {site.address}
                    </td>
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {site.aptSuite}
                    </td>
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {site.city}
                    </td>
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {site.state}
                    </td>
                    <td>{site.zipCode}</td>
                    <td
                      style={{
                        wordBreak: 'break-word',
                        whiteSpace: 'normal',
                        textAlign: 'left',
                      }}
                    >
                      {site.country}
                    </td>
                    <td>
                      <Button
                        onClick={() => handleEditClick(site)}
                        sx={{
                          fontWeight: '400',
                          fontSize: '14px',
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
                        <EditOutlinedIcon sx={{ fontSize: '14px' }} />
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={() => handleDeleteClick(site)}
                        sx={{
                          fontWeight: '400',
                          fontSize: '14px',
                          background: '#ffffff',
                          color: '#d32f2f',
                          display: 'flex',
                          justifyContent: {
                            md: 'flex-end',
                            xs: 'center',
                          },
                          marginLeft: 'none',
                          border: '1px solid red ',
                          borderRadius: '13px',
                          '&:hover': {
                            color: 'white',
                            background: '#d32f2f',
                          },
                          padding: '.25rem .55rem',
                        }}
                      >
                        <DeleteForeverIcon sx={{ fontSize: '14px' }} />
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
        </Stack>

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

      {open && <AddSite open={open} setOpen={setOpen} />}

      {isEditDialogOpen && (
        <EditSite
          open={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          site={selectedSite}
        />
      )}

      <DeleteSite
        deleteOpen={deleteOpen}
        handleDelete={handleDelete}
        handleDeleteClose={handleDeleteClose}
      />
    </AppView>
  )
}

export default React.memo(Sites)
