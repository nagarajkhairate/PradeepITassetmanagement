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
import AppForm from "../../components/Common/AppForm";
import { addCheckOut } from "../../redux/features/CheckOutSlice";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";

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
  const [open, setOpen] = useState(false);
  const [checkOutTo, setCheckOutTo] = useState("person"); // State to manage radio option
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [formData, setFormData] = useState({
    id: "",
    assignedTo: "",
    checkoutTo:"",
    checkOutDate: "",
    dueDate: "",
    checkOutSiteId: "",
    checkOutLocationId: "",
    checkOutDepartmentId: "",
    checkOutNotes: "",
    sendEmail: false,
    emailAddress: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(addCheckOut(formData))
    console.log(formData);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectChange = (name: string, newValue: string | null) => {
    setFormData({
      ...formData,
      [name]: newValue || ''
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOutTo(e.target.value); 
  };

  return (
    <AppForm onSubmit={handleFormSubmit}>
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
            <Input 
              placeholder="Check-out Date"
              type="date" 
              fullWidth 
              onChange={(e) =>
                setFormData({ ...formData, checkOutDate: e.target.value })
              }
            />
          </Box>

          <FormLabel>Optionally select Site, Location, Department of Asset to:</FormLabel>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <FormLabel>Check-out to:</FormLabel>
            </Box>
            <RadioGroup
              name="checkout_to"
              value={checkOutTo} // Use the state for radio group
              sx={{ display: "flex", alignItems: "center" }}
              onChange={handleRadioChange}
            >
              <Box>
                <Radio value="person" label="Person" />
                <Radio value="site" label="Site / Location" />
              </Box>
            </RadioGroup>
          </Box>

          {checkOutTo === "person" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: { md: "row", xs: "column" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <FormLabel>Assigned to:</FormLabel>
              <Select
                name="assignedTo"
                placeholder="Assign to"
                sx={{ width: "80%" }}
                value={formData.assignedTo}
                onChange={(event, newValue) =>
                  handleSelectChange('assignedTo', newValue as string)
                }
              >
                <Option value="Person 1">Person 1</Option>
                <Option value="Person 2">Person 2</Option>
              </Select>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Site:</FormLabel>
            <Select
              name="checkOutSiteId"
              placeholder="Site"
              sx={{ ml: "60px", width: "80%" }}
              value={formData.checkOutSiteId}
              onChange={(event, newValue) =>
                handleSelectChange('checkOutSiteId', newValue as string)
              }
            >
              <Option value="1">Site 1</Option>
              <Option value="2">Site 2</Option>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Location:</FormLabel>
            <Select
              name="checkOutLocationId"
              placeholder="Location"
              sx={{ ml: "40px", width: "80%" }}
              value={formData.checkOutLocationId}
              onChange={(event, newValue) =>
                handleSelectChange('checkOutLocationId', newValue as string)
              }
            >
              <Option value="1">Location 1</Option>
              <Option value="2">Location 2</Option>
            </Select>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <FormLabel>Department:</FormLabel>
            <Select
              name="checkOutDepartmentId"
              placeholder="Department"
              sx={{ ml: "20px", width: "80%" }}
              value={formData.checkOutDepartmentId}
              onChange={(event, newValue) =>
                handleSelectChange('checkOutDepartmentId', newValue as string)
              }
            >
              <Option value="1">Department 1</Option>
              <Option value="2">Department 2</Option>
            </Select>
          </Box>

          <Box sx={{ display: "flex" }}>
            <FormLabel>Due Date:</FormLabel>
            <Input 
              placeholder="Due Date"
              type="date" 
              fullWidth 
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </Box>

          <Textarea
            placeholder="Check Out Notes"
            minRows={3}
            name="checkOutNotes"
            value={formData.checkOutNotes}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Checkbox
            label="Send email to assigned person"
            name="sendEmail"
            checked={formData.sendEmail}
            onChange={handleChange}
          />
          {formData.sendEmail && (
            <Input
              placeholder="Email Address"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              sx={{ mt: 2, width: "100%" }}
            />
          )}
        </Box>
      </Box>

      <Box mt={4}>
        <Button type="submit">Check Out</Button>
      </Box>
    </Box>
    </AppForm>
  );
};

export default CheckOutForm;
