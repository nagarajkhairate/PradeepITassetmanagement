import React, { ReactNode,SyntheticEvent,useState,useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Input as MuiInput,
  Button,
  selectClasses,
  Select as MuiSelect,
  Option,
} from "@mui/joy";

import { IoIosArrowDown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { IoCloudUploadSharp } from "react-icons/io5";
import {  useSelector,useDispatch } from 'react-redux'
import {loadFunc, submitData} from "../../Redux/Features/assetSlice";
import { RootState } from "../../Redux/Features/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

const TypographyLabel: React.FC<{ title: string }> = ({ title }) => (
  <Typography level="body-xs" sx={{ mt: 1, color: "#767676", mb: "5px" }}>
    {title}
  </Typography>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => (
  <MuiInput
    sx={{
      borderRadius: "15px",
      padding: "10px",
      width: {
        xs: "100%",
        sm: "100%",
        md: 350,
      },
    }}
    {...props}
  />
);

type SelectProps = {
  placeholder: string;
  value:string;
  sx?:any;
  props?: ReactNode; 
};

const Select: React.FC<SelectProps> = ({ placeholder,value,sx, ...props }) => (
  <MuiSelect

    placeholder={placeholder}
    value={value}
    IconComponent={IoIosArrowDown}
    sx={{
      borderRadius: "15px",
      padding: "12.25px",
      width: {
        xs: "100%",
        sm: "100%",
        md: 350,
      },
      [`& .${selectClasses.indicator}`]: {
        transition: "0.2s",
        [`&.${selectClasses.expanded}`]: {
          transform: "rotate(-180deg)",
        },
      },
      ...sx,
  }}
    {...props}
  />
);

const AddAnAsset: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [description, setDescription] = useState<string>("");
  const [assetTagId, setAssetTagId] = useState<string>("");
  const [purchasedFrom, setPurchasedFrom] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [cost, setCost] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [serialNo, setSerialNo] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [equipment, setEquipment] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileUpload = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };
  
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    };
    
    const handleSubmit = () => {
      const formData = {
        site,
        description,
        assetTagId,
        purchasedFrom,
        category,
        brand,
        cost,
        model,
        serialNo,
        equipment,
        location,
        department,
        selectedFile,
      };
      console.log(formData);
      // const res = loadFunc(formData)
      // dispatch(submitData(
      //   res
      // ))
      dispatch(submitData(
        formData
      ))
    };
    
    const handleCancel = () => {
      setDescription("");
      setAssetTagId("");
      setPurchasedFrom("");
      setCategory("");
      setBrand("");
      setCost("");
      setModel("");
      setSerialNo("");
      setSite("");
      setEquipment("");
      setLocation("");
      setDepartment("");
      setSelectedFile(null);
    };
    
    

    const {data,error} = useSelector((state: RootState)=>state.assets)
  console.log(data)


  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Typography level="h3" color="initial">
            Add An Asset
          </Typography>
        </div>
        <Box
          sx={{
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
            margin: {
              xs: "4px",
              md: "52px",
            },
          }}
        >
          <Box sx={{ paddingBottom: "30px" }}>
            <Box sx={{}}>
              <Grid
                container
                spacing={1}
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-evenly",
                  padding: "20px",
                  gap: "10px",
                }}
              >
                <Grid item xs={12}>
                  <Typography
                    sx={{ fontWeight: "bold", mb: 0, paddingLeft: "32px" }}
                  >
                    Assets Details
                  </Typography>
                </Grid>
                <Grid>
                  <Typography
                    level="body-xs"
                    sx={{ color: "#767676", mt: "8px", mb: "5px" }}
                  >
                    Description
                  </Typography>
                  <Input
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{
                      borderRadius: "15px",
                      padding: "10px",
                      width: {
                        xs: "100%",
                        sm: "100%",
                        md: 750,
                      },
                    }}
                  />
                </Grid>

                <Grid>
                  <TypographyLabel title="Asset Tag ID"></TypographyLabel>

                  <Input
                    placeholder=""
                    value={assetTagId}
                    onChange={(e) => setAssetTagId(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TypographyLabel title="Purchased From"></TypographyLabel>
                  <Input
                    placeholder="All Location"
                    value={purchasedFrom}
                    onChange={(e) => setPurchasedFrom(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TypographyLabel title="Category"></TypographyLabel>
                  <Input
                    placeholder="dd/mm/yyyy-dd/mm/yyyy"
                    type="Date"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TypographyLabel title="Brand"></TypographyLabel>
                  <Input
                    placeholder=""
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", mb: "5px" }}
                  >
                    Cost
                  </Typography>
                  <Input
                    placeholder="Indian Rupee"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TypographyLabel title="Model"></TypographyLabel>
                  <Input
                    placeholder=""
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </Grid>
                <Grid>
                  <TypographyLabel title="Serial No."></TypographyLabel>
                  <Input
                    placeholder="Nothing Selected"
                    value={serialNo}
                    onChange={(e) => setSerialNo(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Typography
                sx={{
                  fontWeight: "bold",
                  mb: 0,
                  paddingLeft: "48px",
                  paddingTop: "15px",
                }}
              >
                Site,Location,Category and Department
              </Typography>
            </Box>
            <Box>
              <Grid
                container
                spacing={3}
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-evenly",
                  gap: "10px",
                  padding: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Site
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Select
                      placeholder="OneSite(Indore,India)"
                      value={site}
                      onChange={(event: React.SyntheticEvent | null,
                        newValue: string | null,
                      )=> {
                        setSite(newValue!);
                      }}
                    >
                      <Option value="Indore">Indore</Option>
                      <Option value="Mumbai">Mumbai</Option>
                      <Option value="Delhi">Delhi</Option>
                    </Select>
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                        color: "#767676",
                      }}
                    >
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        New
                      </Typography>
                    </Button>
                  </Grid>
                </Box>

                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Category
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Select
                      placeholder="Computer Equipment"
                      value={equipment}
                      onChange={(event: React.SyntheticEvent | null,
                        newValue: string | null,
                      ) =>{ setEquipment(newValue!)}}
                    >
                      <Option value="Laptop">Laptop</Option>
                      <Option value="Desktop">Desktop</Option>
                      <Option value="Monitor">Monitor</Option>
                    </Select>
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                      }}
                    >
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        New
                      </Typography>
                    </Button>
                  </Grid>
                </Box>

                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Location
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Select
                      placeholder="Indore"
                      value={location}
                      onChange={(event: React.SyntheticEvent | null,
                        newValue: string | null,
                      ) =>{ setLocation(newValue!)}}
                    >
                      <Option value="Indore">Indore</Option>
                      <Option value="Mumbai">Mumbai</Option>
                      <Option value="Delhi">Delhi</Option>
                    </Select>
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                        color: "#767676",
                      }}
                    >
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        New
                      </Typography>
                    </Button>
                  </Grid>
                </Box>

                <Box>
                  <Typography
                    level="body-xs"
                    sx={{ mt: 1, color: "#767676", ml: "10px" }}
                  >
                    Department
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      gap: "30px",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                  >
                    <Select
                      placeholder="Supplier eco system"
                      value={department}
                      onChange={(event: React.SyntheticEvent | null,
                        newValue: string | null,
                      ) =>{ setDepartment(newValue!)}}
                    >
                      <Option value="Supplier A">Supplier A</Option>
                      <Option value="Supplier B">Supplier B</Option>
                      <Option value="Supplier C">Supplier C</Option>
                    </Select>
                    <Button
                      sx={{
                        width: "150px",
                        fontSize: "20px",
                        borderRadius: "15px",
                        background: "#E4E4E4",
                        "&:hover": {
                          background: "#E4E4E4",
                        },
                        color: "#767676",
                      }}
                    >
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        <FaPlus />
                      </Typography>
                      <Typography sx={{ mr: "25px", color: "#767676" }}>
                        New
                      </Typography>
                    </Button>
                  </Grid>
                </Box>
              </Grid>
              <Box sx={{ paddingLeft: "48px", mb: "30px", mt: "20px" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  Assets Photo
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "170px",
                  borderRadius: "10px ",
                  border: "2px dashed #D3D3D3",
                  lineHeight: "1.5px",
                  mx: "48px",
                  background: "#FBFBFB",
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Box
                    sx={{
                      height: "55px",
                      width: "55px",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#13B457",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    <Button
                      onClick={handleFileUpload}
                      sx={{
                        borderRadius: "10px",
                        border: "none",
                        background: "none",
                        "&:hover": {
                          background: "#13B457",
                        },
                      }}
                    >
                      <IoCloudUploadSharp size={23} />
                    </Button>
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                    />
                  </Box>
                  {selectedFile && <p> {selectedFile.name}</p>}
                  <TypographyLabel title="Only(JPG,GIF,PNG)Allowed"></TypographyLabel>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                },
                justifyContent: "flex-end",
                gap: "15px",
                mx: "35px",
                mt: "40px",
              }}
            >
              <Button
                size="lg"
                onClick={handleSubmit}
                sx={{
                  color: "#000000",
                  borderRadius: "15px",
                  padding: "18px 70px",
                  background: "#FABC1E",
                  "&:hover": {
                    background: "#FABC1E",
                  },
                }}
              >
                Save
              </Button>
              <Button
                size="lg"
                onClick={handleCancel}
                sx={{
                  borderRadius: "15px",
                  padding: "18px 70px",
                  background: "#000000",
                  "&:hover": {
                    background: "#000000",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AddAnAsset;
