import React, { useState } from "react";
import { Box, Typography, Table, Divider } from "@mui/joy";
import { useTheme,useMediaQuery } from "@mui/material/";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';



type HistoryItem = {
  date: string;
  event: string;
  field: string;
  changedFrom: string;
  changedTo: string;
  actionBy: string;
};

type historySortField = keyof HistoryItem;

const data: HistoryItem[] = [
  {
    date: "2023/02/02",
    event: "Check Out1",
    field: "Statuso",
    changedFrom: "Availablek",
    changedTo: "Checked Out2",
    actionBy: "Prajna B",
  },
  {
    date: "2023/02/03",
    event: "Check Out2",
    field: "Status",
    changedFrom: "Available32",
    changedTo: "Checked Out4",
    actionBy: "Prajna g",
  },
];

const History = (props: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [history, setHistory] = useState(data);
  const [historySortField, setHistorySortField] = useState("date");
  const [historySortDirection, setHistorySortDirection] = useState("asc");
  const [assetHistoryData, setassetHistoryData]=useState(props.assetHistory || []);
  const sortHistory = (field: keyof HistoryItem) => {
    const newSortDirection =
      field !== historySortField
        ? "asc"
        : historySortDirection === "asc"
          ? "desc"
          : "asc";

    // Update the state with the new sort field and direction for history
    setHistorySortField(field);
    setHistorySortDirection(newSortDirection);

    // Use the newSortDirection for sorting history
    const sortedHistory = [...history].sort((a, b) => {
      if (a[field] < b[field]) return newSortDirection === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newSortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Update the history state with the sorted array
    setHistory(sortedHistory);
  };
  const [historyData,setHistoryData] = useState(props.assetDetail || {})
  const historyUpdater = ()=>{
    props.handleUpdatedData({ tabName :'assetDetail', tabsData: historyData
})
}

  return (
    <>
      <Box sx={{ paddingBottom: "20px" }}>
        <Typography level="h4">History</Typography>
      </Box>
      <Divider></Divider>
      <Box
        sx={{
          mt: "20px",
        }}
      >
        {matches ? (
           <Box
           sx={{
             mt: "20px",
             overflowX: "auto",
             [theme.breakpoints.down("sm")]: {
               overflowX: "hidden",
               "& .responsiveTable": {
                 border: "none",
                 "& th, & td": {
                   display: "block",
                   width: "auto",
                   textAlign: "left",
                 },
                 "& th": {
                   fontWeight: "bold",
                 },
                 "& td": {
                   paddingLeft: 0,
                 },
                 "& tr": {
                   borderBottom: "1px solid",
                   marginBottom: theme.spacing(2),
                   paddingBottom: theme.spacing(2),
                 },
               },
             },
           }}
           >
           <Box sx={{ border: "1px solid black" }}>
             <Table 
            //  className="responsiveTable"
              borderAxis="both">
               <tbody>
                 {/* {history.map((doc, index) => (
                   <React.Fragment key={index}>
                     <tr>
                       <th scope="row" >
                         Date
                       </th>
                       <td>{doc.date}</td>
                     </tr>
                     <tr>
                       <th scope="row">Event</th>
                       <td>{doc.event}</td>
                     </tr>
                     <tr>
                       <th scope="row">Field</th>
                       <td>{doc.field}</td>
                     </tr>
                     <tr>
                       <th scope="row">Changed From</th>
                       <td>{doc.changedFrom}</td>
                     </tr>
                     <tr>
                       <th scope="row">Changed To</th>
                       <td>{doc.changedTo}</td>
                     </tr>
                     <tr>
                       <th scope="row">Action By</th>
                       <td>{doc.actionBy}</td>
                     </tr>
                     <Box sx={{ width: "100%", height: "55px" }}></Box>
                   </React.Fragment>
                 ))} */}
                  {assetHistoryData.length> 0 && assetHistoryData.map((doc: any, index: any) => (
                   <React.Fragment key={index}>
                     <tr>
                       <th scope="row" >
                         Date
                       </th>
                       <td>{doc.date}</td>
                     </tr>
                     <tr>
                       <th scope="row">Event</th>
                       <td>{doc.event}</td>
                     </tr>
                     <tr>
                       <th scope="row">Field</th>
                       <td>{doc.field}</td>
                     </tr>
                     <tr>
                       <th scope="row">Changed From</th>
                       <td>{doc.changedFrom}</td>
                     </tr>
                     <tr>
                       <th scope="row">Changed To</th>
                       <td>{doc.changedTo}</td>
                     </tr>
                     <tr>
                       <th scope="row">Action By</th>
                       <td>{doc.actionBy}</td>
                     </tr>
                     <Box sx={{ width: "100%", height: "55px" }}></Box>
                   </React.Fragment>
                 ))}
               </tbody>
             </Table>
           </Box>
       </Box>



     
        ):(
              <Table borderAxis="both" >
          <thead>
            <tr>
              <th onClick={() => sortHistory("date")}>
                <CalendarTodayIcon /> Date
                {historySortField === "date" &&
                  (historySortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortHistory("event")} style={{ width: "7%" }}>
                <InsertDriveFileIcon /> Event
                {historySortField === "event" &&
                  (historySortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortHistory("field")} style={{ width: "8%" }}>
                <EditIcon /> Field
                {historySortField === "field" &&
                  (historySortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortHistory("changedFrom")}>
                Changed from
                {historySortField === "changedFrom" &&
                  (historySortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortHistory("changedTo")}>
                Changed to
                {historySortField === "changedTo" &&
                  (historySortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortHistory("actionBy")}>
                <PersonIcon /> Action by
                {historySortField === "actionBy" &&
                  (historySortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((doc, index) => (
              <tr key={index}>
                <td>{doc.date}</td>
                <td>{doc.event}</td>
                <td>{doc.field}</td>
                <td>{doc.changedFrom}</td>
                <td>{doc.changedTo}</td>
                <td>{doc.actionBy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        )}
        
      

     
      </Box>
    </>
  );
};

export default History;
