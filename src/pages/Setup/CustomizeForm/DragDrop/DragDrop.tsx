// import React, { useState, DragEvent, FunctionComponent } from 'react'
// import { FormControl, FormLabel, Grid, Input, Select } from '@mui/joy'

// interface DragProps {
//   formData: any[]
//   setFormData: React.Dispatch<React.SetStateAction<any[]>>
// }

// const DragDrop: FunctionComponent<DragProps> = ({ formData, setFormData }) => {
//   const [draggingItem, setDraggingItem] = useState<any | null>(null)

//   const handleDragStart = (e: DragEvent<HTMLDivElement>, item: any) => {
//     setDraggingItem(item)
//     e.dataTransfer.setData('text/plain', '')
//   }

//   const handleDragEnd = () => {
//     setDraggingItem(null)
//   }

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//   }

//   const handleDrop = (e: DragEvent<HTMLDivElement>, targetItem: any) => {
//     e.preventDefault()
//     if (!draggingItem) return

//     const currentIndex = formData.indexOf(draggingItem)
//     const targetIndex = formData.indexOf(targetItem)

//     if (currentIndex !== -1 && targetIndex !== -1) {
//       const updatedFields = [...formData]
//       updatedFields.splice(currentIndex, 1)
//       updatedFields.splice(targetIndex, 0, draggingItem)

//       // Update the sequence order
//       updatedFields.forEach((field, index) => {
//         field.sequence = index + 1
//       })

//       setFormData(updatedFields)
//     }
//   }

//   const handleInputValue = (field: any) => {
//     switch (field.components.type) {
//       case 'text':
//       case 'date':
//       case 'checkbox':
//       case 'textArea':
//       case 'file':
//         return (
//           <FormControl>
//             <FormLabel>
//               {field.fieldName} <span>{field.required && '*'}</span>:
//             </FormLabel>
//             <Input
//               placeholder={field.fieldName}
//               name={field.value}
//               type={field.dataType}
//               disabled
//             />
//           </FormControl>
//         )
//       case 'select':
//         return (
//           <FormControl>
//             <FormLabel sx={{ fontSize: '12px' }}>
//               {field.fieldName}
//               {field.isRequired && <span style={{ color: 'red' }}>*</span>}:
//             </FormLabel>
//             <Select placeholder={field.fieldName} size="sm" disabled></Select>
//           </FormControl>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <Grid container spacing={2} sx={{ flexGrow: 1, p: 2 }}>
//       {formData
//         .sort((a: any, b: any) => a.sequence - b.sequence)
//         .map((item: any) => (
//           <Grid
//             key={item.id}
//             className={`item ${item === draggingItem ? 'dragging' : ''}`}
//             draggable="true"
//             onDragStart={(e) => handleDragStart(e, item)}
//             onDragEnd={handleDragEnd}
//             onDragOver={handleDragOver}
//             onDrop={(e) => handleDrop(e, item)}
//             xs={8}
//             sx={{
//               p: 1,
//               borderRadius: '10px',
//               m: 1,
//               boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             {handleInputValue(item)}
//           </Grid>
//         ))}
//     </Grid>
//   )
// }

// export default DragDrop
