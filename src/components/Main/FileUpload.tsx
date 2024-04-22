import React, { ChangeEvent, useState } from 'react';
import { Button } from '@mui/joy';
import { AiOutlinePlus } from 'react-icons/ai';

interface FileUploadProps {
  onFileSelect: (file: File, fileUrl: string) => void; // Callback to pass the selected file back to the parent component
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleFileUpload = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onFileSelect(file, fileUrl); // Invoke the callback with the selected file and its URL
    }
  };

  return (
    <>
      <Button
        onClick={handleFileUpload}
        sx={{
          paddingY: '10px',
          background: '#13b457',
          borderRadius: '15px',
          '&:hover': {
            backgroundColor: '#0d903f', // Slightly darker color on hover
          },
        }}
      >
        <AiOutlinePlus size={23} />
        Add Photo
      </Button>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
    </>
  );
};

export default FileUpload;