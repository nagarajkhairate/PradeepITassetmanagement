import {
  Typography,
  Radio,
  RadioGroup,
  Divider,
  Box,
  Table,
  Checkbox,
  FormControl,
  Button,
} from '@mui/joy'
import React, { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import { Contract, contractData, customContract } from './ContractData'
import AddIcon from '@mui/icons-material/Add'
import AddDialogContract from './AddCustomContract'
import ContractFieldsAddingTable from './ContractFieldsAddingTable'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchContractDatabase,
  updateContractDatabase,
} from '../../../../redux/features/ContractDatabaseSlice'
import { ThunkDispatch } from 'redux-thunk'
import { fetchContractCustomDatabase } from '../../../../redux/features/ContractCustomDatabaseSlice'
import AddCustomContract from './AddCustomContract'

const DatabaseContractTable: React.FunctionComponent = () => {
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const contractDatabase = useSelector(
    (state: RootState) => state.contractDatabase.data,
  )
  const contractCustomDatabase = useSelector(
    (state: RootState) => state.contractCustomDatabase.data,
  )

  const [openAddContract, setOpenAddContract] = useState(false)
  const [contractDataBases, setContractDataBases] = useState(contractData)
  const LOCAL_STORAGE_KEY = 'contractDataBases'

  useEffect(() => {
    setContractDataBases(contractData)
  }, [])

  const [allChecked, setAllChecked] = useState(false)

  const handleHeaderCheckboxChange = () => {
    const newCheckedState = !allChecked
    const updatedForm = contractDataBases.map((item) => ({
      ...item,
      isVisible:
        item.fieldName === 'Contract Title' ||
        item.fieldName === 'Start Date' ||
        item.fieldName === 'End Date' ||
        item.fieldName === 'No End Date'
          ? true
          : newCheckedState,
    }))

    setContractDataBases(updatedForm)
    setAllChecked(newCheckedState)
  }

  const handleCheckboxChange = (index: number, fieldName: string) => {
    const updatedForm = [...contractDataBases]

    if (
      fieldName !== 'Contract Title' &&
      fieldName !== 'Start Date' &&
      fieldName !== 'End Date' &&
      fieldName !== 'No End Date'
    ) {
      updatedForm[index].isVisible = !updatedForm[index].isVisible
    } else {
      updatedForm[index].isVisible = true
    }
    setContractDataBases(updatedForm)

    const allChecked = updatedForm
      .filter(
        (item) => item.fieldName !== 'Asset Tag ID' && 'Asset Description',
      )
      .every((item) => item.isVisible)
    setAllChecked(allChecked)
  }

  const handleRadioChange = (index: number, value: string) => {
    const updatedForm = [...contractDataBases]

    if (
      contractDataBases[index].fieldName === 'Contract Title' ||
      contractDataBases[index].fieldName === 'Start Date' ||
      contractDataBases[index].fieldName === 'End Date'
    ) {
      updatedForm[index].isRequired = 'yes'
    } else if (
      contractDataBases[index].fieldName === 'No End Date' ||
      contractDataBases[index].fieldName === 'Is Software'
    ) {
      return
    } else {
      updatedForm[index].isRequired = value
    }
    setContractDataBases(updatedForm)
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(contractDataBases)
    dispatch(updateContractDatabase(contractDatabase))
  }

  React.useEffect(() => {
    dispatch(fetchContractDatabase())
  }, [dispatch])

  React.useEffect(() => {
    dispatch(fetchContractCustomDatabase())
  }, [!openAddContract])

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedData) {
      setContractDataBases(JSON.parse(storedData))
    } else {
      setContractDataBases(contractData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contractDataBases))
  }, [contractDataBases])

  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC21E' }}
        />
        Database Contract
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
           Contract Standard Fields
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
                {contractDataBases.map((opt, index) => {
                  const data = Contract.find(
                    (field) => field.fieldName === opt.fieldName,
                  )
                  if (!data) return null

                  return (
                    <tr key={`${data.fieldName}-${index}`}>
                      <td>
                        <Checkbox
                          checked={opt.isVisible || false}
                          onChange={() =>
                            handleCheckboxChange(index, data.fieldName)
                          }
                        />
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {data.fieldName === 'Contract Title' ||
                        data.fieldName === 'Start Date' ||
                        data.fieldName === 'End Date' ? (
                          <>
                            {data.fieldName}{' '}
                            <span style={{ color: 'red',fontSize:'1.1rem' }}>*</span>
                          </>
                        ) : (
                          data.fieldName
                        )}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {data.isVisible && (
                          <FormControl>
                            {data.fieldName !== 'No End Date' &&
                              data.fieldName !== 'Is Software' && (
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
                                    disabled={!opt.isVisible}
                                    sx={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      gap: 2,
                                      // visibility: opt.fieldName === 'Full Name' ? 'isVisible' : 'hidden',
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
                                  {opt.fieldName !== 'Contract Title' &&
                                    opt.fieldName !== 'Start Date' &&
                                    opt.fieldName !== 'End Date' && (
                                      <FormControl
                                        key={`${index}-optional`}
                                        disabled={!opt.isVisible}
                                        sx={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <Radio
                                          value="optional"
                                          checked={
                                            opt.isRequired === 'optional'
                                          }
                                          onChange={(e) =>
                                            handleRadioChange(
                                              index,
                                              e.target.value,
                                            )
                                          }
                                          color="primary"
                                          sx={{ mr: 1 }}
                                        />
                                        Optional
                                      </FormControl>
                                    )}
                                </RadioGroup>
                              )}
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
            Contract Custom Fields
          </Typography>
          <Typography sx={{ marginTop: '10px' }}>
            Add custom fields to join the standard fields that we provided.
          </Typography>

          <Button
            onClick={() => setOpenAddContract(true)}
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

          {openAddContract && (
            <AddCustomContract
              open={openAddContract}
              setOpen={setOpenAddContract}
            />
          )}

          <ContractFieldsAddingTable
            contractDataBases={contractCustomDatabase}
          />
        </Box>

        <DatabaseButtons
          onCancel={() => handleCancel()}
          onSubmit={() => handleSubmit()}
        />
      </Box>
    </AppView>
  )
}

export default DatabaseContractTable
