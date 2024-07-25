import  React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, IconButton, FormHelperText } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';

type FieldProps = {
  id: number;
  title: string;
  dataType: string;
  name: string;
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
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const baseUrl = process.env.REACT_APP_BASE_MAIN_URL || '';

const FileField: React.FunctionComponent<InputFieldProps> = ({ field, formData, handleFileChange }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData[field.name]) {
      setImagePreview(`${baseUrl}/${formData[field.name]}`);
    }
  }, [formData, field.name]);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);

      if (handleFileChange) {
        handleFileChange(e);
      }
    }
  };

  const handleDelete = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);

      const fileEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange && handleFileChange(fileEvent);
    }
  };

  const handleClickDropZone = () => {
    fileInputRef.current?.click();
  };

  return (
    <FormControl>
      <FormLabel sx={{ fontSize: '12px' }}>
        {field.title} {field.required && <span style={{ color: 'red' }}>*</span>}:
      </FormLabel>
      <Box>
        <Box
          component="section"
          onClick={handleClickDropZone}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{
            width: { xs: '100%', sm: '100%', md: '400px' },
            height: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f0f0',
            margin: 'auto',
            border: '2px dashed grey',
            textAlign: 'center',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {imagePreview ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                }}
              />
              <IconButton
                onClick={handleDelete}
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  "&:hover": { background: "none" }
                }}
              >
                <DeleteIcon sx={{ fontSize: '20px' }} />
              </IconButton>
            </Box>
          ) : (
            'Drop your image here'
          )}
        </Box>
      </Box>
      <input
        ref={fileInputRef}
        type="file"
        id="logo"
        name={field.name}
        accept="image/*"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <FormHelperText>Only (<strong>JPG, GIF, PNG</strong>) Allowed</FormHelperText>
    </FormControl>
  );
};

export default FileField;
