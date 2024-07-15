import { Box, Button, FormControl, FormLabel, Input, Modal, Option, Radio, RadioGroup, Select, Sheet, Typography } from "@mui/joy";
import React, { ChangeEvent, useEffect, useState } from "react";
import AppForm from "../../Common/AppForm";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchComponents } from "../../../redux/features/ComponentsIdSlice";
import { RootState } from "../../../redux/store";

interface DataBaseAddProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedItem: any;
}

const EditCustomAssetField: React.FC<DataBaseAddProps> = ({ open, setOpen, selectedItem }) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const components = useSelector((state: RootState) => state.components.data);
  const [formData, setFormData] = useState({});

useEffect(()=>{
    if(setFormData)
    setFormData(setFormData)
},[selectedItem])

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            Edit Custom Fields here
          </Typography>
          <FormControl>
            <FormLabel>
              Custom Field Label<span color="red">*</span>
              
            </FormLabel>
            <Input
                variant="outlined"
                type="text"
                id="custom"
                name="custom"
                // value={formData.custom}
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
                // value={formData.componentsId}
                onChange={handleSelectChange}
              >
                {components && components.map((comp) => (
                  <Option key={comp.id} value={comp.id}>{comp.compName}</Option>
                ))}
              </Select>
          </FormControl>

          <FormControl >
            <FormLabel>Data Required</FormLabel>
            <RadioGroup name="dataRequired" value={formData} onChange={handleChange}>
              <Box>
                <Radio value="yes" label="Yes" variant="outlined" />
                <Radio value="optional" label="Optional" variant="outlined" />
              </Box>
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            <FormLabel>Selected Categories</FormLabel>
            <FormLabel>Is this field visible to assets of selective Categories?</FormLabel>
            <RadioGroup name="selectedCategories" value={formData} onChange={handleChange}>
              <Box>
                <Radio value="All Categories" label="All Categories" variant="outlined" />
                <Radio value="Limited Categories" label="Limited Categories" variant="outlined" sx={{ paddingTop: "30px", marginLeft: "20px" }} />
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

export default React.memo(EditCustomAssetField);
