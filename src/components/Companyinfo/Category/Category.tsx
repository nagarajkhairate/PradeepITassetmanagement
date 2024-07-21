import React, { useEffect } from 'react'
import { Box, Checkbox, Stack, Table } from '@mui/joy'
import { Typography, Divider } from '@mui/joy'
import Button from '@mui/joy/Button'
import AddIcon from '@mui/icons-material/Add'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined'
import { useState } from 'react'
import EditCategory from './EditCategory'
import AppView from '../../../components/Common/AppView'
import AddCategory from './AddCategory'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { fetchCategory } from '../../../redux/features/CategorySlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DeleteCategory from './DeleteCategory'
import { RootState } from '../../../redux/store'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

interface CategoryProps {
  activeTab: number
  setActiveTab: (tab: number) => void
}

const CategoryPage: React.FunctionComponent<CategoryProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [open, setOpen] = useState<boolean>(false)
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const categories = useSelector((state: RootState) => state.category.data)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleEdit = (location: number) => {
    setEditOpen(true)
    setSelectedLocation(location)
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  const handleNext = () => {
    setActiveTab(activeTab + 1)
  }

  const handleBack = () => {
    setActiveTab(activeTab - 1)
  }

  useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  return (
    <AppView>
      <Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: 2,
            mb: 1,
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
              }}
            >
              <TuneOutlinedIcon
                sx={{
                  fontSize: '1.1rem',
                  color: '#FABC1E',
                  alignItems: 'center',
                }}
              />
              List of Categories
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
              gap: 2,
            }}
          >
            <Button
              autoFocus
              variant="solid"
              sx={{
                background: '#388e3c',
                borderRadius: '15px',
                color: 'white',
              }}
              component="label"
              onClick={handleClickOpen}
            >
              <AddIcon /> Add New Category
            </Button>

            {matchedSelected.length > 0 && (
              <Button
                onClick={handleDeleteOpen}
                autoFocus
                variant="solid"
                sx={{
                  fontSize: '13px',
                  // background: '#ffffff',
                  borderRadius: '15px',
                  // color: '#d32f2f',
                  background: '#d32f2f',
                  display: 'flex',
                  justifyContent: { md: 'flex-end', xs: 'center' },
                  marginLeft: 'none',
                  border: '1px solid red',

                  padding: '.5rem .10rem',
                }}
              >
                <DeleteForeverIcon sx={{ fontSize: '15px' }} />
                Delete Categories
              </Button>
            )}

            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: 'black',
                borderRadius: '15px',
                color: 'white',
              }}
            >
              <PublishOutlinedIcon />
              Import Categories
            </Button>
          </Box>
        </Box>

        <Divider />

        <Box>
          <Box sx={{ marginTop: '10px' }}>
            <Typography>
              Add the type of groups of assets. To start with, commonly used
              categories have already been created for you. Make them as broad
              or as specific as you want. Categories can be laptops and
              printers, equipment, or chairs. Customize to your particular need.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              marginTop: '1px',
              padding: '20px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: 1,
              }}
            >
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',

                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateBeforeOutlinedIcon />
              </Button>
              <Button
                sx={{
                  background: '#ffffff',
                  color: 'green',
                  border: '1px solid green ',

                  '&:hover': {
                    color: 'white',
                    background: 'green',
                  },
                }}
              >
                1
              </Button>
              <Button
                sx={{
                  background: '#FDE8BC',
                  border: '1px solid #C2B083',
                  color: 'black',

                  '&:hover': {
                    background: '#FADFB4',
                  },
                }}
              >
                <NavigateNextOutlinedIcon />
              </Button>
            </Box>
          </Box>
        </Box>

     
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
              }}
            >
              <Table borderAxis="both" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        width: 30,
                        background: '#fff8e6',
                        verticalAlign: 'middle',
                      }}
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
                              ? categories.map((_, index) => index)
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
                    <th
                      style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                    >
                      Category
                    </th>
                    <th
                      style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                    >
                      Edit
                    </th>
                    <th
                      style={{ background: '#fff8e6', verticalAlign: 'middle' }}
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 ? (
                    categories.map((category: any, index: number) => (
                      <tr key={`${category.id}- ${index}`}>
                        <td>
                          <Checkbox color="primary" />
                        </td>
                        <td>{category.categoryName}</td>

                        <td>
                          <Button
                            onClick={() => handleEdit(category)}
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
                            <EditOutlinedIcon sx={{ fontSize: '18px' }} />
                            Edit
                          </Button>
                        </td>

                        <td>
                          <Button
                            // onClick={()=>handleDeleteButton(index)}
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
                              padding: '.5rem .15rem',
                            }}
                          >
                            <DeleteForeverIcon sx={{ fontSize: '18px' }} />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center' }}>
                        Add the Category
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Box>
          </Stack>
          {open && <AddCategory open={open} setOpen={setOpen} />}
          {editOpen && (
            <EditCategory
              category={selectedLocation}
              editOpen={editOpen}
              setEditOpen={() => setEditOpen(false)}
            />
          )}
       
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            sx={{
              background: '#388e3c',
              color: 'white',
              '&:hover': { background: '#388e3B' },
              borderRadius: '10px',
            }}
            disabled={activeTab === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            sx={{
              background: '#FABC1E',
              color: 'black',
              '&:hover': { background: '#E1A91B' },
              borderRadius: '10px',
            }}
            onClick={handleNext}
          >
            Continue
          </Button>
        </Box>
      </Box>

      <DeleteCategory
        open={deleteOpen}
        handleDeleteClose={handleDeleteClose}
        handleDeleteOpen={handleDeleteOpen}
      />
    </AppView>
  )
}

export default CategoryPage
