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
import AddDataBase from './AddDataBase'
import EditDataBase from './EditDataBase'
import AppView from '../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataBase } from '../../../Redux/features/DataBaseSlice'

const customDefaultFields = [
  {
    id: 1,
    visible: true,
    fieldName: 'Asset Tag ID',
    required: '',
    description:
      'This field holds the unique asset id number that your company assigns to identify each asset. These are generally sequentially numbered labels with barcodes.',
    example: 'A-1001',
    name: 'assetId',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },

  {
    id: 2,
    visible: true,
    fieldName: 'Asset Description',
    required: '',
    description: 'Description of the asset.',
    example: 'HP - Envy Desktop - 12GB Memory - 2TB Hard Drive',
    name: 'assetDec',
    option: [
      {
        id: 1,
        value: 'yes',
      },
    ],
  },
  {
    id: 3,
    visible: true,
    fieldName: 'Purchase Date',
    required: '',
    description: 'Date asset was purchased',
    example: '08/22/2014',
    name: 'PurchasedDate',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'no',
      },
    ],
  },
  {
    id: 4,
    visible: true,
    fieldName: 'Cost',
    required: '',
    description: 'Cost of the asset',
    example: 'Bs225.75',
    name: 'cost',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'no',
      },
    ],
  },

  {
    id: 5,
    visible: true,
    fieldName: 'Purchased From',
    required: '',
    description: 'Vendor/Supplier name',
    example: 'Amazon',
    name: 'PurchasedForm',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'no',
      },
    ],
  },
  {
    id: 6,
    visible: true,
    fieldName: 'Brand',
    required: '',
    description: 'Manufacturer of the asset',
    example: 'HP',
    name: 'brand',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'no',
      },
    ],
  },
  {
    id: 7,
    visible: true,
    fieldName: 'Model',
    required: '',
    description: 'Model name of the asset',
    example: 'Envy',
    name: 'Model',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'no',
      },
    ],
  },
  {
    id: 8,
    visible: true,
    fieldName: 'Serial No',
    required: '',
    description: "Manufacturer's serial number",
    example: 'HG9C3X',
    name: 'SerialNo',
    option: [
      {
        id: 1,
        value: 'yes',
      },
      {
        id: 2,
        value: 'no',
      },
    ],
  },
]

const DataBases: React.FunctionComponent = () => {
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
    customDefaultFields: customDefaultFields.map(item => ({
      id: item.id,
      visible:item.visible,
      fieldName: item.fieldName,
      required: item.required,
      description: item.description,
    })),
  });
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [eventForm, setEventForm] = useState<any>({})

 

  // const addCustomField = (custom: string) => {
  //   setDataBases((prevData) => ({
  //     ...prevData,
  //     data: [...prevData.data, custom],
  //   }))
  // }

  const deleteCustomField = (index: number) => {
    const updatedData = dataBases.customAssetFields.filter((_, idx) => idx !== index)
    setDataBases((prevData) => ({ ...prevData, customAssetFields: updatedData }))
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
    setDataBases(prevData => ({
      ...prevData,
      customDefaultFields: prevData.customDefaultFields.map((item, i) =>
        i === index ? { ...item, visible: !item.visible } : item,
      ),
    }));
  };

  const handleDeleteButton = () => {
    if (selectedCell !== null) {
      handleDeleteOpen()
    }
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

  const handleEdit = () => {
    if (selectedCell !== null) {
      handleClickEditOpen()
    }
  }

  const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    setDataBases((prevData) => ({
      ...prevData,
      customDefaultFields: prevData.customDefaultFields.map((item, i) =>
        i === index ? { ...item, required: value } : item
      ),
    }));
  };

  console.log(JSON.stringify(dataBases, null, 2))
  
  const generateJson = () => {
    const jsonData = dataBases.customDefaultFields.map(item => ({
      id: item.id,
      visible:item.visible,
      fieldName: item.fieldName,
      required: item.required,
      description: item.description,
    }));
    return JSON.stringify(jsonData, null, 2);
  };

  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#d32f2f' }}
        />
        Database
      </Typography>

      <Box
        sx={{
          borderRadius: 'none',
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
            <Typography level="body-xs">
              Fill in the appropriate fields for your assets. Asset Tag ID and
              Asset Description are the only required fields. Check the boxes
              next to the field names you want to include.
            </Typography>
          </Box>

          <Box sx={{ mt: '10px', overflowX: 'auto' }}>
            <Table borderAxis="both">
              <thead>
                <tr>
                  <th style={{ width: 30 }}>
                    <Checkbox />
                  </th>
                  <th style={{ minWidth: 180 }}>Field Name</th>
                  <th style={{ minWidth: 200 }}>Date Required</th>
                  <th style={{ minWidth: 400 }}>Description</th>
                  <th style={{ minWidth: 150 }}>Example</th>
                </tr>
              </thead>
              <tbody>
                {customDefaultFields.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                      checked={data.visible} onChange={() => handleCheckboxChange(index)}
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
                              name={data.name}
                              onChange={(event) => HandleRadioSelect(event, index)}
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
            <Divider sx={{ my: '30px' }}></Divider>
          </Box>
        </Box>

        <b>Asset Custom Fields</b>
        <Box sx={{ marginBottom: '2px' }}>
          Add custom fields to join the standard fields that we provided. Feel
          free to get creative.
        </Box>

        <Box>
          <AddDataBase
            dataBases={dataBases}
            setDataBases={setDataBases}
            // addCustomField={addCustomField}
            deleteCustomField={deleteCustomField}
          />

          <EditDataBase
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
            handleEdit={handleEdit}
            handleEditButton={handleEditButton}
            handleDeleteButton={handleDeleteButton}
            handleDeleteSubmit={handleDeleteSubmit}
            handleEditClose={handleEditClose}
            handleDeleteOpen={handleDeleteOpen}
            handleDeleteClose={handleDeleteClose}
          />
        </Box>

        <Divider sx={{ marginTop: '3%' }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: '5px',
            mt: 4,
          }}
        >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              borderRadius: '15px',
            }}
            component="label"
            // onClick={handlePrevTab}
          >
            <NavigateBeforeOutlinedIcon />
            Back
          </Button>
          <Button
            variant="solid"
            sx={{
              background: '#fdd835',
              color: 'white',
              borderRadius: '15px',
            }}
            component="label"
            // onClick={handleNextTab}
          >
            Continue
            <NavigateNextOutlinedIcon />{' '}
          </Button>
        </Box>
      </Box>
    </AppView>
  )
}

export default DataBases
