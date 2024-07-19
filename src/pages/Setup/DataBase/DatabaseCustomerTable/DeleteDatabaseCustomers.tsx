import { Box, Button, FormControl, Modal, Sheet, Typography } from '@mui/joy'
import { useState } from 'react'
import AppForm from '../../../../components/Common/AppForm'

interface DeleteEmployeeDataProps {
  open: boolean;
  setOpen: (open: boolean) => void; 
  setCustomerDataBases:React.Dispatch<React.SetStateAction<any[]>>
  selectedItem: any;
}
const DeleteDatabaseCustomers: React.FC<DeleteEmployeeDataProps> = ({
  open, setOpen,setCustomerDataBases,selectedItem
}) => {


  const handleDelete = () => {
    // Filter out the selected item from the customerDataBases array
    setCustomerDataBases(prevData => prevData.filter(item => item !== selectedItem));
    setOpen(false); // Close the modal after deletion
  };

  const handleClose = () => {
    setOpen(false); // Just close the modal without deleting
  };

  return (
    <Modal
    open={open}
    onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      aria-describedby="modal-desc"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
            {'Edit the Customs here'}
          </Typography>

          <AppForm onSubmit={handleDelete}>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
              }}
            >
              <Box sx={{ marginBottom: '20px', padding: '20px' }}>
                Are you sure you want to delete this Field Data?
              </Box>
            </FormControl>

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
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: '#fdd835',
                '&:hover': { background: '#E1A91B' },
                color: 'black',
              }}
              onClick={handleDelete}
            >
              Confirm Delete
            </Button>

            <Button
              type="button"
               onClick={() => setOpen(false)}
              autoFocus
              variant="solid"
              sx={{
                background: 'black',
                '&:hover': { background: 'black' },
                color: 'white',
              }}
              
            >
              Cancel
            </Button>

           
            </Box>
          </AppForm>
        </div>
      </Sheet>
    </Modal>
  )
}
export default DeleteDatabaseCustomers
