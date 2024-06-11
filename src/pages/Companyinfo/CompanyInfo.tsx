import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Box, Button, Typography, IconButton } from "@mui/joy";
import LanguageIcon from "@mui/icons-material/Language";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Company from "../../components/Companyinfo/Company/Company";
import Sites from "../../components/Companyinfo/Sites/Sites";
import TableOptions from "../../components/Companyinfo/TableOptions/TableOptions";
import Location from "../../components/Companyinfo/Location/Location";
import Category from "../../components/Companyinfo/Category/Category";
import DataBase from "../../components/Companyinfo/Database/DataBase";
import EventOption from "../../components/Companyinfo/EventOption/EventOption";

const CompanyInfo = () => {
  const [companyFormData, setCompanyFormData] = React.useState({});
  const [siteFormData, setSiteFormData] = React.useState({});
  const [tableFormData, setTableFormData] = React.useState({});
  const [activeTab, setActiveTab] = React.useState(0);


  const tabs = [
    { label: "Company", icon: <LanguageIcon fontSize="large" /> },
    { label: "Sites", icon: <LanguageIcon fontSize="large" /> },
    { label: "Locations", icon: <LanguageIcon fontSize="large" /> },
    { label: "Categories", icon: <LanguageIcon fontSize="large" /> },
    { label: "Database", icon: <LanguageIcon fontSize="large" /> },
    { label: "Table Options", icon: <LanguageIcon fontSize="large" /> },
    { label: "Event Options", icon: <LanguageIcon fontSize="large" /> },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs aria-label="Basic tabs" value={activeTab} sx={{ width: "100%" }}>
          <TabList
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              flexDirection: { xs: "column", sm: "column", md: "row" },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                // disabled={index > activeTab}
                // sx={{
                //   display: "flex",
                //   flexDirection: { xs: "row", sm: "row", md: "column" },
                //   alignItems: "center",
                //   minWidth: "auto",
                //   padding: "8px",
                //   color: activeTab === index ? "red" : "inherit",
                //   width: { xs: "100%", sm: "100%", md: "auto" },
                //   marginBottom: { xs: "8px", sm: "8px", md: "0" },
                // }}
              >
                <IconButton>
                  {React.cloneElement(tab.icon, {
                    style: { color: index <= activeTab ? "#FBC21E" : "inherit" },
                  })}
                  {index < activeTab && (
                    <CheckCircleIcon
                      style={{ color: "green", marginLeft: "4px" , fontSize:"small" }}
                    />
                  )}
                </IconButton>
                <Typography level="h4">{tab.label}</Typography>
              </Tab>
            ))}
          </TabList>
          <TabPanel value={0}>
            <Company
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabPanel>
          <TabPanel value={1}>
            <Sites
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabPanel>
          <TabPanel value={2}>
            <Location
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabPanel>
          <TabPanel value={3}>
          <Category
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabPanel>
          <TabPanel value={4}>
          <DataBase
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabPanel>
          <TabPanel value={5}>
            <TableOptions
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabPanel>
          <TabPanel value={6}>
          <EventOption
              companyFormData={companyFormData}
              setCompanyFormData={setCompanyFormData}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </TabPanel>
        </Tabs>
        <Box
          mt={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyInfo;
