import React, { useState, useEffect, ChangeEvent } from "react";
import { Stack, Box, Typography, Sheet } from "@mui/joy";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import Modal from '@mui/joy/Modal';
import {FormControl, FormLabel} from "@mui/joy";
import Input from "@mui/joy/Input";
import { useTheme } from "@mui/material/styles";

import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import {  updateSubCategories } from "../../../redux/features/CategorySubSlice";
import { RootState } from "../../../redux/store";
import AppForm from "../../../components/Common/AppForm";



type SubCategory = {
  id: number
  subCategory: string
}


interface Props {
  editOpen: any
  setEditOpen: () => void
  subCategories:any
}

export function CategorySubEdit({  
  editOpen,
  setEditOpen,
  subCategories
}: Props) {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const [formData, setFormData] = useState<any>(subCategories)

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(updateSubCategories(formData))
    setEditOpen()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  

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
        <Modal
         
          open={editOpen}
          onClose={setEditOpen}
          aria-labelledby="responsive-dialog-title"
          aria-describedby="modal-desc"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',p:3 }}
          
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

          <AppForm onSubmit={handleEditButton}>
            <FormControl
              sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>Sub-Category*</FormLabel>
              <Input
                variant="outlined"
                type="text"
                id="subCategory"
                name="subCategory"
                onChange={handleChange}
                required
                sx={{ width: "70%", marginLeft: "10px" }}
                defaultValue={subCategories ? subCategories.subCategory : ''}
                // defaultValue={selectedCell !== null ? lapCat.data[selectedCell].subCategory : ""} // Set default value to the selected cell content
              />
            </FormControl>

            <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row'},
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            flexWrap:'wrap',
            mt:4
          }}
        >
            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                '&:hover': { background: '#E1A91B' },
                color: "black",
              }}
            >
              Update
            </Button>

            <Button
              type="button"
              onClick={()=>setEditOpen()}
              autoFocus
              variant="solid"
              sx={{ background: "black",
                '&:hover': { background: 'black' },
              color: "white", marginLeft: "50px" }}
            >
              Cancel
            </Button>
            </Box>
          </AppForm>
          </div>
          </Sheet>
        </Modal>

       


      </Stack>
    </>
  );
}

export default CategorySubEdit;
