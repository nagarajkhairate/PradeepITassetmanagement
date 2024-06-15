import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import {Box,Typography,Divider,Select,Option,Radio,RadioGroup,FormControl,FormLabel,Checkbox,Button,ButtonGroup, Grid,} from "@mui/joy";
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { TableInfoData } from "./TableInfoData";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined'
import AppView from "../../Common/AppView";

const DepreciationOptions = {
  "id": 1,
  "title": "Depreciation",
  "description":
    "Depreciation is used to expense the cost of your assets over their useful life...",
  "formLabel": "Asset Depreciation",
  "icon": CalendarMonthOutlinedIcon,
  "options": [
    { "name": "assetDepreciation", "value": "yes", "label": "Yes" },
    { "name": "assetDepreciation", "value": "no", "label": "No" },
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
    { "name": "enableLinking", "value": "yes", "label": "Yes" },
    { "name": "enableLinking", "value": "no", "label": "No" },
  ],
};
interface TableProps {
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const TableOptions: React.FC<TableProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {
  const [showDepreciationOptions, setShowDepreciationOptions] = useState(false);
  const [depreciationMethod, setDepreciationMethod] = useState("");
  const [calculationFrequency, setCalculationFrequency] = useState("");
  const [enableLinking, setEnableLinking] = useState("no");
  const [linkedAssets, setLinkedAssets] = useState({
    checkout: false,
    reservation: false,
    leaseAssets: false,
    lostFoundAssets: false,
    repairAssets: false,
    brokenAssets: false,
    disposeAssets: false,
    donateAssets: false,
    sellAssets: false,
    auditAssets: false,
  });
  const [formDataState, setFormDataState] = useState<any>({
    assetDepreciation: "no",
    depreciationMethod: "",
    calculationFrequency: "",
    enableLinking: "no",
  });
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

 
  const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShowDepreciationOptions(value === "yes");
    setFormDataState((prevData: any) => ({
      ...prevData,
      assetDepreciation: value,
    }));
  };
  
  const handleDepreciationMethodChange = (
    event: SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setDepreciationMethod(newValue);
    }
  };

  const handleCalculationFrequencyChange = (
    event: SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null)
      { setCalculationFrequency(newValue);
    }
  };

  const handleEnableLinkingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEnableLinking(value);
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLinkedAssets((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setLinkedAssets((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

      const buildFormData = () => {
        const formData : any = {
         
          DepreciationOptions: {
            assetDepreciation: formDataState.assetDepreciation,
          },
          TableInfoData: TableInfoData.map((item) => ({
            title: item.title,
            selectedOption: formDataState[item.title],
          })),
          LinkingOfAssets: {
            enableLinking: enableLinking,
          },
        
      };
    
        if (formDataState.assetDepreciation === "yes") {
          formData.DepreciationOptions.depreciationMethod = depreciationMethod;
          formData.DepreciationOptions.calculationFrequency = calculationFrequency;
        }
        
        if (enableLinking === "yes") {
          formData.LinkingOfAssets.linkedAssets = {
            checkout: linkedAssets.checkout,
            reservation: linkedAssets.reservation,
            leaseAssets: linkedAssets.leaseAssets,
            lostFoundAssets: linkedAssets.lostFoundAssets,
            repairAssets: linkedAssets.repairAssets,
            brokenAssets: linkedAssets.brokenAssets,
            disposeAssets: linkedAssets.disposeAssets,
            donateAssets: linkedAssets.donateAssets,
            sellAssets: linkedAssets.sellAssets,
            auditAssets: linkedAssets.auditAssets,
          };
        }
    
        return formData;
      };
    
 const handleNextTab = () => {
  const formData = buildFormData();
  setCompanyFormData((prev: any) => ({
    ...prev,
    TableOptions: formData,
  }));
  setActiveTab(activeTab + 1);
};

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
}; 

    // console.log(JSON.stringify(companyFormData, null, 2));
    // console.log(JSON.stringify(formData, null, 2));
  return (
    <AppView>
      <Box sx={{boxSizing:"border-box"}}>
      <Typography level="h4" style={{ display: 'flex', alignItems: 'center' }}>
        <TableChartOutlinedIcon style={{ fontSize: '1.4rem', color: '#FBC21E' }} />
        Table-Options
      </Typography>
      </Box>

      <div>
        <Box
          sx={{
            borderRadius: 'none',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            background: '#ffffff',
            gap: '5px',
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
                  <Box >
                    <Box>
                      <FormControl
                       sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom:"10px"
                      }}
                      >
                        <Box>
                        <FormLabel>  
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
                         <Typography>
                          Select the default depreciation method to be used for most assets. You still have the option to override and choose another depreciation method when creating assets.
                        </Typography>
                          <Box>
                            <FormControl >
                              <FormLabel>Default Depreciation Method</FormLabel>
                              <Select
                              defaultValue=""
                              value={depreciationMethod}
                              onChange={handleDepreciationMethodChange}
                              placeholder="Straight Line"
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
                          </Box>
                         
                            <FormControl>
                              <FormLabel>Calculation Frequency</FormLabel>
                              <Select
                              
                                value={calculationFrequency}
                                onChange={handleCalculationFrequencyChange}
                                placeholder="Yearly"
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

                  {TableInfoData &&
                    TableInfoData.map((item) => (
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
                          <span style={{ marginLeft: "8px" }}>{item.title}</span>
                        </Typography>
                        <Typography>{item.description}</Typography>

                        <Box>
                          <FormControl
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              marginBottom:"10px"
                            }}
                          >
                            <Box>
                            <FormLabel>{item.formLabel}</FormLabel>
                            </Box>
                            <RadioGroup  name={item.title}
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
                     
                     <span style={{ marginLeft: "8px" }}>
                        {LinkingOptions.title}
                      </span>
                    </Typography>
                    <Typography>{LinkingOptions.description} </Typography>

                    <Box>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom:"10px"
                        }}
                      >
                        <Box>
                        <FormLabel>{LinkingOptions.formLabel}</FormLabel>
                          </Box>
                        <RadioGroup
                          defaultValue="no"
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

                    {enableLinking === "yes" && (
                      <Box>
                        <Typography>
                        When you define linked assets, you can mark them
                        Transact as a whole...
                         </Typography>

                        <FormControl component="fieldset">
                          <Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox 
                            name="checkout"
                            onChange={handleCheckboxChange}
                            />
                            <HowToRegOutlinedIcon  /> Check-out
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox
                              name="reservation"
                              onChange={handleCheckboxChange}
                            />
                            <CalendarMonthOutlinedIcon  /> Reservation
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox 
                            name="leaseAssets"
                            onChange={handleCheckboxChange}/>
                            <CalendarMonthOutlinedIcon  /> Lease assets
                         
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox 
                            name="lostFoundAssets"
                            onChange={handleCheckboxChange}/>
                            <TuneOutlinedIcon  /> Lost/Found'assets
                           
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox 
                             name="repairAssets"
                             onChange={handleCheckboxChange}/>
                            <TuneOutlinedIcon  /> Repair assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox 
                            name="brokenAssets"
                            onChange={handleCheckboxChange}/>
                            <TuneOutlinedIcon  /> Broken assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox 
                            name="disposeAssets"
                            onChange={handleCheckboxChange}/>
                            <TuneOutlinedIcon  /> Dispose
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox
                            name="donateAssets"
                            onChange={handleCheckboxChange} />
                            <TuneOutlinedIcon  /> Donate
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox
                            name="sellAssets" 
                            onChange={handleCheckboxChange}/>
                            <TuneOutlinedIcon  /> Sell assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox 
                            name="auditAssets"
                            onChange={handleCheckboxChange}/>
                            <TuneOutlinedIcon  /> Audit assets
                          </Box>
                          </Box>
                        </FormControl>
                      </Box>
                    )}
                  </div>

                  <Divider />

                  <Grid xs={12} md={12}>
              <React.Fragment>
                <Box
                 sx={{
                  marginTop:"20px",
                  display: 'flex',
                  flexDirection: { md: 'row', xs: 'column' },
                  justifyContent: { xs: 'center', md: "flex-end" },
                  }}
                >
                    <Button 
                    onClick={handlePrevTab}
                      sx={{
                        background:"White",
                        borderBlock:"black",
                       color: "black",
                       "&:hover": { background: "#d9d9d9" },
                      }}
                      >
                      <NavigateBeforeOutlinedIcon />
                      Back
                    </Button>

                    <Button
                     onClick={handleNextTab}
                     sx={{
                      background: "#FABC1E",
                      color: "black",
                      "&:hover": { background: "#E1A91B" },
                    }}
                    >
                      Continue
                      <NavigateNextOutlinedIcon />{" "}
                    </Button>
               
                </Box>
              </React.Fragment>
            </Grid>

                  {/* <Box
                    sx={{
                      marginTop: "1px",
                      marginBottom: "15px",
                      padding: "20px",
                    }}
                  >
                    <ButtonGroup
                      spacing="1rem"
                      aria-label="spacing button group"
                      sx={{ paddingLeft: "85%" }}
                    >
                      <Button sx={{ fontSize: "15px" }}
                      onClick={handlePrevTab}
                      >
                        <FaLessThan />
                        Back
                      </Button>
                      <Button sx={{ background: "#FABC1E", fontSize: "15px" }}
                      onClick={handleNextTab}
                      >
                          Continue
                        <FaGreaterThan />{" "}
                      </Button>
                    </ButtonGroup>
                  </Box> */}
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </div>
    </AppView>
  );
};
export default TableOptions;