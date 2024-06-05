import * as React from 'react'
import { Box, Divider, Typography, styled } from '@mui/joy'
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

const initialSites = [
  {
    id: 1,
    sitename: 'swde',
    description: 'wsedf',
    address: '234frd',
    aptSuite: 'swed',
    city: 'sedr',
    state: 'sw3',
    zipCode: 3532532,
    country: 'Bahrain',
  },
]

interface Site {
  id: number
  sitename: string
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(false)
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [isAddDialogOpen, setAddDialogOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState<any>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [sites, setSites] = useState(initialSites)

  const handleDeleteClick = (site: any) => {
    setSelectedSite(site)
    setDeleteOpen(true)
  }

  const handleDelete = () => {
    const updatedSites = sites.filter((site) => site.id !== selectedSite.id)
    setSites(updatedSites)
    setDeleteOpen(false)
    setSelectedSite(null)
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

  const handleEditClick = (site: any) => {
    setSelectedSite(site)
    setEditOpen(true)
  }

  const FlexBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
  })

  console.log(JSON.stringify(sites))

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
                    fontFamily: 'Poppins',
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
                      fontSize: '10px',
                      padding: '10px',
                      width: { xs: '100%', sm: 'auto', md: '150px' },
                      height: '40px',
                      '&:hover': {
                        backgroundColor: 'darkgreen',
                      },
                    }}
                    onClick={() => setOpen(true)}
                  >
                    <AddIcon sx={{ mr: 1, fontSize: '10px' }} />
                    Add New Site
                  </Button>

                  <Button
                    sx={{
                      fontSize: '10px',
                      width: { xs: '100%', sm: 'auto', md: '150px' },
                      marginRight: '10px',
                      height: '40px',
                    }}
                  >
                    <TuneOutlinedIcon style={{ marginRight: '8px' }} />
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

        <Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: '40px',
              marginTop: '60px',
            }}
          >
            <Box sx={{width: "100%", overflow: "auto" }}>
            <Table
              borderAxis="both"
              style={{  borderCollapse: 'collapse' }}
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
                  <th  style={{ background: '#fff8e6' }}>Site</th>
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
                {sites.map((site, index) => (
                  <tr key={site.id}>
                    <td>
                      <Checkbox
                        size="sm"
                        checked={matchedSelected.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        color="primary"
                      />
                    </td>
                    <td>{site.sitename}</td>
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
                          key={site.id}
                          onClick={() => handleEditClick(site)}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </div>
                    </td>
                    <td>
                      <Button
                        aria-label="delete"
                        key={site.id}
                        onClick={() => handleDeleteClick(site)}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </Box>
          </Stack>
        </Box>
      </Box>
      <AddSite
        open={open}
        onClose={() => setOpen(false)}
        setSites={setSites}
        sites={sites}
      />

      {selectedSite && (
        <EditSite
          open={isEditOpen}
          onClose={() => setEditOpen(false)}
          site={selectedSite}
          sites={sites}
          setSites={setSites}
          fullScreen={fullScreen}
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

export default SetupSites
