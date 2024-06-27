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
  required: boolean;
  sequence: number;
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
  return (
    <FormControl>
      <FormLabel>
      {field.title}{field.required && <span style={{ color:"red"}}>*</span>}:
      </FormLabel>
      <Input
        // placeholder={field.title}
        value={formData[field.name] || ''} 
        name={field.name} 
        type={field.dataType} 
        onChange={handleInputChange}
        required={field.required}
      />
      {/* <FormHelperText>This is a helper text.</FormHelperText> */}
    </FormControl>
  );
};

export default InputField;
