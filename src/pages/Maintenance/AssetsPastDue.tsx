import { Box, Button, ButtonGroup, Grid, Menu, MenuItem, Table, Typography } from '@mui/joy'
import { styled } from '@mui/joy'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Image from '../../components/Common/MaintenanceEmpty'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import AppView from '../../components/Common/AppView'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlertsAssetPastDue } from '../../redux/features/AlertsAssetPastDueSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const AssetsPastDue: React.FC = () => {

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const alertsAssetPastDue = useSelector((state: RootState) => state.alertsAssetPastDue.data,)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleExportClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleExportOptionClick = (option: string) => {
    if (option === 'CSV') {
      exportToCSV(alertsAssetPastDue)
    } else if (option === 'Excel') {
      exportToExcel(alertsAssetPastDue)
    } else if (option === 'PDF') {
      exportToPDF(alertsAssetPastDue)
    }
    setAnchorEl(null)
  }

  const exportToCSV = (data: any) => {
    const csvRows = []

    // Define headers
    const headers = ['Asset ID', 'Client Id', 'Check-Out Date', 'Due-Date', 'Checkout Notes', 'Checkout To']
    csvRows.push(headers.join(','))

    // Add data rows
    data.forEach((row: any) => {
      const values = [row.assetId, row.clientId, row.checkOutDate, row.dueDate, row.checkOutNotes, row.checkOutTo]
      csvRows.push(values.join(','))
    })

    const csvContent = `data:text/csv;charset=utf-8,${csvRows.join('\n')}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'assets_past_due.csv')
    document.body.appendChild(link)

    link.click()
  }

  const exportToExcel = (data: any) => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Assets Past Due')

    XLSX.writeFile(workbook, 'assets_past_due.xlsx')
  }

  const exportToPDF = (data: any) => {
    const doc = new jsPDF()
    const tableColumn = ['Asset ID', 'Client Id', 'Check-Out Date', 'Due-Date', 'Checkout Notes', 'Checkout To']
    const tableRows: any[] = []

    data.forEach((row: any) => {
      const rowData = [row.assetId, row.clientId, row.checkOutDate, row.dueDate, row.checkOutNotes, row.checkOutTo]
      tableRows.push(rowData)
    })

    doc.save('assets_past_due.pdf')
  }


  useEffect(() => {
    dispatch(fetchAlertsAssetPastDue())
  }, [dispatch])



  return (
    <AppView>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
        }}
      >
         <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                  mb: 2,
                }}
              >
        <Typography
          sx={{
            fontSize: { xs: '24px', md: '32px' },
            fontWeight: 500,
            lineHeight: { xs: '36px', md: '48px' },
            textAlign: { xs: 'center', md: 'left' },
            width: { xs: '100%', md: 'auto' },
          }}
        >
          Report
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '14px', md: '18px' },
            fontWeight: 400,
            lineHeight: { xs: '22px', md: '27px' },
            textAlign: { xs: 'center', md: 'left' },
            // width: { xs: "100%", md: "auto" },
            mt: { xs: 1, md: 1 },
            ml: { md: 2 },
            whiteSpace: 'nowrap',
          }}
        >
          Checkout by Past Due
        </Typography>
        </Box>
        <Box
          // sx={{
          //   width: "100%",
          //   // marginRight:'5%',
          //   display: { md: "flex", xs: "flex" },
          //   justifyContent:'flex-end',
          //   flexDirection: { md: "row", xs: "column" },
          //   gap: "5px",
          // }}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: { md: 'row', xs: 'column' },
            gap: '5px',
          }}
        >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              marginRight: { xs: 1, md: 2 },
              borderRadius:'15px'
              // width: { xs: '100%', md: 'auto' },
            }}
            component="label"
          >
            <MarkunreadOutlinedIcon />
            Automated Report
          </Button>

          {/* <Button
            type="button"
            variant="solid"
            sx={{
              background: 'black',
              color: 'white',
              borderRadius:'15px'
              // width: { xs: '100%', md: 'auto' },
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
        // sx={{ display: "flex", justifyContent: "center", mb: 4 }}
        sx={{
          //     width: "100%",
          //     // marginRight:'10%',
          display: 'flex',
          justifyContent: { md: 'flex-end', xs: 'center' },
          flexDirection: { md: 'row', xs: 'column' },
          alignItems: 'center',
          gap: '5px',
          borderRadius:'15px'
        }}
      >
        <Button
          variant="solid"
          sx={{
            background: '#388e3c',
            color: 'white',
            marginRight: { xs: 1, md: 2 },
            borderRadius:'15px'
            // width: { xs: '100%', md: 'auto' },
          }}
          component="label"
          onClick={handleExportClick}
        >
          Export
        </Button>
        <Button
          type="button"
          variant="solid"
          sx={{
            background: 'black',
            color: 'white',
            borderRadius:'15px'
            // width: { xs: '100%', md: 'auto' },
          }}
          onClick={() => window.print()}
        >
          <PrintOutlinedIcon />
          Print
        </Button>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={() => handleExportOptionClick('CSV')}>Export to CSV</MenuItem>
        <MenuItem onClick={() => handleExportOptionClick('Excel')}>Export to Excel</MenuItem>
        <MenuItem onClick={() => handleExportOptionClick('PDF')}>Export to PDF</MenuItem>
      </Menu>

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
                  Client Id
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  check-Out Date
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Due-Date
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                 Checkout Notes
                </th>
                <th style={{
                background: '#fff8e6',
                verticalAlign: 'middle',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}>
                  Checkout To
                </th>
              </tr>
            </thead>
            <tbody>
              {alertsAssetPastDue.map((lease: any, rowIndex: number) => (
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
                    {lease.clientId}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.checkOutDate}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.dueDate}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.checkOutNotes}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.checkOutTo}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
        </Box>
    </AppView>
  )
}

export default AssetsPastDue
