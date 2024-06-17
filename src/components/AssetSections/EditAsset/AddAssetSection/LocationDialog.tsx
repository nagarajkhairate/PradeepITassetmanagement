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
  Select,
  MenuItem
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

interface LocationDialogProps {
  open: boolean;
  onClose: () => void;
}

const LocationDialog: React.FC<LocationDialogProps> = (props) => {
  const [location, setLocation] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleAdd = () => {
    // Handle the add action here
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
            <Typography>Add a location</Typography>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <Box sx={{ mb: "25px" }}>
            <Typography>Enter the data about your new location in the fields below and we will add it to your list.</Typography>
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
              <Typography>Site</Typography>
            </Box>
            <Select sx={{ borderRadius: "15px", width: "350px" }}>
              <MenuItem></MenuItem>
              <MenuItem></MenuItem>
              <MenuItem></MenuItem>
            </Select>
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
              <Typography>Location</Typography>
            </Box>
            <Input
              value={location}
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
              onClick={props.onClose}
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

export default LocationDialog;