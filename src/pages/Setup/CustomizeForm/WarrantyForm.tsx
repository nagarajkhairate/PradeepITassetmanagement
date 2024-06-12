import React, { useState, FormEvent } from 'react';
import DragDrop from './DragDrop/DragDrop';
import AppForm from '../../../components/Common/AppForm';
import AppButton from '../../../components/Common/AppButton';
import GroupIcon from '@mui/icons-material/Group';
import { Box, Typography } from '@mui/joy';
import { DummyData, FormData } from './Data';

const WarrantyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>(DummyData);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Box component="section">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <GroupIcon />
        <Typography level="h4">Customize Warranty Form</Typography>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <AppForm onSubmit={handleSubmit}>
          <Typography
            level="body-xs"
            sx={{ color: '#767676', m: '8px', mb: '5px' }}
          >
            AssetTiger allows you to customize the way your data should be shown and
            entered for an individual person/employee. You can move fields to place
            more important items at the top for easy reading.
          </Typography>
          <DragDrop formData={formData} setFormData={setFormData} />
          <AppButton type="submit">Save</AppButton>
        </AppForm>
      </Box>
    </Box>
  );
};

export default WarrantyForm;