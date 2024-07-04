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
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { updateCategory } from '../../../Redux/features/CategorySlice'

type Category = {
  id: number
  categoryName: string
}

interface Props {
  categories1: Category[]
  matchedSelected: number[];
  setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>;
  handleDeleteOpen: () => void;
}

export function CategorySetupEdit({ categories1,
  matchedSelected,
  setMatchedSelected,
  handleDeleteOpen,
   }: Props) {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const categories = useSelector((state: RootState) => state.category.data)
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

  }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCategory !== null) {
      const categoryName = (e.target as any).categoryName.value
      const updatedCategory = { ...selectedCategory, categoryName:capitalizeWords(categoryName) }
      dispatch(updateCategory(updatedCategory))
      handleEditClose()
    }
  }
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleDeleteButton = (index:number) => {
    setSelectedCell(index)
      handleDeleteOpen()
    
  }

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
              <th
               style={{ width: 30, background: '#fff8e6',verticalAlign:'middle' }}
               >
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
                />
              </th>
              <th 
              style={{ background: '#fff8e6' ,verticalAlign:'middle'}}>Category</th>
              <th style={{ background: '#fff8e6',verticalAlign:'middle' }}>Edit</th>
              <th style={{background: '#fff8e6',verticalAlign:'middle' }}>Delete</th>
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

                  <td style={{ textAlign: 'right' }}>
                    <Button
                      onClick={()=>handleEdit(index)}
                      sx={{
                        fontSize: '13px',
                        background: '#ffffff',
                        color: 'green',
                        // display: 'inline-flex',
                        display: 'flex',
                        justifyContent: {
                          md: 'flex-end',
                          xs:'center'
                        },
                        marginLeft: 'none',
                        border: '1px solid green ',
                        borderRadius: '10px',
                        '&:hover': {
                          color: 'white',
                          background: 'green',
                        },
                        padding: ".15rem .50rem"
                      }}
                    >
                      <EditOutlinedIcon sx={{ fontSize: '15px' }}/>
                      Edit
                    </Button>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <Button
                      onClick={()=>handleDeleteButton(index)}
                      sx={{
                        fontSize: '13px',
                        background: '#ffffff',
                        color: '#d32f2f',
                        // display: 'inline-flex',
                        display: 'flex',
                        justifyContent: { md: 'flex-end', xs: 'center' },
                        
                        marginLeft: 'none',
                        border: '1px solid red ',
                        borderRadius: '10px',
                        '&:hover': {
                          color: 'white',
                          background: '#d32f2f',
                        },
                        padding: ".5rem .10rem"
                      }}
                    >
                      <DeleteForeverIcon sx={{ fontSize: '15px' }}/>
                      Delete
                    </Button>
                  </td>
                </tr>
              )): <tr><td colSpan={4} style={{ textAlign: 'center' }}>Add the Category</td></tr>}
          </tbody>
        </Table>
        </Box>
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
      </Stack>
    </>
  )
}

export default CategorySetupEdit
