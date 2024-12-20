import { Box, Button, FormControl, FormLabel, Input, Modal, Option, Radio, RadioGroup, Select, Sheet, Typography } from "@mui/joy";
import React, { ChangeEvent, useState } from "react";
import AppForm from "../../Common/AppForm";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import {fetchComponents } from "../../../redux/features/ComponentsIdSlice";
import { RootState } from "../../../redux/store";
import { addAssetCustomDatabase } from "../../../redux/features/AssetCustomDatabaseSlice";

interface DataBaseAddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddCustomAssetFields: React.FC<DataBaseAddProps> = ({ open, setOpen }) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const components = useSelector((state: RootState) => state.components.data);

  const [formData, setFormData] = useState({});


  const handleSelectChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      componentsId: newValue || "",
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(addAssetCustomDatabase(formData))
    setOpen(false);
  };


  
  React.useEffect(() => {
    dispatch(fetchComponents());
  }, [dispatch]);


  return (
    <Modal
      open={open}
      aria-labelledby="responsive-dialog-title"
      aria-describedby="modal-desc"
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 2,
          boxShadow: "lg",
        }}
      >
        <AppForm onSubmit={handleSubmit}>
          <Typography
            id="responsive-dialog-title"
            component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            my={2}
          >
            Add Custom Fields here
          </Typography>
          <FormControl>
            <FormLabel>
              Custom Field Label<span color="red">*</span>
              
            </FormLabel>
            <Input
                variant="outlined"
                type="text"
                id="custom"
                name="fieldName"
                value={formData?.fieldName}
                onChange={handleChange}
                required
              />
          </FormControl>

          <FormControl>
            <FormLabel >
              Data Types*
              
            </FormLabel>
            <Select
                placeholder="Select Data Types"
                name="componentsId"
                value={formData.componentsId}
                onChange={handleSelectChange}
              >
                {components && components.map((comp) => (
                  <Option key={comp.id} value={comp.id}>{comp.title}</Option>
                ))}
              </Select>
          </FormControl>

          <FormControl >
            <FormLabel>Data Required</FormLabel>
            <RadioGroup name="dataRequired" value={formData?.dataRequired} onChange={handleChange}>
              <Box>
                <Radio value="yes" label="Yes" variant="outlined" />
                <Radio value="optional" label="Optional" variant="outlined" />
              </Box>
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            <FormLabel>Selected Categories</FormLabel>
            <FormLabel>Is this field visible to assets of selective Categories?</FormLabel>
            <RadioGroup name="categoryId" value={formData?.selectedCategories} onChange={handleChange}>
              <Box>
                <Radio value={1} label="All Categories" variant="outlined" />
                <Radio value={2} label="Limited Categories" variant="outlined" sx={{ paddingTop: "30px", marginLeft: "20px" }} />
              </Box>
            </RadioGroup>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{ background: "#fdd835", color: "black" }}
            >
              Save
            </Button>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              autoFocus
              variant="solid"
              sx={{ background: "black", color: "white" }}
            >
              Cancel
            </Button>
          </Box>
        </AppForm>
      </Sheet>
    </Modal>
  );
};

export default React.memo(AddCustomAssetFields);
