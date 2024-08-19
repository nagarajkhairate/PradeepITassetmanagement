import { Box, Button, Table, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import AppView from '../../../components/Common/AppView'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import {
  fetchContractDatabase,
  fetchContractDatabaseById,
} from '../../../redux/features/ContractDatabaseSlice'
import { Link, useParams } from 'react-router-dom'
import { fetchAlertsAddContract, fetchAlertsAddContractById } from '../../../redux/features/AlertsAddContractSlice'
import { fetchMaintenanceDatabase } from '../../../redux/features/MaintenanceDatabaseSlice'
import { fetchAlertsMaintenanceDue, fetchAlertsMaintenancedueById } from '../../../redux/features/AlertsMaintenanceDueSlice'

const ViewMaintenance: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const maintenanceDatabase = useSelector(
    (state: RootState) => state.maintenanceDatabase.data,
  )

  const alertsMaintenanceDue = useSelector(
    (state: RootState) => state.alertsMaintenanceDue.data,
  )

  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [formData, setFormData] = useState<any>()

  const { id } = useParams<{ id: string }>()
  const [viewContract, setViewContract] = useState<any>(null)

  useEffect(() => {
    dispatch(fetchMaintenanceDatabase())
  }, [dispatch])


  useEffect(() => {
    dispatch(fetchAlertsMaintenanceDue())
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(fetchAlertsMaintenancedueById(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (maintenanceDatabase && id) {
      const contract = maintenanceDatabase.find(
        (contract: any) => contract.id === id,
      )
      setViewContract(contract)
    }
  }, [maintenanceDatabase, id])

  return (
    <AppView>
      <Typography level="h3">Add a Contract / Software License</Typography>
      <Box
        sx={{
          borderRadius: '16px',
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
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'flex-end' },
          gap: '5px',
        }}
      >
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
                {maintenanceDatabase &&
                  maintenanceDatabase
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
              </tr>
            </thead>
            <tbody>
              {alertsMaintenanceDue.map((contract: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {maintenanceDatabase &&
                    maintenanceDatabase
                      .filter((field: any) => field.isTable)
                      .map((column: any, colIndex: number) => (
                        <td
                          key={colIndex}
                          style={{
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            textAlign: 'left',
                          }}
                        >
                          {selectedColumns.includes(column.name)
                            ? formData[column.name]
                            : contract[column.name]}
                        </td>
                      ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </AppView>
  )
}
export default React.memo(ViewMaintenance)
