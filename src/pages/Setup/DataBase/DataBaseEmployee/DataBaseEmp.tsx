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
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import AddDataBaseEmp from './AddDataBaseEmp'
import EditDataBaseEmp from './EditDataBaseEmp'
import { RootState } from '../../../../redux/store'
import { fetchDataBase } from '../../../../Redux/features/DataBaseSlice'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'

const customDefaultFields = [
  {
    id: 1,
    fieldName: 'Full Name ',
    visible: false,
    required: '',
    name: 'fullName',
    description: 'Full name of the person / employee.',
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
    visible: false,
    required: '',
    name: 'email',
    description: 'Email of the person',
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
    fieldName: 'Employee ID',
    visible: false,
    required: '',
    name: 'employeeID',
    description: 'For example Employee ID, Student ID, etc.',
    example: 'IT-1234',
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
    fieldName: 'Title',
    visible: false,
    required: '',
    name: 'title',
    description: '  fieldName of the person.',
    example: '  Sales Manager',
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
    visible: false,
    required: '',
    name: 'phone',
    description: 'Phone number of the person',
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
    fieldName: 'Notes',
    visible: false,
    required: '',
    name: 'notes',
    description: 'Text area for notes',
    example: 'Reports to CEO',
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
    fieldName: 'Site',
    visible: false,
    required: '',
    name: 'site',
    description: 'System field to link person to a Site',
    example: '-',
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
    id: 8,
    fieldName: 'Location',
    visible: false,
    required: '',
    name: 'location',
    description: 'System field to link person to a Location',
    example: '  -',
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
    id: 9,
    fieldName: 'Department',
    visible: false,
    required: '',
    name: 'department',
    description: '  System field to link person to a Department',
    example: '  -',
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

const DataBaseEmp: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const dataBase = useSelector((state: RootState) => state.dataBase.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(dataBase)

  React.useEffect(() => {
    dispatch(fetchDataBase())
  }, [])

  const [dataBases, setDataBases] = useState({
    customAssetFields: [],
    customDefaultFields: customDefaultFields.map((item) => ({
      ...item,
      id: item.id,

      visible: item.visible,

      required: item.required,
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
    const updatedData = dataBases.customAssetFields.filter(
      (_, idx) => idx !== index,
    )
    setDataBases((prevData) => ({
      ...prevData,
      customAssetFields: updatedData,
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
      const updatedData = dataBases.customAssetFields.map((item, index) =>
        index === selectedCell ? Custom : item,
      )
      // setDataBases((prevData) => ({ ...prevData, data: updatedData }))
      handleEditClose()
    }
  }

  // const handleCheckboxChange = (index: number) => {
  //   setMatchedSelected((prevSelected) =>
  //     prevSelected.includes(index)
  //       ? prevSelected.filter((item) => item !== index)
  //       : [...prevSelected, index],
  //   )
  //   setSelectedCell(index)
  // }
  const handleCheckboxChange = (index: number) => {
    setDataBases((prevData) => ({
      ...prevData,
      customDefaultFields: prevData.customDefaultFields.map((item, i) =>
        i === index ? { ...item, visible: !item.visible } : item,
      ),
    }))
  }

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedData = dataBases.customAssetFields.filter(
      (_, index) => index !== selectedCell,
    )
    // setDataBases((prevData) => ({ ...prevData, data: updatedData }));
    setDataBases({ ...dataBases, customAssetFields: updatedData })
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
    setDataBases((prevData) => ({
      ...prevData,
      customDefaultFields: prevData.customDefaultFields.map((item, i) =>
        i === index ? { ...item, required: value } : item,
      ),
    }))
  }

  // console.log(JSON.stringify(dataBases, null, 2))
const handleCancel=()=>{

}
  const generateJson = () => {
    const jsonData = dataBases.customDefaultFields.map(
      ({ id, visible, fieldName, required, description }) => ({
        id,
        visible,
        fieldName,
        required,
        description,
      }),
    )
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
            Asset Database Fields
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Typography >
              Fill in the appropriate fields for your assets. Asset Tag ID and
              Asset Description are the only required fields. Check the boxes
              next to the field names you want to include.
            </Typography>
          </Box>

          <Box sx={{ mt: '10px', overflowX: 'auto' }}>
            <Table borderAxis="both">
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
                    style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                  >
                    Field Name
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                  >
                    Data Required
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                  >
                    Description
                  </th>
                  <th
                    style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataBases.customDefaultFields.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        checked={data.visible}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td>{data.fieldName}</td>
                    <td>
                      {/* {data.required} */}
                      {data.visible && (
                        <FormControl>
                          <RadioGroup
                            defaultValue="outlined"
                            name="radio-buttons-group"
                          >
                            {data.option.map((opt: any) => (
                              <Radio
                                onChange={(event) =>
                                  HandleRadioSelect(event, index)
                                }
                                key={opt.id}
                                value={opt.value}
                                label={opt.value}
                                variant="outlined"
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      )}
                    </td>
                    <td>{data.description}</td>
                    <td>{data.example}</td>
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
