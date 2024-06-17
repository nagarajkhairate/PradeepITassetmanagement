import { Box, Button, FormControl, Modal, Sheet, Typography } from '@mui/joy'
import React from 'react'

interface CategoryDeleteProps{
    open:boolean
    handleDeleteClose:() => void
    handleDeleteSubmit:(e: React.FormEvent<HTMLFormElement>) => void
}

const CategoryDelete: React.FunctionComponent<CategoryDeleteProps> = ({open, handleDeleteClose, handleDeleteSubmit}) => {
  return (
    <Modal
          open={open}
          onClose={handleDeleteClose}
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
                {'Delete Customs here'}
              </Typography>

              <form onSubmit={handleDeleteSubmit}>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Box sx={{ marginBottom: '20px', padding: '20px' }}>
                    Are you sure you want to delete this Category?
                  </Box>
                  {/* <Input
                    variant="outlined"
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    required
                    sx={{ width: '92%', marginLeft: '20px' }}
                    // defaultValue={
                    //   selectedCell !== null
                    //     ? lapCat.categoryData[selectedCell].categoryName
                    //     : ''
                    // }
                  /> */}
                </FormControl>
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
                  Confirm Delete
                </Button>

                <Button
                //   type="button"
                  onClick={handleDeleteClose}
                  autoFocus
                  variant="solid"
                  sx={{
                    background: 'black',
                    color: 'white',
                    marginTop: '25px',
                    marginLeft: '10px',
                  }}
                >
                  Cancel
                </Button>
              </form>
            </div>
          </Sheet>
        </Modal>
  )
}

export default CategoryDelete