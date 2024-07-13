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
import { fetchAssets, fetchAssetsById } from "../../redux/features/AssetSlice";
import { RootState } from "../../redux/store";

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
    const camelCaseAssets = assets.map((asset: any) => ({
      ...asset,
      assetName: camelCaseFirstLetter(asset.assetName),
      assetTagId: camelCaseFirstLetter(asset.assetTagId),
      description: camelCaseFirstLetter(asset.description),
      brand: camelCaseFirstLetter(asset.brand),
      purchaseDate: camelCaseFirstLetter(asset.purchaseDate),
      status: camelCaseFirstLetter(asset.status),
    }));
    setListData(camelCaseAssets);
  }, [assets]);

  const camelCaseFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <AppView>
      <Typography level="h3">List Of Assets</Typography>
      <Box
        sx={{
          borderRadius: 'none',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          background: '#ffffff',
          gap: '5px',
          padding: 2,
        }}
      >
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
            size="md" 
            sx={{
              background: "#1BCAB8",
              // width: "200px",
              borderRadius: "15px",
              // paddingInline: "0px",
              m: { xs: "10px", md: "none" },
              "&:hover": {
                background: "#17a299",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap:1,
                // width: "90%",
                // justifyContent: "space-around",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ color: "white" }}>
                <SearchIcon 
                // sx={{ size: "23" }}
                 />
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  // fontWeight: "400",
                  // fontSize: "20px",
                  marginTop: "-0.25rem",
                }}
              >
                Search Criteria
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
            size="md" 
            sx={{
              mr: "20px",
              background: "#11B456",
              // width: "200px",
              borderRadius: "15px",
              // paddingInline: "0px",
              m: { xs: "10px", md: "none" },
              '&:hover': { backgroundColor: 'darkgreen' },
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap:1,
                // width: "90%",
                // justifyContent: "space-around",
                alignItems: "center",
                marginTop: "0.5rem",
              }}
            >
              <Typography sx={{ color: "white" }}>
                <FileUploadIcon 
                // sx={{ size: "23" }} 
                />
              </Typography>
              <Typography
                sx={{
                  color: "white",
                  // fontWeight: "400",
                  // fontSize: "20px",
                  marginTop: "-0.25rem",
                }}
              >
                Export to Excel
              </Typography>
            </Box>
          </Button>
          {/* Uncomment the following section when needed */}
          {/* <Link to="/assets/list-of-assets/set-up-columns" style={{ textDecoration: "none" }}>
            <Button
              size="md" // Medium size
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
          </Link> */}
        </Box>
      </Box>
      <Box sx={{ my: "20px", width: "80px" }}>
        <Select
          placeholder="10"
          sx={{ height: "40px", borderRadius: "15px" }}
        ></Select>
      </Box>
     
      {isSmallScreen ? (
        <ListOfAssetsCard data={listData} />
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
                  Asset Name
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
                  <td>{item.assetName}</td>
                  <td>{item.assetTagId}</td>
                  <td>{item.description}</td>
                  <td>{item.brand}</td>
                  <td>{item.purchaseDate}</td>
                  <td>{item.cost}</td>
                  <td>{item.status}</td>
                  <td>{item.serialNumber}</td>
                  <td style={{ cursor: "pointer" }}>
                    <Link
                      to={`/assets/view-an-asset/${item.id}`}
                      style={{ color: "inherit" }}
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
       </Box>
    </AppView>
  );
};

export default ListOfAssets;
