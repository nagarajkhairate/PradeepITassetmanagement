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
import AppView from '../../../../components/Common/AppView';
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import { FormControlLabel } from '@mui/material';
import DatabaseButtons from '../../../../components/Common/DatabaseButton';
import { AssetDefaultFields, dataValue } from './Data';

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

  const handleCancel=()=>{}

  const handleSubmit=()=>{
    console.log(assetDataForm);
  }

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

      <DatabaseButtons onCancel={() => handleCancel()} onSubmit={() =>handleSubmit()} />
    </AppView>
  );
};

export default DataBaseAsset;
