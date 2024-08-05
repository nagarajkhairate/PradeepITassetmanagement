import { Box, Button, Divider, Input, Typography } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useState } from 'react'
import AlertsSetupCheckbox from './AlertsSetupCheckbox'
import { handleCheckboxChange } from './AlertsSetupCheckboxLogix'

export const AlertsSetupContract: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [button, setButton] = useState<boolean>(false)
  const [leadTime, setLeadTime] = useState<string>('')

  const handleChange = (column: string) => {
    handleCheckboxChange(column, selectedColumns, setSelectedColumns, setButton)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Regex to allow only digits
    if (/^\d*$/.test(value)) {
      setLeadTime(value)
    }
  }

  const columns = [
    {
      title: 'Contract Alerts',
      description: 'Show alerts for expiring contracts.',
      value: 'column1',
    },
    
    {
      title: 'Email Alerts',
      description: 'Turn on this option to email out an alert if any alert exists.',
      value: 'column2',
    },
  ]

  return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Box
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {columns
          .filter(column => column.value === 'column1' || selectedColumns.includes('column1'))
          .map(({ title, description, value }) => (
            <AlertsSetupCheckbox
              key={value}
              title={title}
              description={description}
              value={value}
              selectedColumns={selectedColumns}
              onChange={handleChange}
            />
          ))}

          {button && (
            <Box
              sx={{
                mt: 2,
                ml: 5,
              }}
            >
              <Button
                autoFocus
                type="button"
                variant="solid"
                sx={{
                  background: '#fdd835',
                  '&:hover': { background: '#E1A91B' },
                  color: 'black',
                }}
              >
                Setup Alert Setting
              </Button>
            </Box>
          )}

          
{selectedColumns.includes('column1') && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 2,
              ml: 5,
              gap: 1,
            }}
          >
            <Typography sx={{ mr: 1 }}>Lead Time:</Typography>
            <Input placeholder="Enter contract details" sx={{ mr: 1 }} 
            value={leadTime}
            onChange={handleInputChange}/>
            <Typography >Days</Typography>
          </Box>
        )}
        </Box>
        <Divider />
      </Box>

  )
}

export default React.memo(AlertsSetupContract)







// import { Box, Button, Checkbox, Divider, Typography } from '@mui/joy'
// import AppView from '../../components/Common/AppView'
// import React, { useState } from 'react'

// export const AlertsSetupContract: React.FC = () => {
//   const [selectedColumns, setSelectedColumns] = useState<string[]>([])
//   const [button, setButton] = useState<boolean>(false)

//   const handleCheckboxChange = (column: string) => {
//     const selectedIndex = selectedColumns.indexOf(column)
//     const newSelectedColumns = [...selectedColumns]

//     if (selectedIndex === -1) {
//       newSelectedColumns.push(column)

//       if (column === 'column2') {
//         setButton(true)
//       }
//     } else {
//       newSelectedColumns.splice(selectedIndex, 1)

//       if (column === 'column2') {
//         setButton(false)
//       }
//     }

//     if (
//       newSelectedColumns.includes('column2') &&
//       newSelectedColumns.includes('column1')
//     ) {
//       setButton(true)
//     } else {
//       setButton(false)
//     }

//     setSelectedColumns(newSelectedColumns)
//   }

//   const columns = [
//     { title: 'Contract Alerts', value: 'column1' },
//     { title: 'Email Alerts', value: 'column2' },
//   ]

//   return (
//     <AppView>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           gap: 1,
//         }}
//       >
//         <Box
//           sx={{
//             textAlign: { xs: 'center', md: 'left' },
//           }}
//         >
//           {/* Render checkboxes and texts here */}
//           {columns.map(
//             ({ title, value }) =>
//               // Conditionally render checkboxes
//               (value === 'column1' ||
//                 (selectedColumns.includes('column1') &&
//                   value === 'column2')) && (
//                 <Box
//                   key={value}
//                   sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//                 >
//                   <Checkbox
//                     checked={selectedColumns.includes(value)}
//                     onChange={() => handleCheckboxChange(value)}
//                     sx={{ marginRight: 1 }}
//                   />
//                   <Box>
//                     <Typography
//                       sx={{
//                         fontWeight: 500,
//                         mt: 2,
//                       }}
//                     >
//                       {title}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         color: 'text.secondary',
//                       }}
//                     >
//                       {value === 'column1'
//                         ? 'Show alerts for expiring contracts.'
//                         : 'Turn on this option to email out an alert if any alert exists.'}
//                     </Typography>
//                   </Box>
//                 </Box>
//               ),
//           )}

//           {button && (
//             <Box
//               sx={{
//                 mt: 2,
//                 ml: 5,
//               }}
//             >
//               <Button
//                 autoFocus
//                 type="button"
//                 variant="solid"
//                 sx={{
//                   background: '#fdd835',
//                   '&:hover': { background: '#E1A91B' },
//                   color: 'black',
//                   // marginTop: '25px',
//                   // marginLeft: '40%',
//                 }}
//               >
//                 Setup Alert Setting
//               </Button>
//             </Box>
//           )}
//         </Box>
//         <Divider />
//       </Box>
//     </AppView>
//   )
// }

// export default React.memo(AlertsSetupContract)
