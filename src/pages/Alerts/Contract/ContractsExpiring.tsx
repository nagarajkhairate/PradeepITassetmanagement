import {
  Box,
  Button,
  Divider,
  Option,
  Select,
  selectClasses,
  styled,
  SvgIcon,
  Table,
  Typography,
} from '@mui/joy'
import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import AppView from '../../../components/Common/AppView'
import { Link, useLocation } from 'react-router-dom'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import { fetchContractDatabase } from '../../../redux/features/ContractDatabaseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import AlertsSetupColumnTable from '../Maintenances/AlertsSetupColumnTable'
import { green } from '@mui/material/colors'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
// Corrected path for the import of fetchAlertsContract
import { fetchAlertsContract } from '../../../redux/features/AlertsContractSlice'

export const ContractsExpiring: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  
  // State from redux store
  const contractDatabase = useSelector(
    (state: RootState) => state.contractDatabase.data
  )
  const alertsContract = useSelector(
    (state: RootState) => state.alertsContract.data
  )
  
  const location = useLocation()
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [formData, setFormData] = useState<any>(alertsContract)
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null)
  const [selectedCellId, setSelectedCellId] = useState<string | null>(null)

  // Dispatch fetch contract database
  useEffect(() => {
    dispatch(fetchContractDatabase())
  }, [dispatch])

  // Dispatch fetch alerts contract
  useEffect(() => {
    dispatch(fetchAlertsContract())
  }, [dispatch])

  // Handle selected columns from location state
  useEffect(() => {
    if (location.state && location.state.selectedColumns) {
      setSelectedColumns(location.state.selectedColumns)
    }
  }, [location.state])

  // Update formData when alertsContract state changes
  useEffect(() => {
    setFormData(alertsContract)
  }, [alertsContract])

  // Toggle view for a selected contract
  const handleViewClick = (contractId: string) => {
    setSelectedCellId((prevId) => (prevId === contractId ? null : contractId))
  }

  return (
    <AppView>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
          mt: 2,
        }}
      >
        <Typography level="h3">Contracts / Software Licenses</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: '5px',
            wordBreak: 'break-word',
            whiteSpace: 'normal',
          }}
        >
          <Link to="/alerts/contracts-expiring/add-contract" style={{ textDecoration: 'none' }}>
            <Button
              variant="solid"
              autoFocus
              sx={{
                background: '#388e3c',
                '&:hover': { background: '#388d1c' },
                color: 'white',
                borderRadius: '10px',
                marginRight: 2,
              }}
            >
              <AddTwoToneIcon />
              New Contract / License
            </Button>
          </Link>
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
          p: 2,
        }}
      >
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '30px',
              textAlign: { xs: 'center', md: 'left' },
              whiteSpace: 'normal',
            }}
          >
            List of Contracts / Software Licenses
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: '5px',
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: '5px',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="solid"
              autoFocus
              sx={{
                background: '#388e3c',
                color: 'white',
                '&:hover': { background: '#4caf50' },
                borderRadius: '10px',
              }}
            >
              <CloudUploadOutlinedIcon />
              Export to Excel
            </Button>
            <Link to="/alerts/maintenances-due/import-maintenance" style={{ textDecoration: 'none' }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: '#2196f3',
                  color: 'white',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                <CloudUploadOutlinedIcon />
                Import Contracts
              </Button>
            </Link>

            <Link
              to={{
                pathname: '/alerts/contracts-expiring/contract-set-up-column',
              }}
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: 'black',
                  '&:hover': { background: '#424242' },
                  color: 'white',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                  gap: 1,
                }}
              >
                <SettingsOutlinedIcon />
                Setup Columns
              </Button>
            </Link>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, gap: '5px' }}>
          <Typography sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' }, mt: 4 }}>
            Display contracts / software licenses associated with your organization. To create a new
            contract/license, click New Contract / License and enter the necessary information.
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
                {contractDatabase &&
                  contractDatabase
                    .filter((field: any) => field.isTable)
                    .map((column: any, index: number) => (
                      <th
                        key={index}
                        style={{
                          background: '#fff8e6',
                          verticalAlign: 'middle',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {column.fieldName}
                      </th>
                    ))}
                <th
                  style={{
                    background: '#fff8e6',
                    verticalAlign: 'middle',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    textAlign: 'left',
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {alertsContract.map((contract: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {contractDatabase &&
                    contractDatabase
                      .filter((field: any) => field.isTable)
                      .map((column: any, colIndex: number) => (
                        <td
                          key={colIndex}
                          style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}
                        >
                          {selectedColumns.includes(column.name)
                            ? formData[column.name]
                            : contract[column.name]}
                        </td>
                      ))}
                  <td style={{ cursor: 'pointer' }}>
                    <Link
                      to={`/alerts/contracts-expiring/view-contract/${contract.id}`}
                      style={{ color: 'inherit' }}
                    >
                      <RemoveRedEyeIcon
                        sx={{
                          size: '20',
                          color: selectedContractId === contract.id ? 'green' : 'black',
                        }}
                        onClick={() => handleViewClick(contract.id)}
                      />
                    </Link>
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

export default React.memo(ContractsExpiring)
