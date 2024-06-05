import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import {
  Box,
  Typography,
  Divider,
  Select,
  Option,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Checkbox,
  Button,
  ButtonGroup,
  Grid,
} from "@mui/joy";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { TableData } from "./TableData";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const DepreciationOptions = {
  "id": 1,
  "title": "Depreciation",
  "description":
    "Depreciation is used to expense the cost of your assets over their useful life...",
  "formLabel": "Asset Depreciation",
  "icon": CalendarMonthOutlinedIcon,
  "options": [
    { "name": "assetDepreciation", "value": "Yes", "label": "Yes" },
    { "name": "assetDepreciation", "value": "No", "label": "No" },
  ],
  "depreciationMethods": [
    "Straight Line",
    "Declining Balance",
    "Double Declining",
    "Balance",
    "150% Declining Balance",
  ],
  "calculationFrequencies": ["Yearly", "Monthly", "Quarterly"],
};

const LinkingOptions = {
  "id": 2,
  "title": "Linking of Assets",
  "description": "Enable or disable the linking of assets...",
  "formLabel": "Enable Linking",
  "icon": CalendarMonthOutlinedIcon,
  "options": [
    { "name": "enableLinking", "value": "Yes", "label": "Yes" },
    { "name": "enableLinking", "value": "No", "label": "No" },
  ],
};

const SetupTableOptions: React.FC = ({}) => {
  const [showDepreciationOptions, setShowDepreciationOptions] = useState(false);
  const [depreciationMethod, setDepreciationMethod] = useState("");
  const [calculationFrequency, setCalculationFrequency] = useState("");
  const [enableLinking, setEnableLinking] = useState("No");
  const [companyFormData, setCompanyFormData] = useState<any>({
    assetDepreciation: "No",
    depreciationMethod: "",
    calculationFrequency: "",
    enableLinking: "No",
  });

  const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShowDepreciationOptions(value === "Yes");
    setCompanyFormData((prevData: any) => ({
      ...prevData,
      assetDepreciation: value,
    }));
    // console.log("Depreciation option selected:", value);
  };

  const handleDepreciationMethodChange = (
    event: SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null) setDepreciationMethod(newValue);
  };

  const handleCalculationFrequencyChange = (
    event: SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null) setCalculationFrequency(newValue);
  };

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const handleSubmit = () => {
    const formData: any = {
      DepreciationOptions: {
        assetDepreciation: companyFormData.assetDepreciation,
      },
     
      TableData: TableData.map((item) => ({
        title: item.title,
        selectedOption: companyFormData[item.title],
      })),
      LinkingOfAssets: {
        enableLinking: enableLinking,
      },
    };

    if (companyFormData.assetDepreciation === "Yes") {
      formData.DepreciationOptions.depreciationMethod = depreciationMethod;
      formData.DepreciationOptions.calculationFrequency = calculationFrequency;
    }
    if (enableLinking === "Yes") {
      formData.LinkingOfAssets.linkedAssets = {
        checkout: false,
        leaseAssets: false,
        lostFoundAssets: false,
        repairAssets: false,
        brokenAssets: false,
        disposeAssets: false,
        donateAssets: false,
        sellAssets: false,
        auditAssets: false,
      };
    }
    console.log(JSON.stringify(formData, null, 2));
  };

  const handleEnableLinkingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnableLinking(event.target.value);
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompanyFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Box>
        <Typography
          level="h3"
          sx={{
            marginLeft: { xs: "10px", md: "50px" },
            fontSize: { xs: "24px", md: "24px" },
            marginTop: { xs: "20px", md: "35px" },
            display: "flex",
            alignItems: "center",
            marginBottom: { xs: "-20px", md: "-42px" },
            paddingBottom: "10px",
          }}
        >
          <Box
            component={TableChartOutlinedIcon}
            color="#FBC21E"
            sx={{
              fontSize: { xs: "24px", md: "30px" },
              marginRight: "10px",
            }}
          />
          Table Options
        </Typography>
      </Box>

      <div>
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
          <Box>
            <Box
              component="section"
              sx={{
                p: 2,
                border: "none",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <form>
                <Typography
                  sx={{
                    margin: {
                      xs: "4px",
                      md: "22px",
                    },
                  }}
                >
                  <b>AssetTiger</b> lets you decide how comprehensive you want
                  your system. Use these Options to fashion your ideal asset
                  tracking and create more reports.
                </Typography>

                <Box>
                  <Typography
                    level="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ width: 25, height: 25, color: "#FBC21E" }}>
                      <DepreciationOptions.icon />
                    </div>

                    <span style={{ marginLeft: "8px" }}>
                      {DepreciationOptions.title}
                    </span>
                  </Typography>
                  <Typography>{DepreciationOptions.description} </Typography>
                  <Box sx={{ marginLeft: "150px" }}>
                    
                    <Box>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <FormLabel>
                            {" "}
                            {DepreciationOptions.formLabel}
                          </FormLabel>
                        </Box>
                        <RadioGroup
                          defaultValue="outlined"
                          onChange={handleDepreciationChange}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            ml: 2,
                            gap: 2,
                          }}
                        >
                          {DepreciationOptions.options.map((option) => (
                            <Box>
                              <Radio
                                key={option.value}
                                value={option.value}
                                label={option.label}
                              />                              
                            </Box>
                          ))}
                          
                        </RadioGroup>
                      </FormControl>
                      

                      {showDepreciationOptions && (
                        <>
                          <FormControl>
                            <FormLabel>Default Depreciation Method</FormLabel>
                            <Select
                              value={depreciationMethod}
                              onChange={handleDepreciationMethodChange}
                            >
                              {DepreciationOptions.depreciationMethods.map(
                                (method) => (
                                  <Option key={method} value={method}>
                                    {method}
                                  </Option>
                                )
                              )}
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Calculation Frequency</FormLabel>
                            <Select
                              value={calculationFrequency}
                              onChange={handleCalculationFrequencyChange}
                            >
                              {DepreciationOptions.calculationFrequencies.map(
                                (frequency) => (
                                  <Option key={frequency} value={frequency}>
                                    {frequency}
                                  </Option>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Divider />

                  {TableData &&
                    TableData.map((item) => (
                      <div key={item.id}>
                        <Typography
                          level="h4"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                        >
                            <div style={{ width: 25, height: 25, color: "#FBC21E" }}>
                          <item.icon />
                          </div>
                          <span style={{ marginLeft: "8px" }}>
                            {item.title}
                          </span>
                        </Typography>
                        <Typography>{item.description}</Typography>

                        <Box sx={{ marginLeft: "150px" }}>
                          <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Box>
                              <FormLabel>{item.formLabel}</FormLabel>
                            </Box>
                            <RadioGroup
                              name={item.title}
                              onChange={handleOptionChange}
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                ml: 2,
                                gap: 2,
                              }}
                            >
                              {item.options.map((opt) => (
                                <Box>
                                  <Radio
                                    key={opt.value}
                                    value={opt.value}
                                    label={opt.label}
                                  />
                                </Box>
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Box>
                        <Divider />
                      </div>
                    ))}

                  <Divider />

                  <div>
                    <Typography
                      level="h4"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        marginTop: "10px",
                      }}
                    >
                        {/* <div style={{ width: 25, height: 25, color: "#FBC21E" }}>
                      <LinkingOptions.icon  />
                      </div> */}
                      <span style={{ marginLeft: "8px" }}>
                        {LinkingOptions.title}
                      </span>
                    </Typography>
                    <Typography>{LinkingOptions.description} </Typography>

                    <Box sx={{ marginLeft: "150px" }}>
                    <FormControl
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <FormLabel>{LinkingOptions.formLabel}</FormLabel>
                      </Box>
                      <RadioGroup
                        defaultValue="No"
                        value={enableLinking}
                        onChange={handleEnableLinkingChange}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          ml: 2,
                          gap: 2,
                        }}
                      >
                        {LinkingOptions.options.map((option) => (
                          <Box>
                            <Radio
                              key={option.value}
                              value={option.value}
                              label={option.label}
                            />
                          </Box>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    </Box>
                    {enableLinking === "Yes" && (
                      <Box>
                        <Typography>
                          When you define linked assets, you can mark them
                          Transact as a whole...
                        </Typography>
                        <FormControl component="fieldset">
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <HowToRegOutlinedIcon   /> Check-out
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <CalendarMonthOutlinedIcon  /> Reservation
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <CalendarMonthOutlinedIcon  /> Lease
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <TuneOutlinedIcon  /> Lost/Found'
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <TuneOutlinedIcon  /> Repair assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <TuneOutlinedIcon  /> Broken assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <TuneOutlinedIcon  /> Dispose
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <TuneOutlinedIcon  /> Donate
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <TuneOutlinedIcon  /> Sell assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <TuneOutlinedIcon  /> Audit assets
                          </Box>
                        </FormControl>
                      </Box>
                    )}
                  </div>

                  <Divider />

                  <Grid xs={12} md={4}>
                    <React.Fragment>
                      <Box
                        sx={{
                          marginTop: "1px",
                          marginBottom: "15px",
                          padding: "20px",
                        }}
                      >
                        <ButtonGroup
                          spacing="1rem"
                          aria-label="spacing button group"
                          sx={{ paddingLeft: "70%", marginRigth: "80%" }}
                        >
                          <Button sx={{ fontSize: "15px" }}>
                            <NavigateBeforeOutlinedIcon />
                            Back
                          </Button>
                          <Button
                            sx={{
                              fontSize: "15px",
                              ml: "10px",
                              background: "#FABC1E",
                              color: "black",

                              "&:hover": { background: "#E1A91B" },
                            }}
                            onClick={handleSubmit}
                          >
                            Submit
                            <NavigateNextOutlinedIcon />{" "}
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </React.Fragment>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};
export default SetupTableOptions;
