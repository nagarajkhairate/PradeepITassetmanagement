import { Typography, Radio, RadioGroup, Divider, Box,Table, Checkbox, FormControl } from '@mui/joy'
import React, { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import EditContractTable from './EditContractTable'
import AddContractTable from './AddContractTable'

const Contract = [
  {
    id: 1,
    fieldName: 'Contract Title',
    value: 'contractTitle',
    visible: false,
    isRequired: false,
    description: 'Title of Contract',
    example: 'Notebooks Annual Contract',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },
  {
    id: 2,
    fieldName: 'Description',
    value: 'description',
    visible: false,
    isRequired: false,
    description: 'Description of the contract.',
    example: 'Maintenance Contract for Marketing department Notebooks',
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
    fieldName: 'Hyperlink',
    value: 'hyperlink',
    visible: false,
    isRequired: false,
    description: 'HyperLink of Contract',
    example: 'https://www.example.com',
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
    fieldName: 'Contract No.',
    value: 'contractNo',
    visible: false,
    isRequired: false,
    description: 'Contract No.',
    example: ' AMC984763',
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
    fieldName: 'Cost',
    value: 'cost',
    visible: false,
    isRequired: false,
    description: 'Cost of Contract',
    example: '$499.95',
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
    fieldName: 'Start Date',
    value: 'startDate',
    visible: false,
    isRequired: false,
    description: 'Start Date of Contract',
    example: '7/4/2020',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },
  {
    id: 7,
    fieldName: 'End Date',
    value: 'endDate',
    visible: false,
    isRequired: false,
    description: 'End Date of Contract',
    example: '	7/3/2021',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },
  {
    id: 8,
    fieldName: 'No End Date',
    value: 'noEndDate',
    visible: false,
    isRequired: false,
    description: 'No End Date',
    example: 'No',
  },
  {
    id: 9,
    fieldName: 'Vendor',
    value: 'vendor',
    visible: false,
    isRequired: false,
    description: 'Vendor of Contract',
    example: 'CompuByte Computer Services',
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
    id: 10,
    fieldName: 'Contract Person',
    value: 'contract person',
    visible: false,
    isRequired: false,
    description: 'Contact Person',
    example: 'James Brown',
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
    id: 11,
    fieldName: 'Phone',
    value: 'phone',
    visible: false,
    isRequired: false,
    description: 'Phone',
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
    id: 12,
    fieldName: 'No. of Licenses',
    value: 'noOfLicenses',
    visible: false,
    isRequired: false,
    description: 'No. of Licenses',
    example: '10',
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
    id: 13,
    fieldName: 'Is Software',
    value: 'isSoftware',
    visible: false,
    isRequired: false,
    description: 'Is Contract a Software ?',
    example: 'No',
  },
  
]

const DatabaseContractTable: React.FunctionComponent = () => {
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const [dataBases, setDataBases] = useState({
    customAsset: [],
    Contract: Contract.map((item) => ({
      ...item,
      id: item.id,
      visible: true,
      isRequired: item.fieldName=== 'Contract Title' || item.fieldName==='Start Date' || item.fieldName==="End Date" ? true : item.isRequired,
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
      handleEditClose()
    }
  }

  const handleCheckboxChange = (index: number) => {
    setDataBases((prevData) => ({
      ...prevData,
      Contract: prevData.Contract.map((item, i) =>
        i === index
          ? {
              ...item,
              visible: ['Contract Title', 'Start Date', "End Date", "No End Date"].includes(item.fieldName) ? true : !item.visible,
              isRequired: item.fieldName === 'Contract Title'|| item.fieldName === 'Start Date'|| item.fieldName === "End Date" ? true : item.isRequired,
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
      Contract: prevData.Contract.map((item, i) =>
        i === index ? { ...item, isRequired: booleanValue} : item,
      ),
    }))
  }
const handleCancel=()=>{
    
}
  const generateJson = () => {
    const jsonData = {
        Contract: dataBases.Contract.map(({ 
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
                {dataBases.Contract.map((data, index) => (
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
                            {data.option && data.option.map((opt: any) => (
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
          <AddContractTable
            dataBases={dataBases}
            setDataBases={setDataBases}
            // addCustomField={addCustomField}
            deleteCustomField={deleteCustomField}
          />

          <EditContractTable
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

export default DatabaseContractTable
