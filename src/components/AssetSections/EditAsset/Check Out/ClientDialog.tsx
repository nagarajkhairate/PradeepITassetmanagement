import React, { useState } from "react";
import { Box, Typography, Button, Divider } from "@mui/joy";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux/store";
import InputField from "../../../Common/Input";
import SelectField from "../../../Common/Select";
import {post_add_client} from "../../../../Redux/features/clientSlice";

interface ClientData {
  person_name: string;
  company: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  phone_number: string;
  website: string;
  registration_date: string;
  tele_phone: string;
  industry: string;
  status: string;
}

interface ClientErrors {
  person_name?: string;
  company?: string;
  email?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  phone_number?: string;
  website?: string;
  registration_date?: string;
  tele_phone?: string;
  industry?: string;
  status?: string;
}

const ClientDialog = (props: any) => {
  const [client, setClient] = useState<ClientData>({
    person_name: "",
    company: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    phone_number: "",
    tele_phone: "",
    website: "",
    registration_date: "",
    industry: "",
    status: "",
  });

  const [errors, setErrors] = useState<ClientErrors>({});
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  const validateForm = (): boolean => {
    let tempErrors: ClientErrors = {};
    let isValid = true;

    if (!client.person_name) {
      tempErrors.person_name = "Full name is required";
      isValid = false;
    }
    if (!client.company) {
      tempErrors.company = "Company is required";
      isValid = false;
    }
    if (!client.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }
    if (!client.street) {
      tempErrors.street = "Street is required";
      isValid = false;
    }
    if (!client.city) {
      tempErrors.city = "City is required";
      isValid = false;
    }
    if (!client.state) {
      tempErrors.state = "State is required";
      isValid = false;
    }
    if (!client.zip_code) {
      tempErrors.zip_code = "Zip code is required";
      isValid = false;
    }
    if (!client.country) {
      tempErrors.country = "Country is required";
      isValid = false;
    }
    if (!client.phone_number) {
      tempErrors.phone_number = "Phone number is required";
      isValid = false;
    }
    if (!client.registration_date) {
      tempErrors.registration_date = "Registration date is required";
      isValid = false;
    }
    if (!client.industry) {
      tempErrors.industry = "Industry is required";
      isValid = false;
    }
    if (!client.status) {
      tempErrors.status = "Status is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (validateForm()) {

      console.log("Client Data: ", client);
      props.onAddClient(client.person_name);
      dispatch(post_add_client(client))
    }
    setClient({
      person_name: "",
      company: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "",
      phone_number: "",
      tele_phone: "",
      website: "",
      registration_date: "",
      industry: "",
      status: "",
    }) 
    setErrors({})
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography>Add Client</Typography>
          <IconButton onClick={props.onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <InputField
          label="Name"
          value={client.person_name}
          onChange={(e) => setClient({ ...client, person_name: e.target.value })}
          error={errors.person_name}
        />
        <InputField
          label="company"
          value={client.company}
          onChange={(e) => setClient({ ...client, company: e.target.value })}
          error={errors.company}
        />
        <InputField
          label="Email"
          value={client.email}
          onChange={(e) => setClient({ ...client, email: e.target.value })}
          error={errors.email}
        />
        <InputField
          label="Street"
          value={client.street}
          onChange={(e) => setClient({ ...client, street: e.target.value })}
          error={errors.street}
        />
        <InputField
          label="City"
          value={client.city}
          onChange={(e) => setClient({ ...client, city: e.target.value })}
          error={errors.city}
        />
        <InputField
          label="State"
          value={client.state}
          onChange={(e) => setClient({ ...client, state: e.target.value })}
          error={errors.state}
        />
        <InputField
          label="Zip Code"
          value={client.zip_code}
          onChange={(e) => setClient({ ...client, zip_code: e.target.value })}
          error={errors.zip_code}
        />
        <InputField
          label="Country"
          value={client.country}
          onChange={(e) => setClient({ ...client, country: e.target.value })}
          error={errors.country}
        />
        <InputField
          label="Phone Number"
          value={client.phone_number}
          onChange={(e) => setClient({ ...client, phone_number: e.target.value })}
          error={errors.phone_number}
        />
        <InputField
          label="TelePhone"
          value={client.tele_phone}
          onChange={(e) => setClient({ ...client, tele_phone: e.target.value })}
          error={errors.tele_phone}
        />
        <InputField
          label="Website"
          value={client.website}
          onChange={(e) => setClient({ ...client, website: e.target.value })}
          error={errors.website}
        />
        <InputField
          label="Registration Date"
          value={client.registration_date}
          onChange={(e) => setClient({ ...client, registration_date: e.target.value })}
          error={errors.registration_date}
          type="date"
        />
        <SelectField
          label="Industry"
          value={client.industry}
          onChange={(value) => setClient({ ...client, industry: value })}
          options={["Technology", "Finance", "Healthcare", "Education"]}
          error={errors.industry}
        />
        <SelectField
          label="Status"
          value={client.status}
          onChange={(value) => setClient({ ...client, status: value })}
          options={["Active", "Inactive"]}
          error={errors.status}
        />
      </DialogContent>
      <DialogActions sx={{border:"1px solid #E0E1E3"}}>
        <Button
          sx={{
            background: "rgb(245,193,67)",
            "&:hover": { backgroundColor: "rgb(255,199,79)" },
            borderRadius: "15px"
          }}
          onClick={handleAdd}
        >
          Add
        </Button>
        <Button
          onClick={props.onClose}
          sx={{
            background: "white",
            color: "black",
            border: "1px solid black",
            "&:hover": { backgroundColor: "#f9f9f9" },
            borderRadius: "15px"
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientDialog;
