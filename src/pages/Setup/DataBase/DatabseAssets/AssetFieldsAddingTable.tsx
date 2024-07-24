import { Box, Button, Table } from "@mui/joy"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import React, { useState } from "react"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from "../../../../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { deleteCustomerCustomDatabase } from "../../../../redux/features/CustomerCustomDatabaseSlice"
import EditModalDatabaseAsset from "./EditModalDatabaseAsset"
import { deleteAssetCustomDatabase } from "../../../../redux/features/AssetCustomDatabaseSlice"
import DeleteDatabaseAsset from "./DeleteDatabaseAsset"


interface AssetTableProps {
    assetDataForm: any[]
    // setCustomerDataBases:React.Dispatch<React.SetStateAction<any[]>>
  }

  const AssetFieldsAddingTable: React.FC<AssetTableProps> = ({assetDataForm,
  }) => {
    const [openAddAsset, setOpenAddAsset] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const [selectedCell, setSelectedCell] = useState<any | null>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const components = useSelector((state: RootState) => state.components.data)
const category=useSelector((state:RootState) => state.category.data)
    const handleEdit = (item: any) => {
      setSelectedItem(item)
      setOpenAddAsset(true)
    }
  
    const handleDeleteOpen = (item: any) => {
      setSelectedCell(item);
      setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
      setDeleteOpen(false);
      setSelectedCell(null);
      
  };

  const handleDeleteConfirm = () => {
      if (selectedCell) {
        console.log(`Deleting item with id: ${selectedCell.id}`);
          dispatch(deleteAssetCustomDatabase(selectedCell.id));
      }
      handleDeleteClose();
  };


  
    return (
      <Box
        sx={{
          overflowX: 'auto',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          borderRadius: '8px',
          marginTop:'10px'
        }}
      >
        <Table
        borderAxis="both"
        aria-label="basic table"
        style={{
          borderCollapse: 'collapse',
          border: '1px solid grey',
          minWidth: '600px',
          borderRadius: '10px',
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
            <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Category</th>
            <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
              Edit
            </th>
            <th style={{ background: '#fff8e6', verticalAlign: 'middle' }}>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {assetDataForm.length > 0 ? (
            assetDataForm.map((item, index) => (
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
                <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>

                {item.categoryId.categoryName}
                </td>

                
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
                    onClick={()=>handleDeleteOpen(item)}
                  >
                    <DeleteForeverIcon sx={{ fontSize: '15px' }} />
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {openAddAsset && (
        <EditModalDatabaseAsset
          open={openAddAsset}
          setOpen={setOpenAddAsset}
          selectedItem={selectedItem}
        />
      )}

   {deleteOpen && (
    <DeleteDatabaseAsset
        open={deleteOpen}
        onClose={handleDeleteClose}
        onDelete={handleDeleteConfirm}
    />
)}
      </Box>
    )
}

export default AssetFieldsAddingTable