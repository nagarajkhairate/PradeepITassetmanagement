import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { IconButton, Typography } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';

type FieldProps = {
  id: number;
  title: string;
  dataType: string;
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

const FileField: React.FunctionComponent<InputFieldProps> = ({ field, formData, handleInputChange }) => {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  
  if (file) {  
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);

    if (handleInputChange) {
      handleInputChange(e);
    }
  }
};

const handleDelete = () => {
  setImagePreview(null);
};

  return (
    <FormControl>
      <FormLabel>
        {field.title} <span>{field.required && '*'}</span>:
      </FormLabel>
      <Input
        placeholder={field.title}
        value={formData[field.value] || ''} 
        name={field.value} 
        type={field.dataType} 
        onChange={handleFileChange}
        required={field.required}
        style={{ display: imagePreview ? 'none' : 'block' }}
      />  
       {imagePreview && (
        <div style={{ marginTop: '10px', position: 'relative' }}>
          <img src={imagePreview} alt="Preview" style={{ height: "100px", width: "auto" }} />  
          <IconButton
            onClick={handleDelete}
            sx={{ position: 'relative', color: 'black' }}
          >
            <DeleteIcon />
          </IconButton>
        </div> 
      )} 
       <Typography level="body-xs">Only (JPG, GIF, PNG) Allowed</Typography> 
      <FormHelperText>This is a helper text.</FormHelperText>
    </FormControl>
  );
};

export default FileField;