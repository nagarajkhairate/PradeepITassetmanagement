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
import LocationPage from "../../components/Companyinfo/Location/Location";
import Category from "../../components/Companyinfo/Category/Category";
import DataBase from "../../components/Companyinfo/Database/DataBase";
import EventOption from "../../components/Companyinfo/EventOption/EventOption";
import AppView from "../../components/Common/AppView";
import { fetchOptions } from "../../Redux/features/TabsSlice";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const CompanyInfo = () => {
  const [companyFormData, setCompanyFormData] = React.useState({});
  const [activeTab, setActiveTab] = React.useState(0);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  React.useEffect(() => {
    dispatch(fetchOptions())
  }, [dispatch])

  const tabs = [
    { label: "1. Company", icon: <LanguageIcon sx={{fontSiz:{xs:"28px",md:"42px"} }}/> },
    { label: "2. Sites", icon: <RoomOutlinedIcon sx={{fontSiz:{xs:"28px",md:"42px"} }}/> },
    { label: "3. Locations", icon: <LanguageIcon sx={{fontSiz:{xs:"28px",md:"42px"} }}/> },
    { label: "4. Categories", icon: <LanguageIcon sx={{fontSiz:{xs:"28px",md:"42px"} }}/> },
    { label: "5. Database", icon: <LanguageIcon sx={{fontSiz:{xs:"28px",md:"42px"} }}/> },
    { label: "6. TableOptions", icon: <LanguageIcon sx={{fontSiz:{xs:"28px",md:"42px"} }}/> },
    { label: "7. EventOptions", icon: <LanguageIcon sx={{fontSiz:{xs:"28px",md:"42px"} }}/> },
  ];

  return (
    <AppView>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs aria-label="Basic tabs" value={activeTab} sx={{ width: "100%" }}>
          <TabList
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              justifyContent:"center",
              alignItems:"center",
              width: "100%",
              padding:{ xs: "14px", sm: "14px", md: "20px" }
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                onClick={() => setActiveTab(index)}
              >
                <Box
                sx={{display:"flex",
                  flexdirection: { md: "column", sm: "column", xs: "row" },
                  alignItems:"center"
                 }}>
                  <Box>
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
                  </Box>
             <Box>
             <Typography sx={{fontSize:"15.4px", marginLeft: { xs: "0", md: "0" } }}><strong>{tab.label}</strong></Typography>

             </Box>
                </Box>
                {/* <Box
                sx={{display:"flex",
                 flexdirection: { md: "column", sm: "column", xs: "row" },
                 alignItems:"center",
                 gap:{xs:8 , md:auto},
                }}
                >
                <Typography sx={{fontSize:"15.4px"}}><strong>{tab.label}</strong></Typography>
                {index < tabs.length - 1 && (
                <strong><ArrowForwardIosIcon
                  style={{ fontSize:"10px",marginLeft: '8px', marginRight: '8px' }}
                />
                </strong>
              )}
              </Box> */}
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
            <LocationPage
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
          id={1}
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
    </AppView>
  );
};

export default CompanyInfo;
