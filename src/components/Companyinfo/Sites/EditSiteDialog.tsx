import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Input, Button, FormControl } from "@mui/joy";
import { Site } from "./Sites";
import { updateSites } from "../../../Redux/features/SitesSlice";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../Redux/store";
import { useDispatch } from "react-redux";
import AppForm from "../../Common/AppForm";

interface EditSiteDialogProps {
  open: boolean
  onClose: () => void
  site: Site | null
  onSave: (updatedSite: Site) => void

}

const EditSiteDialog: React.FC<EditSiteDialogProps> = ({ open, onClose, site, onSave }) => {
    const [editedSite, setEditedSite] = useState<Site | null>(site)
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

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

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await dispatch(updateSites(editedSite))
      onClose()
    }

  return (
    <Modal open={open} onClose={onClose}>

      <Box sx={modalStyle}>
        <Typography level="h4" sx={{ mb: 2 }}>
          Edit Site
        </Typography>
        {editedSite && (
        <AppForm onSubmit={handleSave}>

          <FormControl sx={{ mb: 2 }}>
        <Input
          placeholder="Site Name"
          name="siteName"
          value={editedSite.siteName}
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
          placeholder="Zip Code"
          name="zipCode"
          value={editedSite.zipCode}
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
          <Button type="submit">Update</Button>
        </Box>
        </AppForm>
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
