import { Box, Button, Table } from '@mui/joy'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useState } from 'react'
import EditModalDatabaseWarranties from './EditModalCustomWarranties'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import EditModalCustomWarranties from './EditModalCustomWarranties'
import { ThunkDispatch } from 'redux-thunk'
import { deleteWarrantiesCustomDatabase } from '../../../../redux/features/WarrantiesCustomDatabaseSlice'

interface WarrantyTableProps {
  warrantyDataBases: any[]
}

const WarrantyFieldsAddingTable: React.FC<WarrantyTableProps> = ({
  warrantyDataBases,
}) => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const components = useSelector((state: RootState) => state.components.data)
  const [openAddWarranties, setOpenAddWarranties] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDelete, setIsDelete]=useState(false)

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setOpenAddWarranties(true)
  }

  const handleDeleteButton = (item:any) => {
    setIsDelete(true)
    dispatch(deleteWarrantiesCustomDatabase(item.id))
  }

  return (
    <Box
      sx={{
        overflowX: 'auto',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        borderRadius: '5px',
        mt:2
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
          {warrantyDataBases.length > 0 ? (
            warrantyDataBases.map((item, index) => (
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
                      padding: '.5rem .55rem',
                    }}
                    onClick={()=>handleDeleteButton(item)}
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
      {openAddWarranties && (
        <EditModalCustomWarranties
          open={openAddWarranties}
          setOpen={setOpenAddWarranties}
          selectedItem={selectedItem}
        />
      )}
    </Box>
  )
}

export default WarrantyFieldsAddingTable
