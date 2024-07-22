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
import { AssetDefaultFields, dataValue } from './AssetData'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { ThunkDispatch } from 'redux-thunk'
import {
  fetchAssetDatabase,
  updateAssetDatabase,
} from '../../../../redux/features/AssetDatabaseSlice'
import { fetchAssetCustomDatabase } from '../../../../redux/features/AssetCustomDatabaseSlice'
import AddIcon from '@mui/icons-material/Add'
import AddDialogData from './AddDialogData'
import AssetDbFieldsAddingTable from './AssetDbFieldsAddingTable'

const DataBaseAsset: React.FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const assetDatabase = useSelector(
    (state: RootState) => state.assetDatabase.data,
  )
  const assetCustomDatabase = useSelector(
    (state: RootState) => state.assetCustomDatabase.data,
  )

  
  React.useEffect(() => {
    dispatch(fetchAssetDatabase())
  }, [])

  React.useEffect(() => {
    dispatch(fetchAssetCustomDatabase())
  }, [dispatch])

  const [openAddAsset, setOpenAddAsset] = useState(false)
  const [assetDataForm, setAssetDataForm] = useState(dataValue)

  useEffect(() => {
    setAssetDataForm(dataValue)
  }, [])

  React.useEffect(() => {
    if(assetDatabase.length > 0){
      setOpenAddAsset(assetDatabase[0])
    }
  }, [assetDatabase]);

  const handleCheckboxChange = (index: number) => {
    const updatedForm = [...assetDataForm]
    updatedForm[index].isVisible = !updatedForm[index].isVisible
    setAssetDataForm(updatedForm)
  }

  const handleRadioChange = (index: number, value: string) => {
    const updatedForm = [...assetDataForm]
    updatedForm[index].isRequired = value
    setAssetDataForm(updatedForm)
  }

  const handleCancel = () => {}

  const handleSubmit = () => {
    dispatch(updateAssetDatabase(assetDatabase))
    console.log(assetDataForm)
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
                    <Checkbox />
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
                {assetDataForm.map((opt, index) => {
                  const data = AssetDefaultFields.find(
                    (field) => field.fieldName === opt.fieldName,
                  )
                  if (!data) return null

                  return (
                    <tr key={`${data.fieldName}-${index}`}>
                      <td>
                        <Checkbox
                          checked={opt.isVisible || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {data.fieldName}
                      </td>
                      <td
                        style={{
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                        }}
                      >
                        {data.isVisible && (
                          <FormControl>
                            <RadioGroup
                              value={opt.isRequired ? 'yes' : 'optional'}
                              name={`radio-buttons-group-${index}`}
                              onChange={(e) =>
                                handleRadioChange(index, e.target.value)
                              }
                              sx={{ gap: 2 }}
                            >
                              <FormControl
                                key={`${index}-yes`}
                                disabled={!opt.isVisible}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                  gap: 2,
                                  // visibility: opt.fieldName === 'Full Name' ? 'visible' : 'hidden',
                                }}
                              >
                                <Radio
                                  value="yes"
                                  checked={opt.isRequired === 'yes'}
                                  onChange={(e) =>
                                    handleRadioChange(index, e.target.value)
                                  }
                                  color="primary" // Adjust color as needed
                                  sx={{ mr: 1 }}
                                />
                                Yes
                              </FormControl>
                              <FormControl
                                key={`${index}-optional`}
                                disabled={!opt.isVisible}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  flexDirection: 'row',
                                }}
                              >
                                <Radio
                                  value="optional"
                                  checked={opt.isRequired === 'optional'}
                                  onChange={(e) =>
                                    handleRadioChange(index, e.target.value)
                                  }
                                  color="primary"
                                  sx={{ mr: 1 }}
                                />
                                Optional
                              </FormControl>
                            </RadioGroup>
                          </FormControl>
                        )}
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
          <AddDialogData open={openAddAsset} setOpen={setOpenAddAsset} />
        )}

        <AssetDbFieldsAddingTable
          assetDataForm={assetCustomDatabase}
          // setCustomerDataBases={setCustomerDataBases}
        />
      </Box>

      <DatabaseButtons
        onCancel={() => handleCancel()}
        onSubmit={() => handleSubmit()}
      />
    </AppView>
  )
}

export default DataBaseAsset
