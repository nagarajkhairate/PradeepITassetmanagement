import { Box, Button, FormControl, Modal, Sheet, Typography } from "@mui/joy"
import { useDispatch } from "react-redux";
import AppForm from "../../../components/Common/AppForm";


interface SetupDeleteDeptProps{
    open:boolean
    handleDeleteClose:() => void
    // handleDeleteSubmit:(e: React.FormEvent<HTMLFormElement>) => void
}


const SetupDeleteDept: React.FunctionComponent<SetupDeleteDeptProps> = ({open, handleDeleteClose, }) => {

  const dispatch = useDispatch();
  const selectedCell = 0; 

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCell !== null) {
      // dispatch(deleteCategory(categories[selectedCell].id));
      handleDeleteClose();
    }
  };

  return(

<Modal
          
          open={open}
          onClose={handleDeleteClose}
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
          <Typography id="responsive-dialog-title" component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>{"Delete Customs here"}</Typography>

          <AppForm onSubmit={handleDeleteSubmit}>
            <FormControl sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
              <Box sx={{ marginBottom: "20px", padding: "20px" }}>Are you sure you want to delete this Department?</Box>
              {/* <Input
                variant="outlined"
                type="text"
                id="departmentName"
                name="departmentName"
                required
                sx={{ width: "92%", marginLeft: "20px" }}
                // defaultValue={selectedCell !== null ? depart.data[selectedCell].departmentName : ""} // Set default value to the selected cell content
              /> */}
            </FormControl>

            <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { md: 'row'},
            justifyContent: { xs: 'space-between', md: 'flex-end' },
            gap: '5px',
            flexWrap:'wrap'
          }}
        >
            <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                '&:hover': { background: '#E1A91B' },
                color: "black",
              }}
            >
              Confirm Delete
            </Button>

            <Button
              type="button"
              onClick={handleDeleteClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white",  '&:hover': { background: 'black' }, }}
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
export default SetupDeleteDept