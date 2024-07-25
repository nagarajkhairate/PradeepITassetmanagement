import { Box, Button, Checkbox, FormControl, FormLabel, Input, Modal, Option, Radio, RadioGroup, Select, Sheet, Stack, Table, Typography } from "@mui/joy";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ChangeEvent, useState } from "react";
import MaintenanceTable from "./MaintennaceFieldsAddingTable";
import DeleteDatabaseMaintenance from "./DeleteDataBaseMaintenance";
import EditModalMaintenance from "./EditModelCustomMaintenance";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
 

const BackendData = [
  {
    fieldName: 'string',
    componentsId: 'string',
    isRequired: 'string',
  },
]

const customMaintenance = [
  {
    fieldName: 'Full Name',
    name: 'fullName',
    componentsId: 'string',
    isRequired: 'string',
  },
]

interface Props {
  maintenanceDataBases: {
    customMaintenance: any[]
  }
  setMaintenanceDataBases: React.Dispatch<
    React.SetStateAction<{
      customMaintenance: any[]
    }>
  >
}
 
const EditDataBaseMaintenance: React.FC<Props>= ({ 
  maintenanceDataBases,
  setMaintenanceDataBases,
}: Props) =>{
 
  const [editOpen, setEditOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])
  const [deleteOpen, setDeleteOpen] = useState(false)
  const components = useSelector((state: RootState) => state.components.data)

  const [formData, setFormData] = useState({
    custom: '',
    componentsId: '',
    isRequired: '',
    selectedCategories: '',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target
    const val =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prevData) => ({ ...prevData, [name]: val }))
  }

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
    setFormData((prevData) => ({ ...prevData, componentsId: newValue || '' }))
  }

  const handleClickEditOpen = () => {
    setEditOpen(true)
  }
  const handleEdit = (index: number) => {
    setSelectedCell(index)
    const selectedData = maintenanceDataBases.customMaintenance[index]
    setFormData({
      custom: selectedData.fieldName,
      componentsId: selectedData.componentsId,
      isRequired: selectedData.isRequired,
      selectedCategories: '',
    })
    handleClickEditOpen()
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedCell(null)

    // console.log(JSON.stringify(editOpen))
  }

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { custom, componentsId, isRequired } = formData

    if (selectedCell !== null) {
      const updatedData = maintenanceDataBases.customMaintenance.map((item, index) =>
        index === selectedCell
          ? { ...item, fieldName: custom, componentsId, isRequired }
          : item,
      )
      setMaintenanceDataBases({ ...maintenanceDataBases, customMaintenance: updatedData })
      handleEditClose()
    }
  }

  const handleDeleteButton = (index: number) => {
    setSelectedCell(index)
    handleDeleteOpen()
  }

  const handleDeleteOpen = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
    setMatchedSelected([])
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleConfirmDelete = () => {
    setMaintenanceDataBases({
      ...maintenanceDataBases,
      customMaintenance: maintenanceDataBases.customMaintenance.filter(
        (_, index) => index !== selectedCell,
      ),
    })
    handleDeleteClose()
  }

    return(
        <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt:2,
                  overflowX: "auto",
                }}
              >
                <Box
              sx={{
                overflowX: 'auto',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                borderRadius:'5px'
              }}
            >
                   <MaintenanceTable
          maintenanceDataBases={maintenanceDataBases}
          handleEdit={handleEdit}
          handleDeleteButton={handleDeleteButton}
        />
                </Box>
 

                <Modal
                  open={editOpen}
                  onClose={handleEditClose}
                  aria-labelledby="responsive-dialog-title"
                  aria-describedby="modal-desc"
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                     <EditModalMaintenance
          formData={formData}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleEditButton={handleEditButton}
          handleRadioChange={handleRadioChange}
          handleEditClose={handleEditClose}
          components={components}
        />
                </Modal>

          

<DeleteDatabaseMaintenance
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={handleConfirmDelete}
      />
              </Stack>
    )
}
export default EditDataBaseMaintenance