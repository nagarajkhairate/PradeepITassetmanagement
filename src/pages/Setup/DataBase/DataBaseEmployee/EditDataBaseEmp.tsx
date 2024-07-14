import {
  Box,
  Button,
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
import DeleteEmployeeData from './DeleteEmployeeData'

interface DataItem {
  id: number
  fieldName: string
  componentsId: string
  category: string
  isRequired: string
}

interface Props {
  dataBases: {
    customAsset: DataItem[];
  };
  setDataBases: React.Dispatch<
    React.SetStateAction<{
      customAsset: DataItem[];
    }>
  >;
}

const EditDataBaseEmp: React.FC<Props> = ({
  dataBases,
  setDataBases,
}: Props) => {
  const [editOpen, setEditOpen] = useState(false)
  const [selectedCell, setSelectedCell] = useState<number | null>(null)
  const [matchedSelected, setMatchedSelected] = useState<number[]>([])

  const [formData, setFormData] = useState({
    custom: '',
    componentsId: '',
    dataRequired: false,
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
    handleClickEditOpen()
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setSelectedCell(null)

    // console.log(JSON.stringify(editOpen))
  }
  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const custom = formData.custom
    if (selectedCell !== null) {
      const updatedData = dataBases.customAsset.map((item, index) =>
        index === selectedCell ? { ...item, fieldName: custom } : item,
      )
      setDataBases({ ...dataBases, customAsset: updatedData })
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

  const [deleteOpen, setDeleteOpen] = useState(false)

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
            {dataBases.customAsset.length > 0 ? (
              dataBases.customAsset.map((item, index) => (
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
                  {/* <td>{item.category}</td> */}
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

            <form onSubmit={handleEditButton}>
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
                <FormLabel sx={{ paddingTop: '30px', marginLeft: '20px' }}>
                  Data Types*
                  <Select
                    placeholder="Select Data Types"
                    sx={{ width: '50%', marginLeft: '60px' }}
                    value={formData.componentsId}
                    onChange={handleSelectChange}
                  >
                    <Option value="checkbox List">Checkbox List</Option>
                    <Option value="Currency">Currency</Option>
                    <Option value="Date">Date</Option>
                    <Option value="Memo">Memo</Option>
                    <Option value="Email">Email</Option>
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
                  name="dataRequired"
                  value={formData.dataRequired.toString()}
                  onChange={handleChange}
                >
                  <Box>
                    <Radio
                      value="Yes"
                      label="true"
                      variant="outlined"
                      sx={{ paddingTop: '30px', marginLeft: '50px' }}
                    />
                    <Radio
                      value="No"
                      label="No"
                      variant="outlined"
                      sx={{ paddingTop: '30px', marginLeft: '10px' }}
                    />
                  </Box>
                </RadioGroup>
              </FormControl>

              <Box>
                <FormLabel sx={{ paddingTop: '40px', marginLeft: '20px' }}>
                  {' '}
                  Selected Categories
                </FormLabel>
                <FormLabel sx={{ marginLeft: '165px', paddingBottom: '30px' }}>
                  {' '}
                  Is this field visible to assets of selective 'Categories'?
                </FormLabel>
                <RadioGroup
                  name="selectedCategories"
                  value={formData.selectedCategories.toString()}
                  onChange={handleChange}
                >
                  <Box>
                    <Radio
                      value="Yes"
                      label="All Categories"
                      variant="outlined"
                      sx={{ paddingTop: '20px', marginLeft: '160px' }}
                    />
                    <Radio
                      value="No"
                      label="Limited Categories"
                      variant="outlined"
                      sx={{ paddingTop: '30px', marginLeft: '20px' }}
                    />
                  </Box>
                </RadioGroup>
              </Box>

              <Button
                autoFocus
                type="submit"
                variant="solid"
                sx={{
                  background: '#fdd835',
                  color: 'black',
                  marginTop: '25px',
                  marginLeft: '30%',
                }}
              >
                Update
              </Button>

              <Button
                type="button"
                onClick={handleEditClose}
                autoFocus
                variant="solid"
                sx={{ background: 'black', color: 'white', marginLeft: '50px' }}
              >
                Cancel
              </Button>
            </form>
          </div>
        </Sheet>
      </Modal>

      <DeleteEmployeeData
        selectedCell={selectedCell}
        setSelectedCell={setSelectedCell}
        matchedSelected={matchedSelected}
        setMatchedSelected={setMatchedSelected}
      />
    </Stack>
  )
}
export default EditDataBaseEmp
