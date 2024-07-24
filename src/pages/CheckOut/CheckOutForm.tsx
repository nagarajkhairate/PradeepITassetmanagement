import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Table,
  Input,
  Button,
  Radio,
  Checkbox,
  RadioGroup,
  FormLabel,
  FormControl,
  Grid,
  Chip,
} from '@mui/joy'
import AppView from '../../components/Common/AppView'
import AppForm from '../../components/Common/AppForm'
import { addCheckOut, fetchCheckOut } from '../../redux/features/CheckOutSlice'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { checkOutConfig } from './checkOutConfig'
import SiteComponent from '../../components/AssetSections/SiteComponent'
import LocationComponent from '../../components/AssetSections/LocationComponent'
import DepartmentComponent from '../../components/AssetSections/DepartmentComponent'
import SelectOption from '../../components/AssetSections/SelectOption'
import AddNewEmpployee from './AddNewEmpployee'
import AddNewClient from './AddNewClient'

interface CheckOutFormProps {
  selectedAssets: any;
}

const CheckOutForm: React.FC <CheckOutFormProps> = ({ selectedAssets }) => {
  const [open, setOpen] = useState(false)
  const [checkOutTo, setCheckOutTo] = useState('person')
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [formData, setFormData] = useState<any>({})
  const checkOut = useSelector((state: RootState) => state.checkOut.data);

  useEffect(() => {
    dispatch(fetchCheckOut());
  }, [dispatch]);

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
    setCheckOutTo(value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    setFormData((prevData: any) => {
      const formData = {
        ...prevData,
        assetId: selectedAssets[0].id
      };
  
      console.log(JSON.stringify(formData));
      dispatch(addCheckOut(formData));
      
      return formData;
    });
  }

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
              value={formData[field.name] as string}
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
                value={formData[field.name] as string}
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
                value={formData[field.name] as string}
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
              value={formData[field.name] as string}
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
            checked={formData[field.name] as boolean}
            onChange={handleChange}
            sx={field.stylings}
          />
        </FormControl>
      );
 
      case "select":
        if (field.name === "checkOutSiteId") {
          return <SiteComponent {...commonProps} />;
        } else if (field.name === "checkOutLocationId") {
          return <LocationComponent {...commonProps} />;
        } else if (field.name === "checkOutDepartmentId") {
          return <DepartmentComponent {...commonProps} />;
        } 
        else if (field.name === "assignedTo"){
          return <AddNewEmpployee {...commonProps} />;
        } 
        else if (field.name === "clientId") {
          return <AddNewClient {...commonProps} />;
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
    console.log(assignment)
    return assignment ? assignment.assignedTo.empName : null;
  };
  
  const statusColorMap: Record<string, string> = {
    Available: "success",
    CheckedOut: "neutral",
  };

  return (
    <AppForm onSubmit={handleFormSubmit}>
      <Box
        sx={{
          borderRadius: '15px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          p: 4,
        }}
      >
        <Typography component="h2" sx={{ mb: 2 }}>
          Assets Pending Check-Out
        </Typography>
        <Box
          sx={{
              overflowX: 'auto',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            marginBottom: '20px',
          }}
        >
          <Table sx={{ border: '1px solid #f2f2f2', width: '100%', minWidth:"900px" }}>
            <thead>
              <tr>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    width: '30px',
                    background: '#fff8e6',
                  }}
                >
                  <Checkbox />
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Asset Tag ID
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Assigned to
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Site
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Location
                </th>
                <th
                  style={{
                    padding: '8px',
                    border: '1px solid #f2f2f2',
                    background: '#fff8e6',
                  }}
                >
                  Lease To
                </th>
              </tr>
            </thead>
            
        <tbody>
          {selectedAssets && selectedAssets.map((asset: any) => (
            <tr key={asset.id}>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" , width:"20px"}}><Checkbox /></td>
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
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.leaseTo}</td>
            </tr>
          ))}
        </tbody>
          </Table>
        </Box>

<AppView>
<Box mt={2}>
  <Box
    sx={{
      display: 'grid',
      gap: 2,
      gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
    }}
  >
    {checkOutConfig && checkOutConfig.map((field , index) => (
      <FormControl key={index}>
       <Grid key={index}>
       {checkOutTo === 'person' || (field.name !== 'assignedTo' && field.name !== 'clientId') ?
        handleInputValue(field, formData, handleChange, handleSelectChange, handleRadioChange) : null}
        </Grid>
      </FormControl>
    ))}
          </Box>
        </Box>
        <Box mt={2}>
          <Button type="submit">Check Out</Button>
        </Box>
        </AppView>

      </Box>
    </AppForm>
  )
}

export default CheckOutForm
