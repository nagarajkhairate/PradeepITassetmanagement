import * as React from 'react';
import { Box, FormControl, FormLabel, IconButton, Input, Typography, Button, FormHelperText } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileField: React.FunctionComponent<InputFieldProps> = ({ field, formData, handleFileChange }) => {
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);

      setFileName(file.name);

      if (handleFileChange) {
        handleFileChange(e);
      }
    }
  };

  const handleDelete = () => {
    setImagePreview(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
      };
      reader.readAsDataURL(file);

      setFileName(file.name);

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
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
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
          }}
        >
          {imagePreview ? (
            <Box>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                // width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <IconButton
            onClick={handleDelete}
            sx={{ position: 'absolute', top: 0, right: 0, "&:hover": { background: "none" } }}
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
        name="logo"
        accept="image/*"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
      <FormHelperText>Only (<strong>JPG, GIF, PNG</strong>) Allowed</FormHelperText>
    </FormControl>
  );
};

export default FileField;
