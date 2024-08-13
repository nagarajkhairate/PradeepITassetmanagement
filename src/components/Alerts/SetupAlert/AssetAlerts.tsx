import React, { FunctionComponent } from 'react'
import { Box, Button, Checkbox, Input, Typography } from '@mui/joy'

interface AssetPastDueAlertsProps {
  alert: any // Define a more specific type if possible
  fieldData?: any
  isCheckboxChecked: (name: string) => boolean
  handleChange: (name: string) => void
  handleInputChange:(e: React.ChangeEvent<HTMLInputElement>, valueName: string) => void
  isCheckboxCheckedEmail: (name: string) => boolean
  handleChangeEmail: (name: string) => void
}

const AssetAlerts: FunctionComponent<AssetPastDueAlertsProps> = ({
  alert,
  fieldData,
  isCheckboxChecked,
  handleChange,
  handleInputChange,
  isCheckboxCheckedEmail,
  handleChangeEmail,
}) => {

  return (
    <Box key={alert.id} sx={{ display: 'flex', mt:1, gap: 1 }}>
      <Checkbox
        checked={isCheckboxChecked(alert.name)}
        onChange={() => handleChange(alert.name)}
        sx={{ marginRight: 1 }}
      />
      <Box>
        <Typography sx={{ fontWeight: 500 }}>{fieldData.title}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {fieldData.description}
        </Typography>
        {alert.isVisible && (
          <Box sx={{mt:1}}>
            {alert.name !== 'assetPastDueAlerts' &&(
            <Box>
              <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                m: 2,
                gap: 1,
              }}
            >
              <Typography>Lead Time:</Typography>
              <Input type="text"
                  value={alert[fieldData.leadTime]}
                  name={fieldData.leadTime}
                  onChange={(e) => handleInputChange(e, alert.name)}
                  sx={{ width: 50 }}
                  />
              <Typography>Days</Typography>
            </Box>
            <Typography
              sx={{
                fontSize: '14px',
              }}
            >
              The lead time determines how many days before the user is notified
              about planned maintenance.
            </Typography>
            {alert.name === 'maintenanceAlerts' && (
              <Box
              sx={{mt:1}}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography sx={{ mr: 1 }}>Overdue Time:</Typography>
                <Input
                  type="text"
                  value={alert[fieldData.overDueTime]}
                  name={fieldData.overDueTime}
                  sx={{ width: 50 }}
                  onChange={(e) => handleInputChange(e, alert.name)}
                />
                <Typography>Days</Typography>
              </Box>
              <Typography
              sx={{
                fontSize: '14px',
              }}
            >
              The Overdue time specifies how many days after the scheduled
              maintenance it is put to the overdue list.
            </Typography>
            </Box>)}
           
            </Box>)}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Checkbox
                checked={isCheckboxCheckedEmail(alert.name)}
                onChange={() => handleChangeEmail(alert.name)}
                sx={{ marginRight: 1 }}
              />
              <Box>
                <Typography sx={{ fontWeight: 500 }}>
                  {fieldData.emailAlert.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  {fieldData.emailAlert.description}
                </Typography>
                {alert.isEmail && (
                  <Box sx={{ mt: 2 }}>
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
              </Box>
            </Box>
           
          </Box>
        )}
        
      </Box>

    </Box>
  )
}

export default AssetAlerts
