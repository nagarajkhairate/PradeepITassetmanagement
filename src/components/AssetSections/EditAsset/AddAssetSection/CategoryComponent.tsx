import React, { useState, ChangeEvent } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addCategory } from "../../../../redux/features/CategorySlice";
import AddCategory from "../../../Companyinfo/Category/AddCategory";
import { ThunkDispatch } from "redux-thunk";


interface CategoryProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setValidationMessages: React.Dispatch<React.SetStateAction<any>>;
  handleSelectChange: (
    event: React.SyntheticEvent<Element, Event> | null,
    value: string | null,
    name: string,
  ) => void;
}

type Category = {
  id: number
  categoryName: string
}

const CategoryComponent: React.FC<CategoryProps> = (
  { field, 
    formData, 
    setFormData, 
    setValidationMessages, 
    handleSelectChange
    }) => {
  const [error, setError] = useState<string>("");
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const categories = useSelector((state: RootState) => state.category.data)
  const [categoryName, setCategoryName] = useState<string>('')
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  // const handleSelectChange = (
  //   event: React.SyntheticEvent<Element, Event> | null,
  //   newValue: any,
  //   fieldName: string
  // ) => {
  //   if (!event) return;
  //   setFormData((prevData:any) => ({
  //     ...prevData,
  //     [fieldName]: newValue,
  //   }));
  //   setValidationMessages((prevState:any) => ({ ...prevState, [fieldName]: '' }));
  // };

  const validateForm = () => {
    if (!formData.category) {
      setError("Category is required");
      return false;
    }
    setError("");
    return true;
  };
  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCategory: Category = {
      id: categories.length ? categories[categories.length - 1].id + 1 : 1,
      categoryName: capitalizeWords(categoryName),
    }
    // setCategories([...categories, newCategory])
    setCategoryName('') // Clear the input field after adding
    dispatch(addCategory(newCategory))
    console.log(newCategory)
  }
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleOpenDialog = (modalName: string) => {
    setOpenDialog(modalName);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', mt: 2 }}>
      <FormControl sx={{ width: '200px' }}>
      <FormLabel>{field.fieldName}</FormLabel>

        <Select
          placeholder="Select Category"
          name={field.name}
          value={formData[field.name] as string}
          onChange={(e, newValue) => handleSelectChange(e, newValue, field.name)}
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
        <AddCategory
          open={openDialog === field.fieldName}
          handleClose={handleCloseDialog}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          handleAddCategory={handleAddCategory}
        />
      )}
    </Box>
  );
};

export default CategoryComponent;