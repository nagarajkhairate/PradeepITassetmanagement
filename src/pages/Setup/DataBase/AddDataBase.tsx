import React, { ChangeEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
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
} from "@mui/joy";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addDataBase } from "../../../Redux/features/DataBaseSlice";

interface DataAddProps {
  dataBases: { data: string[] };
  setDataBases: React.Dispatch<React.SetStateAction<{ data: any[] }>>;
  addCustomField: (custom: any) => void;
  deleteCustomField: (index: number) => void;
  id:number
}

const AddDataBase: React.FC<DataAddProps> = ({
  dataBases,
  setDataBases,
  addCustomField,
  deleteCustomField,
  id
}: DataAddProps) => {
  const [open, setOpen] = useState(false);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()

  const dataBase = useSelector((state: RootState) => state.dataBase.data)
  // const dispatch = useDispatch<AppDispatch>()
  console.log(dataBase)
  
  const [formData, setFormData] = useState({
  
    custom: "",
    dataType: "",
    selectedCategories: "",
    dataRequired: '',
    
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // addCustomField(formData);
    setDataBases((prevData:any) => ({
      ...prevData,
      data: [
        ...prevData.data,
        {
          fieldName: formData.custom,
          dataType: formData.dataType,
          category: formData.selectedCategories,
          required: formData.dataRequired,
        },
      ],
    }));
    dispatch(addDataBase(formData))
    handleClose();
    setFormData({
      custom: "",
      dataType: "",
      dataRequired: '',
      selectedCategories: "",
    });
  };

 
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value} = e.target;
    // const val =  value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setFormData((prevData) => ({ ...prevData, dataType: newValue || "" }));
  };

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
            onClick={handleClickOpen}
            sx={{
              marginTop: "25px",
              background: "green",
              color: "white",
              borderRadius:'15px',
            }}
          >
            <AddIcon />
            Add Custom Fields
          </Button>

          <Modal
            aria-labelledby="responsive-dialog-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={handleClose}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                maxWidth: 500,
                borderRadius: "md",
                p: 3,
                boxShadow: "lg",
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
                  {"Add Custom Fields here"}
                </Typography>

                <form onSubmit={handleAddSkill}>
                  <FormControl>
                    <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>
                      Custom Field Label*
                      <Input
                        variant="outlined"
                        type="text"
                        id="custom"
                        name="custom"
                        value={formData.custom}
                        onChange={handleChange}
                        required
                        sx={{ width: "43%", marginLeft: "10px" }}
                      />
                    </FormLabel>
                  </FormControl>

                  <FormControl>
                    <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>
                      Data Types*
                      <Select
                        placeholder="Select Data Types"
                        sx={{ width: "50%", marginLeft: "60px" }}
                        name="dataType"
                        value={formData.dataType}
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
                    <FormLabel sx={{ paddingTop: "30px", marginLeft: "20px" }}>
                      Data Required
                    </FormLabel>
                    <RadioGroup name="dataRequired" 
                    value={formData.dataRequired.toString()} onChange={handleChange}>
                      <Box>
                        <Radio
                          value="yes"
                          label="Yes"
                          variant="outlined"
                          sx={{ paddingTop: "30px", marginLeft: "50px" }}
                        />
                        <Radio
                          value="optional"
                          label="Optional"
                          variant="outlined"
                          sx={{ paddingTop: "30px", marginLeft: "10px" }}
                          
                        />
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
                              value="All Categories"
                              label="All Categories"
                              variant="outlined"
                              sx={{ paddingTop: "20px", marginLeft: "160px" }}
                            />
                            <Radio value="Limited Categories" label="Limited Categories" variant="outlined" sx={{ paddingTop: "30px", marginLeft: "20px" }}/>
                           
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
                    Save
                  </Button>

                  <Button
                    type="button"
                    onClick={handleClose}
                    autoFocus
                    variant="solid"
                    sx={{ background: "black", color: "white", marginLeft: "25px" }}
                  >
                    Cancel
                  </Button>
                </form>
              </div>
            </Sheet>
          </Modal>
          </Box>
 
  );
};

export default AddDataBase;




// import { Typography, Radio, RadioGroup, Divider, Grid } from "@mui/joy";
// import ButtonGroup from "@mui/joy/ButtonGroup";
// import React, { useState, useEffect } from "react";
// import { Box } from "@mui/joy";
// import Table from "@mui/joy/Table";
// import Checkbox from "@mui/joy/Checkbox";
// import Button from "@mui/joy/Button";
// import { FormControl } from "@mui/joy";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
// import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
// import AddDataBase from "./AddDataBase";
// import EditDataBase from "./EditDataBase";
// import AppView from "../../../components/Common/AppView";
// import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
// import { ThunkDispatch } from "redux-thunk";
// import { RootState } from "../../../Redux/store";
// import { useDispatch, useSelector } from "react-redux";


// const dataBaseTable = [
//   {

//     id: 1,
//     visible: true,
//     fieldName: "Asset Tag ID",
//     required: true,
//     description:
//       "This field holds the unique asset id number that your company assigns to identify each asset. These are generally sequentially numbered labels with barcodes.",
//     example: "A-1001",
//     name: "assetId",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//     ],
//   },
// {
//     id: 2,
//     visible: true,
//     fieldName: "Asset Description",
//     required: true,
//     description: "Description of the asset.",
//     example: "HP - Envy Desktop - 12GB Memory - 2TB Hard Drive",
//     name: "assetDec",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//     ],
//   },
// {
//     id: 3,
//     visible: true,
//     fieldName: "Purchase Date",
//     required: true,
//     description: "Date asset was purchased",
//     example: "08/22/2014",
//     name: "PurchasedDate",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//       {
//         id:2,
//         value:'no'
//       }
//     ],
//   },
// {
//     id: 4,
//     visible: true,
//     fieldName: "Cost",
//     required: false,
//     description: "Cost of the asset",
//     example: "Bs225.75",
//     name: "cost",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//       {
//         id:2,
//         value:'no'
//       }
//     ],
//   },

// {
//     id: 5,
//     visible: true,
//     fieldName: "Purchased From",
//     required: false,
//     description: "Vendor/Supplier name",
//     example: "Amazon",
//     name: "PurchasedForm",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//       {
//         id:2,
//         value:'no'
//       }
//     ],
//   },
// {
//     id: 6,
//     visible: true,
//     fieldName: "Brand",
//     required: false,
//     description: "Manufacturer of the asset",
//     example: "HP",
//     name: "brand",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//       {
//         id:2,
//         value:'no'
//       }
//     ],
//   },
// {
//     id: 7,
//     visible: true,
//     fieldName: "Model",
//     required: false,
//     description: "Model name of the asset",
//     example: "Envy",
//     name: "Model",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//       {
//         id:2,
//         value:'no'
//       }
//     ],
//   },
//  {
//     id: 8,
//     visible: true,
//     fieldName: "Serial No",
//     required: true,
//     description: "Manufacturer's serial number",
//     example: "HG9C3X",
//     name: "SerialNo",
//     option: [
//       {
//         id: 1,
//         value: "yes",
//       },
//       {
//         id:2,
//         value:'no'
//       }
//     ],
//   },

// ];


// const DataBases: React.FunctionComponent = (

// ) => {
//   const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
//   const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
//   const [dataBaseForm, setDataBaseForm] = useState<any>();
//   const [selectedCell, setSelectedCell] = useState<number | null>(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [deleteOpen, setDeleteOpen] = useState(false);
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
//   // const [eventForm, setEventForm] = useState<any>({})

//   const dataBase = useSelector((state: RootState) => state.dataBase.data)
//   // const dispatch = useDispatch<AppDispatch>()
//   console.log(dataBase)

//   // const addCustomField = (custom: string) => {
//   //   setDataBases((prevData) => ({
//   //     ...prevData,
//   //     data: [...prevData.data, custom],
//   //   }));
//   // };


//   // const deleteCustomField = (index: number) => {
//   //   const updatedData = dataBases.data.filter((_, idx) => idx !== index);
//   //   setDataBases((prevData) => ({ ...prevData, data: updatedData }));
//   // };

//   const handleClickEditOpen = () => {
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setSelectedCell(null);
//   };

//   // const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   const Custom = (e.target as HTMLFormElement).Custom.value;
//   //   if (selectedCell !== null) {
//   //     const updatedData = dataBases.data.map((item, index) =>
//   //       index === selectedCell ? Custom : item
//   //     );
//   //     setDataBases((prevData) => ({ ...prevData, data: updatedData }));
//   //     handleEditClose();
//   //   }
//   // };

//   const handleCheckboxChange = (index: number) => {
//     setMatchedSelected((prevSelected) =>
//       prevSelected.includes(index)
//         ? prevSelected.filter((item) => item !== index)
//         : [...prevSelected, index]
//     );
//     setSelectedCell(index);
//   };

//   const handleDeleteButton = () => {
//     if (selectedCell !== null) {
//       handleDeleteOpen();
//     }
//   };

//   // const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   //   e.preventDefault();
//   //   const updatedData = dataBases.data.filter(
//   //     (_, index) => index !== selectedCell
//   //   );
//   //   // setDataBases((prevData) => ({ ...prevData, data: updatedData }));
//   //   setDataBases({ ...dataBases, data: updatedData });
//   //   setMatchedSelected([]);
//   //   setDeleteOpen(false);
//   // };

//   const handleDeleteOpen = () => {
//     setDeleteOpen(true);
//   };

//   const handleDeleteClose = () => {
//     setDeleteOpen(false);
//     setMatchedSelected([]);
//   };

//   const handleEdit = () => {
//     if (selectedCell !== null) {
//       handleClickEditOpen();
//     }
//   };

//   const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     const formObject = {
//       visible: true,
//       fieldName: "sssssssssssssssss",
//       required: true,
//       description: "aaaaaaaaaaaaa",
//       [name]: value
//     }
//     setDataBaseForm((prevData) => ({
//       ...prevData,
//       formObject
//     }));
//   };


// // console.log(JSON.stringify(dataBases, null, 2))
// console.log(JSON.stringify(dataBaseForm))
//   return (
//     <AppView>
//       <Typography
//         level="h4"
//         sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//       >
//         <SignpostOutlinedIcon
//           style={{ fontSize: '1.4rem', color: '#d32f2f' }}
//         />
//         Database
//       </Typography>

//           <Box
//             sx={{
//               borderRadius: 'none',
//               boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//               background: '#ffffff',
//               gap: '5px',
//               p: 2,
//             }}
//           >
//             <Box 
//             sx={{
//               textAlign: { xs: 'center', md: 'left' },
//             }}
//             >
//             <Typography
//         level="h4"
//         sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
//       >
//        Asset Database Fields
//       </Typography>
//             </Box>
            
//             <Box sx={{
//               textAlign: { xs: 'center', md: 'left',  },
//             }}>
//               <Box
//               sx={{mt:3}}
//               >
//                 <Typography level="body-xs">
//                   Fill in the appropriate fields for your assets. Asset Tag ID
//                   and Asset Description are the only required fields. Check the
//                   boxes next to the field names you want to include.
//                 </Typography>
//               </Box>

//               <Box sx={{ mt: "10px", overflowX: "auto" }}>
//                 <Table borderAxis="both" >
//                   <thead>
//                     <tr>
//                       <th style={{ width: 30 }}>
//                         <Checkbox />
//                       </th>
//                       <th style={{ minWidth: 180 }}>Field Name</th>
//                       <th style={{ minWidth: 200 }}>Date Required</th>
//                       <th style={{ minWidth: 400 }}>Description</th>
//                       <th style={{ minWidth: 150 }}>Example</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {
//                   dataBaseTable.map((data, index) => (
//                         <tr key={index}>
//                           <td>
//                           <Checkbox checked={data.visible} onChange={() => handleCheckboxChange(index)} />
//                           </td>
//                           <td>{data.fieldName}</td>
//                           <td>
//                             {data.required}
//                             <FormControl>
//                               <RadioGroup
//                                 defaultValue="outlined"
//                                 name="radio-buttons-group"
//                               >
//                                 {data.option.map((opt:any) => (
//                                     <Radio
//                                       name={data.name}
//                                       onChange={HandleRadioSelect}
//                                       key={opt.id}
//                                       value={opt.value}
//                                       label={opt.value}
//                                       variant="outlined"
//                                     />
//                                   ))}
//                               </RadioGroup>
//                             </FormControl>
//                           </td>
//                           <td>{data.description}</td>
//                           <td>{data.example}</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </Table>
//                 <Divider sx={{ my: "30px" }}></Divider>
//               </Box>
//             </Box>

//             <b>Asset Custom Fields</b>
//             <Box sx={{ marginBottom: "2px" }}>
//               Add custom fields to join the standard fields that we provided.
//               Feel free to get creative.
//             </Box>

//             <Box>
//             {/* <AddDataBase
//   dataBases={dataBases} 
//   setDataBases={setDataBases} 
//   addCustomField={addCustomField}
//   deleteCustomField={deleteCustomField} 

// /> */}

//               {/* <EditDataBase
//                 matchedSelected={matchedSelected}
//                 setMatchedSelected={setMatchedSelected}
//                 dataBases={dataBases}
//                 setDataBases={setDataBases}
//                 editOpen={editOpen}
//                 setEditOpen={setEditOpen}
//                 deleteOpen={deleteOpen}
//                 setDeleteOpen={setDeleteOpen}
//                 selectedCell={selectedCell}
//                 setSelectedCell={setSelectedCell}
//                 handleCheckboxChange={handleCheckboxChange}
//                 handleEdit={handleEdit}
//                 handleEditButton={handleEditButton} 
//                 handleDeleteButton={handleDeleteButton} 
//                 handleDeleteSubmit={handleDeleteSubmit} 
//                 handleEditClose={handleEditClose} 
//                 handleDeleteOpen={handleDeleteOpen} 
//                 handleDeleteClose={handleDeleteClose}
//               /> */}
//             </Box>

//             <Divider sx={{ marginTop: "3%" }} />

//             <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               flexDirection: { md: 'row', xs: 'column' },
//               justifyContent: { xs: 'center', md: 'flex-end' },
//               gap: '5px',
//               mt:4
//             }}
//         >
         
//           <Button
//             variant="solid"
//             sx={{
//               background: '#388e3c',
//               color: 'white',
//               borderRadius:'15px'
//             }}
//             component="label"
//             // onClick={handlePrevTab}
//           >
//             <NavigateBeforeOutlinedIcon />
                
//                 Back
//           </Button>
//           <Button
//             variant="solid"
//             sx={{
//               background: "#fdd835",
//               color: 'white',
//               borderRadius:'15px'
//             }}
//             component="label"
//               // onClick={handleNextTab} 
//           >
//              Continue
//              <NavigateNextOutlinedIcon />{" "}
//           </Button>
//           </Box>
//           </Box>
//     </AppView>
//   );
// };

// export default DataBases;