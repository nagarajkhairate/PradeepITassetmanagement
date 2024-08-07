
import { Box, Button, Typography } from '@mui/joy'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import Table from '@mui/joy/Table'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import AppView from '../../../components/Common/AppView'
import MaintenanceEmpty from '../../../components/Common/MaintenanceEmpty'
import { Link, useLocation } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchWarrantiesDatabase } from '../../../redux/features/WarrantiesDatabaseSlice'

export function WarrantyExpiring() {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const warrantiesDatabase = useSelector((state: RootState) => state.warrantiesDatabase.data)
  const location=useLocation()
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [formData, setFormData] = useState<any>()

  useEffect(() => {
    dispatch(fetchWarrantiesDatabase());
  }, [dispatch]);

  useEffect(()=>{
    if(location.state && location.state.selectedColumns){
      setSelectedColumns(location.state.selectedColumns)
    }
  }, [location.state])
  return (
    <AppView>
      <Typography level="h4">Warranty</Typography>

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
          display: 'flex',
          alignItems: 'center',
          flexDirection: { md: 'row', xs: 'column' },
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
        }}
      >
        <Box 
        sx={{
          display: 'flex',
          flexDirection: { md: 'row', xs: 'column' },
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
        </Box>

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
            size="sm"
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

          <Link to='/alerts/warranty-expiring/warranty-set-up-column' style={{ textDecoration: 'none' }}>
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap:2,
       flexDirection: { md: 'row', xs: 'column' },
       justifyContent: 'space-between',
        }}
        >
          <Select
            placeholder="Warranties Expiring"
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
            <Option value="warranty1">Warranty 1</Option>
            <Option value="warranty2">Warranty 2</Option>

          </Select>
          {/* <Select
            placeholder="10"
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
            <Option value="10">10</Option>
            <Option value="15">15</Option>
            <Option value="20">20</Option>
          </Select> */}
        </Box>

        <Typography
          sx={{
            maxWidth: 450,
          
            fontStyle: 'italic',
            marginTop: '2px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end ',
          }}
          color="danger"
        >
          Link warranties to specific assets by choosing view next to the
          warranty you wish to edit. then, add the required information.
        </Typography>
        {/* </Box> */}
      </Box>

      <Box>
        <Table hoverRow>
          <thead>
          <tr>
                {warrantiesDatabase &&
                  warrantiesDatabase
                    .filter((field: any) => field.isTable)
                    .map((column: any, index: number) => (
                      <th
                        key={index}
                        style={{
                          background: '#fff8e6',
                          verticalAlign: 'middle',
                          wordBreak: 'break-word',
                          whiteSpace: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        {column.fieldName}
                      </th>
                    ))}
                <th
                  style={{
                    background: '#fff8e6',
                    verticalAlign: 'middle',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    textAlign: 'left',
                  }}
                >
                  Action
                </th>
              </tr>
          </thead>
        </Table>
      </Box>

      {/* <Box>
        <MaintenanceEmpty/>
      </Box> */}
      </Box>
    </AppView>
  )
}

export default WarrantyExpiring

