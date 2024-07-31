import { Box, Button, Checkbox, Divider, Typography } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useEffect, useState } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMaintenanceCustomDatabase } from '../../../redux/features/MaintenanceCustomDatabaseSlice'
import { customMaintenance, Maintenance, maintenanceData } from '../../Setup/DataBase/DatabaseMaintenance/MaintenanceData'
import AlertsSetupColumnTable from '../Maintenances/AlertsSetupColumnTable'




export const AddContractExp: React.FC = () => {

  
  return (
    <AppView>
      <Typography level="h3">Add a Contract / Software License</Typography>

      <Box
        sx={{
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '22px' },
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
             Add a Contract / Software License
            </Typography>

            <Typography
              sx={{
                p: 1,
              }}
            >
              Include detailed information about your new contract/software license. Then, tag specific assets on the Contract / Software License View page.
            </Typography>
          </Box>

          
        </Box>
      </Box>
    </AppView>
  )
}

export default React.memo(AddContractExp)
