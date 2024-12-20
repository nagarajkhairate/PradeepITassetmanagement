import { Box, Button, FormControl, Modal, Sheet, Typography } from "@mui/joy"
import { useState } from "react"
import AppForm from "../../../components/Common/AppForm";


interface Location {
    id: number;
    name: string;
  }

interface LocationDeleteProps {
    // locationName: Location[]
    // onLocationChange: (deletedData: Location[]) => void
    setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>
    setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>
    locDatas: { locationData: Location[] }
    setLocDatas: React.Dispatch<React.SetStateAction<{ locationData: Location[] }>>
    selectedCell: number | null;
    handleDeleteClose: () => void;
    open:boolean
  }

  

  const LocationDelete: React.FunctionComponent<LocationDeleteProps> = (
    { 
      open,  
      handleDeleteClose,
      selectedCell, 
        // onLocationChange, 
        setMatchedSelected, 
        setSelectedCell, 
       
        locDatas, setLocDatas }) => {
    
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

              <AppForm onSubmit={handleDeleteSubmit}>
                <FormControl
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Typography sx={{ marginBottom: '20px', padding: '20px' }}>
                    Are you sure you want to delete this Location?
                  </Typography>
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
                    background: '#fdd835',
                    '&:hover': { background: '#E1A91B' },
                    color: 'black',
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
export default LocationDelete