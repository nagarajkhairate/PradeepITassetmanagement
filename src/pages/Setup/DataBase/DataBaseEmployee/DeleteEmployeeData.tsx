import { Box, Button, FormControl, Modal, Sheet, Typography } from "@mui/joy"
import { useState } from "react"

interface DeleteDataProps {
    selectedCell: number | null
    setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>
    matchedSelected: number[]
    setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>
}

const DeleteEmployeeData: React.FC<DeleteDataProps>= (
    {
        selectedCell,
        setSelectedCell,
        matchedSelected,
        setMatchedSelected,
    }
)=>{

    const [deleteOpen, setDeleteOpen] = useState(false)
  
    const [dataBases, setDataBases] = useState({
        customAsset: [],
      })
    

const deleteCustomField = (index: number) => {
    const updatedData = dataBases.customAsset.filter(
      (_, idx) => idx !== index,
    )
    setDataBases((prevData) => ({
      ...prevData,
      customAsset: updatedData,
    }))
  }

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedData = dataBases.customAsset.filter(
      (_, index) => index !== selectedCell,
    )
    // setDataBases((prevData) => ({ ...prevData, data: updatedData }));
    setDataBases({ ...dataBases, customAsset: updatedData })
    setMatchedSelected([])
    setDeleteOpen(false)
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  const handleDeleteButton = (index: number) => {
    setSelectedCell(index)
    handleDeleteOpen()
  }

return (
    
 
    <Modal
    open={deleteOpen}
    onClose={() => setDeleteOpen(false)}
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
mb={1}>
        {"Edit the Customs here"}
      </Typography>

      <form onSubmit={handleDeleteSubmit}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Box sx={{ marginBottom: "20px", padding: "20px" }}>
            Are you sure you want to delete this Field Data?
          </Box>
          
        </FormControl>
        <Button
autoFocus
type="submit"
variant="solid"
sx={{
  background: "#fdd835",
  color: "black",
  marginTop: "25px",
  marginLeft: "40%",
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
color: "white", marginTop: "25px", marginLeft: "10px" }}
>
Cancel
</Button>
      </form>
    </div>
    </Sheet>
  </Modal>
)
}
export default DeleteEmployeeData