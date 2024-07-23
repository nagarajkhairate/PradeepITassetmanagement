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

interface CheckInFormProps {
  selectedAssets: any;
}

const CheckInForm: React.FC<CheckInFormProps> = ({ selectedAssets }) => {
  const [formData, setFormData] = useState<any>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const checkOut = useSelector((state: RootState) => state.checkOut.data)
  
  useEffect(() => {
    const selectedAssetId = selectedAssets && selectedAssets.length > 0 ? selectedAssets[0].id : null;
    if (selectedAssetId) {
      dispatch(fetchCheckOutById(selectedAssetId));
    }
  }, [selectedAssets]);

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(JSON.stringify(formData))

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
            sx={field.stylings}
          />
        </FormControl>
      );
    case "date":
    case "number":
      case "email":
        return (
          <FormControl>
            <FormLabel>{field.fieldName}</FormLabel>
            <Input
            type={field.components.type}
              name={field.name}
              value={formData && formData[field.name] as string}
              onChange={handleChange}
              sx={field.stylings}
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
              sx={field.stylings}
            >
                 {radioOptions.map((option) => (
            <Radio key={option.value} value={option.value} label={option.label} />
          ))}
            </RadioGroup>
          </FormControl>
        );
    case "textarea":
      return (
        <FormControl>
          <FormLabel>{field.fieldName}</FormLabel>
          <textarea
            type={field.components.type}
            name={field.name}
            value={formData && formData[field.name] as string}
            onChange={handleChange}
            sx={field.stylings}
          />
        </FormControl>
      );

      case "checkbox":
    return (
      <FormControl>
        <FormLabel>{field.fieldName}</FormLabel>
        <Checkbox
        type={field.components.type}
          name={field.name}
          checked={formData && formData[field.name] as boolean}
          onChange={handleChange}
          sx={field.stylings}
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

const getAssignTo = (id:any) => {
  const assignment = checkOut && checkOut.find(assign => assign.assetId === id);
  // console.log(assignment)
  return assignment ? assignment.assignedTo : null;
};

useEffect(()=>{
  if(checkOut) {
    setFormData(checkOut[0])
  }
},
[checkOut])

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 e.preventDefault()

 setFormData((prevData: any) => {
  const formData = {
    ...prevData,
    assetId: selectedAssets[0].id
  };
 
 console.log(JSON.stringify(formData))
  dispatch(updateCheckOut(formData))

 return formData;
});
}

const statusColorMap: Record<string, string> = {
  Available: "success",
  CheckedOut: "neutral",
};

  return (
    <AppForm onSubmit={handleFormSubmit}>
      <Box
      sx={{
        borderRadius: "15px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        background: "#ffffff",
        flexGrow: 1,
        marginTop: { xs: '10px', sm: '22px' },
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        p: 4,
      }}
    >
      <Typography component="h2" sx={{ mb: 2 }}>Assets Pending Check-In</Typography>
      <Box
           sx={{
            overflowX: 'auto',
            fontSize: '14px',
            whiteSpace: 'nowrap',
          }}
        >
      <Table sx={{ border: "1px solid #f2f2f2", width: "100%" , minWidth:"900px"}}>
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

<AppView>
      <Box mt={4}>

        <Box 
        sx={{
          display:"grid",
           gap:2, 
           gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }
           }}
           >
          
        {checkInConfig && checkInConfig.map((field , index) => (
      <FormControl key={index}>
       <Grid key={index}>
        {handleInputValue(
          field,
          formData,
          handleChange,
          handleSelectChange,
          handleRadioChange
        )}
        </Grid>
      </FormControl>
    ))}
          </Box>
        </Box>
        <Box mt={2}>
          <Button type='submit'>Check In</Button>
        </Box>
        </AppView>
</Box>
    </AppForm>
  )
}
export default CheckInForm;
