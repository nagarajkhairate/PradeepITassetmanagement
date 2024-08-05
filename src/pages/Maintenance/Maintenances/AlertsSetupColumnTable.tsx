
import React from 'react'
import { Box, Table, Typography,  } from '@mui/joy'

interface CustomTableProps {
  columns: { title: string; fields: string[] }[]
}

const AlertsSetupColumnTable: React.FC<CustomTableProps> = ({ columns }) => {

  
  return (

    <>
    <Box>
      <Typography level='h4'>Order Table Columns</Typography>
      <Typography
      sx={{
        p:1
      }}
      >Rearrange the table column sequence by dragging and dropping columns.</Typography>
         <Box
              sx={{
                overflowX: 'auto',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                borderRadius:'5px'
              }}
            >
        <Table 
        borderAxis="both" aria-label="basic table" 
        style={{
                  borderCollapse: 'collapse',
                  border: '1px solid grey',
                  minWidth: '500px',
                  borderRadius:'5px'
                }}>
        <thead>
          <tr>
            {columns.map((columnGroup) =>
              columnGroup.fields.map((field) => (
                <th key={field}
                style={{ background: '#fff8e6',verticalAlign:'middle',wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left'  }}
                >{field}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns.map((columnGroup) =>
              columnGroup.fields.map((field) => (
                <td key={field}
                style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}
                >Sample Data</td>
              ))
            )}
          </tr>
        </tbody>
      </Table>
    </Box>
    </Box>
    </>
  )
}

export default AlertsSetupColumnTable
