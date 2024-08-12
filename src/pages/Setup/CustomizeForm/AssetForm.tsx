import React, { useState, FormEvent, Fragment, useEffect } from 'react';
import AppForm from '../../../components/Common/AppForm';
import AppButton from '../../../components/Common/AppButton';
import GroupIcon from '@mui/icons-material/Group';
import { Box, Button, Typography } from '@mui/joy';
import { DummyData, FormData } from './Data';
import AssetDragDrop from './DragDrop/AssetDragDrop';
import AddCategory from '../../../components/Category/AddCategory';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssetsDefaultFields } from '../../../redux/features/AssetSlice';

const AssetForm: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const assetsDefaultField = useSelector(
    (state: RootState) => state.assetsDefaultField.data,
  )

  useEffect(() => {
    dispatch(fetchAssetsDefaultFields())
  }, [dispatch])

  const [open, setOpen] = useState<any>(false);
  const [formData, setFormData] = useState<FormData[]>([]);


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <Box component="section">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <GroupIcon />
        <Typography level="h4">Customize Asset Form</Typography>
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
          <AssetDragDrop formData={formData} setFormData={setFormData} />
          <Button onClick={() => setOpen(true)}>Add Group</Button>
          {open && <Fragment>
            <AddCategory open={open} setOpen={setOpen} />
          </Fragment>}
          <AppButton type="submit">Save</AppButton>
        </AppForm>
      </Box>
    </Box>
  );
};

export default AssetForm;