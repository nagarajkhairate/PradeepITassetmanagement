import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchSubCategories } from "../../redux/features/CategorySubSlice";
import { ThunkDispatch } from "redux-thunk";
import CategorySubAdd from "../../pages/Setup/SubCategory/CategorySubAdd";

interface SubCategoryProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
   handleSelectChange: (
    value: string | null,
    name: string,
  ) => void;
}

const SubCategoryComponent: React.FC<SubCategoryProps> = ({
  field, 
  formData, 
  handleSelectChange,
}) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const subCategories = useSelector((state: RootState) => state.subCategories.data);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();


  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  useEffect(()=>{
    dispatch(fetchSubCategories())
  },[dispatch])

  console.log(open)

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '300px' }}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Select
         sx={{padding: '10px',}}
          placeholder="Select SubCategory"
          name={field.name}
          value={formData['subCategory'] as string}
          onChange={selectChange}
        >
          {subCategories.map((subCategory: { id: number; subCategory: string }) => (
            <Option key={subCategory.id} value={subCategory.id}>
              {subCategory.subCategory}
            </Option>
          ))}
        </Select>

        {error && <FormHelperText>{error}</FormHelperText>}
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
        <CategorySubAdd
        open={open}     
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export default SubCategoryComponent;
