import { Typography, Radio, RadioGroup } from '@mui/joy'
import React, { useState } from 'react'
import { Box } from '@mui/joy'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import Button from '@mui/joy/Button'
import { FormControl } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'


const customDefaultFields = [
  {
    id: 1,
    visible: true,
    fieldName: 'Asset Tag ID',
    isRequired: true,
    description: 'This field holds the unique asset id.',
    example: 'A-1001',
    name: 'assetId',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
    ],
  },
  {
    id: 2,
    visible: true,
    fieldName: 'Asset Description',
    isRequired: true,
    description: 'Description of the asset.',
    example: 'HP - Envy Desktop',
    name: 'assetDec',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
    ],
  },
  {
    id: 3,
    visible: true,
    fieldName: 'Purchase Date',
    isRequired: true,
    description: 'Date asset was purchased',
    example: '08/22/2014',
    name: 'purchasedDate',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
      {
        id: 2,
        value: false,
         title: 'No'
      },
    ],
  },
  {
    id: 4,
    visible: true,
    fieldName: 'Cost',
    isRequired: true,
    description: 'Cost of the asset',
    example: 'Bs225.75',
    name: 'cost',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
      {
        id: 2,
        value: false,
         title: 'No'
      },
    ],
  },
  {
    id: 5,
    visible: true,
    fieldName: 'Purchased From',
    isRequired: true,
    description: 'Vendor/Supplier name',
    example: 'Amazon',
    name: 'purchasedForm',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
      {
        id: 2,
        value: false,
         title: 'No'
      },
    ],
  },
  {
    id: 6,
    visible: true,
    fieldName: 'Brand',
    isRequired: true,
    description: 'Manufacturer of the asset',
    example: 'HP',
    name: 'brand',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
      {
        id: 2,
        value: false,
         title: 'No'
      },
    ],
  },
  {
    id: 7,
    visible: true,
    fieldName: 'Model',
    isRequired: '',
    description: 'Model name of the asset',
    example: 'Envy',
    name: 'model',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
      {
        id: 2,
        value: false,
         title: 'No'
      },
    ],
  },
  {
    id: 8,
    visible: true,
    fieldName: 'Serial No',
    isRequired: true,
    description: "Manufacturer's serial number",
    example: 'HG9C3X',
    name: 'serialNo',
    option: [
      {
        id: 1,
        value: true,
        title: 'Yes'
      },
      {
        id: 2,
        value: false,
         title: 'No'
      },
    ],
  },
]

interface DataBaseProps {
  companyFormData: any
  setCompanyFormData: any
  activeTab: number
  setActiveTab: (tab: number) => void
}

const DataBases: React.FunctionComponent<DataBaseProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {

  const [dataBaseForm, setDataBaseForm] = useState(
    customDefaultFields.reduce((acc: any, field) => {
      acc[field.name] = {
        visible: field.visible,
        fieldName: field.fieldName,
        name: field.name,
        description: "string",
        isRequired: field.isRequired,
      }
      return acc
    }, {}),
  )


  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { checked } = event.target
    const fieldName = customDefaultFields[index].name
    setDataBaseForm((prevData: any) => ({
      ...prevData,
      [fieldName]: {
        ...prevData[fieldName],
        visible: checked,
      },
    }))
  }

  const HandleRadioSelect = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target
    const fieldName = customDefaultFields[index].name
    setDataBaseForm((prevData: any) => ({
      ...prevData,
      [fieldName]: {
        ...prevData[fieldName],
        isRequired: value,
      },
    }))
  }

  const handleNext = () => {
    setCompanyFormData((prevData: any) => ({
      ...prevData,
      dataBase: Object.values(dataBaseForm),
    }))
    setActiveTab((prevActiveStep: any) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveTab((prevActiveStep: any) => prevActiveStep - 1)
  }

  return (
    <AppView>
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
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '30px',
              textAlign: { xs: 'center', md: 'left' },
              whiteSpace: 'nowrap',
              gap: 1,
            }}
          >
            <TuneOutlinedIcon
              sx={{
                fontSize: '1.1rem',
                color: '#FABC1E',
                alignItems: 'center',
              }}
            />
            Asset Database Fields
          </Typography>
        </Box>

        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ mt: 2 }}>
            <Typography>
              Fill in the appropriate fields for your assets. Asset Tag ID and
              Asset Description are the only required fields. Check the boxes
              next to the field names you want to include.
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          >
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
                    Date Required
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
                {customDefaultFields.map((data, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        checked={dataBaseForm[data.name].visible}
                        onChange={(event) => handleCheckboxChange(event, index)}
                      />
                    </td>
                    <td>{data.fieldName}</td>
                    <td>
                      {data.visible && (
                        <FormControl>
                          <RadioGroup
                            defaultValue="outlined"
                            name="radio-buttons-group"
                          >
                            {data.option.map((opt: any) => (
                              <Radio
                                name={data.name}
                                defaultValue={data.isRequired}
                                onChange={(event) =>
                                  HandleRadioSelect(event, index)
                                }
                                key={opt.id}
                                value={opt.value}
                                label={opt.title}
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
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          sx={{
            background: '#388e3c',
            color: 'white',
            '&:hover': { background: '#388e3B' },
            borderRadius: '10px',
          }}
          disabled={activeTab === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            background: '#FABC1E',
            color: 'black',
            '&:hover': { background: '#E1A91B' },
            borderRadius: '10px',
          }}
          onClick={handleNext}
        >
          Continue
        </Button>
      </Box>
      </Box>
      
    </AppView>
  )
}

export default DataBases
