import React from "react";
import { useState } from "react";
import { Box, Tabs, Tab, TabList, TabPanel, Drawer } from "@mui/joy";
import IconButton from "@mui/material/IconButton"; // Corrected import
import Menu from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery } from "@mui/material";

import Details from "./Tabs/Details";
import Event from "./Tabs/Event";
import Photos from "./Tabs/Photos";
import Documents from "./Tabs/Documents";
import Warranty from "./Tabs/Warranty";
import Linking from "./Tabs/Linking";
import Maintenance from "./Tabs/Maintenance";
import Reserve from "./Tabs/Reserve";
import Audit from "./Tabs/Audit";
import History from "./Tabs/History";

const EditAssetDetails: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Details");
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabsChange = (
    event: React.SyntheticEvent<Element, Event> | null,
    newValue: string | number | null
  ) => {
    if (typeof newValue === "string") {
      setSelectedTab(newValue);
      setOpen(false);
    }
  };

  const renderTabList = (isVertical = false) => (
    <TabList
      underlinePlacement="bottom"
      sx={{
        display: "flex",
        flexDirection: isVertical ? "column" : "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <Tab
        variant="none"
        color="none"
        value="Details"
        indicatorPlacement="bottom"
      >
        Details
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="Events"
        indicatorPlacement="bottom"
      >
        Events
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="Photos"
        indicatorPlacement="bottom"
      >
        Photos
      </Tab>
      <Tab variant="none" color="none" value="Docs" indicatorPlacement="bottom">
        Docs.
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="Warranty"
        indicatorPlacement="bottom"
      >
        Warranty
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="Linking"
        indicatorPlacement="bottom"
      >
        Linking
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="Maintt"
        indicatorPlacement="bottom"
      >
        Maintt.
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="Reserve"
        indicatorPlacement="bottom"
      >
        Reserve
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="Audit"
        indicatorPlacement="bottom"
      >
        Audit
      </Tab>
      <Tab
        variant="none"
        color="none"
        value="History"
        indicatorPlacement="bottom"
      >
        History
      </Tab>
    </TabList>
  );

  const renderTabPanels = () => (
    <>
      <TabPanel value="Details">
        <Details />
      </TabPanel>
      <TabPanel value="Events">
        <Event />
      </TabPanel>
      <TabPanel value="Photos">
        <Photos />
      </TabPanel>
      <TabPanel value="Docs">
        <Documents />
      </TabPanel>
      <TabPanel value="Warranty">
        <Warranty />
      </TabPanel>
      <TabPanel value="Linking">
        <Linking />
      </TabPanel>
      <TabPanel value="Maintt">
        <Maintenance />
      </TabPanel>
      <TabPanel value="Reserve">
        <Reserve />
      </TabPanel>
      <TabPanel value="Audit">
        <Audit />
      </TabPanel>
      <TabPanel value="History">
        <History />
      </TabPanel>
    </>
  );

  return (
    <>
     <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          mt: "30px",
          padding: "20px",
        }}
      >
      {isSmallScreen ? (
        <>
          <IconButton onClick={() => setOpen(true)}>
            <Menu />
          </IconButton>

            <Drawer open={open} onClose={() => setOpen(false)} size={"sm"}>
              <Tabs
                value={selectedTab}
                onChange={handleTabsChange}
                sx={{ background: "#ffffff" }}
                orientation="vertical"
              >
                {renderTabList(true)}
              </Tabs>
            </Drawer>
        </>
      ) : null}

     
        <Tabs
          value={selectedTab}
          onChange={handleTabsChange}
          sx={{ background: "#ffffff" }}
        >
          {!isSmallScreen && renderTabList()}
          {renderTabPanels()}
        </Tabs>
      </Box>
    </>
  );
};

export default EditAssetDetails;
