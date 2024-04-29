import React, { useState } from "react";
import { Box, Typography, Button, Table } from "@mui/joy";

import { AiOutlinePrinter } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Asset {
  // discription:string;
  assetTagId: string;
  purchaseDate: string;
  cost: string;
  brand: string;
  model: string;
  site: string;
  location: string;
  category: string;
  department: string;
  assignedTo: string;
  status: string;
}

const data:Asset[]=[{
  // "discription":"HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB
  //   windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
  "assetTagId": "BBC-BLR-BKS-1029",
  "purchaseDate": "06/02/2024",
  "cost": "₹36,0000.00",
  "brand": "Asus VivoBook",
  "model": "VivoBook Go 14",
  "site": "Banashankari ",
  "location": "Bangalore",
  "category": "Computer Equipment",
  "department": "	RPO",
  "assignedTo": "Mr.X",
  "status": "Available",
}]

const EditAssetInfo: React.FC  = (props: any) => {
  const [assetInfodata, setAssetInfodata] = useState(props?.assetInfo || {});
  const handleUpadtes = (updatedFielddata: any)=>{   //{"assetTagId":e.target?.value}
        // TO-Do -  update based on user changes
    setAssetInfodata((prevState: any)=>({...prevState, ...updatedFielddata}))
  }
  const handleSubmitAssetInfo = ()=>{
    props?.dataUpdater({"assetInfo":assetInfodata}, "assetInfo");
  }

  return (
    <>
      <Box
        sx={{
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
          padding: "20px",
        }}
      >
        <Box>
          <Typography>
            HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB
            windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)
          </Typography>
        </Box>
        <Box
          sx={{
            my: 2,
            display: "flex",
            gap: "5px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Button
            sx={{
              background: "#767676",
              borderRadius: "15px",
              padding: "10px",
              paddingX: "35px",
              "&:hover": {
                backgroundColor: "#555555", // Slightly darker color on hover
              },
            }}
          >
            {" "}
            <AiOutlinePrinter size={23} /> Print
          </Button>
          <Button
            sx={{
              background: "#767676",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#555555", // Slightly darker color on hover
              },
            }}
          >
            {" "}
            <BiSolidPencil size={23} /> Edit Asset
          </Button>
          <Button
            sx={{
              background: "#13b457",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#0d903f", // Slightly darker color on hover
              },
            }}
          >
            More Actions <MdOutlineKeyboardArrowDown size={23} />{" "}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            width:"100%",
            justifyContent:"space-evenly",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
              width: { xs: "100%", md: "280px" },
              height: "250px",
            }}
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
              style={{ width: "100%", height:"200px"}}
              alt=""
            />
          </Box>
          <Box
            sx={{
              height: "265px",
              width: { md: "450px", xs: "100%" },
              border: "1px solid black",
              overflowX:"auto"
            }}
          >
            <Table borderAxis="both" sx={{}}>
              <tbody>
                <tr>
                  <th scope="row">Asset Tag ID</th>
                  {/* <td>{data[0].assetTagId}</td> */}
                  <td onChange={(e: any)=>handleUpadtes({"assetTagId":e.target?.value})}>{assetInfodata?.assetTagId}</td>
                </tr>
                <tr>
                  <th scope="row">Purchase Date</th>
                  {/* <td>{data[0].purchaseDate}</td> */}
                  <td>{assetInfodata?.purchaseDate}</td>
                </tr>
                <tr>
                  <th scope="row">Cost </th>
                  {/* <td>{data[0].cost}</td> */}
                  <td>{assetInfodata?.cost}</td>
                </tr>
                <tr>
                  <th scope="row">Brand</th>
                  {/* <td>{data[0].brand}</td> */}
                  <td>{assetInfodata?.brand}</td>
                </tr>
                <tr>
                  <th scope="row">Model</th>
                  {/* <td>{data[0].model}</td> */}
                  <td>{assetInfodata?.model}</td>
                </tr>
              </tbody>
            </Table>
          </Box>
          <Box sx={{ width: { md: "450px", xs: "100%" }, border: "1px solid black",overflowX:"auto" }}>
            <Table borderAxis="both">
              <tbody>
                <tr>
                  <th scope="row">Site</th>
                  {/* <td>{data[0].site}</td> */}
                  <td>{assetInfodata?.site}</td>
                </tr>
                <tr>
                  <th scope="row">Location</th>
                  {/* <td>{data[0].location}</td> */}
                  <td>{assetInfodata?.location}</td>
                </tr>
                <tr>
                  <th scope="row">Category </th>
                  {/* <td>{data[0].category}</td> */}
                  <td>{assetInfodata?.category}</td>
                </tr>
                <tr>
                  <th scope="row">Department</th>
                  {/* <td>{data[0].department}</td> */}
                  <td>{assetInfodata?.department}</td>
                </tr>
                <tr>
                  <th scope="row">Assigned To</th>
                  {/* <td>{data[0].assignedTo}</td> */}
                  <td>{assetInfodata?.assignedTo}</td>
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  {/* <td>{data[0].status}</td> */}
                  <td>{assetInfodata?.status}</td>
                </tr>
              </tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditAssetInfo;
