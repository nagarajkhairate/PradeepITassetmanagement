import React from 'react';
import { Select, MenuItem,SelectChangeEvent } from '@mui/material';
import {Box,Typography} from '@mui/joy'

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void; // Adjusted type of onChange function
  options: string[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options, error }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value as string);
  };


  return (
    <Box>
        <Typography>{label}</Typography>
      <Select
        value={value}
        onChange={handleChange}
        sx={{ borderRadius: "15px",width:"100%",height:"46px" }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
      {error && (
        <Typography level="body-xs" sx={{ color: "red", mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default SelectField;
