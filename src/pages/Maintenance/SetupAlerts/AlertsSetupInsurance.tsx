import { Box, Button, Divider, Input, Typography } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useState } from 'react'
import AlertsSetupCheckbox from './AlertsSetupCheckbox'
import { handleCheckboxChange } from './AlertsSetupCheckboxLogix'

export const AlertsSetupInsurance: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [button, setButton] = useState<boolean>(false)
  const [leadTime, setLeadTime] = useState<string>('')

  const handleChange = (column: string) => {
    handleCheckboxChange(column, selectedColumns, setSelectedColumns, setButton)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Regex to allow only digits
    if (/^\d*$/.test(value)) {
      setLeadTime(value)
    }
  }

  const columns = [
    {
      title: 'Insurance Alerts',
      description: 'Show alerts for expiring insurance.',
      value: 'column1',
    },
    {
      title: 'Email Alerts',
      description:
        'Turn on this option to email out an alert if any alert exists.',
      value: 'column2',
    },
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
              (selectedColumns.includes('column1') && value === 'column2')) && (
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

        {button && (
          <Box
            sx={{
              mt: 2,
              ml: 5,
            }}
          >
            <Button
              autoFocus
              type="button"
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
              alignItems: 'center',
              mt: 2,
              ml: 5,
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 1 }}>Lead Time:</Typography>
            <Input
              placeholder="Enter contract details"
              sx={{ mr: 1 }}
              value={leadTime}
              onChange={handleInputChange}
            />
            <Typography>Days</Typography>
          </Box>
        )}
      </Box>
      <Divider />
    </Box>
  )
}

export default React.memo(AlertsSetupInsurance)
