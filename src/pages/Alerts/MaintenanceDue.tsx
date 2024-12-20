import React, { useState, ReactNode } from "react";
import {
  Typography,
  Box,
  Grid,
  Input as MuiInput,
  Divider,
  Button,
  Select as MuiSelect,
  selectClasses,
  Option,
} from "@mui/joy";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

interface TypographyLabelProps {
  title: string;
}

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // To allow additional props
}

interface SelectProps {
  placeholder: string;
  value: string;
  onChange: (event: any, value: string | null) => void; // Adjusted type for MUI Select
  children: ReactNode;
  [key: string]: any; // To allow additional props
}

const TypographyLabel: React.FC<TypographyLabelProps> = ({ title }) => (
  <Typography level="body-xs" sx={{ mt: 1, color: "#767676", mb: "5px" }}>
    {title}
  </Typography>
);

const Input: React.FC<InputProps> = ({ placeholder, value, onChange, ...props }) => (
  <MuiInput
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    sx={{
      borderRadius: "15px",
      padding: "10px",
      width: {
        xs: "100%",
        sm: "100%",
        md: 350,
      },
      ...props.sx,
    }}
    {...props}
  />
)

const Select: React.FC<SelectProps> = ({ placeholder, value, onChange, children, ...props }) => (
  <MuiSelect
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    indicator={<IoIosArrowDown />}
    sx={{
      borderRadius: "15px",
      padding: "12.25px",
      width: {
        xs: "100%",
        sm: "100%",
        md: 350,
      },
      [`& .${selectClasses.indicator}`]: {
        transition: "0.2s",
        [`&.${selectClasses.expanded}`]: {
          transform: "rotate(-180deg)",
        },
      },
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </MuiSelect>
)

interface ValidationErrors {
  searchKeyword?: string;
  searchFields?: string;
  site?: string;
  location?: string;
  category?: string;
  department?: string;
  person?: string;
  customer?: string;
  status?: string;
  groupedBy?: string;
  noOfResults?: string;
  dateRangeBy?: string;
  quickDateRange?: string;
  dateRange?: string;
}

const MaintenanceDue: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchFields, setSearchFields] = useState("");
  const [site, setSite] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [person, setPerson] = useState("");
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("");
  const [groupedBy, setGroupedBy] = useState("");
  const [noOfResults, setNoOfResults] = useState("10");
  const [dateRangeBy, setDateRangeBy] = useState("");
  const [quickDateRange, setQuickDateRange] = useState("");
  const [dateRange, setDateRange] = useState("");

  const [validationMessages, setValidationMessages] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    let isValid = true;
    const errors: ValidationErrors = {};

    if (!searchKeyword) {
      errors.searchKeyword = "Search keyword is required";
      isValid = false;
    }
    if (!searchFields) {
      errors.searchFields = "Search fields are required";
      isValid = false;
    }
    if (!site) {
      errors.site = "Site is required";
      isValid = false;
    }
    if (!location) {
      errors.location = "Location is required";
      isValid = false;
    }
    if (!category) {
      errors.category = "Category is required";
      isValid = false;
    }
    if (!department) {
      errors.department = "Department is required";
      isValid = false;
    }
    if (!person) {
      errors.person = "Person is required";
      isValid = false;
    }
    if (!customer) {
      errors.customer = "Customer is required";
      isValid = false;
    }
    if (!status) {
      errors.status = "Status is required";
      isValid = false;
    }
    if (!groupedBy) {
      errors.groupedBy = "Grouped by is required";
      isValid = false;
    }
    if (!noOfResults) {
      errors.noOfResults = "Number of results is required";
      isValid = false;
    }
    if (!dateRangeBy) {
      errors.dateRangeBy = "Date range by is required";
      isValid = false;
    }
    if (!quickDateRange) {
      errors.quickDateRange = "Quick date range is required";
      isValid = false;
    }
    if (!dateRange) {
      errors.dateRange = "Date range is required";
      isValid = false;
    }

    setValidationMessages(errors);
    return isValid;
  };

  const handleSave = () => {
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }
    const formData = {
      searchKeyword,
      searchFields,
      site,
      location,
      category,
      department,
      person,
      customer,
      status,
      groupedBy,
      noOfResults,
      dateRangeBy,
      quickDateRange,
      dateRange,
    };
    console.log(JSON.stringify(formData, null, 2));
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<any>>, field: keyof ValidationErrors) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setter(e.target.value);
    setValidationMessages(prevState => ({ ...prevState, [field]: "" }));
  };

  const handleSelectChange = (setter: React.Dispatch<React.SetStateAction<any>>, field: keyof ValidationErrors) => (event: React.SyntheticEvent | null, newValue: string | null) => {
    setter(newValue!);
    setValidationMessages(prevState => ({ ...prevState, [field]: "" }));
  };

  return (
    <div style={{ width: "100%", background: "#f9f9f9" }}>
      <div style={{ marginLeft: "52px", paddingTop: "30px" }}>
        <Typography level="h3" style={{color:"initial"}}>
          Maintenance
        </Typography>
        <Typography
          level="body-xs"
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            color: "#767676",
          }}
        >
          <IoIosArrowForward />
          Search Criteria
        </Typography>
      </div>
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          margin: {
            xs: "4px",
            md: "52px",
          },
        }}
      >
        <Box sx={{ paddingBottom: "30px" }}>
          <Box>
            <Grid
              container
              spacing={3}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-evenly",
                padding: "20px",
                gap: "10px",
              }}
            >
              <Grid>
                <TypographyLabel title="Search" />
                <Input
                  placeholder="Keyword"
                  value={searchKeyword}
                  onChange={handleChange(setSearchKeyword, 'searchKeyword')}
                />
                {validationMessages.searchKeyword && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.searchKeyword}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Search Fields" />
                <Input
                  placeholder="Is Repeating title, Maintenance..."
                  value={searchFields}
                  onChange={handleChange(setSearchFields, 'searchFields')}
                />
                {validationMessages.searchFields && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.searchFields}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Site" />
                <Select
                  placeholder="All sites"
                  value={site}
                  onChange={handleSelectChange(setSite, 'site')}
                >
                  <Option value="Site1">Site 1</Option>
                  <Option value="Site2">Site 2</Option>
                  <Option value="Site3">Site 3</Option>
                </Select>
                {validationMessages.site && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.site}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Location" />
                <Select
                  placeholder="All Location"
                  value={location}
                  onChange={handleSelectChange(setLocation, 'location')}
                >
                  <Option value="Location1">Location 1</Option>
                  <Option value="Location2">Location 2</Option>
                  <Option value="Location3">Location 3</Option>
                </Select>
                {validationMessages.location && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.location}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Category" />
                <Select
                  placeholder="All Location"
                  value={category}
                  onChange={handleSelectChange(setCategory, 'category')}
                >
                  <Option value="Category1">Category 1</Option>
                  <Option value="Category2">Category 2</Option>
                  <Option value="Category3">Category 3</Option>
                </Select>
                {validationMessages.category && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.category}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Department" />
                <Select
                  placeholder="All Department"
                  value={department}
                  onChange={handleSelectChange(setDepartment, 'department')}
                >
                  <Option value="Department1">Department 1</Option>
                  <Option value="Department2">Department 2</Option>
                  <Option value="Department3">Department 3</Option>
                </Select>
                {validationMessages.department && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.department}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Person" />
                <Select
                  placeholder="Any person"
                  value={person}
                  onChange={handleSelectChange(setPerson, 'person')}
                >
                  <Option value="Person1">Person 1</Option>
                  <Option value="Person2">Person 2</Option>
                  <Option value="Person3">Person 3</Option>
                </Select>
                {validationMessages.person && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.person}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Customer" />
                <Select
                  placeholder="Any customer"
                  value={customer}
                  onChange={handleSelectChange(setCustomer, 'customer')}
                >
                  <Option value="Customer1">Customer 1</Option>
                  <Option value="Customer2">Customer 2</Option>
                  <Option value="Customer3">Customer 3</Option>
                </Select>
                {validationMessages.customer && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.customer}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <TypographyLabel title="Status" />
                <Select
                  placeholder="Nothing Selected"
                  value={status}
                  onChange={handleSelectChange(setStatus, 'status')}
                >
                  <Option value="Status1">Status 1</Option>
                  <Option value="Status2">Status 2</Option>
                  <Option value="Status3">Status 3</Option>
                </Select>
                {validationMessages.status && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.status}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
          <Divider sx={{ mt: "20px", mx: "42px" }}></Divider>
          <Box>
            <Grid
              container
              spacing={3}
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-evenly",
                gap: "10px",
                padding: "20px",
                flexWrap: "wrap",
              }}
            >
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>
                  Display Maintenances
                </Typography>
                <TypographyLabel title="Results Grouped by___" />
                <Select
                  placeholder="-"
                  value={groupedBy}
                  onChange={handleSelectChange(setGroupedBy, 'groupedBy')}
                >
                  <Option value="Option1">Option 1</Option>
                  <Option value="Option2">Option 2</Option>
                  <Option value="Option3">Option 3</Option>
                </Select>
                {validationMessages.groupedBy && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.groupedBy}
                  </Typography>
                )}
              </Grid>
              <Grid>
                <Typography sx={{ fontWeight: "bold" }}>
                  Display Result
                </Typography>
                <TypographyLabel title="No. of Results" />
                <Select
                  placeholder="10"
                  value={noOfResults}
                  onChange={handleSelectChange(setNoOfResults, 'noOfResults')}
                >
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                  <Option value="40">40</Option>
                </Select>
                {validationMessages.noOfResults && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.noOfResults}
                  </Typography>
                )}
              </Grid>
              <Grid sx={{ mt: "24px" }}>
                <TypographyLabel title="Date Range By" />
                <Select
                  placeholder="All sites"
                  value={dateRangeBy}
                  onChange={handleSelectChange(setDateRangeBy, 'dateRangeBy')}
                >
                  <Option value="DateRangeBy1">Date Range By 1</Option>
                  <Option value="DateRangeBy2">Date Range By 2</Option>
                  <Option value="DateRangeBy3">Date Range By 3</Option>
                </Select>
                {validationMessages.dateRangeBy && (
                  <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                    {validationMessages.dateRangeBy}
                  </Typography>
                )}
              </Grid>
              <Grid
                container
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  width: "100%",
                }}
                spacing={6.75}
              >
                <Grid sx={{ ml: "10px" }}>
                  <TypographyLabel title="Quick Date Range" />
                  <Select
                    placeholder="dd/mm/yyyy"
                    value={quickDateRange}
                    onChange={handleSelectChange(setQuickDateRange, 'quickDateRange')}
                  >
                    <Option value="QuickDateRange1">Quick Date Range 1</Option>
                    <Option value="QuickDateRange2">Quick Date Range 2</Option>
                    <Option value="QuickDateRange3">Quick Date Range 3</Option>
                  </Select>
                  {validationMessages.quickDateRange && (
                    <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                      {validationMessages.quickDateRange}
                    </Typography>
                  )}
                </Grid>
                <Grid sx={{ ml: "15px" }}>
                  <TypographyLabel title="Date Range" />
                  <Select
                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                    value={dateRange}
                    onChange={handleSelectChange(setDateRange, 'dateRange')}
                  >
                    <Option value="DateRange1">Date Range 1</Option>
                    <Option value="DateRange2">Date Range 2</Option>
                    <Option value="DateRange3">Date Range 3</Option>
                  </Select>
                  {validationMessages.dateRange && (
                    <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                      {validationMessages.dateRange}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
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
              }}
            >
              <Button
                size="lg"
                sx={{
                  color: "#000000",
                  borderRadius: "15px",
                  padding: "18px 70px",
                  background: "#FABC1E",
                  "&:hover": {
                    background: "#e0a71b",
                  },
                }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                size="lg"
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
    </div>
  );
};

export default MaintenanceDue;
