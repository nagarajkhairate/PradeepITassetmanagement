import { Box, Button, Divider, Typography } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useEffect, useState } from 'react'
import AlertsSetupContract from './AlertsSetupContract'
import AlertsSetupCheckbox from './AlertsSetupCheckbox'
import AlertsSetupFundExp from './AlertsSetupFundExp'
import { handleCheckboxChange } from './AlertsSetupCheckboxLogix'
import AlertsSetupInsurance from './AlertsSetupInsurance'
import AlertsSetupLeaseExp from './AlertsSetupLeaseExp'
import AlertsSetupMaintenance from './AlertsSetupMaintenance'
import AlertsSetupWarranties from './AlertsSetupWarranties'
import {columns} from './AlertsSetupData'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlertsSetup } from '../../../redux/features/AlertsSetupSlice'

export const AlertsSetup: React.FC = () => {

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const alertsSetups = useSelector((state: RootState) => state.alertsSetup.data)

  useEffect(() => {
    dispatch(fetchAlertsSetup());
  }, [dispatch]);


  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [button, setButton] = useState<boolean>(false)

  const handleChange = (column: string) => {
    handleCheckboxChange(column, selectedColumns, setSelectedColumns, setButton)
  }


  

  return (
    <AppView>
      <Typography level="h3">Setup Alerts</Typography>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '20px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
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

            <Typography
              sx={{
                p: 1,
              }}
            >
              We're on guard so you don't have to be. Check boxes next to the
              items you want to be notified about. Decide when you want to be
              alerted, and choose how many days in advance you'll receive the
              alert. Alerts will appear in the left navigation menu and in the
              calendar on the dashboard.
            </Typography>

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
          </Box>
          <Divider />
          <AlertsSetupContract />
          <AlertsSetupFundExp />
          <AlertsSetupInsurance />
          <AlertsSetupLeaseExp />
          <AlertsSetupMaintenance />
          <AlertsSetupWarranties />
        </Box>
      </Box>
    </AppView>
  )
}

export default React.memo(AlertsSetup)

