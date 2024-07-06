import React, { useState, ChangeEvent } from "react";
import { Box, Typography, Button, Input, FormLabel, IconButton } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import  { loginAccount } from '../../redux/features/AuthSlice';
import { ThunkDispatch } from "redux-thunk";
import AppForm from "../Common/AppForm";
import { RootState } from "../../redux/store";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginAccount: React.FC = () => {
  const dispatch: ThunkDispatch<RootState,void, any> = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      valid = false;
    }

    setErrors(newErrors);
    if (valid) {
    try {
      const response = await dispatch(loginAccount(formData));
        
        if (response.meta.requestStatus === 'fulfilled') {
          // Assuming successful response contains status 201
          setLoginSuccess(true);
          navigate("/dashboard");
        } else {
          // Handle failed login
          setErrors({ ...newErrors, email: "Email or Password is not valid" });
          setLoginSuccess(false);
        }
      } catch (error) {
        console.error("Login failed:", error);
        setLoginSuccess(false);
      }
    }
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9", display:"flex",justifyContent:"center", alignItems:"center" , height:"100vh"}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
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
                background: "#ffffff",
              }}
            >
              <Typography level="h3">Login</Typography>
              <Box sx={{ width: "100%" }}>
                <FormLabel htmlFor="email" sx={{ ml: "10px" }}>
                  Email
                </FormLabel>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ width: "100%", m: "10px", borderRadius: "15px" }}
                  error={!!errors.email}
                />
                {errors.email && (
                <Typography level="body-sm"  sx={{ ml: "10px", color:"#dc3545" }}>
                  {errors.email}
                </Typography>
              )}
              </Box>

              <Box sx={{ width: "100%" , position: "relative" }}>
                <FormLabel htmlFor="password" sx={{ ml: "10px" }}>
                  Password
                </FormLabel>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ width: "100%", m: "10px", borderRadius: "15px" ,paddingRight: "40px"}}
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
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility  fontSize="small"/>}
              </IconButton>
              </div>
              {errors.password && (
                <Typography level="body-sm"  sx={{ ml: "10px", color:"#dc3545" }}>
                  {errors.password}
                </Typography>
              )}
              </Box>
              <Box sx={{ alignSelf: "flex-end", mr: "10px" }}>
                <Typography>Forgot Password?</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                alignItems: "center",
                }}
              >
               <Link to='/register'> <Typography> Create an account</Typography></Link>
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
                  Sign In
                </Button>
              </Box>
            </Box>
          </AppForm>
        </Box>
      </div>
    </>
  );
};

export default LoginAccount;
