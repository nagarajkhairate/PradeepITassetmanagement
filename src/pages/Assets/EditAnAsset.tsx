import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Input,
  Button,
  FormLabel,
  FormControl,
  Divider
} from "@mui/joy";
import { formConfig } from "./formConfig";
import AppView from "../../components/Common/AppView";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchAssetsById, updateAssets } from "../../redux/features/AssetSlice";
import { fetchSites } from "../../redux/features/SitesSlice";
import { fetchLocation } from "../../redux/features/LocationSlice";
import { fetchDepartment } from "../../redux/features/DepartmentSlice";
import { fetchCategory } from "../../redux/features/CategorySlice";
import { useNavigate, useParams } from "react-router-dom";
import AppForm from "../../components/Common/AppForm";
import SiteComponent from "../../components/AssetSections/SiteComponent";
import LocationComponent from "../../components/AssetSections/LocationComponent";
import DepartmentComponent from "../../components/AssetSections/DepartmentComponent";
import CategoryComponent from "../../components/AssetSections/CategoryComponent";
import SubCategoryComponent from "../../components/AssetSections/SubCategoryComponent";
import AssetFileField from "../../components/Common/AppFile/AssetFileField";
import SelectOption from "../../components/AssetSections/SelectOption";
import { fetchAssetFieldMapping } from "../../redux/features/AssetFieldMappingSlice";

interface ValidationMessages {
  [key: string]: string;
}

const EditAnAsset: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const assets = useSelector((state: RootState) =>
    state.assets.data.find((asset: any) => asset.id.toString() === id)
  ) as any;
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const assetMappings = useSelector(
    (state: RootState) => state.assetMapping.data,
  )

  useEffect(() => {
    dispatch(fetchAssetFieldMapping())
  }, [dispatch])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
const { name, value} = event.target

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (newValue: any, key: string) => {
    setFormData({ ...formData, [key]: newValue });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: file.name,
      }));
    }
  };

  const handleDeletePhoto = (index: number) => {
    setFormData((prevData: any) => {
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

  console.log(JSON.stringify(formData))

  const handleInputValue = (
    field: any,
    formData: any,
    handleInputChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void,
    handleSelectChange: (
      value: string | null, name: string
    ) => void,
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    mode?: string
  ) => {
    const commonProps = {
      field,
      formData,
      handleInputChange,
      handleSelectChange,
      handleFileChange,
      mode,
    };

    switch (field.components.type) {
      case 'text':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
            type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={{
                 padding: '10px',
                  display:"grid",
              }}
            />
          </FormControl>
        );
      case 'date':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
            type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={{
                minWidth:"205px",
                padding: '10px',
                  display:"grid",
              }}
            />
          </FormControl>
        );
      case 'number':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
            type={field.components.type}
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={{
                padding: '10px',
                  display:"grid",
              }}
            />
          </FormControl>
        );
      case 'textarea':
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              name={field.name}
              value={formData[field.name] as string}
              onChange={handleInputChange}
              sx={field.stylings}
            />
          </FormControl>
        );

      case 'select':
        if (field.name === 'siteId') {
          return <SiteComponent {...commonProps} />;
        } else if (field.name === 'locationId') {
          return <LocationComponent {...commonProps} />;
        } else if (field.name === 'departmentId') {
          return <DepartmentComponent {...commonProps} />;
        } else if (field.name === 'categoryId') {
          return <CategoryComponent {...commonProps} />;
        } else if (field.name === 'subCategoryId') {
          return <SubCategoryComponent {...commonProps} />;
        } else {
          return <SelectOption {...commonProps} />
        }

      case 'file':
        if (field.name === 'assetPhoto') {
          return <AssetFileField {...commonProps} />;
        }
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
              type="file"
              name={field.name}
              onChange={handleFileChange}
              sx={field.stylings}
            />
            <Box>
              {photoPreviews.map((preview, index) => (
                <Box key={index}>
                  <img src={preview} alt={`Preview ${index}`} />
                  <Button onClick={() => handleDeletePhoto(index)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          </FormControl>
        );

      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValidationMessages: ValidationMessages = {};
    formConfig.forEach((field) => {
      if (field.title !== 'assetPhoto' && !formData[field.title]) {
        // newValidationMessages[assets.validationMessageKey] =
        //     `${assets.label} is required.`;
      }
    });

    if (Object.keys(newValidationMessages).length > 0) {
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        if (key === 'assetPhoto' && file) {
          formDataToSend.append(key, file);
        } else {
          if (key !== 'assetPhoto') {
            formDataToSend.append(key, formData[key] as string);
          }
        }
      }
    }

    try {
      await dispatch(updateAssets(formDataToSend));
      console.log('Form submitted successfully');
       navigate(`/assets/list-of-assets`);
      // navigate(`/assets/view-an-asset/${id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    if (assets) {
      setFormData(assets);
    }
  }, [assets]);

  useEffect(() => {
    dispatch(fetchSites());
    dispatch(fetchLocation());
    dispatch(fetchDepartment());
    dispatch(fetchCategory());
  }, [dispatch]);

  useEffect(() => {
    if (id) dispatch(fetchAssetsById(id));
  }, [id]);

  return (
    <AppForm onSubmit={handleSubmit} encType="multipart/form-data">
      <AppView>
        <Typography level="h3" sx={{ ml: '52px',mb:"30px"  }}>
          Edit An Asset
        </Typography>

        <Box
          sx={{
            borderRadius: 'none',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            gap: '5px',
            paddingBottom: '30px',
          }}
        >
        <Box
          sx={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {assetMappings &&
            assetMappings.map((group, index) => (
              <Grid key={index} xs={12}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    mb: '20px',
                    mt: '10px',
                    paddingLeft: '20px',
                  }}
                >
                  {group.title}
                </Typography>
                <Grid container spacing={2} sx={{padding:"20px"}}>
                  {group.fields &&
                    group.fields.map((field, index) => {
                      let styleData = { xs: 12, sm: 6, md: 4, lg: 3 } // Default values
                      try {
                        styleData = JSON.parse(
                          field.styling.replace(/(\w+):/g, '"$1":'),
                        )
                      } catch (error) {
                        console.error('Error parsing JSON:', error)
                      }
                      return (
                        <Grid
                          key={index}
                          xs={styleData.xs}
                          md={styleData.md}
                          sm={styleData.sm}
                          lg={styleData.lg}
                        >
                          {handleInputValue(
                            field,
                            formData,
                            handleInputChange,
                            handleSelectChange,
                            handleFileChange,
                          )}
                        </Grid>
                      )
                    })}
                </Grid>
                <Divider sx={{ mt: '20px' }} />
              </Grid>
            ))}
        </Box>
            

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                  justifyContent: 'flex-end',
                  gap: '15px',
                  mx: '35px',
                  mt: '40px',
                }}
              >
                <Button
                  size="md"
                 onClick={handleSubmit}
                  sx={{
                    color: '#000000',
                    borderRadius: '15px',
                  
                    background: '#FABC1E',
                    '&:hover': {
                      background: '#e0a71b',
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  size="md"
                  onClick={() => navigate('/assets/list-of-assets')}
                  sx={{
                    borderRadius: '15px',
                    background: '#000000',
                    '&:hover': {
                      background: '#333333',
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
      </AppView>
    </AppForm>
  );
};

export default EditAnAsset;
