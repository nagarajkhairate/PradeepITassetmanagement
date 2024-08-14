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
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchContractDatabase,
  updateContractDatabase,
} from '../../../../redux/features/ContractDatabaseSlice'
import { ThunkDispatch } from 'redux-thunk'
import { fetchContractCustomDatabase } from '../../../../redux/features/ContractCustomDatabaseSlice'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'
import AddIcon from '@mui/icons-material/Add'
import ContractFieldsAddingTable from './ContractFieldsAddingTable'
import AddCustomContract from './AddCustomContract'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import { contract, contractValue } from './ContractData'
import { FormControlLabel } from '@mui/material'

const DatabaseContractTable: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const contractDatabase = useSelector((state: RootState) => state.contractDatabase.data)
  const contractCustomDatabase = useSelector((state: RootState) => state.contractCustomDatabase.data)
  const components = useSelector((state: RootState) => state.components.data)
  
  const [openAddContract, setOpenAddContract] = useState(false)
  const [contractField, setContractData] = useState<contractValue[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    if (
      fieldName !== 'contractTitle' &&
      fieldName !== 'startDate' &&
      fieldName !== 'endDate' &&
      fieldName !== 'noEndDate'
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
    console.log(contractDatabase)
    dispatch(updateContractDatabase(contractField))
  }

  useEffect(() => {
    dispatch(fetchContractDatabase())
    dispatch(fetchContractCustomDatabase())
    dispatch(fetchComponents())
  }, [dispatch])

  useEffect(() => {
    setContractData(contractDatabase)
  }, [contractDatabase])

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
                      width: 40,
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
                {contract &&
                  contract.map((data, index) => {
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
                          {data.fieldName === 'Contract Title' ||
                          data.fieldName === 'Start Date' ||
                          data.fieldName === 'End Date' ? (
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
          </Box>

          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              mt: 4,
            }}
          >
            <Button
              variant="solid"
              color="primary"
              onClick={() => setOpenAddContract(true)}
              startDecorator={<AddIcon />}
              sx={{
                background: '#1C1C1C',
                '&:hover': {
                  background: '#000000',
                },
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: '400',
              }}
            >
              Add Custom Fields
            </Button>
            {openAddContract && (
              <AddCustomContract
                open={openAddContract}
                setOpen={setOpenAddContract}
              />
            )}
          </Box>

          <Box
            sx={{
              borderRadius: '10px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              background: '#ffffff',
              mt: 4,
              gap: '5px',
              p: 2,
            }}
          >
            <ContractFieldsAddingTable
              contractDataBases={contractCustomDatabase}
              components={components}
            />
            <Divider />
          </Box>
          <Box>
            <DatabaseButtons
              onCancel={() => handleCancel()}
              onSubmit={() => handleSubmit()}
            />
          </Box>
        </Box>
      </Box>
    </AppView>
  )
}

export default DatabaseContractTable
