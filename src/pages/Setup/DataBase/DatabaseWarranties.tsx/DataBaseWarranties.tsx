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
import {warranties,   warrantyValue} from './WarrantiesData'
import AddIcon from '@mui/icons-material/Add'
import AddWarrantiesData from './AddCustomWarranties'
import WarrantyFieldsAddingTable from './WarrantyFieldsAddingTable'
import { fetchWarrantiesCustomDatabase } from '../../../../redux/features/WarrantiesCustomDatabaseSlice'
import { fetchWarrantiesDatabase, updateWarrantiesDatabase } from '../../../../redux/features/WarrantiesDatabaseSlice'
import AddCustomWarranties from './AddCustomWarranties'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'

const DatabaseWarranties: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const warrantiesDatabase = useSelector((state: RootState) => state.warrantiesDatabase.data)
  const warrantiesCustomDatabase = useSelector((state: RootState) => state.warrantiesCustomDatabase.data)
  const components = useSelector((state: RootState) => state.components.data);
  
  const [openAddWarranties, setOpenAddWarranties] = useState(false);
  const [warrantyField, setWarrantyField] = useState<warrantyValue[]>([])
  const [allChecked, setAllChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)


  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    if (
      fieldName !== 'expirationDate' 
    ) {
      const updatedData = warrantyField.map((item) =>
        item.name === fieldName
          ? { ...item, isVisible: event.target.checked }
          : item,
      )
      setWarrantyField(updatedData)

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
    const updatedData = warrantyField.map((item) => ({
      ...item,
      isVisible: checked,
    }))
    setWarrantyField(updatedData)
    setAllChecked(checked)
    setIndeterminate(false)
  }

  const handleRadioSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    setWarrantyField((prevState) =>
      prevState.map((item) =>
        item.name === fieldName
          ? { ...item, isRequired: event.target.value }
          : item,
      ),
    )
  }
  const handleCancel = () => {}

  const handleSubmit = () => {
    console.log(warrantiesDatabase)
    dispatch(updateWarrantiesDatabase(warrantyField))
  }

  useEffect(() => {
    dispatch(fetchWarrantiesDatabase())
    dispatch(fetchWarrantiesCustomDatabase())
    dispatch(fetchComponents())
  },[dispatch])

  useEffect(() => {
    setWarrantyField(warrantiesDatabase)
  }, [warrantiesDatabase])


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
                    <Checkbox 
                     checked={allChecked}
                     indeterminate={indeterminate}
                     onChange={handleHeaderCheckboxChange}
                    />
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
                {warranties &&
                  warranties.map((data, index) => {
                    const filterData = warrantyField.find(
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
                          {data.fieldName === 'Expiration Date' ? (
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


          <WarrantyFieldsAddingTable warrantyDataBases={warrantiesCustomDatabase} components={components}/>
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
