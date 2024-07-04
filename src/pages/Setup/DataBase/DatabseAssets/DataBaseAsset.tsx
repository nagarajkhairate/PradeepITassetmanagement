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
import AddDataBase from './AddDataBaseAsset'
import EditDataBase from './EditDataBaseAsset'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import AddDataBaseAsset from './AddDataBaseAsset'
import EditDataBaseAsset from './EditDataBaseAsset'
import { fetchDefaultFields } from '../../../../Redux/features/DefaultFieldAssetSlice'



const AssetDefaultFields = [
  {
    id: 1,
    fieldName: 'Asset Tag ID',
    visible: false,
    isRequired: '',
    description:
      'This holds unique asset id number that your company assigns to identify each asset',
    example: 'A-1001',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },

  {
    id: 2,
    fieldName: 'Asset Description',
    visible: false,

    isRequired: '',
    description: 'Description of the asset.',
    example: 'HP - Envy Desktop - 12GB Memory - 2TB Hard Drive',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },
  {
    id: 3,
    fieldName: 'Purchase Date',
    visible: false,

    isRequired: '',
    description: 'Date asset was purchased',
    example: '08/22/2014',
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
    fieldName: 'Cost',
    visible: false,

    isRequired: '',
    description: 'Cost of the asset',
    example: 'Bs225.75',
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
    fieldName: 'Purchased From',
    visible: false,

    isRequired: '',
    description: 'Vendor/Supplier name',
    example: 'Amazon',
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
    fieldName: 'Brand',
    visible: false,

    isRequired: '',
    description: 'Manufacturer of the asset',
    example: 'HP',
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
    fieldName: 'Model',
    visible: false,

    isRequired: '',
    description: 'Model name of the asset',
    example: 'Envy',
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
    fieldName: 'Serial optional',
    visible: false,

    isRequired: '',
    description: "Manufacturer's serial number",
    example: 'HG9C3X',
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

const DataBaseAsset: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const dataBase = useSelector((state: RootState) => state.defaultFields.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(dataBase)

  React.useEffect(() => {
    dispatch(fetchDefaultFields())
  }, [])

  const [dataBases, setDataBases] = useState({
    customAsset: [],
    AssetDefaultFields: AssetDefaultFields.map((item) => ({
      ...item,
      id: item.id,
      visible: item.visible,
      isRequired: item.isRequired,
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
      AssetDefaultFields: prevData.AssetDefaultFields.map((item, i) =>
        i === index ? { ...item, visible: !item.visible } : item,
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
    setDataBases((prevData) => ({
      ...prevData,
      AssetDefaultFields: prevData.AssetDefaultFields.map((item, i) =>
        i === index ? { ...item, isRequired: value } : item,
      ),
    }))
  }

  const handleCancel=()=>{
    
  }

  const generateJson = () => {
    const jsonData = {
      AssetDefaultFields: dataBases.AssetDefaultFields.map(({ 
        id, visible, fieldName, isRequired, description 
      }) => ({
        id,
        visible,
        fieldName,
        isRequired,
        description
      })),
      customAsset: dataBases.customAsset.map(({ 
        id, fieldName, componentsId, categoryId,isRequired,  
      }) => ({
        id,
        fieldName,
      componentsId,
      categoryId,
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
        Database Assets
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
              Fill in the appropriate fields for your assets. <b>Asset Tag ID</b> and  <b>Asset Description</b> are the only required fields. Check the boxes
              next to the field names you want to include.
            </Typography>
          </Box>

          <Box  sx={{
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
                }}>
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
                    style={{ background: '#fff8e6', verticalAlign: 'middle', wordBreak: 'break-word', whiteSpace: 'normal' }}
                  >
                    Description
                  </th>
                  <th
                   style={{ background: '#fff8e6', verticalAlign: 'middle', wordBreak: 'break-word', whiteSpace: 'normal' }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataBases.AssetDefaultFields.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        checked={data.visible}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{data.fieldName}</td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
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
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{data.description}</td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left'}}>{data.example}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Divider sx={{ my: '30px' }}></Divider>
          </Box>
        </Box>

        <Typography
          level="h4"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
        >
          <SignpostOutlinedIcon
            style={{ fontSize: '1.4rem', color: '#FBC21E' }}
          />
          Asset Custom Fields
        </Typography>
        <Box>
          Add custom fields to join the standard fields that we provided. Feel
          free to get creative.
        </Box>

        <Box>
          <AddDataBaseAsset
            dataBase={dataBases}
            setDataBases={setDataBases}
            // addCustomField={addCustomField}
            deleteCustomField={deleteCustomField}
          />

          <EditDataBaseAsset
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

export default DataBaseAsset
