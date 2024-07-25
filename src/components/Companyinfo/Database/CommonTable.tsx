import { Box, Button, Table } from '@mui/joy'
import React, { FunctionComponent, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditCustomAssetField from './EditCustomAssetField'

interface CommonTableProps {
    customAssetFields: any,
}

const CommonTable: FunctionComponent<CommonTableProps> = ({ customAssetFields }) => {
    const [openAddAsset, setOpenAddAsset] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleEdit = (item: any) => {
        setSelectedItem(item);
        setOpenAddAsset(true);
    }

    const handleDeleteButton = () => {
        // Add your delete logic here
    }

    console.log(JSON.stringify(customAssetFields))

    return (
        <Box>
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
                    {customAssetFields.length > 0 ? (
                        customAssetFields.map((item: any, index: number) => (
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
                                        onClick={handleDeleteButton}
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
            {openAddAsset && 
                <EditCustomAssetField
                    open={openAddAsset}
                    setOpen={setOpenAddAsset}
                    selectedItem={selectedItem}
                />
            }
        </Box>
    )
}

export default React.memo(CommonTable)
