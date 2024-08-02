import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/joy'
import { styled } from '@mui/joy'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Image from '../../components/Common/MaintenanceEmpty'
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import AppView from '../../components/Common/AppView'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlertsAssetPastDue } from '../../redux/features/AlertsAssetPastDueSlice'
import { useEffect } from 'react'

export const AssetsPastDue: React.FC = () => {

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const alertsAssetPastDue = useSelector((state: RootState) => state.alertsAssetPastDue.data,)

  useEffect(() => {
    dispatch(fetchAlertsAssetPastDue())
  }, [dispatch])

  return (
    <AppView>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
        }}
      >
         <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", md: "row" },
                  mb: 2,
                }}
              >
        <Typography
          sx={{
            fontSize: { xs: '24px', md: '32px' },
            fontWeight: 500,
            lineHeight: { xs: '36px', md: '48px' },
            textAlign: { xs: 'center', md: 'left' },
            width: { xs: '100%', md: 'auto' },
          }}
        >
          Report
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '14px', md: '18px' },
            fontWeight: 400,
            lineHeight: { xs: '22px', md: '27px' },
            textAlign: { xs: 'center', md: 'left' },
            // width: { xs: "100%", md: "auto" },
            mt: { xs: 1, md: 1 },
            ml: { md: 2 },
            whiteSpace: 'nowrap',
          }}
        >
          Checkout by Past Due
        </Typography>
        </Box>
        <Box
          // sx={{
          //   width: "100%",
          //   // marginRight:'5%',
          //   display: { md: "flex", xs: "flex" },
          //   justifyContent:'flex-end',
          //   flexDirection: { md: "row", xs: "column" },
          //   gap: "5px",
          // }}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: { md: 'row', xs: 'column' },
            gap: '5px',
          }}
        >
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              marginRight: { xs: 1, md: 2 },
              borderRadius:'15px'
              // width: { xs: '100%', md: 'auto' },
            }}
            component="label"
          >
            <MarkunreadOutlinedIcon />
            Automated Report
          </Button>

          <Button
            type="button"
            variant="solid"
            sx={{
              background: 'black',
              color: 'white',
              borderRadius:'15px'
              // width: { xs: '100%', md: 'auto' },
            }}
          >
            <SettingsOutlinedIcon />
            SetUp
          </Button>
        </Box>
      </Box>

      <Box
        // sx={{ display: "flex", justifyContent: "center", mb: 4 }}
        sx={{
          //     width: "100%",
          //     // marginRight:'10%',
          display: 'flex',
          justifyContent: { md: 'flex-end', xs: 'center' },
          flexDirection: { md: 'row', xs: 'column' },
          alignItems: 'center',
          gap: '5px',
          borderRadius:'15px'
        }}
      >
        <Button
          variant="solid"
          sx={{
            background: '#388e3c',
            color: 'white',
            marginRight: { xs: 1, md: 2 },
            borderRadius:'15px'
            // width: { xs: '100%', md: 'auto' },
          }}
          component="label"
        >
          Export
        </Button>
        <Button
          type="button"
          variant="solid"
          sx={{
            background: 'black',
            color: 'white',
            borderRadius:'15px'
            // width: { xs: '100%', md: 'auto' },
          }}
        >
          <PrintOutlinedIcon />
          Print
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image />
      </Box>
      {/* </Box> */}
      {/* </Box> */}
    </AppView>
  )
}

export default AssetsPastDue
