import React, { useState, useEffect, FunctionComponent } from 'react';
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

import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined';
import { FormControlLabel } from '@mui/material';
import {
  AssetDataValue,
  AssetDefaultDataValue,
  assetDefaultFields,
} from './DatabaseData';
import AppView from '../../Common/AppView';

interface DataBaseProps {
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const DataBaseAsset: FunctionComponent<DataBaseProps> = () => {
  const [assetDataForm, setAssetDataForm] = useState<AssetDataValue[]>([]);

  useEffect(() => {
    setAssetDataForm(AssetDefaultDataValue);
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {

    if(fieldName !=='assetName' && fieldName !=='assetTagId' && fieldName !=='assetDescription')
    setAssetDataForm(prevState =>
      prevState.map(item =>
        item.name === fieldName ? { ...item, isVisible: event.target.checked } : item
      )
    );
  };

  const handleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setAssetDataForm(prevState =>
      prevState.map(item =>
        item.name === fieldName ? { ...item, isRequired: event.target.value } : item
      )
    );
  };

  console.log(JSON.stringify(assetDataForm))

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
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            level="h4"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
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
              borderRadius: '5px',
            }}
          >
            <Table
              borderAxis="both"
              aria-label="basic table"
            >
              <thead>
                <tr>
                  <th>
                    <Checkbox />
                  </th>
                  <th>Field Name</th>
                  <th>Data Required</th>
                  <th>Description</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {assetDefaultFields &&
                  assetDefaultFields.map((data, index) => {
                    const filterData = assetDataForm.find(
                      (opt: any) => opt.name === data.name,
                    );
                    return (
                      <tr key={`${data.fieldName}-${filterData?.id}`}>
                        <td>
                          <Checkbox
                            checked={filterData?.isVisible || false}
                            onChange={(e) => handleCheckboxChange(e, data.name)}
                          />
                        </td>
                        <td>
                          {data.fieldName}
                        </td>
                        <td>
                          {filterData?.isVisible && (
                            <FormControl>
                              <RadioGroup
                                name={`radio-buttons-group-${index}-${data.name}`}
                                onChange={(e) => handleRadioSelect(e, data.name)}  
                              >
                                {data.option && data.option.map((list, idx) => (
                                  <FormControlLabel
                                    key={idx}
                                    value={list.value}
                                    control={<Radio variant="outlined" />}
                                    label={list.label}
                                    checked={filterData?.isRequired === list.value}
                                  />
                                ))}
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
                    );
                  })}
              </tbody>
            </Table>
            <Divider />
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
      </Box>
    </AppView>
  );
};

export default DataBaseAsset;
