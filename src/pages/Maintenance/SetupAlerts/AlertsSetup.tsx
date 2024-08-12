import React, { ChangeEvent, useEffect, useState } from 'react'
import { Box, Button, Divider, Typography } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import {
  fetchAlertsSetup,
  updateAlertsSetup,
} from '../../../redux/features/AlertsSetupSlice'
import AssetAlerts from '../../../components/Alerts/SetupAlert/AssetAlerts'
import { assetFliedDataAlerts } from './AlertsSetupData'
import AppForm from '../../../components/Common/AppForm'

export const AlertsSetup: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const alertsSetups = useSelector((state: RootState) => state.alertsSetup.data)
  const [alertFormData, setAlertFormData] = useState<any[]>([])

  useEffect(() => {
    dispatch(fetchAlertsSetup())
  }, [dispatch])

  useEffect(() => {
    setAlertFormData(alertsSetups)
  }, [alertsSetups])

  const handleChange = (name: string) => {
    setAlertFormData((prevData) =>
      prevData.map((alert) =>
        alert.name === name ? { ...alert, isVisible: !alert.isVisible } : alert,
      ),
    )
  }

  const handleChangeEmail = (name: string) => {
    setAlertFormData((prevData) =>
      prevData.map((alert) =>
        alert.name === name ? { ...alert, isEmail: !alert.isEmail } : alert,
      ),
    )
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    valueName: string,
  ) => {
    const { name, value } = e.target
    setAlertFormData((prevData) =>
      prevData.map((alert: any) =>
        alert.name === valueName ? { ...alert, [name]: value } : alert,
      ),
    )
  }

  const isCheckboxChecked = (name: string) => {
    const alert = alertFormData.find((alert) => alert.name === name)
    return alert ? alert.isVisible : false
  }

  const isCheckboxCheckedEmail = (name: string) => {
    const alert = alertFormData.find((alert) => alert.name === name)
    return alert ? alert.isEmail : false
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(updateAlertsSetup(alertFormData))
  }

  return (
    <AppForm onSubmit={handleSubmit}>
      <Typography level="h3">Setup Alerts</Typography>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 4,
        }}
      >
        <Typography
          level="h4"
          sx={{
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '30px',
            textAlign: { xs: 'center', md: 'left' },
            whiteSpace: 'nowrap',
            mt: 0,
          }}
        >
          Setup Alerts
        </Typography>

        <Typography sx={{ p: 1 }}>
          We're on guard so you don't have to be. Check boxes next to the items
          you want to be notified about. Decide when you want to be alerted, and
          choose how many days in advance you'll receive the alert. Alerts will
          appear in the left navigation menu and in the calendar on the
          dashboard.
        </Typography>

        {alertFormData.map((alert) => {
          return assetFliedDataAlerts.map((fieldData) => {
            if (alert.name === fieldData.name) {
              return (
                <Box key={alert.id}>
                  <AssetAlerts
                    alert={alert}
                    fieldData={fieldData}
                    isCheckboxChecked={isCheckboxChecked}
                    handleChange={handleChange}
                    handleInputChange={handleInputChange}
                    isCheckboxCheckedEmail={isCheckboxCheckedEmail}
                    handleChangeEmail={handleChangeEmail}
                  />{' '}
                  <Divider sx={{ mt: 2 }} />
                </Box>
              )
            }
            return null
          })
        })}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mr: 2 }}>
          <Button
            type="submit"
            sx={{
              background: '#FABC1E',
              color: 'black',
              '&:hover': { background: '#E1A91B' },
              borderRadius: '10px',
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </AppForm>
  )
}

export default React.memo(AlertsSetup)
