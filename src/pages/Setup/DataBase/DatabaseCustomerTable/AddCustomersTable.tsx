// import React, { ChangeEvent, useState } from 'react'
// import AddIcon from '@mui/icons-material/Add'
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Grid,
//   Input,
//   Modal,
//   Option,
//   Radio,
//   RadioGroup,
//   Select,
//   Sheet,
//   Typography,
// } from '@mui/joy'
// import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
// import { ThunkDispatch } from 'redux-thunk'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../../../../redux/store'
// import AddDialogCustomer from './AddDialogCustomer'
// import EditDatabaseCustomer from './EditDatabaseCustomers'



// const AddCustomersTable: React.FC = () => {
//   const [open, setOpen] = useState(false)
//   const [customerDataBases, setCustomerDataBases] = useState<{ customCustomer:any[] }>({
//     customCustomer: [],
//   })

  
//   const handleClose = () => {
//     setOpen(false)
//   }

//   const handleAddSkill = (formData:any) => {
//     setCustomerDataBases((prevData) => ({
//       ...prevData,
//       customCustomer: [...prevData.customCustomer, formData],
//     }))
//     handleClose()
//     setOpen(false)
//   }

//   const handleCheckboxChange = (index: number) => {
//     setCustomerDataBases((prevData) => ({
//       ...prevData,
//     }))
//   }

//   return (
//     <Box>
//       <Box>
//         <Typography
//           level="h4"
//           sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//         >
//           <SignpostOutlinedIcon
//             style={{ fontSize: '1.4rem', color: '#FBC21E' }}
//           />
//           Customers Custom Fields
//         </Typography>
//         <Typography sx={{ marginTop: '10px' }}>
//           Add custom fields to join the standard fields that we provided.
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           flexDirection: { md: 'row', xs: 'column' },
//           justifyContent: { xs: 'center', md: 'space-between' },
//           gap: '5px',
//         }}
//       >
//         <Button
//           onClick={() => setOpen(true)}
//           sx={{
//             marginTop: '15px',
            
//             background: '#ffffff',
//             color: 'green',
//             border: '1px solid green ',
//             '&:hover': {
//               color: 'white',
//               background: 'green',
//             },
//             borderRadius: '15px',
//           }}
//         >
//           <AddIcon />
//           Add Custom Fields
//         </Button>

//         {open && (
//           <Modal
//             aria-labelledby="responsive-dialog-title"
//             aria-describedby="modal-desc"
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//             open={open}
//             onClose={()=>setOpen(false)}
//           >
//             <AddDialogCustomer
//               open={open}
//               setOpen={setOpen}
//               customerDataBases={customerDataBases}
//               handleAddSkill={handleAddSkill}
//             />
//           </Modal>
//         )}
//       </Box>

//       <EditDatabaseCustomer customerDataBases={customerDataBases} setCustomerDataBases={setCustomerDataBases} />

//     </Box>
//   )
// }

// export default AddCustomersTable
