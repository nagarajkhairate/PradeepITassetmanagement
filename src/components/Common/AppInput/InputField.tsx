import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

type FieldProps = {
  id: number;
  title: string;
  dataType: 'text' | 'select' | 'file' | 'number';
  value: string;
  name: string;
  isRequired: boolean;
  sequence: number;
  format: string;
  className: {
    sm: number;
    md: number;
    lg: number;
  };
  
};

interface InputFieldProps {
  field: FieldProps;
  formData: any;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({ field, formData, handleInputChange }) => {

  const isAlphabetsAndSpacesOnly = (
    inputValue: string,
    validation: string
  ): boolean => {
    if (!field) return true;
    try {
      const regex = new RegExp(validation.replace(/^\/|\/$/g, ""));
      console.log(inputValue)
      return regex.test(inputValue.trim());
    } catch (error) {
      return false;
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const inputValue = e.target.value;
    isAlphabetsAndSpacesOnly(inputValue, field.format) || inputValue === ""
      ? handleInputChange(e)
      : null;
  };
console.log(field)
  return (
    <FormControl>
      <FormLabel>
      {field.title}{field.isRequired && <span style={{ color:"red"}}>*</span>}:
      </FormLabel>
      <Input
        // placeholder={field.title}
        value={formData[field.name] || ''} 
        name={field.name} 
        type={field.dataType} 
        onChange={handleChange}
        required={field.isRequired}
      />
      {/* <FormHelperText>This is a helper text.</FormHelperText> */}
    </FormControl>
  );
};

export default InputField;
