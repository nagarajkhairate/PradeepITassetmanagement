import React, { useState } from 'react';
import { Box, Typography, Table, Input, Button, Option, Radio, Checkbox, Select, RadioGroup, Textarea, FormControl, FormLabel } from '@mui/joy';

interface CheckInFormProps {
  selectedAssets: { id: string, description: string, status: string, assignedTo: string, site: string, location: string }[];
}

const CheckInForm: React.FC<CheckInFormProps> = ({ selectedAssets }) => {
  const [formData, setFormData] = useState({
    check_in_from: 'person',
    check_in_date: '',
    send_email: false,
    email_address: '',
    check_in_site: '',
    check_in_location: '',
    check_in_department: '',
    check_in_notes: ''
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

  const handleDateChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };


  return (
    <Box
      sx={{
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        background: "#ffffff",
        padding: "20px",
        flexGrow: 1,
        marginLeft: "52px",
        marginTop: "22px",
        width: "1100px",
        height: "auto",
      }}
    >
      <Typography component="h2" sx={{ mb: 2 }}>Assets Pending Check-In</Typography>
      <Table>
        <thead>
          <tr>
            <th>Asset Tag ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Site</th>
            <th>Location</th>
            <th>Lease to</th>
          </tr>
        </thead>
        <tbody>
          {selectedAssets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.id}</td>
              <td>{asset.description}</td>
              <td>{asset.status}</td>
              <td>{asset.assignedTo}</td>
              <td>{asset.site}</td>
              <td>{asset.location}</td>
              <td>{/* Lease to field */}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Box mt={4}>
        <FormControl>
          <FormLabel>Check-in from:</FormLabel>
          <RadioGroup name="check_in_from" defaultValue="person" sx={{ display: 'flex', alignItems: 'center' }} onChange={handleChange}>
            <Radio value="person" label="Person" />
            <Radio value="site" label="Site / Location" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Return Date</FormLabel>
          <Input name="check_in_date" type="date"  required   onChange={(e) =>
                setFormData({ ...formData, check_in_date: e.target.value })
              } />
        </FormControl>

        <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox name="send_email" label="Send Email" sx={{ marginRight: 2 }} onChange={handleChange} />
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input name="email_address" placeholder="Enter Email Address" fullWidth onChange={handleChange} />
          </FormControl>
        </Box>

        <Box mt={4} sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <FormControl>
            <FormLabel>Site</FormLabel>
            <Select
             name="check_in_site"
             placeholder="Select Site"
             value={formData.check_in_site}
             onChange={(event, newValue) => handleSelectChange('check_in_site', newValue as string)}
             >
             <Option value="site1">Site 1</Option>
              <Option value="site2">Site 2</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Select 
            name="check_in_location"
            placeholder="Select Location"
            value={formData.check_in_location}
            onChange={(event, newValue) => handleSelectChange('check_in_location', newValue as string)}
            >
              <Option value="location1">Location 1</Option>
              <Option value="location2">Location 2</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Department</FormLabel>
            <Select
              name="check_in_department"
              placeholder="Select Department"
              value={formData.check_in_department}
              onChange={(event, newValue) => handleSelectChange('check_in_department', newValue as string)}
            >
              <Option value="department1">Department 1</Option>
              <Option value="department2">Department 2</Option>
            </Select>
          </FormControl>
        </Box>

        <Box mt={4}>
          <FormControl>
            <FormLabel>Check-in Notes</FormLabel>
            <Textarea name="check_in_notes" placeholder="Check-in Notes" minRows={4} onChange={handleChange} />
          </FormControl>
        </Box>

        <Box mt={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="plain" color="neutral" sx={{ marginRight: 2 }}>Cancel</Button>
          <Button variant="solid" color="primary" onClick={handleFormSubmit}>Check-In</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckInForm;
