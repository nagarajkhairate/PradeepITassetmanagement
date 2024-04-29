import React, { useState,useEffect } from "react";
import { Typography, Box, Button, Select, Checkbox } from "@mui/joy";
import Table from "@mui/joy/Table";
import { CgSearch } from "react-icons/cg";
import { LuUpload } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { SlEye } from "react-icons/sl";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ListOfAssetsCard from "./ListOfAssetsCard";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetch_listAssets } from "../../Redux/Features/assetSlice";
import { RootState } from "../../Redux/Features/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

const data1 = [
  {
    AssetTagID: "BBC-BLR-BKS - 1014",
    Description:
      "HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
    Brand: "HP Pavilion",
    PurchaseDate: "06/03/2024",
    Cost: "70,800.00",
    Status: "Checked In",
    SerialNo: "8CG3250PAR",
    AssignedTo: "Piya V",
  },
  {
    AssetTagID: "BBC-BLR-BKS - 10e4",
    Description:
      "HP Pavillion 14-ek 1074TU Intel core i5 13th gen(14inch, 16GB, 512GB windows 11 home, MS Office 2021, Intel UHD,FHD IPS Display)",
    Brand: "HP Pavilion",
    PurchaseDate: "06/03/2024",
    Cost: "70,865.00",
    Status: "Checked In",
    SerialNo: "8CG3250PAR",
    AssignedTo: "Riya V",
  },
];

const ListOfAssets = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [listData, setListData] = useState(data1)
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, loading, error } = useSelector((state:RootState) => state.assets);
  console.log(data)
  console.log(loading)
  console.log(error)

  useEffect(() => {
    dispatch(fetch_listAssets());
  }, [dispatch]);



  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Typography level="h3">List Of Assets</Typography>
          <Box
            sx={{
              mt: "40px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box>
              <Button
                size="lg"
                sx={{
                  background: "#1BCAB8",
                  width: { md: "200px", xs: "100%" },
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
                    <CgSearch size={23} />
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: "20px",
                      marginTop: "-0.25rem",
                    }}
                  >
                    Search Criteria
                  </Typography>
                </Box>
              </Button>
            </Box>
            <Box>
              <Button
                size="lg"
                sx={{
                  mr: "20px",
                  background: "#11B456",
                  width: { md: "200px", xs: "100%" },
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
                    <LuUpload size={23} />
                  </Typography>
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: "20px",
                      marginTop: "-0.25rem",
                    }}
                  >
                    Export to exel
                  </Typography>
                </Box>
              </Button>
              <Button
                size="lg"
                sx={{
                  background: "#000000",
                  width: { md: "200px", xs: "100%" },
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
                    <IoSettingsOutline size={23} />
                  </Typography>

                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: "400",
                      fontSize: "20px",
                      marginTop: "-0.25rem",
                    }}
                  >
                    SetUp Column
                  </Typography>
                </Box>
              </Button>
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
                      <Checkbox  />
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
                      Assigned to
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
                  {listData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Checkbox  />
                      </td>
                      <td>{item.AssetTagID}</td>
                      <td>{item.Description}</td>
                      <td>{item.Brand}</td>
                      <td>{item.PurchaseDate}</td>
                      <td>{item.Cost}</td>
                      <td>{item.Status}</td>
                      <td>{item.SerialNo}</td>
                      <td>{item.AssignedTo}</td>
                      <td>
                        <SlEye size={20} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Box>
          )}
        </div>
      </div>
    </>
  );
};

export default ListOfAssets;
