import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Select, Checkbox } from "@mui/joy";
import Table from "@mui/joy/Table";
import SearchIcon from '@mui/icons-material/Search';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useMediaQuery } from "@mui/material"; 
import { useTheme } from "@mui/material/styles";
import ListOfAssetsCard from "./ListOfAssetsCard";
import { useSelector, useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import AppView from "../../components/Common/AppView";
import { fetchAssets, fetchAssetsById } from "../../Redux/features/AssetSlice";
import { RootState } from "../../Redux/store";


// const data1 = [
//   {
//     id:1,
//     assetTagId: "BBC1014",
//     description:
//       "HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
//     brand: "HP Pavilion",
//     purchaseDate: "06/03/2024",
//     cost: "70,800.00",
//     status: "Checked In",
//     serialNumber: "8CG3250PAR",
//     assignedTo: "Piya V", 
//   },
//   {
//     id:2,
//     assetTagId: "BLR10e4",
//     description:
//       "HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
//     brand: "HP Pavilion",
//     purchaseDate: "06/03/2024",
//     cost: "70,865.00",
//     status: "Checked Out",
//     serialNumber: "8CG3250PAR",
//     assignedTo: "Riya V",
//   },
// ];

const ListOfAssets = () => {
  const assets = useSelector((state: RootState) => state.assets.data);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [listData, setListData] = useState<any[]>([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  useEffect(() => {
    // Merge the dummy data with fetched data
    const mergedData = [ ...assets];
    setListData(mergedData);
  }, [assets]);

  return (
    <AppView>
      <Typography level="h3">List Of Assets</Typography>
      <Box
        sx={{
          mt: "40px",
          width: "100%",
          display: "flex",
          justifyContent: isSmallScreen ? "center" : "space-between",
          flexDirection: { xs: "column", md: "row" },
          alignItems: isSmallScreen ? "center" : "flex-start",
        }}
      >
        <Box>
          <Button
            size="lg"
            sx={{
              background: "#1BCAB8",
              width: "200px",
              borderRadius: "15px",
              paddingInline: "0px",
              m: { xs: "10px", md: "none" },
              "&:hover": {
                background: "#1BCAB8",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "90%",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ color: "white" }}>
                <SearchIcon sx={{ size: "23" }} />
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: "20px",
                  marginTop: "-0.25rem",
                }}
              >
                <Link to='/assetsearchcriteria' style={{color:"inherit",textDecoration:"none"}}>
                  Search Criteria
                </Link>
              </Typography>
            </Box>
          </Button>
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          alignItems: isSmallScreen ? "center" : "flex-start",
          justifyContent: isSmallScreen ? "center" : "flex-start",
          width: isSmallScreen ? "100%" : "auto",
        }}>
          <Button
            size="lg"
            sx={{
              mr: "20px",
              background: "#11B456",
              width: "200px",
              borderRadius: "15px",
              paddingInline: "0px",
              m: { xs: "10px", md: "none" },
              "&:hover": {
                background: "#11B456",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "90%",
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ color: "white" }}>
                <FileUploadIcon sx={{ size: "23" }} />
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: "20px",
                  marginTop: "-0.25rem",
                }}
              >
                Export to Excel
              </Typography>
            </Box>
          </Button>
          <Link to="/assets/list-of-assets/set-up-columns" style={{ textDecoration: "none" }}>
            <Button
              size="lg"
              sx={{
                background: "#000000",
                width: "200px",
                borderRadius: "15px",
                paddingInline: "0px",
                m: { xs: "10px", md: "none" },
                "&:hover": {
                  background: "#000000",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "90%",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: "0.5rem",
                }}
              >
                <Typography sx={{ color: "white" }}>
                  <SettingsRoundedIcon sx={{ size: "23" }} />
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: "400",
                    fontSize: "20px",
                    marginTop: "-0.25rem",
                  }}
                >
                  Set Up Column
                </Typography>
              </Box>
            </Button>
          </Link>
        </Box>
      </Box>
      <Box sx={{ my: "20px", width: "90px" }}>
        <Select
          placeholder="10"
          sx={{ height: "55px", borderRadius: "15px" }}
        ></Select>
      </Box>

      {isSmallScreen ? (
        <ListOfAssetsCard />
      ) : (
        <Box
          sx={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Table>
            <thead>
              <tr>
                <th style={{ background: "#f9f9f9", borderBottom: "none" }}>
                  <Checkbox />
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                  }}
                >
                  Assets Tag ID
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                    width: "20%",
                  }}
                >
                  Description
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                  }}
                >
                  Brand
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                    width: "10%",
                  }}
                >
                  Purchase Date
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                  }}
                >
                  Cost
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                  }}
                >
                  Serial No.
                </th>
                <th
                  style={{
                    background: "#f9f9f9",
                    borderBottom: "none",
                    color: "#959595",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody
              style={{
                background: "white",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              {listData.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    <Checkbox />
                  </td>
                  <td>{item.assetTagId}</td>
                  <td>{item.description}</td>
                  <td>{item.brand}</td>
                  <td>{item.purchaseDate}</td>
                  <td>{item.cost}</td>
                  <td>{item.status}</td>
                  <td>{item.serialNumber}</td>
                  <td style={{ cursor: "pointer" }}>
                    <Link
                      // to={`/assets/view-an-asset`}
                      style={{ color: "inherit" }}
                      to={`/assets/view-an-asset/${item.id}`}
                    >
                      <RemoveRedEyeIcon sx={{ size: "20" }} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </AppView>
  );
};

export default ListOfAssets;
