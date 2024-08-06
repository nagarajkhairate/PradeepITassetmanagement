import { Box, Button, Option, Select, selectClasses, styled, SvgIcon, Typography } from "@mui/joy"
import React, { useState } from "react"
import AppView from "../../../components/Common/AppView"
import { KeyboardArrowDown } from "@mui/icons-material"
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export const ImportMaintenanceDue: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
          setSelectedFile(event.target.files[0]);
        }
      };
      
      

return (
<AppView>
<Typography level="h3">Import Wizard</Typography>
<Box
        sx={{
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#FFF',
          flexGrow: 1,
          marginTop: { xs: '10px', sm: '22px' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
         <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography
              level="h3"
              sx={{
                fontSize: '20px',
                fontWeight: 500,
                lineHeight: '30px',
                textAlign: { xs: 'center', md: 'left' },
                whiteSpace: 'nowrap',
                mt: 0,
              }}
            >
              Step 1: Upload File
            </Typography>

            <Typography
              sx={{
                p: 1,
              }}
            >
              Import maintenances using an Excel spreadsheet. Download our template, fill it in, and upload. Also download 'Field Limits Info' to make sure your data is within character limits for all fields. There is no limit on the number of maintenances you can have. But you can import up to 5,000 records in one spreadsheet.
            </Typography>
            
          </Box>
          </Box>

          <Box
          sx={{display:'flex', alignItems:'center', p:2,gap:2}}
          >
          <Typography
          sx={{marginRight:2, }}
          >
            Import To 
            </Typography>
            <Select
                    placeholder="Select"
                    indicator={<KeyboardArrowDown />}
                    sx={{
                        width: '26.5%',
                      [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                          transform: 'rotate(-180deg)',
                        },
                      },
                    }}
                  >
                    <Option value='Maintenance'>Maintenance</Option>
                    <Option value='Assets'>Assets</Option>
                    <Option value='SubCategory'>SubCategory</Option>
                  </Select>
         
          </Box>
          <Box
          sx={{display:'flex', alignItems:'center', gap:3}}
          >
          <Typography
          sx={{marginRight:2}}
          >
            Select File<span style={{ color: 'red' }}>*</span>
            </Typography>
            <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      color="neutral"
      
    >
        <CloudUploadTwoToneIcon/>
        {selectedFile ? selectedFile.name : 'Upload a file'}
      <VisuallyHiddenInput type="file" onChange={handleFileChange}/>
    </Button>
         
          </Box>
      </Box>
</AppView>
      )
    }
    export default React.memo(ImportMaintenanceDue)