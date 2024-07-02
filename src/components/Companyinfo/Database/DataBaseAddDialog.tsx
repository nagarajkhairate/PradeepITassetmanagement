import { Box, Button, FormControl, FormLabel, Input, Option, Radio, RadioGroup, Select, Sheet, Typography } from "@mui/joy"
import React, { ChangeEvent, useState } from "react";
import AppForm from "../../Common/AppForm";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { addComponents, fetchComponents,  } from "../../../Redux/features/ComponentsIdSlice";
import { RootState } from "../../../redux/store";


interface DataBaseAddProps {
    open:any,
    setOpen:any
    dataBases: { customAssetFields: string[] };
        setDataBases: React.Dispatch<React.SetStateAction<{ customAssetFields: string[] }>>;
    }


const DataBaseAddDialog: React.FC<DataBaseAddProps> = ({open, setOpen, setDataBases}) => {
    const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
    // const [componentsForm, setComponentsForm] = useState()

    const components = useSelector((state: RootState) => state.components.data)

    const [formData, setFormData] = useState({
  
        custom: "",
        componentsId: "",
        selectedCategories: "",
        dataRequired: '',
        
      });

      React.useEffect(()=>{
        dispatch(fetchComponents())
      },[dispatch])


      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    //   const handleSelectChange = (
    //     event: React.SyntheticEvent | null,
    //     newValue: string | null
    //   ) => {
    //     setComponentsForm((prevData) => ({ ...prevData, dataType: newValue || "" }));
    //   };

    const handleSelectChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
      ) => {
        setFormData((prevData:any)=>({
          ...prevData,
          siteId:newValue
        })
          
        )
      }

      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value} = e.target;
        // const val =  value;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };


    const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // addCustomField(formData);
        setDataBases((prevData:any) => ({
          ...prevData,
          customAssetFields: [
            ...prevData.customAssetFields,
            {
              fieldName: formData.custom,
              componentsId: formData.componentsId,
              category: formData.selectedCategories,
              required: formData.dataRequired,
            },
          ],
        })
        
    );
        // dispatch(addDataBase(formData))
        handleClose();
        setFormData({
          custom: "",
          componentsId: "",
          dataRequired: '',
          selectedCategories: "",
        });
      
      };
    return(
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

  <AppForm onSubmit={handleAddSkill}>
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
          value={formData.componentsId}
          onChange={handleSelectChange}
        >

{components && components.map((comp)=>(
                              <Option key={comp.id} value={comp.id}>{comp.compName}</Option>
                            ))}
          {/* <Option value="checkbox List">Checkbox List</Option>
          <Option value="Currency">Currency</Option>
          <Option value="Date">Date</Option>
          <Option value="Memo">Memo</Option>
          <Option value="Email">Email</Option> */}
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
  </AppForm>
</div>
</Sheet>
)
}
export default DataBaseAddDialog