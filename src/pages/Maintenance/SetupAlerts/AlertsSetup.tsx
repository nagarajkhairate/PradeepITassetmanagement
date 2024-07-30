import { Box, Button, Divider, Typography } from '@mui/joy'
import AppView from '../../../components/Common/AppView'
import React, { useState } from 'react'
import AlertsSetupContract from './AlertsSetupContract'
import AlertsSetupCheckbox from './AlertsSetupCheckbox'
import AlertsSetupFundExp from './AlertsSetupFundExp'
import { handleCheckboxChange } from './AlertsSetupCheckboxLogix'
import AlertsSetupInsurance from './AlertsSetupInsurance'
import AlertsSetupLeaseExp from './AlertsSetupLeaseExp'
import AlertsSetupMaintenance from './AlertsSetupMaintenance'
import AlertsSetupWarranties from './AlertsSetupWarranties'

export const AlertsSetup: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [button, setButton] = useState<boolean>(false)

  const handleChange = (column: string) => {
    handleCheckboxChange(column, selectedColumns, setSelectedColumns, setButton)
  }

  const columns = [
    {
      title: 'Asset Past Due',
      description: 'Show alerts for assets that are past due.',
      value: 'column1',
    },
    {
      title: 'Email Alerts',
      description:
        'Turn on this option to email out an alert if any alert exists.',
      value: 'column2',
    },
  ]

  return (
    <AppView>
      <Typography level="h3">Setup Alerts</Typography>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '20px' },
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
              Setup Alerts
            </Typography>

            <Typography
              sx={{
                p: 1,
              }}
            >
              We're on guard so you don't have to be. Check boxes next to the
              items you want to be notified about. Decide when you want to be
              alerted, and choose how many days in advance you'll receive the
              alert. Alerts will appear in the left navigation menu and in the
              calendar on the dashboard.
            </Typography>

            {columns.map(
              ({ title, description, value }) =>
                (value === 'column1' ||
                  (selectedColumns.includes('column1') &&
                    value === 'column2')) && (
                  <AlertsSetupCheckbox
                    key={value}
                    title={title}
                    description={description}
                    value={value}
                    selectedColumns={selectedColumns}
                    onChange={handleChange}
                  />
                ),
            )}

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
          </Box>
          <Divider />
          <AlertsSetupContract />
          <AlertsSetupFundExp />
          <AlertsSetupInsurance />
          <AlertsSetupLeaseExp />
          <AlertsSetupMaintenance />
          <AlertsSetupWarranties />
        </Box>
      </Box>
    </AppView>
  )
}

export default React.memo(AlertsSetup)

// import { Box, Button, Checkbox, Divider, Typography } from '@mui/joy'
// import AppView from '../../components/Common/AppView'
// import React, { useState } from 'react'
// import AlertsSetupContract from './AlertsSetupContract'

// export const AlertsSetup: React.FC = () => {
//   const [selectedColumns, setSelectedColumns] = useState<string[]>([])
//   const [button, setButton] = useState<boolean>(false)

//   const handleCheckboxChange = (column: string) => {
//     const selectedIndex = selectedColumns.indexOf(column)
//     const newSelectedColumns = [...selectedColumns]

//     if (selectedIndex === -1) {
//       newSelectedColumns.push(column)

//       if(column=== 'column2'){
//         setButton(true)
//       }
//     } else {
//       newSelectedColumns.splice(selectedIndex, 1)

//       if(column=== 'column2'){
//         setButton(false)
//       }
//     }

//     if (newSelectedColumns.includes('column2') && newSelectedColumns.includes('column1')) {
//         setButton(true)
//       } else {
//         setButton(false)
//       }

//     setSelectedColumns(newSelectedColumns)
//   }

//   const columns = [
//     { title: 'Asset Past Due', value: 'column1' },
//     { title: 'Email Alerts', value: 'column2' },
//   ]

//   return (
//     <AppView>
//       <Typography level="h3">Setup Alerts</Typography>
//       <Box
//         sx={{
//           borderRadius: '10px',
//           boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//           background: '#FFF',
//           flexGrow: 1,
//           marginTop: { xs: '10px', sm: '20px' },
//           height: 'auto',
//           display: 'flex',
//           flexDirection: 'column',
//           p: 2,
//         }}
//       >
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//           }}
//         >
//           <Box
//             sx={{
//               textAlign: { xs: 'center', md: 'left' },
//             }}
//           >
//             <Typography
//               level="h4"
//               sx={{
//                 fontSize: '20px',
//                 fontWeight: 500,
//                 lineHeight: '30px',
//                 textAlign: { xs: 'center', md: 'left' },
//                 whiteSpace: 'nowrap',
//                 mt: 0,
//               }}
//             >
//               Setup Alerts
//             </Typography>

//             <Typography
//               sx={{
//                 p: 1,
//               }}
//             >
//               We're on guard so you don't have to be. Check boxes next to the
//               items you want to be notified about. Decide when you want to be
//               alerted, and choose how many days in advance you'll receive the
//               alert. Alerts will appear in the left navigation menu and in the
//               calendar on the dashboard.
//             </Typography>

//             {/* Render checkboxes and texts here */}
//             {columns.map(
//               ({ title, value }) =>
//                 // Conditionally render checkboxes
//                 (value === 'column1' ||
//                   (selectedColumns.includes('column1') &&
//                     value === 'column2')) && (
//                   <Box
//                     key={value}
//                     sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//                   >
//                     <Checkbox
//                       checked={selectedColumns.includes(value)}
//                       onChange={() => handleCheckboxChange(value)}
//                       sx={{ marginRight: 1 }}
//                     />
//                     <Box>
//                       <Typography
//                         sx={{
//                           fontWeight: 500,
//                           mt: 2,
//                         }}
//                       >
//                         {title}
//                       </Typography>
//                       <Typography
//                         sx={{
//                           color: 'text.secondary',
//                         }}
//                       >
//                         {value === 'column1'
//                           ? 'Show alerts for assets that are past due.'
//                           : 'Turn on this option to email out an alert if any alert exists.'}
//                       </Typography>
//                     </Box>
//                   </Box>
//                 ),
//             )}

//             {button && (
//                 <Box
//                 sx={{
//                     mt:2,
//                     ml:5
//                 }}
//                 >
//                     <Button
//                      autoFocus
//                      type="button"
//                      variant="solid"
//                      sx={{
//                        background: '#fdd835',
//                        '&:hover': { background: '#E1A91B' },
//                        color: 'black',
//                        // marginTop: '25px',
//                        // marginLeft: '40%',
//                      }}
//                     >
//                         Setup Alert Setting
//                     </Button>
//                 </Box>
//             )}
//           </Box>
//           <Divider />
//           <AlertsSetupContract />
//         </Box>
//       </Box>
//     </AppView>
//   )
// }

// export default React.memo(AlertsSetup)
