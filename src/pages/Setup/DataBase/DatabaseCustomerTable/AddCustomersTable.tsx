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
import { fetchDataBase } from '../../../../Redux/features/DataBaseSlice'
import { RootState } from '../../../../redux/store'
import AddDialogCustomer from './AddDialogCustomer'

interface DataAddProps {
  dataBases: { customAsset: string[] }
  setDataBases: React.Dispatch<React.SetStateAction<{ customAsset: any[] }>>
  addCustomField: (custom: any) => void
  deleteCustomField: (index: number) => void
  id: number
}

const AddCustomersTable: React.FC<DataAddProps> = ({
  dataBases,
  setDataBases,
  addCustomField,
  deleteCustomField,
  id,
}: DataAddProps) => {
  const [open, setOpen] = useState(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const dataBase = useSelector((state: RootState) => state.dataBase.data)
  console.log(dataBase)

  React.useEffect(() => {
    dispatch(fetchDataBase())
  }, [])

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
          Customers Custom Fields
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
            
            background: '#ffffff',
            color: 'green',
            border: '1px solid green ',
            '&:hover': {
              color: 'white',
              background: 'green',
            },
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
            <AddDialogCustomer
              open={open}
              setOpen={setOpen}
              dataBases={dataBases}
              setDataBases={setDataBases}
            />
          </Modal>
        )}
      </Box>
    </Box>
  )
}

export default AddCustomersTable
