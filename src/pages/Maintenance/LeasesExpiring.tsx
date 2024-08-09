import { Box, Button, Table, Typography } from '@mui/joy'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MaintenanceEmpty from '../../components/Common/MaintenanceEmpty'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import AppView from '../../components/Common/AppView'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useEffect } from 'react'
import { fetchAlertsLeasesExp } from '../../redux/features/AlertsLeasesExpSlice'
import { Link } from 'react-router-dom'

export const LeasesExpiring: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const alertsLeasesExp = useSelector(
    (state: RootState) => state.alertsLeasesExp.data,
  )

  useEffect(() => {
    dispatch(fetchAlertsLeasesExp())
  }, [dispatch])

  return (
    <AppView>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
        
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            mb: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '24px', md: '32px' },
              fontWeight: 500,
              textAlign: { xs: 'center', md: 'left' },
              display: 'flex',
            }}
          >
            Report
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '14px', md: '18px' },
              fontWeight: 400,
              textAlign: { xs: 'center', md: 'left' },
              mt: { xs: 1, md: 1 },
              ml: { md: 2 },
              whiteSpace: 'nowrap',
            }}
          >
            Checkout by Past Due
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: '5px',
            justifyItems: 'flex-end',
          }}
        >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              borderRadius: '10px',
            }}
            component="label"
          >
            <EmailOutlinedIcon />
            Automated Report
          </Button>
          {/* <Button
            type="button"
            variant="solid"
            sx={{
              background: 'black',
              color: 'white',
              borderRadius: '15px',
            }}
          >
            <SettingsOutlinedIcon />
            SetUp
          </Button> */}
        </Box>
      </Box>

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
          p: 1,
        }}
      >
        <Box
          sx={{
            gap: 2,
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: 'space-between',
            mt: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
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
              Report Type:
            </Typography>

            {/* <Select
              placeholder="Current Status"
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: '0.2s',
                  [`&.${selectClasses.expanded}`]: {
                    transform: 'rotate(-180deg)',
                  },
                },
                borderRadius: '16px',
              }}
            >
              <Option value="state1">State 1</Option>
              <Option value="state2">State 2</Option>
              <Option value="state3">State 3</Option>
              <Option value="state4">State 4</Option>
            </Select>

            <Select
              placeholder="100"
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: '0.2s',
                  [`&.${selectClasses.expanded}`]: {
                    transform: 'rotate(-180deg)',
                  },
                },
                borderRadius: '16px',
              }}
            >
              <Option value="10">10</Option>
              <Option value="15">15</Option>
              <Option value="20">20</Option>
            </Select> */}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: '5px',
            }}
          >
            <Button
              variant="solid"
              sx={{
                background: '#388e3c',
                color: 'white',
                borderRadius: '10px',
              }}
              component="label"
            >
              <FileUploadOutlinedIcon />
              Export to Excel
            </Button>
            <Button
              variant="solid"
              sx={{
                background: 'black',
                '&:hover':{background:'#424242'},
                color: 'white',
                borderRadius: '10px',
              }}
              component="label"
              onClick={()=>window.print()}
            >
              <LocalPrintshopOutlinedIcon />
              Print
            </Button>
          </Box>
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
                  Leasing Customer ID
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Lease Begins
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Lease Notes
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Lease Expires
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {alertsLeasesExp.map((lease: any, rowIndex: number) => (
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
                    {lease.leasingCustomerId}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.leaseBegins}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.leaseNotes}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.leaseExpires}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>

      {/* <Box>
        <MaintenanceEmpty />
      </Box> */}
    </AppView>
  )
}

export default LeasesExpiring
