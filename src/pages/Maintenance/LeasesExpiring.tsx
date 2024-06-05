
import { Box, Button, Typography } from '@mui/joy'
import { styled } from '@mui/joy'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
// import Image from '../../components/Common/MaintenanceEmpty'
import MaintenanceEmpty from '../../components/Common/MaintenanceEmpty'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined'
import AppView from '../../components/Common/AppView'

export const LeasesExpiring: React.FC = () => {
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
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: { xs: '24px', md: '32px' },
                fontWeight: 500,
                // lineHeight: { xs: '36px', md: '48px' },
                textAlign: { xs: 'center', md: 'left' },
                display:'flex',

                // width: { xs: '100%', md: 'auto' },
              }}
            >
              Report
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: { xs: '14px', md: '18px' },
                fontWeight: 400,
                textAlign: { xs: 'center', md: 'left' },
                ml: { md: 2 },
                whiteSpace: 'nowrap',
              }}
            >
              Checkout by Past Due
            </Typography>
            <Box

              sx={{
                display: 'flex',
                flexDirection: { md: 'row', xs: 'column' },
                gap: '5px',
                justifyItems:'flex-end'
              }}
            >
              <Button
                variant="solid"
                sx={{
                  background: '#388e3c',
                  color: 'white',
                }}
                component="label"
              >
                <EmailOutlinedIcon />
                Automated Report
              </Button>
              <Button
                type="button"
                variant="solid"
                sx={{
                  background: 'black',
                  color: 'white',
                }}
              >
                <SettingsOutlinedIcon />
                SetUp
              </Button>
            </Box>
          </Box>


          
            <Box

              sx={{
                gap:2,
               display:"flex" , 
               alignItems: 'center',
               flexDirection: { md: 'row', xs: 'column' },
               justifyContent: 'space-between',
               mt:2
                  }}
            >
              
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '20px',
                    fontWeight: 500,
                    lineHeight: '30px',
                    textAlign: { xs: 'center', md: 'left' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  Report Type:
                </Typography>
              
              <Box
                // sx={{
                //   // width: { xs: '100%', md: 'auto' },
                //   flexGrow: { xs: 1, md: 0 },
                // }}
              >
                <Select
                  placeholder="Current Status"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    // width: '100%',
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                    borderRadius: '16px',
                  }}
                >
                  <Option value="dog">Dog</Option>
                  <Option value="cat">Cat</Option>
                  <Option value="fish">Fish</Option>
                  <Option value="bird">Bird</Option>
                </Select>
              </Box>
              <Box
                // sx={{
                //   // width: { xs: '100%', md: 'auto' },
                //   flexGrow: { xs: 1, md: 0 },
                // }}
              >
                <Select
                  placeholder="100"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    // width: '100%',
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                    borderRadius: '16px',
                  }}
                >
                  <Option value="10">10</Option>
                  <Option value="15">15</Option>
                  <Option value="20">20</Option>
                </Select>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  justifyContent: { xs: 'center', md: 'flex-end' },
                  gap: 2,
                }}
              >
                <Button
                  variant="solid"
                  sx={{
                    background: '#388e3c',
                    color: 'white',
                  }}
                  component="label"
                >
                  <FileUploadOutlinedIcon />
                  Export to Excel
                </Button>
                <Button
                  type="button"
                  variant="solid"
                  sx={{
                    background: '#2196f3',
                    color: 'white',
                  }}
                >
                  <LocalPrintshopOutlinedIcon />
                  Print
                </Button>
              </Box>
            </Box>

          <Box>
            <MaintenanceEmpty />
          </Box>
    </AppView>
  )
}

export default LeasesExpiring
