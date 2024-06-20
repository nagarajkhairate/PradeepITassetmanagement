import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Sheet, Typography } from "@mui/joy"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from "../../../Redux/store"
import { useDispatch } from "react-redux"


interface SetupAddDeptProps {
    open: boolean
    handleClose: () => void
    departmentName: string
    setDepartmentName: React.Dispatch<React.SetStateAction<string>>
    handleAddDepartment: (e: React.FormEvent<HTMLFormElement>) => void

  }

const SetupAddDept: React.FunctionComponent<SetupAddDeptProps> = ({ open, handleClose, departmentName, setDepartmentName, handleAddDepartment }) => {
  
return(
<Modal
              aria-labelledby="responsive-dialog-title"
              aria-describedby="modal-desc"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              open={open}
              onClose={handleClose}
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
                    {'Add a dept'}
                  </Typography>
                  <Divider />

                  <Box sx={{ marginBottom: '10px' }}>
                    <form onSubmit={handleAddDepartment}>
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
                          If you want to add a new dept of assets, you’re in the
                          right spot. Add a dept for computer equipment,
                          wireless keyboards, or any assets you’re working with.
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
                              marginLeft: '20px',
                            }}
                          >
                            dept*:
                          </FormLabel>
                          <Input
                            value={departmentName}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => setDepartmentName(e.target.value)}
                            placeholder="Type here"
                            sx={{
                              marginLeft: '20px',
                              width: '70%',
                              marginTop: '10px',
                            }}
                          />
                        </FormControl>
                      </Box>
                      <Divider />

                      <Button
                        autoFocus
                        type="submit"
                        variant="solid"
                        sx={{
                          background: '#fdd835',
                          color: 'black',
                          marginTop: '25px',
                          marginLeft: '40%',
                        }}
                      >
                        Add
                      </Button>

                      <Button
                        type="button"
                        onClick={handleClose}
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
                  </Box>
                </div>
              </Sheet>
            </Modal>
)
}
export default SetupAddDept