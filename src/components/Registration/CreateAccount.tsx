import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Typography, Button, Divider, Input, Checkbox, FormLabel, IconButton } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { createAccount } from "../../redux/features/AccountSlice";
import AppForm from "../Common/AppForm";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsPrivacyPolicy: boolean;
}

const CreateAccount: React.FC = () => {
  const dispatch: ThunkDispatch<RootState,void, any> = useDispatch();
  const navigate = useNavigate();
  // const authState = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsPrivacyPolicy: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState(false);

  const [terms,setTerms]=useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
    
    if (name === "password" || name === "confirmPassword") {
    setPasswordsMatch(formData.password === newValue);
  }
  if(name==='termsPrivacyPolicy'){
    setTerms(formData.termsPrivacyPolicy===newValue)
  }
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);



    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = "First Name should contain only letters.";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last Name should contain only letters.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long, include at least one uppercase, one integer, and one special char.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.termsPrivacyPolicy) {
      newErrors.termsPrivacyPolicy = "Please agree to 'Terms of Service' and 'Privacy Policy'.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await dispatch(createAccount(formData));
        navigate('/');
      } catch (error) {
        console.error("Account creation failed:", error);
      }
    }
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div style={{ width: "100%",background:"#f9f9f9", display:"flex",justifyContent:"center", alignItems:"center" , height:"100vh"}}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppForm onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "90%", sm: "450px" },
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "15px",
                padding: "20px",
                background:"#ffffff"

              }}
            >
              <Typography level="h3">Create an Account</Typography>
              <Divider />
              <Box sx={{ width: { xs: "100%", sm: "100%", md: "350px"} }}>
                <FormLabel htmlFor="firstName" sx={{ml:"10px"}}>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{ width: { xs: "100%", sm: "100%", md: "350px" }, m: "10px", borderRadius: "15px" }}
                  error={!!errors.firstName}
                />
                {errors.firstName && (
                  <Typography level="body-sm"  sx={{ ml: "10px",color:"#dc3545",fontSize: '12px' }}>
                    {errors.firstName}
                  </Typography>
                )}
              </Box>

              <Box sx={{ width: { xs: "100%", sm: "100%", md: "350px"} }}>
                <FormLabel htmlFor="lastName" sx={{ml:"10px"}}>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{ width: { xs: "100%", sm: "100%", md: "350px" }, m: "10px", borderRadius: "15px" }}
                  error={!!errors.lastName}
                />
                 {errors.lastName && (
                  <Typography level="body-sm"  sx={{ ml: "10px",color:"#dc3545",fontSize: '12px' }}>
                    {errors.lastName}
                  </Typography>
                )}
              </Box>

              <Box sx={{width: { xs: "100%", sm: "100%", md: "350px"} }}>
                <FormLabel htmlFor="email" sx={{ml:"10px"}}>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ width: { xs: "100%", sm: "100%", md: "350px" }, m: "10px", borderRadius: "15px" }}
                  error={!!errors.email}
                />
                {errors.email && (
                  <Typography level="body-sm"  sx={{ ml: "10px",color:"#dc3545",fontSize: '12px' }}>
                    {errors.email}
                  </Typography>
                )}
              </Box>

              <Box sx={{width: { xs: "100%", sm: "100%", md: "350px"} , position: "relative" }}>
                <FormLabel htmlFor="password" sx={{ml:"10px"}}>Password</FormLabel>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ width: { xs: "100%", sm: "100%", md: "350px" }, m: "10px", borderRadius: "15px" }}
                  error={!!errors.password}
                />
                 <IconButton
                onClick={handleClickShowPassword}
                sx={{
                  position: "absolute",
                  right: "20px",
                  top: "60%",
                  transform: "translateY(-50%)",
                  verticalAlign:"middle",
                  padding: "10px",
                }}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
              </div>
                {errors.password && (
                  <Typography level="body-sm"  sx={{ ml: "10px",color:"#dc3545",fontSize: '12px' }}>
                    {errors.password}
                  </Typography>
                )}
              </Box>

              <Box sx={{width: { xs: "100%", sm: "100%", md: "350px"} ,position: "relative" }}>
                <FormLabel htmlFor="confirmPassword" sx={{ml:"10px"}}>Re-type Your Password</FormLabel>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                <Input
                   type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re-type Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{ width: { xs: "100%", sm: "100%", md: "350px" }, m: "10px", borderRadius: "15px" }}
                  error={!!errors.confirmPassword}
                />
                 <IconButton
                onClick={handleClickShowPassword}
                sx={{
                  position: "absolute",
                  right: "20px",
                  top: "60%",
                  transform: "translateY(-50%)",
                  verticalAlign:"middle",
                  padding: "10px",
                }}
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
              </div>
                {!passwordsMatch && <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>Password does not match</span>}
                {errors.confirmPassword && (
                  <Typography level="body-sm"  sx={{ ml: "10px",color:"#dc3545",fontSize: '12px' }}>
                    {errors.confirmPassword}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: "flex", gap: "10px",mr:"30px" }}>
                <Checkbox
                  name="termsPrivacyPolicy"
                  checked={formData.termsPrivacyPolicy}
                  onChange={handleChange}
                  />
                  <Typography>I Agree to the Terms & Privacy Policy .</Typography>
              </Box>
                {submitted && !formData.termsPrivacyPolicy && <span style={{ color: '#dc3545', fontSize: '12px', marginLeft: '10px' }}>Please agree to 'Terms of Service' and 'Privacy Policy'.</span>}
              <Divider />
              <Box sx={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                <Button
                  type="button"
                  size="lg"
                  sx={{
                    background: "white",
                    color: "black",
                    border: "1px solid black",
                    mr: "5px",
                    borderRadius: "15px",
                    "&:hover": {
                      background: "#e0e0e0",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  sx={{
                    
                    background: "#FABC1E",
                    color: "black",
                    borderRadius: "15px",
                    "&:hover": {
                      background: "#e0a800",
                    },
                  }}
                >
                Sign Up
                </Button>
              </Box>
            </Box>
          </AppForm>
        </Box>
      </div>
    </>
  );
};

export default CreateAccount;