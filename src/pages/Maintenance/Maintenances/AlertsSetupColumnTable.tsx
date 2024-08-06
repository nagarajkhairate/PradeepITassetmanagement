import React from 'react';
import { Box, Table, Typography } from '@mui/joy';

interface AlertsSetupColumnTableProp {
  selectedColumns: {
    fields: string[];
  }[];
}

const AlertsSetupColumnTable: React.FC<AlertsSetupColumnTableProp> = ({
  selectedColumns,
}) => {

  const allFields = selectedColumns.flatMap(column => column.fields);

  return (
    
      <Box
        sx={{
          overflowX: 'auto',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          borderRadius: '5px'
        }}
      >
        <Table 
          borderAxis="both" aria-label="basic table" 
          style={{
            borderCollapse: 'collapse',
            border: '1px solid grey',
            minWidth: '500px',
            borderRadius: '5px'
          }}
        >
          <thead>
            <tr>
              {allFields.length > 0 &&
                allFields.map((field, index) => (
                  <th key={index} style={{ background: '#fff8e6' , verticalAlign: 'middle', wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>
                    {field}

                  </th>
                ))}
            </tr>
          </thead>
        </Table>
      </Box>

      

  );
};

export default AlertsSetupColumnTable;
