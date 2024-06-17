import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  Input,
  Button,
  Option,
  Radio,
  Checkbox,
  Select,
  RadioGroup,
  Textarea,
  FormLabel,
} from "@mui/joy";
import AppView from "../../components/Common/AppView";

interface CheckOutFormProps {
  selectedAssets: {
    id: string;
    description: string;
    status: string;
    assignedTo: string;
    site: string;
    location: string;
    leaseTo: string;
  }[];
}

const CheckOutForm: React.FC<CheckOutFormProps> = ({ selectedAssets}) => {
  const [formData, setFormData] = useState({
    id: "",
    assigned_to: "",
    checkout_to:"",
    check_out_date: "",
    due_date: "",
    check_out_site: "",
    check_out_location: "",
    check_out_department: "",
    check_out_notes: "",
    send_email: false,
    email_address: "",
  });

  const handleFormSubmit = () => {
    console.log(formData);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (name: string, newValue: string | null) => {
    setFormData({
      ...formData,
      [name]: newValue || ''
    });
  };


  return (
    <AppView>
    <Box
    sx={{
      borderRadius: '16px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      background: '#FFF',
      flexGrow: 1,
      marginTop: { xs: '10px', sm: '22px' },
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p:4,
    }}

      // sx={{
      //   borderRadius: "16px",
      //   boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      //   background: "#ffffff",
      //   padding: "20px",
      //   flexGrow: 1,
      //   marginLeft: "52px",
      //   marginTop: "22px",
      //   width: { xs: "100%", sm: "90%", md: "1100px" },
      //   height: "auto",
      // }}
    >
      <Typography component="h2" sx={{ mb: 2 }}>
        Assets Pending Check-Out
      </Typography>
      <Box
      sx={{
        overflowX: "auto",
        marginBottom: "20px",
      }}
      >
         <Table sx={{ border: "1px solid #f2f2f2", width: "100%" }}>
        <thead>
        <tr>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2", width:"20px",background: "#fff8e6" }}><Checkbox /></th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Asset Tag ID</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Description</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Status</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Assigned to</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Site</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Location</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Lease To</th>
          </tr>
        </thead>

        <tbody>
          {selectedAssets.map((asset) => (
            <tr key={asset.id}>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" , width:"20px"}}><Checkbox /></td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.id}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.description}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.status}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.assignedTo}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.site}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.location}</td>
              <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.leaseTo}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Box>
     

      <Box mt={4}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          }}
        >
          <Box sx={{ display: "flex" }}>
            <FormLabel>Check-out Date:</FormLabel>
            <Input placeholder="Check-out Date"
             type="date" 
             fullWidth 
             onChange={(e) =>
              setFormData({ ...formData, check_out_date: e.target.value })}/>
          </Box>


          <FormLabel >Optionally select Site, Location , Department of Asset to :</FormLabel>

          <Box
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <FormLabel>Check-out to:</FormLabel>
            </Box>
            <RadioGroup
              name="checkout_to"
              defaultValue="person"
              sx={{ display: "flex", alignItems: "center" }}
              onChange={handleChange}
            >
              <Box>
                <Radio value="person" label="Person" />
                <Radio value="site" label="Site / Location" />
              </Box>
            </RadioGroup>
          </Box>

          
          <Box
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Site:</FormLabel>
            <Select 
            name="check_out_site"
            placeholder="Site" 
            sx={{ ml:"60px",
            width:"80%"}}
            value={formData.check_out_site}
            onChange={(event, newValue)=> handleSelectChange('check_out_site', newValue as string)}
            >
              <Option value="site1">Site 1</Option>
              <Option value="site2">Site 2</Option>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Assigned to:</FormLabel>
            <Select
            name="assigned_to"
            placeholder="Assign to"
            sx={{width:"80%"}}
            value={formData.assigned_to}
            onChange={(event, newValue)=> handleSelectChange('assigned_to', newValue as string)}
            >
              <Option value="person1">Person 1</Option>
              <Option value="person2">Person 2</Option>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Location:</FormLabel>
            <Select
            name="check_out_location"
            placeholder="Location"
            value={formData.check_out_location}
            onChange={(event, newValue) => handleSelectChange ('check_out_location', newValue as string)}
            sx={{
                ml:"25px",
                width:"80%"
              }}
             >
              <Option value="location1">Location 1</Option>
              <Option value="location2">Location 2</Option>
            </Select>
          </Box>


          <Box
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Due date:</FormLabel>
            <Input
              placeholder="Due date"
              type="date"
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, due_date: e.target.value })
              }
            />
          </Box>

          
          <Box
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Department:</FormLabel>
            <Select
            name="check_out_department"
            placeholder="Department"
            value={formData.check_out_department}
            onChange={(event, newValue) => handleSelectChange('check_out_department' , newValue as string)}
            sx={{
                width:"80%"
              }}>
              <Option value="department1">Department 1</Option>
              <Option value="department2">Department 2</Option>
            </Select>
          </Box>

          <Box
            mt={4}
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Check-out Notes:</FormLabel>
            <Textarea
            sx={{width:'80%'}}
              placeholder="Check-out Notes"
              minRows={4}
              onChange={(e) =>
                setFormData({ ...formData, check_out_notes: e.target.value })
              }
            />
          </Box>

          <Box
            mt={4}
            sx={{
              display: "flex",
              flexDirection: {md:"row" , xs:"column"},
              alignItems: "center",
              gap: 2,
            }}
          >
            <Checkbox
              label="Send Email"
              sx={{ marginRight: 2 }}
              onChange={(e) =>
                setFormData({ ...formData, send_email: e.target.checked })
              }
            />
            <Input
              placeholder="Enter Email Address"
              fullWidth
              onChange={(e) =>
                setFormData({ ...formData, email_address: e.target.value })
              }
            />
          </Box>
        </Box>

        <Box mt={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="plain" color="neutral" sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button variant="solid" color="primary" onClick={handleFormSubmit}>
            Check-Out
          </Button>
        </Box>
      </Box>
    </Box>
    </AppView>
  );
};

export default CheckOutForm;
