import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/joy";
import FileUpload from "../../../Main/FileUpload";

interface PhotoInfoProps {
  id: string;
  assets: any;
}

const Photos: React.FC<PhotoInfoProps> = ({ id, assets }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFileUrls, setSelectedFileUrls] = useState<string[]>([]);
  
  const baseUrl = process.env.REACT_APP_BASE_MAIN_URL || '';
  const photoUrl = assets.assetPhoto ? `${baseUrl}${assets.assetPhoto}` : null;

  useEffect(() => {
    // Initialize the file URL array with the fetched photoUrl if available
    if (photoUrl) {
      setSelectedFileUrls([photoUrl]);
    }
  }, [photoUrl]);

  const handleFileSelect = (file: File, fileUrl: string) => {
    setSelectedFiles((prevFiles) => [...prevFiles, file]);
    setSelectedFileUrls((prevUrls) => [...prevUrls, fileUrl]);
  };

  return (
    <>
      <Box
        sx={{
          paddingBottom: "20px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: { md: "row", xs: "column" }
        }}
      >
        <Typography level="h4">Photos</Typography>
        <Box>
          <FileUpload onFileSelect={handleFileSelect} />
        </Box>
      </Box>
      <Divider />
      <Box sx={{ mt: "20px" }}>
        {selectedFileUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded ${index + 1}`}
            style={{ maxWidth: "100%", maxHeight: "400px", marginBottom: "10px" }}
          />
        ))}
      </Box>
    </>
  );
};

export default Photos;
