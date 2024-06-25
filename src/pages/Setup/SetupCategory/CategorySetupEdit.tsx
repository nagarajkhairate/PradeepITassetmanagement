import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, Sheet } from '@mui/joy'
import Table from '@mui/joy/Table'
import Checkbox from '@mui/joy/Checkbox'
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import { FormControl, FormLabel } from '@mui/joy'
import Input from '@mui/joy/Input'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import CategorySetup from './CategorySetup'
import CategoryDelete from './CategorySetupDelete'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../Redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, updateCategory } from '../../../Redux/features/CategorySlice'

type Category = {
  id: number
  categoryName: string
}

interface Props {
  categories1: Category[]
  // onCategoryChange: (updatedCategories: Category[]) => void
}

export function CategorySetupEdit({ categories1,
  //  onCategoryChange
   }: Props) {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  // const [lapCat, setLapCat] = useState<{ categoryData: Category[] }>({categoryData: [],})
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const categories = useSelector((state: RootState) => state.category.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(categories)
  const selectedCategory = selectedCell !== null ? categories[selectedCell] : null

  
  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index],
    )
  }

  const handleClickEditOpen = () => {
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedCell(null)

    // console.log(JSON.stringify(editOpen))
  }

  // const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const categoryName = (e.target as any).categoryName.value
  //   if (selectedCell !== null) {
  //     const updatedData = categories.map((item, index) =>
  //       index === selectedCell ? { ...item, categoryName } : item,
  //     )
  //     // setLapCat({ ...lapCat, categoryData: updatedData })
  //     dispatch(updateCategory(updatedData))
  //   console.log(categoryName)
  //     handleEditClose()
  //     // onCategoryChange(updatedData)
  //   }
  // }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCategory !== null) {
      const categoryName = (e.target as any).categoryName.value
      const updatedCategory = { ...selectedCategory, categoryName }
      dispatch(updateCategory(updatedCategory))
      handleEditClose()
    }
  }

  const handleDeleteButton = (index:number) => {
    setSelectedCell(index)
      handleDeleteOpen()
    
  }

  // const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (selectedCell !== null) {
  //   const updatedData = categories.filter(
  //     (_, index) => index !== selectedCell,
  //   )
  //   // setLapCat({ ...lapCat, categoryData: updatedData })
  //   // setMatchedSelected([])
  //   dispatch(deleteCategory(selectedCell))
  //   setDeleteOpen(false)
  //   // onCategoryChange(updatedData)
  // }
  // }

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCell !== null) {
      dispatch(deleteCategory(categories[selectedCell].id))
      setDeleteOpen(false)
      setSelectedCell(null)
      setMatchedSelected((prevSelected) =>
        prevSelected.filter((item) => item !== selectedCell),
      )
    }
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  // useEffect(() => {
  //   setLapCat({ categoryData: categories })
  // }, [categories])

  useEffect(() => {
    setSelectedCell(null)
  }, [categories])

  const handleEdit = (index:number) => {
    setSelectedCell(index)
      handleClickEditOpen()
    
  }

  return (
    <>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Table borderAxis="both" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: 30 }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    matchedSelected.length > 0 &&
                    matchedSelected.length < categories.length
                  }
                  checked={
                    matchedSelected.length > 0 &&
                    matchedSelected.length === categories.length
                  }
                  onChange={(event) => {
                    const isChecked = event.target.checked
                    setMatchedSelected(
                      isChecked
                        ?categories.map((_, index) => index)
                        : [],
                    )
                  }}
                  color={
                    matchedSelected.length > 0 &&
                    matchedSelected.length === categories.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.length >0 ? categories.map((custom, index) => (
                <tr key={custom.id}>
                  <td>
                    <Checkbox
                      checked={matchedSelected.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      color="primary"
                    />
                  </td>
                  <td>{custom.categoryName}</td>

                  <td>
                    <Button
                      onClick={()=>handleEdit(index)}
                      sx={{
                        background: '#ffffff',
                        color: 'green',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginLeft: 'none',
                        border: '1px solid green ',
                        borderRadius: '15px',
                        '&:hover': {
                          color: 'white',
                          background: 'green',
                        },
                      }}
                    >
                      <EditOutlinedIcon />
                      Edit
                    </Button>
                  </td>

                  <td>
                    <Button
                      onClick={()=>handleDeleteButton(index)}
                      sx={{
                        background: '#ffffff',
                        color: '#d32f2f',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginLeft: 'none',
                        border: '1px solid red ',
                        borderRadius: '15px',
                        '&:hover': {
                          color: 'white',
                          background: '#d32f2f',
                        },
                      }}
                    >
                      <DeleteForeverIcon />
                      Delete
                    </Button>
                  </td>
                </tr>
              )): <tr><td colSpan={4} style={{ textAlign: 'center' }}>Add the Category</td></tr>}
          </tbody>
        </Table>

        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="responsive-dialog-title"
          aria-describedby="modal-desc"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <div>
              <Typography
                id="responsive-dialog-title"
                component="h2"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                {'Edit the Customs here'}
              </Typography>

              <form onSubmit={handleEditButton}>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
                    Category*
                  </FormLabel>
                  <Input
                    variant="outlined"
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    required
                    sx={{ width: '70%', marginLeft: '10px' }}
                    defaultValue={selectedCategory ? selectedCategory.categoryName : ''}
                    // defaultValue={
                    //   selectedCell !== null
                    //     ? lapCat.categoryData[selectedCell].categoryName
                    //     : ''
                    // }
                  />
                </FormControl>
                <Button
                  autoFocus
                  type="submit"
                  variant="solid"
                  sx={{
                    background: '#fdd835',
                    color: 'black',
                    marginTop: '25px',
                    marginLeft: '30%',
                  }}
                >
                  Update
                </Button>

                <Button
                  type="button"
                  onClick={handleEditClose}
                  autoFocus
                  variant="solid"
                  sx={{
                    background: 'black',
                    color: 'white',
                    marginLeft: '50px',
                  }}
                >
                  Cancel
                </Button>
              </form>
            </div>
          </Sheet>
        </Modal>


        <CategoryDelete
          open={deleteOpen}
          handleDeleteClose={handleDeleteClose}
          handleDeleteSubmit={handleDeleteSubmit}
        />

      </Stack>
    </>
  )
}

export default CategorySetupEdit





// import React, { useState, useEffect } from 'react'
// import { Stack, Box, Typography, Sheet } from '@mui/joy'
// import Table from '@mui/joy/Table'
// import Checkbox from '@mui/joy/Checkbox'
// import Button from '@mui/joy/Button'
// import Modal from '@mui/joy/Modal'
// import { FormControl, FormLabel } from '@mui/joy'
// import Input from '@mui/joy/Input'
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
// import useMediaQuery from '@mui/material/useMediaQuery'
// import { useTheme } from '@mui/material/styles'
// import CategorySetup from './CategorySetup'
// import CategoryDelete from './CategorySetupDelete'
// import { ThunkDispatch } from 'redux-thunk'
// import { RootState } from '../../../Redux/store'
// import { useDispatch, useSelector } from 'react-redux'
// import { deleteCategory, updateCategory } from '../../../Redux/features/CategorySlice'

// type Category = {
//   id: number
//   categoryName: string
// }

// interface Props {
//   categories: Category[]
//   onCategoryChange: (updatedCategories: Category[]) => void
// }

// export function CategorySetupEdit({ categories, onCategoryChange }: Props) {
//   const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
//   const [matchedSelected, setMatchedSelected] = useState<number[]>([])
//   const [lapCat, setLapCat] = useState<{ categoryData: Category[] }>({categoryData: [],})
//   const [selectedCell, setSelectedCell] = useState<number | null>(null)
//   const [editOpen, setEditOpen] = useState<boolean>(false)
//   const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
//   const theme = useTheme()
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

//   const category = useSelector((state: RootState) => state.category.data)
//   // const dispatch = useDispatch<AppDispatch>()
//   console.log(category)

//   const handleCheckboxChange = (index: number) => {
//     setMatchedSelected((prevSelected) =>
//       prevSelected.includes(index)
//         ? prevSelected.filter((item) => item !== index)
//         : [...prevSelected, index],
//     )
//     setSelectedCell(index)
//   }

//   const handleClickEditOpen = () => {
//     setEditOpen(true)
//   }

//   const handleEditClose = () => {
//     setEditOpen(false)
//     setSelectedCell(null)

//     // console.log(JSON.stringify(editOpen))
//   }

//   const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const categoryName = (e.target as any).categoryName.value
//     if (selectedCell !== null) {
//       const updatedData = lapCat.categoryData.map((item, index) =>
//         index === selectedCell ? { ...item, categoryName } : item,
//       )
//       setLapCat({ ...lapCat, categoryData: updatedData })
//       dispatch(updateCategory(updatedData))
//     console.log(categoryName)
//       handleEditClose()
//       onCategoryChange(updatedData)
//     }
//   }

//   const handleDeleteButton = () => {
//     if (selectedCell !== null) {
//       handleDeleteOpen()
//     }
//   }

//   const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (selectedCell !== null) {
//     const updatedData = lapCat.categoryData.filter(
//       (_, index) => index !== selectedCell,
//     )
//     setLapCat({ ...lapCat, categoryData: updatedData })
//     // setMatchedSelected([])
//     setDeleteOpen(false)
//     onCategoryChange(updatedData)
//   }
//   }

//   const handleDeleteOpen = () => {
//     setDeleteOpen(true)
//   }

//   const handleDeleteClose = () => {
//     setDeleteOpen(false)
//     setMatchedSelected([])
//   }

//   useEffect(() => {
//     setLapCat({ categoryData: categories })
//   }, [categories])

//   const handleEdit = () => {
//     if (selectedCell !== null) {
//       handleClickEditOpen()
//     }
//   }

//   return (
//     <>
//       <Stack
//         direction={{ xs: 'column', sm: 'row' }}
//         spacing={{ xs: 1, sm: 2, md: 2 }}
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Table borderAxis="both" style={{ borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={{ width: 30 }}>
//                 <Checkbox
//                   size="sm"
//                   indeterminate={
//                     matchedSelected.length > 0 &&
//                     matchedSelected.length < lapCat.categoryData.length
//                   }
//                   checked={
//                     matchedSelected.length > 0 &&
//                     matchedSelected.length === lapCat.categoryData.length
//                   }
//                   onChange={(event) => {
//                     const isChecked = event.target.checked
//                     setMatchedSelected(
//                       isChecked
//                         ? lapCat.categoryData.map((_, index) => index)
//                         : [],
//                     )
//                   }}
//                   color={
//                     matchedSelected.length > 0 &&
//                     matchedSelected.length === lapCat.categoryData.length
//                       ? 'primary'
//                       : undefined
//                   }
//                   sx={{ verticalAlign: 'text-bottom' }}
//                 />
//               </th>
//               <th>Category</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {lapCat.categoryData.length >0 ? lapCat.categoryData.map((custom, index) => (
//                 <tr key={custom.id}>
//                   <td>
//                     <Checkbox
//                       checked={matchedSelected.includes(index)}
//                       onChange={() => handleCheckboxChange(index)}
//                       color="primary"
//                     />
//                   </td>
//                   <td>{custom.categoryName}</td>

//                   <td>
//                     <Button
//                       onClick={handleEdit}
//                       sx={{
//                         background: '#ffffff',
//                         color: 'green',
//                         display: 'flex',
//                         justifyContent: 'flex-end',
//                         marginLeft: 'none',
//                         border: '1px solid green ',
//                         borderRadius: '15px',
//                         '&:hover': {
//                           color: 'white',
//                           background: 'green',
//                         },
//                       }}
//                     >
//                       <EditOutlinedIcon />
//                       Edit
//                     </Button>
//                   </td>

//                   <td>
//                     <Button
//                       onClick={() => handleDeleteButton()}
//                       sx={{
//                         background: '#ffffff',
//                         color: '#d32f2f',
//                         display: 'flex',
//                         justifyContent: 'flex-end',
//                         marginLeft: 'none',
//                         border: '1px solid red ',
//                         borderRadius: '15px',
//                         '&:hover': {
//                           color: 'white',
//                           background: '#d32f2f',
//                         },
//                       }}
//                     >
//                       <DeleteForeverIcon />
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               )): <tr><td colSpan={4} style={{ textAlign: 'center' }}>Add the Category</td></tr>}
//           </tbody>
//         </Table>

//         <Modal
//           open={editOpen}
//           onClose={handleEditClose}
//           aria-labelledby="responsive-dialog-title"
//           aria-describedby="modal-desc"
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Sheet
//             variant="outlined"
//             sx={{
//               maxWidth: 500,
//               borderRadius: 'md',
//               p: 3,
//               boxShadow: 'lg',
//             }}
//           >
//             <div>
//               <Typography
//                 id="responsive-dialog-title"
//                 component="h2"
//                 level="h4"
//                 textColor="inherit"
//                 fontWeight="lg"
//                 mb={1}
//               >
//                 {'Edit the Customs here'}
//               </Typography>

//               <form onSubmit={handleEditButton}>
//                 <FormControl
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'space-evenly',
//                   }}
//                 >
//                   <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
//                     Category*
//                   </FormLabel>
//                   <Input
//                     variant="outlined"
//                     type="text"
//                     id="categoryName"
//                     name="categoryName"
//                     required
//                     sx={{ width: '70%', marginLeft: '10px' }}
//                     // defaultValue={
//                     //   selectedCell !== null
//                     //     ? lapCat.categoryData[selectedCell].categoryName
//                     //     : ''
//                     // }
//                   />
//                 </FormControl>
//                 <Button
//                   autoFocus
//                   type="submit"
//                   variant="solid"
//                   sx={{
//                     background: '#fdd835',
//                     color: 'black',
//                     marginTop: '25px',
//                     marginLeft: '30%',
//                   }}
//                 >
//                   Update
//                 </Button>

//                 <Button
//                   type="button"
//                   onClick={handleEditClose}
//                   autoFocus
//                   variant="solid"
//                   sx={{
//                     background: 'black',
//                     color: 'white',
//                     marginLeft: '50px',
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </form>
//             </div>
//           </Sheet>
//         </Modal>


//         <CategoryDelete
//           open={deleteOpen}
//           handleDeleteClose={handleDeleteClose}
//           handleDeleteSubmit={handleDeleteSubmit}
//         />

//       </Stack>
//     </>
//   )
// }

// export default CategorySetupEdit
