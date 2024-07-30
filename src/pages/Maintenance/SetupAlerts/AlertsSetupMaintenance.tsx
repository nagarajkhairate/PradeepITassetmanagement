import { Box, Button, Divider, Input, Typography } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useState } from 'react'
import AlertsSetupCheckbox from './AlertsSetupCheckbox'
import { handleCheckboxChange } from './AlertsSetupCheckboxLogix'

export const AlertsSetupMaintenance: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [buttonIsVisible, setButtonVisible] = useState<boolean>(false)
  const [leadTime, setLeadTime] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Regex to allow only digits
    if (/^\d*$/.test(value)) {
      setLeadTime(value)
    }
  }

  const handleChange = (column: string) => {
    handleCheckboxChange(column, selectedColumns, setSelectedColumns, setButtonVisible)
  }
  const columns = [
    {
      title: 'Maintenance Alerts',
      description: 'Show Alerts for upcoming Maintenance.',
      value: 'column1',
    },
    {
      title: 'Email Alerts',
      description: 'Turn on this option to email out an alert if any alert exists.',
      value: 'column2',
    },
    {
        description: 'The lead time determines how many days before the user is notified about planned maintenance.',
    }
  ]

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {columns.map(
            ({ title, description, value }) =>
              (value === 'column1' ||
                (selectedColumns.includes('column1') &&
                  value === 'column2')) && (
                <AlertsSetupCheckbox
                  key={value}
                  title={title}
                  description={description}
                  value={value}
                  selectedColumns={selectedColumns}
                  onChange={handleChange}
                />
              ),
          )}

          {buttonIsVisible && (
            <Box
              sx={{
                mt: 2,
                ml: 5,
              }}
            >
              <Button
                autoFocus
                type="buttonIsVisible"
                variant="solid"
                sx={{
                  background: '#fdd835',
                  '&:hover': { background: '#E1A91B' },
                  color: 'black',
                }}
              >
                Setup Alert Setting
              </Button>
            </Box>
          )}
           {selectedColumns.includes('column1') && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column', // Added to stack elements vertically
            alignItems: 'flex-start',
            mt: 2,
            ml: 5,
            gap: 1,
          }}
          >
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
            <Typography sx={{ mr: 1 }}>Lead Time:</Typography>
            <Input placeholder="Enter contract details" sx={{ mr: 1 }} 
            value={leadTime}
            onChange={handleInputChange}/>
            <Typography >Days</Typography>
            </Box>
            <Typography
            sx={{
                fontSize:'14px'
            }}
            >The lead time determines how many days before the user is notified about planned maintenance.</Typography>
          </Box>
        )}

{selectedColumns.includes('column1') && (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column', // Added to stack elements vertically
            alignItems: 'flex-start',
            mt: 2,
            ml: 5,
            gap: 1,
          }}
          >
            <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
            <Typography sx={{ mr: 1 }}>Overdue Time:</Typography>
            <Input placeholder="Enter the days" sx={{ mr: 1 }} 
            value={leadTime}
            onChange={handleInputChange}/>
            <Typography >Days</Typography>
            </Box>
            <Typography
            sx={{
                fontSize:'14px'
            }}
            >
            The Overdue time specifies how many days after the scheduled maintenance it is put to the overdue list.
            </Typography>
          </Box>
        )}
        </Box>
        <Divider />
      </Box>
  )
}

export default React.memo(AlertsSetupMaintenance)