import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Typography, Button, Divider, Input, Checkbox, FormLabel } from "@mui/joy";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const CreateAccount: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [terms,setTerms]=useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
     // Check if passwords match when either password or confirm password changes
    if (name === "password" || name === "confirmPassword") {
    setPasswordsMatch(formData.password === newValue);
  }
  if(name==='agreeToTerms'){
    setTerms(formData.agreeToTerms===newValue)
  }
};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  console.log(formData);
  if (!formData.agreeToTerms) {
    // Display error message or take other action
    console.log("Please agree to terms");
  }
    console.log(formData);
  }

  return (
    <>
      <div style={{ width: "100%",background:"#f9f9f9" }}>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "450px",
                // height: "100%",
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

              <Box>
                <FormLabel htmlFor="firstName" sx={{ml:"10px"}}>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  sx={{ width: "350px", m: "10px", borderRadius: "15px" }}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="lastName" sx={{ml:"10px"}}>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  sx={{ width: "350px", m: "10px", borderRadius: "15px" }}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="email" sx={{ml:"10px"}}>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ width: "350px", m: "10px", borderRadius: "15px" }}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="password" sx={{ml:"10px"}}>Password</FormLabel>
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

              <Box>
                <FormLabel htmlFor="confirmPassword" sx={{ml:"10px"}}>Re-type Your Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Re-type Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  sx={{ width: "350px", m: "10px", borderRadius: "15px" }}
                />
                {!passwordsMatch && <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>Password does not match</span>}
              </Box>

              <Box sx={{ display: "flex", gap: "10px",mr:"30px" }}>
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  />
                  <Typography>I Agree to the Terms & Privacy Policy .</Typography>
              </Box>
                {submitted && !formData.agreeToTerms && <span style={{ color: 'red', fontSize: '12px', marginLeft: '10px' }}>Please agree to 'Terms of Service' and 'Privacy Policy'.</span>}
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
          </form>
        </Box>
      </div>
    </>
  );
};

export default CreateAccount;