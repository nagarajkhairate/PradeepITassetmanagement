import React, { ChangeEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Typography,
} from '@mui/joy'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import AddMaintenanceData from './AddDialogMaintenance'
import EditDataBaseMaintenance from './EditDataBaseMaintenance'


const AddDataBaseMaintenance: React.FC = () => {
  const [open, setOpen] = useState(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [maintenanceDataBases, setMaintenanceDataBases] = useState<{ customMaintenance:any[] }>({
    customMaintenance: [],
  })


  const handleClose = () => {
    setOpen(false)
  }

  const handleAddSkill = (formData:any) => {
    setMaintenanceDataBases((prevData) => ({
      ...prevData,
      customMaintenance: [...prevData.customMaintenance, formData],
    }))
    handleClose()
    setOpen(false)
  }

  const handleCheckboxChange = (index: number) => {
    setMaintenanceDataBases((prevData) => ({
      ...prevData,
    }))
  }


  return (
    <Box>
      <Box>
      <Typography
    level="h4"
    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
  >
    <SignpostOutlinedIcon
      style={{ fontSize: '1.4rem', color: '#FBC21E' }}
    />
    Maintenance Custom Fields
  </Typography>
  <Typography
  sx={{marginTop:'10px'}}
  >
    Add custom fields to join the standard fields that we provided.
  </Typography>
  </Box>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: { md: 'row', xs: 'column' },
        justifyContent: { xs: 'center', md: 'space-between' },
        gap: '5px',
      }}
    >
      <Button
        onClick={() => setOpen(true)}
        sx={{
          marginTop: '15px',
          background: 'green',
          color: 'white',
          '&:hover': { background: '#1b5e20' },
          borderRadius: '15px',
        }}
      >
        <AddIcon />
        Add Custom Fields
      </Button>

      {open && (
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
          <AddMaintenanceData
            open={open}
            setOpen={setOpen}
            maintenanceDataBases={maintenanceDataBases}
              handleAddSkill={handleAddSkill}
          />
        </Modal>
      )}
    </Box>

    <EditDataBaseMaintenance maintenanceDataBases={maintenanceDataBases} setMaintenanceDataBases={setMaintenanceDataBases} />

    </Box>
  )
}

export default AddDataBaseMaintenance
