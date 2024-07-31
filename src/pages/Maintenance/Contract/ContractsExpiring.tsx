import {
  Box,
  Button,
  Option,
  Select,
  selectClasses,
  styled,
  SvgIcon,
  Typography,
} from '@mui/joy'
import React, { useState } from 'react'
import { KeyboardArrowDown } from '@mui/icons-material'
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone'
import AppView from '../../../components/Common/AppView'
import { Link } from 'react-router-dom'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

export const ContractsExpiring: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  return (
    <AppView>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
          mt: 2,
        }}
      >
        <Typography level="h3">Contracts / Software Licenses</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            gap: '5px',
          }}
        >
           <Link
              to='/alerts/contracts-expiring/add-contract'
              style={{ textDecoration: 'none' }}
            >
          <Button
            variant="solid"
            autoFocus
            sx={{
              background: '#388e3c',
              '&:hover':{background: '#388d1c'},
              color: 'white',
              borderRadius: '10px',
              marginRight:2
            }}
          >
            <AddTwoToneIcon />
          New Contract / License
          </Button>
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: '10x',
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
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '30px',
              textAlign: { xs: 'center', md: 'left' },
              whiteSpace: 'nowrap',
              mt: 0,
            }}
          >
            List of Contracts / Software Licenses
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row', xs: 'column' },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: '5px',
            mt: 2,
          }}
        >
          <Button
            type="button"
            variant="solid"
            autoFocus
            sx={{
              background: '#1CCAB8',
              color: 'white',
              borderRadius: '10px',
            }}
          >
            <SettingsOutlinedIcon />
            Search Criteria
          </Button>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: '5px',
            }}
          >
            <Button
              variant="solid"
              autoFocus
              sx={{
                background: '#388e3c',
                color: 'white',
                borderRadius: '10px',
              }}
            >
              <CloudUploadOutlinedIcon />
              Export to Excel
            </Button>
            <Link
              to="/alerts/maintenances-due/import-maintenance"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: '#2196f3',
                  color: 'white',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                <CloudUploadOutlinedIcon />
                Import Maintenance
              </Button>
            </Link>

            <Link
              to="/alerts/maintenances-due/set-up-column"
              style={{ textDecoration: 'none' }}
            >
              <Button
                type="button"
                variant="solid"
                autoFocus
                sx={{
                  background: 'black',
                  color: 'white',
                  borderRadius: '15px',
                }}
              >
                <SettingsOutlinedIcon />
                Setup Column
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </AppView>
  )
}
export default React.memo(ContractsExpiring)
