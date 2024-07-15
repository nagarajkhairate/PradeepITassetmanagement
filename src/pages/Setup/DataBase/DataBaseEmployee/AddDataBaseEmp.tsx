import React, { ChangeEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box, Button, Modal, Typography } from '@mui/joy'
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import AddEmployeeData from './AddDialogEmployee'
import EditDataBaseEmp from './EditDataBaseEmp'


const AddDataBaseEmp: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [empDataBases, setEmpDataBases] = useState<{ customAsset:any[] }>({
    customAsset: [],
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddSkill = (formData:any) => {
    setEmpDataBases((prevData) => ({
      ...prevData,
      customAsset: [...prevData.customAsset, formData],
    }))
    handleClose()
    setOpen(false)
  }

  const handleCheckboxChange = (index: number) => {
    setEmpDataBases((prevData) => ({
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
          Persons/Employees Custom Fields
        </Typography>
        <Typography sx={{ marginTop: '10px' }}>
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
            onClose={() => setOpen(false)}
          >
            <AddEmployeeData
              open={open}
              setOpen={setOpen}
              empDataBases={empDataBases}
              handleAddSkill={handleAddSkill}
            />
          </Modal>
        )}
      </Box>

      <EditDataBaseEmp empDataBases={empDataBases} setEmpDataBases={setEmpDataBases} />
    </Box>
  )
}

export default AddDataBaseEmp
