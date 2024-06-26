import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Typography, Button, Input, FormLabel } from "@mui/joy";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import  { loginAccount } from '../../Redux/features/AuthSlice';
import { ThunkDispatch } from "redux-thunk";
import AppForm from "../Common/AppForm";

const LoginAccount: React.FC = () => {
  const dispatch: ThunkDispatch<RootState,void, any> = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginAccount(formData))
      setLoginSuccess(true); 
    }catch (error) {
      console.error("Login failed:", error);
      setLoginSuccess(false); // Reset login success state if login fails
    }
  };

  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
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
                width: "450px",
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
              <Box>
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
                  sx={{ width: "350px", m: "10px", borderRadius: "15px" }}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="password" sx={{ ml: "10px" }}>
                  Password
                </FormLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ width: "350px", m: "10px", borderRadius: "15px" }}
                />
              </Box>
              <Box sx={{ ml: "220px" }}>
                <Typography>Forgot Password?</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-around",
                }}
              >
               <Link to='/createAccount'> <Typography> Create an account</Typography></Link>
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
