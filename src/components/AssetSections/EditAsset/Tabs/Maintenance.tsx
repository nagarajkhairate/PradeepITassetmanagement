import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, Table } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { fetchAssets } from '../../../../redux/features/AssetSlice';
import { ThunkDispatch } from 'redux-thunk';
import { fetchMaintenance, fetchMaintenanceById } from '../../../../redux/features/MaintenanceSlice';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import AddMaintenance from './AddMaintenance';
import EditMaintenance from './EditMaintenance';
import ViewMainttInfo from './ViewMainttInfo';

export interface Maintt {
  id: string;
  assetId: string;
  maintenanceDueDate: Date;
  maintenanceTitle: string;
  maintenanceBy: string;
  maintenanceStatus: string;
  dateCompleted: Date;
  maintenanceCost: number;
  maintenanceDetails: string;
}

const Maintenance = () => {
  const { id: assetId } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedMain, setSelectedMain] = useState<Maintt | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const maintenances = useSelector((state: RootState) => state.maintenance.data);

  console.log("Asset ID:", assetId); 
  console.log("Maintenances:", maintenances); 

  // Filtered maintenance data based on asset ID
  const filteredMaintenances = maintenances.filter((maintenance: Maintt) => maintenance.assetId === parseInt(assetId));

  console.log("Filtered Maintenances:", filteredMaintenances); 

  useEffect(() => {
    dispatch(fetchMaintenance());
  }, [dispatch]);

  const handleAdd = () => {
    setOpen(false);
    dispatch(fetchMaintenance());
  };

  const handleEditClick = (maintenance: Maintt) => {
    setSelectedMain(maintenance);
    setEditDialogOpen(true);
  };

  const handleView = (maintenance: Maintt) => {
    setSelectedMain(maintenance);
    setOpen(true)
  }

  return (
    <>
      <Box
        sx={{
          paddingBottom: '20px',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: { md: 'row', xs: 'column' },
        }}
      >
        <Typography level="h4">Maintenance</Typography>
        <Box>
          <Button
            sx={{
              paddingY: '10px',
              background: '#13b457',
              borderRadius: '15px',
              '&:hover': {
                backgroundColor: '#0d903f',
              },
            }}
            onClick={() => setOpen(true)}
          >
            <AddIcon size={23} />
            Add New
          </Button>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          marginBottom: '15px',
        }}
      >
        <Table
          sx={{
            border: '1px solid #f2f2f2',
            width: '100%',
            minWidth: 800,
          }}
        >
          <thead>
            <tr>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595', width: "100px" }}>Due Date</th>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595', width: "100px" }}>Title</th>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595' }}>Maintenance By</th>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595', width: "100px" }}>Status</th>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595' }}>Completion Date</th>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595' }}>Maintenance Cost</th>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595' }}>Details</th>
              <th style={{ background: '#f9f9f9', borderBottom: 'none', color: '#959595', width: "100px" }}>Action</th>
            </tr>
          </thead>
          <tbody
            style={{
              background: 'white',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            {filteredMaintenances.length > 0 ? (
              filteredMaintenances.map((item: Maintt, index: number) => (
                <tr key={index}>
                  <td>{new Date(item.maintenanceDueDate).toLocaleDateString()}</td>
                  <td>{item.maintenanceTitle}</td>
                  <td>{item.maintenanceBy}</td>
                  <td style={{ wordBreak: 'break-word', textAlign: 'left', color: "blue" }}>{item.maintenanceStatus}</td>
                  <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{new Date(item.dateCompleted).toLocaleDateString()}</td>
                  <td>{item.maintenanceCost}</td>
                  <td>{item.maintenanceDetails}</td>
                  <td style={{ cursor: 'pointer' }}>
                    <Box
                      sx={{
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1, 
                        textDecoration: 'none',
                        '&:hover': {
                          color: '#13b457',
                        },
                      }}
                    >
                      <RemoveRedEyeIcon
                      onClick={() => handleView(item)}
                      sx={{
                        fontSize: 20,
                        color: "black",
                        filter: 'drop-shadow(0 0 3px rgba(0, 191, 255, 0.6))',
                        backdropFilter: 'blur(2px)'
                      }} />
                      <EditOutlinedIcon
                        onClick={() => handleEditClick(item)}
                        sx={{ fontSize: 20, color: 'green' }} />
                    </Box>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', color: 'green' }}>
                  No Maintenance has been added
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Box>

      {open && (
        <AddMaintenance
          open={open}
          onClose={() => setOpen(false)}
          onAdd={handleAdd}
        />
      )}

{open && <ViewMainttInfo open ={open} onClose={() => setOpen(false)}  selectedMain={selectedMain} />}

      {editDialogOpen && (
        <EditMaintenance
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maintt={selectedMain}
        />
      )}
    </>
  );
};

export default Maintenance;
