import React, { useState } from "react";
import {
  Box,
  FormLabel,
  Button,
  Divider,
  Input,
  Textarea,
  Checkbox,
  Select,
  Option,
  Modal,
  IconButton,
  FormControl,
  Typography,
} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import EmployeeDialog from "./EmployeeDialog";
import ClientDialog from "./ClientDialog";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addCheckOut } from "../../redux/features/CheckOutSlice";
import AppForm from "../../components/Common/AppForm";

// Define a type for the checkout and employee data
interface CheckoutData {
  employeeId: string;
  assetId: string;
  checkOutDate: string;
  assignedTo: string;
  client: string;
  dueDate: string;
  checkOutSiteId: string;
  checkOutLocationId: string;
  checkOutDepartmentId: string;
  checkOutNotes: string;
  emailAddress?: string;
}

interface CheckoutErrors {
  employeeId?: string;
  assetId?: string;
  checkOutDate?: string;
  assignedTo?: string;
  client?: string;
  dueDate?: string;
  checkOutSiteId?: string;
  checkOutLocationId?: string;
  checkOutDepartmentId?: string;
  checkOutNotes?: string;
  emailAddress?: string;
}

interface CheckOutModalProps {
  selectedAssets: any;
  open: boolean;
  onClose: () => void;
}

const CheckOutOption = (props: any) => {
  const [checkoutData, setCheckoutData] = useState({
    employeeId:"" ,
    assetId:"" ,
    checkOutDate: "",
    assignedTo: "",
    client: "",
    dueDate: "",
    checkOutSiteId: "",
    checkOutLocationId:"" ,
    checkOutDepartmentId: "",
    checkOutNotes: "",
    emailAddress: "",
  });

  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [employees, setEmployees] = useState([{ name: "Default Employee" }]);
  const [clients, setClients] = useState([{ name: "Default Client" }]);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  // Event handler for the Check-Out button
  const handleCheckOut =  async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
     await dispatch(addCheckOut(checkoutData))
      console.log(checkoutData);
    }
    console.log({
      ...checkoutData,
      ...(sendEmail && { emailAddress: checkoutData.emailAddress }), // Conditionally add emailAddress
    });
    // Here you can also send this data to a server or handle it as needed
  };

  const [newDialogOpen, setNewDialogOpen] = useState<boolean>(false);
  const [newClientDialogOpen, setNewClientDialogOpen] = useState<boolean>(false);

  const openClientDialog = () => {
    setNewClientDialogOpen(true);
  };

  const closeClientDialog = () => {
    setNewClientDialogOpen(false);
  };

  const openNewDialog = () => {
    setNewDialogOpen(true);
  };

  const closeNewDialog = () => {
    setNewDialogOpen(false);
  };

  const handleNewEmployeeAdded = (newEmployeeName: string) => {
    setCheckoutData({
      ...checkoutData,
      assignedTo: newEmployeeName, // Update the assignedTo field with the new employee's name
    });
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { name: newEmployeeName },
    ]); 
    closeNewDialog(); // Close the EmployeeDialog
  };

  const handleNewClientAdded = (newClientName: string) => {
    console.log("New client added:", newClientName);
    setCheckoutData({
      ...checkoutData,
      client: newClientName, // Update the assignedTo field with the new employee's name
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
    if (!checkoutData.employeeId) {
      tempErrors.employeeId = "Employee Id is required";
      isValid = false;
    }
    if (!checkoutData.assetId) {
      tempErrors.assetId = "Asset Id is required";
      isValid = false;
    }
    if (!checkoutData.checkOutDate) {
      tempErrors.checkOutDate = "Check Out Date is required";
      isValid = false;
    }
    if (!checkoutData.assignedTo) {
      tempErrors.assignedTo = "Assign to is required";
      isValid = false;
    }
    if (!checkoutData.client) {
      tempErrors.client = "Client is required";
      isValid = false;
    }
    if (!checkoutData.dueDate) {
      tempErrors.dueDate = "Due Date is required";
      isValid = false;
    }
    if (!checkoutData.checkOutSiteId) {
      tempErrors.checkOutSiteId = "Site is required";
      isValid = false;
    }
    if (!checkoutData.checkOutLocationId) {
      tempErrors.checkOutLocationId = "Location is required";
      isValid = false;
    }
    if (!checkoutData.checkOutDepartmentId) {
      tempErrors.checkOutDepartmentId = "Department is required";
      isValid = false;
    }
    if (!checkoutData.checkOutNotes) {
      tempErrors.checkOutNotes = "Notes are required";
      isValid = false;
    }
    // Add similar checks for other fields

    setErrors(tempErrors);
    return isValid;
  };

  return (
    <AppForm onSubmit={handleCheckOut}>
    {/* <FormControl> */}
      <Modal open={props.open} onClose={props.onClose}>
        <Box 
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          borderRadius: 1,
          bgcolor:'#fff',
          p: 4,
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            pb: 1,
          }}
        >
            <Typography level='h4' >Check Out</Typography>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box
           sx={{
             overflowY: "auto",
            flexGrow: 1,
            py: 2,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#aaa',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f1f1f1',
            },
          }}
            >
            <Box sx={{ mb: 1 }}>
              <FormLabel>Employee Id</FormLabel>
              <Input
                value={checkoutData.employeeId}
                onChange={(e) => setCheckoutData({ ...checkoutData, employeeId:e.target.value })}
                type="number"
                // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
              />
              {errors.employeeId && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.employeeId}
                </FormLabel>
              )}
            </Box>

            <Box 
            sx={{ mb: 1 }}
            >
              <FormLabel>Asset Id</FormLabel>
              <Input
                value={checkoutData.assetId}
                onChange={(e) => setCheckoutData({ ...checkoutData, assetId: e.target.value})}
                type="number"
                // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
              />
              {errors.assetId && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.assetId}
                </FormLabel>
              )}
            </Box>

            <Box 
            sx={{ mb: 1 }}
            >
              <FormLabel>Check-Out Date</FormLabel>
              <Input
                value={checkoutData.checkOutDate}
                onChange={(e) => setCheckoutData({ ...checkoutData, checkOutDate: e.target.value})}
                type="date"
                // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
              />
              {errors.checkOutDate && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.checkOutDate}
                </FormLabel>
              )}
            </Box>

            <Box
             sx={{ mb: 1, display: "flex", alignItems: "center" }}
             >
              <FormLabel sx={{ flex: "1" }}>Assign to</FormLabel>
              <Input
                value={checkoutData.assignedTo}
                onChange={(e) => setCheckoutData({ ...checkoutData, assignedTo: e.target.value})}
                sx={{ borderRadius: "15px", width: "100%" }}
              >
                {employees.map((employee, index) => (
                  <Option key={index} value={employee.name}>
                    {employee.name}
                  </Option>
                ))}
              </Input>
              <Button onClick={openNewDialog} sx={{ ml: 1 }}>
                New
              </Button>
              {errors.assignedTo && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.assignedTo}
                </FormLabel>
              )}
            </Box>

            <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
              <FormLabel sx={{ flex: "1" }}>Client</FormLabel>
              <Input
                value={checkoutData.client}
                onChange={(e) => setCheckoutData({ ...checkoutData, client: e.target.value })}
                // sx={{ borderRadius: "15px", width: "100%" }}
              >
                {clients.map((client, index) => (
                  <Option key={index} value={client.name}>
                    {client.name}
                  </Option>
                ))}
              </Input>
              <Button onClick={openClientDialog} sx={{ ml: 1 }}>
                New
              </Button>
              {errors.client && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.client}
                </FormLabel>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <FormLabel>Due Date</FormLabel>
              <Input
                value={checkoutData.dueDate}
                onChange={(e) => setCheckoutData({ ...checkoutData, dueDate: e.target.value })}
                type="date"
                // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
              />
              {errors.dueDate && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.dueDate}
                </FormLabel>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <FormLabel>Site</FormLabel>
              <Input
                value={checkoutData.checkOutSiteId}
                onChange={(e) => setCheckoutData({ ...checkoutData, checkOutSiteId: e.target.value})}
                type="number"
                // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
              />
              {errors.checkOutSiteId && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.checkOutSiteId}
                </FormLabel>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <FormLabel>Location</FormLabel>
              <Input
                value={checkoutData.checkOutLocationId}
                onChange={(e) => setCheckoutData({ ...checkoutData, checkOutLocationId: e.target.value})}
                type="number"
                // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
              />
              {errors.checkOutLocationId && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.checkOutLocationId}
                </FormLabel>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <FormLabel>Department</FormLabel>
              <Input
                value={checkoutData.checkOutDepartmentId}
                onChange={(e) => setCheckoutData({ ...checkoutData, checkOutDepartmentId: e.target.value })}
                type="number"
                // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
              />
              {errors.checkOutDepartmentId && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.checkOutDepartmentId}
                </FormLabel>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <FormLabel>Notes</FormLabel>
              <Textarea
                value={checkoutData.checkOutNotes}
                onChange={(e) => setCheckoutData({ ...checkoutData, checkOutNotes: e.target.value })}
                sx={{ borderRadius: "15px", width: "100%" }}
              />
              {errors.checkOutNotes && (
                <FormLabel sx={{ color: "red", mt: 1 }}>
                  {errors.checkOutNotes}
                </FormLabel>
              )}
            </Box>

            <Box sx={{ mb: 1 }}>
              <Checkbox
                checked={sendEmail}
                onChange={(e) => setSendEmail(e.target.checked)}
                label="Send Email"
              />
              {sendEmail && (
                <Input
                  type="email"
                  value={checkoutData.emailAddress}
                  onChange={(e) => setCheckoutData({ ...checkoutData, emailAddress: e.target.value })}
                  placeholder="Enter email address"
                  // sx={{ borderRadius: "15px", height: "56px", width: "100%" }}
                />
              )}
            </Box>
          </Box>
          <Divider></Divider>
          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
            <Button onClick={props.closePopUp} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit">Check Out</Button>
          </Box>
        </Box>
      </Modal>
{/* 
      <EmployeeDialog
        open={newDialogOpen}
        onClose={closeNewDialog}
        onNewEmployeeAdded={handleNewEmployeeAdded}
      /> */}
      {/* <ClientDialog
        open={newClientDialogOpen}
        onClose={closeClientDialog}
        onNewClientAdded={handleNewClientAdded}
      /> */}
    {/* </FormControl> */}
    </AppForm>
  );
};

export default CheckOutOption;
