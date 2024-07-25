import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCategory } from "../../redux/features/CategorySlice";
import AddCategory from "../Companyinfo/Category/AddCategory";
import { ThunkDispatch } from "redux-thunk";


interface CategoryProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  handleSelectChange: (
   
    value: string | null,
    name: string,
  ) => void;
}

const CategoryComponent: React.FC<CategoryProps> = (
  { field, 
    formData, 
    handleSelectChange
    }) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const categories = useSelector((state: RootState) => state.category.data)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();


  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  useEffect(()=>{
    dispatch(fetchCategory())
  },[dispatch])
const isRequiredField = field.isRequired=== 'yes'
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '300px' }}>
      <FormLabel>{field.fieldName} {isRequiredField && <span style={{ color: 'red' }}>*</span>}</FormLabel>

        <Select
         sx={{padding: '10px',}}
          placeholder="Select Category"
          name={field.name}
          value={formData['category']?.id as string}
          onChange={selectChange}
          required={isRequiredField}
        >
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.categoryName}
            </Option>
          ))}
        </Select>
        {error && <FormHelperText >{error}</FormHelperText>}
      </FormControl>

      <Button
  onClick={() => setOpen(true)}
  variant="outlined"
  size="sm"
  sx={{
    mt: 3,
    borderRadius: '15px',
    background: '#E4E4E4',
    padding: '5px 10px', // Reduce the padding to make the button smaller
    '&:hover': {
      background: '#d9d9d9',
    },
    color: '#767676',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <AddIcon sx={{ color: '#767676', mr: '5px' }} /> {/* Reduce the margin */}
  <Typography sx={{ color: '#767676', fontSize: '0.875rem' }}> {/* Adjust the font size */}
    New
  </Typography>
</Button>

      {open && (
        <AddCategory
          open={open}
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export default CategoryComponent;