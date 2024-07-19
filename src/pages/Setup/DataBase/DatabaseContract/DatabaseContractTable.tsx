import { Typography, Radio, RadioGroup, Divider, Box,Table, Checkbox, FormControl, Button } from '@mui/joy'
import React, { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import { Contract, contractData, customContract } from './ContractData'
import AddIcon from '@mui/icons-material/Add'
import AddDialogContract from './AddDialogContract'
import ContractFieldsAddingTable from './ContractFieldsAddingTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContractDatabase } from '../../../../redux/features/ContractDatabaseSlice'
import { ThunkDispatch } from 'redux-thunk'
import { fetchContractCustomDatabase } from '../../../../redux/features/ContractCustomDatabaseSlice'



const DatabaseContractTable: React.FunctionComponent = () => {
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const contractDatabase = useSelector((state: RootState) => state.contractDatabase.data)
  const contractCustomDatabase = useSelector((state: RootState) => state.contractCustomDatabase.data)

  React.useEffect(() => {
    dispatch(fetchContractDatabase())
  }, [])


  React.useEffect(() => {
    dispatch(fetchContractCustomDatabase())
  }, [])


  const [openAddContract, setOpenAddContract] = useState(false);
  const [contractDataBases, setContractDataBases] = useState(contractData)

  useEffect(() => {
    setContractDataBases(contractData)
  }, [])

  const handleCheckboxChange = (index: number) => {
    const updatedForm = [...contractDataBases]
    updatedForm[index].isVisible = !updatedForm[index].isVisible
    setContractDataBases(updatedForm)
  }

  const handleRadioChange = (index: number, value: string) => {
    const updatedForm = [...contractDataBases]
    updatedForm[index].isRequired = value
    setContractDataBases(updatedForm)
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(contractDataBases)
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
            <Typography >
            Customers are the individuals or organizations to whom you  lease out your equipment. Select the fields you would like to use for your customers.
            </Typography>
          </Box>

          <Box sx={{
                overflowX: 'auto',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                borderRadius:'5px'
              }}>
            <Table 
             borderAxis="both" aria-label="basic table" 
             style={{
                   borderCollapse: 'collapse',
                   border: '1px solid grey',
                   minWidth: '500px',
                   borderRadius:'5px'
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
                   style={{ background: '#fff8e6', verticalAlign: 'middle',wordBreak: 'break-word', whiteSpace: 'normal' }}
                  >
                    Field Name
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle',wordBreak: 'break-word', whiteSpace: 'normal' }}
                  >
                    Data Required
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle',wordBreak: 'break-word', whiteSpace: 'normal' }}
                  >
                    Description
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle',wordBreak: 'break-word', whiteSpace: 'normal' }}
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
                        {data.isVisible && (
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
            <AddDialogContract
              open={openAddContract}
              setOpen={setOpenAddContract}
            />
          )}

          <Divider sx={{ my: 2 }} />
          <ContractFieldsAddingTable contractDataBases={contractCustomDatabase} />
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

export default DatabaseContractTable
