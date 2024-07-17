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
      [name]: value,
    }))
  }

  const handleAddDepartment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addDepartment(formData))
  }

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
          {'Add a dept'}
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
                padding: '10px',
              }}
            >
              <Typography sx={{ padding: 'none', width: '100%' }}>
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
                  department*:
                </FormLabel>
                <Input
                  // value={''}
                  name="department"
                  onChange={handleInputChange}
                  placeholder="Type here"
                  sx={{
                    width: '70%',
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
                  '&:hover': {
                    backgroundColor: '#c6a700', // Darker shade of #fdd835
                  },
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
