import { FormControl, FormLabel, Option, Select } from '@mui/joy'
import React, { FunctionComponent } from 'react'

interface SelectOptionProps {
    field: { fieldName: string; name: string; options: { value: string; label: string; }[] };
    formData: any;
     handleSelectChange: (
      value: string | null,
      name: string,
    ) => void;
  }
const SelectOption:FunctionComponent<SelectOptionProps> = ({  field, 
    formData, 
    handleSelectChange,}) => {

        const selectChange = (e: any, newValue: string | null) => {
            handleSelectChange(newValue, field.name);
          };
  return (
    <FormControl>
    <FormLabel>{field.fieldName}</FormLabel>
    <Select
      name={field.name}
      value={formData[field.name]}
      onChange={selectChange}
    //   sx={field.stylings}
    >
      {field.options?.map((option: any) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  </FormControl>
  )
}

export default SelectOption