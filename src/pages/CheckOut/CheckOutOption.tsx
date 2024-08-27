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
// import AddNewEmpployee from "./AddNewEmpployee";
// import AddNewClient from "./AddNewClient";
import SelectOption from "../../components/AssetSections/SelectOption";
import { checkOutConfig } from "../CheckOut/checkOutConfig";
import { fetchCheckOutField } from "../../redux/features/CheckOutFieldSlice";
import AppButton from "../../components/Common/AppButton";
import AddNewEmpployee from "./AddNewEmpployee";
import AddNewClient from "./AddNewClient";
import { fetchEmployee } from "../../redux/features/EmployeeSlice";

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
  open: boolean;
  onClose: () => void;
  id: string;
  assets: any;
}

const CheckOutOption: React.FC<CheckOutModalProps> = ({  open, onClose,id,assets }) => {
  const [formData, setFormData] = useState<any>({});
  const [sendEmail, setSendEmail] = useState<boolean>(false);
  const [checkOutTo, setCheckOutTo] = useState("person");
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const checkOut = useSelector((state: RootState) => state.checkOut.data);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const checkOutFields = useSelector((state: RootState) => state.checkOutField.data);

  useEffect(() => {
    dispatch(fetchCheckOut());
    dispatch(fetchCheckOutField())
    dispatch(fetchEmployee())
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (newValue: any, title: string) => {
    setFormData((prevData:any) => ({
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

    const dataToSubmit = {
      ...formData,
      assetId: id, // Ensure assetId is included in the submission data
    };

    dispatch(addCheckOut(dataToSubmit));
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
            <Input
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
        else if (field.name === "assignedTo") {
          return <AddNewEmpployee {...commonProps} />;
        }
        else if (field.name === "clientId") {
          return <AddNewClient {...commonProps} />;
        }else {
          return <SelectOption {...commonProps} />;
        }
      default:
        return null;
    }
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
              overflowY: "scroll",
              flexGrow: 1,
              py: 2,
              "&::-webkit-scrollbar": {
                width: "0.2em",
              }
            }}
          >
             {checkOutFields &&
              checkOutFields
                .filter(
                  (field) =>
                    checkOutTo === 'person' ||
                    (field.name !== 'assignedTo' && field.name !== 'clientId'),
                ).map((field, index) => (
              <React.Fragment key={index}>
                {handleInputValue(field, formData, handleChange, handleSelectChange, handleRadioChange)}
              </React.Fragment>
            ))}
          </Box>
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <AppButton onClick={handleCheckOut}>
              Submit
            </AppButton>
            <AppButton onClick={onClose}>
              Cancel
            </AppButton>
          </Box>
        </Box>
      </Modal>
    </AppForm>
  );
};

export default CheckOutOption;
