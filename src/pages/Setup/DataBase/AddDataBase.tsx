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
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch, useSelector } from 'react-redux'
import {
  addDataBase,
  fetchDataBase,
} from '../../../Redux/features/DataBaseSlice'
import AddDialogData from './AddDialogData'
import { RootState } from '../../../redux/store'

interface DataAddProps {
  dataBases: { customAssetFields: string[] }
  setDataBases: React.Dispatch<React.SetStateAction<{ customAssetFields: any[] }>>
  addCustomField: (custom: any) => void
  deleteCustomField: (index: number) => void
  id: number
}

const AddDataBase: React.FC<DataAddProps> = ({
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

  // const [formData, setFormData] = useState({
  //   custom: '',
  //   componentsId: '',
  //   selectedCategories: '',
  //   dataRequired: '',
  // })

  React.useEffect(() => {
    dispatch(fetchDataBase())
  }, [])

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // addCustomField(formData);
  //   setDataBases((prevData:any) => ({
  //     ...prevData,
  //     data: [
  //       ...prevData.data,
  //       {
  //         fieldName: formData.custom,
  //         dataType: formData.dataType,
  //         category: formData.selectedCategories,
  //         required: formData.dataRequired,
  //       },
  //     ],
  //   }));
  //   dispatch(addDataBase(formData))
  //   handleClose();
  //   setFormData({
  //     custom: "",
  //     dataType: "",
  //     dataRequired: '',
  //     selectedCategories: "",
  //   });
  // };

  // const [showDepreciationOptions, setShowDepreciationOptions] =useState<boolean>(false);
  // const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setShowDepreciationOptions(value === "Yes");
  //   // setCompanyFormData((prevState: any) => ({ ...prevState, assetDepreciation: value }));
  // };

  // console.log(JSON.stringify(formData))
  // console.log("tableAdd:", formData);

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
          marginTop: '25px',
          background: 'green',
          color: 'white',
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

export default AddDataBase
