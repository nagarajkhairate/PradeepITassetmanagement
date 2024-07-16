import { KeyboardArrowDown } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Option,
  Select,
  Sheet,
  Typography,
  selectClasses,
} from '@mui/joy'
import { RootState } from '../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import React, { useState } from 'react'
import { fetchCategory } from '../../../redux/features/CategorySlice'
import AppForm from '../../../components/Common/AppForm'
import { addSubCategories } from '../../../redux/features/CategorySubSlice'

interface CategorySubAddProps {
  open: any
  setOpen: any
}

const CategorySubAdd: React.FunctionComponent<CategorySubAddProps> = ({
  open,
  setOpen,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const categories = useSelector((state: RootState) => state.category.data)

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(addSubCategories(formData))
    setOpen(false)
  }

  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setFormData((prevData: any) => ({
      ...prevData,
      categoryId: newValue,
    }))
  }

  React.useEffect(() => {
    dispatch(fetchCategory())
  }, [dispatch])

  return (
    <Modal
      aria-labelledby="responsive-dialog-title"
      aria-describedby="modal-desc"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      open={open}
      onClose={setOpen}
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
        <Typography
          id="responsive-dialog-title"
          component="h2"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {'Add a Sub Category'}
        </Typography>
        <Divider />

        <Box sx={{ marginBottom: '10px' }}>
          <AppForm onSubmit={handleAddCategory}>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            ></FormControl>

            <Box
              sx={{
                marginTop: '1px',
                marginBottom: '15px',
                padding: '10px',
              }}
            >
              <Typography sx={{ padding: 'none', width: '100%' }}>
                Enter the data about your new sub category in the fields below
                and we will add it to your list.
              </Typography>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: '10px',
                }}
              >
                <FormLabel
                  sx={{
                    paddingTop: '20px',
                    marginLeft: '25px',
                  }}
                >
                  Category*:
                </FormLabel>
                <Select
                  onChange={handleSelectChange}
                  placeholder="Select a Category"
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    width: '50%',
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                  }}
                >
                  {categories &&
                    categories.map((subCategory) => (
                      <Option key={subCategory.id} value={subCategory.id}>
                        {subCategory.categoryName}
                      </Option>
                    ))}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: '10px',
                }}
              >
                <FormLabel
                  sx={{
                    paddingTop: '20px',
                    marginLeft: 'none',
                  }}
                >
                  Sub Category*:
                </FormLabel>
                <Input
                  name="subCategory"
                  onChange={HandleInputChange}
                  placeholder="Type here"
                  sx={{
                    marginLeft: '5px',
                    width: '50%',
                    marginTop: '10px',
                  }}
                />
              </FormControl>
            </Box>
            <Divider />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
              <Button
                onClick={() => setOpen()}
                autoFocus
                variant="solid"
                sx={{
                  mr: 1,
                  background: 'black',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#333', // Darker shade of black
                  },
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
                  color: 'black',
                  '&:hover': { background: '#E1A91B' },
                }}
              >
                Add Sub Category
              </Button>
            </Box>
          </AppForm>
        </Box>
      </Sheet>
    </Modal>
  )
}

export default CategorySubAdd
