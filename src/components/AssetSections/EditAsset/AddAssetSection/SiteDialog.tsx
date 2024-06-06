import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  Input,
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

import { AiOutlineClose } from "react-icons/ai";

interface SiteDialogProps {
  open: boolean;
  closePopUp: () => void;
}

interface FormData {
  site: string;
  description: string;
  address: string;
  aptSuite: string;
  city: string;
  state: string;
  postalCode: number | ""; // Allow empty string for initial state
  country: string;
}

const SiteDialog: React.FC<SiteDialogProps> = (props) => {
  const [formData, setFormData] = useState<FormData>({
    site: "",
    description: "",
    address: "",
    aptSuite: "",
    city: "",
    state: "",
    postalCode: "", // Initial state as empty string
    country: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: name === "postalCode" ? Number(value) : value as string,
    }));
  };

  const validateForm = () => {
    if (!formData.site) {
      setError("Site is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleAdd = () => {
    if (validateForm()) {
      // Handle the add action here
    }
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.closePopUp} fullWidth >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Add a Site</Typography>
            <IconButton onClick={props.closePopUp}>
              <AiOutlineClose />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <Box sx={{
              mb: "25px",
            }}>
            <Typography>Enter the data about your new site in the fields below and we will add it to your list.</Typography>
          </Box>

          {[
            { label: "Site", name: "site" },
            { label: "Description", name: "description" },
            { label: "Address", name: "address" },
            { label: "Apt./Suite", name: "aptSuite" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Postal Code", name: "postalCode" },
          ].map((field) => (
            <Box
              key={field.name}
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
                <Typography>{field.label}</Typography>
              </Box>
              <Input
                name={field.name}
                value={formData[field.name as keyof FormData]}
                onChange={handleChange}
                sx={{ borderRadius: "15px", height: "56px", width: "350px" }}
              />
            </Box>
          ))}

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
              <Typography>Country</Typography>
            </Box>
            <Select
              name="country"
              value={formData.country}
              onChange={handleChange}
              renderValue={(selected) => {
                if (selected?.length === 0 || selected === undefined) {
                  return "Select Country";
                }
                return selected;
              }}
              sx={{ borderRadius: "15px", width: "350px" }}
            >
              <MenuItem value="">Select Country</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="Germany">Germany</MenuItem>
              <MenuItem value="Singapore">Singapore</MenuItem>
            </Select>
          </Box>

          {error && (
            <Typography color="error" sx={{ textAlign: "center", mb: "25px" }}>
              {error}
            </Typography>
          )}
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
              onClick={props.closePopUp}
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

export default SiteDialog;