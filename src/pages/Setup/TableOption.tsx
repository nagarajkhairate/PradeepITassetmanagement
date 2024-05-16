import React from 'react'
import { Typography, Box,Table, Button, Radio, RadioGroup, Divider,Checkbox } from "@mui/joy";
import { AiFillDatabase } from "react-icons/ai";

const TableOption = () => {
  return (
    <>
       <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
        <Box
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              margin: {
                xs: "4px",
                md: "52px",
              },
              p:"20px"
            }}
          >
          <Typography><AiFillDatabase/>Asset Database Fields</Typography>
          <Box sx={{mt:"10px",ml:"25px"}}>
            <Box>
            <Typography level='body-xs'>Fill in the appropriate fields for your assets. Asset Tag ID and Asset Description are the only required fields. Check the boxes next to the field names you want to include.</Typography>
            </Box>
            <Box sx={{mt:"10px",}}>
            <Table borderAxis='both'>
              <thead>
              <tr>
              <th style={{ width: 30 }}><Checkbox /></th>
                      <th style={{ width: 180 }}>Field Name</th>
                      <th style={{ width: 200 }}>Date Required</th>
                      <th style={{ width: 400 }}>Description</th>
                      <th>Example</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Checkbox/></td>
                  <td>Asset Tag ID</td>
                  <td>
                    <RadioGroup defaultValue="outlined">

                  <Radio value="Yes" label="Yes" variant="outlined" />
                    </RadioGroup>
                  </td>
                  <td>
                  This field holds the unique asset id number that your company assigns to identify each asset. These are generally sequentially numbered labels with barcodes.
                  </td>
                  <td>A-1001</td>
                </tr>
                <tr>
                  <td><Checkbox/></td>
                  <td>Asset Description</td>
                  <td>
                    <RadioGroup defaultValue="outlined">

                  <Radio value="Yes" label="Yes" variant="outlined" />
                    </RadioGroup>
                  </td>
                  <td>
                 Description of the asset
                  </td>
                  <td>HP - Envy Desktop - 12GB Memory
- 2TB Hard Drive</td>
                </tr>
                <tr>
                  <td><Checkbox/></td>
                  <td>Purchase Date</td>
                  <td>
                    <RadioGroup defaultValue="outlined">
                      <Box sx={{display:'flex',width:"100%",gap:"10px"}}>

                  <Radio value="Yes" label="Yes" variant="outlined" />
                  <Radio value="Optional" label="Optional" variant="outlined" />
                      </Box>
                    </RadioGroup>
                  </td>
                  <td>
                 Date asset was purchased 
                  </td>
                  <td>08/22/2014</td>
                </tr>
                <tr>
                  <td><Checkbox/></td>
                  <td>Cost</td>
                  <td>
                    <RadioGroup defaultValue="outlined">
                      <Box sx={{display:'flex',width:"100%",gap:"10px"}}>

                  <Radio value="Yes" label="Yes" variant="outlined" />
                  <Radio value="Optional" label="Optional" variant="outlined" />
                      </Box>
                    </RadioGroup>
                  </td>
                  <td>
                  Cost of the asset
                  </td>
                  <td>Bs225.75</td>
                </tr>
                <tr>
                  <td><Checkbox/></td>
                  <td>Purchased From</td>
                  <td>
                    <RadioGroup defaultValue="outlined">
                      <Box sx={{display:'flex',width:"100%",gap:"10px"}}>

                  <Radio value="Yes" label="Yes" variant="outlined" />
                  <Radio value="Optional" label="Optional" variant="outlined" />
                      </Box>
                    </RadioGroup>
                  </td>
                  <td>
                  Vendor/Supplier name
                  </td>
                  <td>Amazon</td>
                </tr>
                <tr>
                  <td><Checkbox/></td>
                  <td>Brand</td>
                  <td>
                    <RadioGroup defaultValue="outlined">
                      <Box sx={{display:'flex',width:"100%",gap:"10px"}}>

                  <Radio value="Yes" label="Yes" variant="outlined" />
                  <Radio value="Optional" label="Optional" variant="outlined" />
                      </Box>
                    </RadioGroup>
                  </td>
                  <td>
                  Manufacturer of the asset
                  </td>
                  <td>HP</td>
                </tr>
                <tr>
                  <td><Checkbox/></td>
                  <td>Model</td>
                  <td>
                    <RadioGroup defaultValue="outlined">
                      <Box sx={{display:'flex',width:"100%",gap:"10px"}}>

                  <Radio value="Yes" label="Yes" variant="outlined" />
                  <Radio value="Optional" label="Optional" variant="outlined" />
                      </Box>
                    </RadioGroup>
                  </td>
                  <td>
                  Model name of the asset
                  </td>
                  <td>Envy</td>
                </tr>
                <tr>
                  <td><Checkbox/></td>
                  <td>Serial No</td>
                  <td>
                    <RadioGroup defaultValue="outlined">
                      <Box sx={{display:'flex',width:"100%",gap:"10px"}}>

                  <Radio value="Yes" label="Yes" variant="outlined" />
                  <Radio value="Optional" label="Optional" variant="outlined" />
                      </Box>
                    </RadioGroup>
                  </td>
                  <td>
                  Manufacturer's serial number
                  </td>
                  <td>HG9C3X</td>
                </tr>

              </tbody>
            </Table>
            <Divider sx={{my:"30px"}}></Divider>
            </Box>
          </Box>
          </Box>
        </div>
        </div>
    </>
  )
}

export default TableOption
