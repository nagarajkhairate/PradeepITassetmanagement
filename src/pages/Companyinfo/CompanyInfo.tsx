import * as React from "react";
import { Box, Step, Stepper, StepLabel, Typography } from "@mui/material";
import Company from "../../components/Companyinfo/Company/Company";
import Sites from "../../components/Companyinfo/Sites/Sites";
import TableOptions from "../../components/Companyinfo/TableOptions/TableOptions";
import LocationPage from "../../components/Companyinfo/Location/Location";
import Category from "../../components/Companyinfo/Category/Category";
import DataBase from "../../components/Companyinfo/Database/DataBase";
import EventOption from "../../components/Companyinfo/EventOption/EventOption";
import AppView from "../../components/Common/AppView";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { RootState } from "../../redux/store";

const CompanyInfo = () => {
  const [companyFormData, setCompanyFormData] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const steps = [
    { label: "Company", component: <Company companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Sites", component: <Sites companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Locations", component: <LocationPage companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Categories", component: <Category companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Database", component: <DataBase id={1} companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "TableOptions", component: <TableOptions companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "EventOptions", component: <EventOption companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
  ];

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handle previous step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <AppView>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%", bgcolor: "transparent",display:"flex", flexDirection: { xs: "column", sm: "column", md: "row" }, gap: 1,}}>
          {steps.map((step, index) => (
            <Step key={step.label}
            >
              <StepLabel>
                <Typography variant="subtitle2">{step.label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ width: "100%" }}>
          {steps[activeStep].component}
        </Box>
      </Box>
    </AppView>
  );
};

export default CompanyInfo;
