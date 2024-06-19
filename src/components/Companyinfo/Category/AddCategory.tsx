import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Sheet, Typography } from '@mui/joy'
import React from 'react'


interface CategoryAddProps {
    open: boolean
    handleClose: () => void
    categoryName: string
    setCategoryName: React.Dispatch<React.SetStateAction<string>>
    handleAddCategory: (e: React.FormEvent<HTMLFormElement>) => void

  }

  const AddCategory: React.FunctionComponent<CategoryAddProps> = ({ open, handleClose, categoryName, setCategoryName, handleAddCategory }) => {


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
              onClose={handleClose}
            >
              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: 'md',
                  maxWidth: 500,
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
                    {'Add a Category'}
                  </Typography>
                  <Divider />

                  <Box sx={{ marginBottom: '10px' }}>
                    <form onSubmit={handleAddCategory}>
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
                          If you want to add a new category of assets, you’re in
                          the right spot. Add a category for computer equipment,
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
                            Category*:
                          </FormLabel>
                          <Input
                            value={categoryName}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>,
                            ) => setCategoryName(e.target.value)}
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

export default AddCategory