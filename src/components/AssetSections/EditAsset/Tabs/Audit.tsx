import React from 'react'
import {
  Box,
  Typography,
  Table,
  Divider,

} from "@mui/joy";

const Audit = () => {
  return (
    <>
      <Box sx={{ paddingBottom: "20px" }}>
                <Typography level="h4">Audit</Typography>
              </Box>
              <Divider></Divider>
              <Box sx={{ mt: "20px" }}>
                <Table borderAxis="both">
                  <thead>
                    <tr>
                      <th>Audit Name</th>
                      <th>Last Audited By</th>
                      <th>Audit Date</th>
                      <th>Site</th>
                      <th>Location</th>
                      <th>Notes</th>
                      <th>Map</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </Box>
    </>
  )
}

export default Audit
