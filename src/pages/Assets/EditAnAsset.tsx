import React, { useEffect, useState } from "react";
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
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
// import CategoryDialog from "../../components/AssetSections/EditAsset/AddAssetSection/CategoryDialog";
// // import SiteDialog from "../../components/AssetSections/EditAsset/AddAssetSection/SiteDialog";
// // import LocationDialog from "../../components/AssetSections/EditAsset/AddAssetSection/LocationDialog";
// import DepartmentDialog from "../../components/AssetSections/EditAsset/AddAssetSection/DepartmentDialog";
import { RootState } from "../../redux/store";
import { fetchAssetsById, updateAssets } from "../../redux/features/AssetSlice";
import { fetchSites } from "../../redux/features/SitesSlice";
import { fetchLocation } from "../../redux/features/LocationSlice";
import { addDepartment, fetchDepartment } from "../../redux/features/DepartmentSlice";
import { addCategory, fetchCategory } from "../../redux/features/CategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import AddSite from "../Setup/SetupSites/AddSite";
import AddCategory from "../../components/Category/AddCategory";
import { AddLocation } from "@mui/icons-material";
import SetupAddDept from "../Setup/Departments/SetupAddDept";
import AppForm from "../../components/Common/AppForm";

// // interface EditAnAssetProps {
// //   id: string;
// //   assets: any;
// }

type Category = {
  id: number
  categoryName: string
}

type Department = {
  id: number
  departmentName: string
}

interface Site {
  siteName: string
  description: string
  address: string
  aptSuite: string
  city: string
  state: string
  zipCode: number
  country: string
}


interface ValidationMessages {
  [key: string]: string;
}

const EditAnAsset: React.FC = ()=> {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
      const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
      const assets = useSelector((state: RootState) =>
        state.assets.data.find((asset: any) => asset.id.toString() === id),
      ) as any
  const asset = useSelector((state: RootState) => state.assets.data.find(a => a.id === id));
  const departments = useSelector((state: RootState) => state.departments.data);
  const categories = useSelector((state: RootState) => state.category.data);
  const sites = useSelector((state: RootState) => state.sites.data);
  const locations = useSelector((state: RootState) => state.location.data);

  const initialFormData = formConfig.reduce<Record<string, any>>((acc, assets) => {
      acc[assets.stateKey] = assets.type === 'file' ? [] : '';
      return acc;
  }, {});
  const [open, setOpen] = useState<boolean>(false)
  const [formData, setFormData] = useState(initialFormData);
  const [validationMessages, setValidationMessages] = useState<ValidationMessages>({});
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [departmentName, setDepartmentName] = useState<string>('');
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchAssetsById(id));
    } else {
      console.log('Asset ID is undefined');
    }
  }, [id]);

  // console.log('Asset ID:', id);
useEffect(() => {

  dispatch(fetchSites());
  dispatch(fetchLocation());
  dispatch(fetchDepartment());
  dispatch(fetchCategory());
}, [dispatch]);

useEffect(() => {
  if (assets) {
    setFormData({ ...assets });
  }
}, [assets]);



const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
  setFormData({ ...formData, [key]: e.target.value });
};


const handleSelectChange = (e: any, newValue: any, key: string) => {
  setFormData({ ...formData, [key]: newValue });
};

  const dynamicFormConfig = formConfig.map(assets => {
    if (assets.stateKey === 'siteId') {
      return {
        ...assets,
        options: sites.map(site => ({ value: site.id, label: site.siteName })),
      };
    }
    if (assets.stateKey === 'locationId') {
      return {
        ...assets,
        options: locations.map(location => ({ value: location.id, label: location.location })),
      };
    }
    if (assets.stateKey === 'departmentId') {
      return {
        ...assets,
        options: departments.map(department => ({ value: department.id, label: department.departmentName })),
      };
    }
    if (assets.stateKey === 'categoryId') {
      return {
        ...assets,
        options: categories.map(category => ({ value: category.id, label: category.categoryName })),
      };
    }
    return assets;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
        const validFiles = Array.from(files).filter((file) =>
            ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
        );

        const fileURLs = validFiles.map((file) => URL.createObjectURL(file));

        setFormData((prevData: any) => ({
            ...prevData,
            [name]: validFiles.map(file => file.name), // Store the file names in the form data
            assetPhoto: [...(prevData.assetPhoto as File[]), ...validFiles], // Keep the valid files in the form data
        }));

        setPhotoPreviews((prevPreviews) => [...prevPreviews, ...fileURLs]);
        setValidationMessages((prevState) => ({ ...prevState, assetPhoto: '' }));
    }
};

  const handleDeletePhoto = (index: number) => {
    setFormData((prevData) => {
      const updatedFiles = [...(prevData.assetPhoto as File[])];
      updatedFiles.splice(index, 1);
      return { ...prevData, assetPhoto: updatedFiles };
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

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCategory: Category = {
      id: categories.length ? categories[categories.length - 1].id + 1 : 1,
      categoryName: capitalizeWords(categoryName),
    }
    // setCategories([...categories, newCategory])
    setCategoryName('') 
    dispatch(addCategory(newCategory))
    console.log(newCategory)
    handleClose()
  }
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }
  const handleClose = () => {
    setOpen(false)
  }


  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newdepartment: Department = {
      id: departments.length ? departments[departments.length - 1].id + 1 : 1,
      departmentName: capitalizeWords(departmentName),
    }
    // setDepartment([...department, newdepartment])
    dispatch(addDepartment(newdepartment))
    setDepartmentName('') 
    handleClose()
    console.log(newdepartment)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValidationMessages: ValidationMessages = {};
    formConfig.forEach((assets) => {
        if (assets.stateKey !== 'assetPhoto' && !formData[assets.stateKey]) {
            newValidationMessages[assets.validationMessageKey] =
                `${assets.label} is required.`;
        }
    });

    if (Object.keys(newValidationMessages).length > 0) {
        setValidationMessages(newValidationMessages);
        return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
        if (formData[key] !== null) {
            if (key === 'assetPhoto' && formData[key] instanceof Array) {
                (formData[key] as File[]).forEach((file) => {
                    formDataToSend.append('assetPhoto', file);
                });
            } else {
                formDataToSend.append(key, formData[key] as string);
            }
        }
    }

    try {
        await dispatch(updateAssets(id, formDataToSend));
        console.log('Form submitted successfully');
        navigate(`/assets/view-an-asset/${id}`);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

// console.log(JSON.stringify(formData['site'].name))
console.log(JSON.stringify(formData))
// console.log(JSON.stringify(assets.stateKey))


  return (
    <AppForm onSubmit={handleSubmit} encType="multipart/form-data">
    <AppView >
      
        <Typography level="h3">Edit An Asset</Typography>
    
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
        }}
      >
        <Box sx={{ paddingBottom: "30px" }}>

            
            <Grid container spacing={1} sx={{ padding: "20px",
             display:"flex",flexDirection: { xs: "column", md: "row" },}} >
              <Grid xs={12}>
                <Typography
                  sx={{ fontWeight: "bold", mb: 0, paddingLeft: "32px" }}
                >
                  Assets Details
                </Typography>
              </Grid>
              {formConfig.slice(0,9).map((assets: FormFieldConfig) => (
                <Grid key={assets.label} sx={{ paddingLeft: "32px", }}  xs={12}
                md={assets.stateKey === "description" ? 12 : (assets.stateKey === "assetName" || assets.stateKey === "assetTagId") ? 6 : 4} 
                >
                  <Typography
                    level="body-xs"
                    sx={{ color: "#767676", mt: "8px", mb: "5px" }}
                  >
                    {assets.label}
                  </Typography>
                  {assets.type === "select" ? (
                    <Select 
                    value={formData[assets.stateKey] as string}
                    onChange={(e, newValue) => handleSelectChange(e, newValue, assets.stateKey)}
                    sx={assets.sx}
                    >
                      {assets.options?.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      value={formData[assets.stateKey] as string}
                      onChange={(e) => handleInputChange(e, assets.stateKey)}
                      {...assets}
                      sx={assets.sx}
                      />
                    )}

                  {validationMessages[assets.validationMessageKey] && (
                    <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                      {validationMessages[assets.validationMessageKey]}
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
                  {dynamicFormConfig.slice(9,13).map((assets)=>(
                    <Grid key={assets.label } sx={{ paddingLeft: "32px",paddingBottom:"20px" }}>

                      <Typography
                    level="body-xs"
                    sx={{ color: "#767676", mt: "8px", mb: "5px" }}
                  >
                    {assets.label}
                  </Typography>
                  <Grid container spacing={1} >

                  <Select
                      value={formData[assets.stateKey] as string}
                      onChange={(e, newValue) => handleSelectChange(e, newValue, assets.stateKey)}
                      sx={assets.sx}
                      >
                      {assets.options?.map((option) => (
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
                      onClick={() => handleOpenDialog(assets.stateKey)}

                      >
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        <AddIcon />
                      </Typography>
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        New
                      </Typography>
                    </Button>

                      </Grid>
                      {validationMessages[assets.validationMessageKey] && (
                        <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                      {validationMessages[assets.validationMessageKey]}
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
                    <CloudUploadIcon sx={{size:"23"}} />
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
                          <DeleteIcon sx={{color:"#d9534f"}} />
                        </Button>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography level="body-xs">Only (JPG, GIF, PNG) Allowed</Typography>
              )}
              {validationMessages.assetPhoto && (
                <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                  {validationMessages.assetPhoto}
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
      {openDialog==='categoryId' &&  <AddCategory open={openDialog === 'categoryId'} handleClose={handleCloseDialog}  categoryName={categoryName}
        setCategoryName={setCategoryName}
        handleAddCategory={handleAddCategory} 
        />}

      
        {openDialog==='siteId' && <AddSite open={openDialog==='siteId'}  onClose={handleCloseDialog} 
         onSave={(newSite: Site) => {
          setOpen(false)
        }}
        />}

        {openDialog==='locationId' && <AddLocation open={openDialog==='locationId'} setOpen={setOpen} handleClose={handleCloseDialog} 
        />}

        {openDialog==='departmentId' && <SetupAddDept  open={openDialog==='departmentId'} handleClose={handleCloseDialog} departmentName={departmentName} setDepartmentName={setDepartmentName} handleAddDepartment={handleAddDepartment}
        />}
              
    </AppView>
    </AppForm>
  );
};

export default EditAnAsset;
