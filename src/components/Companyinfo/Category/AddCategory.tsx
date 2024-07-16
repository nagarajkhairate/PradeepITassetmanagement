import { Box, Button, Divider, FormControl, FormLabel, Input, Modal, Sheet, Typography } from '@mui/joy'
import React, { useState } from 'react'
import AppForm from '../../Common/AppForm'


interface CategoryAddProps {
    open: any
    setOpen: any


  }

  const AddCategory: React.FunctionComponent<CategoryAddProps> = ({ open, setOpen }) => {
    const [formData, setFormData] = useState({})
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target;
      
      setFormData((prevData)=>({
        ...prevData,
        [name]: value
      }))
        }
      const handleSubmit
       = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
      }

      console.log(formData)
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
                  borderRadius: 'md',
                  maxWidth: 500,
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
                    {'Add a Category'}
                  </Typography>
                  <Divider />

                  <Box sx={{ marginBottom: '10px' }}>
                    <AppForm onSubmit={handleSubmit}>
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
                            // value={categoryName}
                            onChange={handleInputChange}
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

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 2 }}>
                      <Button
                       
                       onClick={()=> setOpen()}
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
                       Add Category
                     </Button>
                      </Box>

                     
                    </AppForm>
                  </Box>
          
              </Sheet>
            </Modal>
  )
}

export default AddCategory