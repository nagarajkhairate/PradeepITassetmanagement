import React from 'react'
import {Box,Typography,Input} from '@mui/joy'

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

const InputField: React.FC<CustomInputProps> = ({ label, value, onChange, error, type = "text" }) => {
  return (
    <Box>
      <Typography>{label}</Typography>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        sx={{ borderRadius: "15px", height: "46px"}}
      />
      {error && (
        <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default InputField
 