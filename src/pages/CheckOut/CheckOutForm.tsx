import React from 'react';
import { Box, Typography, Table, Input, Button, Option, Radio, Checkbox, Select, RadioGroup, Textarea } from '@mui/joy';

interface CheckOutFormProps {
  selectedAssets: { id: string, description: string, status: string, assignedTo: string, site: string, location: string }[];
}

const CheckOutForm: React.FC<CheckOutFormProps> = ({ selectedAssets }) => {
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
        <Typography component="h2"  sx={{ mb: 2 }}>Assets Pending Check-Out</Typography>
      <Table>
        <thead>
          <tr>
            <th>Asset Tag ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Assigned to</th>
            <th>Site</th>
            <th>Location</th>
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
            </tr>
          ))}
        </tbody>
      </Table>

      <Box mt={4}>
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <Input placeholder="Check-out Date" type="date" fullWidth />
          <RadioGroup name="checkout-to" defaultValue="person" sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography>Check-out to:</Typography>
            <Radio value="person" label="Person" />
            <Radio value="site" label="Site / Location" />
          </RadioGroup>
          <Select placeholder="Assign to">
            <Option value="person1">Person 1</Option>
            <Option value="person2">Person 2</Option>
          </Select>
          <Input placeholder="Due date" type="date" fullWidth />
        </Box>

        <Box mt={4} sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <Select placeholder="Site">
            <Option value="site1">Site 1</Option>
            <Option value="site2">Site 2</Option>
          </Select>
          <Select placeholder="Location">
            <Option value="location1">Location 1</Option>
            <Option value="location2">Location 2</Option>
          </Select>
          <Select placeholder="Department">
            <Option value="department1">Department 1</Option>
            <Option value="department2">Department 2</Option>
          </Select>
        </Box>

        <Box mt={4}>
          <Textarea placeholder="Check-out Notes" minRows={4} />
        </Box>

        <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox label="Send Email" sx={{ marginRight: 2 }} />
          <Input placeholder="Enter Email Address" fullWidth />
        </Box>

        <Box mt={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="plain" color="neutral" sx={{ marginRight: 2 }}>Cancel</Button>
          <Button variant="solid" color="primary">Check-Out</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOutForm;
