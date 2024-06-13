import React, { useState, useRef, ChangeEvent } from "react";
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Box, Typography, styled, Divider} from "@mui/joy";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Button from "@mui/joy/Button";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import { currencySymbols, months, timezones } from "./Companyinfodata";
import AppView from "../../Common/AppView";

const CustomInputLabel = styled("label")({
  display: "flex",
  flexDirection: "row",
  alignItems: "center", 
});

const CenteredForms = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const CustomInput = styled("input")({
  display: "none",
});

const DropZone = styled("div")({
  border: "2px solid #ccc",
  padding: "20px",
  textAlign: "center",
  background: "#f0f0f0",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#d9d9d9", //darker shade of gray
  },
});

const FlexBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

interface FormData {
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
  // const [companyFormData, setFormData] = useState<FormData>({
  //   companyName: "",
  //   country: "",
  //   address: "",
  //   aptSuite: "",
  //   city: "",
  //   state: "",
  //   postalCode: 0,
  //   timezone: "",
  //   currency: "",
  //   date: new Date(),
  //   month: "",
  //   financialDays: 0,
  //   logo: "",
  // });
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState<string>("");
  const [selectedFinancialDays, setSelectedFinancialDays] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string | "">("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const [activeTab, setActiveTab] = React.useState(0);

 
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
    setActiveTab(activeTab + 1); // Update this to navigate to the next tab
    console.log("companyInfo:", companyFormData); 
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

  const handleMonthChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setCompanyFormData((prevData:any) => ({
        ...prevData,
        month: newValue,
      }));
      setSelectedMonth(newValue);
    }
  };

  const handleFinancialDaysChange = (
    event: React.SyntheticEvent | null,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      setCompanyFormData((prevData:any) => ({
        ...prevData,
        financialDays: newValue,
      }));
      setSelectedFinancialDays(newValue);
    }
  };
  // Generate serial numbers from 1 to a specified maximum (e.g., 100)
  const maxSerialNumber = 100;
  const serialNumbers = Array.from(
    { length: maxSerialNumber },
    (_, index) => index + 1
  );

  const handleCurrencyChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setCompanyFormData((prevData:any) => ({
        ...prevData,
        currency: newValue,
      }));
      setSelectedCurrency(newValue);
    }
  };

  const handleTimezoneChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setCompanyFormData((prevData:any) => ({
        ...prevData,
        timezone: newValue,
      }));
      setSelectedTimezone(newValue);
    }
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  // Handle country change
  const handleCountryChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {

    setCompanyFormData((prevData:any) => ({
      ...prevData,
      country: newValue!,
    }));
  };

  const handleStateChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setCompanyFormData((prevData:any) => ({
      ...prevData,
      state: newValue!,
    }));
  };

  const DatePicker: React.FC<{
    value: string;
    onChange: (date: string) => void;
  }> = ({ value, onChange }) => {
    return (
      <Input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        sx={{ width: { md: "500px", xs: "100%" } }}
      />
    );
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
    console.log(JSON.stringify(companyFormData));
    // if (validateForm(formData)) {
    //   console.log("Form submitted:", formData);
    //   window.location.href = "/Sites";
    // } else {
    //   alert("Please fill in all required fields.");
    // }
  };

  // console.log("Form Data:", companyFormData); 
  return (
    <AppView>
   
    <Typography level="h4" style={{ display: 'flex', alignItems: 'center' }}>
        <RoomOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC21E' }} />
        step 1- Company Information
      </Typography>
    
    
        <Box
          sx={{
            borderRadius: 'none',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            gap: '5px',
          }}
        >
          <Box component="section" sx={{ p: 2, border: "10px" }}>
            <form>
              <Box
              >
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
                    <ContactMailOutlinedIcon  /><span>Company Details.</span>
                    
                  </Typography>
                  <Typography level="body-sm">
                    Provide the name and site of the main office.
                  </Typography>
                </div>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: { md: "100%", xs: "100%" },
                    justifyContent: "center",
                    marginBottom: "10px",
                    // paddingLeft:{md:"28%",xs:"0"}
                  }}
                >
                  {/* Company Name */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <label
                      htmlFor="companyName"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      Company <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      placeholder="Type in here..."
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={companyFormData.companyName}
                      onChange={handleInputChange}
                      required
                      sx={{ width: { md: "500px", xs: "100%" } }}
                    />
                  </Box>

                  {/* Country */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <label
                      htmlFor="country"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      Country <span style={{ color: "red" }}>*</span>
                    </label>
                    <Select
                      id="country"                     
                      onChange={handleCountryChange}
                      value={companyFormData.country}               
                      placeholder="Select country..."
                      sx={{ width: { md: "500px", xs: "100%" } }}
                    >
                      <Option value="" disabled>
                        Select country...
                      </Option>
                      <Option value="India">India</Option>
                      <Option value="China">China</Option>
                    </Select>
                  </Box>

                  {/* Address */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <label
                      htmlFor="address"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      placeholder="Type in here..."
                      type="text"
                      id="address"
                      name="address"
                      value={companyFormData.address}
                      onChange={handleInputChange}
                      required
                      sx={{ width: { md: "500px", xs: "100%" } }}
                    />
                  </Box>

                  {/* Apt./Suite */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <label
                      htmlFor="aptSuite"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      Apt./Suite
                    </label>
                    <Input
                      placeholder="Type in here..."
                      type="text"
                      id="aptSuite"
                      name="aptSuite"
                      value={companyFormData.aptSuite}
                      onChange={handleInputChange}
                      sx={{ width: { md: "500px", xs: "100%" } }}
                    />
                  </Box>

                  {/* City */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <label
                      htmlFor="city"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      City <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      placeholder="Type in here..."
                      type="text"
                      id="city"
                      name="city"
                      value={companyFormData.city}
                      onChange={handleInputChange}
                      required
                      sx={{ width: { md: "500px", xs: "100%" } }}
                    />
                  </Box>

                  {/* State */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      flexDirection: { md: "row", xs: "column" },
                    }}
                  >
                    <label
                      htmlFor="state"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      State <span style={{ color: "red" }}>*</span>
                    </label>
                    <Select
                      id="state"
                      value={companyFormData.state}
                      onChange={handleStateChange}
                      placeholder="Select state..."
                      sx={{ width: { md: "500px", xs: "100%" } }}
                    >
                      <Option value="" disabled>
                        Select state...
                      </Option>
                      <Option value="Karnataka">Karnataka</Option>
                      <Option value="Goa">Goa</Option>
                      <Option value="Delhi">Delhi</Option>
                      <Option value="Kerala">Kerala</Option>
                    </Select>
                  </Box>

                  {/* Postal Code */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      flexDirection: { md: "row", xs: "column" },
                    }}
                  >
                    <label
                      htmlFor="postalCode"
                      style={{ width: "150px", marginRight: "10px" }}
                    >
                      Postal Code <span style={{ color: "red" }}>*</span>
                    </label>
                    <Input
                      placeholder="Type in here..."
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={companyFormData.postalCode}
                      onChange={handleInputChange}
                      required
                      sx={{ width: { md: "500px", xs: "100%" } }}
                    />
                  </Box>
                </Box>
                {/* </Box> */}

                <Divider />

                <Box>
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
                      <CurrencyExchangeOutlinedIcon  />
                      Timezone and Currency Details.
                    </Typography>
                    <Typography level="body-sm">
                      Adjust the settings to fit your company's local timezone,
                      currency, and date format.
                    </Typography>
                  </div>
                  <CenteredForms>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        width: { md: "640px", xs: "100%" },
                        marginBottom: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          flexDirection: { md: "row", xs: "column" },
                          justifyContent: "space-between",
                        }}
                      >
                        <CustomInputLabel htmlFor="timezone">
                          Timezone{" "}
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
                        </CustomInputLabel>

                        <Select
                          id="timezone"
                          name="timezone"
                          value={selectedTimezone}
                          onChange={handleTimezoneChange}
                          required
                          sx={{ width: { md: "500px", xs: "100%" } }}
                          placeholder="(GMT -5:00) Eastern Time (US & Canada)"
                        >
                          <Option value="" disabled>
                            Select timezone...
                          </Option>
                          {timezones.map((timezone, index) => (
                            <Option key={index} value={timezone.value}>
                              {timezone.label}
                            </Option>
                          ))}
                        </Select>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          flexDirection: { md: "row", xs: "column" },
                          justifyContent: "space-between",
                        }}
                      >
                        <CustomInputLabel htmlFor="currency">
                          Currency Symbol{" "}
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
                        </CustomInputLabel>
                        <Select
                          id="currency"
                          value={selectedCurrency}
                          onChange={handleCurrencyChange}
                          required
                          sx={{ width: { md: "500px", xs: "100%" } }}
                          placeholder="United States Dollar (USD $)"
                        >
                          <Option value="" disabled>
                            Select currency symbol...
                          </Option>
                          {currencySymbols.map((currency, index) => (
                            <Option key={index} value={currency.value}>
                              {currency.label}
                            </Option>
                          ))}
                        </Select>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          flexDirection: { md: "row", xs: "column" },
                          justifyContent: "space-between",
                        }}
                      >
                        <CustomInputLabel htmlFor="date">
                          Date format{" "}
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
                        </CustomInputLabel>
                        <DatePicker
                          value={selectedDate}
                          onChange={handleDateChange}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                          flexDirection: { md: "row", xs: "column" },
                          justifyContent: "space-between",
                        }}
                      >
                        <CustomInputLabel htmlFor="financialYear">
                          Financial Year begins on{" "}
                          <span style={{ color: "red", marginLeft: "4px" }}>
                            *
                          </span>
                        </CustomInputLabel>
                        <Select
                          id="month"
                          name="month"
                          value={selectedMonth}
                          onChange={handleMonthChange}
                          sx={{ width: "250px" }}
                          placeholder="January"
                        >
                          <Option value="" disabled>
                            Month
                          </Option>
                          {months.map((month) => (
                            <Option key={month.value} value={month.value}>
                              {month.label}
                            </Option>
                          ))}
                        </Select>
                        <Select
                          id="financialDays"
                          name="financialDays"
                          onChange={handleFinancialDaysChange}
                          value={companyFormData.financialDays}
                          sx={{ width: "80px" }}
                          placeholder="1"
                        >
                          <Option value="" disabled>
                            1
                          </Option>
                          {serialNumbers.map((number) => (
                            <Option key={number} value={number}>
                              {number}
                            </Option>
                          ))}
                        </Select>
                      </Box>
                
                    </Box>
                  </CenteredForms>
                </Box>

                <Divider />

                <Box>
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
                </Box>
                <Divider />

                <Button                 
                  sx={{
                    background: "#FABC1E",
                    width: { xs: "100%", sm: "150px", md: "125px" },
                    height: "30px",
                    marginLeft: { xs: "0", md: "auto" },
                    marginTop: { xs: "10px", md: "0" },
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#d79918",
                    },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleNextTab}
                >
                    Continue
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
    </AppView>
  );
};

export default Company;
