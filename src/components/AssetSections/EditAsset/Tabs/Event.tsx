// import React from "react";
// import { Box, Typography, Table, Divider } from "@mui/joy";


// const Event = () => {
//   return (
//     <>
//       <Box sx={{ paddingBottom: "20px" }}>
//         <Typography level="h4">Events</Typography>
//       </Box>
//       <Divider></Divider>
//       <Box sx={{ mt: "20px",overflowX:"auto" }}>
//         <Box sx={{ border: "1px solid black" }}>
//           <Table borderAxis="both" >
//             <tbody>
//               <tr>
//                 <th scope="row" style={{ width: "10%" }}>
//                   Check-out-Date
//                   <Typography level="body-sm">04/15/2024</Typography>
//                 </th>
//                 <td>Check Out</td>
//                 <td style={{ width: "30%" }}>
//                   Assigned To
//                   <Typography level="body-md" sx={{ color: "blue" }}>
//                     Prashant Nandaragi
//                   </Typography>
//                 </td>
//                 <td style={{ width: "10%" }}>
//                   Due date
//                   <Typography level="body-md">No Due Date</Typography>
//                 </td>
//                 <td style={{ width: "30%" }}>Check-out Notes</td>
//                 <td>Edit</td>
//               </tr>
//             </tbody>
//           </Table>
//         </Box>
//       </Box>


//     </>
//   );
// };

// export default Event;
import React from "react";
import { Box, Typography, Table, Divider } from "@mui/joy";
import { useTheme } from '@mui/material/styles';

const eventData = [
  {
    checkOutDate: "04/15/2024",
    assignedTo: "Prashant Nandaragi",
    dueDate: "No Due Date",
    checkOutNotes: "Initial checkout",
  },
  {
    checkOutDate: "04/15/2024",
    assignedTo: "Prashant Nandaragi",
    dueDate: "No Due Date",
    checkOutNotes: "Initial checkout",
  },
];

const Event = () => {
  const theme = useTheme();

  return (
    <>
      <Box sx={{ paddingBottom: "20px" }}>
        <Typography level="h4">Events</Typography>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          mt: "20px",
          overflowX: "auto",
          [theme.breakpoints.down('sm')]: {
            overflowX: "hidden",
            '& .responsiveTable': {
              border: "none",
              '& th, & td': {
                display: "block",
                width: "auto",
                textAlign: "left",
              },
              '& th': {
                fontWeight: "bold",
              },
              '& td': {
                paddingLeft: 0,
              },
              '& tr': {
                borderBottom: "1px solid",
                marginBottom: theme.spacing(2),
                paddingBottom: theme.spacing(2),
              },
            },
          },
        }}
      >
        <Box sx={{ border: "1px solid black" }}>
          <Table className="responsiveTable" borderAxis="both">
            <tbody>
              {eventData.map((event, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <th scope="row">Check-out-Date</th>
                    <td><Typography level="body-sm">{event.checkOutDate}</Typography></td>
                  </tr>
                  <tr>
                    <th scope="row">Assigned To</th>
                    <td><Typography level="body-md" sx={{ color: "blue" }}>{event.assignedTo}</Typography></td>
                  </tr>
                  <tr>
                    <th scope="row">Due date</th>
                    <td><Typography level="body-md">{event.dueDate}</Typography></td>
                  </tr>
                  <tr>
                    <th scope="row">Check-out Notes</th>
                    <td>{event.checkOutNotes}</td>
                  </tr>
                  <Box sx={{width:"100%",height:"55px"}}></Box>
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default Event;