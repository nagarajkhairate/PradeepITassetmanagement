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
import CloseIcon from '@mui/icons-material/Close';


interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
}

const CategoryDialog: React.FC<CategoryDialogProps> = (props) => {
  const [category, setCategory] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
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
            <Typography>Add a Category</Typography>
            <IconButton onClick={props.onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <Box sx={{ mb: "25px" }}>
            <Typography>If you want to add a new category of assets, you’re in the right spot. Add a category for computer equipment, wireless keyboards, or any assets you’re working with.</Typography>
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
              <Typography>Category</Typography>
            </Box>
            <Input
              value={category}
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

export default CategoryDialog;