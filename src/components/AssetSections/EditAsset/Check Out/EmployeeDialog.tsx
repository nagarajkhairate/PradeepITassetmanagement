import React, { useState } from "react";
import { Box, Typography, Button, Divider, Input, Textarea } from "@mui/joy";
import {
  Select,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  MenuItem,
} from "@mui/material";

import { AiOutlineClose } from "react-icons/ai";
import { RootState } from "../../../../Redux/Features/store";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { post_add_Employee } from "../../../../Redux/Features/addEmployeeSlice";

interface EmployeeData {
  emp_name: string;
  title: string;
  phone: string;
  email: string;
  emp_site: string;
  emp_location: string;
  emp_department: string;
  notes: string;
}

interface EmployeeErrors {
  emp_name?: string;
  title?: string;
  phone?: string;
  email?: string;
  emp_site?: string;
  emp_location?: string;
  emp_department?: string;
  notes?: string;
}

const EmployeeDialog = (props: any) => {
  const [employee, setEmployee] = useState<EmployeeData>({
    emp_name: "",
    title: "",
    phone: "",
    email: "",
    emp_site: "",
    emp_location: "",
    emp_department: "",
    notes: "",
  });

  const [errors, setErrors] = useState<EmployeeErrors>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const validateForm = (): boolean => {
    let tempErrors: EmployeeErrors = {};
    let isValid = true;

    // Validation logic here
    if (!employee.emp_name) {
      tempErrors.emp_name = "Full name is required";
      isValid = false;
    }
    if (!employee.title) {
      tempErrors.title = "Title is required";
      isValid = false;
    }
    if (!employee.phone) {
      tempErrors.phone = "Phone is required";
      isValid = false;
    }
    if (!employee.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    if (!employee.emp_site) {
      tempErrors.emp_site = "Site is required";
      isValid = false;
    }
    if (!employee.emp_location) {
      tempErrors.emp_location = "Location is required";
      isValid = false;
    }
    if (!employee.emp_department) {
      tempErrors.emp_department = "Department is required";
      isValid = false;
    }
    if (!employee.notes) {
      tempErrors.notes = "Notes are required";
      isValid = false;
    }
    // Add similar checks for other fields

    setErrors(tempErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (validateForm()) {
      console.log(employee);
      // Proceed with your onAdd logic
      props.onAddEmployee(employee.emp_name);
      dispatch(post_add_Employee(employee))
      
      // Reset form and errors if needed
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.onClose} fullWidth>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Add an Person/Employee</Typography>
            <IconButton onClick={props.onClose}>
              <AiOutlineClose />
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Full Name</Typography>
            </Box>
            <Input
              value={employee.emp_name}
              onChange={(e) =>
                setEmployee({ ...employee, emp_name: e.target.value })
              }
              sx={{borderRadius:"15px",height:"56px",width:"300px"}}
            />
            {errors.emp_name && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.emp_name}
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Title</Typography>
            </Box>
            <Input
              value={employee.title}
              onChange={(e) =>
                setEmployee({ ...employee, title: e.target.value })
              }
              sx={{borderRadius:"15px",height:"56px",width:"300px"}}
            />
            {errors.title && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.title}
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Phone</Typography>
            </Box>
            <Input
              value={employee.phone}
              onChange={(e) =>
                setEmployee({ ...employee, phone: e.target.value })
              }
              sx={{borderRadius:"15px",height:"56px",width:"300px"}}
            />
            {errors.phone && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.phone}
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Email</Typography>
            </Box>
            <Input
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
              sx={{borderRadius:"15px",height:"56px",width:"300px"}}
            />
            {errors.email && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.email}
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Site</Typography>
            </Box>
            <Select
              value={employee.emp_site}
              onChange={(e) =>
                setEmployee({ ...employee, emp_site: e.target.value })
              }
              renderValue={(selected) => {
                if (selected?.length === 0 || selected === undefined) {
                  return "Select Site";
                }
                return selected;
              }}
              sx={{ borderRadius: "15px",width:"300px" }}
            >
              <MenuItem>Search Asset Tag ID or Description</MenuItem>
              <MenuItem value="Asset 1 asdfasdfa adas">Asset 1</MenuItem>
              <MenuItem value="Asset 2 adfa sdfasfadf ">Asset 2</MenuItem>
              <MenuItem value="Asset 3 asdf asfdasfaf">Asset 3</MenuItem>
              <MenuItem value="Asset 4 asdfasdfasfasf ">Asset 3</MenuItem>
              <MenuItem value="Asset 5 afadfasdfasdff">Asset 3</MenuItem>
            </Select>
            {errors.emp_site && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.emp_site}
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Location</Typography>
            </Box>
            <Select
              value={employee.emp_location}
              onChange={(e) =>
                setEmployee({ ...employee, emp_location: e.target.value })
              }
              renderValue={(selected) => {
                if (selected?.length === 0 || selected === undefined) {
                  return "Select Location";
                }
                return selected;
              }}
              sx={{ borderRadius: "15px",width:"300px" }}
            >
              <MenuItem>Search Asset Tag ID or Description</MenuItem>
              <MenuItem value="Asset 1asdfasdfa adas">Asset 1</MenuItem>
              <MenuItem value="Asset 2 adfa sdfasfadf ">Asset 2</MenuItem>
              <MenuItem value="Asset 3 asdf asfdasfaf">Asset 3</MenuItem>
              <MenuItem value="Asset 4 asdfasdfasfasf ">Asset 3</MenuItem>
              <MenuItem value="Asset 5 afadfasdfasdff">Asset 3</MenuItem>
            </Select>
            {errors.emp_location && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.emp_location}
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Department</Typography>
            </Box>
            <Select
              value={employee.emp_department}
              onChange={(e) =>
                setEmployee({ ...employee, emp_department: e.target.value })
              }
              renderValue={(selected) => {
                if (selected?.length === 0 || selected === undefined) {
                  return "Select Department";
                }
                return selected;
              }}
              sx={{ borderRadius: "15px",width:"300px" }}
            >
              <MenuItem>Search Asset Tag ID or Description</MenuItem>
              <MenuItem value="Asset 1asdfasdfa adas">Asset 1</MenuItem>
              <MenuItem value="Asset 2 adfa sdfasfadf ">Asset 2</MenuItem>
              <MenuItem value="Asset 3 asdf asfdasfaf">Asset 3</MenuItem>
              <MenuItem value="Asset 4 asdfasdfasfasf ">Asset 3</MenuItem>
              <MenuItem value="Asset 5 afadfasdfasdff">Asset 3</MenuItem>
            </Select>
            {errors.emp_department && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.emp_department}
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
            <Box sx={{mr:"5px",width:"100px"}}>
            <Typography>Notes</Typography>
            </Box>
            <Textarea
              value={employee.notes}
              onChange={(e) =>
                setEmployee({ ...employee, notes: e.target.value })
              }
              minRows={6}
              sx={{borderRadius:"15px",width:"300px"}}
            />
            {errors.notes && (
              <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
                {errors.notes}
              </Typography>
            )}
          </Box>
          <Divider></Divider>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              background: "rgb(245,193,67)",
              "&:hover": {
                backgroundColor: "rgb(255,199,79)",
              },
              borderRadius:"15px"
            }}
            onClick={handleAdd}
          >
            Add
          </Button>
          <Button
            onClick={props.onClose}
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeDialog;
