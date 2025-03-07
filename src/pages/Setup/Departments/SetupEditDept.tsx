
import React, { useState, useEffect } from 'react'
import { Stack, Box, Typography, Sheet, ListItem } from '@mui/joy'
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
import SetupDept from './SetupDept'
import SetupDeleteDept from './SetupDeleteDept'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteDepartment,
  updateDepartment,
} from '../../../redux/features/DepartmentSlice'
import { RootState } from '../../../redux/store'
import AppForm from '../../../components/Common/AppForm'

type Department = {
  id: number
  departmentName: string
}

interface Props {
  department1: Department[]
  matchedSelected: number[]
  setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>
  handleDeleteOpen: () => void
}

export function SetupEditDept({
  department1,
  matchedSelected,
  setMatchedSelected,
  handleDeleteOpen,
}: Props) {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  // const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [depart, setDepart] = useState<{ data: Department[] }>({ data: [] })
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  // const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const departments = useSelector((state: RootState) => state.departments.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(departments)
  const selectedDepartment =
    selectedCell !== null ? departments[selectedCell] : null

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index],
    )
    // setSelectedCell(index);
  }

  const handleClickEditOpen = () => {
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedCell(null)

    // console.log(JSON.stringify(editOpen))
  }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedDepartment !== null) {
      const departmentName = (e.target as any).departmentName.value
      const updatedCategory = {
        ...selectedDepartment,
        departmentName: capitalizeWords(departmentName),
      }
      dispatch(updateDepartment(updatedCategory))
      handleEditClose()
    }
  }

  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  const handleDeleteButton = (index: number) => {
    setSelectedCell(index)
    handleDeleteOpen()
  }

  useEffect(() => {
    setSelectedCell(null)
  }, [departments])

  const handleEdit = (index: number) => {
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
                  style={{
                    width: 35,
                    background: '#fff8e6',
                    verticalAlign: 'middle',
                  }}
                >
                  <Checkbox
                    size="sm"
                    indeterminate={
                      matchedSelected.length > 0 &&
                      matchedSelected.length < departments.length
                    }
                    checked={
                      matchedSelected.length > 0 &&
                      matchedSelected.length === departments.length
                    }
                    onChange={(event) => {
                      const isChecked = event.target.checked
                      setMatchedSelected(
                        isChecked ? departments.map((_, index) => index) : [],
                      )
                    }}
                    color={
                      matchedSelected.length > 0 &&
                      matchedSelected.length === departments.length
                        ? 'primary'
                        : undefined
                    }
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </th>
                <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                  Department
                </th>
                <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                  Edit
                </th>
                <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.length > 0 ? (
                departments.map((custom, index) => (
                  <tr key={custom.id}>
                    <td>
                      <Checkbox
                        checked={matchedSelected.includes(index)}
                        onChange={() => handleCheckboxChange(index)}
                        color="primary"
                      />
                    </td>
                    <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{custom.departmentName}</td>

                    <td>
                      <Button
                        onClick={() => handleEdit(index)}
                        sx={{
                          fontSize: '13px',
                          background: '#ffffff',
                          color: 'green',
                          display: 'flex',
                          justifyContent: {
                            md: 'flex-end',
                            xs: 'center',
                          },
                          marginLeft: 'none',
                          border: '1px solid green ',
                          borderRadius: '13px',
                          '&:hover': {
                            color: 'white',
                            background: 'green',
                          },
                          padding: '.25rem .55rem',
                        }}
                      >
                        <EditOutlinedIcon
                          sx={{
                            fontSize: '15px',
                          }}
                        />
                        Edit
                      </Button>
                    </td>

                    <td>
                      <Button
                        onClick={() => handleDeleteButton(index)}
                        sx={{
                          fontSize: '13px',
                          background: '#ffffff',
                          color: '#d32f2f',
                          display: 'flex',
                          justifyContent: { md: 'flex-end', xs: 'center' },

                          marginLeft: 'none',
                          border: '1px solid red ',
                          borderRadius: '13px',
                          '&:hover': {
                            color: 'white',
                            background: '#d32f2f',
                          },
                          padding: '.5rem .35rem',
                        }}
                      >
                        <DeleteForeverIcon
                          sx={{
                            fontSize: '15px',
                          }}
                        />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center' }}>
                    Add the Data
                  </td>
                </tr>
              )}
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
            p:3
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              // maxWidth: 500,
              borderRadius: 'md',
              p: 2,
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

              <AppForm onSubmit={handleEditButton}>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <FormLabel sx={{ paddingTop: '10px', marginLeft: '25px' }}>
                    Department<span style={{ color: 'red' }}>*</span>:
                  </FormLabel>
                  <Input
                    variant="outlined"
                    type="text"
                    id="departmentName"
                    name="departmentName"
                    
                    required
                    sx={{  marginLeft: '10px',width:{md:'60%',xs:'60%'}, }}
                    defaultValue={
                      selectedDepartment
                        ? selectedDepartment.departmentName
                        : ''
                    }
                    // defaultValue={selectedCell !== null ? depart.data[selectedCell].departmentName : ""} // Set default value to the selected cell content
                  />
                </FormControl>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: { md: 'row' },
                    justifyContent: { xs: 'space-between', md: 'flex-end' },
                    gap: '5px',
                    flexWrap: 'wrap',
                    mt: 4,
                  }}
                >
                  <Button
                    type="button"
                    onClick={handleEditClose}
                    autoFocus
                    variant="solid"
                    sx={{
                      background: 'black',
                      color: 'white',
                      '&:hover': { background: "#424242" },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    autoFocus
                    type="submit"
                    variant="solid"
                    sx={{
                      background: '#fdd835',
                      '&:hover': { background: '#E1A91B' },
                      color: 'black',
                    }}
                  >
                    Update
                  </Button>

                  
                </Box>
              </AppForm>
            </div>
          </Sheet>
        </Modal>

        {/* <Modal
          
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="responsive-dialog-title"
          
          aria-describedby="modal-desc"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
          <Typography id="responsive-dialog-title" component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>{"Delete Customs here"}</Typography>

          <form onSubmit={handleDeleteSubmit}>
            <FormControl sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
              <Box sx={{ marginBottom: "20px", padding: "20px" }}>Are you sure you want to delete this Department?</Box>
             
            </FormControl>
            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "40%",
              }}
            >
              Confirm Delete
            </Button>

            <Button
              type="button"
              onClick={handleDeleteClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginTop: "25px", marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </form>
          </div>
          </Sheet>
        </Modal> */}
      </Stack>
    </>
  )
}

export default SetupEditDept

