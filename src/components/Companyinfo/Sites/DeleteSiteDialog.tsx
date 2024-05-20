import React from "react";
import { Modal, Box, Typography, Button } from "@mui/joy";

interface DeleteSiteDialogProps {
    deleteOpen: boolean;
    handleDelete: () => void;
    handleDeleteClose: () => void;
}

const DeleteSiteDialog: React.FC<DeleteSiteDialogProps> = ({ deleteOpen, handleDelete, handleDeleteClose }) => {
    return (
        <Modal open={deleteOpen} onClose={handleDeleteClose}>
            <Box sx={modalStyle}>
                <Typography level="h4" sx={{ mb: 2 }}>Confirm Delete</Typography>
                <Typography sx={{ mb: 3 }}>Are you sure you want to delete this site?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleDeleteClose} sx={{ mr: 1 }}>Cancel</Button>
                    <Button onClick={handleDelete} >Delete</Button> 
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteSiteDialog;

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f9f9f9',
    p: 4,
    borderRadius: 10,
  };
