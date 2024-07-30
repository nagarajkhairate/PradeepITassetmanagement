import { Box, Button, Checkbox, Divider, Typography } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useEffect, useState } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'
import { useDispatch } from 'react-redux'
import { fetchMaintenanceCustomDatabase } from '../../../redux/features/MaintenanceCustomDatabaseSlice'
import { customMaintenance, Maintenance, maintenanceData } from '../../Setup/DataBase/DatabaseMaintenance/MaintenanceData'
const columnsJson = [
  {
    title: 'Asset Fields',
    fields: [
      'Asset Tag ID',
      'Created by',
      'Date Created',
      'Description',
      'Relation',
      'Reservation',
      'Transact as a whole',
    ],
  },
  {
    title: 'Depreciation Fields',
    fields: [
      'Asset Life (months)',
      'Book Value',
      'Date Acquired',
      'Depreciable Asset',
      'Depreciable Cost',
      'Depreciation Method',
      'Salvage Value',
    ],
  },
  {
    title: 'Linking Fields',
    fields: ['Category', 'Department', 'Location', 'Site', 'Sub Category'],
  },
  {
    title: 'Maintenance Fields',
    fields: [
      'Expires',
      'Frequency',
      'Is Repeating',
      'Maintenance By',
      'Maintenance Detail',
      'on (day or Weekday)',
      'Recur on every',
      'Status',
      'Title',
    ],
  },
]



export const AlertSetupColumn: React.FC = () => {

    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
const [selectedColumns, setSelectedColumns] = useState<string[]>([])

  const handleCheckboxChange = (column: string) => {
    const selectedIndex = selectedColumns.indexOf(column)
    const newSelectedColumns = [...selectedColumns]

    if (selectedIndex === -1) {
      newSelectedColumns.push(column)
    } else {
      newSelectedColumns.splice(selectedIndex, 1)
    }

    setSelectedColumns(newSelectedColumns)
  }

  const handleSave = () => {
    const result= columnsJson.map(columnGroup =>{
        const selectedFields = columnGroup.fields.filter(field =>
            selectedColumns.includes(field)
        );
        if (selectedFields.length > 0) {
            return {
              title: columnGroup.title,
              fields: selectedFields
            };
          }
          return null;
    }).filter(group => group !== null);
    console.log('Selected Columns:', selectedColumns)
  }

  useEffect(() => {
    dispatch(fetchMaintenanceCustomDatabase())
  }, [])

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
            {columnsJson.map((columnGroup) => (
              <Box key={columnGroup.title} sx={{ flex: 1, p: 1 }}>
                <Typography>
                  <strong>{columnGroup.title}</strong>
                </Typography>
                {columnGroup.fields.map((column) => (
                  <Box
                    key={column}
                    sx={{ display: 'flex', mt: 2, alignItems: 'center', mb: 1 }}
                  >
                    <Checkbox
                      checked={selectedColumns.includes(column)}
                      onChange={() => handleCheckboxChange(column)}
                      sx={{ marginRight: 1 }}
                    />
                    <Typography>{column}</Typography>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Divider />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleSave}  color="primary">
          Save
        </Button>
        </Box>
        </Box>
      </Box>
    </AppView>
  )
}

export default React.memo(AlertSetupColumn)
