// import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Option, Radio, RadioGroup, Select, Sheet, Typography } from "@mui/joy"
// import AppForm from "../../../../components/Common/AppForm"
// import React from "react"


// interface AddDatabaseModalProps {
//     open: boolean
//     setOpen: (open: boolean) => void
//     title: string
//     formData: {
//       fieldName: string
//       componentsId: number
//       isRequired: string
//     }
//     handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
//     handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
//     handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//     handleSelectChange: (
//       event: | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,value: unknown,
//     ) => void
//     components: Array<{ id: number; title: string }>
//   }

// const AddDatabaseModal: React.FC<AddDatabaseModalProps> = ({
//     open,
//     setOpen,
//     title,
//     formData,
//     handleSubmit,
//     handleChange,
//     handleRadioChange,
//     handleSelectChange,
//     components,
//   }) =>{
    

// return(

// <Modal
// open={open}
// onClose={() => setOpen(false)}
// aria-labelledby="responsive-dialog-title"
// aria-describedby="modal-desc"
// sx={{
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   p: 2,
// }}
// >
// <Sheet
//   variant="outlined"
//   sx={{
//     borderRadius: 'md',
//     p: 2,
//     boxShadow: 'lg',
//   }}
// >
//   <div>
//     <Typography
//       id="responsive-dialog-title"
//       component="h2"
//       level="h4"
//       textColor="inherit"
//       fontWeight="lg"
//       mb={1}
//     >
//       {title}
//     </Typography>
//     <Divider />

//     <AppForm onSubmit={handleSubmit}>
//       <FormControl
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingTop: '20px',
//           marginLeft: '5px',
//         }}
//       >
//         <FormLabel
//           sx={{
//             marginRight: '10px',
//           }}
//         >
//           Custom Field Label<span style={{ color: 'red' }}>*</span>:
//         </FormLabel>
//         <Input
//           variant="outlined"
//           type="text"
//           name="fieldName"
//           value={formData.fieldName}
//           onChange={handleChange}
//           onInput={(e) => {
//             const target = e.target as HTMLInputElement
//             target.value = target.value.replace(/[^a-zA-Z0-9-]/g, '')
//           }}
//           required
//           sx={{ width: '200px' }}
//         />
//       </FormControl>
//       <FormControl
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//           paddingTop: '30px',
//           marginLeft: '10px',
//         }}
//       >
//         <FormLabel
//           sx={{
//             marginRight: '40px',
//             flexShrink: 0,
//           }}
//         >
//           Data Types<span style={{ color: 'red' }}>*</span>:
//         </FormLabel>
//         <Select
//           placeholder="Select Data Types"
//           sx={{
//             marginLeft: { md: '15px', xs: '6px' },
//             flexGrow: 1,
//             width: '200px',
//           }}
//           name="componentsId"
//           required
//           value={formData.componentsId}
//           onChange={handleSelectChange}
//         >
//           {components &&
//             components.map((comp) => (
//               <Option key={comp.id} value={comp.id}>
//                 {comp.title}
//               </Option>
//             ))}
//         </Select>
//       </FormControl>

//       <FormControl
//         sx={{
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}
//       >
//         <FormLabel sx={{ paddingTop: '26px' }}>Data Required:</FormLabel>
//         <RadioGroup
//           name="isRequired"
//           value={formData.isRequired}
//           onChange={handleRadioChange}
//           sx={{ marginLeft: 'none' }}
//         >
//           <Box>
//             <Radio
//               value="yes"
//               label="Yes"
//               variant="outlined"
//               sx={{ paddingTop: '10px', marginLeft: '49px' }}
//             />
//             <Radio
//               value="optional"
//               label="Optional"
//               variant="outlined"
//               sx={{
//                 paddingTop: '20px',
//                 marginLeft: { md: '30px', xs: '15px' },
//               }}
//             />
//           </Box>
//         </RadioGroup>
//       </FormControl>

//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           flexDirection: { md: 'row' },
//           justifyContent: { xs: 'space-between', md: 'flex-end' },
//           gap: '5px',
//           mt: 4,
//           flexWrap: 'wrap',
//         }}
//       >
//         <Button
//           type="button"
//           onClick={() => setOpen(false)}
//           autoFocus
//           variant="solid"
//           sx={{
//             background: 'black',
//             '&:hover': { background: '#424242' },
//             color: 'white',
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           autoFocus
//           type="submit"
//           variant="solid"
//           sx={{
//             background: '#fdd835',
//             '&:hover': { background: '#E1A91B' },
//             color: 'black',
//           }}
//         >
//           Save
//         </Button>
//       </Box>
//     </AppForm>
//   </div>
// </Sheet>
// </Modal>
// )
// }
// export default React.memo(AddDatabaseModal)