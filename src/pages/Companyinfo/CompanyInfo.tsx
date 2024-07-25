import React, { FunctionComponent, useState } from 'react'
import Company from '../../components/Companyinfo/Company/Company'
import Sites from '../../components/Companyinfo/Sites/Sites'
import TableOptions from '../../components/Companyinfo/TableOptions/TableOptions'
import LocationPage from '../../components/Companyinfo/Location/Location'
import Category from '../../components/Companyinfo/Category/Category'
import DataBase from '../../components/Companyinfo/Database/DataBase'
import EventOption from '../../components/Companyinfo/EventOption/EventOption'
import AppView from '../../components/Common/AppView'

import { Box, Modal, Step, StepButton, StepIndicator, Stepper } from '@mui/joy'
import Check from '@mui/icons-material/Check'
import { useMediaQuery } from '@mui/material'

interface CompanyInfoProp {
  open: boolean
  setOpen: (open: boolean) => void
}

const CompanyInfo: FunctionComponent<CompanyInfoProp> = ({ open, setOpen }) => {
  const [activeStep, setActiveStep] = useState(0)
  const isSmallScreen = useMediaQuery('(max-width:600px)')

  const steps: { label: string; component: JSX.Element }[] = [
    {
      label: 'Company',
      component: (
        <Company activeTab={activeStep} setActiveTab={setActiveStep} />
      ),
    },
    {
      label: 'Sites',
      component: <Sites activeTab={activeStep} setActiveTab={setActiveStep} />,
    },
    {
      label: 'Locations',
      component: (
        <LocationPage activeTab={activeStep} setActiveTab={setActiveStep} />
      ),
    },
    {
      label: 'Categories',
      component: (
        <Category activeTab={activeStep} setActiveTab={setActiveStep} />
      ),
    },
    {
      label: 'Database',
      component: (
        <DataBase activeTab={activeStep} setActiveTab={setActiveStep} />
      ),
    },
    {
      label: 'TableOptions',
      component: (
        <TableOptions activeTab={activeStep} setActiveTab={setActiveStep} />
      ),
    },
    {
      label: 'EventOptions',
      component: (
        <EventOption activeTab={activeStep} setActiveTab={setActiveStep} />
      ),
    },
  ]

  return (
    <AppView>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            width: '90dvw',
            padding: isSmallScreen ? '10px' : '20px',
            maxHeight: '90vh',
            background: 'white',
            overflowY: 'auto',
            borderRadius: '10px',
          }}
        >
          <Stepper
            sx={{
              width: '100%',
              mb: 2,
              position: 'sticky',
              top: 0,
              zIndex: 1,
              background: 'white',
              p: '8px',
            }} 
            orientation={isSmallScreen ? 'vertical' : 'horizontal'}
          >
            {steps.map((step, index) => (
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
                <StepButton onClick={() => setActiveStep(index)}>
                  {step.label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mt: 2 }}>
            {steps[activeStep] && steps[activeStep].component}
          </Box>
        </Box>
      </Modal>
    </AppView>
  )
}

export default CompanyInfo
