import React, { useState, useEffect, ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addSubCategories, fetchSubCategories } from "../../../../redux/features/CategorySubSlice";
import { ThunkDispatch } from "redux-thunk";
import CategorySubAdd from "../../../../pages/Setup/SubCategory/CategorySubAdd";

interface SubCategoryProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  mode: string;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setValidationMessages: React.Dispatch<React.SetStateAction<any>>;
}

const SubCategoryComponent: React.FC<SubCategoryProps> = ({
  field, 
  formData, 
  setFormData, 
  setValidationMessages, 
  mode 
}) => {
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const subCategories = useSelector((state: RootState) => state.subCategories.data);
  const [subCategory, setSubCategory] = useState<string>("");
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  type SubCategory = {
    id: number
    subCategory: string
  }

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCategory: SubCategory = {
      id: subCategories.length ? subCategories[subCategories.length - 1].id + 1 : 1,
      subCategory: capitalizeWords(subCategory),
    }
    // setCategories([...categories, newCategory])
    dispatch(addSubCategories(newCategory))
    setSubCategory('') // Clear the input field after adding
    // handleClose()
  }

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }
  const validateForm = () => {
    if (!formData.subCategory) {
      setError("SubCategory is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: any,
    fieldName: string
  ) => {
    if (!event) return;
    setFormData((prevData:any) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
    setValidationMessages((prevState:any) => ({ ...prevState, [fieldName]: '' }));
  };

  const handleOpenDialog = (modalName: string) => {
    setOpenDialog(modalName);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleAddSubCategory = (newSubCategory: { id: string; subCategoryName: string }) => {
    dispatch(addSubCategories(newSubCategory))
      .unwrap()
      .then(() => {
        dispatch(fetchSubCategories()); 
      })
      .catch((error) => {
        console.error('Failed to add subcategory:', error);
      });
    handleCloseDialog();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '200px' }}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Select
          placeholder="Select SubCategory"
          value={formData[field.name] || ''}
          onChange={(e, newValue) => handleSelectChange(e, newValue, field.name)}
        >
          {subCategories.map((subCategory) => (
            <Option key={subCategory.id} value={subCategory.id}>
              {subCategory.subCategory}
            </Option>
          ))}
        </Select>

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>

      <Button
         onClick={() => handleOpenDialog(field.fieldName)}
        variant="outlined"
        size="sm"
        sx={{
          width: '187px',
          fontSize: '20px',
          borderRadius: '15px',
          background: '#E4E4E4',
          '&:hover': {
            background: '#d9d9d9',
          },
          color: '#767676',
        }}
      >
        <Typography sx={{ mr: '25px', color: '#767676' }}>
          <AddIcon />
        </Typography>
        <Typography sx={{ mr: '25px', color: '#767676' }}>
          New
        </Typography>
      </Button>

      {openDialog === field.fieldName && (
        <CategorySubAdd
        open={openDialog === field.fieldName}
          handleClose={handleCloseDialog}       
          setOpen={setOpen}
        />
      )}
    </Box>
  );
};

export default SubCategoryComponent;
