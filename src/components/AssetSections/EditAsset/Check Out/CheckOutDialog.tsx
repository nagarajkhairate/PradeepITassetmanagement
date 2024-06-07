import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Input,
  Textarea,
  Checkbox,
} from "@mui/joy";
import {
  Select,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent, 
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import EmployeeDialog from "./EmployeeDialog";
import ClientDialog from "./ClientDialog";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux/store";
import { useDispatch } from "react-redux";
import { post_check_out } from "../../../../Redux/features/transactionSlice";


// Define a type for the checkout and employee data
interface CheckoutData {
  employee_id:string;
  asset_id:string;
  check_out_date: string;
  assigned_to: string;
  client:string;
  due_date: string;
  check_out_site: string;
  check_out_location: string;
  check_out_department: string;
  check_out_notes: string;
  emailAddress?: string; // Optional because it's conditionally added
}

interface CheckoutErrors{
  employee_id?:string;
  asset_id?:string;
  check_out_date?: string;
  assigned_to?: string;
  client?:string;
  due_date?: string;
  check_out_site?: string;
  check_out_location?: string;
  check_out_department?: string;
  check_out_notes?: string;
  emailAddress?: string;
}

const CheckOutDialog = (props: any) => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    employee_id:"",
    asset_id:"",
    check_out_date: "",
    assigned_to: "",
    client:"",
    due_date: "",
    check_out_site: "",
    check_out_location: "",
    check_out_department: "",
    check_out_notes: "",
    emailAddress: "",
  });

  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [employees, setEmployees] = useState([{ name: "Default Employee" }]);
  const [clients,setClients] = useState([{name:"Default Client"}])
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  // Event handler for the Check-Out button
  const handleCheckOut = () => {
    if(validateForm()){
      console.log(checkoutData)
      dispatch(post_check_out(checkoutData))
    }
    console.log({
      ...checkoutData,
      ...(sendEmail && { emailAddress: checkoutData.emailAddress }), // Conditionally add emailAddress
    });
    // Here you can also send this data to a server or handle it as needed
  };

  const [newDialogOpen, setNewDialogOpen] = useState<boolean>(false);
  const [newClientDialogOpen ,setNewClientDialogOpen] = useState<boolean>(false)

  const openClientDialog =()=>{
    setNewClientDialogOpen(true)
  }

  const closeClientDialog =()=>{
    setNewClientDialogOpen(false)
  }

  const openNewDialog = () => {
    setNewDialogOpen(true);
  };

  const closeNewDialog = () => {
    setNewDialogOpen(false);
  };
  const handleNewEmployeeAdded = (newEmployeeName: string) => {
    setCheckoutData({
      ...checkoutData,
      assigned_to: newEmployeeName, // Update the assigned_to field with the new employee's name
    });
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { name: newEmployeeName },
    ]); // Add the new employee to the list
    closeNewDialog(); // Close the EmployeeDialog
  };

  const handleNewClientAdded = (newClientName: string) => {
    console.log("New client added:", newClientName);
    setCheckoutData({
      ...checkoutData,
      client: newClientName, // Update the assigned_to field with the new employee's name
    });
    setClients((prevClient) => [
      ...prevClient,
      { name: newClientName },
    ]); // Add the new employee to the list
    closeClientDialog(); 
  };

  const [errors, setErrors] = useState<CheckoutErrors>({});

  const validateForm = (): boolean => {
  let tempErrors: CheckoutErrors = {};
  let isValid = true;

  // Validation logic here
  if (!checkoutData.employee_id) {
    tempErrors.employee_id = "Employee Id is required";
    isValid = false;
  }
  if (!checkoutData.asset_id) {
    tempErrors.asset_id = "Asset Id is required";
    isValid = false;
  }
  if (!checkoutData.check_out_date) {
    tempErrors.check_out_date = "Check Out Date is required";
    isValid = false;
  }
  if (!checkoutData.assigned_to) {
    tempErrors.assigned_to = "Assign to is required";
    isValid = false;
  }
  if (!checkoutData.client) {
    tempErrors.client = "Client is required";
    isValid = false;
  }
  if (!checkoutData.due_date) {
    tempErrors.due_date = "Due Date is required";
    isValid = false;
  }
  if (!checkoutData.check_out_site) {
    tempErrors.check_out_site = "Site is required";
    isValid = false;
  }
  if (!checkoutData.check_out_location) {
    tempErrors.check_out_location = "Location is required";
    isValid = false;
  }
  if (!checkoutData.check_out_department) {
    tempErrors.check_out_department = "Department is required";
    isValid = false;
  }
  if (!checkoutData.check_out_notes) {
    tempErrors.check_out_notes = "Notes are required";
    isValid = false;
  }
  // Add similar checks for other fields

  setErrors(tempErrors);
  return isValid;
};


  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Check Out</Typography>
            <IconButton onClick={props.closePopUp}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
         
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>
              <Typography>Employee Id</Typography>
              </Box>
              <Input 
              value={checkoutData.employee_id}
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  employee_id: e.target.value,
                })
              }
              sx={{borderRadius: "15px",height:"56px",width:"350px"}}
              ></Input>
              {errors.employee_id && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.employee_id}
              </Typography>
            )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>
              <Typography>Asset Id</Typography>
              </Box>
              <Input
              value={checkoutData.asset_id}
              onChange={(e) =>
                setCheckoutData({
                  ...checkoutData,
                  asset_id: e.target.value,
                })
              }
              sx={{borderRadius: "15px",height:"56px",width:"350px"}}
              
              ></Input>
               {errors.asset_id && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.asset_id}
              </Typography>
            )}
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>
              <Typography>Check-Out Date</Typography>
              </Box>
              <Input
                value={checkoutData.check_out_date}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    check_out_date: e.target.value,
                  })
                }
                type="date"
                sx={{width:"350px" ,borderRadius:"15px",height:"56px"}}
              ></Input>
              {errors.check_out_date && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.check_out_date}
              </Typography>
            )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px',ml:"53px"}}>
              <Typography>Assign to</Typography>
              </Box>
              <Select
                value={checkoutData.assigned_to}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    assigned_to: e.target.value,
                  })
                }
                sx={{borderRadius: "15px",width:"350px"}}
              >
                {employees.map((employee, index) => (
                  <MenuItem key={index} value={employee.name}>
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>

              <Button
                sx={{
                  background: "white",
                  border: "1.5px solid black",
                  color: "#000000",
                  borderRadius: "15px",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
                onClick={openNewDialog}
              >
                New
              </Button>
              {errors.assigned_to && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.assigned_to}
              </Typography>
            )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px',ml:"53px"}}>
              <Typography>Client</Typography>
              </Box>
              <Select
                value={checkoutData.client}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    client: e.target.value,
                  })
                }
                sx={{borderRadius: "15px",width:"350px"}}
              >
                {clients.map((client, index) => (
                  <MenuItem key={index} value={client.name}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>

              <Button
                sx={{
                  background: "white",
                  border: "1.5px solid black",
                  color: "#000000",
                  borderRadius: "15px",
                  "&:hover": {
                    backgroundColor: "#f9f9f9",
                  },
                }}
                onClick={openClientDialog}
              >
                New
              </Button>
              {errors.client && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.client}
              </Typography>
            )}
            </Box>



            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>
              <Typography>Due Date</Typography>
              </Box>
              <Input
                value={checkoutData.due_date}
                onChange={(e) =>
                  setCheckoutData({ ...checkoutData, due_date: e.target.value })
                }
                type="date"
                sx={{width:"350px",borderRadius:"15px",height:"56px"}}
              />
              {errors.due_date && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.due_date}
              </Typography>
            )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>

              <Typography>
              Site
              </Typography>
              </Box>
              <Select
                value={checkoutData.check_out_site}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    check_out_site: e.target.value,
                  })
                }
                renderValue={(selected) => {
                  if (selected?.length === 0 || selected === undefined) {
                    return "Search Asset Tag ID or Description";
                  }
                  return selected;
                }}
                sx={{ borderRadius: "15px",width:"350px" }}
              >
                <MenuItem>Search Asset Tag ID or Description</MenuItem>
                <MenuItem value="Asset 1asdfasdfa adas">Asset 1</MenuItem>
                <MenuItem value="Asset 2 adfa sdfasfadf ">Asset 2</MenuItem>
                <MenuItem value="Asset 3 asdf asfdasfaf">Asset 3</MenuItem>
                <MenuItem value="Asset 4 asdfasdfasfasf ">Asset 3</MenuItem>
                <MenuItem value="Asset 5 afadfasdfasdff">Asset 3</MenuItem>
              </Select>
              {errors.check_out_site && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.check_out_site}
              </Typography>
            )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>
              <Typography>Location</Typography>
              </Box>
              <Input
                value={checkoutData.check_out_location}
                onChange={(e) =>
                  setCheckoutData({ ...checkoutData, check_out_location: e.target.value })
                }
                sx={{borderRadius: "15px",height:"56px",width:"350px"}}
              />
              {errors.check_out_location && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.check_out_location}
              </Typography>
            )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>
              <Typography>
              Department
              </Typography>
              </Box>
              <Select
                value={checkoutData.check_out_department}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    check_out_department: e.target.value,
                  })
                }
                renderValue={(selected) => {
                  if (selected?.length === 0 || selected === undefined) {
                    return "Dev";
                  }
                  return selected;
                }}
                sx={{ borderRadius: "15px",width:"350px" }}
              >
                <MenuItem>Search Asset Tag ID or Description</MenuItem>
                <MenuItem value="Asset 1asdfasdfa adas">Asset 1</MenuItem>
                <MenuItem value="Asset 2 adfa sdfasfadf ">Asset 2</MenuItem>
                <MenuItem value="Asset 3 asdf asfdasfaf">Asset 3</MenuItem>
                <MenuItem value="Asset 4 asdfasdfasfasf ">Asset 3</MenuItem>
                <MenuItem value="Asset 5 afadfasdfasdff">Asset 3</MenuItem>
              </Select>
              {errors.check_out_department && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.check_out_department}
              </Typography>
            )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Box sx={{marginRight:"5px",width:'100px'}}>
              <Typography>Check Out Notes</Typography>
              </Box>
              <Textarea
                value={checkoutData.check_out_notes}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    check_out_notes: e.target.value,
                  })
                }
                minRows={6}
                sx={{borderRadius: "15px",width:"350px"}}
              />
              {errors.check_out_notes && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.check_out_notes}
              </Typography>
            )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Checkbox
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
              />
              <Typography>Send Email</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: "25px",
              }}
            >
              <Input
                value={checkoutData.emailAddress}
                onChange={(e) =>
                  setCheckoutData({
                    ...checkoutData,
                    emailAddress: e.target.value,
                  })
                }
                disabled={!sendEmail} // Disable this input if sendEmail is false
                sx={{borderRadius: "15px"}}
              />
            </Box>
        </DialogContent>
        <DialogActions sx={{border:"1px solid #E0E1E3"}}>
          <Box
            sx={{
              paddingBottom: "10px",
              display: "flex",
              gap: "5px",
            }}
          >
            <Button
              onClick={handleCheckOut}
              sx={{
                background: "rgb(245,193,67)",
                "&:hover": {
                  backgroundColor: "rgb(255,199,79)",
                },
                borderRadius:"15px"
              }}
            >
              Check-Out
            </Button>
            <Button
              onClick={props.closePopUp}
              sx={{
                background: "white",
                color: "black",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
                borderRadius:"15px"
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions >
      </Dialog>
      <EmployeeDialog
        open={newDialogOpen}
        onClose={closeNewDialog}
        onAddEmployee={handleNewEmployeeAdded}
      />
    <ClientDialog open={newClientDialogOpen} onClose={closeClientDialog} onAddClient={handleNewClientAdded}/>
    </>
  );
};

export default CheckOutDialog;


