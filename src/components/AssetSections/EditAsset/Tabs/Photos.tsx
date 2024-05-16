import React,{useState} from "react";
import {
  Box,
  Typography,
  Divider,

} from "@mui/joy"; 
import FileUpload from "../../../Main/FileUpload";

const Photos = (props: any) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [photosData,setPhotosData] = useState(props.assetDetail || {})
  const photosUpdater = ()=>{
    props.handleUpdatedData({ tabName :'assetDetail', tabsData: photosData
})
  }
  return (
    <>
      <Box
        sx={{
          paddingBottom: "20px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection:{md:"row",xs:"column"}
        }}
      >
        <Typography level="h4">Photos</Typography>
        <Box>
          <FileUpload
            onFileSelect={(file: File, fileUrl: string) => {
              console.log(file, "Selected file"); // Optionally log the file or handle it as needed
              setSelectedFile(file);
              setSelectedFileUrl(fileUrl);
            }}
          />
        </Box>
      </Box>
      <Divider></Divider>
      <Box sx={{ mt: "20px" }}>
        {selectedFileUrl && (
          <img
            src={selectedFileUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        )}
      </Box>
    </>
  );
};

export default Photos;
