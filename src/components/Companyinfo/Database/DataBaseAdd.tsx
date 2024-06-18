import React, { ChangeEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Typography,
} from "@mui/joy";

interface DataAddProps {
  dataBase: { data: string[] };
  setDataBase: React.Dispatch<React.SetStateAction<{ data: string[] }>>;
  addCustomField: (custom: string) => void;
  deleteCustomField: (index: number) => void;
  id:number
}

const DataBaseAdd: React.FC<DataAddProps> = ({
  dataBase,
  setDataBase,
  addCustomField,
  deleteCustomField,
}: DataAddProps) => {
  const [open, setOpen] = useState(false);
  
  const [formData, setFormData] = useState({
  
    custom: "",
    dataType: "",
    selectedCategories: "",
    dataRequired: '',
    
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addCustomField(formData);
    setDataBase((prevData:any) => ({
      ...prevData,
      data: [
        ...prevData.data,
        {
          fieldName: formData.custom,
          dataType: formData.dataType,
          category: formData.selectedCategories,
          required: formData.dataRequired,
        },
      ],
    }));
    handleClose();
    setFormData({
      custom: "",
      dataType: "",
      dataRequired: '',
      selectedCategories: "",
    });
  };

 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target;
    // const val =  value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setFormData((prevData) => ({ ...prevData, dataType: newValue || "" }));
  };

  // const [showDepreciationOptions, setShowDepreciationOptions] =useState<boolean>(false);
  // const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setShowDepreciationOptions(value === "Yes");
  //   // setCompanyFormData((prevState: any) => ({ ...prevState, assetDepreciation: value }));
  // };

  // console.log(JSON.stringify(formData))
  // console.log("tableAdd:", formData); 

  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: { md: 'row', xs: 'column' },
      justifyContent: { xs: 'center', md: 'space-between' },
      gap: '5px',
    }}
          >
          <Button
            onClick={handleClickOpen}
            sx={{
              marginTop: "25px",
              background: "green",
              color: "white",
              borderRadius:'15px',
            }}
          >
            <AddIcon />
            Add Custom Fields
          </Button>

          <Modal
            aria-labelledby="responsive-dialog-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={handleClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
              }}
            >
              <div>
                <Typography
                  id="responsive-dialog-title"
                  component="h2"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                  mb={1}
                >
                  {"Add Custom Fields here"}
                </Typography>

                <form onSubmit={handleAddSkill}>
                  <FormControl>
                    <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>
                      Custom Field Label*
                      <Input
                        variant="outlined"
                        type="text"
                        id="custom"
                        name="custom"
                        value={formData.custom}
                        onChange={handleChange}
                        required
                        sx={{ width: "43%", marginLeft: "10px" }}
                      />
                    </FormLabel>
                  </FormControl>

                  <FormControl>
                    <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>
                      Data Types*
                      <Select
                        placeholder="Select Data Types"
                        sx={{ width: "50%", marginLeft: "60px" }}
                        name="dataType"
                        value={formData.dataType}
                        onChange={handleSelectChange}
                      >
                        <Option value="checkbox List">Checkbox List</Option>
                        <Option value="Currency">Currency</Option>
                        <Option value="Date">Date</Option>
                        <Option value="Memo">Memo</Option>
                        <Option value="Email">Email</Option>
                      </Select>
                    </FormLabel>
                  </FormControl>

                  <FormControl
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>
                      Data Required
                    </FormLabel>
                    <RadioGroup name="dataRequired" 
                    value={formData.dataRequired.toString()} onChange={handleChange}>
                      <Box>
                        <Radio
                          value="yes"
                          label="Yes"
                          variant="outlined"
                          sx={{ paddingTop: "30px", marginLeft: "50px" }}
                        />
                        <Radio
                          value="optional"
                          label="Optional"
                          variant="outlined"
                          sx={{ paddingTop: "30px", marginLeft: "10px" }}
                          
                        />
                      </Box>
                    </RadioGroup>
                  </FormControl>

                   <Box>
                          <FormLabel sx={{ paddingTop: "40px", marginLeft: "20px" }}> Selected Categories</FormLabel>
                          <FormLabel sx={{ marginLeft: "165px", paddingBottom:'30px' }}> Is this field visible to assets of selective 'Categories'?</FormLabel>
                          <RadioGroup
                           name="selectedCategories" value={formData.selectedCategories.toString()}
                          
                          onChange={handleChange}
                        >
                          <Box>
                            <Radio
                              value="All Categories"
                              label="All Categories"
                              variant="outlined"
                              sx={{ paddingTop: "20px", marginLeft: "160px" }}
                            />
                            <Radio value="Limited Categories" label="Limited Categories" variant="outlined" sx={{ paddingTop: "30px", marginLeft: "20px" }}/>
                           
                          </Box>
                          </RadioGroup>
                        </Box>

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
                    Save
                  </Button>

                  <Button
                    type="button"
                    onClick={handleClose}
                    autoFocus
                    variant="solid"
                    sx={{ background: "black", color: "white", marginLeft: "25px" }}
                  >
                    Cancel
                  </Button>
                </form>
              </div>
            </Sheet>
          </Modal>
          </Box>
 
  );
};

export default DataBaseAdd;
