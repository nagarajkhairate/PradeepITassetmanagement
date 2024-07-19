import { Typography, Radio, RadioGroup, Divider, Grid } from '@mui/joy'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/joy'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import Button from '@mui/joy/Button'
import { FormControl } from '@mui/joy'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import { Customers, customerData, customCustomer } from './CustomersData'
import AddDialogCustomer from './AddDialogCustomer'
import AddIcon from '@mui/icons-material/Add'
import CustomerFieldsAddingTable from './CustomerFieldsAddingTable'
import {
  fetchCustomerDatabase,
  updateCustomerDatabase,
} from '../../../../redux/features/CustomerDatabaseSlice'
import { fetchCustomerCustomDatabase } from '../../../../redux/features/CustomerCustomDatabaseSlice'

const DatabaseCustomersTable: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const customerDatabase = useSelector((state: RootState) => state.customerDatabase.data)
  const customerCustomDatabase = useSelector((state: RootState) => state.customerCustomDatabase.data)
  
  React.useEffect(() => {
    dispatch(fetchCustomerDatabase())
  }, [])

  React.useEffect(() => {
    dispatch(fetchCustomerCustomDatabase())
  }, [])

  const [openAddCustomer, setOpenAddCustomer] = useState(false)
  const [customerDataBases, setCustomerDataBases] = useState(customerData)

  useEffect(() => {
    setCustomerDataBases(customerData)
  }, [])

  const handleCheckboxChange = (index: number) => {
    const updatedForm = [...customerDataBases]
    updatedForm[index].visible = !updatedForm[index].visible
    setCustomerDataBases(updatedForm)
  }

  const handleRadioChange = (index: number, value: string) => {
    const updatedForm = [...customerDataBases]
    updatedForm[index].isRequired = value
    setCustomerDataBases(updatedForm)
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(customerDataBases)
    dispatch(updateCustomerDatabase(customerDatabase))
  }

  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC21E' }}
        />
        Database Customers
      </Typography>

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
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            level="h4"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Customers Standard Fields
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Typography>
              Customers are the individuals or organizations to whom you lease
              out your equipment. Select the fields you would like to use for
              your customers.
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              borderRadius: '5px',
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
                  <th
                    style={{
                      width: 30,
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                    }}
                  >
                    <Checkbox />
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Field Name
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Data Required
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {customerDataBases.map((opt, index) => {
                  const data = Customers.find(
                    (field) => field.fieldName === opt.fieldName,
                  )
                  if (!data) return null

                  return (
                    <tr key={`${data.fieldName}-${index}`}>
                      <td>
                        <Checkbox
                          checked={opt.visible || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {data.fieldName}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {data.visible && (
                          <FormControl>
                            <RadioGroup
                              value={opt.isRequired ? 'yes' : 'optional'}
                              name={`radio-buttons-group-${index}`}
                              onChange={(e) =>
                                handleRadioChange(index, e.target.value)
                              }
                              sx={{ gap: 2 }}
                            >
                              <FormControl
                                key={`${index}-yes`}
                                disabled={!opt.visible}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 2,
                                  // visibility: opt.fieldName === 'Full Name' ? 'visible' : 'hidden',
                                }}
                              >
                                <Radio
                                  value="yes"
                                  checked={opt.isRequired === 'yes'}
                                  onChange={(e) =>
                                    handleRadioChange(index, e.target.value)
                                  }
                                  color="primary" // Adjust color as needed
                                  sx={{ mr: 1 }}
                                />
                                Yes
                              </FormControl>
                              <FormControl
                                key={`${index}-optional`}
                                disabled={!opt.visible}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}
                              >
                                <Radio
                                  value="optional"
                                  checked={opt.isRequired === 'optional'}
                                  onChange={(e) =>
                                    handleRadioChange(index, e.target.value)
                                  }
                                  color="primary"
                                  sx={{ mr: 1 }}
                                />
                                Optional
                              </FormControl>
                            </RadioGroup>
                          </FormControl>
                        )}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {data.description}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {data.example}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <Divider sx={{ my: '20px' }}></Divider>
          </Box>
        </Box>

        <Box>
          <Typography
            level="h4"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <SignpostOutlinedIcon
              style={{ fontSize: '1.4rem', color: '#FBC21E' }}
            />
            Customers Custom Fields
          </Typography>
          <Typography sx={{ marginTop: '10px' }}>
            Add custom fields to join the standard fields that we provided.
          </Typography>

          <Button
            onClick={() => setOpenAddCustomer(true)}
            sx={{
              marginTop: '15px',
              background: 'green',
              color: 'white',
              '&:hover': { background: '#1b5e20' },
              borderRadius: '15px',
            }}
          >
            <AddIcon />
            Add Custom Fields
          </Button>

          {openAddCustomer && (
            <AddDialogCustomer
              open={openAddCustomer}
              setOpen={setOpenAddCustomer}
            />
          )}

          <Divider sx={{ my: 2 }} />
          <CustomerFieldsAddingTable
            customerDataBases={customerCustomDatabase}
            // setCustomerDataBases={setCustomerDataBases}
          />
        </Box>

        <Divider sx={{ marginTop: '3%' }} />

        <DatabaseButtons
          onCancel={() => handleCancel()}
          onSubmit={() => handleSubmit()}
        />
      </Box>
    </AppView>
  )
}

export default DatabaseCustomersTable
