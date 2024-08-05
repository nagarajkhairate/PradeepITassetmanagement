import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormHelperText from '@mui/joy/FormHelperText';

type FieldProps = {
  id: number;
  title: string;
  dataType: 'text' | 'select' | 'file' | 'number' | 'radio';
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
  options?: { label: string; value: string }[];
};

interface RadioButtonProps {
  field: FieldProps;
  formData: any;
  handleRadioChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FunctionComponent<RadioButtonProps> = ({ field, formData, handleRadioChange }) => {
  return (
    <FormControl>
      <FormLabel>
        {field.title}{field.isRequired && <span style={{ color: 'red' }}>*</span>}:
      </FormLabel>
      <RadioGroup
        name={field.name}
        value={formData[field.name] || ''}
        onChange={handleRadioChange}
      >
        {field.options && field.options.map((option) => (
          <Radio key={option.value} value={option.value} label={option.label} />
        ))}
      </RadioGroup>
      {/* <FormHelperText>This is a helper text.</FormHelperText> */}
    </FormControl>
  );
};

export default RadioButton;
