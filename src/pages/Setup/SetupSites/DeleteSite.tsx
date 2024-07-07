import React from "react";
import { Modal, Box, Typography, Button } from "@mui/joy";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/store";

interface DeleteSiteProps {
    deleteOpen: boolean;
    handleDelete: () => void;
    handleDeleteClose: () => void;
}

const DeleteSite: React.FC<DeleteSiteProps> = ({ deleteOpen, handleDelete, handleDeleteClose }) => {
    const dispatch:ThunkDispatch<RootState, void, any> = useDispatch()
    
    return (
        <Modal open={deleteOpen} onClose={handleDeleteClose}>
            <Box sx={modalStyle}>
                <Typography level="h4" sx={{ mb: 2 }}>Confirm Delete</Typography>
                <Typography sx={{ mb: 3 }}>Are you sure you want to delete this site(s)?</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap:2 }}>
                    <Button onClick={handleDeleteClose} 
                    sx={{
                        background: 'black',
                        color: 'white',
                        '&:hover': { background: 'black' },
                      }}
                    >Cancel</Button>
                    <Button onClick={handleDelete} sx={{background: '#fdd835',
                        '&:hover': { background: '#E1A91B' },}}>Delete</Button> 
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteSite;

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    p: 4,
    borderRadius: 10,
  };
