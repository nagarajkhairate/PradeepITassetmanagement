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
import { RootState } from '../../../../redux/store'
import EditDataBaseMaintenance from './EditDataBaseMaintenance'
import AddDataBaseMaintenance from './AddDataBaseMaintenance'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'

const customDefaultFields = [
  {
    id: 1,
    fieldName: 'Title',
    value: 'title',
    visible: false,
    isRequired: false,
    description: 'Title of the maintenance.',
    example: 'Monthly Calibration',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },
  {
    id: 2,
    fieldName: 'Details',
    value: 'details',
    visible: false,
    isRequired: false,
    description: '	Details of the maintenance',
    example: 'Calibrate to 120 units',
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
    fieldName: 'Due Date',
    visible: false,
    isRequired: false,
    value: 'dueDate',
    description: 'Date when maintenance is due',
    example: '3/5/2020',
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
    fieldName: 'Maintenance By',
    visible: false,
    isRequired: false,
    value: 'maintenanceBy',
    description: 'Person doing maintenance',
    example: '	John Doe',
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
    fieldName: 'Maintenance Status',
    visible: false,
    isRequired: false,
    value: 'maintenanceStatus',
    description:
      ' System field to show current status of the maintenance. The possible values are Scheduled, In progress, On Hold, Cancelled, Completed.',
    example: ' Scheduled',
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
    fieldName: 'Date Completed',
    visible: false,
    isRequired: false,
    value: 'dateCompleted',
    description: '	Date when maintenance is completed',
    example: '3/5/2020',
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
    fieldName: 'Maintenance Cost',
    visible: false,
    isRequired: false,
    value: 'maintenanceCost',
    description: 'Total cost spent on this maintenance',
    example: '	$97.50',
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
    fieldName: 'Repeating',
    visible: false,
    isRequired: false,
    value: 'repeating',
    description: 'System fields to define repeating maintenances',
    example: '---',
    option: [
      {
        id: 1,
        value: 'yes',
      },
     
    ],
  },
]

const DatabaseMaintenance: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const dataBase = useSelector((state: RootState) => state.dataBase.data)
  console.log(dataBase)

  const [dataBases, setDataBases] = useState({
    customAssetFields: [],
    customDefaultFields: customDefaultFields.map((item) => ({
      ...item,
      id: item.id,
      visible: true,
      isRequired: item.fieldName=== 'Title' ||item.fieldName=== 'Repeating'  ? true : item.isRequired,
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
  const handleCheckboxChange = (index: number) => {
    setDataBases((prevData) => ({
      ...prevData,
      customDefaultFields: prevData.customDefaultFields.map((item, i) =>
        i === index
          ? {
              ...item,
              visible: ['Title', 'Due Date','Maintenance Status', 'Repeating' ].includes(item.fieldName) ? true : !item.visible,
              isRequired: item.fieldName === 'Title' || item.fieldName==='Repeating'  ? true
              : !item.visible ? false : item.isRequired,
            }
          : item,
      ),
    }));
  };

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
     const booleanValue = value === 'yes'
    setDataBases((prevData) => ({
      ...prevData,
      customDefaultFields: prevData.customDefaultFields.map((item, i) =>
        i === index ? { ...item, isRequired: booleanValue } : item,
      ),
    }))
  }
  const handleCancel = () => {}

  const generateJson = () => {
    const jsonData = {
      customDefaultFields:dataBases.customDefaultFields.map(
      ({ id,  fieldName,value,  visible,isRequired, description }) => ({
        id,
        fieldName,
        value,
        visible,
        isRequired,
        description,
      })),
      customAssetFields: dataBases.customAssetFields.map(({ 
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
        level="h3"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#FBC21E' }}
        />
        Database Maintenance
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
            Maintenance Standard Fields
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mt: 3 }}>
            <Typography>
              Select the fields you would like to use for the maintenance table.
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
                {dataBases.customDefaultFields.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        checked={data.visible}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{data.fieldName}</td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>
                      {data.visible && (
                        <FormControl>
                          <RadioGroup
                              defaultValue={
                                data.visible &&
                                (data.fieldName === 'Title' ||
                                  data.fieldName === 'Repeating')
                                  ? 'yes'
                                  : 'optional'
                              }
                            name="radio-buttons-group"
                            onChange={(event) =>
                              HandleRadioSelect(event, index)
                            }
                          >
                            {data.option.map((opt: any) => (
                              <Radio
                                
                                key={opt.id}
                                name={opt.name}
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
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{data.example}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Divider sx={{ my: '20px' }}></Divider>
          </Box>
        </Box>

        <Box>
          <AddDataBaseMaintenance
            dataBases={dataBases}
            setDataBases={setDataBases}
            deleteCustomField={deleteCustomField}
          />
          <EditDataBaseMaintenance
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
        <DatabaseButtons onCancel={() => handleCancel()} onSubmit={() => console.log(generateJson())}/>
      </Box>
    </AppView>
  )
}
export default DatabaseMaintenance
