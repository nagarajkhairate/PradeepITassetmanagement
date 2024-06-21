import React, { useState, useRef, ChangeEvent } from "react";
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Box, Typography, styled, Divider, Grid} from "@mui/joy";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Button from "@mui/joy/Button";
import { CompanyInfoFields } from '../../../pages/Setup/CompInformation/Data'
import AppForm from '../../../components/Common/AppForm';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import FieldComponent from '../../../utils/FieldComponent';
import AppView from "../../Common/AppView";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'

export interface FormData {
  companyName: string;
  country: string;
  address: string;
  aptSuite: string;
  city: string;
  state: string;
  postalCode: number;
  timezone: string;
  currency: string;
  date: Date;
  month: string;
  financialDays: number;
  logo: string;
}

type FileInputChangeHandler = (file: File | null) => void;

interface CompanyProps {
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const Company: React.FC<CompanyProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
 
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }


    setCompanyFormData((prevData : any)  => ({
      ...prevData,
      logo: file || null,
    }));
  };

  const handleNextTab = () => {

    setCompanyFormData((prevData: any) => ({
      company:{ ...prevData,
        company: Company,}
     
    }));
    setActiveTab(activeTab + 1); 
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClickDropZone = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setCompanyFormData((prevData:any) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (companyFormData: FormData) => {
   
    const isValid =
      companyFormData.companyName.trim() !== "" &&
      companyFormData.country.trim() !== "" &&
      companyFormData.address.trim() !== "" &&
      companyFormData.city.trim() !== "" &&
      companyFormData.state.trim() !== "" &&
      companyFormData.postalCode !== null &&
      companyFormData.postalCode > 0 &&
      companyFormData.timezone.trim() !== "" &&
      companyFormData.currency.trim() !== "" &&
      companyFormData.date instanceof Date &&
      !isNaN(companyFormData.date.getTime()) &&
      companyFormData.month.trim() !== "" &&
      companyFormData.financialDays !== null &&
      companyFormData.financialDays > 0 &&
      companyFormData.logo !== "";

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };


  return (
    <AppView>
   <AppForm onSubmit={handleNextTab}>
   <Typography level="h4">
        <Box component={TuneOutlinedIcon} color="#FABC1E" />
       Step 1 - Company Information
      </Typography>
    
        <Box
          sx={{
            borderRadius: '16px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            padding: 5,
          }}
        >
            <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography
              level="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <ContactMailOutlinedIcon  style={{ color: '#FBC21E' }}/>
              Company Details
            </Typography>
            <Typography level="body-xs">Provide the name and site of the main office.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(0, 7).map((field, index) => (
              <Grid md={8} xs={12} sm={8} key={index} sx={ {justifyContent: 'center' , marginLeft:'20%'}}>
                <FieldComponent 
                  field={field}
                  formData={companyFormData}
                  handleInputChange={handleInputChange} 
                  handleSelectChange={handleSelectChange}
                />
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={2}>
        <Grid xs={12} marginRight="80px">
            <Typography
              level="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <CurrencyExchangeOutlinedIcon  style={{ color: '#FBC21E' }}/>
              Timezone & Currency
            </Typography>
            <Typography level="body-xs">Adjust the settings to fit your company’s local timezone, currency, and date format.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(7, 12).map((field, index) => (
              <Grid key={index} md={8} xs={8} sm={8} sx={{  justifyContent: 'center',marginLeft:'20%' }}>
                
                <FieldComponent 
                field={field}
                  formData={companyFormData}
                  handleInputChange={handleInputChange} 
                  handleSelectChange={handleSelectChange}
                  />
              </Grid>
            ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
        <Grid xs={12}>
            <Typography
              level="h4"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <CollectionsOutlinedIcon style={{ color: '#FBC21E' }} />
              Company Logo
            </Typography>
            <Typography level="body-xs">Upload your organization’s logo to make this space your own.</Typography>
          </Grid>
          {CompanyInfoFields &&
            CompanyInfoFields.slice(12, 13).map((field, index) => (
              <Grid key={index} md={8} xs={8} sm={8} sx={{  justifyContent: 'center',marginLeft:'20%' }}>
                
                <FieldComponent 
                field={field}
                  formData={companyFormData}
                  handleInputChange={handleInputChange} 
                  handleSelectChange={handleSelectChange}
                  
                  />
              </Grid> 
            ))}
        </Grid>

                
                {/* <Box>
                <div>
    <Typography
      level="h4"
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "0px",
        marginTop: "10px",
      }}
    >
      
      <CollectionsOutlinedIcon />
      Company Logo
    </Typography>
    <Typography level="body-sm">
      Upload your organization's logo to make this space your own.
    </Typography>
  </div>

  <div>
    <Box>
      <DropZone
        onClick={handleClickDropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        sx={{
          width: { xs: "50%", sm: "80%", md: "400px" },
          height: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          margin: "auto",
          border: "2px dashed grey",
          textAlign: "center",        
          cursor: "pointer",
        }}
      >
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          "Drop your image here"
        )}
      </DropZone>
    </Box>
    <CustomInput
      ref={fileInputRef}
      type="file"
      id="logo"
      name="logo"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: "none" }}
    />
    <label htmlFor="logo">
      only (JPG, GIF, PNG) are allowed.
    </label>
  </div>
                </Box> */}
                <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            justifyContent: 'center',
            marginBottom: '10px',
          }}
        >
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            gap: 2,
          }}
        >
        <Button
            variant="solid"
            sx={{
              background: "#fdd835",
              color: 'white',
              borderRadius:'15px'
            }}
            component="label"
              onClick={handleNextTab} 
             
          >
             Continue
             <NavigateNextOutlinedIcon />
          </Button>
          </Box>
      </Box>
             
           
      
   </AppForm>
    
    </AppView>
  );
};

export default Company;



