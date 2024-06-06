import React from "react";
import { useState } from "react";
import { Box, Typography, Button, Table, Divider, } from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme,useMediaQuery } from "@mui/material/";

// Define a type for your document
type Document = {
  description: string;
  fileType: string;
  fileName: string;
  uploadDate: string;
  uploadBy: string;
};

// Define a type for the sortable fields
type SortField = keyof Document;

const data: Document[] = [
  {
    description: "invoice1",
    fileType: "PDF",
    fileName: "invoice1",
    uploadDate: "2023/01/01",
    uploadBy: "User A",
  }, 
  {
    description: "invoice2",
    fileType: "JPG",
    fileName: "invoice2",
    uploadDate: "2023/01/03",
    uploadBy: "User B",
  },
];

const Documents = (props: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [documents, setDocuments] = useState(data);

  const [sortField, setSortField] = useState("uploadDate");
  const [sortDirection, setSortDirection] = useState("asc");
  const[docData, setDocData] = useState(props.assetDocument || []);

  const sortDocuments = (field: keyof Document) => {
    // Determine the new sort direction
    const newSortDirection =
      field !== sortField ? "asc" : sortDirection === "asc" ? "desc" : "asc";

    // Update the state with the new sort field and sort direction
    setSortField(field);
    setSortDirection(newSortDirection);

    // Use the newSortDirection for sorting
    const sortedDocuments = [...documents].sort((a, b) => {
      if (a[field] < b[field]) return newSortDirection === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newSortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Update the documents state with the sorted array
    setDocuments(sortedDocuments);
  };
  const [docsData,setDocsData] = useState(props.assetDetail || {})
  const docsUpdater = ()=>{
    props.handleUpdatedData({ tabName :'assetDetail', tabsData: docsData
})
}

  return (
    <div>
      <Box
        sx={{
          paddingBottom: "20px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Typography level="h4">Documents</Typography>
        <Box>
          <Button
            sx={{
              paddingY: "10px",
              background: "#13b457",
              borderRadius: "15px",
              "&:hover": {
                backgroundColor: "#0d903f",
              },
            }}
          >
            <AddIcon size={23} />
            Add New
          </Button>
        </Box>
      </Box>
      <Divider></Divider>
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
        {matches ? (
          <Box sx={{ border: "1px solid black" }}>
          <Table className="responsiveTable" borderAxis="both">
            <tbody>
              <tr>
                <th scope="row">Description</th>
                <td>invoice 1</td>
              </tr>
              <tr>
                <th scope="row">File Type</th>
                <td>PDF</td>
              </tr>
              <tr>
                <th scope="row">File Name</th>
                <td>invoice1</td>
              </tr>
              <tr>
                <th scope="row">Upload Date</th>
                <td>2023/01/01</td>
              </tr>
              <tr>
                <th scope="row">Upload By</th>
                <td>User A</td>
              </tr>
              <tr>
                <th scope="row">Action</th>
                <td>
                  <Button
                    sx={{
                      marginRight: "3px",
                      background: "white",
                      border: "1px solid #13b457",
                      color: "#13b457",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "#13b457",
                        color: "white",
                      },
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    sx={{
                      background: "white",
                      border: "1px solid red",
                      color: "red",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "red",
                        color: "white",
                      },
                    }}
                  >
                    Detach
                  </Button>
                </td>
              </tr>
              <Box sx={{ width: "100%", height: "55px" }}></Box>
            </tbody>
          </Table>
        </Box>
        ) :(
          <Table borderAxis="both">
          <thead>
            <tr>
              <th
              onClick={() => sortDocuments("description")}>
                <DescriptionIcon /> Description{" "}
                {sortField === "description" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortDocuments("fileType")}>
                <InsertDriveFileIcon /> File Type{" "}
                {sortField === "fileType" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortDocuments("fileName")}>
                <DescriptionIcon /> File Name{" "}
                {sortField === "fileName" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortDocuments("uploadDate")}>
                <CalendarTodayIcon /> Upload Date{" "}
                {sortField === "uploadDate" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th onClick={() => sortDocuments("uploadBy")}>
                <PersonIcon /> Upload By{" "}
                {sortField === "uploadBy" &&
                  (sortDirection === "asc" ? (
                    <ArrowUpwardIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  ))}
              </th>
              <th>
                <EditIcon /> Action
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td>{doc.description}</td>
                <td>{doc.fileType}</td>
                <td>{doc.fileName}</td>
                <td>{doc.uploadDate}</td>
                <td>{doc.uploadBy}</td>
                <td>
                  <Button
                    sx={{
                      marginRight: "3px",
                      background: "white",
                      border: "1px solid #13b457",
                      color: "#13b457",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "#13b457",
                        color: "white",
                      },
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    sx={{
                      background: "white",
                      border: "1px solid red",
                      color: "red",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "red",
                        color: "white",
                      },
                    }}
                  >
                    Detach
                  </Button>
                </td>
              </tr>
            ))}
            {/* {docData.map((doc: any, index: any) => (
              <tr key={index}>
                <td>{doc.description}</td>
                <td>{doc.fileType}</td>
                <td>{doc.fileName}</td>
                <td>{doc.uploadDate}</td>
                <td>{doc.uploadBy}</td>
                <td>
                  <Button
                    sx={{
                      marginRight: "3px",
                      background: "white",
                      border: "1px solid #13b457",
                      color: "#13b457",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "#13b457",
                        color: "white",
                      },
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    sx={{
                      background: "white",
                      border: "1px solid red",
                      color: "red",
                      borderRadius: "15px",
                      "&:hover": {
                        backgroundColor: "red",
                        color: "white",
                      },
                    }}
                  >
                    Detach
                  </Button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </Table>
        )}
        
       
      </Box>
    </div>
  );
};

export default Documents;
