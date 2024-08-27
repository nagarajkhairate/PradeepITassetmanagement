import { Box, Button, Checkbox, Table, Typography } from '@mui/joy'
import React, { useEffect, useState } from 'react'
import AppView from '../../../components/Common/AppView'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import {
  fetchContractDatabase,
} from '../../../redux/features/ContractDatabaseSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  fetchAlertsAddContractById,
} from '../../../redux/features/AlertsAddContractSlice'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const ViewContract: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const contractDatabase = useSelector(
    (state: RootState) => state.contractDatabase.data,
  )

  const alertsAddContract = useSelector(
    (state: RootState) => state.alertsAddContract.data,
  )
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [formData, setFormData] = useState<any>(alertsAddContract)
  const { id } = useParams<{ id: string }>()
  const handlePreviousButtonClick = () => {
    navigate(`/alerts/contracts-expiring`, { replace: true });
  };

  useEffect(() => {
    dispatch(fetchContractDatabase())
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(fetchAlertsAddContractById(id))
    }
  }, [dispatch, id])

  // useEffect(() => {
  //   if (contractDatabase && id) {
  //     const contract = contractDatabase.find(
  //       (contract: any) => contract.id === id,
  //     )
  //     setViewContract(contract)
  //   }
  // }, [contractDatabase, id])

  return (
    <AppView>
      <Typography level="h3">View a Contract / Software License</Typography>
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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: 2,
            }}
          >
            <Link
              to={`/alerts/contracts-expiring`}
              style={{ textDecoration: 'none' }}
            >
              <Button
                sx={{
                  fontSize: '13px',
                  background: '#ffffff',
                  color: 'green',
                  display: 'flex',
                  justifyContent: {
                    md: 'flex-end',
                    xs: 'center',
                  },
                  marginLeft: 'none',
                  border: { md: '1px solid green', xs: '1px solid green' },
                  borderRadius: '13px',
                  '&:hover': {
                    color: 'green',
                     background: '#fff8e6',
                  },
                }}
                onClick={handlePreviousButtonClick} 
              >
                <ArrowBackIosNewIcon sx={{ fontSize: '14px' }} />
                Previous
              </Button>
            </Link>

            <Link
              to={`/alerts/contracts-expiring/view-contract/edit-contract/${id}`}
              style={{ textDecoration: 'none' }}
            >
              <Button
                // onClick={handleEditButtonClick}
                sx={{
                  fontSize: '13px',
                  background: '#ffffff',
                  color: 'green',
                  display: 'flex',
                  justifyContent: {
                    md: 'flex-end',
                    xs: 'center',
                  },
                  marginLeft: 'none',
                  border: { md: '1px solid green', xs: '1px solid green' },
                  borderRadius: '13px',
                  '&:hover': {
                    color: 'white',
                    background: 'green',
                  },
                }}
              >
                <EditOutlinedIcon sx={{ fontSize: '14px' }} />
                Edit Cell
              </Button>
            </Link>

            <Button
              //   onClick={() => handleDeleteButton}
              sx={{
                fontSize: '13px',
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
              <DeleteForeverIcon sx={{ fontSize: '14px' }} />
              Delete
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
                {contractDatabase &&
                  contractDatabase.map((column: any, index: number) => (
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
                {/* <th
                  style={{
                    background: '#fff8e6',
                    verticalAlign: 'middle',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    textAlign: 'left',
                    width: 85,
                  }}
                >
                  Edit
                </th> */}
              </tr>
            </thead>
            <tbody>
              {alertsAddContract.map((contract: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  {contractDatabase &&
                    contractDatabase.map((column: any, colIndex: number) => (
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
                  {/* <td>
                    <Link
                      to={`/alerts/contracts-expiring/view-contract/edit-contract/${id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Button
                        // onClick={handleEditButtonClick}
                        sx={{
                          fontSize: '13px',
                          background: '#ffffff',
                          color: 'green',
                          display: 'flex',
                          justifyContent: {
                            md: 'flex-start',
                            xs: 'center',
                          },
                          marginLeft: '2px',
                          // border: { md: '1px solid green', xs: '1px solid green' },
                          borderRadius: '11px',
                          '&:hover': {
                            color: 'white',
                            background: 'green',
                            width: 87,
                          },
                        }}
                      >
                        <EditOutlinedIcon sx={{ fontSize: '15px' }} />
                        Edit
                      </Button>
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </AppView>
  )
}
export default React.memo(ViewContract)
