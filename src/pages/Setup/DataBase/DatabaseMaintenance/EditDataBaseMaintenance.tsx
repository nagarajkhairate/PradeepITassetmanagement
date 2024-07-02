import { Box, Button, Checkbox, FormControl, FormLabel, Input, Modal, Option, Radio, RadioGroup, Select, Sheet, Stack, Table, Typography } from "@mui/joy";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ChangeEvent, useState } from "react";
 

const initialDatabase = [
    {
     id:1,
      fieldName: "swde",
      componentsId: "wsedf",
      Category: "234frd",
      required: "swed",
    },
  ];

  const addCustomField = (custom: { 
    fieldName: string; 
    componentsId: string; 
    category: string; 
    required: string; 
  }) => {
    // Your implementation logic here
  };
  
   
  interface dataItem {
    id:1,
    fieldName: string;
    componentsId: string;
    category: string;
    required: boolean;
  }


 
interface DataProps {
    matchedSelected: number[];
    setMatchedSelected: React.Dispatch<React.SetStateAction<number[]>>;
    dataBases: { customAssetFields: dataItem[] };
    setDataBases: React.Dispatch<React.SetStateAction<{ customAssetFields: dataItem[] }>>;
    
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
 
 
 
const EditDataBaseMaintenance: React.FC<DataProps>= ({ matchedSelected,
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
 
    const [formData, setFormData] = useState({
        custom: "",
        componentsId: "",
        dataRequired: false,
        selectedCategories: "",
      });
    const [showDepreciationOptions, setShowDepreciationOptions] =useState<boolean>(false);
    const handleDepreciationChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setShowDepreciationOptions(value === "Yes");
      // setCompanyFormData((prevState: any) => ({ ...prevState, assetDepreciation: value }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData((prevData) => ({ ...prevData, [name]: val }));
      };

      const handleSelectChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null
      ) => {
        setFormData((prevData) => ({ ...prevData, componentsId: newValue || "" }));
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

    const custom = formData.custom;
    if (selectedCell !== null) {
        const updatedData = dataBases.customAssetFields.map((item, index) =>
            index === selectedCell ? { ...item, fieldName: custom } : item
        );
        setDataBases({ ...dataBases, customAssetFields: updatedData });
        handleEditClose();
    }
};

const handleDeleteButton = (index:number) => {
  setSelectedCell(index)
    handleDeleteOpen()
  
}


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
                <Table
                  borderAxis="both"
                  sx={{
                    mt:'10px'
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: 30,background: '#fff8e6',verticalAlign:'middle' }}>
                        <Checkbox
                          size="sm"
                          indeterminate={
                            matchedSelected.length > 0 &&
                            matchedSelected.length < dataBases.customAssetFields.length
                          }
                          checked={
                            matchedSelected.length > 0 &&
                            matchedSelected.length === dataBases.customAssetFields.length
                          }
                          onChange={(event) => {
                            const isChecked = event.target.checked;
                            setMatchedSelected(
                              isChecked
                                ? dataBases.customAssetFields.map((_, index) => index)
                                : []
                            );
                          }}
                          color={
                            matchedSelected.length > 0 &&
                            matchedSelected.length === dataBases.customAssetFields.length
                              ? "primary"
                              : undefined
                          }
                          sx={{ verticalAlign: "text-bottom" }}
                        />
                      </th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Field Name</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Data Type</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Required</th>
                      {/* <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Category</th> */}
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Edit</th>
                      <th style={{background: '#fff8e6',verticalAlign:'middle'}}>Delete</th>
 
                    </tr>
                  </thead>
                  <tbody>
                    {dataBases.customAssetFields.length > 0 ? (
                    dataBases.customAssetFields.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <Checkbox
                            checked={matchedSelected.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                            color="primary"
                          />
                        </td>
                        <td>{item.fieldName}</td>
                        <td>{item.componentsId}</td>
                        <td>{item.required}</td>
                        {/* <td>{item.category}</td> */}
                        <td>
                          <Button 
                          sx={{
                            background: '#ffffff',
                            color: 'green',
                            display: 'flex',
                            justifyContent: {md:'flex-start', xs:'center'},
                            marginLeft: 'none',
                            // border: '1px solid green ',
                            // borderRadius: '13px',
                            '&:hover': {
                              color: 'white',
                              background: 'green',
                              
                            },
                          }}
                          onClick={()=>handleEdit(index)}>
                            <EditOutlinedIcon />
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button 
                          sx={{
                            background: '#ffffff',
                            color: '#d32f2f',
                            display: 'flex',
                            justifyContent: {md:'flex-start',xs:'center'},
                            marginLeft: 'none',
                            // border: '1px solid red ',
                            // borderRadius: '13px',
                            '&:hover': {
                              color: 'white',
                              background: '#d32f2f',
                            },
                          }}
                          onClick={()=>handleDeleteButton(index)}>
                            <DeleteForeverIcon />
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
                          id="custom"
                          name="custom"
                          value={formData.custom}
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
                           name="selectedCategories" value={formData.selectedCategories.toString()}
                          
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
export default EditDataBaseMaintenance