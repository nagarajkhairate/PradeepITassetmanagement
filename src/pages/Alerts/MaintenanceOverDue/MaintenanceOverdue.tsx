import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/joy";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Table from "@mui/joy/Table";
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AppView from "../../../components/Common/AppView";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/store";
import { fetchAlertsMaintenanceOverDue } from "../../../redux/features/AlertsMaintenanceOverDueSlice";
import { fetchMaintenanceDatabase } from "../../../redux/features/MaintenanceDatabaseSlice";


export const MaintenanceOverdue: React.FC = () => {

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const alertsMaintenanceOverDue = useSelector((state: RootState) => state.alertsMaintenanceOverDue.data)
  const maintenanceDatabase = useSelector(
    (state: RootState) => state.maintenanceDatabase.data,
  )

  const location = useLocation()
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [formData, setFormData] = useState<any>()

  useEffect(() => {
    if (location.state && location.state.selectedColumns) {
      setSelectedColumns(location.state.selectedColumns)
    }
  }, [location.state])

  useEffect(() => {
    dispatch(fetchAlertsMaintenanceOverDue())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchMaintenanceDatabase())
  }, [dispatch])


  return (
    <AppView>
          
          <Typography level="h3"> Maintenance OverDue</Typography>

          <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,

          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
            // gap:{md:"100px",xs:"5px"}
            justifyContent: { xs: 'center', md: 'space-between' },
          gap: '5px',
          }}
        >
          
                  <Typography level="h4">List of Maitenances</Typography>
         
          {/* <Button
            type="button"
            variant="solid"
            autoFocus
            sx={{
              background: "#1CCAB8",
              color: "white",
              borderRadius: "15px"
            }}
            >
            <SettingsOutlinedIcon />
            Search Criteria
          </Button>
           */}

          <Box 
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap:"5px" }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#388e3c",
                  color: "white",
                  borderRadius: "10px",
                  '&:hover':{background:'#387e3c'},
                }}
               
              >
                 <CloudUploadOutlinedIcon />
                Export to Excel
              </Button>
              <Link to='/alerts/maintenances-over-due/import-maintenance' style={{ textDecoration: 'none' }}>
              <Button
                variant="solid"
                autoFocus
                sx={{
                  background: "#2196f3",
                  color: "white",
                  borderRadius: "10px",
                  whiteSpace: "nowrap",
                 
                }}
              >
                <CloudUploadOutlinedIcon />
                Import Maintanence
              </Button>
              </Link>

              <Link to='/alerts/maintenances-over-due/maintenance-over-due-set-up-column' style={{ textDecoration: 'none' }}>
              <Button
                type="button"
                variant="solid"
                autoFocus
                sx={{
                  background: 'black',
                  color: 'white',
                  borderRadius: '10px',
                  '&:hover': { background: '#424242' },
                  width: { xs: '100%', md: 'auto' },
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
           gap:{md:"50px",xs:"3px"},
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
            {/* <Select
              placeholder="Maintenance Overdue"
              indicator={<KeyboardArrowDown />}
              sx={{
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                // marginTop: { md: '20%', xs: '10px' },
                borderRadius: "15px",
                
              }}
            >
              <Option value="term1">Term 1</Option>
              <Option value="term2">Term 2</Option>
              <Option value="term3">Term 3</Option>
              <Option value="term4">Term 4</Option>
            </Select> */}
          

          
            {/* <Select
              placeholder="10"
              indicator={<KeyboardArrowDown />}
              sx={{
                width: 75,
                [`& .${selectClasses.indicator}`]: {
                  transition: "0.2s",
                  [`&.${selectClasses.expanded}`]: {
                    transform: "rotate(-180deg)",
                  },
                },
                // marginTop: { md: '34%', xs: '10px' },
                borderRadius: "15px",
              
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
        }}
        color="danger"
        >   
        Assets that are more than 7 days overdue for maintenance (as indicated by overdue time)                  
            </Typography>
        </Box>

        <Box
          sx={{
            overflowX: 'auto',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            borderRadius: '5px',
            mt: 2,
          }}
        >
          <Table
            borderAxis="both"
            aria-label="basic table"
            style={{
              borderCollapse: 'collapse',
              border: '1px solid grey',
              minWidth: '500px',
              borderRadius: '5px',
            }}
          >
            <thead>
              <tr>
              {maintenanceDatabase &&
                  maintenanceDatabase
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
              </tr>
            </thead>
            {/* <tbody>
              {alertsMaintenanceOverDue.map((lease: any, rowIndex: number) => (
                <tr key={rowIndex}>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                  
                    {lease.maintenanceTitle}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceDetails}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceDueDate}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceBy}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceStatus}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.dateCompleted}
                  </td>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {lease.maintenanceCost}
                  </td>
                </tr>
              ))}
            </tbody> */}
            <tbody>
              {alertsMaintenanceOverDue.map((contract: any) => (
                <tr key={contract}>
                  {maintenanceDatabase &&
                    maintenanceDatabase
                      .filter((field: any) => field.isTable)
                      .map((column: any, colIndex: number) => (
                        <td
                          key={colIndex}
                          style={{
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                            textAlign: 'left',
                          }}
                        >
                          {selectedColumns.includes(column.name)
                            ? formData[column.name]
                            : contract[column.name]}
                        </td>
                      ))}
                     {/* <td
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'flex-start',
    gap:4,
  }}
>
  <Button
    sx={{
      fontSize: '10px',
      display:'flex',
     justifyContent:'flex-start',
marginLeft:'none'
    }}
  >
    Edit
  </Button>
  <Button

  >
    <Link
      to={`/alerts/maintenance-due/view-maintenance/${contract.id}`}
      style={{ color: 'inherit', fontSize: '4px', display: 'flex', alignItems: 'center' }}
    >
      <RemoveRedEyeIcon
        sx={{ fontSize: '15px', color: 'black' }}
      />
    </Link>
  </Button>
</td> */}

                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
</Box>

    </AppView>
  );
};

export default MaintenanceOverdue;
