import React, { useState } from "react";
import Company from "../../components/Companyinfo/Company/Company";
import Sites from "../../components/Companyinfo/Sites/Sites";
import TableOptions from "../../components/Companyinfo/TableOptions/TableOptions";
import LocationPage from "../../components/Companyinfo/Location/Location";
import Category from "../../components/Companyinfo/Category/Category";
import DataBase from "../../components/Companyinfo/Database/DataBase";
import EventOption from "../../components/Companyinfo/EventOption/EventOption";
import AppView from "../../components/Common/AppView";

import { Box, Step, StepButton, StepIndicator, Stepper } from "@mui/joy";
import Check from "@mui/icons-material/Check";


const CompanyInfo = () => {
  const [companyFormData, setCompanyFormData] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(4);



  console.log(companyFormData)

  const steps: any[] = [
    { label: "Company", component: <Company companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Sites", component: <Sites companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Locations", component: <LocationPage companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep}/> },
    { label: "Categories", component: <Category activeTab={activeStep} setActiveTab={setActiveStep}/>  },
    { label: "Database", component: <DataBase companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep}/> },
    { label: "TableOptions", component: <TableOptions companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "EventOptions", component: <EventOption companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
    // { label: "Summary", component: (
    //   <Box>
    //     <Typography level="h6">Summary</Typography>
    //     <pre>{JSON.stringify(companyFormData, null, 2)}</pre>
    //   </Box>
    // ) },
  ];

  return (
    <AppView>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Stepper sx={{ width: '100%' }}>
          {steps && steps.map((step, index) => (
            <Step
              key={index}
              indicator={
                <StepIndicator
                  variant={activeStep <= index ? 'soft' : 'solid'}
                  color={activeStep < index ? 'neutral' : 'primary'}
                >
                  {activeStep <= index ? index + 1 : <Check />}
                </StepIndicator>
              }
              sx={{
                '&::after': {
                  ...(activeStep > index &&
                    index !== 2 && { bgcolor: '#FABC1E' }),
                },
              }}
            >
              <StepButton>{step.label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {steps[activeStep] && steps[activeStep].component}
        </Box>
       
      </Box>
    </AppView>
  );
};

export default CompanyInfo;
