import React from 'react'
import { Box, Button, Typography } from '@mui/joy'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import MaintenanceEmpty from '../../components/Common/MaintenanceEmpty'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Table from '@mui/joy/Table'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import AppView from '../../components/Common/AppView'

export const MaintenancesDue: React.FC = () => {
  return (
    <AppView>
      <Typography level="h4">Maintenance</Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
        }}
      >
        <Button
          type="button"
          variant="solid"
          autoFocus
          sx={{
            background: '#1CCAB8',
            color: 'white',
            borderRadius: '15px',
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
              borderRadius: '15px',
            }}
          >
            <CloudUploadOutlinedIcon />
            Export to Excel
          </Button>
          <Button
            variant="solid"
            autoFocus
            sx={{
              background: '#2196f3',
              color: 'white',
              borderRadius: '15px',
              whiteSpace: 'nowrap',
            }}
          >
            <CloudUploadOutlinedIcon />
            Import Maintenance
          </Button>
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
        </Box>
      </Box>

      

      <Box
         sx={{
          gap:{md:"1px",xs:"3px"},
         display:"flex" , 
         alignItems: 'center',
         flexDirection: { md: 'row', xs: 'column' },
         justifyContent: 'space-between',
         mt:2
            }}
      >
        <Box
          // sx={{
          //   display: 'flex',
          //   alignItems: 'center',
          // }}
        >
          <Select
            placeholder="Maintenance Due"
            indicator={<KeyboardArrowDown />}
            sx={{
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },

              borderRadius: '15px',
            }}
          >
            <Option value="term 1">term 1</Option>
            <Option value="term 2">term 2</Option>
            <Option value="term 3">term 3</Option>
            <Option value="term 4">term 4</Option>
          </Select>
        </Box>
        <Box>
          <Select
            placeholder="10"
            indicator={<KeyboardArrowDown />}
            sx={{
              // width: 75,
              [`& .${selectClasses.indicator}`]: {
                transition: '0.2s',
                [`&.${selectClasses.expanded}`]: {
                  transform: 'rotate(-180deg)',
                },
              },
              borderRadius: '15px',
            }}
          >
            <Option value="10">10</Option>
            <Option value="15">15</Option>
            <Option value="20">20</Option>
          </Select>
        </Box>

        <Typography
          // sx={{
          //   maxWidth: 450,
          //   fontFamily: 'Poppins, sans-serif',
          //   fontStyle: 'italic',
            
          // }}
          // color="danger"

          sx={{
            maxWidth: 450,
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'italic',
            marginTop: '2px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end ',
            // mt:4
          }}
          color="danger"
        >
          Assets with a maintenance due date within the last 7 days (determined
          by overdue time) or in the near future.
        </Typography>
      </Box>

      <Box>
        <Table hoverRow>
          <thead style={{ background: '#959595' }}>
            <tr>
              <th style={{ width: '10%' }}>Status</th>
              <th>Expires</th>
              <th>Asset Tag Id</th>
              <th>Description</th>
              <th>Title</th>
              <th>Maintenance Details</th>
              <th>Action</th>
            </tr>
          </thead>
        </Table>
      </Box>

      <Box>
        <MaintenanceEmpty />
      </Box>
    </AppView>
  )
}

export default MaintenancesDue
