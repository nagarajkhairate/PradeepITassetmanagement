import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Sheet, Typography } from '@mui/joy'
import React from 'react'
import AppForm from '../../../components/Common/AppForm'


interface CategoryAddProps {
    open: boolean
    handleClose: () => void
    categoryName: string
    setCategoryName: React.Dispatch<React.SetStateAction<string>>
    handleAddCategory: (e: React.FormEvent<HTMLFormElement>) => void

  }

  const CategoryAdd: React.FunctionComponent<CategoryAddProps> = ({ open, handleClose, categoryName, setCategoryName, handleAddCategory }) => {
    const [error, setError] = React.useState<string | null>(null);

  return (
    <Modal
              aria-labelledby="responsive-dialog-title"
              aria-describedby="modal-desc"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p:3
              }}
              open={open}
              onClose={handleClose}
            >
              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: 'md',
                  maxWidth: 500,
                  p: 1,
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
                    m={1}
                  >
                    {'Add a Category'}
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
                        <Typography sx={{ padding: 'none',  }}>
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      const regex = /^[a-zA-Z0-9\s]*$/; // Alphanumeric and spaces
                      if (regex.test(value)) {
                        setCategoryName(value);
                        setError(null);
                      } else {
                        setError('Category can only contain letters and numbers.');
                      }
                    }}
                    placeholder="Type here"
                    sx={{
                      marginLeft: '20px',
                      width: '70%',
                      marginTop: '10px',
                    }}
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
            mt: 1,
            flexWrap:'wrap'
          }}
        >

<Button
                        type="button"
                        onClick={handleClose}
                        autoFocus
                        variant="solid"
                        sx={{
                          background: 'black',
                          '&:hover': { background: "#424242" },
                          color: 'white',

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
                        Add
                      </Button>

                      
                      </Box>
                    </AppForm>
                  </Box>
                </div>
              </Sheet>
            </Modal>
  )
}

export default CategoryAdd