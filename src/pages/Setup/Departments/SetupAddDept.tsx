import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Sheet,
  Typography,
} from '@mui/joy'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch } from 'react-redux'
import AppForm from '../../../components/Common/AppForm'
import { addDepartment } from '../../../redux/features/DepartmentSlice'
import { RootState } from '../../../redux/store'
import { useState } from 'react'

interface SetupAddDeptProps {
  open: any
  setOpen: any
 
}

const SetupAddDept: React.FunctionComponent<SetupAddDeptProps> = ({
  open,
  setOpen,

}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [formData, setFormData] = useState({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: capitalizeWords(value),
    }))
  }

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addDepartment(formData))
    setOpen(false)
  }

  
  const capitalizeWords = (str: string) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <Modal
      aria-labelledby="responsive-dialog-title"
      aria-describedby="modal-desc"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p:8
      }}
      open={open}
      onClose={setOpen}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 4,
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
          {'Add a department'}
        </Typography>
        <Divider />

        <Box sx={{ marginBottom: '10px' }}>
          <AppForm onSubmit={handleAddDepartment}>
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
                
              }}
            >
              <Typography sx={{ padding: 'none',}}>
                If you want to add a new dept of assets, you’re in the right
                spot. Add a dept for computer equipment, wireless keyboards, or
                any assets you’re working with.
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
                    paddingTop: '15px',
                    marginLeft: '5px',
                  }}
                >
                  department<span style={{ color: 'red' }}>*</span>:
                </FormLabel>
                <Input
                  name="departmentName"
                  onChange={handleInputChange}
                  placeholder="Type here"
                  sx={{
                    width:{md:'70%',xs:'65%'},
                    marginTop: '10px',
                  }}
                  required
                />
              </FormControl>
            </Box>
           
            <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row'},
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            mt: 4,
            flexWrap:'wrap'
          }}
        >

<Button
                onClick={()=>setOpen()}
                autoFocus
                variant="solid"
                sx={{
                  mr: 1,
                  background: 'black',
                  color: 'white',
                 '&:hover': {
                backgroundColor: "#616161",
              },
                }}
              >
                Cancel
              </Button>
              
              <Button
                autoFocus
               onClick={handleAddDepartment}
                variant="solid"
                sx={{
                  background: '#fdd835',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#c6a700', // Darker shade of #fdd835
                  },
                  gap:4
                }}
              >
                Add 
              </Button>

              
            </Box>
          </AppForm>
        </Box>
      </Sheet>
    </Modal>
  )
}
export default SetupAddDept
