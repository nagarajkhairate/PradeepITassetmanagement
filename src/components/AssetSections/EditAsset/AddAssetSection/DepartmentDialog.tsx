import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Input,
} from "@mui/joy"; 
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";

import { AiOutlineClose } from "react-icons/ai";

interface DepartmentDialogProps {
  departmentOpen: boolean;
  closeDepartment: () => void;
}

const DepartmentDialog: React.FC<DepartmentDialogProps> = (props) => {
  const [department, setDepartment] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handleAdd = () => {
    // Handle the add action here
  };

  return (
    <>
      <Dialog open={props.departmentOpen} onClose={props.closeDepartment} fullWidth >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Add a Department</Typography>
            <IconButton onClick={props.closeDepartment}>
              <AiOutlineClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <Box sx={{ mb: "25px" }}>
            <Typography>Add departments that own or house the particular assets. Make them as broad or as specific as you want. Departments can be 'Accounting', 'Marketing', or 'Executive'. Customize to your particular need.</Typography>
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
            <Box sx={{ marginRight: "5px", width: '100px' }}>
              <Typography>Department</Typography>
            </Box>
            <Input
              value={department}
              onChange={handleChange}
              sx={{ borderRadius: "15px", height: "56px", width: "350px" }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ border: "1px solid #E0E1E3" }}>
          <Box
            sx={{
              paddingBottom: "10px",
              display: "flex",
              gap: "5px",
            }}
          >
            <Button
              onClick={handleAdd}
              sx={{
                background: "rgb(245,193,67)",
                "&:hover": {
                  backgroundColor: "rgb(255,199,79)",
                },
                borderRadius: "15px"
              }}
            >
              Add
            </Button>
            <Button
              onClick={props.closeDepartment}
              sx={{
                background: "white",
                color: "black",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "#f9f9f9",
                },
                borderRadius: "15px"
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DepartmentDialog;