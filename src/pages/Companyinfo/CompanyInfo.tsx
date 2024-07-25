import React, { useEffect, useState } from "react";
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
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSteps, updateStep } from "../../redux/features/StepsSlice";
import { useMediaQuery } from '@mui/material';

const CompanyInfo = () => {
  const [companyFormData, setCompanyFormData] = React.useState({});
  const [activeStep, setActiveStep] = useState(5);
  const step = useSelector((state: RootState) => state.steps.data)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
console.log(step)
  const steps: any[] = [
    { label: "Company", component: <Company activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Sites", component: <Sites activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "Locations", component: <LocationPage  activeTab={activeStep} setActiveTab={setActiveStep}/> },
    { label: "Categories", component: <Category activeTab={activeStep} setActiveTab={setActiveStep}/>  },
    { label: "Database", component: <DataBase  activeTab={activeStep} setActiveTab={setActiveStep}/> },
    { label: "TableOptions", component: <TableOptions  activeTab={activeStep} setActiveTab={setActiveStep} /> },
    { label: "EventOptions", component: <EventOption companyFormData={companyFormData} setCompanyFormData={setCompanyFormData} activeTab={activeStep} setActiveTab={setActiveStep} /> },
  ];

  // useEffect(()=>{
  //   if(step.length)
  //     setActiveStep(step[0].step)
  // },[step])
  // useEffect(()=>{
    
  //   if(step)
  //     if(activeStep > step[0].step)
  //     dispatch(updateStep({id: step[0].step, step: activeStep}))
  // },[activeStep])

  useEffect(()=>{
    dispatch(fetchSteps())
  },[activeStep])

  return (
    <AppView>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: isSmallScreen ? '10px' : '20px',
        }}
      >
        <Stepper
          sx={{ width: '100%', mb:2 }}
          orientation={isSmallScreen ? 'vertical' : 'horizontal'}
        >
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
