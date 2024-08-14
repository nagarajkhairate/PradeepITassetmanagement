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
import {  customerData, customerValue, customers } from './CustomersData'
import AddDialogCustomer from './AddCustomCustomer'
import AddIcon from '@mui/icons-material/Add'
import CustomerFieldsAddingTable from './CustomerFieldsAddingTable'
import {
  fetchCustomerDatabase,
  updateCustomerDatabase,
} from '../../../../redux/features/CustomerDatabaseSlice'
import { fetchCustomerCustomDatabase } from '../../../../redux/features/CustomerCustomDatabaseSlice'
import AddCustomCustomer from './AddCustomCustomer'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'

const DatabaseCustomersTable: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const customerDatabase = useSelector((state: RootState) => state.customerDatabase.data)
  const customerCustomDatabase = useSelector((state: RootState) => state.customerCustomDatabase.data)
  const components = useSelector((state: RootState) => state.components.data);

  const [openAddCustomer, setOpenAddCustomer] = useState(false)
  const [customerDataBases, setCustomerDataBases] = useState(customerData)
  const [contractField, setContractData] = useState<customerValue[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    if (
      fieldName !== 'fullName' &&
      fieldName !== 'email' 
    ) {
      const updatedData = contractField.map((item) =>
        item.name === fieldName
          ? { ...item, isVisible: event.target.checked }
          : item,
      )
      setContractData(updatedData)

      const allChecked = updatedData.every((item) => item.isVisible)
      const someChecked = updatedData.some((item) => item.isVisible)
      setAllChecked(allChecked)
      setIndeterminate(!allChecked && someChecked)
    }
  }

  const handleHeaderCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = event.target.checked
    const updatedData = contractField.map((item) => ({
      ...item,
      isVisible: checked,
    }))
    setContractData(updatedData)
    setAllChecked(checked)
    setIndeterminate(false)
  }

  const handleRadioSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    setContractData((prevState) =>
      prevState.map((item) =>
        item.name === fieldName
          ? { ...item, isRequired: event.target.value }
          : item,
      ),
    )
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(customerDatabase)
    dispatch(updateCustomerDatabase(contractField))
  }

  useEffect(() => {
    dispatch(fetchCustomerDatabase())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCustomerCustomDatabase())
  }, [dispatch])

  useEffect(() => {
    setContractData(customerDatabase)
  }, [customerDatabase])

  useEffect(()=>{
    dispatch(fetchComponents())
  },[dispatch])

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
                    <Checkbox
                      checked={allChecked}
                      indeterminate={indeterminate}
                      onChange={handleHeaderCheckboxChange}
                    />
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
                {customers &&
                  customers.map((data, index) => {
                    const filterData = contractField.find(
                      (opt: any) => opt.name === data.name,
                    )
                    return (
                      <tr key={`${data.fieldName}-${filterData?.id}`}>
                        <td>
                          <Checkbox
                            checked={filterData?.isVisible || false}
                            onChange={(e) => handleCheckboxChange(e, data.name)}
                          />
                        </td>
                        <td
                          style={{
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            textAlign: 'left',
                          }}
                        >
                          {data.fieldName === 'Full Name'? (
                            <>
                              {data.fieldName}
                              {'  '}
                              <span
                                style={{ color: 'red', fontSize: '1.2rem' }}
                              >
                                *
                              </span>
                            </>
                          ) : (
                            data.fieldName
                          )}
                        </td>
                        <td>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: 1,
                            }}
                          >
                            <RadioGroup
                              name={`radio-buttons-group-${index}-${data.name}`}
                              onChange={(e) => handleRadioSelect(e, data.name)}
                              sx={{
                                gap: 1,
                                marginLeft: 1,
                              }}
                            >
                              {data.option &&
                                data.option.map((list, idx) => (
                                  <Box
                                    key={idx}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 1,
                                    }}
                                  >
                                    <Radio
                                      value={list.value}
                                      checked={
                                        filterData?.isRequired === list.value
                                      }
                                      disabled={!filterData?.isVisible}
                                    />
                                    <Typography>{list.label}</Typography>
                                  </Box>
                                ))}
                            </RadioGroup>
                          </Box>
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
            <AddCustomCustomer
              open={openAddCustomer}
              setOpen={setOpenAddCustomer}
            />
          )}

          <Divider sx={{ my: 2 }} />
          <CustomerFieldsAddingTable
            customerDataBases={customerCustomDatabase}
            components={components}
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
