

import { Box, Button, FormControl, FormLabel, Input, Modal, Option, Radio, RadioGroup, Select, Sheet, Stack, Table, Typography } from "@mui/joy";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchComponents } from "../../../../redux/features/ComponentsIdSlice";
import { ThunkDispatch } from "redux-thunk";
import { addDefaultFields, updateDefaultFieldsById } from "../../../../redux/features/AssetCustomDatabaseSlice";
  
   
  interface dataItem {
    id:1,
    fieldName: string;
    componentsId: number;
    categoryId: number;
    isRequired: boolean;
  }


 
interface DataProps {
    matchedSelected: number[];
    setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>;
    dataBases: { customAsset: dataItem[] };
    setDataBases: React.Dispatch<React.SetStateAction<{ customAsset: dataItem[] }>>;
    
    editOpen: boolean;
    setEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deleteOpen: boolean;
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCell: number | null;
    setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
    handleCheckboxChange: (index: number) => void;
    handleEditButton: (e: React.FormEvent<HTMLFormElement>) => void;
    handleDeleteSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleEditClose: () => void;
    handleDeleteOpen: () => void;
    handleDeleteClose: () => void;
  }
 
 
const categoryOptions = [
  { label: "Category 1", value: "Category1" },
  { label: "Category 2", value: "Category2" },
  { label: "Category 3", value: "Category3" },
];
 
const EditDataBaseAsset: React.FC<DataProps>= ({ matchedSelected,
    setMatchedSelected,
    dataBases,
    setDataBases,
    editOpen,
    setEditOpen,
    deleteOpen,
    setDeleteOpen,
    selectedCell,
    setSelectedCell,
    handleCheckboxChange,
    // handleEditButton,

    handleDeleteSubmit,
    // handleEditClose,
    handleDeleteOpen,
    handleDeleteClose,
  }: DataProps)=>{
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    const [formData, setFormData] = useState({
        fieldName: "",
        componentsId: 0,
        dataRequired: false,
        categoryId: 0,
      });
 
    const components = useSelector((state: RootState) => state.components.data)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        const categoryIdValue = name === 'categoryId' ? parseInt(value, 10) : value;
        setFormData((prevData) => ({ ...prevData, [name]: categoryIdValue }));
      };

      const handleSelectChange = (event: ChangeEvent<{ value: unknown }>) => {
        const newValue = event.target.value as string;
        setFormData((prevData:any) => ({
          ...prevData,
          componentsId: newValue ? parseInt(newValue, 10) : 0
        }));
      };

      const handleClickEditOpen = () => {
        setEditOpen(true);
        
      };
      const handleEdit = (index:number) => {
        setSelectedCell(index)
          handleClickEditOpen()
        
      }
    
      const handleEditClose = () => {
        setEditOpen(false);
        setSelectedCell(null);
    
        // console.log(JSON.stringify(editOpen))
      };
      const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const fieldName = formData.fieldName;
    if (selectedCell !== null) {
        const updatedData = dataBases.customAsset.map((item, index) =>
            index === selectedCell ? { ...item, ...formData } : item
        );
        setDataBases({ ...dataBases, customAsset: updatedData });
        dispatch(updateDefaultFieldsById(updatedData)); 
        handleEditClose();
    }
};

const handleDeleteButton = (index:number) => {
  setSelectedCell(index)
    handleDeleteOpen()
  
}

  useEffect(() => {
    dispatch(fetchComponents())
  }, [dispatch])


    return(
        <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 2, md: 2 }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt:2,
                  overflowX: "auto",
                }}
              >
                 <Box
              sx={{
                overflowX: 'auto',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                borderRadius:'5px'
              }}
            >
                 <Table 
        borderAxis="both" aria-label="basic table" 
        style={{
                  borderCollapse: 'collapse',
                  border: '1px solid grey',
                  minWidth: '500px',
                  borderRadius:'5px'
                }}>
                  <thead>
                    <tr>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Field Name</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Data Type</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Required</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Category</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Edit</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Delete</th>
 
                    </tr>
                  </thead>
                  <tbody>
                    {dataBases.customAsset.length > 0 ? (
                    dataBases.customAsset.map((item, index) => (
                      <tr key={index}>
                        <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{item.fieldName}</td>
                        <td>{components.find((component) => component.id === item.componentsId)?.type || ''}</td>
                        <td>{item.isRequired}</td>
                        <td style={{ wordBreak: 'break-word', whiteSpace: 'normal', textAlign: 'left' }}>{item.categoryId === 0 ? 'All Categories' : 'Limited Categories'}</td>
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
                              xs:'center'
                            },
                            marginLeft: 'none',
                            border: '1px solid green ',
                            borderRadius: '10px',
                            '&:hover': {
                              color: 'white',
                              background: 'green',
                            },
                            padding: ".15rem .50rem"
                          }}
                          onClick={()=>handleEdit(index)}>
                            <EditOutlinedIcon sx={{ fontSize: '15px' }}/>
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
                            padding: ".5rem .10rem"
                          }}
                          onClick={()=>handleDeleteButton(index)}>
                            <DeleteForeverIcon sx={{ fontSize: '15px' }}/>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ):(
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
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
                    <Typography id="responsive-dialog-title" component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>
                      {"Edit the Customs here"}
                    </Typography>
 
                    <form onSubmit={handleEditButton}>
                     
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <FormLabel
                          sx={{ paddingTop: "30px", marginLeft: "20px" }}
                        >
                          Custom Field Label*
                        </FormLabel>
                        <Input
                          variant="outlined"
                          type="text"
                          id="fieldName"
                          name="fieldName"
                          value={formData.fieldName}
                        onChange={handleChange}
                          required
                          sx={{ width: "70%", marginLeft: "10px" }}
                        //   defaultValue={
                        //     selectedCell !== null
                        //       ? dataBase.data[selectedCell]
                        //       : ""
                        //   }
                        />
                      </FormControl>
 
                      <FormControl>
                            <FormLabel
                              sx={{ paddingTop: "30px", marginLeft: "20px" }}
                            >
                              Data Types*
                           
                            <Select placeholder="Select Data Types"
                            sx={{ width: "50%", marginLeft: "60px" }}
                            value={formData.componentsId}
                        onChange={(e)=>handleSelectChange}
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
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                         
                          <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}> Data Required </FormLabel>
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
                              sx={{ paddingTop: "30px", marginLeft: "50px" }}
                            />
                            <Radio value="No" label="No" variant="outlined" sx={{ paddingTop: "30px", marginLeft: "10px" }}/>
                          </Box>
                          </RadioGroup>
                          </FormControl>
 
                          <Box>
                          <FormLabel sx={{ paddingTop: "40px", marginLeft: "20px" }}> Selected Categories</FormLabel>
                          <FormLabel sx={{ marginLeft: "165px", paddingBottom:'30px' }}> Is this field visible to assets of selective 'Categories'?</FormLabel>
                          <RadioGroup
                           name="categoryId" 
                           value={formData.categoryId}
                          
                          onChange={handleChange}
                        >
                          <Box>
                            <Radio
                              value="Yes"
                              label="All Categories"
                              variant="outlined"
                              sx={{ paddingTop: "20px", marginLeft: "160px" }}
                            />
                            <Radio value="No" label="Limited Categories" variant="outlined" sx={{ paddingTop: "30px", marginLeft: "20px" }}/>
                           
                          </Box>
                          </RadioGroup>
                        </Box>
 
 
 
 
                      <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "30%",
              }}
            >
              Update
            </Button>
 
            <Button
              type="button"
              onClick={handleEditClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginLeft: "50px" }}
            >
              Cancel
            </Button>
                    </form>
                  </div>
                  </Sheet>
                </Modal>
 
                <Modal
                  open={deleteOpen}
                  onClose={() => setDeleteOpen(false)}
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
                    <Typography id="responsive-dialog-title" component="h2"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}>
                      {"Edit the Customs here"}
                    </Typography>
 
                    <form onSubmit={handleDeleteSubmit}>
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Box sx={{ marginBottom: "20px", padding: "20px" }}>
                          Are you sure you want to delete this Field Data?
                        </Box>
                        
                      </FormControl>
                      <Button
              autoFocus
              type="submit"
              variant="solid"
              sx={{
                background: "#fdd835",
                color: "black",
                marginTop: "25px",
                marginLeft: "40%",
              }}
            >
              Confirm Delete
            </Button>
 
            <Button
              type="button"
              onClick={handleDeleteClose}
              autoFocus
              variant="solid"
              sx={{ background: "black",
              color: "white", marginTop: "25px", marginLeft: "10px" }}
            >
              Cancel
            </Button>
                    </form>
                  </div>
                  </Sheet>
                </Modal>
              </Stack>
    )
}
export default EditDataBaseAsset;





