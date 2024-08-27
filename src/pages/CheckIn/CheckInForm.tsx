import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, Input, Button, Option, Radio, Checkbox, Select, RadioGroup, Textarea, FormControl, FormLabel, Chip, Grid } from '@mui/joy';
import { DisplaySettings } from '@mui/icons-material';
import { addCheckOut, fetchCheckOut, fetchCheckOutById, updateCheckOut } from '../../redux/features/CheckOutSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ThunkDispatch } from 'redux-thunk';
import SelectOption from '../../components/AssetSections/SelectOption';
import AppForm from '../../components/Common/AppForm';
import { checkInConfig } from './checkInConfig';
import AppView from '../../components/Common/AppView';
import SiteComponent from '../../components/AssetSections/SiteComponent';
import LocationComponent from '../../components/AssetSections/LocationComponent';
import DepartmentComponent from '../../components/AssetSections/DepartmentComponent';
import { fetchCheckInField } from '../../redux/features/CheckInFieldSlice';
import { fetchEmployee } from '../../redux/features/EmployeeSlice';
import { useNavigate } from 'react-router-dom';

interface CheckInFormProps {
  selectedAssets: any;
}

const CheckInForm: React.FC<CheckInFormProps> = ({ selectedAssets }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState<any>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const checkOut = useSelector((state: RootState) => state.checkOut.data)
  const checkInFields= useSelector((state:RootState)=> state.checkInField.data)
  const employees = useSelector((state: RootState)=>state.addEmployee.data)

  useEffect(() => {
    if(selectedAssets.length){
      const selectedAssetId = selectedAssets && selectedAssets.length > 0 ? selectedAssets[0].id : null;
      const checkOutSelected =  checkOut && checkOut.find((checkout)=> checkout.assetId===selectedAssetId)
      setFormData(checkOutSelected)
    }
    
  }, [selectedAssets]);

  useEffect(()=>{
    dispatch(fetchCheckInField())
    dispatch(fetchEmployee())
  },[dispatch])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (
    newValue: any,
    title: string,
  ) => {
   
    setFormData((prevData:any) => ({
      ...prevData,
      [title]: newValue,
    }))
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const radioOptions = [
    { value: "person", label: "Person" },
    { value: "site", label: "Site / Location" },
    ];
    
const handleInputValue = (
  field: any,
  formData: any,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleSelectChange: (value: string | null, name: string) => void,
  handleRadioChange:(e: React.ChangeEvent<HTMLInputElement>) => void,
  mode?: string
) => {
  const commonProps = {
    field,
    formData,
    handleChange,
    handleSelectChange,
    handleRadioChange,
    mode,
  };

  switch (field.components.type) {
    case "text":
      return (
        <FormControl>
          <FormLabel>{field.fieldName}</FormLabel>
          <Input
            type={field.components.type}
            name={field.name}
            value={formData && formData[field.name] as string}
            onChange={handleChange}
            sx={{
              padding: '10px',
              minWidth: 200
            }}
          />
        </FormControl>
      );
    case "date":
      return (
        <FormControl >
          <FormLabel>{field.fieldName}</FormLabel>
          <Input
          type={field.components.type}
            name={field.name}
            value={formData && formData[field.name] as string}
            onChange={handleChange}
            sx={{
              padding: '10px',
                minWidth: 200
            }}
          />
        </FormControl>
      );
    case "number":
      case "email":
        return (
          <FormControl >
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
            type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={{
                padding: '10px',
                minWidth: 200
              }}
            />
          </FormControl>
        );
        case "radio":
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <RadioGroup
            type={field.components.type}
              name={field.name}
              value={formData && formData[field.name]? formData[field.name]: '' }
              onChange={handleRadioChange}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '10px',
                minWidth: 200
              }}
            >
                 {radioOptions.map((option) => (
            <Radio key={option.value} value={option.value} label={option.label} sx={{
              margin: '0 8px', 
            }}/>
          ))}
            </RadioGroup>
          </FormControl>
        );
    case "textarea":
      return (
        <FormControl >
          <FormLabel>{field.fieldName}</FormLabel>
          <Input
            type={field.components.type}
            name={field.name}
            value={formData && formData[field.name] as string}
            onChange={handleChange}
            sx={{
              padding: '10px',
              minWidth: 200
            }}
          />
        </FormControl>
      );

      case "checkbox":
    return (
      <FormControl sx={{marginBottom:"10px"}}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Checkbox
        type={field.components.type}
          name={field.name}
          checked={formData && formData[field.name] as boolean}
          onChange={handleChange}
          sx={{
              display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
          }}
        />
      </FormControl>
    );

    case "select":
      if (field.name === "checkInSiteId") {
        return <SiteComponent {...commonProps} />;
      } else if (field.name === "checkInLocationId") {
        return <LocationComponent {...commonProps} />;
      } else if (field.name === "checkInDepartmentId") {
        return <DepartmentComponent {...commonProps} />;
      }  
      else {
        return <SelectOption {...commonProps} />;
      }
    default:
      return null;
  }
};

const getEmployeName = (empId: number) =>{
  const employeeName = employees && employees.find(emp => emp.id === empId);

  return employeeName ? employeeName.empName: null;
}

const getAssignTo = (id:any) => {
  const assignment = checkOut && checkOut.find(assign => assign.assetId === id);

  return assignment ? getEmployeName(assignment.assignedTo): null;
};


const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault()

 await setFormData((prevData: any) => {
  const formData = {
    ...prevData,
    assetId: selectedAssets[0].id
  };
  console.log("Form submitted with data:", formData); // Debugging output

  setOpen(false)
  //  dispatch(updateCheckOut(formData))
  
});
navigate(`/assets/list-of-assets`);
}

const statusColorMap: Record<string, string> = {
  Available: 'success',
    CheckedOut: 'neutral',
    Leased: 'neutral',
    Disposed: 'neutral'
};


  return (
    <AppForm onSubmit={handleFormSubmit}>
      <Box
     sx={{
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      background: '#ffffff',
      gap: '5px',
      padding:"32px"
    }}
    >
      <Typography component="h2" sx={{ mb: 2 }}>Assets Pending Check-In</Typography>
      <Box
           sx={{
            overflowX: 'auto',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            marginBottom: '15px',
          }}
        >
      <Table sx={{ border: "1px solid #f2f2f2", width: "100%" , minWidth:"800px"}}>
        <thead>
        <tr>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2", width:"30px",background: "#fff8e6" }}><Checkbox /></th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Asset Tag ID</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Description</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Status</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Assigned to</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Site</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Location</th>
          </tr>
        </thead>

        <tbody>
          {selectedAssets && selectedAssets.map((asset:any) => (
            <tr key={asset.id}>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" , width:"30px"}}><Checkbox /></td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.assetTagId}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.description}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>
                  <Chip
          variant="soft"
          size="sm"
          color={statusColorMap[asset.status as keyof typeof statusColorMap] as 'success' | 'neutral'}
        >
          {asset.status}
        </Chip>
                </td>   
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{getAssignTo(asset.id)}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.site.name}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.location.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Box>

      <Box  sx={{
            padding: {xs: '5px', sm: '5px', md: '10px', lg:'20px'},
            display: 'flex',
            flexDirection: 'column',
          }}>
           <Grid
                container
                columnSpacing={10}
              >
        {checkInFields && checkInFields.map((field , index) => (
  
       <Grid key={index} xs={12}  sm={6} lg={6} md={6}>
        {handleInputValue(
          field,
          formData,
          handleChange,
          handleSelectChange,
          handleRadioChange
        )}
        </Grid>
    ))}
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ padding: "20px", gap: "15px" }}>
    <Grid>
      <Button type="submit" sx={{ background: '#FABC1E', '&:hover': { background: '#e0a71b' } }}>
        Check In
      </Button>
    </Grid>
    <Grid>
      <Button
        size="md"
        onClick={() => setOpen(false)}
        sx={{
          background: '#000000',
          '&:hover': {
            background: '#333333',
          },
        }}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
</Box>
</Box>
    </AppForm>
  )
}
export default CheckInForm;
