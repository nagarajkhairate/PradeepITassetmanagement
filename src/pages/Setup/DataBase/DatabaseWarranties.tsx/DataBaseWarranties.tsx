import { Typography, Radio, RadioGroup, Divider, Grid, Button } from '@mui/joy'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/joy'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import { FormControl } from '@mui/joy'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import {warranties, customWarranties, warrantyData} from './WarrantiesData'
import AddIcon from '@mui/icons-material/Add'
import AddWarrantiesData from './AddCustomWarranties'
import WarrantyFieldsAddingTable from './WarrantyFieldsAddingTable'
import { fetchWarrantiesCustomDatabase } from '../../../../redux/features/WarrantiesCustomDatabaseSlice'
import { fetchWarrantiesDatabase, updateWarrantiesDatabase } from '../../../../redux/features/WarrantiesDatabaseSlice'
import AddCustomWarranties from './AddCustomWarranties'

const DatabaseWarranties: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const warrantiesDatabase = useSelector((state: RootState) => state.warrantiesDatabase.data)
  const warrantiesCustomDatabase = useSelector((state: RootState) => state.warrantiesCustomDatabase.data)

  const [openAddWarranties, setOpenAddWarranties] = useState(false);
  const [warrantyDataBases, setWarrantyDataBases] = useState(warrantyData)

  useEffect(() => {
    setWarrantyDataBases(warrantyData)
  }, [])


  const handleCheckboxChange = (index: number) => {
    const updatedForm = [...warrantyDataBases]
    updatedForm[index].isVisible = !updatedForm[index].isVisible
    setWarrantyDataBases(updatedForm)
  }

  const handleRadioChange = (index: number, value: string) => {
    const updatedForm = [...warrantyDataBases]
    updatedForm[index].isRequired = value
    setWarrantyDataBases(updatedForm)
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(warrantyDataBases)
    dispatch(updateWarrantiesDatabase(warrantiesDatabase))
  }

  useEffect(() => {
    dispatch(fetchWarrantiesDatabase())
  }, [dispatch])


  useEffect(() => {
    dispatch(fetchWarrantiesCustomDatabase())
  }, [!openAddWarranties])

  return (
    <AppView>
      <Typography
        level="h3"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC21E' }}
        />
        Database warranty
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
            display:'flex',
            flexDirection:{md:'left', xs:'center'},
          }}
        >
          <Typography
            level="h4"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            Warranty Standard Fields
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Typography>
               Select the fields you would like to use for the warranty table.
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
                {warrantyDataBases.map((opt, index) => {
                  const data = warranties.find(
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
            Warranty Custom Fields
          </Typography>
          <Typography sx={{ marginTop: '10px' }}>
          Add custom fields to join the standard fields that we provided.
          </Typography>

          <Button
            onClick={() => setOpenAddWarranties(true)}
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

          {openAddWarranties && (
            <AddCustomWarranties
              open={openAddWarranties}
              setOpen={setOpenAddWarranties}
            />
          )}


          <WarrantyFieldsAddingTable warrantyDataBases={warrantiesCustomDatabase} />
        </Box>

        <DatabaseButtons
          onCancel={() => handleCancel()}
          onSubmit={() => handleSubmit()}
        />
      </Box>
    </AppView>
  )
}
export default DatabaseWarranties
