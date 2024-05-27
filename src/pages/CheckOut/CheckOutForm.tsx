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
} from "@mui/joy";

interface CheckOutFormProps {
  selectedAssets: {
    id: string;
    description: string;
    status: string;
    assignedTo: string;
    site: string;
    location: string;
  }[];
}

const CheckOutForm: React.FC<CheckOutFormProps> = ({ selectedAssets }) => {
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
      <Typography component="h2" sx={{ mb: 2 }}>
        Assets Pending Check-Out
      </Typography>
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
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography>Check-out Date:</Typography>
            <Input placeholder="Check-out Date" type="date" fullWidth />
          </Box>


          <Typography level="body-md">Optionally select Site, Location , Department of Asset to :</Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <Typography>Check-out to:</Typography>
            </Box>
            <RadioGroup
              name="checkout-to"
              defaultValue="person"
              sx={{ display: "flex", alignItems: "center" }}
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
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>Site:</Typography>
            <Select placeholder="Site" sx={{width:"80%"}}>
              <Option value="site1">Site 1</Option>
              <Option value="site2">Site 2</Option>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>Assigned to:</Typography>
            <Select placeholder="Assign to"   sx={{width:"80%"}}>
              <Option value="person1">Person 1</Option>
              <Option value="person2">Person 2</Option>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>Location:</Typography>
            <Select placeholder="Location"  sx={{width:"80%"}}>
              <Option value="location1">Location 1</Option>
              <Option value="location2">Location 2</Option>
            </Select>
          </Box>


          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>Due date:</Typography>
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
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>Department:</Typography>
            <Select placeholder="Department"  sx={{width:"80%"}}>
              <Option value="department1">Department 1</Option>
              <Option value="department2">Department 2</Option>
            </Select>
          </Box>

          <Box
            mt={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography>Check-out Notes:</Typography>
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
              flexDirection: "row",
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
  );
};

export default CheckOutForm;
