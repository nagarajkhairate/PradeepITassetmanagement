import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import {Box,Typography,Divider,Select,Option,Radio,RadioGroup,FormControl,FormLabel,Checkbox,Button,ButtonGroup,} from "@mui/joy";
import { RxCalendar } from "react-icons/rx";
import { SlEqualizer } from "react-icons/sl";
import { MdAddLink } from "react-icons/md";
import { FaLessThan, FaGreaterThan } from "react-icons/fa6";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { AiOutlineUserSwitch, AiFillDelete, AiFillGift } from "react-icons/ai";
import { BiPackage, BiSearchAlt2 } from "react-icons/bi";
import { RiToolsFill, RiAlertFill } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { CompanyInfData } from "./TableInfoData";

interface TableProps {
  tableFormData: any;
  setTableFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

const TableOptions: React.FC<TableProps> = ({
  tableFormData,
  setTableFormData,
  activeTab,
  setActiveTab,
}) => {
  const [showDepreciationOptions, setShowDepreciationOptions] =
    useState<boolean>(false);
  const [depreciationMethod, setDepreciationMethod] = useState<string>("");
  const [calculationFrequency, setCalculationFrequency] = useState<string>("");
  const [enableLinking, setEnableLinking] = useState<string>("No");
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

 
  const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShowDepreciationOptions(value === "Yes");
    setFormData((prevState) => ({ ...prevState, assetDepreciation: value }));
  };
  
  const handleDepreciationMethodChange = (
    event: SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null) {
      setDepreciationMethod(newValue);
      setFormData((prevState) => ({ ...prevState, depreciationMethod: newValue }));
    }
  };

  const handleCalculationFrequencyChange = (
    event: SyntheticEvent | null,
    newValue: string | null
  ) => {
    if (newValue !== null)
      { setCalculationFrequency(newValue);
    setFormData((prevState) => ({ ...prevState, calculationFrequency: newValue }));
    }
  };

  const handleEnableLinkingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEnableLinking(value);
    setFormData((prevState) => ({ ...prevState, enableLinking: value }));
  };

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleNextTab = () => {
    console.log("Form Data:", formData);
    setActiveTab(activeTab + 1); // Update this to navigate to the next tab
  };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
};

  return (
    <>
      <Box sx={{ mb: "10px" }}>
        <Typography
          level="h3"
          sx={{
            marginLeft: { xs: "10px", md: "50px" },
            fontSize: { xs: "24px", md: "32px" },
            marginTop: { xs: "20px", md: "35px" },
            display: "flex",
            alignItems: "center",
            marginBottom: { xs: "-20px", md: "-42px" },
          }}
        >
          <SlEqualizer size={35} color="red" /> Step 7- Table Options
        </Typography>
      </Box>

      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <Box
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
            margin: {
              xs: "4px",
              md: "52px",
            },
          }}
        >
          <Box>
            
            <Divider />
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
                  <b>AssetTiger</b> lets you decide how comprehensive you want your system. Use these Options to fashion your ideal asset tracking and create more reports.
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
                    <div style={{ width: 25, height: 25, color: "red" }}>
                      <RxCalendar />
                    </div>

                    <span style={{ marginLeft: "8px" }}>Depreciation</span>
                  </Typography>
                  <Typography>
                    Depreciation is used to expense the cost of your assets over their useful life. If you would like to track the depreciation of assets, select <b>Yes</b> and define your default depreciation method and calculation frequency.
                  </Typography>
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
                          <FormLabel> Asset Depreciation: </FormLabel>
                        </Box>
                        <RadioGroup
                          defaultValue="outlined"
                          onChange={handleDepreciationChange}
                        >
                          <Box>
                            <Radio
                              value="Yes"
                              label="Yes"
                              variant="outlined"
                              sx={{ mr: "10px" }}
                            />
                            <Radio value="No" label="No" variant="outlined" />
                          </Box>
                        </RadioGroup>
                      </FormControl>
                      {showDepreciationOptions && (
                        <>
                         <Typography>
                          Select the default depreciation method to be used for most assets. You still have the option to override and choose another depreciation method when creating assets.
                        </Typography>
                          <Box>
                            <FormControl sx={{ width: "50%" }}>
                              <FormLabel>Default Depreciation Method</FormLabel>
                              <Select
                              defaultValue=""
                              value={depreciationMethod}
                              onChange={handleDepreciationMethodChange}
                              placeholder="Straight Line"
                            >
                              <Option value="Straight Line">Straight Line</Option>
                              <Option value="Declining-Balance">Declining Balance</Option>
                              <Option value="Double Declining">Double Declining</Option>
                              <Option value="Balance">Balance</Option>
                              <Option value="150% Declining Balance">150% Declining Balance</Option>
                            </Select>
                            </FormControl>
                          </Box>
                          <Box>
                            <FormControl sx={{ width: "50%" }}>
                              <FormLabel>Calculation Frequency</FormLabel>
                              <Select
                                defaultValue=""
                                value={calculationFrequency}
                                onChange={handleCalculationFrequencyChange}
                                // label="Calculation Frequency"
                                placeholder="Yearly"
                              >
                                <Option value="Yearly">Yearly</Option>
                                <Option value="monthly">Monthly</Option>
                                <Option value="quarterly">Quarterly</Option>
                              </Select>
                            </FormControl>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>

                  <Divider />

                  {CompanyInfData &&
                    CompanyInfData.map((item) => (
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
                          <item.icon size={25} color="red" />
                          <span style={{ marginLeft: "8px" }}>{item.title}</span>
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
                            <RadioGroup defaultValue="No"
                            sx={{ display: "flex", flexDirection: "row", ml: 2 }}
                            >
                              <Box>
                                {item.options.map((option) => (
                                  <Radio
                                    key={option.value}
                                    value={option.value}
                                    name={option.name}
                                    label={option.label}
                                    sx={{ mr: "10px" }}
                                    checked={formData[option.name] === option.value}
                                    onChange={handleOptionChange}
                                  />
                                ))}
                              </Box>
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
                      <MdAddLink size={25} color="red" />
                      <span style={{ marginLeft: "8px" }}>Linking of Assets</span>
                    </Typography>
                    <Typography>
                      Enable the ability to link assets to have a parent-child relationship. To assign multiple assets that are related to each other and/or function as a whole, assign one asset as the parent, the rest of them as the children, and the group will stay linked. You can either have these assets function as one unit or have them associated but able to move independently.
                    </Typography>

                    <Box sx={{ marginLeft: "150px" }}>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <FormLabel>Enable Linking of Assets.</FormLabel>
                          </Box>
                        <RadioGroup
                          defaultValue="No"
                          value={enableLinking}
                          onChange={handleEnableLinkingChange}
                          sx={{ display: "flex", flexDirection: "row", ml: 2 }}
                        >
                          <Box>
                            <Radio
                              value="Yes"
                              label="Yes"
                              sx={{ mr: "10px" }}
                            />
                            <Radio value="No" label="No" variant="outlined" />
                          </Box>
                        </RadioGroup>
                      </FormControl>
                    </Box>

                    {enableLinking === "Yes" && (
                      <Box>
                        <Typography>
                          When you define linked assets, you can mark them Transact as a whole, which groups these assets and make them function as one unit. Select the events that are performed on a group of linked assets as one unit:
                        </Typography>
                        <FormControl component="fieldset">
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <BsBoxArrowInLeft size={20} color="red" /> Check-out
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <AiOutlineUserSwitch size={20} color="red" /> Lease
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <BiPackage size={20} color="red" /> Lost/Found
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <RiToolsFill size={20} color="red" /> Repair assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <RiAlertFill size={20} color="red" /> Broken assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <AiFillDelete size={20} color="red" /> Dispose
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <GiReceiveMoney size={20} color="red" /> Donate
                            assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <AiFillGift size={20} color="red" /> Sell assets
                          </Box>
                          <Box marginBottom={"10px"}>
                            <Checkbox />
                            <BiSearchAlt2 size={20} color="red" /> Audit assets
                          </Box>
                        </FormControl>
                      </Box>
                    )}
                  </div>

                  <Divider />

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
                      sx={{ paddingLeft: "85%" }}
                    >
                      <Button sx={{ fontSize: "15px" }}
                      onClick={handlePrevTab}
                      >
                        <FaLessThan />
                        Back
                      </Button>
                      <Button sx={{ background: "#fdd835", fontSize: "15px" }}
                      onClick={handleNextTab}
                      >
                          Continue
                        <FaGreaterThan />{" "}
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};
export default TableOptions;