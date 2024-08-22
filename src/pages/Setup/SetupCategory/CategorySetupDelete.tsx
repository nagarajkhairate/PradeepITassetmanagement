import React from 'react'
import { Box, Button, FormControl, Modal, Sheet, Typography } from '@mui/joy'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCategory } from '../../../redux/features/CategorySlice'
import AppForm from '../../../components/Common/AppForm'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../redux/store'

interface CategoryDeleteProps {
  open: boolean
  handleDeleteClose: () => void
  categories: Category[]
}
type Category = {
  id: number
  categoryName: string
}

const CategoryDelete: React.FunctionComponent<CategoryDeleteProps> = ({
  open,
  handleDeleteClose,
  categories,
}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const selectedCell = 0

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCell !== null) {
      dispatch(deleteCategory(categories[selectedCell].id));
      handleDeleteClose()
    }
  }
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
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
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

          <AppForm onSubmit={handleDeleteSubmit}>
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
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { md: 'row' },
                justifyContent: { xs: 'space-between', md: 'flex-end' },
                gap: '5px',
                flexWrap: 'wrap',
              }}
            >
              <Button
                onClick={handleDeleteClose}
                autoFocus
                variant="solid"
                sx={{
                  background: 'black',
                  color: 'white',
                  '&:hover': { background: 'black' },
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
                Confirm Delete
              </Button>
            </Box>
          </AppForm>
        </div>
      </Sheet>
    </Modal>
  )
}

export default CategoryDelete
