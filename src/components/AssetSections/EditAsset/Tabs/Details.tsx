import React, { useState } from "react";
import { Box, Typography, Table, Divider } from "@mui/joy";

const data = [
  {
    serialNo: "R4N0CV10F66116F",
    purchasedFrom: "M V InfoTech Solution",
    dateCreated: "04/15/2024 01:22 AM",
    createdBy: "Pranjna B",
  },
];
 
const Details = (props: any) => {
  const [detailData, setSetailData] = useState(props.assetDetail || {});
  const detailUpdater = (data: any)=>{
// to do --- state uupdate based on user modification

props.handleUpdatedData({ tabName :'assetDetail', tabsData: detailData
})
}

  return (
    <>
      <Box sx={{ paddingBottom: "20px" }}>
        <Typography level="h4">Asset Details</Typography>
      </Box>
      <Divider></Divider>
      <Box sx={{ mt: "20px" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
            gap:{md:"0",xs:"5px"}
          }}
        >
          <Box>
            <Typography>Miscellaneous</Typography>
          </Box>
          <Box sx={{ width: { md: "400px", xs: "100%" }, border: "1px solid black",overflowX:"auto" }}>
            <Table borderAxis="both">
              <tbody>
                <tr>
                  <th scope="row">Serial No.</th>
                  {/* <td>{data[0].serialNo}</td> */}
                  <td>{detailData.serialNo}</td>
                </tr>
              </tbody>
            </Table>
          </Box>
          <Box sx={{ width: { md: "400px", xs: "100%" }, border: "1px solid black",overflowX:"auto" }}>
            <Table borderAxis="both">
              <tbody>
                <tr>
                  <th scope="row">Purchased From</th>
                  {/* <td>{data[0].purchasedFrom}</td> */}
                  <td>{detailData.purchasedFrom}</td>
                </tr>
              </tbody>
            </Table>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: "20px" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { md: "row", xs: "column" },
          }}
        >
          <Box sx={{ width: "108px" }}>
            <Typography>Creation</Typography>
          </Box>
          <Box
            sx={{
              width: { md: "400px", xs: "100%" },
              border: "1px solid black",
              overflowX:"auto"
            }}
          >
            <Table borderAxis="both">
              <tbody>
                <tr>
                  <th scope="row">Date Created</th>
                  {/* <td>{data[0].dateCreated}</td> */}
                  <td>{detailData.dateCreated}</td>
                </tr>
              </tbody>
            </Table>
          </Box>
          <Box sx={{ width:{ md: "400px", xs: "100%" }, border: "1px solid black",overflowX:"auto" }}>
            <Table borderAxis="both">
              <tbody>
                <tr>
                  <th scope="row">Created By</th>
                  {/* <td>{data[0].createdBy}</td> */}
                  <td>{detailData.createdBy}</td>
                </tr>
              </tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Details;
