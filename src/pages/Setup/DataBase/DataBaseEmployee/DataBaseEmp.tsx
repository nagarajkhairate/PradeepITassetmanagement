
import { Typography, Radio, RadioGroup, Divider, Grid } from "@mui/joy";
import ButtonGroup from "@mui/joy/ButtonGroup";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/joy";
import Table from "@mui/joy/Table";
import Checkbox from "@mui/joy/Checkbox";
import Button from "@mui/joy/Button";
import { FormControl } from "@mui/joy";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined';
import AddDataBaseEmp from "./AddDataBaseEmp";
import EditDataBaseEmp from "./EditDataBaseEmp";
import AppView from "../../../../components/Common/AppView";
import SignpostOutlinedIcon from '@mui/icons-material/SignpostOutlined'
import { ThunkDispatch } from "redux-thunk";
// import { RootState } from "../../../Redux/store";
import { useDispatch, useSelector } from "react-redux";


const dataBaseTable = [
  {
    id: 1,
    title: "Full Name ",
    name: "fullName",
    option: [
      {
        id: 1,
        value: "yes",
      },
    ],
    description:
      "Full name of the person / employee.",
    example: "John Doe",
  },
  {
    id: 2,
    title: "Email",
    name: "email",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "Email of the person",
    example: "johndoe@example.com",
  },
  {
    id: 3,
    title: "Employee ID",
    name: "employeeID",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "For example Employee ID, Student ID, etc.",
    example: "IT-1234",
  },
  {
    id: 4,
    title: "Title",
    name: "title",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "	Title of the person.",
    example: "	Sales Manager",
  },
  {
    id: 5,
    title: "Phone",
    name: "phone",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "Phone number of the person",
    example: "(555) 123-4567",
  },
  {
    id: 6,
    title: "Notes",
    name: "notes",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "Text area for notes",
    example: "Reports to CEO",
  },
  {
    id: 7,
    title: "Site",
    name: "site",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "System field to link person to a Site",
    example: "-",
  },
  {
    id: 8,
    title: "Location",
    name: "location",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "System field to link person to a Location",
    example: "	-",
  },
  {
    id: 9,
    title: "Department",
    name: "department",
    option: [
      {
        id: 1,
        value: "yes",
      },
      {
        id: 2,
        value: "no",
      },
    ],
    description: "	System field to link person to a Department",
    example: "	-",
  },
];



const DataBasesEmp: React.FunctionComponent = (

) => {
//   const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const [matchedSelected, setMatchedSelected] = useState<number[]>([]);
  const [dataBases, setDataBases] = useState<{ data: any[];dataBaseTable: any }>({ data: [],
    dataBaseTable: dataBaseTable.reduce((acc, item) => {
      acc[item.name] = "";
      return acc;
    }, {}), });
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [eventForm, setEventForm] = useState<any>({})

//   const dataBase = useSelector((state: RootState) => state.dataBase.data)
//   // const dispatch = useDispatch<AppDispatch>()
//   console.log(dataBase)

  const addCustomField = (custom: string) => {
    setDataBases((prevData) => ({
      ...prevData,
      data: [...prevData.data, custom],
    }));
  };


  const deleteCustomField = (index: number) => {
    const updatedData = dataBases.data.filter((_, idx) => idx !== index);
    setDataBases((prevData) => ({ ...prevData, data: updatedData }));
  };

  const handleClickEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedCell(null);
  };

  const handleEditButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Custom = (e.target as HTMLFormElement).Custom.value;
    if (selectedCell !== null) {
      const updatedData = dataBases.data.map((item, index) =>
        index === selectedCell ? Custom : item
      );
      setDataBases((prevData) => ({ ...prevData, data: updatedData }));
      handleEditClose();
    }
  };

  const handleCheckboxChange = (index: number) => {
    setMatchedSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((item) => item !== index)
        : [...prevSelected, index]
    );
    setSelectedCell(index);
  };

  const handleDeleteButton = () => {
    if (selectedCell !== null) {
      handleDeleteOpen();
    }
  };

  const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedData = dataBases.data.filter(
      (_, index) => index !== selectedCell
    );
    // setDataBases((prevData) => ({ ...prevData, data: updatedData }));
    setDataBases({ ...dataBases, data: updatedData });
    setMatchedSelected([]);
    setDeleteOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setMatchedSelected([]);
  };

  const handleEdit = () => {
    if (selectedCell !== null) {
      handleClickEditOpen();
    }
  };

  const HandleRadioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataBases((prevData) => ({
      ...prevData,
      dataBaseTable: { ...prevData.dataBaseTable, [name]: value },
    }));
  };


console.log(JSON.stringify(dataBases, null, 2))

  return (
    <AppView>
      <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
        <SignpostOutlinedIcon
          style={{ fontSize: '1.4rem', color: '#d32f2f' }}
        />
        Database person/employee
      </Typography>

          <Box
            sx={{
              borderRadius: 'none',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              background: '#ffffff',
              gap: '5px',
              p: 2,
            }}
          >
            <Box 
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
            >
            <Typography
        level="h4"
        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
      >
       Persons/Employees Standard Fields
      </Typography>
            </Box>
            
            <Box sx={{
              textAlign: { xs: 'center', md: 'left', fontFamily:'sans-serif', },
            }}>
              <Box
              sx={{mt:3}}
              >
                <Typography level="body-xs">
                <b>Persons/employees</b> are individuals to whom you 'assign' <b>(chek-out)</b> assets. These could be employees in your organization or students in your school/university. Select the fields you would like to use for the persons/employees table.
                </Typography>
              </Box>

              <Box sx={{ mt: "10px", overflowX: "auto" }}>
                <Table borderAxis="both" >
                  <thead>
                    <tr>
                      <th style={{ width: 30 }}>
                        <Checkbox />
                      </th>
                      <th style={{ minWidth: 180 }}>Field Name</th>
                      <th style={{ minWidth: 200 }}>Date Required</th>
                      <th style={{ minWidth: 400 }}>Description</th>
                      <th style={{ minWidth: 150 }}>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBases.dataBaseTable &&
                  dataBaseTable.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <Checkbox />
                          </td>
                          <td>{data.title}</td>
                          <td>
                            <FormControl>
                              <RadioGroup
                                defaultValue="outlined"
                                name="radio-buttons-group"
                              >
                                {data.option.map((opt:any) => (
                                    <Radio
                                      name={data.name}
                                      onChange={HandleRadioSelect}
                                      key={opt.id}
                                      value={opt.value}
                                      label={opt.value}
                                      variant="outlined"
                                    />
                                  ))}
                              </RadioGroup>
                            </FormControl>
                          </td>
                          <td>{data.description}</td>
                          <td>{data.example}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                <Divider sx={{ my: "30px" }}></Divider>
              </Box>
            </Box>

            <Box>
<Typography><b>Key Field (Unique Identifier)</b></Typography>

<Typography>Select the key field that you would like to use as a unique identifier. The key field should have unique values in the system.
    </Typography>
<Typography sx={{
    marginTop:'10px'
}}>
For example, if you select 'Full Name' as a key field, you cannot have two persons with the name 'John Doe'. To make them unique, you may have to name them 'John Doe' and 'John Doe 2'. As an alternative, use 'Email' as a key field since email is always unique for each person.</Typography>


            </Box>
            <Divider sx={{marginBottom:'15px'}} />
            <Box sx={{
                marginBottom: "15px" 
            }}>
            <Typography><b>Asset Custom Fields</b></Typography>
            <Box>
              Add custom fields to join the standard fields that we provided.
              Feel free to get creative.


            </Box>
            </Box>

            <Box>
            <AddDataBaseEmp
  dataBases={dataBases} 
  setDataBases={setDataBases} 
  addCustomField={addCustomField}
  deleteCustomField={deleteCustomField} 

/>

              <EditDataBaseEmp
                matchedSelected={matchedSelected}
                setMatchedSelected={setMatchedSelected}
                dataBases={dataBases}
                setDataBases={setDataBases}
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
                handleCheckboxChange={handleCheckboxChange}
                handleEdit={handleEdit}
                handleEditButton={handleEditButton} 
                handleDeleteButton={handleDeleteButton} 
                handleDeleteSubmit={handleDeleteSubmit} 
                handleEditClose={handleEditClose} 
                handleDeleteOpen={handleDeleteOpen} 
                handleDeleteClose={handleDeleteClose}
              />
            </Box>

            <Divider sx={{ marginTop: "3%" }} />

            <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { md: 'row', xs: 'column' },
              justifyContent: { xs: 'center', md: 'flex-end' },
              gap: '5px',
              mt:4
            }}
        >
         
          <Button
            variant="solid"
            sx={{
              background: '#388e3c',
              color: 'white',
              borderRadius:'15px'
            }}
            component="label"
            // onClick={handlePrevTab}
          >
            <NavigateBeforeOutlinedIcon />
                
                Back
          </Button>
          <Button
            variant="solid"
            sx={{
              background: "#fdd835",
              color: 'white',
              borderRadius:'15px'
            }}
            component="label"
              // onClick={handleNextTab} 
          >
             Continue
             <NavigateNextOutlinedIcon />{" "}
          </Button>
          </Box>
          </Box>
    </AppView>
  );
};

export default DataBasesEmp;