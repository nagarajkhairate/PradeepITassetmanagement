import { Box, Button, Checkbox, Divider, Typography } from '@mui/joy';
import AppView from '../../../components/Common/AppView';
import React, { useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractDatabase } from '../../../redux/features/ContractDatabaseSlice';
import AlertsSetupColumnTable from '../Maintenances/AlertsSetupColumnTable';

const AlertSetupColumn: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const contractDatabase = useSelector((state: RootState) => state.contractDatabase.data);

  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [filteredColumns, setFilteredColumns] = useState<{ title: string; fields: string[] }[]>([]);

  const handleCheckboxChange = (field: string) => {
    const selectedIndex = selectedColumns.indexOf(field);
    const newSelectedColumns = [...selectedColumns];

    if (selectedIndex === -1) {
      newSelectedColumns.push(field);
    } else {
      newSelectedColumns.splice(selectedIndex, 1);
    }

    setSelectedColumns(newSelectedColumns);

    const result = contractDatabase
      .map((columnGroup) => {
        const selectedFields = columnGroup.fields.filter((field: any) =>
          newSelectedColumns.includes(field.fieldName)
        );
        if (selectedFields.length > 0) {
          return {
            title: columnGroup.title,
            fields: selectedFields,
          };
        }
        return null;
      })
      .filter((group) => group !== null);
    setFilteredColumns(result as { title: string; fields: string[]; isVisible:boolean }[]);
  };

  const handleSave = () => {
    const result = contractDatabase.map((columnGroup) => {
      const selectedFields = columnGroup.fields.filter((field: any) =>
        selectedColumns.includes(field.fieldName)
      );
      if (selectedFields.length > 0) {
        return {
          title: columnGroup.title,
          fields: selectedFields,
        };
      }
      return null;
    }).filter(group => group !== null);

    console.log('Selected Columns:', result);
  };

  useEffect(() => {
    dispatch(fetchContractDatabase());
  }, [dispatch]);

  useEffect(() => {
    console.log('Contract Database:', contractDatabase);
  }, [contractDatabase]);
  
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
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              overflowX: 'auto',
            }}
          >
            {
            // contractDatabase  && contractDatabase.length > 0 ? (
              contractDatabase && contractDatabase.map((columnGroup) => (
                <Box key={columnGroup} sx={{ flex: 1, p: 1 }}>
                  <Typography>
                    <Checkbox {...columnGroup.iVisible}/>
                    <strong>{columnGroup.fieldName}</strong>
                  </Typography>
                 
                </Box>
              ))
            }
          </Box>
          <Divider />
          {filteredColumns.length > 0 && (
            <AlertsSetupColumnTable columns={filteredColumns} />
          )}

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </AppView>
  );
};

export default React.memo(AlertSetupColumn);
