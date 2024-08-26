import React from "react";
import { Box, Table, Modal, Typography, IconButton, Divider } from "@mui/joy";
import { Maintt } from "./Maintenance";
import CloseIcon from '@mui/icons-material/Close';
import AppButton from "../../../Common/AppButton";

interface MainttInfoProps {
  open: boolean;
  onClose: () => void;
  selectedMain: Maintt | null;
}

const ViewMainttInfo: React.FC<MainttInfoProps> = ({ open, onClose, selectedMain }) => {
  return (
    <Modal open={open} onClose={onClose}>
     <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography level="h4">Asset Maintenance</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
            {selectedMain && (
              <Table sx={{border:"1px solid grey"}}>
                <tbody>
                  <tr>
                    <th scope="row" style={{background: '#fff8e6'}}>Due Date</th>
                    <td>{new Date(selectedMain.maintenanceDueDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{background: '#fff8e6'}}>Title</th>
                    <td>{selectedMain.maintenanceTitle}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{background: '#fff8e6'}}>Maintenance By</th>
                    <td>{selectedMain.maintenanceBy}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{background: '#fff8e6'}}>Status</th>
                    <td>{selectedMain.maintenanceStatus}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{background: '#fff8e6'}}>Completion Date</th>
                    <td>{new Date(selectedMain.dateCompleted).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{background: '#fff8e6'}}>Maintenance Cost</th>
                    <td>{selectedMain.maintenanceCost}</td>
                  </tr>
                  <tr>
                    <th scope="row" style={{background: '#fff8e6'}}>Details</th>
                    <td>{selectedMain.maintenanceDetails}</td>
                  </tr>
                </tbody>
              </Table>
            )}
             <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end', position: 'sticky', bottom: 0, background: '#fff', zIndex: 1, gap: '10px' }}>
          <AppButton onClick={onClose} sx={{ borderRadius: '15px' }}>
            Close
          </AppButton>
        </Box>
          </Box>
        {/* </Box> */}
      {/* </Box> */}
    </Modal>
  );
};

export default ViewMainttInfo;

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'White',
  p: 4,
  borderRadius: 10,
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto',
}