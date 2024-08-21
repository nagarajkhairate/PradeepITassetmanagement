import React, { useState, useEffect } from 'react'
import {
  Typography,
  Radio,
  RadioGroup,
  Divider,
  Checkbox,
  FormControl,
  Table,
  Box,
  Button,
} from '@mui/joy'
import AppView from '../../../../components/Common/AppView'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import DatabaseButtons from '../../../../components/Common/DatabaseButton'
import { AssetDefaultFields, assetValue } from './AssetData'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import {
  fetchAssetDatabase,
  updateAssetDatabase,
} from '../../../../redux/features/AssetDatabaseSlice'
import { fetchAssetCustomDatabase } from '../../../../redux/features/AssetCustomDatabaseSlice'
import AddIcon from '@mui/icons-material/Add'
import AddDialogData from './AddCustomAsset'
import AssetDbFieldsAddingTable from './AssetFieldsAddingTable'
import AddCustomAsset from './AddCustomAsset'
import AssetFieldsAddingTable from './AssetFieldsAddingTable'
import { fetchComponents } from '../../../../redux/features/ComponentsIdSlice'

const DataBaseAsset: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const assetDatabase = useSelector(
    (state: RootState) => state.assetDatabase.data,
  )
  const assetCustomDatabase = useSelector(
    (state: RootState) => state.assetCustomDatabase.data,
  )
  const components = useSelector((state: RootState) => state.components.data);

  const [openAddAsset, setOpenAddAsset] = useState(false)
  const [openAddContract, setOpenAddContract] = useState(false)
  const [contractField, setContractData] = useState<assetValue[]>([])
  const [allChecked, setAllChecked] = useState(true)
  const [indeterminate, setIndeterminate] = useState(false)

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    if (
      fieldName !== 'assetTagId' &&
      fieldName !== 'description' 
    ) {
      const updatedData = contractField.map((item) =>
        item.name === fieldName
          ? { ...item, isVisible: event.target.checked }
          : item,
      )
      setContractData(updatedData)

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
    const updatedData = contractField.map((item) => ({
      ...item,
      isVisible: checked,
    }))
    setContractData(updatedData)
    setAllChecked(checked)
    setIndeterminate(false)
  }

  const handleRadioSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    setContractData((prevState) =>
      prevState.map((item) =>
        item.name === fieldName
          ? { ...item, isRequired: event.target.value }
          : item,
      ),
    )
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    dispatch(updateAssetDatabase(contractField))
    console.log(assetDatabase)
  }

  useEffect(() => {
    dispatch(fetchAssetCustomDatabase())
  }, [])

  useEffect(() => {
    dispatch(fetchAssetDatabase())
  }, [dispatch])

  useEffect(()=>{
    dispatch(fetchComponents())
  },[dispatch])

  useEffect(() => {
    setContractData(assetDatabase)
  }, [assetDatabase])


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
        <Box sx={{ textAlign: { xs: 'center', md: 'left' },flexDirection:{md:'left', xs:'center'}, }}>
          <Typography
            level="h4"
            sx={{
              display: 'flex',
              textAlign: { xs: 'center', md: 'left' },
              justifyContent:{md:'left', xs:'center'},
              gap: 1,
            }}
          >
            Asset Database Fields
          </Typography>
        </Box>

        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Box sx={{ mt: 3 }}>
            <Typography>
              Fill in the appropriate fields for your assets.{' '}
              <b>Asset Tag ID</b> and <b>Asset Description</b> are the only
              required fields. Check the boxes next to the field names you want
              to include.
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              borderRadius: '10px',
            }}
          >
            <Table
              borderAxis="both"
              aria-label="basic table"
              style={{
                borderCollapse: 'collapse',
                border: '1px solid grey',
                minWidth: '500px',
                borderRadius: '10px',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: 40,
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
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Field Name
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Data Required
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      background: '#fff8e6',
                      verticalAlign: 'middle',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {AssetDefaultFields &&
                  AssetDefaultFields.map((data, index) => {
                    const filterData = contractField.find(
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
                          {data.fieldName === 'Asset Tag ID' ||
                          data.fieldName === 'Asset Description' ? (
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
            <Divider sx={{ my: '20px' }} />
          </Box>
        </Box>

        <Typography
          level="h4"
          sx={{ display: 'flex', alignItems: 'center',
          flexDirection:{md:'left', xs:"center"},
          justifyContent:{md:'left', xs:'center'},
           gap: 1 }}
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

        <Box
         sx={{ display: 'flex', alignItems: 'center',
          flexDirection:{md:'left', xs:"center"},
          justifyContent:{md:'left', xs:'center'},
           gap: 1 }}
        >

        <Button
          onClick={() => setOpenAddAsset(true)}
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
        </Box>

        {openAddAsset && (
          <AddCustomAsset open={openAddAsset} setOpen={setOpenAddAsset} components={components}/>
        )}

        <AssetFieldsAddingTable
          assetDataForm={assetCustomDatabase}
          components={components}
        />


<DatabaseButtons
        onCancel={() => handleCancel()}
        onSubmit={() => handleSubmit()}
      />
      </Box>
    </AppView>
  )
}

export default DataBaseAsset
