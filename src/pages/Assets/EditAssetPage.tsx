// import React, { ReactNode, useState ,useEffect} from "react";
// import {
//   Typography,
//   Box,
//   Grid,
//   Input as MuiInput,
//   Button,
//   selectClasses,
//   Select as MuiSelect,
//   Option,
// } from "@mui/joy";
// import { InputProps } from "@mui/joy";
// import { IoIosArrowDown } from "react-icons/io";
// import { FaPlus } from "react-icons/fa";
// import { IoCloudUploadSharp } from "react-icons/io5";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux/store";
// import { ThunkDispatch } from "@reduxjs/toolkit";

// import SiteDialog from "../../components/AssetSections/EditAsset/AddAssetSection/SiteDialog";
// import CategoryDialog from "../../components/AssetSections/EditAsset/AddAssetSection/CategoryDialog";
// import DepartmentDialog from "../../components/AssetSections/EditAsset/AddAssetSection/DepartmentDialog";
// import LocationDialog from "../../components/AssetSections/EditAsset/AddAssetSection/LocationDialog";
// import { updateAsset } from "../../Redux/features/assetSlice";
// import { useParams } from "react-router-dom";
 
// const TypographyLabel: React.FC<{ title: string }> = ({ title }) => (
//   <Typography level="body-xs" sx={{ mt: 1, color: "#767676", mb: "5px" }}>
//     {title}
//   </Typography>
// );

// const Input: React.FC<InputProps> = ({ ...props }) => (
//   <MuiInput
//     sx={{
//       borderRadius: "15px",
//       padding: "10px",
//       width: {
//         xs: "100%",
//         sm: "100%",
//         md: 350,
//       },
//     }}
//     {...props}
//   />
// );

// type SelectProps = {
//   placeholder: string;
//   value: string;
//   sx?: any;
//   props?: ReactNode;
// };

// const Select: React.FC<SelectProps> = ({
//   placeholder,
//   value,
//   sx,
//   ...props
// }) => (
//   <MuiSelect
//     placeholder={placeholder}
//     value={value}
//     IconComponent={IoIosArrowDown}
//     sx={{
//       borderRadius: "15px",
//       padding: "12.25px",
//       width: {
//         xs: "100%",
//         sm: "100%",
//         md: 350,
//       },
//       [`& .${selectClasses.indicator}`]: {
//         transition: "0.2s",
//         [`&.${selectClasses.expanded}`]: {
//           transform: "rotate(-180deg)",
//         },
//       },

//       ...sx,
//     }}
//     {...props}
//   />
// );

// interface ValidationErrors {
//   asset_name?: string;
//   description?: string;
//   asset_tag_id?: string;
//   purchase_from?: string;
//   purchase_date?: string;
//   brand?: string;
//   cost?: string;
//   model?: string;
//   serial_number?: string;
//   status?: string;
//   site?: string;
//   category?: string;
//   location?: string;
//   department?: string;
//   asset_photo?: string;
// }

// const EditAssetPage: React.FC = () => {
//   const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
//   const selectedAsset = useSelector((state: RootState) => state.assets.selectedAsset);
//   // console.log(selectedAsset,"data of eidt");

//   const [asset_name, setAsset_Name] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [asset_tag_id, set_Asset_Tag_Id] = useState<string>("");
//   const [purchase_from, setPurchase_From] = useState<string>("");
//   const [purchase_date, setPurchase_date] = useState<string>("");
//   const [brand, setBrand] = useState<string>("");
//   const [cost, setCost] = useState<number>();
//   const [model, setModel] = useState<string>("");
//   const [serial_number, setSerial_number] = useState<string>("");
//   const [status, setStatus] = useState<string | "">("");
//   const [site, setSite] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [location, setLocation] = useState<string>("");
//   const [department, setDepartment] = useState<string>("");
//   const [asset_photo, setAsset_Photo] = useState<File | null>(null);
//   const { id } = useParams();
//   const [validationMessages, setValidationMessages] =
//     useState<ValidationErrors>({
//       asset_name: "",
//       description: "",
//       asset_tag_id: "",
//       purchase_from: "",
//       purchase_date: "",
//       brand: "",
//       cost: "",
//       model: "",
//       serial_number: "",
//       status: "",
//       site: "",
//       category: "",
//       location: "",
//       department: "",
//       asset_photo: "",
//     });

//     useEffect(() => {
//       if (selectedAsset) {
//         setAsset_Name(selectedAsset.asset_name || "");
//         setDescription(selectedAsset.description || "");
//         set_Asset_Tag_Id(selectedAsset.asset_tag_id || "");
//         setPurchase_From(selectedAsset.purchase_from || "");
//         setPurchase_date(selectedAsset.purchase_date || "");
//         setBrand(selectedAsset.brand || "");
//         setCost(selectedAsset.cost || undefined);
//         setModel(selectedAsset.model || "");
//         setSerial_number(selectedAsset.serial_number || "");
//         setStatus(selectedAsset.status || "");
//         setSite(selectedAsset.site || "");
//         setCategory(selectedAsset.category || "");
//         setLocation(selectedAsset.location || "");
//         setDepartment(selectedAsset.department || "");
//         // Assuming asset_photo is a URL or some identifier
//         setAsset_Photo(selectedAsset.asset_photo || null);
//       }
//     },[selectedAsset])
    

//   const validateForm = (): boolean => {
//     let isValid = true;
//     const errors: ValidationErrors = {};

//     if (!asset_name) {
//       errors.asset_name = "Asset name is required";
//       isValid = false;
//     }
//     if (!description) {
//       errors.description = "Description is required";
//       isValid = false;
//     }
//     if (!asset_tag_id) {
//       errors.asset_tag_id = "Asset Tag Id is required";
//       isValid = false;
//     }
//     if (!purchase_from) {
//       errors.purchase_from = "purchased From is required";
//       isValid = false;
//     }
//     if (!purchase_date) {
//       errors.purchase_date = "Purchase Date  is required";
//       isValid = false;
//     }
//     if (!brand) {
//       errors.brand = "Brand  is required";
//       isValid = false;
//     }
//     if (!model) {
//       errors.model = "Model  is required";
//       isValid = false;
//     }
//     if (!serial_number) {
//       errors.serial_number = "Serial No  is required";
//       isValid = false;
//     }
//     if (!status) {
//       errors.status = "Status is required";
//       isValid = false;
//     }
//     if (!site) {
//       errors.site = "Site  is required";
//       isValid = false;
//     }
//     if (!category) {
//       errors.category = "category  is required";
//       isValid = false;
//     }
//     if (!location) {
//       errors.location = "Location  is required";
//       isValid = false;
//     }
//     if (!department) {
//       errors.department = "Department  is required";
//       isValid = false;
//     }
//     if (!asset_photo) {
//       errors.asset_photo = "Photo  is required";
//       isValid = false;
//     }
//     if (isNaN(Number(cost))) {
//       errors.cost = "Please enter a valid cost";
//       isValid = false;
//     }

//     setValidationMessages(errors);
//     return isValid;
//   };

//   const handleFileUpload = () => {
//     const fileInput = document.getElementById("fileInput") as HTMLInputElement;
//     if (fileInput) {
//       fileInput.click();
//     }
//   };

//   const handleFileInputChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files && event.target.files[0];
//     if (file) {
//       setAsset_Photo(file);
//       setValidationMessages((prevState) => ({ ...prevState, asset_photo: "" }));
//     }
//   }

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const isFormValid = validateForm();
//     if (!isFormValid) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append("asset_name", asset_name);
//     formData.append("asset_tag_id", asset_tag_id);
//     formData.append("site", site);
//     formData.append("description", description);
//     formData.append("purchase_from", purchase_from);
//     formData.append("purchase_date", purchase_date);
//     formData.append("brand", brand);
//     formData.append("cost", cost?.toString() || "");
//     formData.append("model", model);
//     formData.append("serial_number", serial_number);
//     formData.append("status", status);
//     formData.append("category", category);
//     formData.append("location", location);
//     formData.append("department", department);
//     if (asset_photo) {
//       formData.append("asset_photo", asset_photo);
//     }

//     const apiData : any = {};

//     // Log the formData to inspect it before sending
//     console.log("Form Data:", formData);

//     // try {
//     //   await dispatch(updateAsset(formData));
//     //   console.log("Form submitted successfully");
//     //   // window.location.reload();
//     // } catch (error) {
//     //   console.error("Error submitting form:", error);
//     // }
    
//     for (let [key, value] of formData.entries()) {
//       apiData[key] = value;
//       console.log(`${key}: ${value}`,"formdata");
//     }
    
//     console.log(apiData);
//     console.log("id=", id);
//     apiData['id'] = id;
//     try {
//       if(selectedAsset && selectedAsset.id){
//         await dispatch(updateAsset(apiData));
//         console.log("Form submitted successfully");
//         // window.location.reload();
//       }

//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }

//   }
//   const handleCancel = () => {
//     setDescription("");
//     set_Asset_Tag_Id("");
//     setPurchase_From("");
//     setPurchase_date("");
//     setBrand("");
//     setCost(undefined);
//     setModel("");
//     setSerial_number("");
//     setSite("");
//     setCategory("");
//     setLocation("");
//     setDepartment("");
//     setStatus("");
//     setAsset_Name("");
//     setAsset_Photo(null);
//   }

//   const handleChange =
//     (
//       setter: React.Dispatch<React.SetStateAction<any>>,
//       field: keyof ValidationErrors
//     ) =>
//     (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       setter(e.target.value);
//       setValidationMessages((prevState) => ({ ...prevState, [field]: "" }));
//     };

//   const handleSelectChange =
//     (
//       setter: React.Dispatch<React.SetStateAction<any>>,
//       field: keyof ValidationErrors
//     ) =>
//     (event: React.SyntheticEvent | null, newValue: string | null) => {
//       setter(newValue!);
//       setValidationMessages((prevState) => ({ ...prevState, [field]: "" }));
//     };

//   const [open, setOpen] = useState(false);
//   const openPopUp = () => {
//     setOpen(true);
//   }
//   const closePopUp = () => {
//     setOpen(false);
//   }

//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const openCategory = () => {
//     setCategoryOpen(true);
//   };
//   const closeCategory = () => {
//     setCategoryOpen(false);
//   };

//   const [locationOpen,setLocationOpen] = useState(false)
//   const openLocation =()=>{
//     setLocationOpen (true)
//   }
//   const closeLocation=()=>{
//     setLocationOpen(false)
//   }

//   const [departmentOpen, setDepartmentOpen] = useState(false);
//   const openDepartment = () => {
//     setDepartmentOpen(true);
//   };
//   const closeDepartment = () => {
//     setDepartmentOpen(false);
//   };

  

//   return (
//     <>
//       <div>
//         <div style={{ margin: "52px" }}>
//           <Typography level="h3" color="initial">
//             Edit Asset
//           </Typography>
//         </div>
//         <Box
//           sx={{
//             borderRadius: "16px",
//             boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//             background: "#ffffff",
//             margin: {
//               xs: "4px",
//               md: "52px",
//             },
//           }}
//         >
//           <Box sx={{ paddingBottom: "30px" }}>
//             <Box sx={{}}>
//               <Grid
//                 container
//                 spacing={1}
//                 sx={{
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: { xs: "column", md: "row" },
//                   justifyContent: "space-evenly",
//                   padding: "20px",
//                   gap: "10px",
//                 }}
//               >
//                 <Grid xs={12}>
//                   <Typography
//                     sx={{ fontWeight: "bold", mb: 0, paddingLeft: "32px" }}
//                   >
//                     Assets Details
//                   </Typography>
//                 </Grid>
//                 <Grid>
//                   <Typography
//                     level="body-xs"
//                     sx={{ color: "#767676", mt: "8px", mb: "5px" }}
//                   >
//                     Asset Name
//                   </Typography>
//                   <Input
//                     value={asset_name}
//                     onChange={handleChange(setAsset_Name, "asset_name")}
//                     sx={{
//                       borderRadius: "15px",
//                       padding: "10px",
//                       width: { xs: "100%", md: "550px" },
//                     }}
//                   />
//                   {validationMessages.asset_name && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.asset_name}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid>
//                   <TypographyLabel title="Asset Tag ID"></TypographyLabel>
//                   <Input
//                     placeholder=""
//                     value={asset_tag_id}
//                     onChange={handleChange(set_Asset_Tag_Id, "asset_tag_id")}
//                     sx={{
//                       borderRadius: "15px",
//                       padding: "10px",
//                       width: { xs: "100%", md: "550px" },
//                     }}
//                   />
//                   {validationMessages.asset_tag_id && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.asset_tag_id}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid md={11.1}>
//                   <Typography
//                     level="body-xs"
//                     sx={{ color: "#767676", mt: "8px", mb: "5px" }}
//                   >
//                     Description
//                   </Typography>
//                   <Input
//                     placeholder=""
//                     value={description}
//                     onChange={handleChange(setDescription, "description")}
//                     sx={{
//                       borderRadius: "15px",
//                       padding: "10px",
//                     }}
//                   />
//                   {validationMessages.description && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.description}
//                     </Typography>
//                   )}
//                 </Grid>

//                 <Grid>
//                   <TypographyLabel title="Purchased From"></TypographyLabel>
//                   <Input
//                     placeholder="All Location"
//                     value={purchase_from}
//                     onChange={handleChange(setPurchase_From, "purchase_from")}
//                   />
//                   {validationMessages.purchase_from && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.purchase_from}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid>
//                   <TypographyLabel title="Purchased Date"></TypographyLabel>
//                   <Input
//                     placeholder="dd/mm/yyyy-dd/mm/yyyy"
//                     type="Date"
//                     value={purchase_date}
//                     onChange={handleChange(setPurchase_date, "purchase_date")}
//                   />
//                   {validationMessages.purchase_date && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.purchase_date}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid>
//                   <TypographyLabel title="Brand"></TypographyLabel>
//                   <Input
//                     placeholder=""
//                     value={brand}
//                     onChange={handleChange(setBrand, "brand")}
//                   />
//                   {validationMessages.brand && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.brand}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid>
//                   <Typography
//                     level="body-xs"
//                     sx={{ mt: 1, color: "#767676", mb: "5px" }}
//                   >
//                     Cost
//                   </Typography>
//                   <Input
//                     placeholder="Indian Rupee"
//                     value={cost?.toString() || ""}
//                     // onChange={(e) =>
//                     //   setCost(
//                     //     e.target.value ? Number(e.target.value) : undefined
//                     //   )
//                     // }
//                     onChange={handleChange(setCost, "cost")}
//                   />
//                   {validationMessages.cost && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.cost}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid>
//                   <TypographyLabel title="Model"></TypographyLabel>
//                   <Input
//                     placeholder=""
//                     value={model}
//                     onChange={handleChange(setModel, "model")}
//                   />
//                   {validationMessages.model && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.model}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid>
//                   <TypographyLabel title="Serial No."></TypographyLabel>
//                   <Input
//                   name='serial_number'
//                     placeholder="Nothing Selected"
//                     value={serial_number}
//                     onChange={handleChange}
//                   />
//                   {validationMessages.serial_number && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.serial_number}
//                     </Typography>
//                   )}
//                 </Grid>
//                 <Grid sx={{}}>
//                   <TypographyLabel title="Status"></TypographyLabel>
//                   <Select
//                     value={status}
//                     // onChange={(
//                     //   event: React.SyntheticEvent | null,
//                     //   newValue: string | null
//                     // ) => {
//                     //   setStatus(newValue!);
//                     // }}
//                     onChange={handleSelectChange(setStatus, "status")}
//                   >
//                     <Option value="Available">Available</Option>
//                     <Option value="Not Available">Not Available</Option>
//                   </Select>
//                   {validationMessages.status && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.status}
//                     </Typography>
//                   )}
//                 </Grid>
//               </Grid>
//               <Typography
//                 sx={{
//                   fontWeight: "bold",
//                   mb: 0,
//                   paddingLeft: "48px",
//                   paddingTop: "15px",
//                 }}
//               >
//                 Site,Location,Category and Department
//               </Typography>
//             </Box>
//             <Box>
//               <Grid
//                 container
//                 spacing={3}
//                 sx={{
//                   flexGrow: 1,
//                   display: "flex",
//                   flexDirection: { xs: "column", md: "row" },
//                   justifyContent: "space-evenly",
//                   gap: "10px",
//                   padding: "20px",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <Box>
//                   <Typography
//                     level="body-xs"
//                     sx={{ mt: 1, color: "#767676", ml: "10px" }}
//                   >
//                     Site
//                   </Typography>
//                   <Grid
//                     sx={{
//                       display: "flex",
//                       gap: "30px",
//                       flexDirection: { xs: "column", md: "row" },
//                     }}
//                   >
//                     <Select
//                       placeholder="OneSite(Indore,India)"
//                       value={site}
//                       onChange={handleSelectChange(setSite, "site")}
//                     >
//                       <Option value="Indore">Indore</Option>
//                       <Option value="Mumbai">Mumbai</Option>
//                       <Option value="Delhi">Delhi</Option>
//                     </Select>

//                     <Button
//                       sx={{
//                         width: "150px",
//                         fontSize: "20px",
//                         borderRadius: "15px",
//                         background: "#E4E4E4",
//                         "&:hover": {
//                           background: "#d9d9d9",
//                         },
//                         color: "#767676",
//                       }}
//                       onClick={openPopUp}
//                     >
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         <FaPlus />
//                       </Typography>
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         New
//                       </Typography>
//                     </Button>
//                     <SiteDialog open={open} closePopUp={closePopUp} />
//                   </Grid>
//                   {validationMessages.site && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.site}
//                     </Typography>
//                   )}
//                 </Box>

//                 <Box>
//                   <Typography
//                     level="body-xs"
//                     sx={{ mt: 1, color: "#767676", ml: "10px" }}
//                   >
//                     Category
//                   </Typography>
//                   <Grid
//                     sx={{
//                       display: "flex",
//                       gap: "30px",
//                       flexDirection: { xs: "column", md: "row" },
//                     }}
//                   >
//                     <Select
//                       placeholder="Computer category"
//                       value={category}
//                       onChange={handleSelectChange(setCategory, "category")}
//                     >
//                       <Option value="Laptop">Laptop</Option>
//                       <Option value="Desktop">Desktop</Option>
//                       <Option value="Monitor">Monitor</Option>
//                     </Select>
//                     <Button
//                       sx={{
//                         width: "150px",
//                         fontSize: "20px",
//                         borderRadius: "15px",
//                         background: "#E4E4E4",
//                         "&:hover": {
//                           background: "#d9d9d9",
//                         },
//                       }}
//                       onClick={openCategory}
//                     >
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         <FaPlus />
//                       </Typography>
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         New
//                       </Typography>
//                     </Button>
//                     <CategoryDialog
//                     categoryOpen={categoryOpen}
//                     closeCategory={closeCategory}
//                   />
//                   </Grid>
//                   {validationMessages.category && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.category}
//                     </Typography>
//                   )}
                  
//                 </Box>

//                 <Box>
//                   <Typography
//                     level="body-xs"
//                     sx={{ mt: 1, color: "#767676", ml: "10px" }}
//                   >
//                     Location
//                   </Typography>
//                   <Grid
//                     sx={{
//                       display: "flex",
//                       gap: "30px",
//                       flexDirection: { xs: "column", md: "row" },
//                     }}
//                   >
//                     <Select
//                       placeholder="Indore"
//                       value={location}
//                       onChange={handleSelectChange(setLocation, "location")}
//                     >
//                       <Option value="Indore">Indore</Option>
//                       <Option value="Mumbai">Mumbai</Option>
//                       <Option value="Delhi">Delhi</Option>
//                     </Select>
//                     <Button
//                       sx={{
//                         width: "150px",
//                         fontSize: "20px",
//                         borderRadius: "15px",
//                         background: "#E4E4E4",
//                         "&:hover": {
//                           background: "#d9d9d9",
//                         },
//                         color: "#767676",
//                       }}
//                       onClick={openLocation}
//                     >
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         <FaPlus />
//                       </Typography>
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         New
//                       </Typography>
//                     </Button>
//                     <LocationDialog locationOpen={locationOpen} closeLocation={closeLocation}/>
//                   </Grid>
//                   {validationMessages.location && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.location}
//                     </Typography>
//                   )}
//                 </Box>

//                 <Box>
//                   <Typography
//                     level="body-xs"
//                     sx={{ mt: 1, color: "#767676", ml: "10px" }}
//                   >
//                     Department
//                   </Typography>
//                   <Grid
//                     sx={{
//                       display: "flex",
//                       gap: "30px",
//                       flexDirection: { xs: "column", md: "row" },
//                     }}
//                   >
//                     <Select
//                       placeholder="Supplier eco system"
//                       value={department}
//                       onChange={handleSelectChange(setDepartment, "department")}
//                     >
//                       <Option value="Supplier A">Supplier A</Option>
//                       <Option value="Supplier B">Supplier B</Option>
//                       <Option value="Supplier C">Supplier C</Option>
//                     </Select>
//                     <Button
//                       sx={{
//                         width: "150px",
//                         fontSize: "20px",
//                         borderRadius: "15px",
//                         background: "#E4E4E4",
//                         "&:hover": {
//                           background: "#d9d9d9",
//                         },
//                         color: "#767676",
//                       }}
//                       onClick={openDepartment}
//                     >
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         <FaPlus />
//                       </Typography>
//                       <Typography sx={{ mr: "25px", color: "#767676" }}>
//                         New
//                       </Typography>
//                     </Button>
//                     <DepartmentDialog
//                       departmentOpen={departmentOpen}
//                       closeDepartment={closeDepartment}
//                     />
//                   </Grid>
//                   {validationMessages.department && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.department}
//                     </Typography>
//                   )}
//                 </Box>
//               </Grid>
//               <Box sx={{ paddingLeft: "48px", mb: "30px", mt: "20px" }}>
//                 <Typography sx={{ fontWeight: "bold" }}>
//                   Assets Photo
//                 </Typography>
//               </Box>
//               <Box
//                 sx={{
//                   height: "170px",
//                   borderRadius: "10px ",
//                   border: "2px dashed #D3D3D3",
//                   lineHeight: "1.5px",
//                   mx: "48px",
//                   background: "#FBFBFB",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     height: "100%",
//                     width: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: "5px",
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       height: "55px",
//                       width: "55px",
//                       borderRadius: "10px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       backgroundColor: "#13B457",
//                       color: "white",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Button
//                       onClick={handleFileUpload}
//                       sx={{
//                         borderRadius: "10px",
//                         border: "none",
//                         background: "none",
//                         "&:hover": {
//                           background: "#13B457",
//                         },
//                       }}
//                     >
//                       <IoCloudUploadSharp size={23} />
//                     </Button>
//                     <input
//                       type="file"
//                       id="fileInput"
//                       style={{ display: "none" }}
//                       onChange={handleFileInputChange}
//                     />
//                   </Box>
//                   {asset_photo && <p> {asset_photo.name}</p>}
//                   <TypographyLabel title="Only(JPG,GIF,PNG)Allowed"></TypographyLabel>
//                   {validationMessages.asset_photo && (
//                     <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
//                       {validationMessages.asset_photo}
//                     </Typography>
//                   )}
//                 </Box>
//               </Box>
//             </Box>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: {
//                   xs: "column",
//                   md: "row",
//                 },
//                 justifyContent: "flex-end",
//                 gap: "15px",
//                 mx: "35px",
//                 mt: "40px",
//               }}
//             >
//               <Button
//                 size="lg"
//                 onClick={handleSubmit}
//                 sx={{
//                   color: "#000000",
//                   borderRadius: "15px",
//                   padding: "18px 70px",
//                   background: "#FABC1E",
//                   "&:hover": {
//                     background: "#e0a71b",
//                   },
//                 }}
//               >
//                 Save
//               </Button>
//               <Button
//                 size="lg"
//                 onClick={handleCancel}
//                 sx={{
//                   borderRadius: "15px",
//                   padding: "18px 70px",
//                   background: "#000000",
//                   "&:hover": {
//                     background: "#333333",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </div>
//     </>
//   );
// };

// export default EditAssetPage;
