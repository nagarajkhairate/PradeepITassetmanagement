import { Box, Button, Table } from '@mui/joy'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useState } from 'react'
import EditModalEmployee from './EditModalDatabaseEmployee'
import EditModalDatabaseEmployee from './EditModalDatabaseEmployee'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'

interface EmployeeTableProps {
  empDataBases: any[]
}

const EmployeeFieldsAddingTable: React.FC<EmployeeTableProps> = ({
  empDataBases,
}) => {
  console.log(empDataBases)
  const [openAddEmployee, setOpenAddEmployee] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const components = useSelector((state: RootState) => state.components.data)

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setOpenAddEmployee(true)
  }

  const handleDeleteButton = () => {
    // Add your delete logic here
  }

  return (
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
          {empDataBases.length > 0 ? (
            empDataBases.map((item, index) => (
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
                <td>{item.componentsId.title}</td>
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
                    onClick={() => handleEdit(item)}
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
                    onClick={() => handleDeleteButton}
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

      {openAddEmployee && (
        <EditModalDatabaseEmployee
          open={openAddEmployee}
          setOpen={setOpenAddEmployee}
          selectedItem={selectedItem}
        />
      )}
    </Box>
  )
}
export default EmployeeFieldsAddingTable
