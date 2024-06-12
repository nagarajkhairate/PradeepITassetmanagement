

import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  Divider,
  Grid,
  ButtonGroup,
} from "@mui/joy";
// import { VscSettings } from "react-icons/vsc";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
// import { PiLinkBreakLight } from "react-icons/pi";
// import { PiRecycleLight } from "react-icons/pi";
// import { FaRegHeart } from "react-icons/fa";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import Buttonss from "./Buttonss";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

interface EventOptionProps {
  companyFormData: any;
  setCompanyFormData: any;
  activeTab: number;
  setActiveTab: (tab: number) => void;
}
const options = [
  {
    id: 1,
    value: "Yes",
  },
  {
    id: 2,
    value: "No",
  },
]


interface EventSection {
  key: string;
  icon: React.ReactNode;
  companyFormData: boolean;
  setupText: string;
}

interface CustomButtonBoxProps {
  setupCheckoutText: string;
  customizeFormText: string;
}

type companyFormDataState = {
  checkout: boolean;
  lease: boolean;
  lostFound: boolean;
  repair: boolean;
  broken: boolean;
  dispose: boolean;
  donate: boolean;
  sell: boolean;
};

interface AssetRadioGroupProps {
  name:string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const EventOption: React.FunctionComponent<EventOptionProps> = ({
  companyFormData,
  setCompanyFormData,
  activeTab,
  setActiveTab,
}) => {


const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCompanyFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = () => {

   

    console.log(JSON.stringify(companyFormData));
  };

  const AssetRadioGroup: React.FC<AssetRadioGroupProps> = ({
    name,
    onChange,
    value,
  }) => (
    <RadioGroup
    name={name}
      defaultValue="outlined"
      onChange={onChange}
      value={value}
    >
      <Box>
      {options &&
                                  options.map((option, index) => (
                                    <Radio
                                      name={name}
                                      onChange={HandleRadioSelect}
                                      key={index}
                                      value={option.value}
                                      label={option.value}
                                      variant="outlined"
                                    />
                                  ))}
        {/* <Radio value="Yes" label="Yes" variant="outlined" sx={{ mr: "15px" }} />
        <Radio value="No" label="No" variant="outlined" /> */}
      </Box>
    </RadioGroup>
  );

  const CustomButtonBox: React.FC<CustomButtonBoxProps> = ({
    setupCheckoutText,
    customizeFormText,
  }) => {
    return (
      <Box>
        <a href="_blank">
          <Button
            sx={{
              mr: "10px",
              background: "#FDE8BC",
              border: "1px solid #C2B083",
              color: "black",
              borderRadius: "15px",
              "&:hover": {
                background: "#FADFB4",
              },
            }}
          >
            {setupCheckoutText}
          </Button>
        </a>
        <a href="_blank">
          <Button
            sx={{
              background: "#ffffff",
              color: "green",
              border: "1px solid green ",
              borderRadius: "15px",
              "&:hover": {
                color: "white",
                background: "green",
              },
            }}
          >
            {customizeFormText}
          </Button>
        </a>
      </Box>
    );
  };

  // const handleNextTab = () => {
  //   setActiveTab(activeTab + 1);
  // };

  const handlePrevTab = () => {
    setActiveTab(activeTab - 1);
  };

  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Typography level="h3">
            {" "}
            {/* <VscSettings size={23} /> */}
             Step 7 - Event Options

          </Typography>
          <Box
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              margin: {
                xs: "4px",
                md: "52px",
              },
              p: "20px",
            }}
          >
            <Box sx={{ ml: "20px", p: "10px" }}>
              <Typography level="body-md">Asset-related Events</Typography>
            </Box>

            <Box sx={{ ml: "20px", py: "10px" }}>
              <Typography level="body-sm">
                Do you want to register these event for the assets?
              </Typography>
            </Box>
            <Divider></Divider>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  <HowToRegOutlinedIcon /> Check-out assets:
                </Typography>
              </Box>
              <AssetRadioGroup
              name='checkout'
                onChange={HandleRadioSelect}
                value={companyFormData.checkout}
              />
              <>
                  <CustomButtonBox
                    setupCheckoutText="Setup 'Check out'"
                    customizeFormText="Customize Form"
                  />
                  <CustomButtonBox
                    setupCheckoutText="Setup 'Check in'"
                    customizeFormText="Customize Form"
                  />
                </>
         
            </Box>

            <Box
              sx={{ ml: { md: "260px", xs: "none" }, paddingBottom: "20px" }}
            >
              <Typography level="body-xs">
                Assets are 'checked out' or 'assigned to' individuals. Enter
                individuals in 'Advanced &gt; Persons/Employee' table.{" "}
              </Typography>
            </Box>
            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  <SendTwoToneIcon /> Lease assets:
                </Typography>
              </Box>
              <AssetRadioGroup
              name='lease'
              onChange={HandleRadioSelect}
                
                value={companyFormData.lease}
              />
              
                <>
                  <CustomButtonBox
                    setupCheckoutText="Setup 'Lease'"
                    customizeFormText="Customize Form"
                  />
                  <CustomButtonBox
                    setupCheckoutText="Setup 'Lease return'"
                    customizeFormText="Customize Form"
                  />
                </>
              
            </Box>
            <Box
              sx={{ ml: { md: "260px", xs: "none" }, paddingBottom: "20px" }}
            >
              <Typography level="body-xs">
                Assets are 'leased' or 'rented/loaned' to customers. Maintain a
                list of customers in the 'Advanced &gt; Customers' table.
              </Typography>
            </Box>
            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  <ThumbDownAltOutlinedIcon /> Lost/Found assets:
                </Typography>
              </Box>
              <AssetRadioGroup
              name='lostFound'
              onChange={HandleRadioSelect}
               
                value={companyFormData.lostFound}
              />
             
                <>
                  <CustomButtonBox
                    setupCheckoutText="Setup 'Lost/Missing'"
                    customizeFormText="Customize Form"
                  />
                  <CustomButtonBox
                    setupCheckoutText="Setup Found"
                    customizeFormText="Customize Form"
                  />
                </>
              
            </Box>

            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  <ConstructionOutlinedIcon /> Repair assets:
                </Typography>
              </Box>
              <AssetRadioGroup
              name='repair'
              onChange={HandleRadioSelect}
               
                value={companyFormData.repair}
              />
              
                <CustomButtonBox
                  setupCheckoutText="Setup 'Repair'"
                  customizeFormText="Customize Form"
                />
            
            </Box>
            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  {/* <PiLinkBreakLight />  */}
                  Broken assets:
                </Typography>
              </Box>
              <AssetRadioGroup
               name='broken'
               onChange={HandleRadioSelect}
                
                
                value={companyFormData.broken}
              />
             
                <CustomButtonBox
                  setupCheckoutText="Setup 'Broken'"
                  customizeFormText="Customize Form"
                />
              
            </Box>

            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  {/* <PiRecycleLight />  */}
                  Dispose assets:
                </Typography>
              </Box>
              <AssetRadioGroup
              name='dispose'
              onChange={HandleRadioSelect}
               
                
                value={companyFormData.dispose}
              />
             
                <CustomButtonBox
                  setupCheckoutText="Setup 'Dispose'"
                  customizeFormText="Customize Form"
                />
              
            </Box>

            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  {/* <FaRegHeart />  */}
                  Donate assets:
                </Typography>
              </Box>
              <AssetRadioGroup
              name='donate'
              onChange={HandleRadioSelect}
               
               
                value={companyFormData.donate}
              />
             
                <CustomButtonBox
                  setupCheckoutText="Setup 'Donate"
                  customizeFormText="Customize Form"
                />
              
            </Box>

            <Divider></Divider>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { md: "row", xs: "column" },
                gap: { md: "none", xs: "10px" },
                justifyContent: "space-around",
                py: "20px",
              }}
            >
              <Box>
                <Typography level="body-sm">
                  <GavelOutlinedIcon /> Sell assets:
                </Typography>
              </Box>
              <AssetRadioGroup
               name='sell'
               onChange={HandleRadioSelect}
                
                
                
                value={companyFormData.sell}
              />
             
                <CustomButtonBox
                  setupCheckoutText="Setup 'Sell'"
                  customizeFormText="Customize Form"
                />
              
            </Box>
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
                    sx={{ paddingLeft: "70%",marginRigth: "80%"}}
                  >
                    <Button sx={{ fontSize: "15px" }} onClick={handlePrevTab}>
                      <NavigateBeforeOutlinedIcon />
                      Cancel
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
                      Finish
                      <NavigateNextOutlinedIcon />{" "}
                    </Button>
                  </ButtonGroup>
                </Box>
              </React.Fragment>
            </Grid>
          </Box>
        </div>
      </div>
    </>
  );
};

export default EventOption;
