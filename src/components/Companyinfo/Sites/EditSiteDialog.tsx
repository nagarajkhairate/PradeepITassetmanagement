import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Input, Button, FormControl } from "@mui/joy";
import { Site } from "./Sites";

interface EditSiteDialogProps {
  open: boolean
  onClose: () => void
  site: Site | null
  onSave: (updatedSite: Site) => void

//   site: {
//     id: number;
//     sitename: string;
//     description: string;
//     address: string;
//     aptSuite: string;
//     city: string;
//     state: string;
//     zip: string;
//     country: string;
//   };
//   sites: {
//     id: number;
//     sitename: string;
//     description: string;
//     address: string;
//     aptSuite: string;
//     city: string;
//     state: string;
//     zip: string;
//     country: string;
//   }[];
//   setSites: React.Dispatch<React.SetStateAction<any[]>>;
}

const EditSiteDialog: React.FC<EditSiteDialogProps> = ({ open, onClose, site, onSave }) => {
    const [editedSite, setEditedSite] = useState<Site | null>(site)

    React.useEffect(() => {
      setEditedSite(site)
    }, [site])
   

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (editedSite) {
        setEditedSite({
          ...editedSite,
          [event.target.name]: event.target.value,
        })
      }
    }

  // const handleEditSite = () => {
  //     const updatedSites = { ...updatedSite};
  //     setSites([updatedSites]);
  //     onClose();
  //   }

    const handleSave = () => {
      if (editedSite) {
        onSave(editedSite)
        onClose();
      }
    }

  // if (!updatedSite) {
  //   return null; 
  // }

  return (
    <Modal open={open} onClose={onClose}>

      <Box sx={modalStyle}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Edit Site
        </Typography>
        {editedSite && (
        <form onSubmit={handleSave}>

          <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="Site Name"
          name="sitename"
          value={editedSite.sitename}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
<FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="Description"
          name="description"
          value={editedSite.description}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="Address"
          name="address"
          value={editedSite.address}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="Apt. / Suite"
          name="aptSuite"
          value={editedSite.aptSuite}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="City"
          name="city"
          value={editedSite.city}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
         </FormControl>
         <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="State"
          name="state"
          value={editedSite.state}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="Zip"
          name="zip"
          value={editedSite.zip}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        </FormControl>
        <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="Country"
          name="country"
          value={editedSite.country}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave}>Update</Button>
        </Box>
        </form>
        )}
      </Box>
    </Modal>
  );
};

export default EditSiteDialog;

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f9f9f9",
  p: 4,
  borderRadius: 10,
};
