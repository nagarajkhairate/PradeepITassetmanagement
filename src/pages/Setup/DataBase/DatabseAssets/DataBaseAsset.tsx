import React, { useState, useEffect } from 'react';
import {
  Typography,
  Radio,
  RadioGroup,
  Divider,
  Checkbox,
  FormControl,
  Table,
  Box,
} from '@mui/joy';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AppView from '../../../../components/Common/AppView';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { FormControlLabel } from '@mui/material';

const AssetDefaultFields = [
  {
    fieldName: 'Asset Tag ID',
    name: 'assetTagId',
    isVisible: 'visible',
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
    isVisible: 'visible',
    name: 'assetDescription',
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
    isVisible: 'visible',
    name: 'purchaseDate',
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
    isVisible: 'visible',
    name: 'cost',
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
    name: 'purchasedForm',
    isVisible: 'visible',
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
    isVisible: 'visible',
    name: 'brand',
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
    isVisible: 'visible',
    name: 'model',
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
    isVisible: 'visible',
    name: 'serialOptional',
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
];

const dataValue = [
  {
    visible: true,
    fieldName: 'Asset Tag ID',
    name: 'assetId',
    description: 'string',
    isRequired: true,
  },
  {
    visible: true,
    fieldName: 'Asset Description',
    name: 'assetDec',
    description: 'string',
    isRequired: true,
  },
  {
    visible: true,
    fieldName: 'Purchase Date',
    name: 'purchasedDate',
    description: 'string',
    isRequired: false,
  },
  {
    visible: true,
    fieldName: 'Cost',
    name: 'cost',
    description: 'string',
    isRequired: false,
  },
  {
    visible: true,
    fieldName: 'Purchased From',
    name: 'purchasedForm',
    description: 'string',
    isRequired: false,
  },
  {
    visible: true,
    fieldName: 'Brand',
    name: 'brand',
    description: 'string',
    isRequired: false,
  },
  {
    visible: true,
    fieldName: 'Model',
    name: 'model',
    description: 'string',
    isRequired: false,
  },
  {
    visible: true,
    fieldName: 'Serial No',
    name: 'serialNo',
    description: 'string',
    isRequired: false,
  },
];

const DataBaseAsset: React.FunctionComponent = () => {
  const [assetDataForm, setAssetDataForm] = useState(dataValue);

  useEffect(() => {
    setAssetDataForm(dataValue);
  }, []);

  const handleCheckboxChange = (index: number) => {
    const updatedForm = [...assetDataForm];
    updatedForm[index].visible = !updatedForm[index].visible;
    setAssetDataForm(updatedForm);
  };

  const handleRadioChange = (index: number, value: string) => {
    const updatedForm = [...assetDataForm];
    updatedForm[index].isRequired = value === 'yes';
    setAssetDataForm(updatedForm);
  };

  return (
    <AppView>
      <Typography level="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SignpostOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC21E' }} />
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
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography level="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Asset Database Fields
          </Typography>
        </Box>

        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Box sx={{ mt: 3 }}>
            <Typography>
              Fill in the appropriate fields for your assets. <b>Asset Tag ID</b> and{' '}
              <b>Asset Description</b> are the only required fields. Check the boxes
              next to the field names you want to include.
            </Typography>
          </Box>

          <Box
            sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              borderRadius: '5px',
            }}
          >
            <Table
              borderAxis="both"
              aria-label="basic table"
              style={{
                borderCollapse: 'collapse',
                border: '1px solid grey',
                minWidth: '500px',
                borderRadius: '5px',
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
                  const data = AssetDefaultFields.find(field => field.fieldName === opt.fieldName);
                  if (!data) return null;

                  return (
                    <tr key={`${data.fieldName}-${index}`}>
                      <td>
                        <Checkbox
                          checked={opt.visible || false}
                          onChange={() => handleCheckboxChange(index)}
                        />
                      </td>
                      <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>
                        {data.fieldName}
                      </td>
                      <td style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
                        {data.isVisible && (
                          <FormControl>
                            <RadioGroup
                              value={opt.isRequired ? 'yes' : 'optional'}
                              name={`radio-buttons-group-${index}`}
                              onChange={(e) => handleRadioChange(index, e.target.value)}
                            >
                              <FormControlLabel
                                key={`${index}-yes`}
                                value="yes"
                                control={<Radio variant="outlined" />}
                                label="Yes"
                                checked={opt.isRequired === true}
                                disabled={!opt.visible}
                              />
                              <FormControlLabel
                                key={`${index}-optional`}
                                value="optional"
                                control={<Radio variant="outlined" />}
                                label="Optional"
                                checked={opt.isRequired === false}
                                disabled={!opt.visible}
                              />
                            </RadioGroup>
                          </FormControl>
                        )}
                      </td>
                      <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>
                        {data.description}
                      </td>
                      <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>
                        {data.example}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Divider sx={{ my: '30px' }} />
          </Box>
        </Box>

        <Typography level="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SignpostOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC21E' }} />
          Asset Custom Fields
        </Typography>
        <Box>
          Add custom fields to join the standard fields that we provided. Feel free to
          get creative.
        </Box>

        <Divider sx={{ marginTop: '3%' }} />
      </Box>
    </AppView>
  );
};

export default DataBaseAsset;
