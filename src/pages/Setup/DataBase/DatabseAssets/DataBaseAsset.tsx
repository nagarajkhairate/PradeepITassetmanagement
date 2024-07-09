
import { Typography, Radio, RadioGroup, Divider } from '@mui/joy'
import React, { useState } from 'react'
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
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import AddDataBaseAsset from './AddDataBaseAsset'
import EditDataBaseAsset from './EditDataBaseAsset'
import { fetchDefaultFields,  updateDefaultFieldsById } from '../../../../redux/features/DefaultFieldAssetSlice'



const AssetDefaultFields = [
  {
    
    fieldName: 'Asset Tag ID',
    value:'assetTagId',
    visible: false,
    isRequired: false,
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

    fieldName: 'Asset Description',
    visible: false,
    value:"assetDescription",
    isRequired: false,
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

    fieldName: 'Purchase Date',
    visible: false,
    value:"purchaseDate",
    isRequired: false,
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

    fieldName: 'Cost',
    visible: false,
    value:"cost",
    isRequired: false,
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

    fieldName: 'Purchased Form',
    value:"purchasedForm",
    visible: false,

    isRequired: false,
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
 
    fieldName: 'Brand',
    visible: false,
    value:"brand",
    isRequired: false,
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

    fieldName: 'Model',
    visible: false,
    value:"model",
    isRequired: false,
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
  
    fieldName: 'Serial optional',
    visible: false,
    value:'serialOptional',
    isRequired: false,
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
  const defaultFields = useSelector((state: RootState) => state.defaultFields.data)
  console.log(JSON.stringify(defaultFields))
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
 const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [dataBases, setDataBases] = useState({
    customAsset: [],
    AssetDefaultFields: AssetDefaultFields.map((item) => ({
      ...item,
      // id: item.id,
      visible: item.visible,
      isRequired: item.option.find((opt) => opt.value === 'optional') ? false : true, 
      description: item.description,
      
    })),
  })

 
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [dataBaseForm, setDataBaseForm] = useState<any>({id:1})

  React.useEffect(() => {
    if(defaultFields.length > 0){
      setMatchedSelected(defaultFields[0])
    }
  }, [setMatchedSelected]);
  
  React.useEffect(() => {
    dispatch(fetchDefaultFields())
  }, [dispatch])

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

  // const handleCheckboxChange = (index: number) => {
  //   setDataBases((prevData) => ({
  //     ...prevData,
  //     AssetDefaultFields: prevData.AssetDefaultFields.map((item, i) =>
  //       i === index ? { ...item, visible: !item.visible } : item,
  //     ),
  //   }))
  //   dispatch(updateDefaultFieldsById(AssetDefaultFields))
  // }

  const handleCheckboxChange = (index: number) => {
    setDataBases((prevData) => ({
      ...prevData,
      AssetDefaultFields: prevData.AssetDefaultFields.map((item, i) =>
        i === index
          ? {
              ...item,
              visible: !item.visible,
              isRequired: !item.visible, // Set isRequired to false when becoming visible
            }
          : item
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
    const booleanValue = value === 'yes'; 
    setDataBases((prevData) => ({
      ...prevData,
      AssetDefaultFields: prevData.AssetDefaultFields.map((item, i) =>
        i === index ? { ...item, isRequired: booleanValue } : item,
      ),
    }))
  }

  const handleCancel=()=>{
    
  }

  const generateJson = () => {
    const jsonData = {
      AssetDefaultFields: dataBases.AssetDefaultFields.map(({ 
         visible,value, fieldName, isRequired, description 
      }) => ({
        value,
        visible,
        fieldName,
        isRequired,
        description
      })),
      customAsset: dataBases.customAsset.map(({ 
        id, fieldName, componentsId,isRequired,  
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
                            defaultValue="optional"
                            // value={data.isRequired ? 'optional' : 'yes'}
                            name="radio-buttons-group"
                          >
                            {data.option.map((opt: any) => (
                              <Radio
                                onChange={(event) =>
                                  HandleRadioSelect(event, index)
                                }
                                 
                                key={opt.id}
                                name={opt.value}
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


