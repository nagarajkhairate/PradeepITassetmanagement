import React, { useState, useEffect } from "react";
import { Select, Option, Button, Typography, Box, FormControl, FormHelperText, FormLabel } from '@mui/joy';

interface IndustryProps {
  field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
  formData: any;
  handleSelectChange: (
   
    value: string | null,
    name: string,
  ) => void;
}

const IndustryComponent: React.FC<IndustryProps> = (
  { field, 
    formData, 
    handleSelectChange
    }) => {


  const selectChange = (e: any, newValue: string | null) => {
    handleSelectChange(newValue, field.name);
  };

  const industries = [
    "Research & Development",
    "Infrastructure",
    "Product Development",
    "Marketing Campaign",
    "Process Improvement",
    "IT System Upgrade",
    "Construction Project",
    "Training Program",
    "Event Planning",
    "Policy Implementation",
    "Quality Assurance",
    "Financial Analysis",
    "Supply Chain Optimization",
    "Software Development",
    "Customer Service Enhancement",
    "Market Expansion",
    "Sustainability Initiative",
    "Data Analysis",
    "Human Resources Initiative",
    "Risk Management",
    "Others"
  ];

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "20px", mt: 2 , width:"100%"}}>
      <FormControl sx={{ width: '500px' }}>
        <FormLabel>{field.fieldName}</FormLabel>
        <Select
          placeholder="Select Industry"
          name={field.name}
          value={formData['industry']?.id as string}
          onChange={selectChange}
        >
          {industries.map((industry, index) => (
            <Option key={index} value={industry}>
              {industry}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default IndustryComponent;
