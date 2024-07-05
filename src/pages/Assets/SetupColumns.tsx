import React, { useState } from "react";
import { Modal, Box, Typography, Button, Checkbox } from "@mui/joy";
import AppView from "../../components/Common/AppView";

const columns = [
  "Assets Tag ID",
  "Description",
  "Brand",
  "Purchase Date",
  "Cost",
  "Status",
  "Serial No.",
];


const SetupColumns: React.FC = () => {

  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns);

  const handleCheckboxChange = (column: string) => {
    const selectedIndex = selectedColumns.indexOf(column);
    const newSelectedColumns = [...selectedColumns];

    if (selectedIndex === -1) {
      newSelectedColumns.push(column);
    } else {
      newSelectedColumns.splice(selectedIndex, 1);
    }

    setSelectedColumns(newSelectedColumns);
  };

  const handleSave = () => {
    console.log("Selected Columns:", selectedColumns);
   
  };

  return (
    <AppView>
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        p: 4,
        borderRadius: "10px",
      }}
    >
      <Typography level="h4" sx={{ mb: 2 }}>
        Set Up Columns
      </Typography>
      <Box sx={{ overflowY: 'auto', maxHeight: '300px' }}>
        {columns.map((column) => (
          <Box key={column} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Checkbox
              checked={selectedColumns.includes(column)}
              onChange={() => handleCheckboxChange(column)}
              sx={{ marginRight: 1 }}
            />
            <Typography>{column}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleSave} level="contained" color="primary">
          Save
        </Button>
      </Box>
    </Box>
    </AppView>
  );
};

export default SetupColumns;