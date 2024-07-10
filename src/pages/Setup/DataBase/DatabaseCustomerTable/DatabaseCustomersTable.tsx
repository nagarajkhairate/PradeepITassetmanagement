import { Typography, Radio, RadioGroup, Divider, Grid } from '@mui/joy'
import ButtonGroup from '@mui/joy/ButtonGroup'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/joy'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import Button from '@mui/joy/Button'
import { FormControl } from '@mui/joy'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import EditCustomersTable from './EditCustomersTable'
import AddCustomersTable from './AddCustomersTable'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'

const Customers = [
  {
    id: 1,
    fieldName: 'Full Name',
    value: 'fullName',
    visible: true,
    isRequired: true,
    description: 'Full name of the customer',
    example: 'John Doe',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },
  {
    id: 2,
    fieldName: 'Email',
    value: 'email',
    visible: false,
    isRequired: false,
    description: 'Email of the customer',
    example: 'johndoe@example.com',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'optional',
      },
    ],
  },
  {
    id: 3,
    fieldName: 'Company',
    value: 'company',
    visible: false,
    isRequired: false,
    description: 'Customers company name',
    example: 'Jane Doe Company',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'optional',
      },
    ],
  },
  {
    id: 4,
    fieldName: 'Address',
    value: 'address',
    visible: false,
    isRequired: false,
    description: ' All address fields of the customer',
    example: ' ---',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'optional',
      },
    ],
  },
  {
    id: 5,
    fieldName: 'Phone',
    value: 'phone',
    visible: false,
    isRequired: false,
    description: 'Phone number of the customer',
    example: '(555) 123-4567',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'optional',
      },
    ],
  },
  {
    id: 6,
    fieldName: 'Mobile Phone',
    value: 'mobilePhone',
    visible: false,
    isRequired: false,
    description: 'Mobile Cell of the customer',
    example: '	(123) 456-7890',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'optional',
      },
    ],
  },
  {
    id: 7,
    fieldName: 'Notes',
    value: 'notes',
    visible: false,
    isRequired: false,
    description: 'Text area for notes',
    example: 'Leases equipment for 12 months.',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'optional',
      },
    ],
  },
  
]

const DatabaseCustomersTable: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const dataBase = useSelector((state: RootState) => state.dataBase.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(dataBase)

  // React.useEffect(() => {
  //   dispatch(fetchDataBase())
  // }, [])

  const [dataBases, setDataBases] = useState({
    customAsset: [],
    Customers: Customers.map((item) => ({
      ...item,
      id: item.id,
      visible: true,
      isRequired: item.fieldName=== 'Full Name'  ? true : item.isRequired,
      description: item.description,
    })),
  })
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [eventForm, setEventForm] = useState<any>({})

  const deleteCustomField = (index: number) => {
    const updatedData = dataBases.customAsset.filter(
      (_, idx) => idx !== index,
    )
    setDataBases((prevData) => ({
      ...prevData,
      customAsset: updatedData,
    }))
  }

  const handleClickEditOpen = () => {
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedCell(null)
  }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const Custom = (e.target as HTMLFormElement).Custom.value
    if (selectedCell !== null) {
      const updatedData = dataBases.customAsset.map((item, index) =>
        index === selectedCell ? Custom : item,
      )
      // setDataBases((prevData) => ({ ...prevData, data: updatedData }))
      handleEditClose()
    }
  }

  const handleCheckboxChange = (index: number) => {
    setDataBases((prevData) => ({
      ...prevData,
      Customers: prevData.Customers.map((item, i) =>
        i === index
          ? {
              ...item,
              visible: ['Full Name', 'Email'].includes(item.fieldName) ? true : !item.visible,
              isRequired: item.fieldName === 'Full Name' ? true : item.isRequired,
            }
          : item,
      ),
    }));
  };
  

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedData = dataBases.customAsset.filter(
      (_, index) => index !== selectedCell,
    )
    // setDataBases((prevData) => ({ ...prevData, data: updatedData }));
    setDataBases({ ...dataBases, customAsset: updatedData })
    setMatchedSelected([])
    setDeleteOpen(false)
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  const HandleRadioSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target
        const booleanValue = value === 'yes'
    setDataBases((prevData) => ({
      ...prevData,
      Customers: prevData.Customers.map((item, i) =>
        i === index ? { ...item, isRequired: item.fieldName === 'Full Name' ? true : booleanValue } : item,
      ),
    }))
  }
const handleCancel=()=>{
    
}
  const generateJson = () => {
    const jsonData = {
      Customers: dataBases.Customers.map(({ 
        id,  fieldName,value,visible, isRequired, description 
      }) => ({
        id,
        fieldName,
        value,
        visible,
        isRequired,
        description
      })),
      customAsset: dataBases.customAsset.map(({ 
        id, fieldName, isRequired,componentsId,  
      }) => ({
        id,
        fieldName,
        
      componentsId,
      isRequired,
      })),
    };
    return JSON.stringify(jsonData, null, 2);
  };

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
                {dataBases.Customers.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        checked={data.visible}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{data.fieldName}</td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                      {data.visible && (
                        <FormControl>
                          <RadioGroup
                            defaultValue='yes'
                            name="radio-buttons-group"
                            onChange={(event) =>
                              HandleRadioSelect(event, index)
                            }
                          >
                            {data.option.map((opt: any) => (
                              <Radio
                                
                                key={opt.id}
                                name={opt.value}
                                value={opt.value}
                                label={opt.value}
                                variant="outlined"
                                checked={
                                  data.isRequired === (opt.value === 'yes')
                                }
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    </td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{data.description}</td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left'}}>{data.example}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Divider sx={{ my: '20px' }}></Divider>
          </Box>
        </Box>

     

        <Box>
          <AddCustomersTable
            dataBases={dataBases}
            setDataBases={setDataBases}
            // addCustomField={addCustomField}
            deleteCustomField={deleteCustomField}
          />

          <EditCustomersTable
            matchedSelected={matchedSelected}
            setMatchedSelected={setMatchedSelected}
            dataBases={dataBases}
            setDataBases={setDataBases}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            handleCheckboxChange={handleCheckboxChange}
            handleEditButton={handleEditButton}
            handleDeleteSubmit={handleDeleteSubmit}
            handleEditClose={handleEditClose}
            handleDeleteOpen={handleDeleteOpen}
            handleDeleteClose={handleDeleteClose}
          />
        </Box>

        <Divider sx={{ marginTop: '3%' }} />

        <DatabaseButtons onCancel={() => handleCancel()} onSubmit={() => console.log(generateJson())} />

       </Box>
    </AppView>
  )
}

export default DatabaseCustomersTable
