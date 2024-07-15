import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Stack,
  Table,
  Typography,
} from '@mui/joy'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { ChangeEvent, useState } from 'react'
import AppForm from '../../../../components/Common/AppForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import DeleteDatabaseCustomers from './DeleteDatabaseCustomers'

const BackendData = [
  {
    fieldName: 'string',
    componentsId: 'string',
    isRequired: 'string',
  },
]

const customCustomer = [
  {
    fieldName: 'Full Name',
    name: 'fullName',
    componentsId: 'string',
    isRequired: 'string',
  },
]

interface Props {
  customerDataBases: {
    customCustomer: any[]
  }
  setEmpDataBases: React.Dispatch<
    React.SetStateAction<{
      customCustomer: any[]
    }>
  >
}

const EditDatabaseCustomer: React.FC<Props> = ({
  customerDataBases,
  setEmpDataBases,
}: Props) => {
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
    const selectedData = customerDataBases.customCustomer[index]
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
      const updatedData = customerDataBases.customCustomer.map((item, index) =>
        index === selectedCell
          ? { ...item, fieldName: custom, componentsId, isRequired }
          : item,
      )
      setEmpDataBases({ ...customerDataBases, customCustomer: updatedData })
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

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 2 }}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
        overflowX: 'auto',
      }}
    >
      <Box
        sx={{
          overflowX: 'auto',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          borderRadius: '5px',
        }}
      >
        <Table
          borderAxis="both"
          aria-label="basic table"
          style={{
            borderCollapse: 'collapse',
            border: '1px solid grey',
            minWidth: '500px',
            borderRadius: '5px',
          }}
        >
          <thead>
            <tr>
              <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                Field Name
              </th>
              <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                Data Type
              </th>
              <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                Required
              </th>
              <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                Edit
              </th>
              <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {customerDataBases.customCustomer.length > 0 ? (
              customerDataBases.customCustomer.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                      textAlign: 'left',
                    }}
                  >
                    {item.fieldName}
                  </td>
                  <td>{item.componentsId}</td>
                  <td>{item.isRequired}</td>
                  <td>
                    <Button
                      sx={{
                        fontSize: '13px',
                        background: '#ffffff',
                        color: 'green',
                        // display: 'inline-flex',
                        display: 'flex',
                        justifyContent: {
                          md: 'flex-end',
                          xs: 'center',
                        },
                        marginLeft: 'none',
                        border: '1px solid green ',
                        borderRadius: '10px',
                        '&:hover': {
                          color: 'white',
                          background: 'green',
                        },
                        padding: '.15rem .50rem',
                      }}
                      onClick={() => handleEdit(index)}
                    >
                      <EditOutlinedIcon sx={{ fontSize: '15px' }} />
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      sx={{
                        fontSize: '13px',
                        background: '#ffffff',
                        color: '#d32f2f',
                        // display: 'inline-flex',
                        display: 'flex',
                        justifyContent: { md: 'flex-end', xs: 'center' },

                        marginLeft: 'none',
                        border: '1px solid red ',
                        borderRadius: '10px',
                        '&:hover': {
                          color: 'white',
                          background: '#d32f2f',
                        },
                        padding: '.5rem .10rem',
                      }}
                      onClick={() => handleDeleteButton(index)}
                    >
                      <DeleteForeverIcon sx={{ fontSize: '15px' }} />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Box>

      <Modal
        open={editOpen}
        onClose={handleEditClose}
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
            <Typography
              id="responsive-dialog-title"
              component="h2"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {'Edit the Customs here'}
            </Typography>

            <AppForm onSubmit={handleEditButton}>
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
                  Custom Field Label*
                </FormLabel>
                <Input
                  variant="outlined"
                  type="text"
                  id="custom"
                  name="custom"
                  value={formData.custom}
                  onChange={handleChange}
                  required
                  sx={{ width: '70%', marginLeft: '10px' }}
                  //   defaultValue={
                  //     selectedCell !== null
                  //       ? dataBase.data[selectedCell]
                  //       : ""
                  //   }
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={{ paddingTop: '20px' }}>
                  Data Types*:
                  <Select
                    placeholder="Select Data Types"
                    sx={{ marginLeft: '40px' }}
                    name="componentsId"
                    value={formData.componentsId}
                    onChange={handleSelectChange}
                  >
                    {components &&
                      components.map((comp: any) => (
                        <Option key={comp.id} value={comp.id}>
                          {comp.compName}
                        </Option>
                      ))}
                  </Select>
                </FormLabel>
              </FormControl>

              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
                  {' '}
                  Data Required{' '}
                </FormLabel>
                <RadioGroup
                  name="isRequired"
                  value={formData.isRequired}
                  onChange={handleRadioChange}
                >
                  <Box>
                    <Radio
                      value="yes"
                      label="Yes"
                      variant="outlined"
                      sx={{ paddingTop: '30px', marginLeft: '50px' }}
                    />
                    <Radio
                      value="optional"
                      label="Optional"
                      variant="outlined"
                      sx={{ paddingTop: '30px', marginLeft: '10px' }}
                    />
                  </Box>
                </RadioGroup>
              </FormControl>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: { md: 'row' },
                  justifyContent: { xs: 'space-between', md: 'flex-end' },
                  gap: '5px',
                  mt: 4,
                  flexWrap: 'wrap',
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
                  Update
                </Button>

                <Button
                  type="button"
                  onClick={handleEditClose}
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

      <DeleteDatabaseCustomers
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={() => {
          setEmpDataBases({
            ...customerDataBases,
            customCustomer: customerDataBases.customCustomer.filter(
              (_, index) => index !== selectedCell,
            ),
          })
          handleDeleteClose()
        }}
      />
    </Stack>
  )
}
export default EditDatabaseCustomer
