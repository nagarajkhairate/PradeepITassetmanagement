import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Sheet } from "@mui/joy";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import Modal from '@mui/joy/Modal';
import {FormControl, FormLabel} from "@mui/joy";
import Input from "@mui/joy/Input";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CategorySub from "./CategorySub";
import CategorySubDelete from "./CategorySubDelete";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubCategories, updateSubCategories } from "../../../redux/features/CategorySubSlice";
import { RootState } from "../../../redux/store";



type SubCategory = {
  id: number
  subCategory: string
}


interface Props {
  categories1: SubCategory[];
  matchedSelected: number[];
  setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteOpen: () => void;
}

export function CategorySubEdit({ categories1, 
  matchedSelected,
  setMatchedSelected,
  handleDeleteOpen,
}: Props) {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  // const [lapCat, setLapCat] = useState<{ data: SubCategory[] }>({ data: [] });
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  

  const subCategories = useSelector((state: RootState) => state.subCategories.data)
// const dispatch = useDispatch<AppDispatch>()
console.log(subCategories)
const selectedSubCategory = selectedCell !== null ? subCategories[selectedCell] : null

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
  };

  const handleClickEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCell(null);

    // console.log(JSON.stringify(editOpen))
  };

  // const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const subCategory = (e.target as any).subCategory.value;
  //   if (selectedCell !== null) {
  //     const updatedData = lapCat.data.map((item, index) =>
  //       index === selectedCell ? {...item, subCategory} : item
  //     );
  //     setLapCat({ ...lapCat, data: updatedData });
  //     handleEditClose();
  //     dispatch(updateSubCategory(updatedData))
  //     onCategoryChange(updatedData);
  //   }
  // };

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedSubCategory !== null) {
      const subCategory = (e.target as any).subCategory.value
      const updatedCategory = { ...selectedSubCategory, subCategory:capitalizeWords(subCategory) }
      dispatch(updateSubCategories(updatedCategory))
      handleEditClose()
    }
  }

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleDeleteButton = (index:number) => {
    setSelectedCell(index)
      handleDeleteOpen();
    
  };

  // const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (selectedCell !== null) {
  //     dispatch(deleteSubCategories(subCategories[selectedCell].id))
  //     setDeleteOpen(false)
  //     setSelectedCell(null)
  //     setMatchedSelected((prevSelected) =>
  //       prevSelected.filter((item) => item !== selectedCell),
  //     )
  //   }
  // }


  useEffect(() => {
    setSelectedCell(null);
  }, [subCategories]);

  const handleEdit = (index:number) => {
    setSelectedCell(index)
      handleClickEditOpen();
    
  };

  

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
              sx={{
                overflowX: 'auto',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                borderRadius:'5px'
              }}
            >
        <Table 
        // borderAxis="both" style={{ width: "100%", borderCollapse: "collapse" }}
        borderAxis="both" aria-label="basic table" 
        style={{
                  borderCollapse: 'collapse',
                  border: '1px solid grey',
                  minWidth: '500px',
                  borderRadius:'5px'
                }}
        >
          <thead>
            <tr>
              <th style={{width:30, background: '#fff8e6',verticalAlign:'middle'}}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    matchedSelected.length > 0 && matchedSelected.length < subCategories.length
                  }
                  checked={
                    matchedSelected.length > 0 && matchedSelected.length === subCategories.length
                  }
                  onChange={(event) => {
                    const isChecked = event.target.checked;
                    setMatchedSelected(
                      isChecked ? subCategories.map((_, index) => index) : []
                    );
                  }}
                  color={
                    matchedSelected.length > 0 && matchedSelected.length === subCategories.length
                      ? "primary"
                      : undefined
                  }
                  sx={{ verticalAlign: "text-bottom" }}
                />
              </th>
              <th style={{ background: '#fff8e6',verticalAlign:'middle' }}>Sub Category</th>
              <th style={{ background: '#fff8e6',verticalAlign:'middle' }}>Edit</th>
              <th style={{ background: '#fff8e6' ,verticalAlign:'middle'}}>Delete</th>
            </tr>
          </thead>
          <tbody>
              {subCategories.length > 0 ? subCategories.map((custom, index) => (
                <tr key={custom.id}>
                  <td>
                    <Checkbox
                      checked={matchedSelected.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      color="primary"
                    />
                  </td>
                  <td>{custom.subCategory}</td>

                  <td>
                    <Button onClick={()=> handleEdit(index)}
                     sx={{
                      background: "#ffffff",
                      color: "green",
                      display:'flex',
                      justifyContent:'flex-end',
                      marginLeft:'none',
                      border: "1px solid green ",
                      borderRadius: "15px",
                      "&:hover": {
                        color: "white",
                        background: "green",
                      
                      },
                    }}
                    >
                      <EditOutlinedIcon />Edit
                    </Button>
                  </td>

                  <td>  
                    <Button onClick={()=>handleDeleteButton(index)}
                     sx={{
                      background: "#ffffff",
                      color: '#d32f2f',
                      display:'flex',
                      justifyContent:'flex-end',
                      marginLeft:'none',
                      border: "1px solid red ",
                      borderRadius: "15px",
                      "&:hover": {
                        color: "white",
                        background:'#d32f2f',
                       
                      },
                    }}
                    >
                      <DeleteForeverIcon />Delete
                    </Button>
                  </td>
                </tr>
              )):<tr><td colSpan={4} style={{ textAlign: 'center'}}>Add Sub Category</td></tr>}
            
          </tbody>
        </Table>
              </Box>
        <Modal
         
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="responsive-dialog-title"
          aria-describedby="modal-desc"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          > 
          <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
              }}
            >
        
          <div>
          <Typography id="responsive-dialog-title"  component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>{"Edit the Customs here"}</Typography>

          <form onSubmit={handleEditButton}>
            <FormControl
              sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>Category*</FormLabel>
              <Input
                variant="outlined"
                type="text"
                id="subCategory"
                name="subCategory"
                required
                sx={{ width: "70%", marginLeft: "10px" }}
                defaultValue={selectedSubCategory ? selectedSubCategory.subCategory : ''}
                // defaultValue={selectedCell !== null ? lapCat.data[selectedCell].subCategory : ""} // Set default value to the selected cell content
              />
            </FormControl>
            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "30%",
              }}
            >
              Update
            </Button>

            <Button
              type="button"
              onClick={handleEditClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginLeft: "50px" }}
            >
              Cancel
            </Button>
          </form>
          </div>
          </Sheet>
        </Modal>

        {/* <Modal
          
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="responsive-dialog-title"
          
          aria-describedby="modal-desc"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          > 
          <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
              }}
            >
        
          <div>
          <Typography id="responsive-dialog-title" component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>{"Delete Customs here"}</Typography>

          <form onSubmit={handleDeleteSubmit}>
            <FormControl sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
              <Box sx={{ marginBottom: "20px", padding: "20px" }}>Are you sure you want to delete this Category?</Box>
            </FormControl>
            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "40%",
              }}
            >
              Confirm Delete
            </Button>

            <Button
              type="button"
              onClick={handleDeleteClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginTop: "25px", marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </form>
          </div>
          </Sheet>
        </Modal> */}


      </Stack>
    </>
  );
}

export default CategorySubEdit;
