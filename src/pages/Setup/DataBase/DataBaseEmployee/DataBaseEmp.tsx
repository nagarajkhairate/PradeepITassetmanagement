import { Typography, Radio, RadioGroup, Divider, Grid } from '@mui/joy'
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/joy'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import { FormControl } from '@mui/joy'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import AddDataBaseEmp from './AddDataBaseEmp'
import EditDataBaseEmp from './EditDataBaseEmp'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'

const EmployeePerson = [
  {
    id: 1,
    fieldName: 'Full Name',
    value:"fullName",
    visible: true,
    isRequired: true,
    description: 'Full name of the person / employee.',
    example: 'John Doe',
    option: [{id: 1,value: 'yes',},],
  },
  {
    id: 2,
    fieldName: 'Email',
    value: 'email',
    visible: false,
    isRequired: false,
    
    description: 'Email of the person',
    example: 'johndoe@example.com',
    option: [{ id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
  },
  {
    id: 3,
    fieldName: 'Employee ID',
    value: 'employeeID',
    visible: false,
    isRequired: false,
    description: 'For example Employee ID, Student ID, etc.',
    example: 'IT-1234',
    option: [{ id: 1, value: 'yes' },  { id: 2, value: 'optional', }, ],
  },
  {
    id: 4,
    fieldName: 'Title',
    value: 'title',
    visible: false,
    isRequired: false,
    description: '  fieldName of the person.',
    example: '  Sales Manager',
    option: [ {  id: 1, value: 'yes',  }, { id: 2,  value: 'optional', }, ],
  },
  {
    id: 5,
    fieldName: 'Phone',
    value: 'phone',
    visible: false,
    isRequired: false,    
    description: 'Phone number of the person',
    example: '(555) 123-4567',
    option: [ {  id: 1,  value: 'yes',  }, { id: 2, value: 'optional',  }, ],
  },
  {
    id: 6,
    fieldName: 'Notes',
    value: 'notes',
    visible: false,
    isRequired: false,
    description: 'Text area for notes',
    example: 'Reports to CEO',
    option: [ { id: 1, value: 'yes',  }, {  id: 2,  value: 'optional', }, ],
  },
  {
    id: 7,
    fieldName: 'Site',
    value: 'site',
    visible: false,
    isRequired: false,
    description: 'System field to link person to a Site',
    example: '-',
    option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional',  },],
  },
  {
    id: 8,
    fieldName: 'Location',
    value: 'location',
    visible: false,
    isRequired: false,
    description: 'System field to link person to a Location',
    example: '  -',
    option: [  { id: 1, value: 'yes', }, { id: 2, value: 'optional', }, ],
  },
  {
    id: 9,
    fieldName: 'Department',
    value: 'department',
    visible: false,
    isRequired: false,
    description: '  System field to link person to a Department',
    example: '  -',
    option: [{ id: 1, value: 'yes', }, { id: 2, value: 'optional', },],
  },
]

const DataBaseEmp: React.FunctionComponent = () => {
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
    EmployeePerson: EmployeePerson.map((item) => ({
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
      EmployeePerson: prevData.EmployeePerson.map((item, i) =>
        i === index
          ? {
              ...item,
              visible: ['Full Name', 'Email', 'Site', 'Location', 'Department'].includes(item.fieldName)
              ? true
              : !item.visible,
              isRequired : item.fieldName === 'Full Name' ? true : item.isRequired,
            }
          : item,
      ),
    }))
  }

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
      EmployeePerson: prevData.EmployeePerson.map((item, i) =>
        i === index ? { ...item, isRequired: item.fieldName === 'Full Name' ? true : booleanValue } : item,
      ),
    }))
  }

  // console.log(JSON.stringify(dataBases, null, 2))
const handleCancel=()=>{

}
  const generateJson = () => {
    const jsonData = {
      EmployeePerson:dataBases.EmployeePerson.map(
      ({ id,  fieldName, value,visible,isRequired, description }) => ({
        id,
        fieldName,
        value,
        visible,
        isRequired,
        description,
      })),
      customAsset: dataBases.customAsset.map(({ 
        id, fieldName, componentsId,isRequired,  
      }) => ({
        id,
        fieldName,
      componentsId,
      isRequired,
      })),
  }
    return JSON.stringify(jsonData, null, 2)
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
        Database Persons/Employees
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
            Persons/Employees Standard Fields
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Typography >
            Persons/employees are individuals to whom you assign assets. These could be employees in your organization or students in your school/university. Check the boxes
              next to the field names you want to include.
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
                {dataBases.EmployeePerson.map((data, index) => (
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
          <AddDataBaseEmp
            dataBases={dataBases}
            setDataBases={setDataBases}
            // addCustomField={addCustomField}
            deleteCustomField={deleteCustomField}
          />

          <EditDataBaseEmp
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

export default DataBaseEmp
