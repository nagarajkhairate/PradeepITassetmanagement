import React, { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/joy'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Table from '@mui/joy/Table'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import { Link, useLocation } from 'react-router-dom'
import AppView from '../../../components/Common/AppView'
import MaintenanceEmpty from '../../../components/Common/MaintenanceEmpty'
import { fetchMaintenanceDatabase } from '../../../redux/features/MaintenanceDatabaseSlice'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlertsMaintenanceDue } from '../../../redux/features/AlertsMaintenanceDueSlice'

export const MaintenancesDue: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const maintenanceDatabase = useSelector(
    (state: RootState) => state.maintenanceDatabase.data,
  )
  const alertsMaintenanceDue = useSelector((state: RootState) => state.alertsMaintenanceDue.data,)
  const location = useLocation()
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [formData, setFormData] = useState<any>()

  useEffect(() => {
    dispatch(fetchMaintenanceDatabase())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAlertsMaintenanceDue())
  }, [dispatch])

  useEffect(() => {
    if (location.state && location.state.selectedColumns) {
      setSelectedColumns(location.state.selectedColumns)
    }
  }, [location.state])
  return (
    <AppView>
      <Typography level="h3">Maintenance</Typography>

      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,

          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
            // gap:{md:"100px",xs:"5px"}
            justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
          }}
        >
          
                  <Typography level="h4">List of Maitenances</Typography>
         
          {/* <Button
            type="button"
            variant="solid"
            autoFocus
            sx={{
              background: "#1CCAB8",
              color: "white",
              borderRadius: "15px"
            }}
            >
            <SettingsOutlinedIcon />
            Search Criteria
          </Button>
           */}

          <Box 
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap:"5px" }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#388e3c",
                  color: "white",
                  borderRadius: "10px",
                  '&:hover':{background:'#387e3c'},
                }}
               
              >
                 <CloudUploadOutlinedIcon />
                Export to Excel
              </Button>
              <Link to='/alerts/maintenances-due/import-maintenance' style={{ textDecoration: 'none' }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#2196f3",
                  color: "white",
                  borderRadius: "10px",
                  whiteSpace: "nowrap",
                 
                }}
              >
                <CloudUploadOutlinedIcon />
                Import Maintanence
              </Button>
              </Link>

              <Link to="/alerts/maintenances-due/maintenance-set-up-column" style={{ textDecoration: 'none' }}>
              <Button
                type="button"
                variant="solid"
                autoFocus
                sx={{
                  background: "black",
                  color: "white",
                  borderRadius: "10px",
                  '&:hover':{background:'#424242'},
                  width: { xs: '100%', md: 'auto' },
                }}
                >
                <SettingsOutlinedIcon />
                Setup Column
              </Button>
              </Link>
          </Box>
        </Box>

        <Box
          sx={{
            gap: { md: '1px', xs: '3px' },
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: 'space-between',
            }}
          >
            <Select
              placeholder="Maintenance Due"
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: '0.2s',
                  [`&.${selectClasses.expanded}`]: {
                    transform: 'rotate(-180deg)',
                  },
                },

                borderRadius: '10px',
              }}
            >
              <Option value="term 1">term 1</Option>
              <Option value="term 2">term 2</Option>
              <Option value="term 3">term 3</Option>
              <Option value="term 4">term 4</Option>
            </Select>

            {/* <Select
            placeholder="10"
            indicator={<KeyboardArrowDown />}
            sx={{
              // width: 75,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
              borderRadius: '15px',
            }}
          >
            <Option value="10">10</Option>
            <Option value="15">15</Option>
            <Option value="20">20</Option>
          </Select> */}
          </Box>

          <Typography
            sx={{
              maxWidth: 450,

              fontStyle: 'italic',
              marginTop: '2px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end ',
              // mt:4
            }}
            color="danger"
          >
            Assets with a maintenance due date within the last 7 days
            (determined by overdue time) or in the near future.
          </Typography>
        </Box>

        <Box
          sx={{
            overflowX: 'auto',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            borderRadius: '5px',
            mt: 2,
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
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Asset ID
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Maintenance Title
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Maintenance Details
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                Maintenance DueDate
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Maintenance By
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                 Maintenance Status
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                 Date Completed
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                 Maintenance Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {alertsMaintenanceDue.map((lease: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    <Link
                      to={`/assets/view-an-asset/${lease.assetId}`}
                      style={{ color: 'inherit' }}
                    >
                    {lease.assetId}
                    </Link>
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceTitle}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceDetails}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceDueDate}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceBy}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceStatus}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.dateCompleted}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceCost}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        {/* 
      <Box>
        <MaintenanceEmpty />
      </Box> */}
      </Box>
    </AppView>
  )
}

export default MaintenancesDue
