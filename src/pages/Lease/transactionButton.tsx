import React, { useEffect, useState } from "react";
import {
  Box,
  FormLabel,
  Button,
  Divider,
  Input,
  Textarea,
  Checkbox,
  Select,
  Option,
  Modal,
  IconButton,
  FormControl,
  Typography,
  RadioGroup,
  Radio,
} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addCheckOut, fetchCheckOut } from "../../redux/features/CheckOutSlice";
import AppForm from "../../components/Common/AppForm";
import SiteComponent from "../../components/AssetSections/SiteComponent";
import LocationComponent from "../../components/AssetSections/LocationComponent";
import DepartmentComponent from "../../components/AssetSections/DepartmentComponent";
import AddNewEmpployee from "./AddNewEmpployee";
import AddNewClient from "./AddNewClient";
import SelectOption from "../../components/AssetSections/SelectOption";

interface FormData {
  employeeId: string;
  assetId: string;
  checkOutDate: string;
  assignedTo: string;
  client: string;
  dueDate: string;
  checkOutSiteId: string;
  checkOutLocationId: string;
  checkOutDepartmentId: string;
  checkOutNotes: string;
  emailAddress?: string;
}

interface CheckoutErrors {
  employeeId?: string;
  assetId?: string;
  checkOutDate?: string;
  assignedTo?: string;
  client?: string;
  dueDate?: string;
  checkOutSiteId?: string;
  checkOutLocationId?: string;
  checkOutDepartmentId?: string;
  checkOutNotes?: string;
  emailAddress?: string;
}

interface CheckOutModalProps {
  selectedAssets: any;
  open: boolean;
  onClose: () => void;
}

const CheckOutModal: React.FC<CheckOutModalProps> = ({ selectedAssets, open, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    employeeId: "",
    assetId: "",
    checkOutDate: "",
    assignedTo: "",
    client: "",
    dueDate: "",
    checkOutSiteId: "",
    checkOutLocationId: "",
    checkOutDepartmentId: "",
    checkOutNotes: "",
  });
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [checkOutTo, setCheckOutTo] = useState("person");
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const checkOut = useSelector((state: RootState) => state.checkOut.data);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  useEffect(() => {
    dispatch(fetchCheckOut());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (newValue: any, title: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [title]: newValue,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCheckOutTo(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData((prevData) => {
      const formData = {
        ...prevData,
        assetId: selectedAssets[0].id,
      };

      console.log(JSON.stringify(formData));
      dispatch(addCheckOut(formData));

      return formData;
    });
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
    handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
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
        } else if (field.name === "assignedTo") {
          return <AddNewEmpployee {...commonProps} />;
        } else if (field.name === "clientId") {
          return <AddNewClient {...commonProps} />;
        } else {
          return <SelectOption {...commonProps} />;
        }
      default:
        return null;
    }
  };

  const [newDialogOpen, setNewDialogOpen] = useState<boolean>(false);
  const [newClientDialogOpen, setNewClientDialogOpen] = useState<boolean>(false);

  const openClientDialog = () => {
    setNewClientDialogOpen(true);
  };

  const closeClientDialog = () => {
    setNewClientDialogOpen(false);
  };

  const openNewDialog = () => {
    setNewDialogOpen(true);
  };

  const closeNewDialog = () => {
    setNewDialogOpen(false);
  };

  return (
    <AppForm onSubmit={handleCheckOut}>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            borderRadius: 1,
            bgcolor: "#fff",
            p: 4,
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
              pb: 1,
            }}
          >
            <Typography level="h4">Check Out</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box
            sx={{
              overflowY: "auto",
              flexGrow: 1,
              py: 2,
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {fields.map((field) => (
              <React.Fragment key={field.fieldName}>
                {handleInputValue(field, formData, handleChange, handleSelectChange, handleRadioChange)}
              </React.Fragment>
            ))}
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
            <Button onClick={onClose} color="neutral" variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </AppForm>
  );
};

export default CheckOutModal;
