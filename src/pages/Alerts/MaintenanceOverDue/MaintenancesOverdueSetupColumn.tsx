import { Box, Button, Checkbox, Divider, Typography } from '@mui/joy';
import AppView from '../../../components/Common/AppView';
import React, { useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMaintenanceDatabase, updateMaintenanceDatabase } from '../../../redux/features/MaintenanceDatabaseSlice';
import AlertsSetupColumnTable from '../Maintenances/AlertsSetupColumnTable';
import { useNavigate } from 'react-router-dom';

const MaintenancesOverdueSetupColumn: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const maintenanceDatabase = useSelector((state: RootState) => state.maintenanceDatabase.data)
  const navigate=useNavigate()

  const [selectedColumns, setSelectedColumns] = useState<number[]>([]);
  const [filteredColumns, setFilteredColumns] = useState<{ id: number, fieldName: string, isTable: boolean }[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns.includes(id) && prevSelectedColumns.length === 1) {
        return prevSelectedColumns; // Prevent unchecking the last remaining checkbox
      }
      const newSelectedColumns = prevSelectedColumns.includes(id)
        ? prevSelectedColumns.filter((col) => col !== id)
        : [...prevSelectedColumns, id];
      return newSelectedColumns;
    });
  };

  useEffect(() => {
    if (maintenanceDatabase.length > 0) {
      const initialSelectedColumns = maintenanceDatabase
        .filter(column => column.isTable)
        .map(column => column.id);

        if (initialSelectedColumns.length === 0 && initialSelectedColumns.length > 0) {
          initialSelectedColumns.push(maintenanceDatabase[0].id);
        }
      setSelectedColumns(initialSelectedColumns);
    }
  }, [maintenanceDatabase]);

  useEffect(() => {
    if (maintenanceDatabase.length > 0) {
      const updatedFilteredColumns = maintenanceDatabase.filter((column) =>
        selectedColumns.includes(column.id)
      );
      setFilteredColumns(updatedFilteredColumns);
    }
  }, [selectedColumns, maintenanceDatabase]);



  useEffect(() => {
    dispatch(fetchMaintenanceDatabase());
  }, [dispatch]);


  const handleSave = () => {
    const updatedColumns = maintenanceDatabase.map((column) => ({
      ...column,
      isTable: selectedColumns.includes(column.id),
    }));

    console.log('Selected Columns:', filteredColumns);
    dispatch(updateMaintenanceDatabase(updatedColumns));
    const columnNames = filteredColumns.map((column) => column.fieldName)
    navigate('/alerts/maintenances-due', { state: { selectedColumns:filteredColumns.map(column => column.fieldName)} })
  };

  const formattedColumns = [
    {
      fields: filteredColumns.map(column => column.fieldName),
    },
  ];

  return (
    <AppView>
      <Typography level="h3">Maintenance</Typography>

      <Box
        sx={{
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              level="h4"
              sx={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                mt: 0,
              }}
            >
              Select Table Columns
            </Typography>

            <Typography
              sx={{
                p: 1,
              }}
            >
              Check the columns you want to see in the List.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              gap: 1,
              overflowX: 'auto',
            }}
          >
            {maintenanceDatabase && maintenanceDatabase.map((column) => (
              <Box key={column.id} sx={{ flex: 1, p: 1 }}>
                <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center', 
                  gap: 1, 
                }}
                >
                  <Checkbox
                    checked={selectedColumns.includes(column.id)}
                    onChange={() => handleCheckboxChange(column.id)}
                  />
                  {column.fieldName}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Divider />
          <Box>
      <Typography level="h4">Order Table Columns</Typography>
      <Typography sx={{ p: 1 }}>
        Rearrange the table column sequence by dragging and dropping columns.
      </Typography>
          
          <AlertsSetupColumnTable selectedColumns={[{ fields: filteredColumns.map(column => column.fieldName) }]}/>
        </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row' },
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            mt: 4,
            flexWrap: 'wrap',
          }}
        >
          <Button
                      type="button"
                      // onClick={handleClose}
                      autoFocus
                      variant="solid"
                      sx={{
                        background: 'black',
                        '&:hover': { background: '#424242' },
                        color: 'white',
                        // marginLeft: '50px',
                      }}
                      onClick={() => navigate('/alerts/maintenances-due')}
                    >
                      
                      Cancel
                    </Button>
          <Button onClick={handleSave}
            sx={{
              background: '#fdd835',
              '&:hover': { background: '#E1A91B' },
              color: 'black',
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </AppView>
  );
};
export default MaintenancesOverdueSetupColumn;
