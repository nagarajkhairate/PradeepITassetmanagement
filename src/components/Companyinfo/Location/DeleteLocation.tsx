import { Box, Button, FormControl, Modal, Sheet, Typography } from "@mui/joy"
import { useState } from "react"


interface Location {
    id: number;
    name: string;
  }

interface LocationDeleteProps {
    setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>
    setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>
    locDatas: { locationData: Location[] }
    setLocDatas: React.Dispatch<React.SetStateAction<{ locationData: Location[] }>>
    selectedCell: number | null;
    handleDeleteClose: () => void;
    open:boolean
  }


  const DeleteLocation: React.FunctionComponent<LocationDeleteProps> = (
    { 
      open,
      handleDeleteClose,
        selectedCell, 
        setMatchedSelected, 
        setSelectedCell, 
        locDatas, setLocDatas }) => {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

   
      const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const deleteData = locDatas.locationData.filter(
          (_, index) => index !== selectedCell,
        )
        setLocDatas({ ...locDatas, locationData: deleteData })
        setMatchedSelected([])
        handleDeleteClose()
      }

      return(
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
                    Are you sure you want to delete this Location?
                  </Box>
                </FormControl>
                <Button
                  autoFocus
                  type="submit"
                  variant="solid"
                  sx={{
                    background: '#fdd835',
                    color: 'black',
                    // marginTop: '25px',
                    marginLeft: '40%',
                  }}
                >
                  Confirm Delete
                </Button>

                <Button
                  type="button"
                  onClick={handleDeleteClose}
                  autoFocus
                  variant="solid"
                  sx={{
                    background: 'black',
                    color: 'white',
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
export default DeleteLocation