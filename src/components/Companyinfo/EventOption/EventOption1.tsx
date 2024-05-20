import React, { useState } from "react";
import { Typography, Box, Button, Radio, RadioGroup, Divider } from "@mui/joy";
import { VscSettings } from "react-icons/vsc";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { PiLinkBreakLight } from "react-icons/pi";
import { PiRecycleLight } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import Buttonss from "./Buttonss";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

interface CustomButtonBoxProps {
  setupCheckoutText: string;
  customizeFormText: string;
}

type VisibilityState = {
  checkoutButtons: boolean;
  leaseButtons: boolean;
  lostFoundButtons: boolean;
  repairButtons: boolean;
  brokenButtons: boolean;
  disposeButtons: boolean;
  donateButtons: boolean;
  sellButtons: boolean;
};

interface AssetRadioGroupProps {
  onChange: (show: boolean) => void;
  value: string;
}

const EventOption1: React.FC = () => {
  const [visibility, setVisibility] = useState<VisibilityState>({
    checkoutButtons: true,
    leaseButtons: true,
    lostFoundButtons: true,
    repairButtons: true,
    brokenButtons: true,
    disposeButtons: true,
    donateButtons: true,
    sellButtons: true,
  });

  const handleVisibilityChange = (
    section: keyof VisibilityState,
    show: boolean
  ) => {
    setVisibility((prevState) => ({
      ...prevState,
      [section]: show,
    }));
  };

  const handleSubmit = () => {
    const tableData = {
      checkoutButtons: visibility.checkoutButtons,
      leaseButtons: visibility.leaseButtons,
      lostFoundButtons: visibility.lostFoundButtons,
      repairButtons: visibility.repairButtons,
      brokenButtons: visibility.brokenButtons,
      disposeButtons: visibility.disposeButtons,
      donateButtons: visibility.donateButtons,
      sellButtons: visibility.sellButtons,
    };
    console.log(JSON.stringify(tableData));
  };

  const AssetRadioGroup: React.FC<AssetRadioGroupProps> = ({
    onChange,
    value,
  }) => (
    <RadioGroup
      defaultValue="outlined"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value === "Yes")
      }
      value={value}
    >
      <Box>
        <Radio
          value="Yes"
          label="Yes"
          variant="outlined"
          sx={{ mr: "15px" }}
        />
        <Radio value="No" label="No" variant="outlined" />
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

  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Typography level="h3">
            {" "}
            <VscSettings size={23} /> Step 7 - Event Options
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
                onChange={(show) => handleVisibilityChange("checkoutButtons", show)}
                value={visibility.checkoutButtons ? "Yes" : "No"} 
              />
              {visibility.checkoutButtons && (
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
              )}
            </Box>

            <Box sx={{ ml: { md: "260px", xs: "none" }, paddingBottom: "20px" }}>
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
                onChange={(show) => handleVisibilityChange("leaseButtons", show)}
                value={visibility.leaseButtons ? "Yes" : "No"} 
              />
              {visibility.leaseButtons && (
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
              )}
            </Box>
            <Box sx={{ ml: { md: "260px", xs: "none" }, paddingBottom: "20px" }}>
              <Typography level="body-xs">
                Assets are 'leased' or 'rented/loaned' to customers. Maintain a list of customers in the 'Advanced &gt; Customers' table.
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
                onChange={(show) => handleVisibilityChange("lostFoundButtons", show)}
                value={visibility.lostFoundButtons ? "Yes" : "No"}
              />
              {visibility.lostFoundButtons && (
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
              )}
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
                  <ConstructionOutlinedIcon  /> Repair assets:
                </Typography>
              </Box>
              <AssetRadioGroup
                onChange={(show) => handleVisibilityChange("repairButtons", show)}
                value={visibility.repairButtons ? "Yes" : "No"}
              />
              {visibility.repairButtons && (
                <CustomButtonBox
                  setupCheckoutText="Setup 'Repair'"
                  customizeFormText="Customize Form"
                />
              )}
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
                  <PiLinkBreakLight /> Broken assets:
                </Typography>
              </Box>
              <AssetRadioGroup
                onChange={(show) => handleVisibilityChange("brokenButtons", show)}
                value={visibility.brokenButtons ? "Yes" : "No"}
              />
              {visibility.brokenButtons && (
                <CustomButtonBox
                  setupCheckoutText="Setup 'Broken'"
                  customizeFormText="Customize Form"
                />
              )}
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
                  <PiRecycleLight /> Dispose assets:
                </Typography>
              </Box>
              <AssetRadioGroup
                onChange={(show) => handleVisibilityChange("disposeButtons", show)}
                value={visibility.disposeButtons ? "Yes" : "No"}
              />
              {visibility.disposeButtons && (
                <CustomButtonBox
                  setupCheckoutText="Setup 'Dispose'"
                  customizeFormText="Customize Form"
                />
              )}
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
                  <FaRegHeart /> Donate assets:
                </Typography>
              </Box>
              <AssetRadioGroup
                onChange={(show) => handleVisibilityChange("donateButtons", show)}
                value={visibility.donateButtons ? "Yes" : "No"}
              />
              {visibility.donateButtons && (
                <CustomButtonBox
                  setupCheckoutText="Setup 'Donate"
                  customizeFormText="Customize Form"
                />
              )}
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
                onChange={(show) => handleVisibilityChange("sellButtons", show)}
                value={visibility.sellButtons ? "Yes" : "No"}
              />
              {visibility.sellButtons && (
                <CustomButtonBox
                  setupCheckoutText="Setup 'Sell'"
                  customizeFormText="Customize Form"
                />
              )}
            </Box>
            <Divider></Divider>

            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                py: "20px",
              }}
            >  
            
            </Box>
              <Buttonss handleSubmit={handleSubmit} />
          </Box>
        </div>
      </div>
    </>
  );
};

export default EventOption1;