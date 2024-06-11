import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Input,
  Select,
  Option,
  Button
} from "@mui/joy";
import { formConfig, FormFieldConfig } from "./formConfig";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AppView from "../../components/Common/AppView";
import { RootState } from "../../Redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import CategoryDialog from "../../components/AssetSections/EditAsset/AddAssetSection/CategoryDialog";
import SiteDialog from "../../components/AssetSections/EditAsset/AddAssetSection/SiteDialog";
import LocationDialog from "../../components/AssetSections/EditAsset/AddAssetSection/LocationDialog";
import DepartmentDialog from "../../components/AssetSections/EditAsset/AddAssetSection/DepartmentDialog";


const data =[{
  "id": "9",
  "asset_name": "MAcbook Air",
  "asset_tag_id": "Mac1001",
  "site": "Indore",
  "description": "Macbook Air M1",
  "purchase_from": "Bangalore",
  "purchase_date": "2024-05-28",
  "brand": "Apple",
  "cost": "100000.00",
  "model": "Air M1",
  "serial_number": "1234567890asdf",
  "status": "Available",
  "category": "Laptop",
  "location": "Indore",
  "department": "Supplier A",
  "asset_photo": "/asset_photos/2.jpeg",
}]

interface FormData {
  [key: string]: string | File[];
}

interface ValidationMessages {
  [key: string]: string;
}

const AddAnAsset: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  // Initialize state dynamically based on formConfig
  const initialFormData = formConfig.reduce<FormData>((acc, field) => {
    acc[field.stateKey] = data[0][field.stateKey] || "";
    return acc;
  }, {});
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [validationMessages, setValidationMessages] = useState<ValidationMessages>({});
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    stateKey: string
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [stateKey]: value,
    }));
    setValidationMessages((prevState) => ({ ...prevState, [stateKey]: "" }));
  };

  const handleSelectChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: any,
    stateKey: string
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [stateKey]: newValue,
    }));
    setValidationMessages((prevState) => ({ ...prevState, [stateKey]: "" }));

  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file =>
        ["image/jpeg", "image/png", "image/gif"].includes(file.type)
      );

      const fileURLs = validFiles.map(file => URL.createObjectURL(file));

      setFormData((prevData) => ({
        ...prevData,
        asset_photo: [...(prevData.asset_photo as File[]), ...validFiles],
      }));
      setPhotoPreviews((prevPreviews) => [...prevPreviews, ...fileURLs]);
      setValidationMessages((prevState) => ({ ...prevState, asset_photo: "" }));
    }
  };

  const handleDeletePhoto = (index: number) => {
    setFormData((prevData) => {
      const updatedFiles = [...(prevData.asset_photo as File[])];
      updatedFiles.splice(index, 1);
      return { ...prevData, asset_photo: updatedFiles };
    });
    setPhotoPreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  const handleOpenDialog = (dialogName: string) => {
    setOpenDialog(dialogName);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleSubmit = async () => {
    // Perform validation
    const newValidationMessages: ValidationMessages = {};
    formConfig.forEach((field) => {
      if (!formData[field.stateKey]) {
        newValidationMessages[field.validationMessageKey] = `${field.label} is required`;
      }
    });

    if (Object.keys(newValidationMessages).length > 0) {
      setValidationMessages(newValidationMessages);
      return;
    }

    // Create JSON object from form data
    const jsonData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] instanceof File) {
        acc[key] = (formData[key] as File[]).map(file => file.name); // or handle file differently if needed
      } else {
        acc[key] = formData[key] as string;
      }
      return acc;
    }, {} as { [key: string]: string | string[] });

    console.log("Form Data JSON:", jsonData);

    try {
      // await dispatch(reducerone(formData));
      console.log("Form submitted successfully");
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }

  };

  return (
    <AppView >
      <div>
        <Typography level="h3" sx={{ml:"52px"}}>Add An Asset</Typography>
      </div>
      <Box
        sx={{
          borderRadius: 'none',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
        }}
      >
        <Box sx={{ paddingBottom: "30px" }}>
          <Box>
            <Grid container spacing={1} sx={{ padding: "20px",
             display:"flex",flexDirection: { xs: "column", md: "row" },}} >
              <Grid xs={12}>
                <Typography
                  sx={{ fontWeight: "bold", mb: 0, paddingLeft: "32px" }}
                >
                  Assets Details
                </Typography>
              </Grid>
              {formConfig.slice(0,10).map((field: FormFieldConfig) => (
                <Grid key={field.label} sx={{ paddingLeft: "32px", }}  xs={12}
                md={field.stateKey === "description" ? 12 : (field.stateKey === "asset_name" || field.stateKey === "asset_tag_id") ? 6 : 4} 
                >
                  <Typography
                    level="body-xs"
                    sx={{ color: "#767676", mt: "8px", mb: "5px" }}
                  >
                    {field.label}
                  </Typography>
                  {field.type === "select" ? (
                    <Select 
                    value={formData[field.stateKey] as string}
                    onChange={(e, newValue) => handleSelectChange(e, newValue, field.stateKey)}
                    sx={field.sx}
                    >
                      {field.options?.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      value={formData[field.stateKey] as string}
                      onChange={(e) => handleInputChange(e, field.stateKey)}
                      {...field}
                      sx={field.sx}
                      />
                    )}

                  {validationMessages[field.validationMessageKey] && (
                    <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                      {validationMessages[field.validationMessageKey]}
                    </Typography>
                  )}
                </Grid>     
                ))}
            </Grid>
            <Box>
            <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 0,
                  paddingLeft: "48px",
                  paddingTop: "15px",
                }}
              >
                Site, Location, Category and Department
              </Typography>
              </Box>
              <Box>
                <Grid container spacing={1} sx={{ padding: "20px",display:"flex",flexDirection: { xs: "column", md: "row" }, }}>
                  {formConfig.slice(10,14).map((field)=>(
                    <Grid key={field.label } sx={{ paddingLeft: "32px",paddingBottom:"20px" }}>

                      <Typography
                    level="body-xs"
                    sx={{ color: "#767676", mt: "8px", mb: "5px" }}
                  >
                    {field.label}
                  </Typography>
                  <Grid container spacing={1} >

                  <Select
                      value={formData[field.stateKey] as string}
                      onChange={(e, newValue) => handleSelectChange(e, newValue, field.stateKey)}
                      sx={field.sx}
                      >
                      {field.options?.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>

                  <Button
                      sx={{
                        ml:{md:4,xs:"0"},
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#d9d9d9",
                        },
                        color: "#767676",
                        mt:{xs:"10px",md:"0"}
                      }}
                      onClick={() => handleOpenDialog(field.stateKey)}

                      >
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        <AddIcon />
                      </Typography>
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        New
                      </Typography>
                    </Button>

                      </Grid>
                      {validationMessages[field.validationMessageKey] && (
                        <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                      {validationMessages[field.validationMessageKey]}
                    </Typography>
                  )}
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box sx={{ paddingLeft: "48px", mb: "30px", mt: "20px" }}>
              <Typography sx={{ fontWeight: "bold" }}>Assets Photo</Typography>
            </Box>
            <Box
              sx={{
                height:"170px",
                borderRadius: "10px",
                border: "2px dashed #D3D3D3",
                lineHeight: "1.5px",
                mx: "48px",
                background: "#FBFBFB",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
                padding: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <Box
                  sx={{
                    height: "55px",
                    width: "55px",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#13B457",
                    color: "white",
                  }}
                >
                  <Button
                    onClick={() => document.getElementById("fileInput")?.click()}
                    sx={{
                      borderRadius: "10px",
                      border: "none",
                      background: "none",
                      "&:hover": {
                        background: "#13B457",
                      },
                    }}
                  >
                    <CloudUploadIcon size={23} />
                  </Button>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    multiple
                    accept=".jpg,.jpeg,.png,.gif"
                  />
                </Box>
              </Box>
              {photoPreviews.length > 0 ? (
                <Grid container spacing={2}>
                  {photoPreviews.map((preview, index) => (
                    <Grid  key={index}>
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          borderRadius: "10px",
                          overflow: "hidden",
                          border: "1px solid #ccc",
                        }}
                      >
                        <img
                          src={preview}
                          alt={`Asset Preview ${index + 1}`}
                          style={{ height: "100px", width: "auto" }}
                        />
                        <Button
                          onClick={() => handleDeletePhoto(index)}
                          sx={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "50%",
                            width: "25px",
                            height: "25px",
                            minWidth: "25px",
                            padding: 0,
                          }}
                        >
                          <DeleteIcon color="#d9534f" />
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography level="body-xs">Only (JPG, GIF, PNG) Allowed</Typography>
              )}
              {validationMessages.asset_photo && (
                <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                  {validationMessages.asset_photo}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "flex-end",
                gap: "15px",
                mx: "35px",
                mt: "40px",
              }}
            >
              <Button
                size="lg"
                onClick={handleSubmit}
                sx={{
                  color: "#000000",
                  borderRadius: "15px",
                  padding: "18px 70px",
                  background: "#FABC1E",
                  "&:hover": {
                    background: "#e0a71b",
                  },
                }}
              >
                Save
              </Button>
              <Button
                size="lg"
                // onClick={handleCancel}
                sx={{
                  borderRadius: "15px",
                  padding: "18px 70px",
                  background: "#000000",
                  "&:hover": {
                    background: "#333333",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <SiteDialog open={openDialog === 'site'} onClose={handleCloseDialog}/>
      <CategoryDialog open={openDialog === 'category'} onClose={handleCloseDialog}/>
      <LocationDialog open={openDialog === 'location'} onClose={handleCloseDialog}/>
      <DepartmentDialog open={openDialog === 'department'} onClose={handleCloseDialog}/>
    </AppView>
  );
};

export default AddAnAsset;
