import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';

type FieldProps = {
  id: number;
  title: string;
  value: string;
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
        {field.title} <span>{field.required && '*'}</span>:
      </FormLabel>
      <Input
        placeholder={field.title}
        value={formData[field.value]} 
        name={field.value} 
        onChange={handleInputChange} // Pass field.value to handleInputChange
        required={field.required}
      />
      <FormHelperText>This is a helper text.</FormHelperText>
    </FormControl>
  );
};

export default InputField;
