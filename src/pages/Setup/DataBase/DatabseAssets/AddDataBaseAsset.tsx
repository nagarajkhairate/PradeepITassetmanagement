import React, { ChangeEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Box,Button, Modal,} from '@mui/joy'
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import AddDialogData from './AddDialogData'
import { RootState } from '../../../../redux/store'
import { fetchDefaultFields } from '../../../../redux/features/DefaultFieldAssetSlice'


interface DataAddProps {
  dataBases: { customAsset: string[] }
  setDataBases: React.Dispatch<React.SetStateAction<{ customAsset: any[] }>>
  addCustomField: (fieldName: any) => void
  deleteCustomField: (index: number) => void
  id: number
}

const AddDataBaseAsset: React.FC<DataAddProps> = ({
  dataBases,
  setDataBases,
  id,
}: DataAddProps) => {
  const [open, setOpen] = useState(false)
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const dataBase = useSelector((state: RootState) => state.defaultFields.data)
  console.log(dataBase)

  // React.useEffect(() => {
  //   dispatch(fetchDefaultFields())
  // }, [])

  return (
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
          <AddDialogData
            open={open}
            setOpen={setOpen}
            dataBases={dataBases}
            setDataBases={setDataBases}
          />
        </Modal>
      )}
    </Box>
  )
}

export default AddDataBaseAsset
